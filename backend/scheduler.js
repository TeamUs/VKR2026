const cron = require('node-cron');
const axios = require('axios');
const os = require('os');

// ID менеджера
const MANAGER_TELEGRAM_ID = process.env.MANAGER_TELEGRAM_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Функция отправки сообщения в Telegram
async function sendTelegramMessage(chatId, message) {
  try {
    const telegramApiUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await axios.post(telegramApiUrl, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    console.log('✅ Уведомление отправлено менеджеру:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Ошибка отправки уведомления:', error.response?.data || error.message);
    throw error;
  }
}

// Подключение к БД
const mysql = require('mysql2/promise');

// Connection pool для оптимизации подключений
let dbPool = null;

function initDBPool() {
  if (!dbPool) {
    dbPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'poizonic',
      port: process.env.DB_PORT || 3306,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return dbPool;
}

// Функция получения статистики заказов
async function getOrdersStats() {
  try {
    const pool = initDBPool();
    const connection = await pool.getConnection();
    
    // Новые заказы за последние 24 часа
    const [newOrders] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `);
    
    // Заказы в ожидании
    const [pendingOrders] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE status = 'pending'
    `);
    
    // Заказы в обработке
    const [processingOrders] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE status = 'processing'
    `);
    
    // Заказы готовые к отправке
    const [readyOrders] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE status = 'ready'
    `);
    
    // Заказы в пути
    const [shippedOrders] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM orders 
      WHERE status = 'shipped'
    `);
    
    // Новые пользователи за последние 24 часа
    const [newUsers] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM users 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `);
    
    // Покупки юаней за последние 24 часа
    const [newYuanPurchases] = await connection.execute(`
      SELECT COUNT(*) as count 
      FROM yuan_purchases 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `);
    
    connection.release(); // Возвращаем соединение в pool вместо закрытия
    
    return {
      newOrders: newOrders[0].count,
      pendingOrders: pendingOrders[0].count,
      processingOrders: processingOrders[0].count,
      readyOrders: readyOrders[0].count,
      shippedOrders: shippedOrders[0].count,
      newUsers: newUsers[0].count,
      newYuanPurchases: newYuanPurchases[0].count
    };
  } catch (error) {
    console.error('❌ Ошибка получения статистики заказов:', error);
    return null;
  }
}

// Функция проверки скидок, истекающих в ближайшие 24 часа
async function checkDiscountsExpiringSoon() {
  try {
    console.log('⏰ Проверка скидок, истекающих в ближайшие 24 часа...');
    
    const pool = initDBPool();
    const connection = await pool.getConnection();
    
    // Находим пользователей с скидками, истекающими в ближайшие 24 часа
    const [expiringUsers] = await connection.execute(`
      SELECT telegram_id, username, full_name, access_expires_at
      FROM users 
      WHERE access_expires_at IS NOT NULL 
      AND access_expires_at > NOW() 
      AND access_expires_at <= DATE_ADD(NOW(), INTERVAL 24 HOUR)
      AND commission = 400
    `);
    
    if (expiringUsers.length > 0) {
      console.log(`📢 Найдено ${expiringUsers.length} пользователей с скидками, истекающими в ближайшие 24 часа`);
      
      // Отправляем уведомления пользователям
      for (const user of expiringUsers) {
        try {
          const expiryDate = new Date(user.access_expires_at).toLocaleString('ru-RU');
          const hoursLeft = Math.ceil((new Date(user.access_expires_at) - new Date()) / (1000 * 60 * 60));
          
          const message = `⏰ <b>Ваша скидка скоро истечет!</b>\n\n` +
            `Ваша реферальная скидка на комиссию истечет через ${hoursLeft}ч\n\n` +
            `⏰ <b>Истекает:</b> ${expiryDate}\n\n` +
            `💰 <b>Текущая комиссия:</b> 400₽\n` +
            `📈 <b>После истечения:</b> 1000₽\n\n` +
            `🎁 <b>Как продлить скидку:</b>\n` +
            `• Пригласите друга по реферальной ссылке\n` +
            `• Получите скидку 400₽ еще на 2 недели\n\n` +
            `💡 <i>Не упустите возможность сэкономить!</i>`;
          
          await sendTelegramMessage(user.telegram_id, message);
          console.log(`✅ Уведомление отправлено пользователю ${user.telegram_id}`);
          
        } catch (error) {
          console.error(`❌ Ошибка отправки уведомления пользователю ${user.telegram_id}:`, error.message);
        }
      }
    } else {
      console.log('✅ Нет пользователей с скидками, истекающими в ближайшие 24 часа');
    }
    
    connection.release();
    
  } catch (error) {
    console.error('❌ Ошибка проверки скидок, истекающих в ближайшие 24 часа:', error);
  }
}

