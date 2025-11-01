const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const https = require('https');
const axios = require('axios');
// Используем встроенный fetch в Node.js 18+

// Загружаем переменные окружения
const envPath = path.join(__dirname, '.env');
const result = require('dotenv').config({ path: envPath });

if (result.error) {
  console.error('❌ Ошибка загрузки .env файла:', result.error);
  process.exit(1);
}

// Нормализация возможного BOM у первого ключа (например, \uFEFFMANAGER_TELEGRAM_ID)
// Такое бывает, если файл .env сохранён с BOM и ключ стоит на первой строке
if (!process.env.MANAGER_TELEGRAM_ID) {
  const weirdKey = Object.keys(process.env).find((k) => k.endsWith('MANAGER_TELEGRAM_ID'));
  if (weirdKey && weirdKey !== 'MANAGER_TELEGRAM_ID') {
    process.env.MANAGER_TELEGRAM_ID = process.env[weirdKey];
  }
}

// ============================================
// ВАЛИДАЦИЯ ПЕРЕМЕННЫХ ОКРУЖЕНИЯ
// ============================================
const requiredEnvVars = [
  'BOT_TOKEN',
  'MANAGER_TELEGRAM_ID',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME'
];

const missingVars = requiredEnvVars.filter(key => !process.env[key] || process.env[key].trim() === '');

if (missingVars.length > 0) {
  console.error('❌ ОШИБКА: Отсутствуют обязательные переменные окружения:');
  missingVars.forEach(key => {
    console.error(`   - ${key}`);
  });
  console.error('\n📝 Пожалуйста, создайте файл .env на основе env.example');
  console.error('    и заполните все обязательные переменные.\n');
  process.exit(1);
}

// Gamification System
const { GamificationService, LEVELS, LEVEL_REWARDS, XP_RULES } = require('./gamification');

// Scheduler for daily notifications
const { startScheduler, testNotification, checkExpiredDiscounts, checkDiscountsExpiringSoon } = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Статическая раздача загруженных файлов
app.use('/uploads', express.static('uploads'));

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/reviews';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'review-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения разрешены'), false);
    }
  }
});

// Database connection
let dbConnection;

// Gamification service instance
let gamificationService = null;

// Функция отправки сообщения менеджеру
async function sendManagerMessage(message) {
  const botToken = process.env.BOT_TOKEN;
  const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
  
  if (!botToken || !managerChatId) {
    console.log('⚠️ BOT_TOKEN или MANAGER_CHAT_ID не настроены, сообщение не отправлено');
    return false;
  }
  
  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = JSON.stringify({
      chat_id: managerChatId,
      text: message,
      parse_mode: 'HTML'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Сообщение менеджеру отправлено успешно');
            resolve(true);
          } else {
            console.error('❌ Ошибка отправки сообщения менеджеру:', responseData);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ Ошибка сети при отправке сообщения:', error);
        resolve(false);
      });
      
      req.write(data);
      req.end();
    });
  } catch (error) {
    console.error('❌ Ошибка отправки сообщения менеджеру:', error);
    return false;
  }
}

// Функция проверки прав бота в канале
async function testBotPermissions() {
  try {
    const channelId = '-1002499442701';
    const botToken = process.env.BOT_TOKEN;
    
    // Проверяем информацию о канале
    const getChatUrl = `https://api.telegram.org/bot${botToken}/getChat`;
    const response = await fetch(getChatUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: channelId })
    });
    
    if (response.ok) {
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Бот не имеет доступа к каналу:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка проверки прав бота:', error);
    return false;
  }
}

// Функция отправки отзыва в канал отзывов
async function sendReviewToFeedbackChannel(reviewData, userInfo) {
  try {
    // Сначала проверяем права бота
    const hasPermissions = await testBotPermissions();
    if (!hasPermissions) {
      console.error('❌ Бот не имеет прав для публикации в канале');
      return;
    }
    
    const channelId = '-1002499442701'; // ID вашего канала с отзывами
    const stars = '⭐'.repeat(reviewData.rating);
    
    let message = `⭐ Оценка: ${stars} (${reviewData.rating}/5)\n\n📝 Отзыв:\n${reviewData.review_text}\n\n👤 От: ${reviewData.full_name || userInfo.username || 'Пользователь'}`;
    
    // Если есть фото, пытаемся отправить с фото
    if (reviewData.photo_url) {
      try {
        // Формируем полный URL для фото (будет работать когда будет домен)
        const fullPhotoUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}${reviewData.photo_url}`;
        await sendTelegramPhoto(channelId, fullPhotoUrl, message);
      } catch (photoError) {
        console.error('❌ Ошибка отправки фото, отправляем только текст:', photoError.message);
        console.log('💡 Примечание: Фото будет работать когда будет настроен домен с SSL');
        // Если фото не отправилось, отправляем только текст
        await sendTelegramMessage(channelId, message);
      }
    } else {
      // Отправляем только текст
      await sendTelegramMessage(channelId, message);
    }
  } catch (error) {
    console.error('❌ Ошибка отправки отзыва в канал:', error);
  }
}

// Функция отправки фото в Telegram по URL
async function sendTelegramPhoto(chatId, photoUrl, caption = '') {
  const botToken = BOT_TOKEN;
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  
  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      photo: photoUrl,
      caption: caption,
      parse_mode: 'HTML'
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error('❌ Telegram API Photo Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      chatId: chatId,
      photoUrl: photoUrl
    });
    throw new Error(`Telegram API error: ${response.status} - ${errorData}`);
  }
  
  return await response.json();
}

// Функция отправки текстового сообщения в Telegram
async function sendTelegramMessage(chatId, message) {
  const botToken = BOT_TOKEN;
  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const response = await fetch(telegramApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    console.error('❌ Telegram API Message Error:', {
      status: response.status,
      statusText: response.statusText,
      error: errorData,
      chatId: chatId,
      message: message
    });
    throw new Error(`Telegram API error: ${response.status} - ${errorData}`);
  }
  
  return await response.json();
}

async function connectDB() {
  try {
    dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'poizonic',
      port: process.env.DB_PORT || 3306,
      charset: 'utf8mb4',
      // Настройка collation для правильной работы с emoji и международными символами
      collation: 'utf8mb4_unicode_ci'
    });
    
    // Устанавливаем UTF8MB4 для текущей сессии
    await dbConnection.execute("SET NAMES 'utf8mb4'");
    await dbConnection.execute("SET CHARACTER SET utf8mb4");
    await dbConnection.execute("SET character_set_connection=utf8mb4");
    
    // Обработчики событий соединения
    dbConnection.on('error', (err) => {
      console.error('❌ Ошибка соединения с БД:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('🔄 Соединение потеряно, будет переподключение...');
        dbConnection = null;
      }
    });
    
    // Initialize Gamification Service
    if (!gamificationService) {
      const dbConfig = {
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
      };
      gamificationService = new GamificationService(dbConfig);
      await gamificationService.init();
    }
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:', error);
    dbConnection = null;
    throw error;
  }
}

// Функция для проверки и переподключения к БД
async function ensureDBConnection() {
  try {
    if (!dbConnection || dbConnection.state === 'disconnected' || dbConnection.state === 'protocol_error') {
      console.log('🔄 Переподключение к базе данных...');
      
      // Отправляем уведомление админу о сбое БД
      try {
        const botToken = process.env.BOT_TOKEN;
        const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
        
        if (botToken && managerChatId) {
          const errorMessage = `🚨 <b>ПРОБЛЕМА С БД</b>\n\n` +
            `⚠️ <b>Статус:</b> Соединение с базой данных разорвано\n\n` +
            `🔄 <b>Действие:</b> Попытка переподключения...\n\n` +
            `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`;
          
          await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: managerChatId,
            text: errorMessage,
            parse_mode: 'HTML'
          }).catch(() => {});
        }
      } catch (notifyError) {
        console.error('❌ Не удалось отправить уведомление о сбое БД:', notifyError);
      }
      
      if (dbConnection) {
        try {
          await dbConnection.end();
        } catch (e) {
          // Игнорируем ошибки при закрытии
        }
      }
      await connectDB();
    }
    
    // Проверяем соединение тестовым запросом
    if (dbConnection) {
      await dbConnection.execute('SELECT 1');
    }
  } catch (error) {
    console.error('❌ Ошибка при проверке соединения с БД:', error);
    
    // Отправляем уведомление админу о критической ошибке БД
    try {
      const botToken = process.env.BOT_TOKEN;
      const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
      
      if (botToken && managerChatId) {
        const errorMessage = `🚨 <b>КРИТИЧЕСКАЯ ОШИБКА БД</b>\n\n` +
          `❌ <b>Ошибка:</b> ${error.message}\n\n` +
          `🔄 <b>Действие:</b> Попытка принудительного переподключения...\n\n` +
          `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
          `🔴 <b>ВНИМАНИЕ:</b> Сервис может работать некорректно!`;
        
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: managerChatId,
          text: errorMessage,
          parse_mode: 'HTML'
        }).catch(() => {});
      }
    } catch (notifyError) {
      console.error('❌ Не удалось отправить уведомление о сбое БД:', notifyError);
    }
    
    console.log('🔄 Принудительное переподключение...');
    if (dbConnection) {
      try {
        await dbConnection.end();
      } catch (e) {
        // Игнорируем ошибки при закрытии
      }
    }
    await connectDB();
  }
}

// Функция для логирования активности пользователя
async function logUserActivity(telegramId, actionType, actionData = {}) {
  try {
    if (!telegramId || !actionType) return;
    
    await ensureDBConnection();
    if (dbConnection) {
      await dbConnection.execute(`
        INSERT INTO user_activity (telegram_id, action_type, action_data)
        VALUES (?, ?, ?)
      `, [telegramId, actionType, JSON.stringify(actionData)]);
    }
  } catch (error) {
    console.error('❌ Ошибка логирования активности:', error);
  }
}

// Функция для создания системного лога
async function createSystemLog(logLevel, logMessage, logData = {}, telegramId = null) {
  try {
    await ensureDBConnection();
    if (dbConnection) {
      await dbConnection.execute(`
        INSERT INTO system_logs (log_level, log_message, log_data, telegram_id)
        VALUES (?, ?, ?, ?)
      `, [logLevel, logMessage, JSON.stringify(logData), telegramId]);
    }
  } catch (error) {
    console.error('❌ Ошибка создания системного лога:', error);
  }
}

// Константы
const DELIVERY_COST_PER_KG = 800;
// РЕЗЕРВНЫЙ курс (используется ТОЛЬКО если ЦБ РФ недоступен)
const DEFAULT_EXCHANGE_RATE = 12.5;
const MANAGER_TELEGRAM_ID = process.env.MANAGER_TELEGRAM_ID;
const BOT_TOKEN = process.env.BOT_TOKEN;

// Функция отправки сообщения в Telegram
async function sendTelegramMessage(chatId, message) {
  try {
    if (!BOT_TOKEN) {
      console.log('⚠️ BOT_TOKEN не настроен, сообщение не отправлено');
      return false;
    }

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      })
    });

    if (response.ok) {
      return true;
    } else {
      console.error('❌ Ошибка отправки сообщения:', await response.text());
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка отправки сообщения в Telegram:', error);
    return false;
  }
}

