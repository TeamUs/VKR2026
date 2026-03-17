#!/usr/bin/env node
'use strict';

/**
 * Backfill achievements + XP from DB (no notifications).
 *
 * ✅ What it does:
 * - Iterates all users (or a subset)
 * - Recomputes conditions for each achievement
 * - Inserts missing rows into `user_achievements`
 * - Backfills XP into `xp_history` for:
 *    - confirmed orders (source: 'order', 100 XP each)
 *    - completed yuan purchases (source: 'yuan_purchase', floor(amount_rub / 100) XP)
 *    - referral registrations (source: 'referral', 50 XP per referred user)
 *    - achievements (source: 'achievement', xp_reward)
 * - Recomputes `users.xp` from `xp_history` (source of truth)
 * - Updates `users.current_level` based on resulting XP
 * - Applies rewards (WITHOUT notifications):
 *   - achievement additional reward -> temp discount (users.temp_discount_*)
 *   - level reward -> permanent commission in `users.commission` (unless active referral discount)
 *
 * 🚫 What it does NOT do:
 * - No Telegram notifications
 *
 * Usage:
 * - Dry-run (default):   node backfill-gamification.js
 * - Apply changes:       node backfill-gamification.js --apply
 * - Only one user:       node backfill-gamification.js --apply --user=123456789
 * - Limit users:         node backfill-gamification.js --apply --limit=100
 */

const path = require('path');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '.env') });

function getArgValue(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function hasFlag(name) {
  return process.argv.includes(`--${name}`);
}

function toInt(value, fallback = null) {
  if (value === null || value === undefined || value === '') return fallback;
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) ? n : fallback;
}

// Same thresholds as `backend/gamification.js`
const LEVELS = {
  Bronze: { minXP: 0, maxXP: 999, next: 'Silver' },
  Silver: { minXP: 1000, maxXP: 4999, next: 'Gold' },
  Gold: { minXP: 5000, maxXP: 24999, next: 'Platinum' },
  Platinum: { minXP: 25000, maxXP: 99999, next: 'Diamond' },
  Diamond: { minXP: 100000, maxXP: Infinity, next: null }
};

function calculateLevel(xp) {
  for (const [level, cfg] of Object.entries(LEVELS)) {
    if (xp >= cfg.minXP && xp <= cfg.maxXP) return level;
  }
  return 'Bronze';
}

function dateOnlyISO(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return null;
  return dt.toISOString().slice(0, 10);
}

function isNightHour(hour) {
  return hour >= 22 || hour < 10;
}

async function mustGetAchievements(pool) {
  // Some older schemas might miss `additional_reward` - fallback gracefully.
  let rows;
  try {
    [rows] = await pool.query(
      'SELECT id, achievement_key, name, xp_reward, additional_reward FROM vkr_achievements'
    );
  } catch (e) {
    if (e && (e.code === 'ER_BAD_FIELD_ERROR' || String(e.message || '').includes('Unknown column'))) {
      [rows] = await pool.query(
        'SELECT id, achievement_key, name, xp_reward FROM vkr_achievements'
      );
    } else {
      throw e;
    }
  }
  const map = new Map();
  for (const r of rows) {
    if (!r.achievement_key) continue;
    map.set(String(r.achievement_key), {
      id: r.id,
      key: String(r.achievement_key),
      name: String(r.name || r.achievement_key),
      xpReward: Number(r.xp_reward || 0),
      additionalReward: r.additional_reward ? String(r.additional_reward) : null
    });
  }
  return map;
}

async function listUsers(pool, { onlyUserId, limit }) {
  const where = [];
  const params = [];

  if (onlyUserId) {
    where.push('telegram_id = ?');
    params.push(onlyUserId);
  }

  const hasWhere = where.length > 0;
  const sql =
    `SELECT telegram_id
     FROM vkr_users
     ${hasWhere ? `WHERE ${where.join(' AND ')}` : ''}
     ORDER BY telegram_id` + (limit ? ' LIMIT ?' : '');
  if (limit) params.push(limit);

  const [rows] = await pool.query(sql, params);
  return rows.map((r) => Number(r.telegram_id)).filter((n) => Number.isFinite(n));
}

