/**
 * =====================================================
 * СЕРВИС ГЕЙМИФИКАЦИИ - НОВАЯ СИСТЕМА ДОСТИЖЕНИЙ
 * =====================================================
 * Обрабатывает начисление XP, проверку достижений,
 * временные скидки и уведомления пользователей
 */

const mysql = require('mysql2/promise');

// Level Configuration
const LEVELS = {
  'Bronze': { minXP: 0, maxXP: 999, next: 'Silver' },
  'Silver': { minXP: 1000, maxXP: 4999, next: 'Gold' },
  'Gold': { minXP: 5000, maxXP: 24999, next: 'Platinum' },
  'Platinum': { minXP: 25000, maxXP: 99999, next: 'Diamond' },
  'Diamond': { minXP: 100000, maxXP: Infinity, next: null }
};

// Level Rewards Configuration
const LEVEL_REWARDS = {
  'Bronze': {
    description: 'Первый заказ без комиссии за оформление',
    benefits: ['no_first_order_fee']
  },
  'Silver': {
    description: 'Комиссия 900₽ навсегда (вместо 1000₽)',
    benefits: ['commission_900']
  },
  'Gold': {
    description: 'Комиссия 700₽ навсегда (вместо 1000₽)',
    benefits: ['commission_700']
  },
  'Platinum': {
    description: 'Комиссия 400₽ навсегда (вместо 1000₽)',
    benefits: ['commission_400']
  },
  'Diamond': {
    description: 'Комиссия 0₽ навсегда (полное освобождение) + специальные предложения на юань + повышенные бонусы для рефералов',
    benefits: ['commission_0', 'special_yuan_offers', 'enhanced_referral_bonuses']
  }
};

// XP Accrual Rules
const XP_RULES = {
  ORDER_COMPLETE: 100,           // 100 XP per completed order
  YUAN_PER_100RUB: 1,           // 1 XP per 100₽ spent on yuan
  REFERRAL_REGISTRATION: 50,     // 50 XP per referral registration
  ACHIEVEMENT_UNLOCK: 'varies'  // Depends on achievement
};

class GamificationService {
  constructor(dbConfig) {
    this.dbConfig = dbConfig;
    this.pool = null;
  }

  async init() {
    if (!this.pool) {
      this.pool = mysql.createPool(this.dbConfig);
    }
  }