// Функция получения курса юаня (только API Центробанка России)
async function getYuanToRubExchangeRate() {
  try {
    const cbrResponse = await fetch('https://www.cbr-xml-daily.ru/daily_json.js', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        'Connection': 'keep-alive'
      }
    });
    
    if (!cbrResponse.ok) {
      console.error(`❌ ЦБРФ недоступен: HTTP ${cbrResponse.status}`);
      console.log(`⚠️ Используется резервный курс: ${DEFAULT_EXCHANGE_RATE}`);
      return DEFAULT_EXCHANGE_RATE;
    }

    const cbrData = await cbrResponse.json();
    const cnyRate = cbrData.Valute?.CNY?.Value;
    
    if (cnyRate && cnyRate > 0) {
      const adjustedRate = cnyRate + 1.1;
      console.log(`✅ Курс юаня получен с ЦБРФ: ${cnyRate} + 1.1 = ${adjustedRate}`);
      return adjustedRate;
    } else {
      console.error('⚠️ Курс юаня не найден в данных ЦБРФ, используется резервный');
      return DEFAULT_EXCHANGE_RATE;
    }
  } catch (error) {
    console.error('❌ Ошибка получения курса юаня:', error.message);
    console.log(`⚠️ Используется резервный курс: ${DEFAULT_EXCHANGE_RATE}`);
    return DEFAULT_EXCHANGE_RATE;
  }
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Получение курса юаня
app.get('/api/exchange-rate', async (req, res) => {
  try {
    const rate = await getYuanToRubExchangeRate();
    res.json({ rate: rate, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Ошибка получения курса:', error);
    res.status(500).json({ error: 'Ошибка получения курса' });
  }
});

// Отправка отзыва
app.post('/api/submit-review', async (req, res) => {
  try {
    const { telegramId, username, reviewText } = req.body;
    
    if (!telegramId || !reviewText) {
      return res.status(400).json({ error: 'Необходимы telegram ID и текст отзыва' });
    }

    // Отправляем отзыв менеджеру в Telegram
    const managerId = process.env.MANAGER_TELEGRAM_ID;
    
    if (managerId) {
      const message = `📝 Новый отзыв от пользователя:\n\n` +
                     `👤 Пользователь: @${username || 'неизвестно'} (ID: ${telegramId})\n` +
                     `📝 Отзыв: ${reviewText}\n\n` +
                     `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;
      
      await sendTelegramMessage(managerId, message);
    }
    
    console.log('Review submitted:', { telegramId, username, reviewText });

    res.json({ 
      success: true, 
      message: 'Отзыв отправлен успешно!' 
    });
  } catch (error) {
    console.error('Ошибка отправки отзыва:', error);
    res.status(500).json({ error: 'Ошибка отправки отзыва' });
  }
});

// API endpoint для получения статистики рефералов
app.post('/api/referral-stats', async (req, res) => {
  try {
    const { telegramId } = req.body;
    
    if (!telegramId) {
      return res.status(400).json({ error: 'Telegram ID обязателен' });
    }

    // Проверяем соединение с БД
    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Получаем информацию о пользователе
        const [userRows] = await dbConnection.execute(
          'SELECT commission, access_expires_at FROM users WHERE telegram_id = ?',
          [telegramId]
        );

        // Получаем количество приглашенных пользователей
        const [referralRows] = await dbConnection.execute(
          'SELECT COUNT(*) as total_referrals FROM referrals WHERE referred_by = ?',
          [telegramId]
        );

        // Получаем количество кликов по ссылке
        const [clicksRows] = await dbConnection.execute(
          'SELECT clicks FROM referrals WHERE telegram_id = ?',
          [telegramId]
        );

        const user = userRows[0] || { commission: 1000, access_expires_at: null };
        const totalReferrals = referralRows[0]?.total_referrals || 0;
        const clicks = clicksRows[0]?.clicks || 0;

        // Проверяем, активна ли скидка
        let discountActive = false;
        let discountExpiresAt = null;
        
        if (user.access_expires_at) {
          const expiresAt = new Date(user.access_expires_at);
          const now = new Date();
          discountActive = expiresAt > now;
          discountExpiresAt = user.access_expires_at;
        }

        res.json({
          success: true,
          data: {
            currentCommission: user.commission,
            discountActive,
            discountExpiresAt,
            totalReferrals,
            totalClicks: clicks
          }
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения статистики' });
      }
    } else {
      res.status(500).json({ error: 'База данных недоступна' });
    }
  } catch (error) {
    console.error('Ошибка API referral-stats:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// Сохранение отзыва в базу данных
app.post('/api/submit-review-direct', async (req, res) => {
  try {
    const { telegramId, username, reviewText, timestamp } = req.body;
    
    if (!telegramId || !reviewText) {
      return res.status(400).json({ error: 'Необходимы telegram ID и текст отзыва' });
    }

    // Проверяем соединение с БД
    await ensureDBConnection();

    if (dbConnection) {
      // Сохраняем отзыв в базу данных
      await dbConnection.execute(
        `INSERT INTO reviews (telegram_id, username, review_text, created_at) 
         VALUES (?, ?, ?, ?)`,
        [telegramId, username || '', reviewText, timestamp || new Date()]
      );

      // Отправляем уведомление менеджеру
      const managerId = process.env.MANAGER_TELEGRAM_ID;
      
      if (managerId) {
        const message = `📝 Новый отзыв от пользователя:\n\n` +
                       `👤 Пользователь: @${username || 'неизвестно'} (ID: ${telegramId})\n` +
                       `📝 Отзыв: ${reviewText}\n\n` +
                       `⏰ Время: ${new Date(timestamp).toLocaleString('ru-RU')}`;
        
        await sendTelegramMessage(managerId, message);
      }
      
      console.log('Review saved to database:', { telegramId, username, reviewText });
    }

    res.json({ 
      success: true, 
      message: 'Отзыв сохранен успешно!' 
    });
  } catch (error) {
    console.error('Ошибка сохранения отзыва:', error);
    res.status(500).json({ error: 'Ошибка сохранения отзыва' });
  }
});

// Расчет стоимости товара
app.post('/api/calculate-price', async (req, res) => {
  try {
    const { price, weight, category, telegramId } = req.body;
    
    if (!price || !weight) {
      console.log('❌ Отсутствуют обязательные поля:', { price, weight });
      return res.status(400).json({ error: 'Необходимы цена товара и вес' });
    }

    // Проверяем соединение с БД
    await ensureDBConnection();

    // Получаем комиссию пользователя
    let commission = 1000; // По умолчанию 1000₽
    if (telegramId && dbConnection) {
      try {
        const [rows] = await dbConnection.execute(
          'SELECT commission, access_expires_at FROM users WHERE telegram_id = ?',
          [telegramId]
        );
        
        if (rows.length > 0) {
          const user = rows[0];
          if (user.access_expires_at && new Date() < new Date(user.access_expires_at)) {
            commission = user.commission; // 400₽ для рефералов
          } else {
            commission = user.commission; // 1000₽ по умолчанию
          }
        }
      } catch (dbError) {
        console.error('Ошибка получения данных пользователя:', dbError);
      }
    }
    
    const currentRate = await getYuanToRubExchangeRate();
    
    const itemCostRub = price * currentRate;
    const deliveryCost = weight * DELIVERY_COST_PER_KG;
    
    // ========== ПРИМЕНЕНИЕ НАГРАД ОТ ДОСТИЖЕНИЙ ==========
    let finalCommission = commission;
    let appliedRewards = [];
    
    if (telegramId && gamificationService) {
      try {
        // Получаем достижения пользователя
        const achievements = await gamificationService.getUserAchievements(telegramId);
        const unlockedAchievements = achievements.filter(ach => ach.unlocked);
        
        // Применяем награды от достижений
        for (const achievement of unlockedAchievements) {
          switch (achievement.key) {
            case 'dragon_newbie':
              // Первый заказ без комиссии за оформление
              if (achievement.key === 'dragon_newbie') {
                // Проверяем, это первый заказ пользователя
                const [orderCount] = await dbConnection.execute(
                  'SELECT COUNT(*) as count FROM orders WHERE telegram_id = ? AND status = "completed"',
                  [telegramId]
                );
                if (orderCount[0].count === 0) {
                  finalCommission = 0;
                  appliedRewards.push('Первый заказ без комиссии (Дракон-новичок)');
                }
              }
              break;
              
            case 'emperor_purchases':
              // Постоянная скидка 0.5% на все заказы
              finalCommission = Math.max(0, finalCommission - (finalCommission * 0.005));
              appliedRewards.push('Скидка 0.5% (Император покупок)');
              break;
              
            case 'balance_master':
              // Скидка 1% на комиссию
              finalCommission = Math.max(0, finalCommission - (finalCommission * 0.01));
              appliedRewards.push('Скидка 1% на комиссию (Мастер баланса)');
              break;
              
            case 'economy_dragon':
              // Постоянная скидка 1% на все операции
              finalCommission = Math.max(0, finalCommission - (finalCommission * 0.01));
              appliedRewards.push('Скидка 1% на все операции (Эконом-дракон)');
              break;
              
            case 'dragon_summoner':
              // Скидка 2% на все заказы
              finalCommission = Math.max(0, finalCommission - (finalCommission * 0.02));
              appliedRewards.push('Скидка 2% на все заказы (Дракон-призыватель)');
              break;
          }
        }
        
        // Применяем награды от уровня
        const [userData] = await dbConnection.execute(
          'SELECT current_level FROM users WHERE telegram_id = ?',
          [telegramId]
        );
        
        if (userData.length > 0) {
          const userLevel = userData[0].current_level;
          switch (userLevel) {
            case 'Silver':
              // Комиссия 900₽ навсегда
              finalCommission = 900;
              appliedRewards.push('Комиссия 900₽ (Уровень Silver)');
              break;
            case 'Gold':
              // Комиссия 700₽ навсегда
              finalCommission = 700;
              appliedRewards.push('Комиссия 700₽ (Уровень Gold)');
              break;
            case 'Platinum':
              // Комиссия 400₽ навсегда
              finalCommission = 400;
              appliedRewards.push('Комиссия 400₽ (Уровень Platinum)');
              break;
            case 'Diamond':
              // Комиссия 0₽ навсегда (полное освобождение)
              finalCommission = 0;
              appliedRewards.push('Комиссия 0₽ (Уровень Diamond)');
              break;
          }
        }
        
      } catch (rewardError) {
        console.error('Ошибка применения наград:', rewardError);
      }
    }
    // ========== End Rewards ==========
    
    const commissionAmount = Math.round(finalCommission); // Округляем до целых рублей
    const totalCost = itemCostRub + commissionAmount + deliveryCost;

    // Обновляем статистику пользователя: увеличиваем счетчик расчетов
    if (telegramId && dbConnection) {
      try {
        await dbConnection.execute(
          `UPDATE users 
           SET calculation_count = calculation_count + 1,
               last_calculation_date = NOW(),
               last_activity = NOW()
           WHERE telegram_id = ?`,
          [telegramId]
        );
      } catch (updateError) {
        console.error('Ошибка обновления счетчика расчетов:', updateError);
        // Не прерываем выполнение, если не удалось обновить статистику
      }
    }

    const result = {
      originalPrice: parseFloat(price),
      priceInRubles: parseFloat(itemCostRub.toFixed(2)),
      deliveryCost: parseFloat(deliveryCost.toFixed(2)),
      commission: parseFloat(commissionAmount.toFixed(2)),
      commissionRate: commission, // Теперь это просто сумма в рублях
      appliedRewards: appliedRewards, // Список примененных наград
      originalCommission: commission, // Исходная комиссия
      discountAmount: commission - commissionAmount, // Размер скидки
      totalCost: parseFloat(totalCost.toFixed(2)),
      exchangeRate: parseFloat(currentRate.toFixed(2)),
      weight: parseFloat(weight)
    };
    
    res.json(result);
  } catch (error) {
    console.error('Ошибка расчета стоимости:', error);
    res.status(500).json({ error: 'Ошибка расчета стоимости' });
  }
});

// Создание заказа
app.post('/api/orders', async (req, res) => {
  try {
    const {
      telegramId,
      username,
      items, // Массив товаров
      fullName,
      phoneNumber,
      pickupPoint,
      pickupPointAddress,
      comments
    } = req.body;
    
    if (!telegramId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Необходимы telegram ID и массив товаров' });
    }

    // Валидация номера телефона (интернациональный формат)
    function validatePhoneNumber(phone) {
      if (!phone) return false;
      const cleaned = phone.replace(/\D/g, ''); // оставить только цифры
      // Допускаем международные номера: от 7 до 15 цифр (E.164 максимум 15)
      return cleaned.length >= 7 && cleaned.length <= 15;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({ 
        error: 'Некорректный номер телефона. Укажите международный формат (например: +1 415 555 2671)' 
      });
    }

    // Валидация товаров
    for (const item of items) {
      if (!item.productLink) {
        return res.status(400).json({ error: 'Все товары должны содержать ссылку' });
      }
    }

    // Проверяем соединение с БД
    await ensureDBConnection();

    // Проверяем, что соединение действительно работает
    if (!dbConnection) {
      console.error('❌ Нет соединения с базой данных');
      return res.status(500).json({ error: 'Ошибка соединения с базой данных' });
    }

    try {
      // Создаем или обновляем пользователя
      await dbConnection.execute(
        `INSERT INTO users (telegram_id, commission, referred_by) 
         VALUES (?, 1000, ?) 
         ON DUPLICATE KEY UPDATE telegram_id = telegram_id`,
        [telegramId, telegramId]
      );

      // Получаем username и комиссию из базы данных
      const [userRows] = await dbConnection.execute(
        'SELECT username, commission FROM users WHERE telegram_id = ?',
        [telegramId]
      );
      
      const dbUsername = userRows.length > 0 ? userRows[0].username : username;
      const userCommission = userRows.length > 0 ? userRows[0].commission : 1000;

              // Создаем заказ (без товаров)
      const [result] = await dbConnection.execute(
                `INSERT INTO orders (telegram_id, username, full_name, phone_number, pickup_point, pickup_point_address, comments, status) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
                [telegramId, dbUsername, fullName, phoneNumber, pickupPoint, pickupPointAddress, comments || '']
              );

      const orderId = result.insertId;
      let totalSavings = 0;

      // Добавляем товары в заказ
      for (const item of items) {
        // Рассчитываем реальную экономию: базовая 5000₽ + скидка на комиссию
        const commissionDiscount = 1000 - userCommission;
        const itemSavings = 5000.00 + commissionDiscount;
        totalSavings += itemSavings;

        await dbConnection.execute(
          `INSERT INTO order_items (order_id, product_link, product_size, quantity, estimated_savings) 
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, item.productLink, item.productSize || '', item.quantity || 1, itemSavings]
        );
      }

      // Обновляем общую экономию заказа
      await dbConnection.execute(
        `UPDATE orders SET estimated_savings = ? WHERE order_id = ?`,
        [totalSavings, orderId]
      );

      // Генерируем tracking number и создаем запись в delivery_tracking
      const trackingNumber = `POIZ-${orderId.toString().padStart(6, '0')}`;
      await dbConnection.execute(
        `INSERT INTO delivery_tracking (order_id, internal_tracking_number, status) 
         VALUES (?, ?, 'Создан')`,
        [orderId, trackingNumber]
      );

      // Логируем активность пользователя
      await logUserActivity(telegramId, 'order_created', {
        orderId: orderId,
        itemsCount: items.length,
        totalSavings: totalSavings,
        items: items.map(item => ({
          productLink: item.productLink,
          productSize: item.productSize,
          quantity: item.quantity || 1
        }))
      });

      // Создаем системный лог
      await createSystemLog('info', `Новый заказ создан: #${orderId} (${items.length} товаров)`, {
        telegramId,
        orderId: orderId,
        itemsCount: items.length,
        totalSavings: totalSavings,
        fullName,
        phoneNumber,
        pickupPoint,
        items: items
      }, telegramId);

      // NOTE: XP начисляется только после подтверждения заказа админом, а не при создании
      // См. admin panel endpoint для подтверждения заказа

      // Отправляем уведомление менеджеру
      let orderMessage = `🛍️ <b>Новый заказ #${orderId}</b>\n\n` +
                         `👤 <b>Клиент:</b> ${fullName}\n` +
                         `📱 <b>Телефон:</b> ${phoneNumber}\n` +
                         `🆔 <b>Telegram ID:</b> ${telegramId}\n` +
                         `👤 <b>Username:</b> @${username || 'неизвестно'}\n\n` +
                         `📦 <b>Товары (${items.length}):</b>\n`;
      
      items.forEach((item, index) => {
        orderMessage += `${index + 1}. 🔗 ${item.productLink}\n`;
        if (item.productSize) orderMessage += `   📏 Размер: ${item.productSize}\n`;
        orderMessage += `   📦 Количество: ${item.quantity || 1}\n\n`;
      });
      
      orderMessage += `🚚 <b>Служба доставки:</b> ${pickupPoint}\n` +
                         `📍 <b>Адрес:</b> ${pickupPointAddress}\n\n` +
                         `${comments ? `💬 <b>Комментарии:</b> ${comments}\n\n` : ''}` +
                      `💰 <b>Экономия:</b> ${totalSavings.toLocaleString('ru-RU')} ₽\n\n` +
                         `⏰ <b>Время заказа:</b> ${new Date().toLocaleString('ru-RU')}`;

      await sendTelegramMessage(MANAGER_TELEGRAM_ID, orderMessage);

      res.json({ 
        success: true, 
        orderId: orderId,
        trackingNumber: trackingNumber,
        itemsCount: items.length,
        totalSavings: totalSavings,
        message: `Заказ создан успешно! Добавлено ${items.length} товаров. Экономия: ${totalSavings.toLocaleString('ru-RU')} ₽. Номер отслеживания: ${trackingNumber}. Скоро с вами свяжется менеджер для оплаты.`
      });
    } catch (dbError) {
      console.error('Ошибка работы с базой данных:', dbError);
      res.status(500).json({ error: 'Ошибка создания заказа' });
    }
  } catch (error) {
    console.error('Ошибка создания заказа:', error);
    res.status(500).json({ error: 'Ошибка создания заказа' });
  }
});

// Создание или обновление пользователя при запуске
app.post('/api/user/init', async (req, res) => {
  try {
    const { telegramId, username, fullName } = req.body;
    
    if (!telegramId) {
      return res.status(400).json({ error: 'Необходим telegram ID' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Проверяем, существует ли пользователь
        const [existingUser] = await dbConnection.execute(
          'SELECT * FROM users WHERE telegram_id = ?',
          [telegramId]
        );

        if (existingUser.length > 0) {
          // Обновляем существующего пользователя (username, full_name и last_activity)
          await dbConnection.execute(
            `UPDATE users SET username = ?, full_name = ?, last_activity = NOW() 
             WHERE telegram_id = ?`,
            [username || null, fullName || null, telegramId]
          );
          
          console.log(`✅ Обновлен пользователь ${telegramId}: username=${username}, fullName=${fullName}`);
        } else {
          // Создаем нового пользователя с базовой комиссией и временем активности
          await dbConnection.execute(
            `INSERT INTO users (telegram_id, username, full_name, commission, last_activity) 
             VALUES (?, ?, ?, 1000, NOW())`,
            [telegramId, username || null, fullName || null]
          );
          
          console.log(`✅ Создан новый пользователь ${telegramId}: username=${username}, fullName=${fullName}`);
        }

        res.json({ 
          success: true, 
          message: 'Пользователь инициализирован'
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка инициализации пользователя' });
      }
    } else {
      res.json({ 
        success: true, 
        message: 'Пользователь инициализирован (БД недоступна)'
      });
    }
  } catch (error) {
    console.error('Ошибка инициализации пользователя:', error);
    res.status(500).json({ error: 'Ошибка инициализации пользователя' });
  }
});

// Эндпоинт для обновления активности пользователя (heartbeat) - для отслеживания онлайн-статуса
app.post('/api/user/heartbeat', async (req, res) => {
  try {
    const { telegramId } = req.body;
    
    if (!telegramId) {
      return res.status(400).json({ error: 'Необходим telegram ID' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Обновляем время последней активности пользователя
        await dbConnection.execute(
          'UPDATE users SET last_activity = NOW() WHERE telegram_id = ?',
          [telegramId]
        );

        res.json({ success: true });
      } catch (dbError) {
        console.error('Ошибка обновления активности:', dbError);
        res.status(500).json({ error: 'Ошибка обновления активности' });
      }
    } else {
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Ошибка heartbeat:', error);
    res.status(500).json({ error: 'Ошибка обновления активности' });
  }
});

// Обработка рефералов
app.post('/api/referral', async (req, res) => {
  try {
    const { telegramId, referralId, username } = req.body;
    
    if (!telegramId || !referralId) {
      return res.status(400).json({ error: 'Необходимы telegram ID и referral ID' });
    }

    if (dbConnection) {
      try {
        // Проверяем, не является ли пользователь сам себе рефералом
        if (telegramId === referralId) {
          return res.status(400).json({ error: 'Нельзя использовать собственную реферальную ссылку' });
        }

        // Проверяем, существует ли пользователь
        const [existingUser] = await dbConnection.execute(
          'SELECT * FROM users WHERE telegram_id = ?',
          [telegramId]
        );

        if (existingUser.length > 0) {
          // Отправляем уведомление пользователю, что он уже не может воспользоваться реферальной ссылкой
          const alreadyRegisteredMessage = `❌ <b>Реферальная ссылка недоступна</b>\n\n` +
                                          `Вы уже зарегистрированы в Poizonic и не можете воспользоваться реферальной ссылкой.\n\n` +
                                          `💡 Реферальная программа доступна только для новых пользователей.`;

          await sendTelegramMessage(telegramId, alreadyRegisteredMessage);
          
          return res.status(400).json({ error: 'Пользователь уже зарегистрирован' });
        }

        // Получаем информацию о реферере для уведомления
        const [referrerInfo] = await dbConnection.execute(
          'SELECT username, full_name FROM users WHERE telegram_id = ?',
          [referralId]
        );

        // Создаем пользователя с реферальной скидкой на 2 недели
        await dbConnection.execute(
          `INSERT INTO users (telegram_id, commission, referred_by, access_expires_at) 
           VALUES (?, 400, ?, DATE_ADD(NOW(), INTERVAL 14 DAY))`,
          [telegramId, referralId]
        );

        // Продлеваем скидку реферера на 1 неделю (или даем первую скидку)
        const [referrerCurrentDiscount] = await dbConnection.execute(
          'SELECT access_expires_at FROM users WHERE telegram_id = ?',
          [referralId]
        );

        if (referrerCurrentDiscount.length > 0 && referrerCurrentDiscount[0].access_expires_at) {
          const currentExpiry = new Date(referrerCurrentDiscount[0].access_expires_at);
          const now = new Date();
          
          if (currentExpiry > now) {
            // У реферера есть активная скидка - продлеваем на 7 дней
            const newExpiry = new Date(currentExpiry.getTime() + 7 * 24 * 60 * 60 * 1000);
            await dbConnection.execute(
              'UPDATE users SET commission = 400, access_expires_at = ? WHERE telegram_id = ?',
              [newExpiry, referralId]
            );
          } else {
            // У реферера была скидка, но она истекла - даем новую на 7 дней
            await dbConnection.execute(
              'UPDATE users SET commission = 400, access_expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY) WHERE telegram_id = ?',
              [referralId]
            );
          }
        } else {
          // У реферера никогда не было скидки - даем первую на 7 дней
          await dbConnection.execute(
            'UPDATE users SET commission = 400, access_expires_at = DATE_ADD(NOW(), INTERVAL 7 DAY) WHERE telegram_id = ?',
            [referralId]
          );
        }

        // Отправляем уведомление новому пользователю
        const newUserMessage = `🎉 <b>Добро пожаловать в Poizonic!</b>\n\n` +
                               `Вы активировали реферальную программу!\n\n` +
                               `💰 <b>Ваша комиссия:</b> 400₽ (вместо 1000₽)\n` +
                               `⏰ <b>Действует до:</b> ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleString('ru-RU')}\n\n` +
                               `💡 Теперь вы можете делать заказы по сниженной комиссии!`;

        await sendTelegramMessage(telegramId, newUserMessage);

        // Получаем обновленную информацию о скидке реферера для уведомления
        const [updatedReferrerInfo] = await dbConnection.execute(
          'SELECT access_expires_at FROM users WHERE telegram_id = ?',
          [referralId]
        );

        const referrerExpiry = updatedReferrerInfo[0]?.access_expires_at;
        const expiryDate = referrerExpiry ? new Date(referrerExpiry).toLocaleString('ru-RU') : 'неизвестно';

        // Отправляем уведомление рефереру
        const referrerMessage = `🎉 <b>Новый реферал!</b>\n\n` +
                                `Вашу реферальную ссылку активировали!\n\n` +
                                `🎁 <b>Ваша скидка продлена до:</b> ${expiryDate}\n\n` +
                                `💡 Спасибо, что приглашаете друзей в Poizonic!`;

        await sendTelegramMessage(referralId, referrerMessage);

        // Логируем активность пользователя
        await logUserActivity(telegramId, 'referral_activated', {
          referredBy: referralId,
          commission: 400
        });

        // Обновляем статистику реферера: увеличиваем счетчик рефералов
        await dbConnection.execute(
          `UPDATE users 
           SET total_referrals = total_referrals + 1,
               last_activity = NOW()
           WHERE telegram_id = ?`,
          [referralId]
        );

        // Логируем активность реферера
        await logUserActivity(referralId, 'referral_success', {
          referredUser: telegramId
        });

        // Создаем системный лог
        await createSystemLog('info', `Реферальная программа активирована: ${telegramId} приглашен ${referralId}`, {
          telegramId,
          referralId
        });

        // ========== GAMIFICATION: Award XP for referral ==========
        try {
          if (gamificationService) {
            // Награда за приглашение реферала (50 XP)
            const xpResult = await gamificationService.awardXP(
              referralId,
              XP_RULES.REFERRAL_REGISTRATION,
              'referral',
              telegramId,
              `Приглашен реферал: ${telegramId}`
            );
            
            // Проверяем достижения по рефералам
            const achievements = await gamificationService.checkReferralAchievements(referralId, telegramId);
            
            // Отправляем уведомление о повышении уровня
            if (xpResult.leveledUp) {
              const levelUpMsg = `🎊 <b>Поздравляем!</b>\n\n` +
                `Вы достигли уровня <b>${xpResult.currentLevel}</b>! 🏆\n\n` +
                `🎁 <b>Награды:</b>\n${xpResult.rewards.description}\n\n` +
                `✨ Всего XP: ${xpResult.totalXP}\n` +
                `🆔 Telegram ID: ${referralId}`;
              
              await sendTelegramMessage(referralId, levelUpMsg);
            }
            
            // Отправляем уведомления о разблокированных достижениях
            for (const achievement of achievements) {
              if (!achievement.alreadyUnlocked && achievement.achievement) {
                const achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                  `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                  `📝 ${achievement.achievement.description}\n\n` +
                  `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                
                await sendTelegramMessage(referralId, achievementMsg);
              }
            }
          }
        } catch (gamificationError) {
          console.error('❌ Ошибка начисления XP за реферала:', gamificationError);
          // Не прерываем процесс создания реферала
        }
        // ========== End Gamification ==========

        res.json({ 
          success: true, 
          message: 'Реферальная программа активирована! Уведомления отправлены.'
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка обработки реферала' });
      }
    } else {
      res.json({ 
        success: true, 
        message: 'Реферальная программа активирована!'
      });
    }
  } catch (error) {
    console.error('Ошибка обработки реферала:', error);
    res.status(500).json({ error: 'Ошибка обработки реферала' });
  }
});

// Получение информации о пользователе
app.get('/api/user/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    
    if (dbConnection) {
      try {
        const [rows] = await dbConnection.execute(
          `SELECT u.*, r.referral_url, r.clicks 
           FROM users u 
           LEFT JOIN referrals r ON u.telegram_id = r.telegram_id 
           WHERE u.telegram_id = ?`,
          [telegramId]
        );

        if (rows.length === 0) {
          return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const user = rows[0];
        const hasDiscount = user.access_expires_at && new Date() < new Date(user.access_expires_at);
        
        res.json({
          telegramId: user.telegram_id,
          commission: user.commission,
          hasDiscount: hasDiscount,
          discountExpiresAt: user.access_expires_at,
          referralUrl: user.referral_url,
          referralClicks: user.clicks || 0
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения информации о пользователе' });
      }
    } else {
      res.json({
        telegramId: telegramId,
        commission: 1000,
        hasDiscount: false,
        discountExpiresAt: null,
        referralUrl: null,
        referralClicks: 0
      });
    }
  } catch (error) {
    console.error('Ошибка получения информации о пользователе:', error);
    res.status(500).json({ error: 'Ошибка получения информации о пользователе' });
  }
});

// API для отзывов
// Получение отзывов с пагинацией
app.get('/api/reviews', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    
          // Получаем общее количество одобренных отзывов
          const [totalRows] = await dbConnection.execute(`
            SELECT COUNT(*) as total FROM reviews WHERE is_approved = 1
          `);
          const total = totalRows[0].total;
          
          // Получаем только одобренные отзывы с пагинацией
          const [rows] = await dbConnection.execute(`
            SELECT review_id, telegram_id, username, full_name, rating, review_text, photo_url, created_at, moderated_at
            FROM reviews 
            WHERE is_approved = 1
            ORDER BY moderated_at DESC, created_at DESC
            LIMIT ${limit} OFFSET ${offset}
          `);
    
    // Получаем все фото для каждого отзыва
    const reviewsWithPhotos = await Promise.all(rows.map(async (review) => {
      const [photos] = await dbConnection.execute(`
        SELECT photo_url, display_order
        FROM review_photos
        WHERE review_id = ?
        ORDER BY display_order ASC
      `, [review.review_id]);
      
      return {
        ...review,
        photos: photos.map(p => p.photo_url) // Массив URL фотографий
      };
    }));
    
    const totalPages = Math.ceil(total / limit);
    
    res.json({ 
      reviews: reviewsWithPhotos,
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages
    });
  } catch (error) {
    console.error('Ошибка получения отзывов:', error);
    res.status(500).json({ error: 'Ошибка получения отзывов' });
  }
});

// Получение средней оценки отзывов
app.get('/api/reviews/average-rating', async (req, res) => {
  try {
    await ensureDBConnection();
    
          const [rows] = await dbConnection.execute(`
            SELECT AVG(rating) as averageRating, COUNT(*) as totalReviews
            FROM reviews
            WHERE is_approved = 1
          `);
    
    const averageRating = rows[0].averageRating || 0;
    const totalReviews = rows[0].totalReviews || 0;
    
    // Проверяем, что averageRating - число
    const numericRating = parseFloat(averageRating) || 0;
    
    res.json({ 
      averageRating: parseFloat(numericRating.toFixed(1)),
      totalReviews: totalReviews
    });
  } catch (error) {
    console.error('❌ Ошибка получения средней оценки:', error);
    res.status(500).json({ error: 'Ошибка получения средней оценки' });
  }
});

// Создание нового отзыва
app.post('/api/reviews', upload.array('photos', 10), async (req, res) => {
  try {
    await ensureDBConnection();
    
    // Поддержка обоих форматов данных (camelCase и snake_case)
    const telegram_id = req.body.telegram_id || req.body.telegramId;
    const username = req.body.username;
    const full_name = req.body.full_name || req.body.fullName;
    const rating = req.body.rating;
    const review_text = req.body.review_text || req.body.reviewText || req.body.comment;
    const files = req.files || [];
    
    console.log('Получены данные отзыва:', {
      telegram_id,
      username,
      full_name,
      rating,
      review_text,
      photosCount: files.length
    });
    
    // Валидация
    if (!telegram_id || !rating || rating < 1 || rating > 5) {
      console.error('Ошибка валидации:', { telegram_id, rating });
      return res.status(400).json({ error: 'Неверные данные отзыва' });
    }
    
    // Берём первое фото для обратной совместимости (старое поле photo_url)
    let photo_url = null;
    if (files.length > 0) {
      photo_url = `/uploads/reviews/${files[0].filename}`;
    }
    
    // Проверяем, существует ли пользователь, если нет - создаем
    const [existingUser] = await dbConnection.execute(
      'SELECT telegram_id FROM users WHERE telegram_id = ?',
      [telegram_id]
    );
    
    if (existingUser.length === 0) {
      console.log('Создаем нового пользователя:', telegram_id);
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, commission, created_at) 
        VALUES (?, 1000, NOW())
      `, [telegram_id]);
    }
    
    const [result] = await dbConnection.execute(`
      INSERT INTO reviews (telegram_id, username, full_name, rating, review_text, photo_url, is_approved)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `, [telegram_id, username, full_name, rating, review_text, photo_url]);
    
    const reviewId = result.insertId;
    
    // Сохраняем все фото в таблицу review_photos
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await dbConnection.execute(`
          INSERT INTO review_photos (review_id, photo_url, display_order)
          VALUES (?, ?, ?)
        `, [reviewId, `/uploads/reviews/${file.filename}`, i]);
      }
    }
    
    // Логируем активность пользователя
    await logUserActivity(telegram_id, 'review_created', {
      reviewId: reviewId,
      rating,
      photosCount: files.length
    });

    // Создаем системный лог
    await createSystemLog('info', `Новый отзыв создан: #${reviewId}`, {
      telegramId: telegram_id,
      reviewId: reviewId,
      rating,
      photosCount: files.length
    }, telegram_id);
    
    // Отправляем уведомление менеджеру о новом отзыве
    const stars = '⭐'.repeat(parseInt(rating));
    const photosInfo = files.length > 0 ? `📸 <b>Фото:</b> ${files.length}\n\n` : '';
    const managerMessage = `📝 <b>Новый отзыв (требует модерации)!</b>\n\n` +
                          `${stars} <b>Оценка:</b> ${rating}/5\n` +
                          `👤 <b>От:</b> ${full_name || username || 'Аноним'} (@${username || 'без username'})\n` +
                          `🆔 <b>ID:</b> ${telegram_id}\n\n` +
                          `💬 <b>Отзыв:</b>\n${review_text || 'Без текста'}\n\n` +
                          photosInfo +
                          `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
                          `🆔 <b>ID отзыва:</b> ${reviewId}\n` +
                          `⚠️ <b>Статус:</b> Ожидает модерации`;
    
    await sendManagerMessage(managerMessage);
    console.log('✅ Уведомление менеджеру о новом отзыве отправлено');
    
    // НЕ отправляем отзыв в канал - только после модерации
    console.log('⏳ Отзыв ожидает модерации, публикация в канал отложена');
    
    res.json({ 
      success: true, 
      review_id: reviewId,
      message: 'Отзыв успешно добавлен!' 
    });
  } catch (error) {
    console.error('Ошибка создания отзыва:', error);
    res.status(500).json({ error: 'Ошибка создания отзыва' });
  }
});

// ==================== МОДЕРАЦИЯ ОТЗЫВОВ ====================

// Получение всех отзывов для модерации (админка)
app.get('/api/admin/reviews', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'all'; // all, pending, approved
    
    let whereClause = '';
    if (status === 'pending') {
      whereClause = 'WHERE is_approved = 0';
    } else if (status === 'approved') {
      whereClause = 'WHERE is_approved = 1';
    }
    
    // Получаем общее количество отзывов
    const [totalRows] = await dbConnection.execute(`
      SELECT COUNT(*) as total FROM reviews ${whereClause}
    `);
    const total = totalRows[0].total;
    
    // Получаем отзывы с пагинацией
    const [rows] = await dbConnection.execute(`
      SELECT review_id, telegram_id, username, full_name, rating, review_text, photo_url, 
             created_at, is_approved, moderated_at, moderated_by
      FROM reviews 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);
    
    const totalPages = Math.ceil(total / limit);
    
    res.json({ 
      reviews: rows,
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages,
      status: status
    });
  } catch (error) {
    console.error('❌ Ошибка получения отзывов для модерации:', error);
    res.status(500).json({ error: 'Ошибка получения отзывов' });
  }
});

// Одобрение отзыва
app.post('/api/admin/reviews/:reviewId/approve', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const reviewId = req.params.reviewId;
    const moderatorId = req.body.moderatorId || 'admin'; // ID модератора
    
    // Обновляем статус отзыва
    await dbConnection.execute(`
      UPDATE reviews 
      SET is_approved = 1, moderated_at = NOW(), moderated_by = ?
      WHERE review_id = ?
    `, [moderatorId, reviewId]);
    
    // Получаем данные отзыва для отправки в канал
    const [reviewRows] = await dbConnection.execute(`
      SELECT telegram_id, username, full_name, rating, review_text, photo_url
      FROM reviews 
      WHERE review_id = ?
    `, [reviewId]);
    
    if (reviewRows.length > 0) {
      const review = reviewRows[0];
      
      // Отправляем отзыв в канал отзывов
      const reviewData = {
        rating: parseInt(review.rating),
        review_text: review.review_text,
        full_name: review.full_name,
        photo_url: review.photo_url
      };
      
      const userInfo = {
        username: review.username,
        telegram_id: review.telegram_id
      };
      
      await sendReviewToFeedbackChannel(reviewData, userInfo);
      
      // Уведомляем менеджера об одобрении
      await sendManagerMessage(`✅ Отзыв #${reviewId} одобрен и опубликован в канале!`);
    }
    
    res.json({ 
      success: true, 
      message: 'Отзыв одобрен и опубликован!' 
    });
  } catch (error) {
    console.error('❌ Ошибка одобрения отзыва:', error);
    res.status(500).json({ error: 'Ошибка одобрения отзыва' });
  }
});

// Удаление отзыва
app.delete('/api/admin/reviews/:reviewId', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const reviewId = req.params.reviewId;
    
    // Удаляем отзыв из базы данных
    await dbConnection.execute(`
      DELETE FROM reviews WHERE review_id = ?
    `, [reviewId]);
    
    // Уведомляем менеджера об удалении
    await sendManagerMessage(`🗑️ Отзыв #${reviewId} удален администратором`);
    
    res.json({ 
      success: true, 
      message: 'Отзыв удален!' 
    });
  } catch (error) {
    console.error('❌ Ошибка удаления отзыва:', error);
    res.status(500).json({ error: 'Ошибка удаления отзыва' });
  }
});

