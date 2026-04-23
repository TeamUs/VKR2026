/**
 * Сгенерировать ADMIN_PASSWORD_HASH в формате scrypt$16384$8$1$<saltB64>$<hashB64>
 * Использование: node hashAdminScrypt.cjs "ваш_секретный_пароль"
 */
const crypto = require('crypto');
const password = process.argv[2];
if (!password) {
  console.error('Usage: node hashAdminScrypt.cjs <password>');
  process.exit(1);
}
const N = 16384;
const r = 8;
const p = 1;
const salt = crypto.randomBytes(16);
const hash = crypto.scryptSync(String(password), salt, 32, { N, r, p, maxmem: 64 * 1024 * 1024 });
const line = `scrypt$${N}$${r}$${p}$${salt.toString('base64')}$${hash.toString('base64')}`;
console.log(line);
console.log('\nДобавьте в .env:\nADMIN_PASSWORD_HASH=' + line);