// Функция проверки истечения скидок (реальная проверка и отправка уведомлений)
async function checkExpiredDiscounts() {
  try {
    console.log('🔍 Проверка истечения скидок...');
    
    const pool = initDBPool();
    const connection = await pool.getConnection();
    
    // Находим пользователей с истекшими скидками
    const [expiredUsers] = await connection.execute(`
      SELECT telegram_id, username, full_name, access_expires_at, commission
      FROM users 
      WHERE access_expires_at IS NOT NULL 
      AND access_expires_at <= NOW() 
      AND commission = 400
    `);
    
    if (expiredUsers.length > 0) {
      console.log(`📢 Найдено ${expiredUsers.length} пользователей с истекшими скидками`);
      
      // Обновляем комиссию на стандартную
      await connection.execute(`
        UPDATE users 
        SET commission = 1000, access_expires_at = NULL 
        WHERE access_expires_at IS NOT NULL 
        AND access_expires_at <= NOW() 
        AND commission = 400
      `);
      
      // Отправляем уведомления пользователям
      for (const user of expiredUsers) {
        try {
          const message = `⏰ <b>Скидка истекла</b>\n\n` +
            `Ваша реферальная скидка на комиссию истекла.\n\n` +
            `💰 <b>Новая комиссия:</b> 1000₽\n` +
            `🎁 <b>Как получить скидку снова:</b>\n` +
            `• Пригласите друга по реферальной ссылке\n` +
            `• Получите скидку 400₽ на 2 недели\n\n` +
            `💡 <i>Продолжайте пользоваться Poizonic!</i>`;
          
          await sendTelegramMessage(user.telegram_id, message);
          console.log(`✅ Уведомление отправлено пользователю ${user.telegram_id}`);
          
        } catch (error) {
          console.error(`❌ Ошибка отправки уведомления пользователю ${user.telegram_id}:`, error.message);
        }
      }
    } else {
      console.log('✅ Нет пользователей с истекшими скидками');
    }
    
    connection.release();
    
  } catch (error) {
    console.error('❌ Ошибка проверки истечения скидок:', error);
  }
}

// Функция получения статистики сервера
function getServerStats() {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const memPercent = ((usedMem / totalMem) * 100).toFixed(1);
  
  const cpus = os.cpus();
  const loadAvg = os.loadavg();
  const cpuCount = cpus.length;
  const loadPercent = ((loadAvg[0] / cpuCount) * 100).toFixed(1);
  
  const uptime = process.uptime();
  const uptimeDays = Math.floor(uptime / 86400);
  const uptimeHours = Math.floor((uptime % 86400) / 3600);
  const uptimeMinutes = Math.floor((uptime % 3600) / 60);
  
  return {
    memory: {
      used: (usedMem / 1024 / 1024 / 1024).toFixed(2),
      total: (totalMem / 1024 / 1024 / 1024).toFixed(2),
      percent: memPercent
    },
    cpu: {
      load: loadPercent,
      cores: cpuCount
    },
    uptime: `${uptimeDays}д ${uptimeHours}ч ${uptimeMinutes}м`
  };
}

// Функция получения статистики БД
async function getDatabaseStats() {
  try {
    const pool = initDBPool();
    const connection = await pool.getConnection();
    
    // Количество подключений
    const [connections] = await connection.execute(`
      SHOW STATUS WHERE Variable_name = 'Threads_connected'
    `);
    
    // Размер БД
    const [dbSize] = await connection.execute(`
      SELECT 
        ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'size_mb'
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
    `);
    
    // Uptime MySQL
    const [uptime] = await connection.execute(`
      SHOW STATUS WHERE Variable_name = 'Uptime'
    `);
    
    connection.release();
    
    const uptimeSeconds = uptime[0]?.Value || 0;
    const uptimeDays = Math.floor(uptimeSeconds / 86400);
    const uptimeHours = Math.floor((uptimeSeconds % 86400) / 3600);
    const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60);
    
    return {
      connections: connections[0]?.Value || 0,
      size: dbSize[0]?.size_mb || 0,
      uptime: `${uptimeDays}д ${uptimeHours}ч ${uptimeMinutes}м`
    };
  } catch (error) {
    console.error('❌ Ошибка получения статистики БД:', error);
    return {
      connections: 'N/A',
      size: 'N/A',
      uptime: 'N/A'
    };
  }
}