// Получение статистики отзывов для админки
app.get('/api/admin/reviews/stats', async (req, res) => {
  try {
    await ensureDBConnection();
    
    // Общая статистика
    const [totalStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_reviews,
        SUM(CASE WHEN is_approved = 1 THEN 1 ELSE 0 END) as approved_reviews,
        SUM(CASE WHEN is_approved = 0 THEN 1 ELSE 0 END) as pending_reviews,
        AVG(CASE WHEN is_approved = 1 THEN rating ELSE NULL END) as average_rating
      FROM reviews
    `);
    
    // Статистика по дням (последние 7 дней)
    const [dailyStats] = await dbConnection.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as total,
        SUM(CASE WHEN is_approved = 1 THEN 1 ELSE 0 END) as approved
      FROM reviews 
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);
    
    res.json({
      total: totalStats[0],
      daily: dailyStats
    });
  } catch (error) {
    console.error('❌ Ошибка получения статистики отзывов:', error);
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

// Получение профиля пользователя
app.get('/api/profile', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id } = req.query;
    
          // ВРЕМЕННОЕ ИСКЛЮЧЕНИЕ ДЛЯ ТЕСТИРОВАНИЯ - убрать перед релизом
          if (!telegram_id) {
      const demoProfileData = {
        user: {
          telegram_id: 'demo',
          full_name: 'Демо Пользователь',
          phone_number: '+7 (999) 123-45-67',
          preferred_currency: 'RUB',
          commission: 1000,
          created_at: new Date().toISOString()
        },
        statistics: {
          orders: { total_orders: 0, completed_orders: 0 },
          referrals: { total_referrals: 0, total_clicks: 0 },
          yuan_purchases: { total_purchases: 0, total_spent_rub: 0, total_bought_cny: 0, total_savings: 0 },
          total_savings: { total: 0 }
        },
        gamification: {
          level: 'Bronze',
          levelProgress: 0,
          nextLevel: 'Silver',
          ordersToNext: 1000,
          xp: 0,
          xpToNext: 1000,
          achievements: []
        }
      };
      return res.json(demoProfileData);
    }
    
    // Получаем данные пользователя
    const [userRows] = await dbConnection.execute(`
      SELECT telegram_id, commission, created_at, full_name, phone_number, preferred_currency, avatar_url
      FROM users 
      WHERE telegram_id = ?
    `, [telegram_id]);
    
    if (userRows.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    const user = userRows[0];
    
    // Получаем статистику из users (обновляется в реальном времени)
    const [userStats] = await dbConnection.execute(`
      SELECT 
        total_orders,
        total_referrals,
        total_yuan_bought,
        total_savings
      FROM users 
      WHERE telegram_id = ?
    `, [telegram_id]);
    
    // Получаем статистику заказов (для completed_orders)
    const [orderStats] = await dbConnection.execute(`
      SELECT 
        COALESCE(SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END), 0) as completed_orders
      FROM orders 
      WHERE telegram_id = ?
    `, [telegram_id]);
    
    // Получаем статистику рефералов (для clicks)
    const [referralStats] = await dbConnection.execute(`
      SELECT 
        COALESCE(SUM(clicks), 0) as total_clicks
      FROM referrals 
      WHERE referred_by = ?
    `, [telegram_id]);
    
    // Получаем статистику покупок юаня (для сумм)
    const [yuanStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_purchases,
        COALESCE(SUM(amount_rub), 0) as total_spent_rub,
        COALESCE(SUM(amount_cny), 0) as total_bought_cny,
        COALESCE(SUM(savings), 0) as total_savings
      FROM yuan_purchases 
      WHERE telegram_id = ? AND status = 'completed'
    `, [telegram_id]);
    
    // Получаем экономию от заказов
    const [orderSavingsStats] = await dbConnection.execute(`
      SELECT 
        COALESCE(SUM(estimated_savings), 0) as total_order_savings
      FROM orders 
      WHERE telegram_id = ? AND status = 'completed'
    `, [telegram_id]);

    // Получаем данные геймификации из новой системы
    let gamificationData = {
      level: 'Bronze',
      levelProgress: 0,
      nextLevel: 'Silver',
      ordersToNext: 1000,
      xp: 0,
      xpToNext: 1000,
      achievements: []
    };

    if (gamificationService) {
      try {
        // Получаем данные пользователя из users таблицы
        const [userGamification] = await dbConnection.execute(`
          SELECT xp, current_level, total_orders, total_yuan_bought, total_referrals, total_savings
          FROM users 
          WHERE telegram_id = ?
        `, [telegram_id]);

        if (userGamification.length > 0) {
          const userData = userGamification[0];
          const xp = userData.xp || 0;
          const currentLevel = userData.current_level || 'Bronze';
          
          // Получаем достижения пользователя
          const achievements = await gamificationService.getUserAchievements(telegram_id);
          
          // Вычисляем прогресс уровня
          const levelProgress = gamificationService.getLevelProgress(xp);
          
          // Определяем следующий уровень
          const nextLevel = gamificationService.getNextLevel(currentLevel);
          const xpToNext = gamificationService.getXPToNextLevel(currentLevel, xp);
          
          gamificationData = {
            level: currentLevel,
            levelProgress,
            nextLevel,
            ordersToNext: xpToNext,
            xp,
            xpToNext,
            achievements: achievements.filter(ach => ach.unlocked)
          };
        }
      } catch (gamificationError) {
        console.error('❌ Ошибка получения данных геймификации:', gamificationError);
        // Используем дефолтные данные при ошибке
      }
    }
    
    // Формируем ответ с правильными данными
    const stats = userStats[0] || { total_orders: 0, total_referrals: 0, total_yuan_bought: 0, total_savings: 0 };
    
    res.json({
      user: {
        telegram_id: user.telegram_id,
        full_name: user.full_name,
        phone_number: user.phone_number,
        preferred_currency: user.preferred_currency || 'RUB',
        commission: user.commission,
        created_at: user.created_at,
        avatar_url: user.avatar_url
      },
      statistics: {
        orders: {
          total_orders: stats.total_orders || 0,
          completed_orders: orderStats[0]?.completed_orders || 0
        },
        referrals: {
          total_referrals: stats.total_referrals || 0,
          total_clicks: referralStats[0]?.total_clicks || 0
        },
        yuan_purchases: {
          total_purchases: yuanStats[0]?.total_purchases || 0,
          total_spent_rub: yuanStats[0]?.total_spent_rub || 0,
          total_bought_cny: yuanStats[0]?.total_bought_cny || 0,
          total_savings: yuanStats[0]?.total_savings || 0
        },
        order_savings: {
          total_order_savings: orderSavingsStats[0]?.total_order_savings || 0
        },
        total_savings: {
          yuan_savings: yuanStats[0]?.total_savings || 0,
          order_savings: orderSavingsStats[0]?.total_order_savings || 0,
          total: stats.total_savings || 0
        }
      },
      gamification: gamificationData
    });
  } catch (error) {
    console.error('Ошибка получения профиля:', error);
    res.status(500).json({ error: 'Ошибка получения профиля' });
  }
});

