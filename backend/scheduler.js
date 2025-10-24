const cron = require('node-cron');
const axios = require('axios');

// ID менеджера
const MANAGER_TELEGRAM_ID = process.env.MANAGER_TELEGRAM_ID || '7696515351';
const BOT_TOKEN = process.env.BOT_TOKEN || '8113129973:AAHePXZqOW2MnajUEnporDpoYULAEyX1N_8';

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

// Функция получения статистики заказов
async function getOrdersStats() {
  try {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'poizonic',
      port: process.env.DB_PORT || 3306,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci'
    });
    
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
    
    await connection.end();
    
    return {
      newOrders: newOrders[0].count,
      pendingOrders: pendingOrders[0].count,
      processingOrders: processingOrders[0].count,
      readyOrders: readyOrders[0].count,
      shippedOrders: shippedOrders[0].count
    };
  } catch (error) {
    console.error('❌ Ошибка получения статистики заказов:', error);
    return null;
  }
}

// Функция проверки истечения скидок (реальная проверка и отправка уведомлений)
async function checkExpiredDiscounts() {
  try {
    console.log('🔍 Проверка истечения скидок...');
    
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'poizonic',
      port: process.env.DB_PORT || 3306,
      charset: 'utf8mb4',
      collation: 'utf8mb4_unicode_ci'
    });
    
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
    
    await connection.end();
    
  } catch (error) {
    console.error('❌ Ошибка проверки истечения скидок:', error);
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
    
    const message = `📋 <b>Ежедневная проверка заказов</b>\n` +
      `📅 ${currentDate}\n\n` +
      `🆕 <b>Новые заказы за 24ч:</b> ${stats.newOrders}\n` +
      `⏳ <b>В ожидании:</b> ${stats.pendingOrders}\n` +
      `🔄 <b>В обработке:</b> ${stats.processingOrders}\n` +
      `✅ <b>Готовы к отправке:</b> ${stats.readyOrders}\n` +
      `🚚 <b>В пути:</b> ${stats.shippedOrders}\n\n` +
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
  
  console.log('✅ Планировщик запущен');
  console.log('📅 Ежедневные уведомления: 12:00 МСК');
  console.log('⏰ Проверка скидок: каждый час');
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
  checkExpiredDiscounts
};