  /**
   * Award XP to a user
   * @param {number} telegramId - User's Telegram ID
   * @param {number} xpAmount - Amount of XP to award
   * @param {string} source - Source of XP (order, yuan_purchase, referral, achievement)
   * @param {number|null} sourceId - ID of the source
   * @param {string|null} description - Optional description
   * @returns {Promise<Object>} Result with level up info if applicable
   */
  async awardXP(telegramId, xpAmount, source, sourceId = null, description = null) {
    await this.init();
    const connection = await this.pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Get current user data
      const [users] = await connection.query(
        'SELECT xp, current_level FROM users WHERE telegram_id = ?',
        [telegramId]
      );

      if (users.length === 0) {
        throw new Error('User not found');
      }

      const currentXP = users[0].xp || 0;
      const currentLevel = users[0].current_level || 'Bronze';
      const newXP = currentXP + xpAmount;

      // Update user XP
      await connection.query(
        'UPDATE users SET xp = ? WHERE telegram_id = ?',
        [newXP, telegramId]
      );

      // Log XP history
      await connection.query(
        'INSERT INTO xp_history (telegram_id, xp_amount, source, source_id, description) VALUES (?, ?, ?, ?, ?)',
        [telegramId, xpAmount, source, sourceId, description]
      );

      // Check for level up
      const newLevel = this.calculateLevel(newXP);
      let leveledUp = false;
      
      if (newLevel !== currentLevel) {
        await connection.query(
          'UPDATE users SET current_level = ? WHERE telegram_id = ?',
          [newLevel, telegramId]
        );

        await connection.query(
          'INSERT INTO level_history (telegram_id, old_level, new_level, xp_at_levelup) VALUES (?, ?, ?, ?)',
          [telegramId, currentLevel, newLevel, newXP]
        );

        leveledUp = true;
      }

      await connection.commit();

      return {
        success: true,
        xpAwarded: xpAmount,
        totalXP: newXP,
        currentLevel: newLevel,
        leveledUp,
        oldLevel: currentLevel,
        rewards: leveledUp ? LEVEL_REWARDS[newLevel] : null
      };

    } catch (error) {
      await connection.rollback();
      
      // Lock wait timeout - не критичная ошибка, возникает при одновременном доступе
      // Можно игнорировать, т.к. один из запросов все равно выполнится успешно
      if (error.code === 'ER_LOCK_WAIT_TIMEOUT' || error.errno === 1205) {
        console.warn(`⚠️ Lock timeout при обновлении XP для ${telegramId} (одновременный доступ). Игнорируем.`);
        // Возвращаем success: false, но не бросаем ошибку
        return {
          success: false,
          skipped: true,
          reason: 'Concurrent access - другой запрос уже обрабатывается'
        };
      }
      
      console.error('Error awarding XP:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Calculate level based on XP
   * @param {number} xp - Total XP
   * @returns {string} Level name
   */
  calculateLevel(xp) {
    for (const [level, config] of Object.entries(LEVELS)) {
      if (xp >= config.minXP && xp <= config.maxXP) {
        return level;
      }
    }
    return 'Bronze';
  }

  /**
   * Get level progress information
   * @param {number} xp - Total XP
   * @returns {Object} Progress information
   */
  getLevelProgress(xp) {
    const currentLevel = this.calculateLevel(xp);
    const levelConfig = LEVELS[currentLevel];
    
    if (!levelConfig.next) {
      return {
        currentLevel,
        nextLevel: null,
        progress: 100,
        xpToNext: 0,
        currentLevelMinXP: levelConfig.minXP,
        currentLevelMaxXP: levelConfig.maxXP
      };
    }

    const nextLevelConfig = LEVELS[levelConfig.next];
    const xpInCurrentLevel = xp - levelConfig.minXP;
    const xpNeededForLevel = nextLevelConfig.minXP - levelConfig.minXP;
    const progress = (xpInCurrentLevel / xpNeededForLevel) * 100;

    return {
      currentLevel,
      nextLevel: levelConfig.next,
      progress: Math.min(progress, 100),
      xpToNext: nextLevelConfig.minXP - xp,
      currentLevelMinXP: levelConfig.minXP,
      currentLevelMaxXP: levelConfig.maxXP,
      nextLevelMinXP: nextLevelConfig.minXP
    };
  }

  /**
   * Check and unlock achievements for a user
   * @param {number} telegramId - User's Telegram ID
   * @param {string} achievementKey - Achievement to check
   * @returns {Promise<Object>} Result with unlock status
   */
  async checkAndUnlockAchievement(telegramId, achievementKey) {
    await this.init();
    const connection = await this.pool.getConnection();

    try {
      await connection.beginTransaction();

      // Check if already unlocked
      const [existing] = await connection.query(
        'SELECT * FROM user_achievements WHERE telegram_id = ? AND achievement_key = ?',
        [telegramId, achievementKey]
      );

      if (existing.length > 0) {
        await connection.commit();
        return { success: true, alreadyUnlocked: true };
      }

      // Get achievement details
      const [achievements] = await connection.query(
        'SELECT * FROM achievements WHERE achievement_key = ?',
        [achievementKey]
      );

      if (achievements.length === 0) {
        throw new Error('Achievement not found');
      }

      const achievement = achievements[0];

      // Unlock achievement
      await connection.query(
        'INSERT INTO user_achievements (telegram_id, achievement_key, unlocked_at, xp_awarded) VALUES (?, ?, NOW(), ?)',
        [telegramId, achievementKey, achievement.xp_reward]
      );

      // Award XP bonus
      let xpResult = null;
      if (achievement.xp_reward > 0) {
        try {
          xpResult = await this.awardXP(
            telegramId,
            achievement.xp_reward,
            'achievement',
            achievement.id,
            `Unlocked: ${achievement.name}`
          );
          // Если awardXP был пропущен из-за concurrent access, это нормально
          if (xpResult && xpResult.skipped) {
            console.log(`⚠️ XP награда пропущена для достижения ${achievementKey} (одновременный доступ)`);
          }
        } catch (err) {
          // Игнорируем ошибки при награждении XP (они могут быть из-за concurrent access)
          console.warn(`⚠️ Не удалось наградить XP за достижение ${achievementKey}:`, err.message);
        }
      }

      // Apply additional reward if exists (temporary discount 600₽ instead of 1000₽)
      if (achievement.additional_reward) {
        // Проверяем формат награды: "Комиссия 600₽ вместо 1000₽ на неделю" или "на 7 дней"
        const rewardText = achievement.additional_reward.toLowerCase();
        let durationDays = 7; // По умолчанию 7 дней
        
        if (rewardText.includes('на неделю')) {
          durationDays = 7;
        } else if (rewardText.includes('на 7 дней')) {
          durationDays = 7;
        }
        
        // Применяем временную скидку
        await this.applyTemporaryDiscount(telegramId, durationDays);
      }

      await connection.commit();

      return {
        success: true,
        alreadyUnlocked: false,
        achievement: {
          key: achievement.achievement_key,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          xpReward: achievement.xp_reward,
          additionalReward: achievement.additional_reward
        },
        xpAwarded: xpResult
      };

    } catch (error) {
      await connection.rollback();
      
      // Lock wait timeout - не критичная ошибка при одновременном доступе
      if (error.code === 'ER_LOCK_WAIT_TIMEOUT' || error.errno === 1205) {
        console.warn(`⚠️ Lock timeout при разблокировке достижения ${achievementKey} для ${telegramId}. Игнорируем.`);
        return { success: false, skipped: true, reason: 'Concurrent access' };
      }
      
      console.error('Error unlocking achievement:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Get all achievements for a user
   * @param {number} telegramId - User's Telegram ID
   * @returns {Promise<Array>} List of all achievements with unlock status
   */
  async getUserAchievements(telegramId) {
    await this.init();

    const [allAchievements] = await this.pool.query(
      'SELECT * FROM achievements ORDER BY category, id'
    );

    const [userAchievements] = await this.pool.query(
      'SELECT achievement_key, unlocked_at FROM user_achievements WHERE telegram_id = ?',
      [telegramId]
    );

    const unlockedMap = {};
    userAchievements.forEach(ua => {
      unlockedMap[ua.achievement_key] = ua.unlocked_at;
    });

    return allAchievements.map(achievement => ({
      key: achievement.achievement_key,
      name: achievement.name,
      description: achievement.description,
      category: achievement.category,
      icon: achievement.icon,
      requirement: achievement.requirement,
      xpReward: achievement.xp_reward,
      unlocked: !!unlockedMap[achievement.achievement_key],
      unlockedAt: unlockedMap[achievement.achievement_key] || null
    }));
  }

  /**
   * Update daily login streak
   * @param {number} telegramId - User's Telegram ID
   * @returns {Promise<Object>} Updated streak info
   */
  async updateDailyLogin(telegramId) {
    await this.init();
    const connection = await this.pool.getConnection();

    try {
      await connection.beginTransaction();

      const [users] = await connection.query(
        'SELECT last_daily_login, login_streak FROM users WHERE telegram_id = ?',
        [telegramId]
      );

      if (users.length === 0) {
        throw new Error('User not found');
      }

      // Получаем текущую дату (по UTC) в формате YYYY-MM-DD (начало дня 00:00:00)
      const now = new Date();
      const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      const todayStr = todayUTC.toISOString().split('T')[0];
      
      const lastLoginDate = users[0].last_daily_login;
      const currentStreak = users[0].login_streak || 0;

      let newStreak = currentStreak;
      let alreadyLoggedToday = false;
      let unlockedAchievements = [];

      // Если last_daily_login существует, сравниваем даты
      if (lastLoginDate) {
        // Преобразуем last_daily_login в UTC дату (начало дня)
        const lastLoginUTC = new Date(lastLoginDate);
        const lastLoginDay = new Date(Date.UTC(
          lastLoginUTC.getUTCFullYear(), 
          lastLoginUTC.getUTCMonth(), 
          lastLoginUTC.getUTCDate()
        ));
        const lastLoginStr = lastLoginDay.toISOString().split('T')[0];
        
        // Если уже заходил сегодня (в тот же день UTC)
        if (lastLoginStr === todayStr) {
          alreadyLoggedToday = true;
          await connection.commit();
          return { streak: currentStreak, alreadyLoggedToday: true, unlockedAchievements: [] };
        }

        // Вычисляем разницу в днях (в UTC)
        const diffTime = todayUTC.getTime() - lastLoginDay.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          // Последовательный день (вчера был вход, сегодня вход)
          newStreak = currentStreak + 1;
        } else if (diffDays > 1) {
          // Стрик прерван (пропущен хотя бы один день)
          newStreak = 1;
        } else {
          // diffDays === 0 (уже обработано выше) или < 0 (не должно быть)
          alreadyLoggedToday = true;
          await connection.commit();
          return { streak: currentStreak, alreadyLoggedToday: true, unlockedAchievements: [] };
        }
      } else {
        // Первый вход когда-либо
        newStreak = 1;
      }

      // Обновляем данные пользователя
      await connection.query(
        'UPDATE users SET last_daily_login = ?, login_streak = ? WHERE telegram_id = ?',
        [todayStr, newStreak, telegramId]
      );

      await connection.commit();

      // Проверяем достижения для всех возможных стриков
      // Проверяем достижения по возрастанию стрика
      const achievementChecks = [
        { streak: 3, key: 'daily_ritual' },
        { streak: 7, key: 'weekly_devotion' },
        { streak: 14, key: 'lunar_cycle' },
        { streak: 30, key: 'monthly_master' },
        { streak: 100, key: 'century_streak' },
        { streak: 365, key: 'year_of_dragon' }
      ];

      for (const check of achievementChecks) {
        if (newStreak === check.streak) {
          try {
            const result = await this.checkAndUnlockAchievement(telegramId, check.key);
            if (result.success && !result.alreadyUnlocked && result.achievement) {
              unlockedAchievements.push(result);
            }
          } catch (err) {
            console.warn(`⚠️ Ошибка проверки достижения ${check.key} (игнорируем):`, err.message);
          }
          // Проверяем только одно достижение за раз (то, которое соответствует текущему стрику)
          break;
        }
      }

      return { 
        streak: newStreak, 
        alreadyLoggedToday: false,
        unlockedAchievements: unlockedAchievements
      };

    } catch (error) {
      await connection.rollback();
      
      // Lock wait timeout - не критичная ошибка при одновременном доступе
      if (error.code === 'ER_LOCK_WAIT_TIMEOUT' || error.errno === 1205) {
        console.warn(`⚠️ Lock timeout при обновлении daily login для ${telegramId}. Игнорируем.`);
        // Возвращаем результат, как будто все ОК (другой запрос уже обновил)
        return { streak: null, skipped: true, reason: 'Concurrent access - уже обновлено другим запросом' };
      }
      
      console.error('Error updating daily login:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  /**
   * Check achievements after order completion
   * @param {number} telegramId - User's Telegram ID
   * @param {number} orderId - Order ID
   * @param {number} orderHour - Hour of order (0-23)
   * @returns {Promise<Array>} Unlocked achievements
   */
  async checkOrderAchievements(telegramId, orderId, orderHour = null) {
    await this.init();
    const unlocked = [];

    // Get order count from users table (учитываются только подтвержденные заказы)
    const [orderStats] = await this.pool.query(
      'SELECT total_orders, referred_by FROM users WHERE telegram_id = ?',
      [telegramId]
    );

    const totalOrders = orderStats[0]?.total_orders || 0;
    const referredBy = orderStats[0]?.referred_by;

    // Dragon Newbie - First order
    if (totalOrders === 1) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'dragon_newbie');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Lucky Start - 3 orders
    if (totalOrders === 3) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'lucky_start');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Imperial Step - 5 orders
    if (totalOrders === 5) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'imperial_step');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Lucky Number - 8th order
    if (totalOrders === 8) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'lucky_number');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Order Marathon - 10 orders
    if (totalOrders === 10) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'order_marathon');
      if (!result.alreadyUnlocked) unlocked.push(result);
      
      // Jubilee Order - 10th order (same condition, different achievement)
      const jubileeResult = await this.checkAndUnlockAchievement(telegramId, 'jubilee_order');
      if (!jubileeResult.alreadyUnlocked) unlocked.push(jubileeResult);
    }

    // Delivery Master - 20 orders
    if (totalOrders === 20) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'delivery_master');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Order Legend - 50 orders
    if (totalOrders === 50) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'order_legend');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Night Hunter - Order between 22:00-10:00 (night or morning time)
    if (orderHour !== null && (orderHour >= 22 || orderHour < 10)) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'night_hunter');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Dragon Hunter - Orders total amount >= 10,000₽
    // Используем estimated_savings как сумму заказов (в системе используется как стоимость заказа)
    const [orderAmountStats] = await this.pool.query(
      'SELECT COALESCE(SUM(estimated_savings), 0) as total FROM orders WHERE telegram_id = ? AND status = "completed"',
      [telegramId]
    );
    if (orderAmountStats[0]?.total >= 10000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'dragon_hunter');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Check for 3 orders in a week (Chain Orders) - учитываем только завершенные заказы
    const [recentOrders] = await this.pool.query(
      'SELECT COUNT(*) as count FROM orders WHERE telegram_id = ? AND status = "completed" AND created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)',
      [telegramId]
    );

    if (recentOrders[0].count >= 3) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'chain_orders');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Check for seasonal achievements
    const now = new Date();
    const month = now.getMonth() + 1;

    // New Year Luck - 3 orders in January (учитываем только завершенные заказы)
    if (month === 1) {
      const [januaryOrders] = await this.pool.query(
        'SELECT COUNT(*) as count FROM orders WHERE telegram_id = ? AND status = "completed" AND MONTH(created_at) = 1 AND YEAR(created_at) = YEAR(NOW())',
        [telegramId]
      );

      if (januaryOrders[0].count >= 3) {
        const result = await this.checkAndUnlockAchievement(telegramId, 'new_year_luck');
        if (!result.alreadyUnlocked) unlocked.push(result);
      }
    }

    // Dragon Summoner - Реферал сделал свой первый заказ
    // Если это первый заказ пользователя (totalOrders === 1) и у него есть реферер
    // Достижение разблокируется у РЕФЕРЕРА (того, кто пригласил)
    if (totalOrders === 1 && referredBy) {
      const result = await this.checkAndUnlockAchievement(referredBy, 'dragon_summoner');
      if (!result.alreadyUnlocked) {
        // Добавляем информацию о том, кому разблокировано достижение
        result.unlockedFor = referredBy; // Реферер получает достижение
        unlocked.push(result);
      }
    }

    return unlocked;
  }

  /**
   * Check achievements after referral registration
   * @param {number} referrerId - Referrer's Telegram ID
   * @param {number} referredId - Referred user's Telegram ID
   * @returns {Promise<Array>} Unlocked achievements
   */
  async checkReferralAchievements(referrerId, referredId) {
    await this.init();
    const unlocked = [];

    // First Follower - First active referral (with order)
    const [activeReferrals] = await this.pool.query(
      'SELECT COUNT(DISTINCT u.telegram_id) as count FROM users u JOIN orders o ON u.telegram_id = o.telegram_id WHERE u.referred_by = ?',
      [referrerId]
    );

    if (activeReferrals[0].count >= 1) {
      const result = await this.checkAndUnlockAchievement(referrerId, 'first_follower');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Lucky Chain - 3 referrals
    // Получаем общее количество рефералов
    const [totalReferralsResult] = await this.pool.query(
      'SELECT COUNT(*) as count FROM users WHERE referred_by = ?',
      [referrerId]
    );

    const totalReferrals = totalReferralsResult[0]?.count || 0;

    if (totalReferrals >= 3) {
      const result = await this.checkAndUnlockAchievement(referrerId, 'lucky_chain');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Referral Marathon - 10 referrals
    if (totalReferrals >= 10) {
      const result = await this.checkAndUnlockAchievement(referrerId, 'referral_marathon');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Dragon Chain - Referral of your referral (2nd level referral)
    // Check if the referred user has referred someone
    const [secondLevelReferrals] = await this.pool.query(
      `SELECT COUNT(DISTINCT u2.telegram_id) as count 
       FROM users u1 
       JOIN users u2 ON u2.referred_by = u1.telegram_id 
       WHERE u1.referred_by = ?`,
      [referrerId]
    );

    if (secondLevelReferrals[0].count >= 1) {
      const result = await this.checkAndUnlockAchievement(referrerId, 'dragon_chain');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Check for Summer Fire
    const now = new Date();
    const month = now.getMonth() + 1;
    if (month >= 6 && month <= 8) {
      const result = await this.checkAndUnlockAchievement(referrerId, 'summer_fire');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    return unlocked;
  }

  /**
   * Check achievements after yuan purchase
   * @param {number} telegramId - User's Telegram ID
   * @param {number} amountRub - Amount spent in rubles
   * @returns {Promise<Array>} Unlocked achievements
   */
  async checkYuanAchievements(telegramId, amountRub) {
    await this.init();
    const unlocked = [];

    // Get purchase statistics
    const [purchaseStats] = await this.pool.query(
      'SELECT COUNT(*) as count, COALESCE(SUM(amount_rub), 0) as total_rub, COALESCE(SUM(amount_yuan), 0) as total_yuan FROM yuan_purchases WHERE telegram_id = ? AND status = "completed"',
      [telegramId]
    );

    const purchaseCount = purchaseStats[0]?.count || 0;
    const totalRub = purchaseStats[0]?.total_rub || 0;
    const totalYuan = purchaseStats[0]?.total_yuan || 0;

    // First Exchange - First yuan purchase
    if (purchaseCount === 1) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'first_exchange');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Yuan Newbie - Buy 1,000 yuan
    if (totalYuan >= 1000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'yuan_newbie');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Currency Dragon - Buy 5,000 yuan
    if (totalYuan >= 5000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'currency_dragon');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Volume Exchange - Buy yuan for 20,000₽
    if (totalRub >= 20000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'volume_exchange');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Yuan Master - Buy yuan for 100,000₽
    if (totalRub >= 100000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'yuan_master');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    return unlocked;
  }

  /**
   * Проверяет достижения по активности
   */
  async checkActivityAchievements(telegramId) {
    await this.init();
    const unlocked = [];

    // Примечание: достижения по стрику уже проверяются в updateDailyLogin
    // Здесь проверяем только другие достижения по активности

    // Год удачи - 365 дней с регистрации
    const [registrationDays] = await this.pool.query(
      'SELECT DATEDIFF(NOW(), created_at) as days FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (registrationDays[0]?.days >= 365) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'year_of_luck');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Активный расчетчик - 5 расчетов за неделю
    // Проверяем, что calculation_count увеличилось минимум на 5 за последние 7 дней
    // Для этого нужно отслеживать историю, но можно проверить last_calculation_date и текущий count
    const [userCalcData] = await this.pool.query(
      'SELECT calculation_count, last_calculation_date FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (userCalcData[0]?.calculation_count >= 5) {
      // Если расчетов было сегодня или в последние 7 дней, и общее количество >= 5
      const lastCalcDate = userCalcData[0]?.last_calculation_date;
      if (lastCalcDate) {
        const lastCalc = new Date(lastCalcDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        
        // Если последний расчет был в последние 7 дней и расчетов >= 5
        if (lastCalc >= weekAgo && userCalcData[0].calculation_count >= 5) {
          const result = await this.checkAndUnlockAchievement(telegramId, 'active_calculator');
          if (!result.alreadyUnlocked) unlocked.push(result);
        }
      }
    }

    // Комбо-активность - расчет + заказ в один день (без входа)
    const today = new Date().toISOString().split('T')[0];
    
    const [todayOrders] = await this.pool.query(
      'SELECT COUNT(*) as count FROM orders WHERE telegram_id = ? AND status = "completed" AND DATE(created_at) = ?',
      [telegramId, today]
    );
    
    const [userData] = await this.pool.query(
      'SELECT last_calculation_date FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    const hasOrder = todayOrders[0].count > 0;
    const hasCalculation = userData[0]?.last_calculation_date && 
      userData[0].last_calculation_date.toISOString().split('T')[0] === today;
    
    if (hasOrder && hasCalculation) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'combo_activity');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    return unlocked;
  }

  /**
   * Проверяет достижения по экономии
   */
  async checkSavingsAchievements(telegramId) {
    await this.init();
    const unlocked = [];

    // Расчет удачи - первый расчет
    const [calculationCount] = await this.pool.query(
      'SELECT calculation_count FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (calculationCount[0]?.calculation_count >= 1) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'lucky_calculation');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Эконом-мастер - 10 расчетов
    if (calculationCount[0]?.calculation_count >= 10) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'economy_master');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Дракон-сберегатель - 2,000₽ экономии
    const [totalSavings] = await this.pool.query(
      'SELECT total_savings FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (totalSavings[0]?.total_savings >= 2000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'dragon_saver');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Имперская экономия - 50,000₽ экономии
    if (totalSavings[0]?.total_savings >= 50000) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'imperial_economy');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    // Расчетный комбо - 3 расчета в один день
    // Проверяем, что сегодня было сделано минимум 3 расчета
    // Для точной проверки нужно отслеживать историю, но можно проверить через временные метки
    // Упрощенная проверка: если сегодня был расчет И calculation_count >= 3
    // В идеале нужно хранить историю расчетов, но сейчас используем упрощенную логику
    const today = new Date().toISOString().split('T')[0];
    
    const [userData] = await this.pool.query(
      'SELECT calculation_count, last_calculation_date FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    const hasCalculationsToday = userData[0]?.last_calculation_date && 
      userData[0].last_calculation_date.toISOString().split('T')[0] === today;
    const totalCalculations = userData[0]?.calculation_count || 0;
    
    // Если сегодня был расчет И общее количество >= 3
    // Это упрощенная логика - в идеале нужно отслеживать именно количество расчетов за сегодня
    if (hasCalculationsToday && totalCalculations >= 3) {
      const result = await this.checkAndUnlockAchievement(telegramId, 'calculation_combo');
      if (!result.alreadyUnlocked) unlocked.push(result);
    }

    return unlocked;
  }

  /**
   * Применяет временную скидку
   */
  async applyTemporaryDiscount(telegramId, durationDays = 7) {
    await this.init();
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationDays);
    
    await this.pool.query(
      'UPDATE users SET temp_discount_active = TRUE, temp_discount_end_date = ? WHERE telegram_id = ?',
      [endDate, telegramId]
    );
  }

  /**
   * Проверяет активность временной скидки
   */
  async checkTemporaryDiscount(telegramId) {
    await this.init();
    
    const [discountData] = await this.pool.query(
      'SELECT temp_discount_active, temp_discount_end_date FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (discountData[0]?.temp_discount_active && discountData[0]?.temp_discount_end_date > new Date()) {
      return true;
    }
    
    return false;
  }

  /**
   * Get user statistics
   * @param {number} telegramId - User's Telegram ID
   * @returns {Promise<Object>} User statistics
   */
  async getUserStats(telegramId) {
    await this.init();

    const [userData] = await this.pool.query(
      'SELECT xp, current_level, login_streak, total_savings, total_orders, total_yuan_bought, total_referrals, calculation_count FROM users WHERE telegram_id = ?',
      [telegramId]
    );

    if (userData.length === 0) {
      return {
        xp: 0,
        currentLevel: 'Bronze',
        loginStreak: 0,
        totalSavings: 0,
        totalOrders: 0,
        totalYuanBought: 0,
        totalReferrals: 0,
        calculationCount: 0
      };
    }

    const user = userData[0];
    return {
      xp: user.xp || 0,
      currentLevel: user.current_level || 'Bronze',
      loginStreak: user.login_streak || 0,
      totalSavings: parseFloat(user.total_savings) || 0,
      totalOrders: user.total_orders || 0,
      totalYuanBought: parseFloat(user.total_yuan_bought) || 0,
      totalReferrals: user.total_referrals || 0,
      calculationCount: user.calculation_count || 0
    };
  }

  /**
   * Get next level for current level
   * @param {string} currentLevel - Current level name
   * @returns {string} Next level name
   */
  getNextLevel(currentLevel) {
    const level = LEVELS[currentLevel];
    return level ? level.next : 'Silver';
  }

  /**
   * Get XP needed to reach next level
   * @param {string} currentLevel - Current level name
   * @param {number} currentXP - Current XP amount
   * @returns {number} XP needed to reach next level
   */
  getXPToNextLevel(currentLevel, currentXP) {
    const level = LEVELS[currentLevel];
    if (!level || !level.next) {
      return 0; // Max level reached
    }
    
    const nextLevel = LEVELS[level.next];
    if (!nextLevel) {
      return 0;
    }
    
    return Math.max(0, nextLevel.minXP - currentXP);
  }
}

module.exports = {
  GamificationService,
  LEVELS,
  LEVEL_REWARDS,
  XP_RULES
};