// Обновление профиля пользователя
app.patch('/api/users', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id, full_name, phone_number, preferred_currency, avatar_url } = req.body;
    
    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID обязателен' });
    }
    
    // Проверяем, существует ли пользователь
    const [existingUser] = await dbConnection.execute(
      'SELECT telegram_id FROM users WHERE telegram_id = ?',
      [telegram_id]
    );
    
    if (existingUser.length === 0) {
      // Создаем нового пользователя
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, commission, full_name, phone_number, preferred_currency, avatar_url, created_at) 
        VALUES (?, 1000, ?, ?, ?, ?, NOW())
      `, [telegram_id, full_name, phone_number, preferred_currency, avatar_url]);
    } else {
      // Обновляем существующего пользователя
      await dbConnection.execute(`
        UPDATE users 
        SET full_name = COALESCE(?, full_name),
            phone_number = COALESCE(?, phone_number),
            preferred_currency = COALESCE(?, preferred_currency),
            avatar_url = COALESCE(?, avatar_url)
        WHERE telegram_id = ?
      `, [full_name, phone_number, preferred_currency, avatar_url, telegram_id]);
    }
    
    res.json({ success: true, message: 'Профиль обновлен успешно' });
  } catch (error) {
    console.error('Ошибка обновления профиля:', error);
    res.status(500).json({ error: 'Ошибка обновления профиля' });
  }
});

// Покупка юаня
app.post('/api/yuan-purchase', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { 
      telegramId, 
      username, 
      firstName, 
      lastName, 
      amountCny, 
      amountRub, 
      tariff, 
      rate, 
      savings, 
      userLink 
    } = req.body;
    
    if (!telegramId || !amountCny || !amountRub) {
      return res.status(400).json({ error: 'Telegram ID, количество юаней и сумма обязательны' });
    }
    
    const amountCnyNum = parseFloat(amountCny);
    const amountRubNum = parseFloat(amountRub);
    
    if (amountCnyNum < 200 || amountCnyNum > 10000) {
      return res.status(400).json({ error: 'Количество юаней должно быть от 200 до 10,000' });
    }
    
    // Проверяем, существует ли пользователь
    const [existingUser] = await dbConnection.execute(
      'SELECT telegram_id FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (existingUser.length === 0) {
      // Создаем нового пользователя
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, username, full_name, commission, created_at) 
        VALUES (?, ?, ?, 1000, NOW())
      `, [telegramId, username || 'unknown', (firstName && lastName) ? `${firstName} ${lastName}` : (firstName || 'Пользователь')]);
    }
    
    // Создаем запись о покупке
    const [result] = await dbConnection.execute(`
      INSERT INTO yuan_purchases (telegram_id, amount_rub, amount_cny, exchange_rate, favorable_rate, savings, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `, [telegramId, amountRubNum, amountCnyNum, 12.5, rate, savings || 0]);
    
    // Логируем активность пользователя
    await logUserActivity(telegramId, 'yuan_purchase', {
      purchaseId: result.insertId,
      amountRub: amountRubNum,
      amountCny: amountCnyNum,
      savings: savings || 0,
      tariff: tariff
    });

    // Создаем системный лог
    await createSystemLog('info', `Заказ на покупку юаня: ${amountCnyNum} CNY за ${amountRubNum} RUB (${tariff})`, {
      telegramId: telegramId,
      purchaseId: result.insertId,
      amountRub: amountRubNum,
      amountCny: amountCnyNum,
      savings: savings || 0,
      tariff: tariff,
      userLink: userLink
    }, telegramId);
    
    // Отправляем сообщение менеджеру
    const managerMessage = `🛒 <b>Новый заказ на покупку юаня</b>

💰 <b>Количество:</b> ${amountCnyNum.toFixed(2)} юаней
💵 <b>Стоимость:</b> ${amountRubNum.toLocaleString('ru-RU')} ₽
📊 <b>Тариф:</b> ${tariff}
💸 <b>Курс:</b> ${rate.toFixed(2)} ₽ за юань
💎 <b>Экономия:</b> ${(savings || 0).toLocaleString('ru-RU')} ₽

👤 <b>Пользователь:</b> ${userLink}
📝 <b>Имя:</b> ${firstName}${lastName ? ' ' + lastName : ''}
📅 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}

🆔 <b>Telegram ID:</b> <code>${telegramId}</code>`;

    await sendManagerMessage(managerMessage);
    
    // NOTE: XP начисляется только после подтверждения покупки юаней админом
    // См. admin panel endpoint для подтверждения покупки юаней
    
    res.json({
      success: true,
      purchase_id: result.insertId,
      message: 'Заказ на покупку юаня успешно отправлен менеджеру!'
    });
  } catch (error) {
    console.error('Ошибка покупки юаня:', error);
    res.status(500).json({ error: 'Ошибка покупки юаня' });
  }
});

// Получение списка всех изображений выкупов
app.get('/api/purchases/images', async (req, res) => {
  try {
    const purchasesImagesDir = path.join(__dirname, '..', 'frontend', 'public', 'images', 'purchases');
    
    if (!fs.existsSync(purchasesImagesDir)) {
      return res.json({ images: [] });
    }
    
    const files = fs.readdirSync(purchasesImagesDir)
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        const filePath = path.join(purchasesImagesDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          mtime: stats.mtime.getTime() // Время последнего изменения
        };
      })
      .sort((a, b) => {
        // Сортируем по дате изменения: новые сверху (от большего к меньшему)
        return b.mtime - a.mtime;
      })
      .map(file => `/images/purchases/${file.name}`);
    
    res.json({ images: files });
  } catch (error) {
    console.error('Ошибка получения списка изображений выкупов:', error);
    res.status(500).json({ error: 'Ошибка получения списка изображений' });
  }
});

// Получение истории покупок юаня
app.get('/api/yuan-purchases', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id } = req.query;
    
    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID обязателен' });
    }
    
    const [rows] = await dbConnection.execute(`
      SELECT id, amount_rub, amount_cny, exchange_rate, favorable_rate, savings, status, created_at
      FROM yuan_purchases 
      WHERE telegram_id = ? AND status = 'completed'
      ORDER BY created_at DESC
    `, [telegram_id]);
    
    res.json({ purchases: rows });
  } catch (error) {
    console.error('Ошибка получения истории покупок:', error);
    res.status(500).json({ error: 'Ошибка получения истории покупок' });
  }
});

// Получение истории заказов
app.get('/api/orders-history', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id } = req.query;
    
    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID обязателен' });
    }
    
    // Получаем заказы с товарами (только завершенные)
    const [orders] = await dbConnection.execute(`
      SELECT order_id, full_name, phone_number, pickup_point_address, created_at, estimated_savings
      FROM orders 
      WHERE telegram_id = ? AND status = 'completed'
      ORDER BY created_at DESC
    `, [telegram_id]);

    // Для каждого заказа получаем товары
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const [items] = await dbConnection.execute(`
        SELECT product_link, product_size, quantity, estimated_savings
        FROM order_items 
        WHERE order_id = ?
        ORDER BY id
      `, [order.order_id]);

      return {
        ...order,
        items: items,
        itemsCount: items.length
      };
    }));
    
    res.json({ orders: ordersWithItems });
  } catch (error) {
    console.error('Ошибка получения истории заказов:', error);
    res.status(500).json({ error: 'Ошибка получения истории заказов' });
  }
});

// ==================== USER ACTIVITY API ====================

// Получение активности пользователя
app.get('/api/user-activity', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id, limit = 50 } = req.query;
    
    if (!telegram_id) {
      return res.status(400).json({ error: 'Telegram ID обязателен' });
    }
    
    const [rows] = await dbConnection.execute(`
      SELECT id, action_type, action_data, created_at
      FROM user_activity 
      WHERE telegram_id = ?
      ORDER BY created_at DESC
      LIMIT ?
    `, [telegram_id, parseInt(limit)]);
    
    res.json({ activities: rows });
  } catch (error) {
    console.error('Ошибка получения активности:', error);
    res.status(500).json({ error: 'Ошибка получения активности' });
  }
});

// Запись активности пользователя
app.post('/api/user-activity', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegram_id, action_type, action_data } = req.body;
    
    if (!telegram_id || !action_type) {
      return res.status(400).json({ error: 'Telegram ID и тип действия обязательны' });
    }
    
    const [result] = await dbConnection.execute(`
      INSERT INTO user_activity (telegram_id, action_type, action_data)
      VALUES (?, ?, ?)
    `, [telegram_id, action_type, JSON.stringify(action_data || {})]);
    
    res.json({ 
      success: true, 
      activity_id: result.insertId,
      message: 'Активность записана успешно' 
    });
  } catch (error) {
    console.error('Ошибка записи активности:', error);
    res.status(500).json({ error: 'Ошибка записи активности' });
  }
});

// ==================== USER REWARDS API ====================

// ==================== GAMIFICATION SYSTEM ====================
// Используется новая система геймификации (gamification.js)
// Старые дублирующие API endpoints удалены

// ==================== EXCHANGE RATES API ====================

// Получение курсов валют
app.get('/api/exchange-rates', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { currency_from = 'CNY', currency_to = 'RUB' } = req.query;
    
    const [rows] = await dbConnection.execute(`
      SELECT id, currency_from, currency_to, rate, favorable_rate, source, created_at, updated_at
      FROM exchange_rates 
      WHERE currency_from = ? AND currency_to = ?
      ORDER BY created_at DESC
      LIMIT 1
    `, [currency_from, currency_to]);
    
    if (rows.length === 0) {
      // Создаем дефолтный курс
      const defaultRate = 12.5;
      const defaultFavorableRate = defaultRate * 0.95;
      
      await dbConnection.execute(`
        INSERT INTO exchange_rates (currency_from, currency_to, rate, favorable_rate, source)
        VALUES (?, ?, ?, ?, 'CBRF')
      `, [currency_from, currency_to, defaultRate, defaultFavorableRate]);
      
      res.json({ 
        rate: { 
          currency_from, 
          currency_to, 
          rate: defaultRate, 
          favorable_rate: defaultFavorableRate, 
          source: 'CBRF',
          created_at: new Date().toISOString()
        } 
      });
    } else {
      res.json({ rate: rows[0] });
    }
  } catch (error) {
    console.error('Ошибка получения курса валют:', error);
    res.status(500).json({ error: 'Ошибка получения курса валют' });
  }
});

// Обновление курса валют
app.post('/api/exchange-rates', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { currency_from, currency_to, rate, favorable_rate, source = 'CBRF' } = req.body;
    
    if (!currency_from || !currency_to || !rate) {
      return res.status(400).json({ error: 'Валюта от, валюта до и курс обязательны' });
    }
    
    const [result] = await dbConnection.execute(`
      INSERT INTO exchange_rates (currency_from, currency_to, rate, favorable_rate, source)
      VALUES (?, ?, ?, ?, ?)
    `, [currency_from, currency_to, rate, favorable_rate || rate * 0.95, source]);
    
    res.json({ 
      success: true, 
      rate_id: result.insertId,
      message: 'Курс валют обновлен успешно' 
    });
  } catch (error) {
    console.error('Ошибка обновления курса валют:', error);
    res.status(500).json({ error: 'Ошибка обновления курса валют' });
  }
});

// ==================== SYSTEM LOGS API ====================

// Получение логов системы
app.get('/api/system-logs', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { log_level, telegram_id, limit = 100 } = req.query;
    
    let query = `
      SELECT id, log_level, log_message, log_data, telegram_id, created_at
      FROM system_logs 
      WHERE 1=1
    `;
    const params = [];
    
    if (log_level) {
      query += ' AND log_level = ?';
      params.push(log_level);
    }
    
    if (telegram_id) {
      query += ' AND telegram_id = ?';
      params.push(telegram_id);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const [rows] = await dbConnection.execute(query, params);
    
    res.json({ logs: rows });
  } catch (error) {
    console.error('Ошибка получения логов:', error);
    res.status(500).json({ error: 'Ошибка получения логов' });
  }
});

// Создание лога системы
app.post('/api/system-logs', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { log_level, log_message, log_data, telegram_id } = req.body;
    
    if (!log_level || !log_message) {
      return res.status(400).json({ error: 'Уровень лога и сообщение обязательны' });
    }
    
    const [result] = await dbConnection.execute(`
      INSERT INTO system_logs (log_level, log_message, log_data, telegram_id)
      VALUES (?, ?, ?, ?)
    `, [log_level, log_message, JSON.stringify(log_data || {}), telegram_id]);
    
    res.json({ 
      success: true, 
      log_id: result.insertId,
      message: 'Лог создан успешно' 
    });
  } catch (error) {
    console.error('Ошибка создания лога:', error);
    res.status(500).json({ error: 'Ошибка создания лога' });
  }
});

// ============================================
// АДМИНСКИЕ ЭНДПОИНТЫ
// ============================================

// Проверка прав доступа админа
function checkAdminAccess(req, res, next) {
  // Временно отключаем проверку для тестирования
  // const adminIds = ['7696515351', '690296532'];
  // const telegramId = req.headers['x-telegram-user-id'] || req.query.admin_id || req.body.admin_id;
  // 
  // if (!adminIds.includes(telegramId)) {
  //   return res.status(403).json({ error: 'Доступ запрещен' });
  // }
  
  next();
}

// Общая статистика для админов
app.get('/api/admin/stats', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Общее количество пользователей
    const [totalUsersResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM users'
    );
    const totalUsers = totalUsersResult[0].total;
    
    // Новые пользователи сегодня
    const [newUsersTodayResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM users WHERE DATE(created_at) = CURDATE()'
    );
    const newUsersToday = newUsersTodayResult[0].total;
    
    // Общее количество заказов
    const [totalOrdersResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM orders'
    );
    const totalOrders = totalOrdersResult[0].total;
    
    // Заказы сегодня
    const [ordersTodayResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM orders WHERE DATE(created_at) = CURDATE()'
    );
    const ordersToday = ordersTodayResult[0].total;
    
    // Общее количество покупок юаней
    const [totalYuanResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM yuan_purchases'
    );
    const totalYuanPurchases = totalYuanResult[0].total;
    
    // Покупки юаней сегодня
    const [yuanTodayResult] = await dbConnection.execute(
      'SELECT COUNT(*) as total FROM yuan_purchases WHERE DATE(created_at) = CURDATE()'
    );
    const yuanPurchasesToday = yuanTodayResult[0].total;
    
    // Общая экономия (только завершенные заказы)
    const [totalSavingsResult] = await dbConnection.execute(`
      SELECT 
        COALESCE(SUM(yuan_savings), 0) + COALESCE(SUM(order_savings), 0) as total_savings
      FROM (
        SELECT SUM(savings) as yuan_savings, 0 as order_savings FROM yuan_purchases WHERE status = 'completed'
        UNION ALL
        SELECT 0 as yuan_savings, SUM(estimated_savings) as order_savings FROM orders WHERE status = 'completed'
      ) as combined_savings
    `);
    const totalSavings = totalSavingsResult[0].total_savings || 0;
    
    // Общий доход (реальная прибыль из расчетов)
    const [totalRevenueResult] = await dbConnection.execute(`
      SELECT 
        COALESCE(SUM(profit), 0) as total_revenue
      FROM profit_calculations
    `);
    const totalRevenue = totalRevenueResult[0].total_revenue || 0;
    
    // Активные пользователи (пользователи с активностью за последние 7 дней)
    const [activeUsersResult] = await dbConnection.execute(`
      SELECT COUNT(DISTINCT telegram_id) as active_users
      FROM (
        SELECT telegram_id FROM orders WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        UNION
        SELECT telegram_id FROM yuan_purchases WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
      ) as active_users_combined
    `);
    const activeUsers = activeUsersResult[0].active_users || 0;
    
    // Конверсия (процент пользователей, которые сделали заказ или покупку)
    const [conversionResult] = await dbConnection.execute(`
      SELECT 
        COUNT(DISTINCT active_users.telegram_id) as converted_users
      FROM users
      LEFT JOIN (
        SELECT telegram_id FROM orders
        UNION
        SELECT telegram_id FROM yuan_purchases
      ) as active_users ON users.telegram_id = active_users.telegram_id
      WHERE active_users.telegram_id IS NOT NULL
    `);
    const convertedUsers = conversionResult[0].converted_users || 0;
    const conversionRate = totalUsers > 0 ? (convertedUsers / totalUsers) * 100 : 0;
    
    res.json({
      totalUsers,
      newUsersToday,
      totalOrders,
      ordersToday,
      totalYuanPurchases,
      yuanPurchasesToday,
      totalSavings,
      totalRevenue,
      activeUsers,
      conversionRate
    });
    
  } catch (error) {
    console.error('Ошибка получения админ статистики:', error);
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

// Получение всех пользователей для админов
app.get('/api/admin/users', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const [users] = await dbConnection.execute(`
      SELECT 
        u.telegram_id,
        u.username,
        u.full_name,
        u.created_at,
        u.last_activity,
        u.commission,
        u.referred_by,
        CASE 
          WHEN u.last_activity IS NULL THEN 'offline'
          WHEN TIMESTAMPDIFF(SECOND, u.last_activity, NOW()) <= 30 THEN 'online'
          ELSE 'offline'
        END as status,
        COUNT(DISTINCT CASE WHEN o.status = 'completed' THEN o.order_id END) as orders_count,
        COUNT(DISTINCT CASE WHEN yp.status = 'completed' THEN yp.id END) as yuan_purchases_count,
        COALESCE(SUM(CASE WHEN yp.status = 'completed' THEN yp.savings ELSE 0 END), 0) as yuan_savings,
        COALESCE(SUM(CASE WHEN o.status = 'completed' THEN o.estimated_savings ELSE 0 END), 0) as order_savings,
        COALESCE(SUM(CASE WHEN yp.status = 'completed' THEN yp.savings ELSE 0 END), 0) + COALESCE(SUM(CASE WHEN o.status = 'completed' THEN o.estimated_savings ELSE 0 END), 0) as total_savings,
        COUNT(DISTINCT r.telegram_id) as referrals_count
      FROM users u
      LEFT JOIN orders o ON u.telegram_id = o.telegram_id
      LEFT JOIN yuan_purchases yp ON u.telegram_id = yp.telegram_id
      LEFT JOIN users r ON u.telegram_id = r.referred_by
      GROUP BY u.telegram_id, u.username, u.full_name, u.created_at, u.last_activity, u.commission, u.referred_by
      ORDER BY u.created_at DESC
    `);
    
    res.json({ users });
    
  } catch (error) {
    console.error('Ошибка получения пользователей:', error);
    res.status(500).json({ error: 'Ошибка получения пользователей' });
  }
});