async function getUserFacts(pool, telegramId) {
  const [[user]] = await pool.query(
    `SELECT
       telegram_id,
       referred_by,
       created_at,
       login_streak,
       calculation_count,
       last_calculation_date,
       total_savings
     FROM vkr_users
     WHERE telegram_id = ?`,
    [telegramId]
  );

  if (!user) return null;

  const [orders] = await pool.query(
    `SELECT order_id, created_at, status, estimated_savings
     FROM vkr_orders
     WHERE telegram_id = ?
       AND status IN ('paid','completed')
     ORDER BY created_at ASC`,
    [telegramId]
  );

  const [ordersLast7DaysRows] = await pool.query(
    `SELECT COUNT(*) AS cnt
     FROM vkr_orders
     WHERE telegram_id = ?
       AND status IN ('paid','completed')
       AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
    [telegramId]
  );

  const [ordersTodayRows] = await pool.query(
    `SELECT COUNT(*) AS cnt
     FROM vkr_orders
     WHERE telegram_id = ?
       AND status IN ('paid','completed')
       AND DATE(created_at) = CURDATE()`,
    [telegramId]
  );

  const [ordersJanuaryRows] = await pool.query(
    `SELECT COUNT(*) AS cnt
     FROM vkr_orders
     WHERE telegram_id = ?
       AND status IN ('paid','completed')
       AND MONTH(created_at) = 1
       AND YEAR(created_at) = YEAR(CURDATE())`,
    [telegramId]
  );

  const confirmedOrdersCount = orders.length;
  const confirmedOrdersSum = orders.reduce((acc, o) => acc + Number(o.estimated_savings || 0), 0);

  let firstNightOrderAt = null;
  for (const o of orders) {
    const created = o.created_at ? new Date(o.created_at) : null;
    if (!created || Number.isNaN(created.getTime())) continue;
    const hour = created.getHours();
    if (isNightHour(hour)) {
      firstNightOrderAt = created;
      break;
    }
  }

  const [yuanPurchases] = await pool.query(
    `SELECT id, amount_rub, amount_cny, status, created_at
     FROM vkr_yuan_purchases
     WHERE telegram_id = ?
       AND status = 'completed'
     ORDER BY created_at ASC`,
    [telegramId]
  );

  const yuanCount = yuanPurchases.length;
  const yuanTotalRub = yuanPurchases.reduce((acc, p) => acc + Number(p.amount_rub || 0), 0);
  const yuanTotalCny = yuanPurchases.reduce((acc, p) => acc + Number(p.amount_cny || 0), 0);

  const [referrals] = await pool.query(
    `SELECT telegram_id, created_at
     FROM vkr_users
     WHERE referred_by = ?
       AND telegram_id <> ?
     ORDER BY created_at ASC`,
    [telegramId, telegramId]
  );

  const referralsCount = referrals.length;
  const hasSummerReferral = referrals.some((r) => {
    if (!r.created_at) return false;
    const d = new Date(r.created_at);
    if (Number.isNaN(d.getTime())) return false;
    const m = d.getMonth() + 1;
    return m >= 6 && m <= 8;
  });

  const [[activeReferralsRow]] = await pool.query(
    `SELECT COUNT(DISTINCT u.telegram_id) AS cnt
     FROM vkr_users u
     JOIN vkr_orders o ON o.telegram_id = u.telegram_id
     WHERE u.referred_by = ?
       AND u.telegram_id <> ?
       AND o.status IN ('paid','completed')`,
    [telegramId, telegramId]
  );

  const activeReferralsCount = Number(activeReferralsRow?.cnt || 0);

  const [[secondLevelRow]] = await pool.query(
    `SELECT COUNT(DISTINCT u2.telegram_id) AS cnt
     FROM vkr_users u1
     JOIN vkr_users u2 ON u2.referred_by = u1.telegram_id
     WHERE u1.referred_by = ?
       AND u1.telegram_id <> ?
       AND u2.telegram_id <> u2.referred_by`,
    [telegramId, telegramId]
  );

  const secondLevelReferralsCount = Number(secondLevelRow?.cnt || 0);

  const createdAt = user.created_at ? new Date(user.created_at) : null;
  const daysSinceRegistration = createdAt && !Number.isNaN(createdAt.getTime())
    ? Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const lastCalc = user.last_calculation_date ? new Date(user.last_calculation_date) : null;
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const activeCalculator =
    Number(user.calculation_count || 0) >= 5 &&
    lastCalc &&
    !Number.isNaN(lastCalc.getTime()) &&
    lastCalc >= weekAgo;

  const todayStr = new Date().toISOString().slice(0, 10);
  const hasCalculationToday =
    lastCalc && !Number.isNaN(lastCalc.getTime()) && dateOnlyISO(lastCalc) === todayStr;
  const hasOrderToday = Number(ordersTodayRows[0]?.cnt || 0) > 0;

  return {
    telegramId,
    referredBy: user.referred_by ? Number(user.referred_by) : null,
    createdAt: createdAt && !Number.isNaN(createdAt.getTime()) ? createdAt : null,
    daysSinceRegistration,
    loginStreak: Number(user.login_streak || 0),
    calculationCount: Number(user.calculation_count || 0),
    lastCalculationDate: lastCalc && !Number.isNaN(lastCalc.getTime()) ? lastCalc : null,
    totalSavings: Number(user.total_savings || 0),

    confirmedOrders: orders.map((o) => ({
      id: Number(o.order_id),
      createdAt: o.created_at ? new Date(o.created_at) : null,
      estimatedSavings: Number(o.estimated_savings || 0)
    })),
    confirmedOrdersCount,
    confirmedOrdersSum,
    confirmedOrdersLast7DaysCount: Number(ordersLast7DaysRows[0]?.cnt || 0),
    confirmedOrdersJanuaryCount: Number(ordersJanuaryRows[0]?.cnt || 0),
    firstNightOrderAt,

    yuanPurchases: yuanPurchases.map((p) => ({
      id: Number(p.id),
      amountRub: Number(p.amount_rub || 0),
      amountCny: Number(p.amount_cny || 0),
      createdAt: p.created_at ? new Date(p.created_at) : null
    })),
    yuanCount,
    yuanTotalRub,
    yuanTotalCny,

    referrals: referrals.map((r) => ({
      telegramId: Number(r.telegram_id),
      createdAt: r.created_at ? new Date(r.created_at) : null
    })),
    referralsCount,
    activeReferralsCount,
    secondLevelReferralsCount,
    hasSummerReferral,

    hasOrderToday,
    hasCalculationToday,
    activeCalculator
  };
}

function computeDesiredAchievements(facts, achievementsByKey) {
  const want = new Set();
  const addIfExists = (key) => {
    if (achievementsByKey.has(key)) want.add(key);
  };

  // Orders
  if (facts.confirmedOrdersCount >= 1) addIfExists('dragon_newbie');
  if (facts.confirmedOrdersCount >= 3) addIfExists('lucky_start');
  if (facts.confirmedOrdersCount >= 5) addIfExists('imperial_step');
  if (facts.confirmedOrdersCount >= 8) addIfExists('lucky_number');
  if (facts.confirmedOrdersCount >= 10) {
    addIfExists('order_marathon');
    addIfExists('jubilee_order');
  }
  if (facts.confirmedOrdersCount >= 20) addIfExists('delivery_master');
  if (facts.confirmedOrdersCount >= 50) addIfExists('order_legend');

  if (facts.firstNightOrderAt) addIfExists('night_hunter');
  if (facts.confirmedOrdersLast7DaysCount >= 3) addIfExists('chain_orders');
  if (facts.confirmedOrdersSum >= 10000) addIfExists('dragon_hunter');
  if (facts.confirmedOrdersJanuaryCount >= 3) addIfExists('new_year_luck');

  // Yuan
  if (facts.yuanCount >= 1) addIfExists('first_exchange');
  if (facts.yuanTotalCny >= 1000) addIfExists('yuan_newbie');
  if (facts.yuanTotalCny >= 5000) addIfExists('currency_dragon');
  if (facts.yuanTotalRub >= 20000) addIfExists('volume_exchange');
  if (facts.yuanTotalRub >= 100000) addIfExists('yuan_master');

  // Referrals
  if (facts.activeReferralsCount >= 1) {
    addIfExists('first_follower');
    addIfExists('dragon_summoner');
  }
  if (facts.referralsCount >= 3) addIfExists('lucky_chain');
  if (facts.referralsCount >= 10) addIfExists('referral_marathon');
  if (facts.secondLevelReferralsCount >= 1) addIfExists('dragon_chain');
  if (facts.hasSummerReferral) addIfExists('summer_fire');

  // Activity
  if (facts.daysSinceRegistration >= 365) addIfExists('year_of_luck');
  if (facts.activeCalculator) addIfExists('active_calculator');
  if (facts.hasOrderToday && facts.hasCalculationToday) addIfExists('combo_activity');

  // Login streak (support both “old” and “new” keys if they exist in DB)
  if (facts.loginStreak >= 3) addIfExists('daily_ritual');
  if (facts.loginStreak >= 7) addIfExists('weekly_devotion');
  if (facts.loginStreak >= 14) addIfExists('lunar_cycle');
  if (facts.loginStreak >= 30) addIfExists('monthly_master');
  if (facts.loginStreak >= 100) addIfExists('century_streak');
  if (facts.loginStreak >= 365) addIfExists('year_of_dragon');

  // Savings / calculations
  if (facts.calculationCount >= 1) addIfExists('lucky_calculation');
  if (facts.calculationCount >= 10) addIfExists('economy_master');
  if (facts.totalSavings >= 2000) addIfExists('dragon_saver');
  if (facts.totalSavings >= 50000) addIfExists('imperial_economy');
  if (facts.hasCalculationToday && facts.calculationCount >= 3) addIfExists('calculation_combo');

  return [...want];
}

async function insertXpIfMissing(conn, { telegramId, xpAmount, source, sourceId, description }, dryRun) {
  if (!xpAmount || xpAmount === 0) return { inserted: false, skipped: true };

  if (dryRun) {
    return { inserted: true, dryRun: true };
  }

  // Atomic “insert if missing” (idempotent even if script is re-run).
  const [res] = await conn.query(
    `INSERT INTO vkr_xp_history (telegram_id, xp_amount, source, source_id, description)
     SELECT ?, ?, ?, ?, ?
     FROM DUAL
     WHERE NOT EXISTS (
       SELECT 1 FROM vkr_xp_history WHERE telegram_id = ? AND source = ? AND source_id <=> ?
     )`,
    [telegramId, xpAmount, source, sourceId, description, telegramId, source, sourceId]
  );

  const inserted = Number(res.affectedRows || 0) > 0;
  if (inserted) {
    await conn.query('UPDATE vkr_users SET xp = xp + ? WHERE telegram_id = ?', [xpAmount, telegramId]);
  }

  return { inserted };
}

async function ensureAchievement(conn, { telegramId, achievement, unlockedAt }, dryRun) {
  if (!achievement) return { inserted: false, xpInserted: false };

  if (dryRun) {
    return { inserted: true, xpInserted: achievement.xpReward > 0, hasAdditionalReward: !!achievement.additionalReward };
  }

  const [ins] = await conn.query(
    `INSERT INTO vkr_user_achievements (telegram_id, achievement_key, unlocked_at, xp_awarded)
     SELECT ?, ?, COALESCE(?, NOW()), ?
     FROM DUAL
     WHERE NOT EXISTS (
       SELECT 1 FROM vkr_user_achievements WHERE telegram_id = ? AND achievement_key = ?
     )`,
    [
      telegramId,
      achievement.key,
      unlockedAt ? new Date(unlockedAt) : null,
      achievement.xpReward,
      telegramId,
      achievement.key
    ]
  );

  const inserted = Number(ins.affectedRows || 0) > 0;

  // Always ensure XP for achievement exists in xp_history (even if UA existed, but XP row is missing).
  let xpInserted = false;
  if (achievement.xpReward > 0) {
    const xpRes = await insertXpIfMissing(
      conn,
      {
        telegramId,
        xpAmount: achievement.xpReward,
        source: 'achievement',
        sourceId: achievement.id,
        description: `Unlocked: ${achievement.name}`
      },
      false
    );
    xpInserted = !!xpRes.inserted;
  }

  return { inserted, xpInserted, hasAdditionalReward: !!achievement.additionalReward };
}

function parseDiscountDurationDays(additionalRewardText) {
  if (!additionalRewardText) return null;
  const txt = String(additionalRewardText).toLowerCase();

  if (txt.includes('на неделю')) return 7;
  const m = txt.match(/на\s+(\d+)\s*(?:дн|дня|дней)/i);
  if (m && m[1]) {
    const n = toInt(m[1], null);
    if (n && n > 0) return n;
  }
  // Fallback: any additional reward -> 7 days (matches current app logic)
  return 7;
}

async function applyTempDiscountIfAny(conn, telegramId, discountDays, dryRun) {
  if (!discountDays || discountDays <= 0) return { applied: false };
  if (dryRun) return { applied: true, dryRun: true };

  // If schema doesn't have these columns, this will throw — we swallow and continue.
  try {
    await conn.query(
      `UPDATE vkr_users
       SET
         temp_discount_active = TRUE,
         temp_discount_end_date = CASE
           WHEN temp_discount_end_date IS NULL THEN DATE_ADD(NOW(), INTERVAL ? DAY)
           WHEN temp_discount_end_date < DATE_ADD(NOW(), INTERVAL ? DAY) THEN DATE_ADD(NOW(), INTERVAL ? DAY)
           ELSE temp_discount_end_date
         END
       WHERE telegram_id = ?`,
      [discountDays, discountDays, discountDays, telegramId]
    );
    return { applied: true };
  } catch (e) {
    return { applied: false, skipped: true, reason: e?.code || e?.message || String(e) };
  }
}

function commissionForLevel(level) {
  switch (level) {
    case 'Silver':
      return 900;
    case 'Gold':
      return 700;
    case 'Platinum':
      return 400;
    case 'Diamond':
      return 0;
    case 'Bronze':
    default:
      return 1000;
  }
}

function xpKey(source, sourceId) {
  return `${String(source)}:${sourceId === null || sourceId === undefined ? 'null' : String(sourceId)}`;
}

async function getExistingUserState(conn, telegramId) {
  // XP keys (for idempotency checks)
  const [xpKeysRows] = await conn.query(
    'SELECT source, source_id FROM vkr_xp_history WHERE telegram_id = ?',
    [telegramId]
  );
  const existingXpKeys = new Set(xpKeysRows.map((r) => xpKey(r.source, r.source_id)));

  // Existing XP sum
  const [[xpSumRow]] = await conn.query(
    'SELECT COALESCE(SUM(xp_amount), 0) AS total_xp FROM vkr_xp_history WHERE telegram_id = ?',
    [telegramId]
  );
  const existingXpTotal = Number(xpSumRow?.total_xp || 0);

  // Already unlocked achievements
  const [uaRows] = await conn.query(
    'SELECT achievement_key FROM vkr_user_achievements WHERE telegram_id = ?',
    [telegramId]
  );
  const existingAchievementKeys = new Set(uaRows.map((r) => String(r.achievement_key)));

  // Current user fields we may update
  const [[userRow]] = await conn.query(
    'SELECT commission, current_level FROM vkr_users WHERE telegram_id = ?',
    [telegramId]
  );
  const currentCommission = Number(userRow?.commission ?? 1000);
  const currentLevel = String(userRow?.current_level || 'Bronze');

  return {
    existingXpKeys,
    existingXpTotal,
    existingAchievementKeys,
    currentCommission,
    currentLevel
  };
}

async function updateCommissionByLevelIfNoActiveReferral(conn, telegramId, level, dryRun) {
  try {
    const [[row]] = await conn.query('SELECT commission FROM vkr_users WHERE telegram_id = ?', [telegramId]);
    if (!row) return { updated: false };

    const desired = commissionForLevel(level);
    const current = Number(row.commission ?? 1000);
    // Important: Level commission is a "default". If user currently has a better commission
    // (e.g. referral 400 or 0), keep the better one.
    const finalCommission = Number.isFinite(current) ? Math.min(current, desired) : desired;
    if (Number.isFinite(current) && current === finalCommission) return { updated: false };

    if (dryRun) {
      return { updated: true, dryRun: true, from: current, to: finalCommission, levelCommission: desired };
    }

    await conn.query('UPDATE vkr_users SET commission = ? WHERE telegram_id = ?', [finalCommission, telegramId]);
    return { updated: true, from: current, to: finalCommission, levelCommission: desired };
  } catch (e) {
    // If schema differs (no commission/access_expires_at), just skip.
    return { updated: false, skipped: true, reason: e?.code || e?.message || String(e) };
  }
}

async function recomputeUserXpFromHistory(conn, telegramId, dryRun) {
  if (dryRun) return { updated: true, dryRun: true };

  const [[row]] = await conn.query(
    'SELECT COALESCE(SUM(xp_amount), 0) AS total_xp FROM vkr_xp_history WHERE telegram_id = ?',
    [telegramId]
  );
  const totalXP = Number(row?.total_xp || 0);
  await conn.query('UPDATE vkr_users SET xp = ? WHERE telegram_id = ?', [totalXP, telegramId]);
  return { updated: true, totalXP };
}

function unlockedAtForAchievement(key, facts) {
  // Best-effort timestamps (optional; only for nicer UI history).
  const orders = facts.confirmedOrders.filter((o) => o.createdAt && !Number.isNaN(o.createdAt.getTime()));
  const yuan = facts.yuanPurchases.filter((p) => p.createdAt && !Number.isNaN(p.createdAt.getTime()));

  const nthOrderAt = (n) => {
    if (orders.length < n) return null;
    return orders[n - 1].createdAt;
  };

  switch (key) {
    case 'dragon_newbie':
      return nthOrderAt(1);
    case 'lucky_start':
      return nthOrderAt(3);
    case 'imperial_step':
      return nthOrderAt(5);
    case 'lucky_number':
      return nthOrderAt(8);
    case 'order_marathon':
    case 'jubilee_order':
      return nthOrderAt(10);
    case 'delivery_master':
      return nthOrderAt(20);
    case 'order_legend':
      return nthOrderAt(50);
    case 'night_hunter':
      return facts.firstNightOrderAt || null;
    case 'first_exchange':
      return yuan[0]?.createdAt || null;
    default:
      return null;
  }
}

async function updateUserCachedStats(conn, facts, dryRun) {
  if (dryRun) return;

  // Keep cache columns consistent with core tables (helps the app & gamification logic).
  await conn.query(
    `UPDATE vkr_users
     SET total_orders = ?,
         total_referrals = ?,
         total_yuan_bought = ?
     WHERE telegram_id = ?`,
    [facts.confirmedOrdersCount, facts.referralsCount, facts.yuanTotalCny, facts.telegramId]
  );
}

async function updateUserLevel(conn, telegramId, dryRun) {
  if (dryRun) return { updated: false };

  const [[row]] = await conn.query(
    'SELECT xp, current_level FROM vkr_users WHERE telegram_id = ?',
    [telegramId]
  );

  if (!row) return { updated: false };
  const xp = Number(row.xp || 0);
  const currentLevel = String(row.current_level || 'Bronze');
  const newLevel = calculateLevel(xp);
  if (newLevel === currentLevel) return { updated: false };

  await conn.query(
    'UPDATE vkr_users SET current_level = ? WHERE telegram_id = ?',
    [newLevel, telegramId]
  );
  return { updated: true, from: currentLevel, to: newLevel };
}

async function main() {
  const apply = hasFlag('apply');
  const dryRun = !apply;

  const onlyUserId = toInt(getArgValue('user'));
  const limit = toInt(getArgValue('limit'));

  const dbHost = process.env.DB_HOST;
  const dbUser = process.env.DB_USER;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbPort = toInt(process.env.DB_PORT, 3306);

  if (!dbHost || !dbUser || !dbPassword || !dbName) {
    console.error('❌ Missing DB env vars. Need DB_HOST, DB_USER, DB_PASSWORD, DB_NAME (and optionally DB_PORT).');
    process.exit(1);
  }

  const pool = mysql.createPool({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: dbPort,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
  });

  const achievementsByKey = await mustGetAchievements(pool);
  const users = await listUsers(pool, { onlyUserId, limit });

  const summary = {
    usersTotal: users.length,
    usersProcessed: 0,
    achievementsInserted: 0,
    xpRowsInserted: 0,
    xpRecomputedUsers: 0,
    levelUpdates: 0,
    commissionsUpdated: 0,
    tempDiscountAppliedUsers: 0,
    tempDiscountAppliedFailures: 0,
    levelsBefore: {},
    levelsAfter: {}
  };

  console.log(`ℹ️ Backfill gamification: users=${users.length}, mode=${dryRun ? 'DRY-RUN' : 'APPLY'}`);

  for (const telegramId of users) {
    const facts = await getUserFacts(pool, telegramId);
    if (!facts) continue;

    const desired = computeDesiredAchievements(facts, achievementsByKey);

    // Build XP events to backfill (idempotent insert).
    const orderXpEvents = facts.confirmedOrders.map((o) => ({
      telegramId,
      xpAmount: 100,
      source: 'order',
      sourceId: o.id,
      description: `Заказ #${o.id} подтвержден (backfill)`
    }));

    const yuanXpEvents = facts.yuanPurchases.map((p) => ({
      telegramId,
      xpAmount: Math.floor(Number(p.amountRub || 0) / 100),
      source: 'yuan_purchase',
      sourceId: p.id,
      description: `Покупка юаней #${p.id} подтверждена (backfill)`
    }));

    const referralXpEvents = facts.referrals.map((r) => ({
      telegramId,
      xpAmount: 50,
      source: 'referral',
      sourceId: r.telegramId,
      description: `Приглашен реферал: ${r.telegramId} (backfill)`
    }));

    const conn = await pool.getConnection();
    try {
      if (!dryRun) await conn.beginTransaction();

      await updateUserCachedStats(conn, facts, dryRun);

      const existingState = await getExistingUserState(conn, telegramId);
      summary.levelsBefore[existingState.currentLevel] = (summary.levelsBefore[existingState.currentLevel] || 0) + 1;

      // XP from actions
      let xpWouldAdd = 0;
      for (const e of [...orderXpEvents, ...yuanXpEvents, ...referralXpEvents]) {
        if (dryRun) {
          const key = xpKey(e.source, e.sourceId);
          if (!existingState.existingXpKeys.has(key)) {
            summary.xpRowsInserted += 1;
            xpWouldAdd += Number(e.xpAmount || 0);
          }
          continue;
        }

        const res = await insertXpIfMissing(conn, e, false);
        if (res.inserted) summary.xpRowsInserted += 1;
      }

      // If any unlocked achievements has additional reward, apply temp discount.
      // (Single active temp discount flag in DB; we just ensure it's active for N days from now)
      let maxDiscountDays = 0;

      // Achievements (+ XP from achievements)
      for (const key of desired) {
        const achievement = achievementsByKey.get(key);
        if (!achievement) continue;
        const unlockedAt = unlockedAtForAchievement(key, facts);
        if (dryRun) {
          if (!existingState.existingAchievementKeys.has(achievement.key)) {
            summary.achievementsInserted += 1;
          }
          if (achievement.xpReward > 0) {
            const k = xpKey('achievement', achievement.id);
            if (!existingState.existingXpKeys.has(k)) {
              summary.xpRowsInserted += 1;
              xpWouldAdd += Number(achievement.xpReward || 0);
            }
          }
          if (achievement.additionalReward) {
            const d = parseDiscountDurationDays(achievement.additionalReward) || 0;
            if (d > maxDiscountDays) maxDiscountDays = d;
          }
          continue;
        }

        const res = await ensureAchievement(conn, { telegramId, achievement, unlockedAt }, false);
        if (res.inserted) summary.achievementsInserted += 1;
        if (res.xpInserted) summary.xpRowsInserted += 1;
        if (achievement.additionalReward) {
          const d = parseDiscountDurationDays(achievement.additionalReward) || 0;
          if (d > maxDiscountDays) maxDiscountDays = d;
        }
      }

      // Recompute exact XP from xp_history (source of truth)
      // In DRY-RUN we simulate "future XP" as existing_xp_total + xpWouldAdd.
      let simulatedTotalXp = null;
      if (dryRun) {
        simulatedTotalXp = existingState.existingXpTotal + xpWouldAdd;
        summary.xpRecomputedUsers += 1;
      } else {
        const xpRecalc = await recomputeUserXpFromHistory(conn, telegramId, false);
        if (xpRecalc && xpRecalc.updated) summary.xpRecomputedUsers += 1;
        simulatedTotalXp = xpRecalc?.totalXP ?? null;
      }

      // Update level after XP recompute
      let finalLevel = existingState.currentLevel;
      if (dryRun) {
        finalLevel = calculateLevel(Number(simulatedTotalXp || 0));
        if (finalLevel !== existingState.currentLevel) summary.levelUpdates += 1;
      } else {
        const lvl = await updateUserLevel(conn, telegramId, false);
        if (lvl.updated) summary.levelUpdates += 1;
        // Read back current level for accurate stats/commission
        const [[row]] = await conn.query('SELECT current_level FROM vkr_users WHERE telegram_id = ?', [telegramId]);
        finalLevel = String(row?.current_level || 'Bronze');
      }
      summary.levelsAfter[finalLevel] = (summary.levelsAfter[finalLevel] || 0) + 1;

      // Persist level-based commission (for correct display in profile),
      // but do NOT worsen current commission (referral/other better discounts keep priority).
      {
        const commRes = await updateCommissionByLevelIfNoActiveReferral(conn, telegramId, finalLevel, dryRun);
        if (commRes && commRes.updated) summary.commissionsUpdated += 1;
      }

      // Apply temp discount from achievements (if any)
      if (maxDiscountDays > 0) {
        const dres = await applyTempDiscountIfAny(conn, telegramId, maxDiscountDays, dryRun);
        if (dres && (dres.applied || dres.dryRun)) {
          summary.tempDiscountAppliedUsers += 1;
        } else if (dres && dres.skipped) {
          summary.tempDiscountAppliedFailures += 1;
        }
      }

      if (!dryRun) await conn.commit();
      summary.usersProcessed += 1;
    } catch (err) {
      if (!dryRun) {
        try {
          await conn.rollback();
        } catch (_) {}
      }
      console.error(`❌ Failed user ${telegramId}:`, err?.message || err);
    } finally {
      conn.release();
    }
  }

  await pool.end();

  console.log('✅ Done.');
  console.log(JSON.stringify(summary, null, 2));
  if (!apply) {
    console.log('ℹ️ This was a DRY-RUN. Re-run with --apply to write changes.');
  }
}

main().catch((err) => {
  console.error('❌ Fatal:', err);
  process.exit(1);
});