// Функция ежедневного уведомления
async function sendDailyNotification() {
  try {
    console.log('🕐 Отправка ежедневного уведомления менеджеру...');
    
    const stats = await getOrdersStats();
    
    if (!stats) {
      await sendTelegramMessage(MANAGER_TELEGRAM_ID, 
        '⚠️ <b>Ежедневная проверка заказов</b>\n\n' +
        '❌ Не удалось получить статистику заказов. Проверьте подключение к базе данных.'
      );
      return;
    }
    
    const currentDate = new Date().toLocaleDateString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Получаем статистику сервера
    const serverStats = getServerStats();
    
    // Получаем статистику БД
    const dbStats = await getDatabaseStats();
    
    const message = `📋 <b>Ежедневный отчет</b>\n` +
      `📅 ${currentDate}\n\n` +
      `📦 <b>ЗАКАЗЫ</b>\n` +
      `🆕 Новые за 24ч: ${stats.newOrders}\n` +
      `⏳ В ожидании: ${stats.pendingOrders}\n` +
      `🔄 В обработке: ${stats.processingOrders}\n` +
      `✅ Готовы к отправке: ${stats.readyOrders}\n` +
      `🚚 В пути: ${stats.shippedOrders}\n\n` +
      `👥 <b>ПОЛЬЗОВАТЕЛИ</b>\n` +
      `🆕 Новые за 24ч: ${stats.newUsers}\n\n` +
      `💵 <b>ПОКУПКИ ЮАНЕЙ</b>\n` +
      `🆕 Новые за 24ч: ${stats.newYuanPurchases}\n\n` +
      `🖥️ <b>СЕРВЕР</b>\n` +
      `💾 Память: ${serverStats.memory.used}GB / ${serverStats.memory.total}GB (${serverStats.memory.percent}%)\n` +
      `⚙️ CPU: ${serverStats.cpu.load}% (${serverStats.cpu.cores} ядер)\n` +
      `⏱️ Uptime: ${serverStats.uptime}\n\n` +
      `🗄️ <b>БД</b>\n` +
      `🔌 Подключений: ${dbStats.connections}\n` +
      `📊 Размер: ${dbStats.size}MB\n` +
      `⏱️ Uptime: ${dbStats.uptime}\n\n` +
      `💡 <i>Проверьте статусы заказов и обработайте новые заявки</i>`;
    
    await sendTelegramMessage(MANAGER_TELEGRAM_ID, message);
    console.log('✅ Ежедневное уведомление отправлено');
    
  } catch (error) {
    console.error('❌ Ошибка отправки ежедневного уведомления:', error);
  }
}

// Планировщик задач
function startScheduler() {
  console.log('⏰ Запуск планировщика задач...');
  
  // Ежедневное уведомление в 12:00 по МСК
  // cron: '0 12 * * *' = каждый день в 12:00
  cron.schedule('0 12 * * *', async () => {
    console.log('🕐 Время ежедневного уведомления (12:00 МСК)');
    await sendDailyNotification();
  }, {
    timezone: 'Europe/Moscow'
  });
  
  // Проверка истечения скидок каждый час
  // cron: '0 * * * *' = каждый час
  cron.schedule('0 * * * *', async () => {
    console.log('🔍 Проверка истечения скидок (каждый час)');
    await checkExpiredDiscounts();
  }, {
    timezone: 'Europe/Moscow'
  });
  
  // Проверка скидок, истекающих в ближайшие 24 часа
  // cron: '0 */6 * * *' = каждые 6 часов
  cron.schedule('0 */6 * * *', async () => {
    console.log('⏰ Проверка скидок, истекающих в ближайшие 24 часа');
    await checkDiscountsExpiringSoon();
  }, {
    timezone: 'Europe/Moscow'
  });
  
  console.log('✅ Планировщик запущен');
  console.log('📅 Ежедневные уведомления: 12:00 МСК');
  console.log('⏰ Проверка скидок: каждый час');
  console.log('🔔 Предупреждения о скидках: каждые 6 часов');
}

// Функция для тестирования уведомления
async function testNotification() {
  console.log('🧪 Тестирование уведомления...');
  await sendDailyNotification();
}

module.exports = {
  startScheduler,
  sendDailyNotification,
  testNotification,
  checkExpiredDiscounts,
  checkDiscountsExpiringSoon
};