// Получение всех заказов для админов
app.get('/api/admin/orders', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const [orders] = await dbConnection.execute(`
      SELECT 
        o.order_id,
        o.telegram_id,
        o.username,
        o.full_name,
        o.phone_number,
        o.pickup_point,
        o.pickup_point_address,
        o.created_at,
        o.estimated_savings,
        o.status,
        COALESCE(item_stats.items_count, 0) as items_count
      FROM orders o
      LEFT JOIN (
        SELECT 
          order_id,
          COUNT(*) as items_count
        FROM order_items
        GROUP BY order_id
      ) item_stats ON o.order_id = item_stats.order_id
      ORDER BY o.created_at DESC
    `);
    
    res.json({ orders });
    
  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
});

// Получение всех покупок юаней для админов
app.get('/api/admin/yuan-purchases', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const [purchases] = await dbConnection.execute(`
      SELECT 
        yp.id,
        yp.telegram_id,
        yp.amount_cny,
        yp.amount_rub,
        yp.savings,
        yp.created_at,
        yp.status,
        u.username,
        u.full_name
      FROM yuan_purchases yp
      LEFT JOIN users u ON yp.telegram_id = u.telegram_id
      ORDER BY yp.created_at DESC
    `);
    
    res.json({ purchases });
    
  } catch (error) {
    console.error('Ошибка получения покупок юаней:', error);
    res.status(500).json({ error: 'Ошибка получения покупок юаней' });
  }
});

// Получение ожидающих заказов и покупок юаней
app.get('/api/admin/pending-orders', async (req, res) => {
  try {
    await ensureDBConnection();
    
    // Получаем ожидающие заказы
    const [pendingOrders] = await dbConnection.execute(`
      SELECT 
        o.order_id,
        o.telegram_id,
        o.username,
        o.full_name,
        o.phone_number,
        o.pickup_point,
        o.pickup_point_address,
        o.created_at,
        o.estimated_savings,
        o.status,
        COALESCE(item_stats.items_count, 0) as items_count
      FROM orders o
      LEFT JOIN (
        SELECT 
          order_id,
          COUNT(*) as items_count
        FROM order_items
        GROUP BY order_id
      ) item_stats ON o.order_id = item_stats.order_id
      WHERE o.status = 'pending'
      ORDER BY o.created_at DESC
    `);
    
    // Получаем ожидающие покупки юаней
    const [pendingYuanPurchases] = await dbConnection.execute(`
      SELECT 
        yp.id,
        yp.telegram_id,
        yp.amount_cny,
        yp.amount_rub,
        yp.savings,
        yp.created_at,
        yp.status,
        u.username,
        u.full_name
      FROM yuan_purchases yp
      LEFT JOIN users u ON yp.telegram_id = u.telegram_id
      WHERE yp.status = 'pending'
      ORDER BY yp.created_at DESC
    `);
    
    res.json({ 
      orders: pendingOrders, 
      yuanPurchases: pendingYuanPurchases 
    });
    
  } catch (error) {
    console.error('Ошибка получения ожидающих заказов:', error);
    res.status(500).json({ error: 'Ошибка получения ожидающих заказов' });
  }
});

// Получение детальной информации о пользователе
app.get('/api/admin/user-details/:telegramId', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { telegramId } = req.params;
    
    // Основная информация о пользователе
    const [userInfo] = await dbConnection.execute(
      'SELECT * FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (userInfo.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }
    
    // Заказы пользователя
    const [orders] = await dbConnection.execute(`
      SELECT 
        o.*,
        GROUP_CONCAT(
          CONCAT(oi.product_link, ' (', COALESCE(oi.product_size, 'без размера'), ', ', oi.quantity, ' шт.)')
          SEPARATOR '; '
        ) as items_details
      FROM orders o
      LEFT JOIN order_items oi ON o.order_id = oi.order_id
      WHERE o.telegram_id = ?
      GROUP BY o.order_id
      ORDER BY o.created_at DESC
    `, [telegramId]);
    
    // Покупки юаней
    const [yuanPurchases] = await dbConnection.execute(
      'SELECT * FROM yuan_purchases WHERE telegram_id = ? ORDER BY created_at DESC',
      [telegramId]
    );
    
    // Активность пользователя
    const [activity] = await dbConnection.execute(
      'SELECT * FROM user_activity WHERE telegram_id = ? ORDER BY created_at DESC LIMIT 50',
      [telegramId]
    );
    
    // Достижения
    const [achievements] = await dbConnection.execute(
      'SELECT * FROM user_achievements WHERE telegram_id = ? ORDER BY unlocked_at DESC',
      [telegramId]
    );
    
    res.json({
      user: userInfo[0],
      orders,
      yuanPurchases,
      activity,
      achievements
    });
    
  } catch (error) {
    console.error('Ошибка получения детальной информации:', error);
    res.status(500).json({ error: 'Ошибка получения информации о пользователе' });
  }
});

// Получение системных логов
app.get('/api/admin/system-logs', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const { limit = 100, level = 'all' } = req.query;
    
    let query = 'SELECT * FROM system_logs';
    const params = [];
    
    if (level !== 'all') {
      query += ' WHERE level = ?';
      params.push(level);
    }
    
    query += ' ORDER BY created_at DESC LIMIT ?';
    params.push(parseInt(limit));
    
    const [logs] = await dbConnection.execute(query, params);
    
    res.json({ logs });
    
  } catch (error) {
    console.error('Ошибка получения логов:', error);
    res.status(500).json({ error: 'Ошибка получения логов' });
  }
});

// Подтверждение заказа
app.post('/api/admin/confirm-order', async (req, res) => {
  try {
    await ensureDBConnection();
    const { orderId, type } = req.body; // type: 'order' или 'yuan'
    
    if (type === 'order') {
      await dbConnection.execute(
        'UPDATE orders SET status = ? WHERE order_id = ?',
        ['completed', orderId]
      );
    } else if (type === 'yuan') {
      await dbConnection.execute(
        'UPDATE yuan_purchases SET status = ? WHERE id = ?',
        ['completed', orderId]
      );
    }
    
    // Отправляем уведомление пользователю
    const telegramId = await getTelegramIdByOrderId(orderId, type);
    if (telegramId) {
      await sendUserNotification(telegramId, 'confirm', type, orderId);
      
      // Обновляем статистику пользователя только после подтверждения
      await updateUserStatsAfterConfirmation(telegramId, orderId, type);
      
      // ========== GAMIFICATION: Начисление XP после подтверждения ==========
      try {
        if (gamificationService) {
          if (type === 'order') {
            // Заказ подтверждён - даем 100 XP
            const orderHour = new Date().getHours();
            const xpResult = await gamificationService.awardXP(
              telegramId,
              XP_RULES.ORDER_COMPLETE,
              'order',
              orderId,
              `Заказ #${orderId} подтвержден`
            );
            
            // Проверяем достижения
            const achievements = await gamificationService.checkOrderAchievements(
              telegramId,
              orderId,
              orderHour
            );
            
            // Уведомления о level up и достижениях
            if (xpResult.leveledUp) {
              const levelUpMsg = `🎊 <b>Поздравляем!</b>\n\n` +
                `Вы достигли уровня <b>${xpResult.currentLevel}</b>! 🏆\n\n` +
                `🎁 <b>Награды:</b>\n${xpResult.rewards.description}\n\n` +
                `✨ Всего XP: ${xpResult.totalXP}`;
              // Включаем уведомления для продакшена
              await sendTelegramMessage(telegramId, levelUpMsg);
            }
            
            for (const achievement of achievements) {
              if (!achievement.alreadyUnlocked && achievement.achievement) {
                const achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                  `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                  `📝 ${achievement.achievement.description}\n\n` +
                  `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                // Включаем уведомления для продакшена
                await sendTelegramMessage(telegramId, achievementMsg);
              }
            }
          } else if (type === 'yuan') {
            // Покупка юаней подтверждена - даем XP (1 за 100₽)
            const [yuanData] = await dbConnection.execute(
              'SELECT amount_rub FROM yuan_purchases WHERE id = ?',
              [orderId]
            );
            
            if (yuanData.length > 0) {
              const amountRub = yuanData[0].amount_rub;
              const xpAmount = Math.floor(amountRub / 100);
              
              if (xpAmount > 0) {
                const xpResult = await gamificationService.awardXP(
                  telegramId,
                  xpAmount,
                  'yuan_purchase',
                  orderId,
                  `Покупка юаней подтверждена`
                );
                
                // Проверяем достижения
                const achievements = await gamificationService.checkYuanAchievements(telegramId, amountRub);
                
                if (xpResult.leveledUp) {
                  const levelUpMsg = `🎊 <b>Поздравляем!</b>\n\n` +
                    `Вы достигли уровня <b>${xpResult.currentLevel}</b>! 🏆\n\n` +
                    `🎁 <b>Награды:</b>\n${xpResult.rewards.description}\n\n` +
                    `✨ Всего XP: ${xpResult.totalXP}`;
                  // Включаем уведомления для продакшена
              await sendTelegramMessage(telegramId, levelUpMsg);
              console.log('🎊 Level up notification sent:', levelUpMsg);
                }
                
                for (const achievement of achievements) {
                  if (!achievement.alreadyUnlocked && achievement.achievement) {
                    const achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                      `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                      `📝 ${achievement.achievement.description}\n\n` +
                      `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                    // Включаем уведомления для продакшена
                await sendTelegramMessage(telegramId, achievementMsg);
              }
                }
              }
            }
          }
        }
      } catch (gamificationError) {
        console.error('❌ Ошибка начисления XP при подтверждении:', gamificationError);
      }
      // ========== End Gamification ==========
    }
    
    res.json({ success: true, message: 'Заказ подтвержден' });
  } catch (error) {
    console.error('Ошибка подтверждения заказа:', error);
    res.status(500).json({ error: 'Ошибка подтверждения заказа' });
  }
});

// Отмена заказа
app.post('/api/admin/cancel-order', async (req, res) => {
  try {
    await ensureDBConnection();
    const { orderId, type } = req.body; // type: 'order' или 'yuan'
    
    if (type === 'order') {
      await dbConnection.execute(
        'UPDATE orders SET status = ? WHERE order_id = ?',
        ['cancelled', orderId]
      );
    } else if (type === 'yuan') {
      await dbConnection.execute(
        'UPDATE yuan_purchases SET status = ? WHERE id = ?',
        ['cancelled', orderId]
      );
    }
    
    // Отправляем уведомление пользователю
    const telegramId = await getTelegramIdByOrderId(orderId, type);
    if (telegramId) {
      await sendUserNotification(telegramId, 'cancel', type, orderId);
    }
    
    res.json({ success: true, message: 'Заказ отменен' });
  } catch (error) {
    console.error('Ошибка отмены заказа:', error);
    res.status(500).json({ error: 'Ошибка отмены заказа' });
  }
});

// Вспомогательные функции
async function getTelegramIdByOrderId(orderId, type) {
  try {
    if (type === 'order') {
      const [result] = await dbConnection.execute(
        'SELECT telegram_id FROM orders WHERE order_id = ?',
        [orderId]
      );
      return result[0]?.telegram_id;
    } else if (type === 'yuan') {
      const [result] = await dbConnection.execute(
        'SELECT telegram_id FROM yuan_purchases WHERE id = ?',
        [orderId]
      );
      return result[0]?.telegram_id;
    }
  } catch (error) {
    console.error('Ошибка получения Telegram ID:', error);
    return null;
  }
}

async function sendUserNotification(telegramId, action, type, orderId) {
  try {
    const botToken = process.env.BOT_TOKEN;
    
    let message = '';
    if (action === 'confirm') {
      if (type === 'order') {
        message = `🎉 Отличные новости! Ваш заказ #${orderId} успешно подтвержден и оплачен. Мы приступили к его обработке. Спасибо за покупку!`;
      } else {
        message = `💰 Ваша покупка юаней #${orderId} подтверждена! Средства поступят на ваш счет в течение 24 часов. Спасибо за доверие!`;
      }
    } else if (action === 'cancel') {
      message = `😔 К сожалению, ваш заказ #${orderId} был отменен. Очень жаль, надеемся в следующий раз закажете еще! Если у вас есть вопросы, обращайтесь к нашему менеджеру.`;
    }
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const data = JSON.stringify({
      chat_id: telegramId,
      text: message,
      parse_mode: 'HTML'
    });
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        let responseData = '';
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log('✅ Уведомление пользователю отправлено');
            resolve(true);
          } else {
            console.error('❌ Ошибка отправки уведомления:', responseData);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        console.error('❌ Ошибка сети при отправке уведомления:', error);
        resolve(false);
      });
      
      req.write(data);
      req.end();
    });
  } catch (error) {
    console.error('❌ Ошибка отправки уведомления пользователю:', error);
    return false;
  }
}

// Функция для обновления статистики пользователя после подтверждения заказа
async function updateUserStatsAfterConfirmation(telegramId, orderId, type) {
  try {
    if (type === 'order') {
      // Получаем данные заказа
      const [orderData] = await dbConnection.execute(`
        SELECT estimated_savings FROM orders WHERE order_id = ? AND telegram_id = ?
      `, [orderId, telegramId]);
      
      if (orderData.length > 0) {
        const savings = orderData[0].estimated_savings || 0;
        
        // Обновляем статистику пользователя
        await dbConnection.execute(`
          UPDATE users 
          SET total_orders = total_orders + 1,
              total_savings = total_savings + ?,
              last_activity = NOW()
          WHERE telegram_id = ?
        `, [savings, telegramId]);
        
        console.log(`✅ Обновлена статистика пользователя ${telegramId}: +1 заказ, +${savings} руб. экономии`);
      }
    } else if (type === 'yuan') {
      // Получаем данные покупки юаней
      const [yuanData] = await dbConnection.execute(`
        SELECT amount_cny, savings FROM yuan_purchases WHERE id = ? AND telegram_id = ?
      `, [orderId, telegramId]);
      
      if (yuanData.length > 0) {
        const amountCny = yuanData[0].amount_cny || 0;
        const savings = yuanData[0].savings || 0;
        
        // Обновляем статистику пользователя
        await dbConnection.execute(`
          UPDATE users 
          SET total_savings = total_savings + ?,
              total_yuan_bought = total_yuan_bought + ?,
              last_activity = NOW()
          WHERE telegram_id = ?
        `, [savings, amountCny, telegramId]);
        
        console.log(`✅ Обновлена статистика пользователя ${telegramId}: +${amountCny} CNY, +${savings} руб. экономии`);
        
        // Обновляем достижения и уровни
        await updateUserAchievementsAndLevels(telegramId, type);
      }
    }
  } catch (error) {
    console.error('❌ Ошибка обновления статистики пользователя:', error);
  }
}

// Функция для обновления достижений и уровней пользователя
async function updateUserAchievementsAndLevels(telegramId, type) {
  try {
    // Получаем текущую статистику пользователя
    const [userStats] = await dbConnection.execute(`
      SELECT 
        COUNT(DISTINCT CASE WHEN o.status = 'completed' THEN o.order_id END) as total_orders,
        COUNT(DISTINCT CASE WHEN yp.status = 'completed' THEN yp.id END) as total_yuan_purchases,
        COALESCE(SUM(CASE WHEN yp.status = 'completed' THEN yp.savings ELSE 0 END), 0) as total_savings
      FROM users u
      LEFT JOIN orders o ON u.telegram_id = o.telegram_id
      LEFT JOIN yuan_purchases yp ON u.telegram_id = yp.telegram_id
      WHERE u.telegram_id = ?
    `, [telegramId]);
    
    if (userStats.length > 0) {
      const stats = userStats[0];
      const totalOrders = stats.total_orders || 0;
      const totalYuanPurchases = stats.total_yuan_purchases || 0;
      const totalSavings = stats.total_savings || 0;
      
      // Обновляем уровень пользователя
      let currentLevel = 'Bronze';
      let levelProgress = 0;
      
      if (totalOrders >= 21) {
        currentLevel = 'Gold';
        levelProgress = 100;
      } else if (totalOrders >= 6) {
        currentLevel = 'Silver';
        levelProgress = Math.min(100, ((totalOrders - 6) / 15) * 100);
      } else {
        levelProgress = Math.min(100, (totalOrders / 6) * 100);
      }
      
      // Обновляем уровень в базе
      await dbConnection.execute(`
        UPDATE users 
        SET current_level = ?, total_orders = ?, updated_at = NOW()
        WHERE telegram_id = ?
      `, [currentLevel, totalOrders, telegramId]);
      
      // Проверяем и обновляем достижения
      const achievements = [
        { id: 'first_order', name: 'Первый заказ', max_progress: 1, condition: totalOrders >= 1 },
        { id: 'loyal_customer', name: 'Постоянный клиент', max_progress: 5, condition: totalOrders >= 5 },
        { id: 'yuan_buyer', name: 'Покупатель юаней', max_progress: 1, condition: totalYuanPurchases >= 1 },
        { id: 'bronze_level', name: 'Бронзовый уровень', max_progress: 1, condition: currentLevel === 'Bronze' && totalOrders >= 1 },
        { id: 'silver_level', name: 'Серебряный уровень', max_progress: 1, condition: currentLevel === 'Silver' },
        { id: 'gold_level', name: 'Золотой уровень', max_progress: 1, condition: currentLevel === 'Gold' }
      ];
      
      for (const achievement of achievements) {
        if (achievement.condition) {
          await dbConnection.execute(`
            INSERT INTO user_achievements (telegram_id, achievement_id, achievement_name, achievement_description, progress, max_progress, completed, completed_at)
            VALUES (?, ?, ?, ?, ?, ?, 1, NOW())
            ON DUPLICATE KEY UPDATE
              progress = VALUES(progress),
              completed = VALUES(completed),
              completed_at = VALUES(completed_at)
          `, [telegramId, achievement.id, achievement.name, `Достижение: ${achievement.name}`, achievement.max_progress, achievement.max_progress]);
        }
      }
      
      console.log(`✅ Обновлены достижения и уровень пользователя ${telegramId}: ${currentLevel} (${levelProgress}%)`);
    }
  } catch (error) {
    console.error('❌ Ошибка обновления достижений и уровней:', error);
  }
}

