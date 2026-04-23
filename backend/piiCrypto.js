/**
 * Шифрование персональных данных в БД (AES-256-GCM).
 * Ключ: PII_ENCRYPTION_KEY — 64 hex-символа (32 байта) или base64 32 байта.
 * Без ключа: запись/чтение без изменения (для dev и постепенного ввода ключа).
 */

const crypto = require('crypto');

const PREFIX = 'e1:';

let warnedNoKey = false;

function getKey() {
  const raw = (process.env.PII_ENCRYPTION_KEY || '').trim();
  if (!raw) {
    if (process.env.NODE_ENV === 'production' && !warnedNoKey) {
      console.warn('⚠️  PII_ENCRYPTION_KEY не задан: персональные поля в БД не шифруются.');
      warnedNoKey = true;
    }
    return null;
  }
  if (/^[0-9a-fA-F]{64}$/.test(raw)) {
    return Buffer.from(raw, 'hex');
  }
  try {
    const b = Buffer.from(raw, 'base64');
    if (b.length === 32) return b;
  } catch {
    // ignore
  }
  if (!warnedNoKey) {
    console.error('❌ PII_ENCRYPTION_KEY: ожидается 64 hex-символа или base64 на 32 байта.');
    warnedNoKey = true;
  }
  return null;
}

const PII_FIELD_NAMES = new Set([
  'username',
  'full_name',
  'phone_number',
  'pickup_point',
  'pickup_point_address',
  'comments',
  'review_text',
  'referral_username',
  'referral_name',
  'referrer_username',
  'referrer_name',
  'user_username',
  'user_full_name'
]);

function encryptValue(plain) {
  if (plain == null) return plain;
  const s = String(plain);
  if (s === '') return plain;
  const key = getKey();
  if (!key || key.length !== 32) {
    return plain;
  }
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(s, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const combined = Buffer.concat([enc, tag]);
  return `${PREFIX}${iv.toString('base64url')}:${combined.toString('base64url')}`;
}

function decryptValue(stored) {
  if (stored == null || stored === '') return stored;
  if (typeof stored !== 'string' || !stored.startsWith(PREFIX)) {
    return stored;
  }
  const key = getKey();
  if (!key || key.length !== 32) {
    return stored;
  }
  try {
    const rest = stored.slice(PREFIX.length);
    const sep = rest.indexOf(':');
    if (sep < 0) return stored;
    const iv = Buffer.from(rest.slice(0, sep), 'base64url');
    const combined = Buffer.from(rest.slice(sep + 1), 'base64url');
    if (combined.length < 17) return stored;
    const tag = combined.subarray(combined.length - 16);
    const data = combined.subarray(0, combined.length - 16);
    const dec = crypto.createDecipheriv('aes-256-gcm', key, iv);
    dec.setAuthTag(tag);
    return dec.update(data, undefined, 'utf8') + dec.final('utf8');
  } catch {
    return stored;
  }
}

/**
 * @param {Record<string, unknown>|null|undefined} row
 */
function mapPiiOut(row) {
  if (row == null || typeof row !== 'object') return row;
  const o = { ...row };
  for (const k of Object.keys(o)) {
    if (PII_FIELD_NAMES.has(k) && o[k] != null) {
      o[k] = decryptValue(o[k]);
    }
  }
  return o;
}

function mapPiiOutRows(rows) {
  if (!Array.isArray(rows)) return rows;
  return rows.map((r) => mapPiiOut(r));
}

/**
 * @param {Record<string, unknown>} fields — только передаваемые в SQL поля
 */
function mapPiiIn(fields) {
  if (fields == null || typeof fields !== 'object') return fields;
  const o = { ...fields };
  for (const k of Object.keys(o)) {
    if (PII_FIELD_NAMES.has(k) && o[k] != null) {
      o[k] = encryptValue(o[k]);
    }
  }
  return o;
}

/**
 * Вход для одного поля (например, только full_name)
 */
function enc(plain) {
  return encryptValue(plain);
}

function dec(stored) {
  return decryptValue(stored);
}

module.exports = {
  PREFIX,
  PII_FIELD_NAMES,
  encryptValue,
  decryptValue,
  mapPiiOut,
  mapPiiOutRows,
  mapPiiIn,
  enc,
  dec
};