// Отправка уведомлений всем пользователям
app.post('/api/admin/send-notification-all', async (req, res) => {
  try {
    const { message, title } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Необходимо сообщение' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Получаем всех пользователей
        const [users] = await dbConnection.execute(
          'SELECT telegram_id, username, full_name FROM users WHERE telegram_id != 0'
        );

        let successCount = 0;
        let errorCount = 0;

        // Отправляем уведомления всем пользователям
        for (const user of users) {
          try {
            const notificationMessage = title 
              ? `🔔 <b>${title}</b>\n\n${message}`
              : `🔔 ${message}`;

            await sendTelegramMessage(user.telegram_id, notificationMessage);
            successCount++;
            
            // Небольшая задержка между отправками, чтобы не превысить лимиты Telegram
            await new Promise(resolve => setTimeout(resolve, 100));
          } catch (error) {
            console.error(`Ошибка отправки уведомления пользователю ${user.telegram_id}:`, error);
            errorCount++;
          }
        }

        // Логируем результат
        await createSystemLog('info', `Массовая рассылка: отправлено ${successCount}, ошибок ${errorCount}`, {
          totalUsers: users.length,
          successCount,
          errorCount,
          message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
        });

        res.json({ 
          success: true, 
          message: `Уведомления отправлены: ${successCount} успешно, ${errorCount} ошибок`,
          stats: {
            total: users.length,
            success: successCount,
            errors: errorCount
          }
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка отправки уведомлений' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка отправки уведомлений:', error);
    res.status(500).json({ error: 'Ошибка отправки уведомлений' });
  }
});

// Отправка уведомления конкретному пользователю
app.post('/api/admin/send-notification-user', async (req, res) => {
  try {
    const { telegramId, message, title } = req.body;
    
    if (!telegramId || !message) {
      return res.status(400).json({ error: 'Необходимы telegram ID и сообщение' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Проверяем, существует ли пользователь
        const [users] = await dbConnection.execute(
          'SELECT telegram_id, username, full_name FROM users WHERE telegram_id = ?',
          [telegramId]
        );

        if (users.length === 0) {
          return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const user = users[0];
        const notificationMessage = title 
          ? `🔔 <b>${title}</b>\n\n${message}`
          : `🔔 ${message}`;

        await sendTelegramMessage(telegramId, notificationMessage);

        // Логируем отправку
        await createSystemLog('info', `Уведомление отправлено пользователю ${telegramId}`, {
          telegramId,
          username: user.username,
          fullName: user.full_name,
          message: message.substring(0, 100) + (message.length > 100 ? '...' : '')
        });

        res.json({ 
          success: true, 
          message: `Уведомление отправлено пользователю @${user.username || telegramId}`
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка отправки уведомления' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка отправки уведомления:', error);
    res.status(500).json({ error: 'Ошибка отправки уведомления' });
  }
});

// Получение списка пользователей для выбора
app.get('/api/admin/users-list', async (req, res) => {
  try {
    await ensureDBConnection();

    if (dbConnection) {
      try {
        const [users] = await dbConnection.execute(`
          SELECT 
            u.telegram_id,
            u.username,
            u.full_name,
            u.created_at,
            COUNT(DISTINCT o.order_id) as orders_count,
            COUNT(DISTINCT yp.id) as yuan_purchases_count
          FROM users u
          LEFT JOIN orders o ON u.telegram_id = o.telegram_id AND o.status = 'completed'
          LEFT JOIN yuan_purchases yp ON u.telegram_id = yp.telegram_id AND yp.status = 'completed'
          WHERE u.telegram_id != 0
          GROUP BY u.telegram_id, u.username, u.full_name, u.created_at
          ORDER BY u.created_at DESC
        `);

        res.json({ 
          success: true, 
          users: users.map(user => ({
            telegram_id: user.telegram_id,
            username: user.username,
            full_name: user.full_name,
            created_at: user.created_at,
            orders_count: user.orders_count,
            yuan_purchases_count: user.yuan_purchases_count,
            display_name: user.full_name || user.username || `ID: ${user.telegram_id}`
          }))
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения списка пользователей' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения списка пользователей:', error);
    res.status(500).json({ error: 'Ошибка получения списка пользователей' });
  }
});

// Мониторинг системы
app.get('/api/admin/system-status', async (req, res) => {
  try {
    const startTime = Date.now();
    
    // Проверяем соединение с БД
    let dbStatus = 'disconnected';
    let dbResponseTime = 0;
    
    if (dbConnection) {
      try {
        const dbStartTime = Date.now();
        await dbConnection.execute('SELECT 1');
        dbResponseTime = Date.now() - dbStartTime;
        dbStatus = 'connected';
      } catch (error) {
        dbStatus = 'error';
        console.error('Database connection error:', error);
      }
    }

    // Получаем статистику системы
    const systemStats = {
      server: {
        status: 'running',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
        platform: process.platform
      },
      database: {
        status: dbStatus,
        responseTime: dbResponseTime,
        connectionState: dbConnection ? dbConnection.state : 'disconnected'
      },
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime
    };

    res.json({ 
      success: true, 
      data: systemStats 
    });
  } catch (error) {
    console.error('Ошибка получения статуса системы:', error);
    res.status(500).json({ error: 'Ошибка получения статуса системы' });
  }
});

// Изменение комиссии пользователя
app.post('/api/admin/update-user-commission', async (req, res) => {
  try {
    const { telegramId, commission } = req.body;
    
    if (!telegramId || commission === undefined) {
      return res.status(400).json({ error: 'Необходимы telegram ID и комиссия' });
    }

    if (commission < 0 || commission > 1) {
      return res.status(400).json({ error: 'Комиссия должна быть от 0 до 1' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Проверяем, существует ли пользователь
        const [users] = await dbConnection.execute(
          'SELECT telegram_id, username, full_name FROM users WHERE telegram_id = ?',
          [telegramId]
        );

        if (users.length === 0) {
          return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Получаем старую комиссию для уведомления
        const oldCommission = users[0].commission || 1000;

        // Обновляем комиссию
        await dbConnection.execute(
          'UPDATE users SET commission = ? WHERE telegram_id = ?',
          [commission, telegramId]
        );

        // Отправляем уведомление пользователю
        const notificationMessage = `💰 <b>Изменение комиссии</b>\n\n` +
                                   `Ваша комиссия была изменена:\n` +
                                   `📉 <b>Было:</b> ${oldCommission} ₽\n` +
                                   `📈 <b>Стало:</b> ${commission} ₽\n\n` +
                                   `⏰ <b>Время изменения:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
                                   `💡 Теперь при расчете стоимости заказов будет использоваться новая комиссия.`;

        await sendTelegramMessage(telegramId, notificationMessage);

        // Логируем изменение
        await createSystemLog('info', `Комиссия пользователя ${telegramId} изменена на ${commission} ₽`, {
          telegramId,
          oldCommission: oldCommission,
          newCommission: commission,
          username: users[0].username,
          fullName: users[0].full_name
        });

        res.json({ 
          success: true, 
          message: `Комиссия пользователя изменена на ${commission} ₽ и уведомление отправлено`
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка обновления комиссии' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка обновления комиссии:', error);
    res.status(500).json({ error: 'Ошибка обновления комиссии' });
  }
});

// Получение детальной истории пользователя
app.get('/api/admin/user-history/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    
    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Получаем основную информацию о пользователе
        const [userInfo] = await dbConnection.execute(`
          SELECT 
            u.telegram_id,
            u.username,
            u.full_name,
            u.commission,
            u.created_at,
            u.referred_by,
            COUNT(DISTINCT o.order_id) as total_orders,
            COUNT(DISTINCT yp.id) as total_yuan_purchases,
            COALESCE(SUM(CASE WHEN o.status = 'completed' THEN o.estimated_savings ELSE 0 END), 0) as total_savings_orders,
            COALESCE(SUM(CASE WHEN yp.status = 'completed' THEN yp.savings ELSE 0 END), 0) as total_savings_yuan
          FROM users u
          LEFT JOIN orders o ON u.telegram_id = o.telegram_id
          LEFT JOIN yuan_purchases yp ON u.telegram_id = yp.telegram_id
          WHERE u.telegram_id = ?
          GROUP BY u.telegram_id, u.username, u.full_name, u.commission, u.created_at, u.referred_by
        `, [telegramId]);

        if (userInfo.length === 0) {
          return res.status(404).json({ error: 'Пользователь не найден' });
        }

        const user = userInfo[0];

        // Получаем историю заказов
        const [orders] = await dbConnection.execute(`
          SELECT 
            order_id,
            status,
            estimated_savings,
            created_at,
            phone_number,
            pickup_point,
            pickup_point_address,
            comments,
            username,
            full_name
          FROM orders 
          WHERE telegram_id = ? 
          ORDER BY created_at DESC
        `, [telegramId]);

        // Получаем историю покупок юаней
        const [yuanPurchases] = await dbConnection.execute(`
          SELECT 
            id,
            amount_rub,
            amount_cny,
            savings,
            status,
            created_at
          FROM yuan_purchases 
          WHERE telegram_id = ? 
          ORDER BY created_at DESC
        `, [telegramId]);

        // Получаем активность пользователя
        const [activity] = await dbConnection.execute(`
          SELECT 
            action_type,
            action_data,
            created_at
          FROM user_activity 
          WHERE telegram_id = ? 
          ORDER BY created_at DESC
          LIMIT 50
        `, [telegramId]);

        // Получаем достижения
        const [achievements] = await dbConnection.execute(`
          SELECT 
            achievement_name,
            progress,
            max_progress,
            completed,
            completed_at
          FROM user_achievements 
          WHERE telegram_id = ? 
          ORDER BY completed_at DESC
        `, [telegramId]);

        const responseData = {
          user: user,
          orders: orders,
          yuanPurchases: yuanPurchases,
          activity: activity,
          achievements: achievements
        };
        
        
        res.json({ 
          success: true, 
          data: responseData
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения истории пользователя' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения истории пользователя:', error);
    res.status(500).json({ error: 'Ошибка получения истории пользователя' });
  }
});

// Получение статистики продаж
app.get('/api/admin/sales-analytics', async (req, res) => {
  try {
    const { period = 'week', startDate, endDate, compare } = req.query;
    
    await ensureDBConnection();

    if (dbConnection) {
      try {
        let dateFilter = '';
        let previousDateFilter = '';
        
        // Если указан произвольный период
        if (startDate && endDate) {
          dateFilter = `created_at BETWEEN '${startDate} 00:00:00' AND '${endDate} 23:59:59'`;
          
          // Для сравнения - предыдущий период той же длительности
          if (compare === 'true') {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const diff = end - start;
            const prevEnd = new Date(start - 1);
            const prevStart = new Date(prevEnd - diff);
            
            previousDateFilter = `created_at BETWEEN '${prevStart.toISOString().split('T')[0]} 00:00:00' AND '${prevEnd.toISOString().split('T')[0]} 23:59:59'`;
          }
        } else {
          // Стандартные периоды
          switch (period) {
            case 'day':
              dateFilter = "DATE(created_at) = CURDATE()";
              previousDateFilter = "DATE(created_at) = DATE_SUB(CURDATE(), INTERVAL 1 DAY)";
              break;
            case 'week':
              dateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
              previousDateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)";
              break;
            case 'month':
              dateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)";
              previousDateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 60 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 30 DAY)";
              break;
            default:
              dateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)";
              previousDateFilter = "created_at >= DATE_SUB(NOW(), INTERVAL 14 DAY) AND created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)";
          }
        }

        // Статистика заказов
        const [ordersStats] = await dbConnection.execute(`
          SELECT 
            DATE(created_at) as date,
            COUNT(*) as orders_count,
            SUM(estimated_savings) as total_savings,
            AVG(estimated_savings) as avg_savings
          FROM orders 
          WHERE ${dateFilter} AND status = 'completed'
          GROUP BY DATE(created_at)
          ORDER BY date ASC
        `);

        // Статистика покупок юаней
        const [yuanStats] = await dbConnection.execute(`
          SELECT 
            DATE(created_at) as date,
            COUNT(*) as purchases_count,
            SUM(amount_rub) as total_amount_rub,
            SUM(amount_cny) as total_amount_cny,
            SUM(savings) as total_savings
          FROM yuan_purchases 
          WHERE ${dateFilter} AND status = 'completed'
          GROUP BY DATE(created_at)
          ORDER BY date ASC
        `);

        // Статистика новых пользователей
        const [newUsersStats] = await dbConnection.execute(`
          SELECT 
            DATE(created_at) as date,
            COUNT(*) as new_users_count
          FROM users 
          WHERE ${dateFilter}
          GROUP BY DATE(created_at)
          ORDER BY date ASC
        `);

        // Статистика доходов (прибыли)
        const [profitStats] = await dbConnection.execute(`
          SELECT 
            DATE(pc.created_at) as date,
            COUNT(*) as profit_calculations_count,
            SUM(pc.profit) as total_profit
          FROM profit_calculations pc
          WHERE ${dateFilter.replace('created_at', 'pc.created_at')}
          GROUP BY DATE(pc.created_at)
          ORDER BY date ASC
        `);

        // Общая статистика - разделим на два отдельных запроса
        const [ordersTotalStats] = await dbConnection.execute(`
          SELECT 
            COUNT(*) as total_orders
          FROM orders 
          WHERE ${dateFilter} AND status = 'completed'
        `);

        const [yuanTotalStats] = await dbConnection.execute(`
          SELECT 
            COUNT(*) as total_yuan_purchases,
            COALESCE(SUM(amount_rub), 0) as total_yuan_amount
          FROM yuan_purchases 
          WHERE ${dateFilter} AND status = 'completed'
        `);

        const [newUsersTotalStats] = await dbConnection.execute(`
          SELECT 
            COUNT(*) as total_new_users
          FROM users 
          WHERE ${dateFilter}
        `);

        // Общая статистика доходов (прибыли)
        const [profitTotalStats] = await dbConnection.execute(`
          SELECT 
            COUNT(*) as total_profit_calculations,
            COALESCE(SUM(profit), 0) as total_profit
          FROM profit_calculations 
          WHERE ${dateFilter.replace('created_at', 'profit_calculations.created_at')}
        `);

        const totalStats = {
          total_orders: ordersTotalStats[0]?.total_orders || 0,
          total_yuan_purchases: yuanTotalStats[0]?.total_yuan_purchases || 0,
          total_yuan_amount: yuanTotalStats[0]?.total_yuan_amount || 0,
          total_new_users: newUsersTotalStats[0]?.total_new_users || 0,
          total_profit_calculations: profitTotalStats[0]?.total_profit_calculations || 0,
          total_profit: profitTotalStats[0]?.total_profit || 0
        };

        // Если запрошено сравнение с предыдущим периодом
        let previousStats = null;
        if (compare === 'true' && previousDateFilter) {
          const [prevOrdersStats] = await dbConnection.execute(`
            SELECT 
              COUNT(*) as total_orders
            FROM orders 
            WHERE ${previousDateFilter} AND status = 'completed'
          `);

          const [prevYuanStats] = await dbConnection.execute(`
            SELECT 
              COUNT(*) as total_yuan_purchases,
              COALESCE(SUM(amount_rub), 0) as total_yuan_amount
            FROM yuan_purchases 
            WHERE ${previousDateFilter} AND status = 'completed'
          `);

          const [prevNewUsersStats] = await dbConnection.execute(`
            SELECT 
              COUNT(*) as total_new_users
            FROM users 
            WHERE ${previousDateFilter}
          `);

          const [prevProfitStats] = await dbConnection.execute(`
            SELECT 
              COUNT(*) as total_profit_calculations,
              COALESCE(SUM(profit), 0) as total_profit
            FROM profit_calculations 
            WHERE ${previousDateFilter.replace('created_at', 'profit_calculations.created_at')}
          `);

          previousStats = {
            total_orders: prevOrdersStats[0]?.total_orders || 0,
            total_yuan_purchases: prevYuanStats[0]?.total_yuan_purchases || 0,
            total_yuan_amount: prevYuanStats[0]?.total_yuan_amount || 0,
            total_new_users: prevNewUsersStats[0]?.total_new_users || 0,
            total_profit_calculations: prevProfitStats[0]?.total_profit_calculations || 0,
            total_profit: prevProfitStats[0]?.total_profit || 0
          };
        }

        res.json({ 
          success: true, 
          data: {
            period,
            startDate,
            endDate,
            ordersStats,
            yuanStats,
            newUsersStats,
            profitStats,
            totalStats: totalStats,
            previousStats: previousStats
          }
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения аналитики продаж' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения аналитики продаж:', error);
    res.status(500).json({ error: 'Ошибка получения аналитики продаж' });
  }
});

// Получение детальной информации о заказе
app.get('/api/admin/order-details/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Получаем информацию о заказе
        const [orderInfo] = await dbConnection.execute(`
          SELECT 
            o.order_id,
            o.status,
            o.estimated_savings,
            o.created_at,
            o.phone_number,
            o.pickup_point,
            o.pickup_point_address,
            o.comments,
            o.username,
            o.full_name,
            u.telegram_id,
            u.username as user_username,
            u.full_name as user_full_name
          FROM orders o
          LEFT JOIN users u ON o.telegram_id = u.telegram_id
          WHERE o.order_id = ?
        `, [orderId]);

        if (orderInfo.length === 0) {
          return res.status(404).json({ error: 'Заказ не найден' });
        }

        // Получаем товары заказа
        const [orderItems] = await dbConnection.execute(`
          SELECT 
            product_link,
            product_size,
            quantity,
            estimated_savings
          FROM order_items 
          WHERE order_id = ?
          ORDER BY id
        `, [orderId]);

        res.json({ 
          success: true, 
          data: {
            order: orderInfo[0],
            items: orderItems
          }
        });
      } catch (dbError) {
        console.error('Ошибка работы с базой данных:', dbError);
        res.status(500).json({ error: 'Ошибка получения деталей заказа' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения деталей заказа:', error);
    res.status(500).json({ error: 'Ошибка получения деталей заказа' });
  }
});

// API для изменения статуса заказа
app.post('/api/admin/update-order-status', async (req, res) => {
  try {
    const { orderId, status } = req.body;
    
    console.log('📝 Запрос на обновление статуса заказа:', { orderId, status, body: req.body });
    
    if (!orderId || !status) {
      console.error('❌ Отсутствуют необходимые параметры:', { orderId, status });
      return res.status(400).json({ error: 'Необходимы orderId и status' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Получаем информацию о заказе и пользователе перед обновлением
        const [orderRows] = await dbConnection.execute(
          'SELECT o.*, u.telegram_id, u.full_name, u.username FROM orders o LEFT JOIN users u ON o.telegram_id = u.telegram_id WHERE o.order_id = ?',
          [orderId]
        );

        if (orderRows.length === 0) {
          return res.status(404).json({ error: 'Заказ не найден' });
        }

        const order = orderRows[0];

        // Обновляем статус заказа
        await dbConnection.execute(
          'UPDATE orders SET status = ? WHERE order_id = ?',
          [status, orderId]
        );

        // Отправляем уведомление пользователю в Telegram
        if (order.telegram_id) {
          const userName = order.full_name || order.username || `ID: ${order.telegram_id}`;
          const message = `📦 Обновление статуса заказа\n\n` +
                         `Заказ №${orderId}\n` +
                         `Новый статус: ${status}\n\n` +
                         `Следите за обновлениями вашего заказа!`;

          try {
            await sendTelegramMessage(order.telegram_id, message);
            console.log(`✅ Уведомление отправлено пользователю ${order.telegram_id} о смене статуса заказа ${orderId}`);
          } catch (telegramError) {
            console.error('❌ Ошибка отправки уведомления в Telegram:', telegramError);
            // Не прерываем выполнение, если уведомление не отправилось
          }
        }

        res.json({ success: true, message: 'Статус заказа обновлен' });
      } catch (dbError) {
        console.error('Ошибка обновления статуса:', dbError);
        res.status(500).json({ error: 'Ошибка обновления статуса заказа' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка обновления статуса:', error);
    res.status(500).json({ error: 'Ошибка обновления статуса заказа' });
  }
});

// API для сохранения расчета прибыли
app.post('/api/admin/save-profit-calculation', async (req, res) => {
  try {
    const {
      orderId,
      customerCommission,
      customerProductCostCny,
      customerRate,
      customerDelivery,
      customerTotal,
      myProductCostCny,
      myRate,
      myDelivery,
      myTotal,
      profit,
      createdBy
    } = req.body;
    
    if (!orderId) {
      return res.status(400).json({ error: 'Необходим orderId' });
    }

    await ensureDBConnection();

    if (dbConnection) {
      try {
        // Проверяем, существует ли уже расчет для этого заказа
        const [existing] = await dbConnection.execute(
          'SELECT id FROM profit_calculations WHERE order_id = ?',
          [orderId]
        );

        if (existing.length > 0) {
          // Обновляем существующий расчет
          await dbConnection.execute(`
            UPDATE profit_calculations SET
              customer_commission = ?,
              customer_product_cost_cny = ?,
              customer_rate = ?,
              customer_delivery = ?,
              customer_total = ?,
              my_product_cost_cny = ?,
              my_rate = ?,
              my_delivery = ?,
              my_total = ?,
              profit = ?,
              created_by = ?
            WHERE order_id = ?
          `, [
            customerCommission, customerProductCostCny, customerRate, customerDelivery, customerTotal,
            myProductCostCny, myRate, myDelivery, myTotal, profit, createdBy, orderId
          ]);
        } else {
          // Создаем новый расчет
          await dbConnection.execute(`
            INSERT INTO profit_calculations (
              order_id, customer_commission, customer_product_cost_cny, customer_rate, customer_delivery, customer_total,
              my_product_cost_cny, my_rate, my_delivery, my_total, profit, created_by
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            orderId, customerCommission, customerProductCostCny, customerRate, customerDelivery, customerTotal,
            myProductCostCny, myRate, myDelivery, myTotal, profit, createdBy
          ]);
        }

        res.json({ success: true, message: 'Расчет прибыли сохранен' });
      } catch (dbError) {
        console.error('Ошибка сохранения расчета:', dbError);
        res.status(500).json({ error: 'Ошибка сохранения расчета прибыли' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка сохранения расчета:', error);
    res.status(500).json({ error: 'Ошибка сохранения расчета прибыли' });
  }
});

// API для получения реального дохода (сумма всех расчетов прибыли)
app.get('/api/admin/total-profit', async (req, res) => {
  try {
    await ensureDBConnection();

    if (dbConnection) {
      try {
        const [result] = await dbConnection.execute(
          'SELECT COALESCE(SUM(profit), 0) as total_profit FROM profit_calculations'
        );

        res.json({ success: true, totalProfit: result[0].total_profit });
      } catch (dbError) {
        console.error('Ошибка получения общей прибыли:', dbError);
        res.status(500).json({ error: 'Ошибка получения общей прибыли' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения общей прибыли:', error);
    res.status(500).json({ error: 'Ошибка получения общей прибыли' });
  }
});

// API для получения списка заказов для расчета прибыли (статус "paid" или "completed")
app.get('/api/admin/orders-for-profit', async (req, res) => {
  try {
    await ensureDBConnection();

    if (dbConnection) {
      try {
        const [orders] = await dbConnection.execute(`
          SELECT 
            o.order_id,
            o.telegram_id,
            o.full_name,
            o.phone_number,
            o.status,
            o.estimated_savings,
            o.created_at,
            u.commission,
            u.username,
            pc.profit as existing_profit,
            pc.id as profit_calculation_id
          FROM orders o
          LEFT JOIN users u ON o.telegram_id = u.telegram_id
          LEFT JOIN profit_calculations pc ON o.order_id = pc.order_id
          WHERE o.status IN ('paid', 'completed') AND (o.status != 'profit_calculated' OR o.status IS NULL)
          ORDER BY o.created_at DESC
        `);

        res.json({ success: true, orders });
      } catch (dbError) {
        console.error('Ошибка получения заказов:', dbError);
        res.status(500).json({ error: 'Ошибка получения заказов для расчета' });
      }
    } else {
      res.status(500).json({ error: 'Нет соединения с базой данных' });
    }
  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    res.status(500).json({ error: 'Ошибка получения заказов для расчета' });
  }
});

// 404 handler (должен быть в самом конце)
// ==================== DELIVERY TRACKING API ====================

// Тестовый endpoint для проверки работы API
app.get('/api/test-delivery', async (req, res) => {
  try {
    console.log('🧪 Тестовый запрос delivery API');
    await ensureDBConnection();
    
    const [orderCount] = await dbConnection.execute('SELECT COUNT(*) as count FROM orders');
    const [trackingCount] = await dbConnection.execute('SELECT COUNT(*) as count FROM delivery_tracking');
    
    res.json({
      success: true,
      message: 'Delivery API работает',
      orders_count: orderCount[0].count,
      tracking_count: trackingCount[0].count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Ошибка тестового endpoint:', error);
    res.status(500).json({ error: 'Ошибка тестового endpoint' });
  }
});

// Тестовый endpoint для заказов пользователя без авторизации (только для разработки)
app.get('/api/test-user-orders', async (req, res) => {
  try {
    console.log('🧪 Тестовый запрос заказов пользователя');
    await ensureDBConnection();

    // Получаем все заказы с информацией о доставке (без проверки telegram_id)
    const [rows] = await dbConnection.execute(`
      SELECT 
        o.order_id,
        o.full_name,
        o.phone_number,
        o.pickup_point,
        o.pickup_point_address,
        o.estimated_savings,
        o.created_at,
        dt.internal_tracking_number,
        dt.status as delivery_status,
        dt.last_updated
      FROM orders o
      LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);

    console.log(`📦 Найдено заказов: ${rows.length}`);

    res.json({
      success: true,
      orders: rows
    });

  } catch (error) {
    console.error('❌ Ошибка тестового получения заказов:', error);
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
});

// Тестовый endpoint для отслеживания без авторизации (только для разработки)
app.get('/api/test-tracking/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    console.log(`🧪 Тестовый поиск заказа по трек-номеру: ${trackingNumber}`);
    
    await ensureDBConnection();

    // Получаем информацию о доставке БЕЗ проверки telegram_id (только для тестирования)
    const [rows] = await dbConnection.execute(`
      SELECT 
        dt.internal_tracking_number,
        dt.status,
        dt.last_updated,
        o.order_id,
        o.full_name,
        o.phone_number,
        o.telegram_id
      FROM delivery_tracking dt
      JOIN orders o ON dt.order_id = o.order_id
      WHERE dt.internal_tracking_number = ?
    `, [trackingNumber]);

    console.log(`📦 Найдено записей: ${rows.length}`);

    if (rows.length === 0) {
      console.log('❌ Заказ не найден');
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    const trackingData = rows[0];
    console.log('✅ Найден заказ:', {
      order_id: trackingData.order_id,
      status: trackingData.status,
      tracking_number: trackingData.internal_tracking_number
    });
    
    res.json({
      success: true,
      trackingNumber: trackingData.internal_tracking_number,
      status: trackingData.status,
      lastUpdated: trackingData.last_updated,
      orderId: trackingData.order_id
    });

  } catch (error) {
    console.error('❌ Ошибка тестового отслеживания:', error);
    res.status(500).json({ error: 'Ошибка получения статуса доставки' });
  }
});

// Получение статуса доставки по tracking number
app.get('/api/tracking/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    console.log(`🔍 Поиск заказа по трек-номеру: ${trackingNumber}`);
    
    // Получаем данные из Telegram WebApp
    const initData = req.headers['x-telegram-init-data'];
    console.log('📱 InitData получен:', !!initData);
    
    if (!initData) {
      console.log('❌ Нет initData');
      return res.status(401).json({ error: 'Не авторизован' });
    }

    // Парсим initData для получения telegram_id
    const urlParams = new URLSearchParams(initData);
    const userData = JSON.parse(decodeURIComponent(urlParams.get('user') || '{}'));
    const telegramId = userData.id;
    console.log('👤 Telegram ID:', telegramId);

    if (!telegramId) {
      console.log('❌ Нет telegram_id');
      return res.status(401).json({ error: 'Не авторизован' });
    }

    await ensureDBConnection();

    // Получаем информацию о доставке с проверкой принадлежности заказа пользователю
    const [rows] = await dbConnection.execute(`
      SELECT 
        dt.internal_tracking_number,
        dt.status,
        dt.last_updated,
        o.order_id,
        o.full_name,
        o.phone_number,
        o.telegram_id
      FROM delivery_tracking dt
      JOIN orders o ON dt.order_id = o.order_id
      WHERE dt.internal_tracking_number = ? AND o.telegram_id = ?
    `, [trackingNumber, telegramId]);

    console.log(`📦 Найдено записей: ${rows.length}`);

    if (rows.length === 0) {
      console.log('❌ Заказ не найден');
      return res.status(404).json({ error: 'Заказ не найден или не принадлежит вам' });
    }

    const trackingData = rows[0];
    console.log('✅ Найден заказ:', {
      order_id: trackingData.order_id,
      status: trackingData.status,
      tracking_number: trackingData.internal_tracking_number
    });
    
    res.json({
      success: true,
      trackingNumber: trackingData.internal_tracking_number,
      status: trackingData.status,
      lastUpdated: trackingData.last_updated,
      orderId: trackingData.order_id
    });

  } catch (error) {
    console.error('❌ Ошибка получения статуса доставки:', error);
    res.status(500).json({ error: 'Ошибка получения статуса доставки' });
  }
});

// Получение всех заказов пользователя для профиля
app.get('/api/user/orders', async (req, res) => {
  try {
    // Получаем данные из Telegram WebApp
    const initData = req.headers['x-telegram-init-data'];
    if (!initData) {
      return res.status(401).json({ error: 'Не авторизован' });
    }

    const urlParams = new URLSearchParams(initData);
    const userData = JSON.parse(decodeURIComponent(urlParams.get('user') || '{}'));
    const telegramId = userData.id;

    if (!telegramId) {
      return res.status(401).json({ error: 'Не авторизован' });
    }

    await ensureDBConnection();

    // Получаем все заказы пользователя с информацией о доставке
    const [rows] = await dbConnection.execute(`
      SELECT 
        o.order_id,
        o.full_name,
        o.phone_number,
        o.pickup_point,
        o.pickup_point_address,
        o.estimated_savings,
        o.created_at,
        dt.internal_tracking_number,
        dt.status as delivery_status,
        dt.last_updated
      FROM orders o
      LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id
      WHERE o.telegram_id = ?
      ORDER BY o.created_at DESC
    `, [telegramId]);

    res.json({
      success: true,
      orders: rows
    });

  } catch (error) {
    console.error('Ошибка получения заказов пользователя:', error);
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
});

// Получение всех заказов для админ панели доставки
app.get('/api/admin/delivery', async (req, res) => {
  try {
    console.log('🔍 Запрос на получение заказов для доставки');
    await ensureDBConnection();

    const [rows] = await dbConnection.execute(`
      SELECT 
        o.order_id,
        o.telegram_id,
        o.username,
        o.full_name,
        o.phone_number,
        o.pickup_point,
        o.pickup_point_address,
        o.estimated_savings,
        o.created_at,
        dt.internal_tracking_number,
        dt.status as delivery_status,
        dt.last_updated
      FROM orders o
      LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id
      ORDER BY o.created_at DESC
    `);

    console.log(`📦 Найдено заказов: ${rows.length}`);
    if (rows.length > 0) {
      console.log('📋 Пример заказа:', {
        order_id: rows[0].order_id,
        tracking_number: rows[0].internal_tracking_number,
        status: rows[0].delivery_status
      });
    }

    res.json({
      success: true,
      orders: rows
    });

  } catch (error) {
    console.error('❌ Ошибка получения заказов для админки:', error);
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
});

// Получение данных рефералов для админ-панели
app.get('/api/admin/referrals-data', async (req, res) => {
  try {
    await ensureDBConnection();
    
    if (!dbConnection) {
      return res.status(500).json({ error: 'Нет соединения с базой данных' });
    }

    // Получаем все реферальные связи с информацией о пользователях
    const [referrals] = await dbConnection.execute(`
      SELECT 
        r.telegram_id as referral_id,
        r.username as referral_username,
        r.full_name as referral_name,
        r.commission as referral_commission,
        r.access_expires_at as expires_at,
        r.created_at as activated_at,
        ref.telegram_id as referrer_id,
        ref.username as referrer_username,
        ref.full_name as referrer_name,
        CASE 
          WHEN r.access_expires_at IS NULL THEN 1
          WHEN r.access_expires_at <= NOW() THEN 1
          ELSE 0
        END as is_expired
      FROM users r
      LEFT JOIN users ref ON r.referred_by = ref.telegram_id
      WHERE r.referred_by IS NOT NULL
      ORDER BY r.created_at DESC
    `);

    res.json({ 
      success: true, 
      referrals: referrals 
    });

  } catch (error) {
    console.error('Ошибка получения данных рефералов:', error);
    res.status(500).json({ error: 'Ошибка получения данных рефералов' });
  }
});

// Ручное продление скидочной комиссии
app.post('/api/admin/extend-discount', async (req, res) => {
  try {
    const { telegramId, days } = req.body;
    
    if (!telegramId || !days) {
      return res.status(400).json({ error: 'Необходимы telegram ID и количество дней' });
    }

    if (days < 1 || days > 365) {
      return res.status(400).json({ error: 'Количество дней должно быть от 1 до 365' });
    }

    await ensureDBConnection();
    
    if (!dbConnection) {
      return res.status(500).json({ error: 'Нет соединения с базой данных' });
    }

    // Проверяем, существует ли пользователь
    const [users] = await dbConnection.execute(
      'SELECT telegram_id, username, full_name, access_expires_at, commission FROM users WHERE telegram_id = ?',
      [telegramId]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const user = users[0];
    const now = new Date();
    let newExpiryDate;

    if (user.access_expires_at && new Date(user.access_expires_at) > now) {
      // У пользователя есть активная скидка - продлеваем
      const currentExpiry = new Date(user.access_expires_at);
      newExpiryDate = new Date(currentExpiry.getTime() + days * 24 * 60 * 60 * 1000);
    } else {
      // У пользователя нет активной скидки - даем новую
      newExpiryDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    }

    // Обновляем срок действия скидки
    await dbConnection.execute(
      'UPDATE users SET access_expires_at = ?, commission = 400 WHERE telegram_id = ?',
      [newExpiryDate, telegramId]
    );

    // Отправляем уведомление пользователю
    const extensionMessage = `🎉 <b>Скидочная комиссия продлена!</b>\n\n` +
                            `Ваша скидочная комиссия 400₽ продлена на ${days} дн.\n\n` +
                            `⏰ <b>Новый срок действия:</b> ${newExpiryDate.toLocaleString('ru-RU')}\n\n` +
                            `💰 <b>Ваша комиссия:</b> 400₽ (вместо 1000₽)\n\n` +
                            `💡 Продолжайте делать заказы по сниженной цене!`;

    await sendTelegramMessage(telegramId, extensionMessage);

    // Логируем продление
    await createSystemLog('info', `Админ продлил скидку пользователю ${telegramId} на ${days} дней`, {
      telegramId,
      days,
      newExpiryDate: newExpiryDate.toISOString(),
      username: user.username,
      fullName: user.full_name
    });

    res.json({ 
      success: true, 
      message: `Скидочная комиссия продлена на ${days} дней до ${newExpiryDate.toLocaleString('ru-RU')}`
    });

  } catch (error) {
    console.error('Ошибка продления скидочной комиссии:', error);
    res.status(500).json({ error: 'Ошибка продления скидочной комиссии' });
  }
});

// Обновление статуса доставки (админ)
app.post('/api/admin/orders/:orderId/update-status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'Создан', 
      'Доставка внутри Китая', 
      'На складе в Китае', 
      'Отправлен на таможню', 
      'Доставка в РФ', 
      'Доставлен'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Неверный статус' });
    }

    await ensureDBConnection();

    // Обновляем статус в delivery_tracking
    await dbConnection.execute(
      `UPDATE delivery_tracking SET status = ?, last_updated = CURRENT_TIMESTAMP WHERE order_id = ?`,
      [status, orderId]
    );

    // Получаем информацию о заказе для уведомления
    const [orderRows] = await dbConnection.execute(`
      SELECT 
        o.telegram_id,
        o.full_name,
        dt.internal_tracking_number
      FROM orders o
      JOIN delivery_tracking dt ON o.order_id = dt.order_id
      WHERE o.order_id = ?
    `, [orderId]);

    if (orderRows.length > 0) {
      const order = orderRows[0];
      
      // Отправляем уведомление пользователю
      const message = `📦 <b>Обновление статуса заказа</b>\n\n` +
                     `🔍 <b>Номер отслеживания:</b> ${order.internal_tracking_number}\n` +
                     `📋 <b>Новый статус:</b> ${status}\n\n` +
                     `⏰ <b>Время обновления:</b> ${new Date().toLocaleString('ru-RU')}`;

      await sendTelegramMessage(order.telegram_id, message);
    }

    res.json({
      success: true,
      message: 'Статус обновлен и уведомление отправлено'
    });

  } catch (error) {
    console.error('Ошибка обновления статуса доставки:', error);
    res.status(500).json({ error: 'Ошибка обновления статуса' });
  }
});

// Получение отзывов с пагинацией
app.get('/api/reviews', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    
    console.log(`🔍 Параметры запроса: page=${page} (${typeof page}), limit=${limit} (${typeof limit}), offset=${offset} (${typeof offset})`);
    
    console.log(`📊 Запрос отзывов: page=${page}, limit=${limit}, offset=${offset}`);
    
    // Получаем общее количество отзывов
    const [totalRows] = await dbConnection.execute(`
      SELECT COUNT(*) as total FROM reviews
    `);
    const total = totalRows[0].total;
    
    console.log(`📊 Всего отзывов в БД: ${total}`);
    
    // Получаем отзывы с пагинацией
    console.log(`🔍 SQL параметры: limit=${limit}, offset=${offset}`);
    
    // Проверяем, что параметры - числа
    if (isNaN(limit) || isNaN(offset)) {
      console.error('❌ Ошибка: limit или offset не являются числами!');
      return res.status(400).json({ error: 'Неверные параметры пагинации' });
    }
    
    const [rows] = await dbConnection.execute(`
      SELECT review_id, telegram_id, username, full_name, rating, review_text, photo_url, created_at
      FROM reviews 
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);
    console.log(`🔍 SQL результат: получено ${rows.length} строк`);
    
    const totalPages = Math.ceil(total / limit);
    console.log(`📊 Возвращаем: ${rows.length} отзывов, totalPages=${totalPages}`);
    
    const response = { 
      reviews: rows,
      total: total,
      page: page,
      limit: limit,
      totalPages: totalPages
    };
    
    console.log('📤 Отправляем ответ:', JSON.stringify(response, null, 2));
    res.json(response);
  } catch (error) {
    console.error('❌ Ошибка получения отзывов:', error);
    res.status(500).json({ error: 'Ошибка получения отзывов' });
  }
});

// ========== GAMIFICATION API ENDPOINTS ==========

// Получить данные геймификации пользователя (ОБНОВЛЕНО ДЛЯ НОВОЙ СИСТЕМЫ)
app.get('/api/gamification/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    await ensureDBConnection();
    
    // Получаем данные пользователя
    const [users] = await dbConnection.query(
      'SELECT xp, current_level, login_streak, total_savings, total_orders, total_yuan_bought, total_referrals FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (users.length === 0) {
      // ВРЕМЕННОЕ ИСКЛЮЧЕНИЕ ДЛЯ ТЕСТИРОВАНИЯ - убрать перед релизом
      const demoGamificationData = {
        success: true,
        xp: 0,
        currentLevel: 'Bronze',
        loginStreak: 0,
        levelProgress: { progress: 0 },
        nextLevel: 'Silver',
        xpToNext: 1000,
        achievements: [],
        levelRewards: LEVEL_REWARDS['Bronze'],
        levels: LEVELS,
        user: {
          total_savings: 0,
          total_orders: 0,
          total_yuan_bought: 0,
          total_referrals: 0
        }
      };
      return res.json(demoGamificationData);
    }
    
    const user = users[0];
    const xp = user.xp || 0;
    const currentLevel = user.current_level || 'Bronze';
    const loginStreak = user.login_streak || 0;
    
    // Получаем достижения из новой системы
    const [achievements] = await dbConnection.query(`
      SELECT 
        a.*,
        ua.unlocked_at,
        ua.xp_awarded,
        CASE WHEN ua.telegram_id IS NOT NULL THEN 1 ELSE 0 END as unlocked
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.achievement_key = ua.achievement_key AND ua.telegram_id = ?
      ORDER BY a.category, a.xp_reward
    `, [telegramId]);
    
    
    // Вычисляем прогресс уровня
    const levelProgress = gamificationService.getLevelProgress(xp);
    
    // Определяем следующий уровень
    const levels = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
    const currentIndex = levels.indexOf(currentLevel);
    const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
    
    // Вычисляем XP до следующего уровня
    const levelThresholds = {
      'Bronze': 0,
      'Silver': 1000,
      'Gold': 5000,
      'Platinum': 25000,
      'Diamond': 100000
    };
    
    const xpToNext = nextLevel ? levelThresholds[nextLevel] - xp : 0;
    
    
    res.json({
      success: true,
      xp,
      currentLevel,
      loginStreak,
      levelProgress,
      nextLevel,
      xpToNext,
      achievements,
      levelRewards: LEVEL_REWARDS[currentLevel],
      levels: LEVELS,
      user: {
        total_savings: user.total_savings || 0,
        total_orders: user.total_orders || 0,
        total_yuan_bought: user.total_yuan_bought || 0,
        total_referrals: user.total_referrals || 0
      }
    });
  } catch (error) {
    console.error('Error fetching gamification data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Обновить ежедневный логин
app.post('/api/gamification/daily-login', async (req, res) => {
  try {
    const { telegramId } = req.body;
    
    if (!telegramId) {
      return res.status(400).json({ error: 'Telegram ID required' });
    }
    
    await ensureDBConnection();
    
    const result = await gamificationService.updateDailyLogin(telegramId);
    
    // Если это новый день логина, отправляем уведомление
    if (!result.alreadyLoggedToday && result.streak >= 5) {
      const streakMsg = `🔥 <b>Серия входов: ${result.streak} дней!</b>\n\n` +
        `Продолжайте заходить каждый день для получения достижений!`;
      
      await sendTelegramMessage(telegramId, streakMsg);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error updating daily login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить топ пользователей по XP (leaderboard)
app.get('/api/gamification/leaderboard', async (req, res) => {
  try {
    await ensureDBConnection();
    
    const limit = parseInt(req.query.limit) || 100;
    
    const [users] = await dbConnection.query(
      `SELECT telegram_id, xp, current_level 
       FROM users 
       WHERE xp > 0
       ORDER BY xp DESC 
       LIMIT ?`,
      [limit]
    );
    
    res.json({ leaderboard: users });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить историю XP пользователя
app.get('/api/gamification/:telegramId/xp-history', async (req, res) => {
  try {
    const { telegramId } = req.params;
    await ensureDBConnection();
    
    const limit = parseInt(req.query.limit) || 50;
    
    const [history] = await dbConnection.query(
      `SELECT * FROM xp_history 
       WHERE telegram_id = ? 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [telegramId, limit]
    );
    
    res.json({ history });
  } catch (error) {
    console.error('Error fetching XP history:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить историю уровней пользователя
app.get('/api/gamification/:telegramId/level-history', async (req, res) => {
  try {
    const { telegramId } = req.params;
    await ensureDBConnection();
    
    const [history] = await dbConnection.query(
      `SELECT * FROM level_history 
       WHERE telegram_id = ? 
       ORDER BY created_at DESC`,
      [telegramId]
    );
    
    res.json({ history });
  } catch (error) {
    console.error('Error fetching level history:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Получить достижения по категориям (ОБНОВЛЕНО ДЛЯ НОВОЙ СИСТЕМЫ)
app.get('/api/gamification/:telegramId/achievements-by-category', async (req, res) => {
  try {
    const { telegramId } = req.params;
    await ensureDBConnection();
    
    // Получаем достижения из новой системы
    const [achievements] = await dbConnection.query(`
      SELECT 
        a.*,
        ua.unlocked_at,
        ua.xp_awarded,
        CASE WHEN ua.telegram_id IS NOT NULL THEN 1 ELSE 0 END as unlocked
      FROM achievements a
      LEFT JOIN user_achievements ua ON a.achievement_key = ua.achievement_key AND ua.telegram_id = ?
      ORDER BY a.category, a.xp_reward
    `, [telegramId]);
    
    // Группируем по категориям
    const grouped = achievements.reduce((acc, achievement) => {
      if (!acc[achievement.category]) {
        acc[achievement.category] = [];
      }
      acc[achievement.category].push(achievement);
      return acc;
    }, {});
    
    res.json({ 
      success: true,
      achievementsByCategory: grouped 
    });
  } catch (error) {
    console.error('Error fetching achievements by category:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// ========== END GAMIFICATION API ==========

// ========== SCHEDULER API ==========

// Тестирование уведомлений
app.post('/api/test-notification', async (req, res) => {
  try {
    console.log('🧪 Тестирование уведомления...');
    await testNotification();
    res.json({ 
      success: true, 
      message: 'Тестовое уведомление отправлено менеджеру' 
    });
  } catch (error) {
    console.error('❌ Ошибка тестирования уведомления:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка отправки уведомления' 
    });
  }
});

// Ручная проверка истечения скидок
app.post('/api/check-expired-discounts', async (req, res) => {
  try {
    console.log('🔍 Ручная проверка истечения скидок...');
    await checkExpiredDiscounts();
    res.json({ 
      success: true, 
      message: 'Проверка истечения скидок выполнена' 
    });
  } catch (error) {
    console.error('❌ Ошибка проверки скидок:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Ошибка проверки скидок' 
    });
  }
});

// ========== END SCHEDULER API ==========

/**
 * Получение достижений пользователя
 */
app.get('/api/user/achievements/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    
    if (!gamificationService) {
      return res.status(500).json({ 
        success: false, 
        message: 'Сервис геймификации недоступен' 
      });
    }
    
    const achievements = await gamificationService.getUserAchievements(telegramId);
    
    res.json({
      success: true,
      achievements
    });
    
  } catch (error) {
    console.error('Ошибка получения достижений:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка получения достижений' 
    });
  }
});

/**
 * Получение статистики пользователя
 */
app.get('/api/user/stats/:telegramId', async (req, res) => {
  try {
    const { telegramId } = req.params;
    
    if (!gamificationService) {
      return res.status(500).json({ 
        success: false, 
        message: 'Сервис геймификации недоступен' 
      });
    }
    
    const stats = await gamificationService.getUserStats(telegramId);
    
    res.json({
      success: true,
      stats
    });
    
  } catch (error) {
    console.error('Ошибка получения статистики:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка получения статистики' 
    });
  }
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Запуск сервера
async function startServer() {
  await connectDB();
  
  // Запускаем планировщик задач
  startScheduler();
  
  app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен на порту ${PORT}`);
    console.log(`📊 Режим: ${process.env.NODE_ENV || 'development'}`);
    console.log(`⏰ Планировщик задач активен`);
  });
}

// Обработчики ошибок с уведомлениями админу
process.on('uncaughtException', async (error) => {
  console.error('🚨 КРИТИЧЕСКАЯ ОШИБКА (uncaughtException):', error);
  
  try {
    const botToken = process.env.BOT_TOKEN;
    const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
    
    if (botToken && managerChatId) {
      const errorMessage = `🚨 <b>КРИТИЧЕСКАЯ ОШИБКА СЕРВЕРА</b>\n\n` +
        `⚠️ <b>Тип:</b> Uncaught Exception\n\n` +
        `❌ <b>Ошибка:</b> ${error.message}\n\n` +
        `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
        `🔄 <b>Действие:</b> Сервер перезапускается...`;
      
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: managerChatId,
        text: errorMessage,
        parse_mode: 'HTML'
      }).catch(() => {});
    }
  } catch (notifyError) {
    console.error('❌ Не удалось отправить уведомление о критической ошибке:', notifyError);
  }
  
  // Закрываем соединение с БД перед выходом
  if (dbConnection) {
    await dbConnection.end().catch(() => {});
  }
  
  process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
  console.error('🚨 Необработанная ошибка Promise (unhandledRejection):', reason);
  
  try {
    const botToken = process.env.BOT_TOKEN;
    const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
    
    if (botToken && managerChatId) {
      const errorMessage = `🚨 <b>КРИТИЧЕСКАЯ ОШИБКА СЕРВЕРА</b>\n\n` +
        `⚠️ <b>Тип:</b> Unhandled Rejection\n\n` +
        `❌ <b>Ошибка:</b> ${reason?.message || String(reason)}\n\n` +
        `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
        `🔴 <b>ВНИМАНИЕ:</b> Процесс может завершиться некорректно!`;
      
      await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: managerChatId,
        text: errorMessage,
        parse_mode: 'HTML'
      }).catch(() => {});
    }
  } catch (notifyError) {
    console.error('❌ Не удалось отправить уведомление о критической ошибке:', notifyError);
  }
  
  // Не завершаем процесс, только логируем
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Получен сигнал SIGTERM, завершение работы...');
  if (dbConnection) {
    await dbConnection.end();
  }
  process.exit(0);
});

// Периодическая проверка соединения с БД каждые 5 минут
setInterval(async () => {
  try {
    if (dbConnection && dbConnection.state === 'authenticated') {
      await dbConnection.execute('SELECT 1');
    } else {
      console.log('🔄 Периодическая проверка: переподключение к БД...');
      await ensureDBConnection();
    }
  } catch (error) {
    console.error('❌ Ошибка при периодической проверке БД:', error);
  }
}, 5 * 60 * 1000); // 5 минут

// Ручной endpoint для тестирования проверки комиссий
app.post('/api/admin/check-expired-commissions', async (req, res) => {
  try {
    console.log('🔍 Ручная проверка истечения комиссий...');
    await checkExpiredDiscounts();
    res.json({ success: true, message: 'Проверка комиссий выполнена' });
  } catch (error) {
    console.error('Ошибка ручной проверки комиссий:', error);
    res.status(500).json({ error: 'Ошибка проверки комиссий' });
  }
});

// =====================================================
// НОВЫЕ API ENDPOINTS ДЛЯ СИСТЕМЫ ДОСТИЖЕНИЙ
// =====================================================

/**
 * Ежедневный вход с проверкой стрика и достижений
 */
app.post('/api/daily-login', async (req, res) => {
  try {
    const { telegramId } = req.body;
    
    if (!gamificationService) {
      return res.status(500).json({ 
        success: false, 
        message: 'Сервис геймификации недоступен' 
      });
    }
    
    // Получаем данные пользователя
    const [userRows] = await dbConnection.execute(
      'SELECT last_login_date, login_streak, total_logins FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }
    
    const user = userRows[0];
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = 1;
    let xpAwarded = 0;
    
    // Проверяем стрик
    if (user.last_login_date === yesterdayStr) {
      // Продолжаем стрик
      newStreak = (user.login_streak || 0) + 1;
    } else if (user.last_login_date === today) {
      // Уже заходил сегодня
      newStreak = user.login_streak || 0;
    } else {
      // Стрик прерван
      newStreak = 1;
    }
    
    // Начисляем XP за ежедневный вход
    xpAwarded = 10; // 10 XP за ежедневный вход
    
    // Обновляем данные пользователя
    await dbConnection.execute(
      'UPDATE users SET last_login_date = ?, login_streak = ?, total_logins = total_logins + 1 WHERE telegram_id = ?',
      [today, newStreak, telegramId]
    );
    
    // Начисляем XP
    const result = await gamificationService.awardXP(
      telegramId,
      xpAwarded,
      'Ежедневный вход',
      'login',
      null
    );
    
    // Проверяем достижения по активности
    const achievementsResult = await gamificationService.checkActivityAchievements(telegramId);
    
    res.json({ 
      success: true, 
      streak: newStreak,
      xpAwarded,
      levelUp: result.levelUp,
      achievementsUnlocked: achievementsResult.length,
      message: `Вход засчитан! Стрик: ${newStreak} дней, +${xpAwarded} XP`
    });
    
  } catch (error) {
    console.error('Ошибка ежедневного входа:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка обработки входа' 
    });
  }
});

/**
 * Расчет цены с проверкой достижений
 */
app.post('/api/calculate-price', async (req, res) => {
  try {
    const { telegramId, itemCostRub, deliveryCost, commission } = req.body;
    
    // Обновляем счетчик расчетов
    await dbConnection.execute(
      'UPDATE users SET calculation_count = calculation_count + 1, last_calculation_date = NOW() WHERE telegram_id = ?',
      [telegramId]
    );
    
    // ========== GAMIFICATION: Проверяем достижения по расчетам ==========
    if (gamificationService) {
      try {
        // Проверяем достижения по расчетам (без начисления XP)
        const achievements = await gamificationService.checkSavingsAchievements(telegramId);
        
        // Отправляем уведомления о достижениях
        for (const achievement of achievements) {
          if (achievement.success && !achievement.alreadyUnlocked) {
            const achievementMsg = `🏆 <b>Новое достижение!</b>\n\n` +
              `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
              `${achievement.achievement.description}\n\n` +
              `✨ +${achievement.achievement.xpReward} XP`;
            
            await sendTelegramMessage(telegramId, achievementMsg);
          }
        }
      } catch (gamificationError) {
        console.error('❌ Ошибка геймификации при расчете:', gamificationError);
        // Не блокируем расчет, если геймификация не работает
      }
    }
    
    // Проверяем временную скидку
    const [userRows] = await dbConnection.execute(
      'SELECT temp_discount_active, temp_discount_end_date FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    let finalCommission = commission;
    let appliedDiscount = false;
    
    if (userRows.length > 0) {
      const user = userRows[0];
      if (user.temp_discount_active && user.temp_discount_end_date > new Date()) {
        finalCommission = 600; // Временная скидка
        appliedDiscount = true;
      }
    }
    
    const totalCost = itemCostRub + finalCommission + deliveryCost;
    
    // Проверяем достижения по расчетам
    if (gamificationService) {
      try {
        const result = await gamificationService.checkSavingsAchievements(telegramId);
        
        if (result.length > 0) {
          console.log(`🎉 Разблокировано ${result.length} достижений для пользователя ${telegramId}`);
        }
      } catch (gamificationError) {
        console.error('Ошибка проверки достижений:', gamificationError);
      }
    }
    
    res.json({
      success: true,
      totalCost,
      commission: finalCommission,
      appliedDiscount,
      message: appliedDiscount ? 'Применена временная скидка!' : 'Расчет выполнен'
    });
    
  } catch (error) {
    console.error('Ошибка расчета цены:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка расчета' 
    });
  }
});

process.on('SIGINT', async () => {
  console.log('Получен сигнал SIGINT, завершение работы...');
  if (dbConnection) {
    await dbConnection.end();
  }
  process.exit(0);
});

startServer().catch(error => {
  console.error('Ошибка запуска сервера:', error);
  process.exit(1);
});
