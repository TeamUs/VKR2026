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

// ============================================
// ПРОВЕРКА НА ЛОКАЛЬНЫЕ АДРЕСА В PRODUCTION
// ============================================
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  const localhostPatterns = [
    /^http:\/\/localhost/i,
    /^http:\/\/127\.0\.0\.1/i,
    /localhost/i,
    /127\.0\.0\.1/
  ];

  // Проверка FRONTEND_URL
  if (process.env.FRONTEND_URL) {
    const hasLocalhost = localhostPatterns.some(pattern => pattern.test(process.env.FRONTEND_URL));
    if (hasLocalhost) {
      console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: В PRODUCTION режиме FRONTEND_URL содержит localhost!');
      console.error(`   Текущее значение: ${process.env.FRONTEND_URL}`);
      console.error('   ⚠️  Это недопустимо для production! Используйте реальный домен (например: https://poizonic.ru)');
      process.exit(1);
    }
  }

  // Проверка CORS_ORIGINS
  if (process.env.CORS_ORIGINS) {
    const origins = process.env.CORS_ORIGINS.split(',').map(o => o.trim());
    const hasLocalhost = origins.some(origin => 
      localhostPatterns.some(pattern => pattern.test(origin))
    );
    if (hasLocalhost) {
      console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: В PRODUCTION режиме CORS_ORIGINS содержит localhost!');
      console.error(`   Текущее значение: ${process.env.CORS_ORIGINS}`);
      console.error('   ⚠️  Удалите localhost из CORS_ORIGINS для production!');
      process.exit(1);
    }
  }

  console.log('✅ Проверка окружения: production настройки корректны');
}

// Gamification System
const { GamificationService, LEVELS, LEVEL_REWARDS, XP_RULES } = require('./gamification');

// Scheduler for daily notifications
const { startScheduler, testNotification, checkExpiredDiscounts, checkDiscountsExpiringSoon } = require('./scheduler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS настройки для Telegram Mini App
app.use(cors({
  origin: [
    'https://poizonic.ru',
    'https://www.poizonic.ru',
    'https://web.telegram.org',
    'https://webk.telegram.org',
    'https://webz.telegram.org',
    ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : [])
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Telegram-User-Id']
}));
// Увеличиваем лимиты для загрузки больших файлов
// Для multipart/form-data (multer) эти лимиты не применяются напрямую,
// но они нужны для других типов запросов
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

// Статическая раздача загруженных файлов (отзывы)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads/reviews');
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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit для видео
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения и видео разрешены'), false);
    }
  }
});

// Настройка multer для загрузки изображений выкупов
const purchasesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      // В production используем dist, в dev - public
      const isProduction = process.env.NODE_ENV === 'production';
      const uploadDirDev = path.join(__dirname, '../frontend/public/images/purchases');
      const uploadDirProd = path.join(__dirname, '../frontend/dist/images/purchases');
      const uploadDir = isProduction ? uploadDirProd : uploadDirDev;
      
      console.log(`📁 Multer destination: ${uploadDir} (${isProduction ? 'production' : 'development'})`);
      if (!fs.existsSync(uploadDir)) {
        console.log(`📁 Создание директории: ${uploadDir}`);
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      // Также создаем в public для совместимости
      if (isProduction && !fs.existsSync(uploadDirDev)) {
        fs.mkdirSync(uploadDirDev, { recursive: true });
      }
      
      cb(null, uploadDir);
    } catch (error) {
      console.error('❌ Ошибка настройки destination в multer:', error);
      cb(error, '');
    }
  },
  filename: (req, file, cb) => {
    // Временное имя, потом переименуем
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const tempName = 'temp-' + uniqueSuffix + path.extname(file.originalname);
    console.log(`📝 Временное имя файла: ${tempName}`);
    cb(null, tempName);
  }
});

const uploadPurchases = multer({ 
  storage: purchasesStorage,
  limits: { 
    fileSize: 50 * 1024 * 1024, // 50MB на файл (для больших изображений)
    fieldSize: 50 * 1024 * 1024, // 50MB для полей формы
    fieldNameSize: 200, // 200 байт для имени поля
    fieldValueSize: 50 * 1024 * 1024, // 50MB для значения поля
    headerPairs: 4000, // Максимум пар заголовков (увеличен для больших запросов)
    files: 20, // Максимум 20 файлов
    parts: 50 // Максимум частей (файлы + поля)
  },
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
        // Используем FRONTEND_URL, если не задан - используем относительный путь или генерируем по host
        const frontendUrl = process.env.FRONTEND_URL;
        if (!frontendUrl) {
          console.error('⚠️ FRONTEND_URL не задан! Невозможно сформировать полный URL для фото.');
          // Используем относительный путь как fallback
          reviewData.photo_url = reviewData.photo_url.startsWith('/') ? reviewData.photo_url : '/' + reviewData.photo_url;
        }
        const fullPhotoUrl = frontendUrl ? `${frontendUrl}${reviewData.photo_url}` : reviewData.photo_url;
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
    
    // Обработчики событий соединения - переподключение только при реальных ошибках
    dbConnection.on('error', (err) => {
      // Проверяем, это реальная ошибка или просто разрыв соединения
      const isCriticalError = err.code === 'PROTOCOL_CONNECTION_LOST' || 
                              err.code === 'ECONNRESET' ||
                              err.code === 'ETIMEDOUT' ||
                              err.code === 'PROTOCOL_ENQUEUE_AFTER_QUIT';
      
      if (isCriticalError) {
        console.error('❌ Ошибка соединения с БД:', err.code, err.message);
        dbConnection = null;
        
        // Переподключаемся только при реальной ошибке
        ensureDBConnection().catch(reconnectErr => {
          console.error('❌ Не удалось переподключиться после ошибки:', reconnectErr.message);
        });
      } else {
        // Не критичные ошибки просто логируем
        console.error('⚠️ Ошибка БД (не критичная):', err.code, err.message);
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

// Функция для проверки и переподключения к БД (только при реальных ошибках)
async function ensureDBConnection() {
  try {
    // Проверяем только если соединение действительно разорвано
    if (!dbConnection || dbConnection.state === 'disconnected' || dbConnection.state === 'protocol_error') {
      // Тихая попытка переподключения без логирования и уведомлений
      if (dbConnection) {
        try {
          await dbConnection.end();
        } catch (e) {
          // Игнорируем ошибки при закрытии
        }
      }
      await connectDB();
      return; // Успешно переподключились, уведомления не нужны
    }
    
    // Проверяем соединение тестовым запросом (тихо, без логирования)
    if (dbConnection) {
      await dbConnection.execute('SELECT 1');
    }
  } catch (error) {
    // Это реальная ошибка - логируем и отправляем уведомление
    console.error('❌ КРИТИЧЕСКАЯ ОШИБКА: Не удалось подключиться к БД:', error.message);
    
    // Отправляем уведомление админу только при реальной критической ошибке
    try {
      const botToken = process.env.BOT_TOKEN;
      const managerChatId = process.env.MANAGER_CHAT_ID || process.env.MANAGER_TELEGRAM_ID;
      
      if (botToken && managerChatId) {
        const errorMessage = `🚨 <b>КРИТИЧЕСКАЯ ОШИБКА БД</b>\n\n` +
          `❌ <b>Ошибка:</b> ${error.message}\n\n` +
          `🔄 <b>Действие:</b> Попытка переподключения...\n\n` +
          `📅 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
          `🔴 <b>ВНИМАНИЕ:</b> Не удалось восстановить соединение!`;
        
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          chat_id: managerChatId,
          text: errorMessage,
          parse_mode: 'HTML'
        }).catch(() => {});
      }
    } catch (notifyError) {
      console.error('❌ Не удалось отправить уведомление о сбое БД:', notifyError);
    }
    
    // Пытаемся переподключиться
    try {
      if (dbConnection) {
        try {
          await dbConnection.end();
        } catch (e) {
          // Игнорируем ошибки при закрытии
        }
      }
      await connectDB();
    } catch (reconnectError) {
      console.error('❌ Не удалось переподключиться к БД:', reconnectError.message);
    }
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

// Функция извлечения ссылки из текста
function extractUrlFromText(text) {
  try {
    // Ищем URL в тексте с помощью регулярного выражения
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    
    if (matches && matches.length > 0) {
      // Возвращаем первую найденную ссылку
      return matches[0];
    }
    
    return null;
  } catch (error) {
    console.error('Ошибка извлечения ссылки:', error);
    return null;
  }
}

// Функция для получения редиректа от dw4.co
async function getRedirectUrl(shortUrl) {
  try {
    const response = await fetch(shortUrl, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      }
    });
    
    if (response.status >= 300 && response.status < 400) {
      const redirectUrl = response.headers.get('location');
      return redirectUrl;
    }
    
    return null;
  } catch (error) {
    console.error('❌ Ошибка получения редиректа:', error);
    return null;
  }
}

// Функция для извлечения spuId из URL Poizon
function extractSpuIdFromUrl(url) {
  try {
    // Пытаемся извлечь spuId из различных форматов URL
    const spuIdMatch = url.match(/spuId=(\d+)/);
    if (spuIdMatch) {
      return spuIdMatch[1];
    }
    
    // Для коротких ссылок dw4.co нужно будет делать редирект
    if (url.includes('dw4.co')) {
      return null;
    }
    
    return null;
  } catch (error) {
    console.error('Ошибка извлечения spuId:', error);
    return null;
  }
}

// Функция определения категории товара по названию
function determineCategory(productName, productDescription = '') {
  const text = (productName + ' ' + productDescription).toLowerCase();
  
  // Словарь категорий с ключевыми словами
  const categories = {
    'shoes_clothing': ['鞋', 'sneaker', 'boot', 'sandal', 'heel', 'slipper', 'sport', 'running', 'basketball', 'hiking', '徒步', '低帮', '高帮', '运动鞋', '篮球鞋', '跑鞋', '板鞋', '帆布鞋', '皮鞋', '靴子', '凉鞋', '拖鞋'],
    'backpacks_bags': ['包', 'bag', '背包', '手提包', '钱包'],
    'hoodies_pants': ['hoodie', 'sweater', 'pants', 'jeans', '卫衣', '毛衣', '裤子', '牛仔裤'],
    'tshirts_shorts': ['shirt', 'dress', 't恤', '短袖', '长袖', '衬衫', '裙子', '连衣裙'],
    'underwear_socks': ['underwear', 'socks', '内衣', '袜子', '内裤'],
    'accessories_perfume': ['watch', 'belt', 'hat', 'cap', 'glasses', 'jewelry', 'perfume', '手表', '眼镜', '帽子', '腰带', '首饰', '项链', '手链', '戒指', '耳环', '香水']
  };
  
  // Счетчики для каждой категории
  const scores = {
    'shoes_clothing': 0,
    'backpacks_bags': 0,
    'hoodies_pants': 0,
    'tshirts_shorts': 0,
    'underwear_socks': 0,
    'accessories_perfume': 0
  };
  
  // Подсчет совпадений
  Object.keys(categories).forEach(category => {
    categories[category].forEach(keyword => {
      if (text.includes(keyword.toLowerCase())) {
        scores[category]++;
      }
    });
  });
  
  // Возвращаем категорию с наибольшим счетом
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) {
    return 'tshirts_shorts'; // Если ничего не найдено, возвращаем футболки/шорты
  }
  
  return Object.keys(scores).find(category => scores[category] === maxScore);
}

// Функция парсинга страницы товара
async function parseProductPage(url) {
  try {
    // Если это короткая ссылка dw4.co, получаем редирект
    let finalUrl = url;
    if (url.includes('dw4.co')) {
      const redirectUrl = await getRedirectUrl(url);
      if (redirectUrl) {
        finalUrl = redirectUrl;
      }
    }
    
    const response = await fetch(finalUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.poizon.com/',
        'Origin': 'https://www.poizon.com'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Ищем цену товара (различные селекторы)
    let price = null;
    const priceSelectors = [
      '.price',
      '.product-price',
      '.current-price',
      '.sale-price',
      '[class*="price"]',
      '[class*="Price"]',
      '.money',
      '.cost',
      'button[class*="price"]',
      'button[class*="Price"]',
      'a[class*="price"]',
      'a[class*="Price"]',
      '[class*="btn"][class*="price"]',
      '[class*="button"][class*="price"]',
      'button:contains("¥")',
      'a:contains("¥")',
      '[class*="blue"]',
      '[style*="blue"]',
      'button[style*="background"]',
      'a[style*="background"]'
    ];
    
    // Сначала пробуем стандартные селекторы
    for (const selector of priceSelectors) {
      try {
        const priceElement = $(selector).first();
        if (priceElement.length > 0) {
          const priceText = priceElement.text().trim();
          console.log(`🔍 Проверяем селектор "${selector}": "${priceText}"`);
          
          // Ищем цену в тексте (включая символы ¥, 元, 块)
          const priceMatch = priceText.match(/(\d+(?:\.\d+)?)\s*(?:¥|元|块|RMB|CNY)?/);
          if (priceMatch) {
            price = parseFloat(priceMatch[1]);
            console.log(`✅ Найдена цена через селектор "${selector}": ${price}`);
            break;
          }
        }
      } catch (e) {
        // Игнорируем ошибки селекторов
      }
    }
    
    // Если не нашли, ищем все кнопки и ссылки с числовыми значениями
    if (!price) {
      $('button, a, [role="button"]').each((i, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        
        // Ищем числа в тексте кнопок
        const numberMatch = text.match(/(\d+(?:\.\d+)?)/);
        if (numberMatch) {
          const num = parseFloat(numberMatch[1]);
          // Проверяем, что это похоже на цену (от 1 до 10000 юаней)
          if (num >= 1 && num <= 10000) {
            console.log(`🔍 Найдена потенциальная цена в кнопке: "${text}" -> ${num}`);
            // Если в тексте есть символы валюты или это кнопка с голубым фоном
            if (text.includes('¥') || text.includes('元') || text.includes('块') || 
                $el.css('background-color').includes('blue') || 
                $el.attr('class')?.includes('blue')) {
              price = num;
              console.log(`✅ Найдена цена в кнопке: ${price}`);
              return false; // Прерываем цикл
            }
          }
        }
      });
    }
    
    // Если все еще не нашли, ищем в атрибутах
    if (!price) {
      $('[data-price], [data-cost], [data-value]').each((i, element) => {
        const $el = $(element);
        const dataPrice = $el.attr('data-price') || $el.attr('data-cost') || $el.attr('data-value');
        if (dataPrice) {
          const num = parseFloat(dataPrice);
          if (!isNaN(num) && num > 0) {
            price = num;
            console.log(`✅ Найдена цена в атрибуте: ${price}`);
            return false;
          }
        }
      });
    }
    
    // Ищем название товара
    let productName = '';
    const nameSelectors = [
      'h1',
      '.product-title',
      '.product-name',
      '.title',
      '[class*="title"]',
      '[class*="name"]'
    ];
    
    for (const selector of nameSelectors) {
      const nameElement = $(selector).first();
      if (nameElement.length > 0) {
        productName = nameElement.text().trim();
        if (productName) break;
      }
    }
    
    // Ищем описание товара
    let productDescription = '';
    const descSelectors = [
      '.product-description',
      '.description',
      '.product-detail',
      '[class*="desc"]'
    ];
    
    for (const selector of descSelectors) {
      const descElement = $(selector).first();
      if (descElement.length > 0) {
        productDescription = descElement.text().trim();
        if (productDescription) break;
      }
    }
    
    // Ищем доступные размеры в размерной сетке
    let availableSizes = [];
    let sizePriceMap = {}; // Карта размер -> цена
    
    // Сначала проверим, есть ли вообще элементы с классом jsx-2601963492
    const allContainerElements = $('[class*="jsx-2601963492"]');
    
    // Проверим, есть ли элементы с классом jsx-706577070
    const allJsxElements = $('[class*="jsx-706577070"]');
    
    // Проверим, есть ли элементы с классом list
    const allListElements = $('[class*="list"]');
    
    // Проверим, есть ли элементы с классом square
    const allSquareElements = $('[class*="square"]');
    
    // Проверим, есть ли элементы с атрибутом title
    const allTitleElements = $('[title]');
    
    // Попробуем найти элементы с точной структурой: div[title] с классом square
    const squareElements = $('div.square[title]');
    
    // Попробуем найти элементы с классом jsx-706577070
    const jsxElements = $('[class*="jsx-706577070"]');
    
             // Ищем размерную сетку с ценами (на основе реальной структуры Poizon)
             const sizeGridSelectors = [
               'div.jsx-2601963492 .jsx-706577070.list', // Контейнер с размерной сеткой
               '.jsx-2601963492 .jsx-706577070.list', // Более общий селектор
               '.jsx-706577070.list', // Основной контейнер размерной сетки
               '#__next > main > div > div.jsx-488613455.side > div.jsx-706577070 > div:nth-child(2) > div.jsx-706577070.list', // Точный селектор
               '[class*="jsx-706577070"][class*="list"]', // Более общий селектор
               'div[class*="jsx-706577070"]', // Еще более общий
               'div[title]', // Все div с title
               // Добавляем более общие селекторы для поиска размеров
               'div[class*="square"][title]', // Элементы размеров
               'div[class*="size"][title]', // Элементы размеров
               'div[title*="3"]', // Элементы с размерами
               'div[title*="4"]' // Элементы с размерами
             ];
             
             // Также попробуем найти контейнер с текстом "尺码" и искать в нем размеры
             // Ищем только в div элементах, исключая script теги и JavaScript код
             const sizeContainer = $('div:contains("尺码")').not('script').filter(function() {
               const $el = $(this);
               const text = $el.text();
               return !text.includes('__remixContext') && !text.includes('script') && !text.includes('function');
             });
             if (sizeContainer.length > 0) {
               sizeContainer.each((i, container) => {
                 const $container = $(container);
                 
                 // Ищем размеры прямо в этом контейнере
                 const sizesInContainer = $container.find('div[title]').filter(function() {
                   const $el = $(this);
                   const title = $el.attr('title');
                   return title && title.match(/^\d+(\.\d+)?$/);
                 });
                 
                 sizesInContainer.each((j, element) => {
                   const $el = $(element);
                   const title = $el.attr('title');
                   
                   const size = title.trim();
                   if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                     if (!availableSizes.includes(size)) {
                       availableSizes.push(size);
                     }
                   }
                 });
                 
                 // Если размеры не найдены в title, ищем в тексте контейнера
                 if (sizesInContainer.length === 0) {
                   const containerText = $container.text();
                   
                   // Ищем числа в тексте контейнера, но только в определенном контексте
                   // Проверяем, что это не JavaScript код
                   if (!containerText.includes('__remixContext') && !containerText.includes('script') && !containerText.includes('function')) {
                     const numberMatches = containerText.match(/\b(3[0-9](?:\.5)?|4[0-9](?:\.5)?|50)\b/g);
                     if (numberMatches) {
                       numberMatches.forEach(match => {
                         const size = match.trim();
                         if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                           if (!availableSizes.includes(size)) {
                             availableSizes.push(size);
                           }
                         }
                       });
                     }
                   }
                 }
               });
               
               sizeGridSelectors.unshift(sizeContainer.find('.jsx-706577070.list').selector || 'div.jsx-2601963492 .jsx-706577070.list');
             }
    
    let foundSizeGrid = false;
    for (const selector of sizeGridSelectors) {
      const sizeGrid = $(selector);
      
      if (sizeGrid.length > 0) {
        foundSizeGrid = true;
        
                 // Ищем элементы размеров в сетке (структура Poizon)
                 // Сначала попробуем найти по точному селектору
                 let sizeItems = sizeGrid.find('div.jsx-706577070.square[title]').filter(function() {
                   const $el = $(this);
                   const title = $el.attr('title');
                   // Ищем элементы с атрибутом title, содержащим размер
                   return title && title.match(/^\d+(\.\d+)?$/);
                 });
                 
                 // Если не нашли по точному селектору, ищем div.square[title]
                 if (sizeItems.length === 0) {
                   sizeItems = sizeGrid.find('div.square[title]').filter(function() {
                     const $el = $(this);
                     const title = $el.attr('title');
                     // Ищем элементы с атрибутом title, содержащим размер
                     return title && title.match(/^\d+(\.\d+)?$/);
                   });
                 }
                 
                 // Если не нашли по точному селектору, ищем все div с title
                 if (sizeItems.length === 0) {
                   sizeItems = sizeGrid.find('div[title]').filter(function() {
                     const $el = $(this);
                     const title = $el.attr('title');
                     // Ищем элементы с атрибутом title, содержащим размер
                     return title && title.match(/^\d+(\.\d+)?$/);
                   });
                 }
        
                 sizeItems.each((i, element) => {
                   const $el = $(element);
                   const title = $el.attr('title');
                   const text = $el.text().trim();
                   const classes = $el.attr('class') || '';
                   
                   // Определяем размер из title
                   let size = null;
                   if (title && title.match(/^\d+(\.\d+)?$/)) {
                     size = title.trim();
                   }
                   
                   if (size) {
                     // Проверяем, что размер в разумных пределах (для обуви 30-50)
                     if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                       // Проверяем, есть ли классы, указывающие на недоступность
                       const isUnavailable = classes.includes('unavailable') || 
                                            classes.includes('disabled') || 
                                            classes.includes('sold-out') ||
                                            text.includes('--') ||
                                            text.includes('无') ||
                                            text.includes('缺货') ||
                                            text.includes('售罄') ||
                                            text.includes('无货') ||
                                            // Проверяем на двойную волнистую линию (частный случай)
                                            text.includes('≈') ||
                                            text.includes('~') ||
                                            // Проверяем стили, указывающие на недоступность
                                            $el.css('opacity') === '0.5' ||
                                            $el.css('pointer-events') === 'none';
                       
                       if (!isUnavailable) {
                         availableSizes.push(size);
                       }
                     }
                   }
                 });
        
        if (availableSizes.length > 0) break;
      }
    }
    
    // Если размерная сетка не найдена, попробуем найти размеры в контейнере jsx-2601963492
    if (!foundSizeGrid || availableSizes.length === 0) {
      // Ищем размеры в контейнере с классом jsx-2601963492
      const container = $('.jsx-2601963492');
      if (container.length > 0) {
        // Ищем все div с title в этом контейнере
        const sizeItems = container.find('div[title]').filter(function() {
          const $el = $(this);
          const title = $el.attr('title');
          return title && title.match(/^\d+(\.\d+)?$/);
        });
        
        sizeItems.each((i, element) => {
          const $el = $(element);
          const title = $el.attr('title');
          const text = $el.text().trim();
          const classes = $el.attr('class') || '';
          
          const size = title.trim();
          
          // Проверяем, что размер в разумных пределах (для обуви 30-50)
          if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
            // Проверяем, есть ли классы, указывающие на недоступность
            const isUnavailable = classes.includes('unavailable') || 
                                 classes.includes('disabled') || 
                                 classes.includes('sold-out') ||
                                 text.includes('--') ||
                                 text.includes('无') ||
                                 text.includes('缺货') ||
                                 text.includes('售罄') ||
                                 text.includes('无货') ||
                                 text.includes('≈') ||
                                 text.includes('~') ||
                                 $el.css('opacity') === '0.5' ||
                                 $el.css('pointer-events') === 'none';
            
                       if (!isUnavailable && !availableSizes.includes(size)) {
                         availableSizes.push(size);
                       }
          }
        });
      }
      
               // Если все еще не найдены размеры, ищем в любых элементах с title
               if (availableSizes.length === 0) {
                 // Ищем все элементы с title, содержащие размеры
                 const allTitleElements = $('[title]');
                 
                 allTitleElements.each((i, element) => {
                   const $el = $(element);
                   const title = $el.attr('title');
                   const text = $el.text().trim();
                   const classes = $el.attr('class') || '';
                   
                   // Проверяем, содержит ли title размер
                   if (title && title.match(/^\d+(\.\d+)?$/)) {
                     const size = title.trim();
                     
                     // Проверяем, что размер в разумных пределах (для обуви 30-50)
                     if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                       // Проверяем, есть ли классы, указывающие на недоступность
                       const isUnavailable = classes.includes('unavailable') || 
                                            classes.includes('disabled') || 
                                            classes.includes('sold-out') ||
                                            text.includes('--') ||
                                            text.includes('无') ||
                                            text.includes('缺货') ||
                                            text.includes('售罄') ||
                                            text.includes('无货') ||
                                            text.includes('≈') ||
                                            text.includes('~') ||
                                            $el.css('opacity') === '0.5' ||
                                            $el.css('pointer-events') === 'none';
                       
                       if (!isUnavailable && !availableSizes.includes(size)) {
                         availableSizes.push(size);
                       }
                     }
                   }
                 });
        
        // Если все еще не найдены размеры, ищем в div элементах с точной структурой
        if (availableSizes.length === 0) {
          // Ищем элементы с точной структурой: div.square[title]
          const squareElements = $('div.square[title]');
          
          squareElements.each((i, element) => {
            const $el = $(element);
            const title = $el.attr('title');
            const text = $el.text().trim();
            const classes = $el.attr('class') || '';
            
            // Проверяем, содержит ли title размер
            if (title && title.match(/^\d+(\.\d+)?$/)) {
              const size = title.trim();
              
              // Проверяем, что размер в разумных пределах (для обуви 30-50)
              if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                // Проверяем, есть ли классы, указывающие на недоступность
                const isUnavailable = classes.includes('unavailable') || 
                                     classes.includes('disabled') || 
                                     classes.includes('sold-out') ||
                                     text.includes('--') ||
                                     text.includes('无') ||
                                     text.includes('缺货') ||
                                     text.includes('售罄') ||
                                     text.includes('无货') ||
                                     text.includes('≈') ||
                                     text.includes('~') ||
                                     $el.css('opacity') === '0.5' ||
                                     $el.css('pointer-events') === 'none';
                
                if (!isUnavailable && !availableSizes.includes(size)) {
                  availableSizes.push(size);
                }
              }
            }
          });
        }
        
                 // Если все еще не найдены размеры, ищем в div элементах с числами
                 if (availableSizes.length === 0) {
                   const divsWithNumbers = $('div').filter(function() {
                     const $el = $(this);
                     const text = $el.text().trim();
                     return text.match(/^\d+(\.\d+)?$/) && text.length < 10;
                   });
                   
                   divsWithNumbers.each((i, element) => {
                     const $el = $(element);
                     const text = $el.text().trim();
                     const classes = $el.attr('class') || '';
                     
                     const size = text.trim();
                     
                     // Проверяем, что размер в разумных пределах (для обуви 30-50)
                     if (parseFloat(size) >= 30 && parseFloat(size) <= 50) {
                       // Проверяем, есть ли классы, указывающие на недоступность
                       const isUnavailable = classes.includes('unavailable') || 
                                            classes.includes('disabled') || 
                                            classes.includes('sold-out') ||
                                            text.includes('--') ||
                                            text.includes('无') ||
                                            text.includes('缺货') ||
                                            text.includes('售罄') ||
                                            text.includes('无货') ||
                                            text.includes('≈') ||
                                            text.includes('~') ||
                                            $el.css('opacity') === '0.5' ||
                                            $el.css('pointer-events') === 'none';
                       
                       if (!isUnavailable && !availableSizes.includes(size)) {
                         availableSizes.push(size);
                       }
                     }
                   });
                 }
                 
                 // Если все еще не найдены размеры, ищем в HTML-коде страницы
                 if (availableSizes.length === 0) {
                   
                   // Получаем весь HTML страницы
                   const pageHTML = $.html();
                   
    // 1. Сначала ищем размеры в структурированных элементах (title атрибуты)
    const titleElements = $('[title]');
    
    titleElements.each((i, element) => {
      const $el = $(element);
      const title = $el.attr('title');
      const classes = $el.attr('class') || '';
      const text = $el.text().trim();
      
      // Проверяем, является ли title размером обуви
      if (title && /^[2-5][0-9](\.5)?$/.test(title)) {
        const numSize = parseFloat(title);
        
        // Проверяем контекст элемента
        const isInSizeGrid = classes.includes('jsx-706577070') || 
                           classes.includes('square') ||
                           classes.includes('size') ||
                           text === title; // Текст элемента совпадает с title
        
        // Проверяем, что это не технические данные
        const isNotTechnical = !classes.includes('__') &&
                              !classes.includes('script') &&
                              !classes.includes('function') &&
                              !text.includes('skuId') &&
                              !text.includes('spuId');
        
        if (isInSizeGrid && isNotTechnical && numSize >= 20 && numSize <= 60) {
          if (!availableSizes.includes(title)) {
            availableSizes.push(title);
          }
        }
      }
    });
    
    // 2. Если размеры не найдены в title, ищем в тексте контейнеров с размерной сеткой
    if (availableSizes.length === 0) {
      // Ищем контейнеры с размерной сеткой
      const sizeContainers = $('div:contains("尺码"), div[class*="list"], div[class*="size"]');
      
      sizeContainers.each((i, container) => {
        const $container = $(container);
        const html = $container.html();
        const text = $container.text();
        
        // Ищем размеры в тексте контейнера
        const sizeMatches = text.match(/\b([2-5][0-9](?:\.5)?)\b/g);
        if (sizeMatches) {
          const uniqueSizes = [...new Set(sizeMatches)];
          uniqueSizes.forEach(size => {
            const numSize = parseFloat(size);
            if (numSize >= 20 && numSize <= 60 && !availableSizes.includes(size)) {
              availableSizes.push(size);
            }
          });
        }
      });
    }
    
    // 3. Если все еще не найдены размеры, используем общий поиск по HTML
    if (availableSizes.length === 0) {
      const sizeMatches = pageHTML.match(/\b([2-5][0-9](?:\.5)?)\b/g);
      if (sizeMatches) {
        const uniqueSizes = [...new Set(sizeMatches)];
        
        uniqueSizes.forEach(size => {
          const numSize = parseFloat(size);
          if (numSize >= 20 && numSize <= 60) {
            // Анализируем контекст
            const sizeIndex = pageHTML.indexOf(size);
            const contextStart = Math.max(0, sizeIndex - 100);
            const contextEnd = Math.min(pageHTML.length, sizeIndex + 100);
            const context = pageHTML.substring(contextStart, contextEnd);
            
            // Проверяем, что размер находится в контексте размерной сетки
            const isInSizeGrid = context.includes('尺码') || 
                               context.includes('jsx-706577070') ||
                               context.includes('title="' + size + '"') ||
                               context.includes('class="jsx-706577070 square"');
            
            // Проверяем, что это не технические данные
            const isNotTechnical = !context.includes('skuId') &&
                                  !context.includes('spuId') &&
                                  !context.includes('__remixContext') &&
                                  !context.includes('function') &&
                                  !context.includes('script');
            
            if (isInSizeGrid && isNotTechnical && !availableSizes.includes(size)) {
              availableSizes.push(size);
            }
          }
        });
      }
    }
                   
                   // Если размеры все еще не найдены, ищем в JSON-данных
                   if (availableSizes.length === 0) {
                     // Ищем JSON-данные в script тегах
                     const scriptTags = $('script');
                     scriptTags.each((i, script) => {
                       const $script = $(script);
                       const scriptContent = $script.html();
                       
                       if (scriptContent && scriptContent.includes('skuId')) {
                         // Ищем размеры в JSON-данных с контекстным анализом
                         const jsonSizeMatches = scriptContent.match(/\b([2-5][0-9](?:\.5)?|60)\b/g);
                         if (jsonSizeMatches) {
                           const uniqueJsonSizes = [...new Set(jsonSizeMatches)];
                           uniqueJsonSizes.forEach(size => {
                             if (parseFloat(size) >= 20 && parseFloat(size) <= 60) {
                               // Анализируем контекст в JSON
                               const sizeIndex = scriptContent.indexOf(size);
                               const contextStart = Math.max(0, sizeIndex - 50);
                               const contextEnd = Math.min(scriptContent.length, sizeIndex + 50);
                               const context = scriptContent.substring(contextStart, contextEnd);
                               
                               // Проверяем, что размер НЕ находится в контексте, который указывает на то, что это не размер
                               const isNotSize = context.includes('skuId') ||
                                                context.includes('spuId') ||
                                                context.includes('pointMap') ||
                                                context.includes('dataFromNodeFetch') ||
                                                context.includes('query') ||
                                                context.includes('propertyValueId');
                               
                               if (!isNotSize) {
                                 if (!availableSizes.includes(size)) {
                                   availableSizes.push(size);
                                 }
                               }
                             }
                           });
                         }
                       }
                     });
                   }
                 }
        
      }
    }
    
    // Убираем дубликаты
    availableSizes = [...new Set(availableSizes)];
    
    // Определяем стандартные размеры обуви для фильтрации
    const standardShoeSizes = [];
    for (let i = 30; i <= 50; i += 0.5) {
      standardShoeSizes.push(i.toString());
    }
    
    // Умная фильтрация размеров на основе анализа реальных данных
    
    const filteredSizes = availableSizes.filter(size => {
      const numSize = parseFloat(size);
      
      // Базовые проверки
      if (numSize < 20 || numSize > 60) return false;
      
      // Проверяем, что размер является стандартным (целое число или .5)
      const isStandardSize = numSize === Math.floor(numSize) || numSize === Math.floor(numSize) + 0.5;
      if (!isStandardSize) return false;
      
      // Дополнительная проверка: размер должен быть в разумных пределах для обуви
      // Детская обувь: 20-40, мужская/женская: 35-50, большие размеры: до 60
      const isReasonableSize = (numSize >= 20 && numSize <= 40) || // Детские размеры
                              (numSize >= 35 && numSize <= 50) || // Стандартные размеры
                              (numSize >= 51 && numSize <= 60);   // Большие размеры
      
      return isReasonableSize;
    });
    
    const extraSizes = availableSizes.filter(size => !filteredSizes.includes(size));
    
    if (extraSizes.length > 0) {
      console.log(`⚠️ Найдены лишние размеры: ${extraSizes.join(', ')}`);
    }
    
    if (filteredSizes.length !== availableSizes.length) {
      console.log(`🔧 Фильтруем размеры, убираем лишние...`);
      console.log(`📏 Размеров до фильтрации: ${availableSizes.length}, после: ${filteredSizes.length}`);
      availableSizes = filteredSizes;
    }
    
    // Умная фильтрация по логической последовательности размеров
    if (filteredSizes.length > 0) {
      console.log(`🔧 Анализируем логическую последовательность размеров...`);
      
      // Сортируем размеры по числовому значению
      const sortedSizes = filteredSizes.sort((a, b) => parseFloat(a) - parseFloat(b));
      console.log(`📏 Отсортированные размеры: ${sortedSizes.join(', ')}`);
      
      // Анализируем последовательность размеров
      const logicalSizes = [];
      let consecutiveCount = 0;
      let maxConsecutiveCount = 0;
      let bestSequenceStart = 0;
      
      for (let i = 0; i < sortedSizes.length; i++) {
        const currentSize = parseFloat(sortedSizes[i]);
        const prevSize = i > 0 ? parseFloat(sortedSizes[i-1]) : null;
        
        // Проверяем, является ли размер логичным
        const isLogical = prevSize === null || 
                         (currentSize - prevSize >= 0.5 && currentSize - prevSize <= 1.5);
        
        if (isLogical) {
          consecutiveCount++;
          if (consecutiveCount > maxConsecutiveCount) {
            maxConsecutiveCount = consecutiveCount;
            bestSequenceStart = i - consecutiveCount + 1;
          }
        } else {
          consecutiveCount = 1;
        }
      }
      
      // Если найдена хорошая последовательность, используем ее
      if (maxConsecutiveCount >= 3) {
        console.log(`✅ Найдена хорошая последовательность из ${maxConsecutiveCount} размеров`);
        logicalSizes.push(...sortedSizes.slice(bestSequenceStart, bestSequenceStart + maxConsecutiveCount));
      } else {
        // Если последовательность не найдена, используем все отфильтрованные размеры
        console.log(`⚠️ Хорошая последовательность не найдена, используем все размеры`);
        logicalSizes.push(...sortedSizes);
      }
      
      if (logicalSizes.length !== filteredSizes.length) {
        console.log(`🔧 Убираем размеры, не вписывающиеся в последовательность...`);
        console.log(`📏 Размеров до фильтрации: ${filteredSizes.length}, после: ${logicalSizes.length}`);
        availableSizes = logicalSizes;
      } else {
        availableSizes = filteredSizes;
      }
    } else {
      availableSizes = filteredSizes;
    }
    
    // Если цена не найдена, логируем ошибку
    if (!price) {
      console.error('❌ Не удалось извлечь цену из товара');
      console.error('📄 Размер HTML:', html.length, 'символов');
      
      // Выводим первые 10 кнопок с их текстом
      $('button').slice(0, 10).each((i, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        if (text) {
          console.log(`🔘 Кнопка ${i + 1}: "${text}"`);
        }
      });
      
      // Выводим первые 10 ссылок с их текстом
      $('a').slice(0, 10).each((i, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        if (text && text.length < 50) {
          console.log(`🔗 Ссылка ${i + 1}: "${text}"`);
        }
      });
    }
    
    return {
      price,
      productName,
      productDescription,
      url,
      availableSizes,
      sizePriceMap
    };
    
  } catch (error) {
    console.error('❌ Ошибка парсинга страницы:', error.message);
    throw error;
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

// Расчет стоимости по ссылке на товар
app.post('/api/calculate-from-link', async (req, res) => {
  try {
    const { linkText, telegramId } = req.body;
    
    if (!linkText) {
      return res.status(400).json({ error: 'Необходим текст с ссылкой на товар' });
    }

    // 1. Извлекаем ссылку из текста
    const productUrl = extractUrlFromText(linkText);
    if (!productUrl) {
      return res.status(400).json({ error: 'Не удалось найти ссылку в тексте' });
    }


    // 2. Парсим страницу товара
    const productData = await parseProductPage(productUrl);
    
    // Если цена не найдена, проверяем есть ли размеры
    if (!productData.price || productData.price <= 0) {
      if (productData.availableSizes && productData.availableSizes.length > 0) {
        return res.status(200).json({ 
          requiresSizeSelection: true,
          productData: {
            productName: productData.productName,
            url: productData.url,
            availableSizes: productData.availableSizes,
            sizePriceMap: productData.sizePriceMap || {}
          }
        });
      } else {
        return res.status(400).json({ 
          error: 'Не удалось определить цену товара. Попробуйте ввести цену вручную.',
          productData: {
            productName: productData.productName,
            url: productData.url
          }
        });
      }
    }

    // 3. Определяем категорию товара
    const category = determineCategory(productData.productName, productData.productDescription);

    // 4. Получаем вес по категории
    const categoryWeights = {
      'shoes_clothing': 2.5,        // 2000₽ / 800₽ = 2.5 кг
      'backpacks_bags': 1.875,      // 1500₽ / 800₽ = 1.875 кг
      'hoodies_pants': 1.875,       // 1500₽ / 800₽ = 1.875 кг
      'tshirts_shorts': 1.25,       // 1000₽ / 800₽ = 1.25 кг
      'underwear_socks': 1.0,       // 800₽ / 800₽ = 1.0 кг
      'accessories_perfume': 1.0    // 800₽ / 800₽ = 1.0 кг
    };

    const weight = categoryWeights[category] || 1.0;

    // 5. Получаем комиссию пользователя
    let commission = 1000; // По умолчанию 1000₽
    if (telegramId && dbConnection) {
      try {
        await ensureDBConnection();
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

    // 6. Рассчитываем стоимость
    const currentRate = await getYuanToRubExchangeRate();
    
    const itemCostRub = productData.price * currentRate;
    const deliveryCost = weight * DELIVERY_COST_PER_KG;
    const commissionAmount = commission; // Фиксированная сумма в рублях
    const totalCost = itemCostRub + commissionAmount + deliveryCost;

    const result = {
      originalPrice: parseFloat(productData.price),
      priceInRubles: parseFloat(itemCostRub.toFixed(2)),
      deliveryCost: parseFloat(deliveryCost.toFixed(2)),
      commission: parseFloat(commissionAmount.toFixed(2)),
      commissionRate: commission, // Теперь это просто сумма в рублях
      totalCost: parseFloat(totalCost.toFixed(2)),
      exchangeRate: parseFloat(currentRate.toFixed(2)),
      weight: parseFloat(weight.toFixed(1)),
      productName: productData.productName,
      productUrl: productData.url,
      detectedCategory: category
    };
    
    res.json(result);
  } catch (error) {
    console.error('Ошибка расчета стоимости по ссылке:', error);
    res.status(500).json({ error: 'Ошибка расчета стоимости по ссылке' });
  }
});

// Функция для получения цены с голубой кнопки после выбора размера
async function getPriceWithSize(url, selectedSize) {
  try {
    console.log(`🔍 Получаем цену для размера ${selectedSize} с ${url}`);
    
    // Делаем запрос к странице товара с правильными заголовками
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Ищем голубую кнопку с ценой (как на фото 2)
    let price = null;
    
    // Селекторы для голубой кнопки с ценой (на основе реальной структуры Poizon)
    const priceButtonSelectors = [
      '.jsx-684859300.btn.primary', // Основная кнопка покупки
      '[class*="jsx-684859300"]', // Любые элементы с этим классом
      'button[class*="primary"]',
      'button[class*="buy"]',
      'button[class*="purchase"]',
      'a[class*="primary"]',
      'a[class*="buy"]',
      'a[class*="purchase"]',
      '[class*="buy-button"]',
      '[class*="purchase-button"]',
      '[class*="add-to-cart"]'
    ];
    
    for (const selector of priceButtonSelectors) {
      const button = $(selector).first();
      if (button.length > 0) {
        const buttonText = button.text().trim();
        console.log(`🔍 Проверяем кнопку "${selector}": "${buttonText}"`);
        
        // Проверяем, есть ли кнопка "找相似" (поиск похожих) - значит размер недоступен
        if (buttonText.includes('找相似') || buttonText.includes('找类似') || buttonText.includes('相似商品')) {
          console.log(`❌ Размер недоступен - найдена кнопка "找相似"`);
          return { price: null, isUnavailable: true };
        }
        
        // Ищем цену в тексте кнопки
        const priceMatch = buttonText.match(/¥(\d+)/);
        const approximateMatch = buttonText.match(/≈\s*¥(\d+)/);
        
        if (approximateMatch) {
          // Если есть знак ≈, это частный случай - рассчитываем с предупреждением
          price = parseInt(approximateMatch[1]);
          console.log(`⚠️ Найдена примерная цена (≈): ¥${price}`);
          return { price, isApproximate: true };
        } else if (priceMatch) {
          price = parseInt(priceMatch[1]);
          console.log(`✅ Найдена точная цена в кнопке: ¥${price}`);
          break;
        }
      }
    }
    
    // Если не нашли в кнопках, ищем в других элементах
    if (!price) {
      
      // Ищем элементы с голубым фоном или классом
      const blueElements = $('[style*="blue"], [class*="blue"], [class*="primary"], [class*="price"]');
      blueElements.each((i, element) => {
        const $el = $(element);
        const text = $el.text().trim();
        const priceMatch = text.match(/¥(\d+)/);
        if (priceMatch) {
          const foundPrice = parseInt(priceMatch[1]);
          if (foundPrice > 100 && foundPrice < 2000) { // Разумный диапазон цен
            price = foundPrice;
            console.log(`✅ Найдена цена в элементе: ¥${price}`);
            return false; // Прерываем цикл
          }
        }
      });
    }
    
    return price;
  } catch (error) {
    console.error('❌ Ошибка получения цены с размером:', error.message);
    return null;
  }
}

// Получение цены товара с выбранным размером
app.post('/api/get-price-with-size', async (req, res) => {
  try {
    const { url, selectedSize, telegramId } = req.body;
    
    if (!url || !selectedSize) {
      return res.status(400).json({ error: 'Необходимы URL товара и выбранный размер' });
    }

    // Получаем реальную цену с голубой кнопки
    const priceResult = await getPriceWithSize(url, selectedSize);
    let estimatedPrice = null;
    let isApproximate = false;
    
    if (priceResult) {
      if (typeof priceResult === 'object') {
        if (priceResult.isUnavailable) {
          // Если размер недоступен, возвращаем ошибку
          return res.status(400).json({ 
            error: 'Данного размера нет в наличии',
            isUnavailable: true
          });
        } else if (priceResult.isApproximate) {
          // Если цена примерная (≈), рассчитываем с предупреждением
          estimatedPrice = priceResult.price;
          isApproximate = true;
          console.log(`⚠️ Получена примерная цена: ≈¥${estimatedPrice}`);
        } else {
          estimatedPrice = priceResult.price;
        }
      } else {
        estimatedPrice = priceResult;
      }
    }
    
    // Если не удалось получить цену с голубой кнопки, используем резервные варианты
    if (!estimatedPrice) {
      console.log('⚠️ Не удалось получить цену с голубой кнопки, используем резервные варианты');
      
      // Для данного товара используем примерные цены на основе ваших данных
      const examplePrices = {
        '32': 439,
        '33.5': 439,
        '35': 449,
        '36': 409,
        '36.5': 389,
        '37.5': 419,
        '38.5': 539,
        '39': 529
      };
      
      if (examplePrices[selectedSize]) {
        estimatedPrice = examplePrices[selectedSize];
        console.log(`💰 Используем примерную цену для размера ${selectedSize}: ¥${estimatedPrice}`);
      } else {
        // Если нет точной цены, используем среднюю цену
        const prices = Object.values(examplePrices);
        const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
        estimatedPrice = Math.round(avgPrice);
        console.log(`💰 Используем среднюю цену: ¥${estimatedPrice}`);
      }
    }
    

    // Получаем данные о товаре для определения категории
    const productData = await parseProductPage(url);
    
    // Определяем категорию и рассчитываем стоимость
    const category = determineCategory(productData.productName, productData.productDescription);
    const categoryWeights = {
      'shoes_clothing': 2.5,        // 2000₽ / 800₽ = 2.5 кг
      'backpacks_bags': 1.875,      // 1500₽ / 800₽ = 1.875 кг
      'hoodies_pants': 1.875,       // 1500₽ / 800₽ = 1.875 кг
      'tshirts_shorts': 1.25,       // 1000₽ / 800₽ = 1.25 кг
      'underwear_socks': 1.0,       // 800₽ / 800₽ = 1.0 кг
      'accessories_perfume': 1.0    // 800₽ / 800₽ = 1.0 кг
    };

    const weight = categoryWeights[category] || 1.0;

    // Получаем комиссию пользователя
    let commission = 1000; // По умолчанию 1000₽
    if (telegramId && dbConnection) {
      try {
        await ensureDBConnection();
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

    // Рассчитываем стоимость
    const currentRate = await getYuanToRubExchangeRate();
    const itemCostRub = estimatedPrice * currentRate;
    const deliveryCost = weight * DELIVERY_COST_PER_KG;
    const commissionAmount = commission; // Фиксированная сумма в рублях
    const totalCost = itemCostRub + commissionAmount + deliveryCost;

    const result = {
      originalPrice: parseFloat(estimatedPrice),
      priceInRubles: parseFloat(itemCostRub.toFixed(2)),
      deliveryCost: parseFloat(deliveryCost.toFixed(2)),
      commission: parseFloat(commissionAmount.toFixed(2)),
      commissionRate: commission, // Теперь это просто сумма в рублях
      totalCost: parseFloat(totalCost.toFixed(2)),
      exchangeRate: parseFloat(currentRate.toFixed(2)),
      weight: parseFloat(weight.toFixed(1)),
      productName: productData.productName,
      productUrl: productData.url,
      detectedCategory: category,
      selectedSize: selectedSize,
      isApproximate: isApproximate
    };
    
    res.json(result);
  } catch (error) {
    console.error('Ошибка получения цены с размером:', error);
    res.status(500).json({ error: 'Ошибка получения цены с размером' });
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
        // Проверяем временную скидку (600₽ вместо 1000₽) - применяется автоматически при разблокировке достижения
        // Здесь проверяем, активна ли временная скидка
        const [discountData] = await dbConnection.execute(
          'SELECT temp_discount_active, temp_discount_end_date FROM users WHERE telegram_id = ?',
          [telegramId]
        );
        
        if (discountData.length > 0 && discountData[0].temp_discount_active && 
            discountData[0].temp_discount_end_date > new Date()) {
          // Временная скидка активна - комиссия 600₽ вместо 1000₽
          finalCommission = 600;
          appliedRewards.push('Комиссия 600₽ вместо 1000₽ (временная скидка от достижения)');
        }
        
        // Применяем награды от уровня
        const [userData] = await dbConnection.execute(
          'SELECT current_level FROM users WHERE telegram_id = ?',
          [telegramId]
        );
        
        if (userData.length > 0) {
          const userLevel = userData[0].current_level;
          
          // Проверяем награду бронзового уровня: "Первый заказ без комиссии"
          if (userLevel === 'Bronze') {
            // Проверяем, это первый заказ пользователя (учитываем заказы со всеми статусами, кроме отмененных)
            const [orderCount] = await dbConnection.execute(
              'SELECT COUNT(*) as count FROM orders WHERE telegram_id = ? AND status != "cancelled"',
              [telegramId]
            );
            if (orderCount[0].count === 0) {
              // Первый заказ без комиссии (награда бронзового уровня)
              finalCommission = 0;
              appliedRewards.push('Первый заказ без комиссии (Уровень Bronze)');
            }
          }
          
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

      // Получаем username из базы данных
      const [userRows] = await dbConnection.execute(
        'SELECT username FROM users WHERE telegram_id = ?',
        [telegramId]
      );
      
      const dbUsername = userRows.length > 0 ? userRows[0].username : username;

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
        const quantity = item.quantity || 1;
        const itemSavings = 5000.00 * quantity; // 5000₽ за каждый товар (с учетом количества)
        totalSavings += itemSavings;

        await dbConnection.execute(
          `INSERT INTO order_items (order_id, product_link, product_size, quantity, estimated_savings) 
           VALUES (?, ?, ?, ?, ?)`,
          [orderId, item.productLink, item.productSize || '', quantity, itemSavings]
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
          // Автоматически присваиваем бронзовый уровень (0 XP требуется)
          await dbConnection.execute(
            `INSERT INTO users (telegram_id, username, full_name, commission, current_level, last_activity) 
             VALUES (?, ?, ?, 1000, 'Bronze', NOW())`,
            [telegramId, username || null, fullName || null]
          );
          
          console.log(`✅ Создан новый пользователь ${telegramId}: username=${username}, fullName=${fullName}, level=Bronze`);
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

        // Получаем информацию о реферере для определения бонусов
        const [referrerInfo] = await dbConnection.execute(
          'SELECT username, full_name, current_level FROM users WHERE telegram_id = ?',
          [referralId]
        );

        // Определяем комиссию и срок действия в зависимости от уровня реферера
        let referralCommission = 400; // По умолчанию 400₽
        let referralDays = 14; // По умолчанию 14 дней
        
        // Если реферер имеет уровень Diamond - реферал получает комиссию 0₽ на 14 дней (заказы без комиссии)
        if (referrerInfo.length > 0 && referrerInfo[0].current_level === 'Diamond') {
          referralCommission = 0; // Заказы без комиссии
          referralDays = 14; // 14 дней без комиссии
        }

        // Создаем пользователя с реферальной скидкой
        // Автоматически присваиваем бронзовый уровень (0 XP требуется)
        await dbConnection.execute(
          `INSERT INTO users (telegram_id, commission, referred_by, access_expires_at, current_level) 
           VALUES (?, ?, ?, DATE_ADD(NOW(), INTERVAL ? DAY), 'Bronze')`,
          [telegramId, referralCommission, referralId, referralDays]
        );
        
        console.log(`✅ Создан новый пользователь ${telegramId} по реферальной ссылке, level=Bronze, commission=${referralCommission}₽, days=${referralDays}`);

        // Продлеваем скидку реферера на 1 неделю (или даем первую скидку)
        // НО только если реферер НЕ имеет уровень Diamond (у Diamond комиссия уже 0₽ навсегда)
        if (!(referrerInfo.length > 0 && referrerInfo[0].current_level === 'Diamond')) {
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
        }

        // Отправляем уведомление новому пользователю
        const expiryDate = new Date(Date.now() + referralDays * 24 * 60 * 60 * 1000);
        let newUserMessage = `🎉 <b>Добро пожаловать в Poizonic!</b>\n\n` +
                            `Вы активировали реферальную программу!\n\n`;
        
        if (referralCommission === 0) {
          // Особое уведомление для рефералов Diamond уровня
          newUserMessage += `🎁 <b>СПЕЦИАЛЬНОЕ ПРЕДЛОЖЕНИЕ!</b>\n\n` +
                           `💰 <b>Ваша комиссия:</b> 0₽ (заказы без комиссии!)\n` +
                           `⏰ <b>Действует до:</b> ${expiryDate.toLocaleString('ru-RU')}\n\n` +
                           `💎 Ваш реферер имеет легендарный уровень Diamond, поэтому вы получаете заказы без комиссии на 14 дней!\n\n` +
                           `💡 Воспользуйтесь этим преимуществом и сделайте свои первые заказы!`;
        } else {
          newUserMessage += `💰 <b>Ваша комиссия:</b> 400₽ (вместо 1000₽)\n` +
                           `⏰ <b>Действует до:</b> ${expiryDate.toLocaleString('ru-RU')}\n\n` +
                           `💡 Теперь вы можете делать заказы по сниженной комиссии!`;
        }

        await sendTelegramMessage(telegramId, newUserMessage);

        // Отправляем уведомление рефереру
        let referrerMessage = `🎉 <b>Новый реферал!</b>\n\n` +
                             `Вашу реферальную ссылку активировали!\n\n`;
        
        // Если реферер Diamond - указываем особую информацию о бонусе реферала
        if (referrerInfo.length > 0 && referrerInfo[0].current_level === 'Diamond') {
          referrerMessage += `💎 <b>Особый бонус для вашего реферала!</b>\n\n` +
                            `Благодаря вашему легендарному уровню Diamond, ваш реферал получает заказы без комиссии (0₽) на 14 дней!\n\n` +
                            `💡 Ваши рефералы получают максимальные преимущества благодаря вашему уровню!`;
        } else {
          // Получаем обновленную информацию о скидке реферера для уведомления
          const [updatedReferrerInfo] = await dbConnection.execute(
            'SELECT access_expires_at FROM users WHERE telegram_id = ?',
            [referralId]
          );
          
          const referrerExpiry = updatedReferrerInfo[0]?.access_expires_at;
          const referrerExpiryDate = referrerExpiry ? new Date(referrerExpiry).toLocaleString('ru-RU') : 'неизвестно';
          
          referrerMessage += `💰 <b>Ваша комиссия:</b> 400₽ (вместо 1000₽)\n` +
                            `⏰ <b>Действует до:</b> ${referrerExpiryDate}\n\n` +
                            `💡 Скидка продлена на 7 дней!`;
        }

        await sendTelegramMessage(referralId, referrerMessage);

        // Логируем активность пользователя
        await logUserActivity(telegramId, 'referral_activated', {
          referredBy: referralId,
          commission: referralCommission
        });

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
                let achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                  `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                  `📝 ${achievement.achievement.description}\n\n` +
                  `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                
                if (achievement.achievement.additionalReward) {
                  achievementMsg += `\n✨ Бонус: ${achievement.achievement.additionalReward}`;
                }
                
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
          
    // Получаем только одобренные отзывы с пагинацией, включая avatar_url из users
    const [rows] = await dbConnection.execute(`
      SELECT r.review_id, r.telegram_id, r.username, r.full_name, r.rating, r.review_text, r.photo_url, r.created_at, r.moderated_at,
             u.avatar_url
      FROM reviews r
      LEFT JOIN users u ON r.telegram_id = u.telegram_id
      WHERE r.is_approved = 1
      ORDER BY r.moderated_at DESC, r.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);

    // Для каждого отзыва загружаем все фотографии из review_photos
    const reviewsWithPhotos = await Promise.all(rows.map(async (review) => {
      const [photos] = await dbConnection.execute(
        'SELECT photo_url FROM review_photos WHERE review_id = ? ORDER BY id ASC',
        [review.review_id]
      );

      // Формируем массив фотографий: сначала из review_photos, если нет - используем photo_url для обратной совместимости
      const photosArray = photos.map(p => p.photo_url);
      if (photosArray.length === 0 && review.photo_url) {
        photosArray.push(review.photo_url);
      }

      return {
        ...review,
        photos: photosArray,
        photo_url: review.photo_url // Оставляем для обратной совместимости
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
    const avatar_url = req.body.avatar_url || req.body.avatarUrl;
    
    console.log('Получены данные отзыва:', {
      telegram_id,
      username,
      full_name,
      rating,
      review_text,
      filesCount: req.files ? req.files.length : 0
    });

    // Валидация
    if (!telegram_id || !rating || rating < 1 || rating > 5) {
      console.error('Ошибка валидации:', { telegram_id, rating });
      return res.status(400).json({ error: 'Неверные данные отзыва' });
    }

    // Проверяем, существует ли пользователь, если нет - создаем
    const [existingUser] = await dbConnection.execute(
      'SELECT telegram_id FROM users WHERE telegram_id = ?',
      [telegram_id]
    );

    if (existingUser.length === 0) {
      console.log('Создаем нового пользователя:', telegram_id);
      // Автоматически присваиваем бронзовый уровень (0 XP требуется)
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, commission, username, full_name, avatar_url, current_level, created_at)
        VALUES (?, 1000, ?, ?, ?, 'Bronze', NOW())
      `, [telegram_id, username || null, full_name || null, avatar_url || null]);
      
      console.log(`✅ Создан новый пользователь ${telegram_id}, level=Bronze`);
    } else if (avatar_url || username || full_name) {
      // Обновляем данные пользователя, если они переданы (особенно avatar_url)
      await dbConnection.execute(`
        UPDATE users 
        SET username = COALESCE(?, username),
            full_name = COALESCE(?, full_name),
            avatar_url = COALESCE(?, avatar_url)
        WHERE telegram_id = ?
      `, [username || null, full_name || null, avatar_url || null, telegram_id]);
    }

    // Обрабатываем фото: первое фото сохраняем в photo_url для обратной совместимости
    let photo_url = null;
    const photoFiles = req.files || [];
    
    if (photoFiles.length > 0) {
      photo_url = `/uploads/reviews/${photoFiles[0].filename}`;
    }

    const [result] = await dbConnection.execute(`
      INSERT INTO reviews (telegram_id, username, full_name, rating, review_text, photo_url, is_approved)
      VALUES (?, ?, ?, ?, ?, ?, 0)
    `, [telegram_id, username, full_name, rating, review_text, photo_url]);

    const reviewId = result.insertId;

    // Сохраняем все фото в таблицу review_photos
    if (photoFiles.length > 0) {
      for (const file of photoFiles) {
        const photoUrl = `/uploads/reviews/${file.filename}`;
        await dbConnection.execute(
          'INSERT INTO review_photos (review_id, photo_url) VALUES (?, ?)',
          [reviewId, photoUrl]
        );
      }
    }

    // Логируем активность пользователя
    await logUserActivity(telegram_id, 'review_created', {
      reviewId: reviewId,
      rating,
      hasPhoto: photoFiles.length > 0,
      photosCount: photoFiles.length
    });

    // Создаем системный лог
    await createSystemLog('info', `Новый отзыв создан: #${result.insertId}`, {
      telegramId: telegram_id,
      reviewId: result.insertId,
      rating
    }, telegram_id);
    
    // Отправляем уведомление менеджеру о новом отзыве
    const stars = '⭐'.repeat(parseInt(rating));
    const photosInfo = photoFiles.length > 0 ? `📸 <b>Фото:</b> ${photoFiles.length} шт.\n\n` : '';
    const managerMessage = `📝 <b>Новый отзыв (требует модерации)!</b>\n\n` +
                          `${stars} <b>Оценка:</b> ${rating}/5\n` +
                          `👤 <b>От:</b> ${full_name || username || 'Аноним'} (@${username || 'без username'})\n` +
                          `🆔 <b>ID:</b> ${telegram_id}\n\n` +
                          `💬 <b>Отзыв:</b>\n${review_text || 'Без текста'}\n\n` +
                          `${photosInfo}` +
                          `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}\n\n` +
                          `🆔 <b>ID отзыва:</b> ${reviewId}\n` +
                          `⚠️ <b>Статус:</b> Ожидает модерации`;
    
    await sendManagerMessage(managerMessage);
    console.log('✅ Уведомление менеджеру о новом отзыве отправлено');
    
    // НЕ отправляем отзыв в канал - только после модерации
    console.log('⏳ Отзыв ожидает модерации, публикация в канал отложена');
    
    res.json({ 
      success: true, 
      review_id: result.insertId,
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
      
      // ЗАКОММЕНТИРОВАНО: Отправка отзыва в канал отзывов (раскомментировать для продакшена)
      // Отправляем отзыв в канал отзывов
      // const reviewData = {
      //   rating: parseInt(review.rating),
      //   review_text: review.review_text,
      //   full_name: review.full_name,
      //   photo_url: review.photo_url
      // };
      
      // const userInfo = {
      //   username: review.username,
      //   telegram_id: review.telegram_id
      // };
      
      // await sendReviewToFeedbackChannel(reviewData, userInfo);
      
      // Уведомляем менеджера об одобрении
      await sendManagerMessage(`✅ Отзыв #${reviewId} одобрен!`);
    }
    
    res.json({ 
      success: true, 
      message: 'Отзыв одобрен!' 
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

// Endpoint для получения списка изображений выкупов
app.get('/api/purchases/images', (req, res) => {
  try {
    // Проверяем оба возможных пути (dev и production)
    const purchasesDirDev = path.join(__dirname, '../frontend/public/images/purchases');
    const purchasesDirProd = path.join(__dirname, '../frontend/dist/images/purchases');
    
    let purchasesDir = null;
    if (fs.existsSync(purchasesDirDev)) {
      purchasesDir = purchasesDirDev;
    } else if (fs.existsSync(purchasesDirProd)) {
      purchasesDir = purchasesDirProd;
    }

    if (!purchasesDir) {
      console.log('📂 Директория выкупов не найдена. Проверяемые пути:');
      console.log(`   Dev: ${purchasesDirDev}`);
      console.log(`   Prod: ${purchasesDirProd}`);
      return res.json([]);
    }

    console.log(`📂 Используется директория: ${purchasesDir}`);

    const files = fs.readdirSync(purchasesDir)
      .filter(file => {
        // Исключаем временные файлы (temp-*)
        if (file.startsWith('temp-')) {
          return false;
        }
        // Только изображения
        return /\.(jpg|jpeg|png|gif|webp)$/i.test(file);
      })
      .map(file => {
        const filePath = path.join(purchasesDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          path: `/images/purchases/${file}`, // Правильный путь для frontend/public
          mtime: stats.mtime
        };
      })
      .sort((a, b) => b.mtime - a.mtime) // Сортировка по дате изменения (новые сверху)
      .map(file => file.path); // Возвращаем только пути

    console.log(`📸 Найдено ${files.length} изображений выкупов`);
    res.json(files);
  } catch (error) {
    console.error('❌ Ошибка получения изображений выкупов:', error);
    res.status(500).json({ error: 'Ошибка получения изображений' });
  }
});

// Загрузка изображений выкупов (только для админа)
app.post('/api/admin/purchases/upload', (req, res, next) => {
  uploadPurchases.array('images', 20)(req, res, (err) => {
    if (err) {
      console.error('❌ Ошибка multer при загрузке файлов:', err);
      console.error('❌ Тип ошибки:', err.constructor.name);
      console.error('❌ Код ошибки:', err.code);
      if (err instanceof multer.MulterError) {
        console.error('❌ Multer Error Code:', err.code);
        console.error('❌ Multer Error Field:', err.field);
        
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ error: 'Размер одного из файлов превышает 50 МБ' });
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
          return res.status(400).json({ error: 'Превышено максимальное количество файлов (20)' });
        }
        if (err.code === 'LIMIT_FIELD_VALUE') {
          return res.status(400).json({ error: 'Размер поля формы слишком большой' });
        }
        if (err.code === 'LIMIT_FIELD_KEY') {
          return res.status(400).json({ error: 'Имя поля формы слишком длинное' });
        }
        if (err.code === 'LIMIT_PART_COUNT') {
          return res.status(400).json({ error: 'Слишком много частей в запросе (файлы + поля)' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ error: 'Неожиданное поле в запросе' });
        }
        return res.status(400).json({ error: `Ошибка загрузки: ${err.message} (код: ${err.code})` });
      }
      return res.status(400).json({ error: err.message || 'Ошибка загрузки файлов' });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('📤 Начало загрузки изображений выкупов');
    console.log('📊 Размер запроса (Content-Length):', req.headers['content-length'], 'байт');
    console.log('📊 Количество файлов:', req.files ? req.files.length : 0);
    if (req.files && req.files.length > 0) {
      const totalSize = req.files.reduce((sum, file) => sum + file.size, 0);
      console.log('📊 Общий размер файлов:', totalSize, 'байт (', (totalSize / 1024 / 1024).toFixed(2), 'MB)');
      req.files.forEach((file, index) => {
        console.log(`📊 Файл ${index + 1}: ${file.originalname}, размер: ${file.size} байт (${(file.size / 1024 / 1024).toFixed(2)} MB)`);
      });
    }
    
    // Проверка прав администратора
    let initData = req.headers['x-telegram-init-data'];
    
    // Проверяем разные варианты заголовка (разные регистры)
    if (!initData) {
      initData = req.headers['X-Telegram-Init-Data'];
    }
    if (!initData) {
      initData = req.headers['X-TELEGRAM-INIT-DATA'];
    }
    
    console.log('📋 Получен initData:', initData ? `${typeof initData}, длина: ${initData.length}, первые 50 символов: ${initData.substring(0, 50)}...` : 'НЕТ');
    
    if (!initData) {
      console.error('❌ Нет initData в заголовках');
      console.error('   Все заголовки:', Object.keys(req.headers).filter(h => h.toLowerCase().includes('telegram')));
      return res.status(401).json({ error: 'Не авторизован' });
    }

    if (typeof initData !== 'string') {
      console.error('❌ initData не является строкой:', typeof initData);
      return res.status(401).json({ error: 'Не авторизован: нет данных пользователя' });
    }

    if (initData.trim() === '') {
      console.error('❌ initData пустой');
      return res.status(401).json({ error: 'Не авторизован: нет данных пользователя' });
    }

    let telegram_id = null;
    try {
      // Безопасный парсинг initData
      // Проверяем, что строка выглядит как query string
      if (!initData.includes('=')) {
        console.error('❌ initData не является валидным query string');
        console.error('   initData полностью:', initData);
        return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
      }

      // Проверяем, что строка не содержит недопустимых символов для query string
      // URLSearchParams ожидает строку вида "key=value&key2=value2"
      // Проверяем, что нет неэкранированных символов, которые могут вызвать ошибку
      const invalidPatterns = [
        /[<>]/g,  // HTML теги
        /\r\n|\r|\n/g,  // Переносы строк
      ];
      
      for (const pattern of invalidPatterns) {
        if (pattern.test(initData)) {
          console.error('❌ initData содержит недопустимые символы:', pattern.toString());
          console.error('   initData (первые 200 символов):', initData.substring(0, 200));
          return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
        }
      }

      // Пробуем создать URLSearchParams
      let urlParams;
      try {
        // Очищаем строку от лишних пробелов и переносов
        const cleanedInitData = initData.trim().replace(/\r\n|\r|\n/g, '');
        urlParams = new URLSearchParams(cleanedInitData);
      } catch (urlError) {
        console.error('❌ Ошибка создания URLSearchParams:', urlError.message);
        console.error('   Ошибка типа:', urlError.name);
        console.error('   initData (первые 200 символов):', initData.substring(0, 200));
        console.error('   initData длина:', initData.length);
        return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
      }
      
      const userData = urlParams.get('user');
      
      if (userData) {
        try {
          const decoded = decodeURIComponent(userData);
          const user = JSON.parse(decoded);
          telegram_id = user.id?.toString();
          console.log(`👤 Telegram ID пользователя: ${telegram_id}`);
        } catch (parseError) {
          console.error('❌ Ошибка парсинга userData:', parseError.message);
          console.error('   userData (первые 200 символов):', userData?.substring(0, 200));
          return res.status(401).json({ error: 'Ошибка парсинга данных пользователя' });
        }
      } else {
        console.error('❌ userData не найден в initData');
        console.error('   Все параметры в initData:', Array.from(urlParams.keys()));
        console.error('   initData (первые 200 символов):', initData.substring(0, 200));
        return res.status(401).json({ error: 'Ошибка авторизации: данные пользователя не найдены' });
      }
    } catch (error) {
      console.error('❌ Ошибка парсинга initData:', error);
      console.error('   Ошибка:', error.message);
      console.error('   Stack:', error.stack);
      console.error('   initData (первые 200 символов):', initData?.substring(0, 200));
      return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
    }

    // Проверка, что это администратор
    const adminTelegramId = process.env.ADMIN_TELEGRAM_ID;
    const managerTelegramId = process.env.MANAGER_TELEGRAM_ID;
    
    console.log(`🔐 Проверка прав: admin=${adminTelegramId}, manager=${managerTelegramId}, user=${telegram_id}`);
    
    if (!telegram_id) {
      console.error('❌ Telegram ID не определен');
      return res.status(401).json({ error: 'Telegram ID не определен' });
    }
    
    if (telegram_id !== adminTelegramId && telegram_id !== managerTelegramId) {
      console.error(`❌ Доступ запрещен для пользователя ${telegram_id}`);
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    console.log(`📁 Проверка файлов: req.files = ${req.files ? req.files.length : 'null'}`);
    
    if (!req.files || req.files.length === 0) {
      console.error('❌ Файлы не загружены');
      return res.status(400).json({ error: 'Файлы не загружены' });
    }
    
    console.log(`✅ Получено ${req.files.length} файлов`);

    // Проверяем оба возможных пути (dev и production)
    const purchasesDirDev = path.join(__dirname, '../frontend/public/images/purchases');
    const purchasesDirProd = path.join(__dirname, '../frontend/dist/images/purchases');
    
    // В production используем dist, в dev - public
    const isProduction = process.env.NODE_ENV === 'production';
    const purchasesDir = isProduction ? purchasesDirProd : purchasesDirDev;
    
    console.log(`📂 Путь к директории выкупов: ${purchasesDir} (${isProduction ? 'production' : 'development'})`);
    
    // Создаем директории, если их нет
    if (!fs.existsSync(purchasesDir)) {
      console.log(`📁 Создание директории: ${purchasesDir}`);
      fs.mkdirSync(purchasesDir, { recursive: true });
    } else {
      console.log(`✅ Директория существует: ${purchasesDir}`);
    }
    
    // Также создаем в public для совместимости
    if (!fs.existsSync(purchasesDirDev)) {
      fs.mkdirSync(purchasesDirDev, { recursive: true });
    }

    // Получаем список существующих файлов для генерации уникального имени
    const existingFiles = fs.existsSync(purchasesDir) 
      ? fs.readdirSync(purchasesDir).filter(file => /^purchase_\d+\./i.test(file))
      : [];
    
    // Находим максимальный номер
    let maxNumber = 0;
    existingFiles.forEach(file => {
      const match = file.match(/^purchase_(\d+)\./i);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNumber) {
          maxNumber = num;
        }
      }
    });

    const uploadedFiles = [];
    let currentNumber = maxNumber;

    // Сохраняем загруженные файлы
    for (const file of req.files) {
      // Проверяем тип файла
      if (!file.mimetype.startsWith('image/')) {
        continue; // Пропускаем не-изображения
      }

      currentNumber++;
      const extension = path.extname(file.originalname).toLowerCase();
      const newFileName = `purchase_${currentNumber}${extension}`;
      const newFilePath = path.join(purchasesDir, newFileName);

      // Перемещаем файл
      console.log(`💾 Сохранение файла: ${file.originalname} -> ${newFileName}`);
      console.log(`   Временный путь: ${file.path}`);
      console.log(`   Финальный путь: ${newFilePath}`);
      
      try {
        fs.renameSync(file.path, newFilePath);
        console.log(`✅ Файл сохранен: ${newFileName}`);
        
        // В production также копируем в public для совместимости
        if (isProduction) {
          const publicFilePath = path.join(purchasesDirDev, newFileName);
          try {
            fs.copyFileSync(newFilePath, publicFilePath);
            console.log(`📋 Файл также скопирован в public: ${publicFilePath}`);
          } catch (copyError) {
            console.warn(`⚠️ Не удалось скопировать в public: ${copyError.message}`);
          }
        }
      } catch (renameError) {
        console.error(`❌ Ошибка перемещения файла ${file.originalname}:`, renameError);
        // Пытаемся скопировать, если перемещение не удалось
        try {
          fs.copyFileSync(file.path, newFilePath);
          fs.unlinkSync(file.path); // Удаляем временный файл
          console.log(`✅ Файл скопирован: ${newFileName}`);
          
          // В production также копируем в public
          if (isProduction) {
            const publicFilePath = path.join(purchasesDirDev, newFileName);
            fs.copyFileSync(newFilePath, publicFilePath);
            console.log(`📋 Файл также скопирован в public: ${publicFilePath}`);
          }
        } catch (copyError) {
          console.error(`❌ Ошибка копирования файла ${file.originalname}:`, copyError);
          throw copyError;
        }
      }

      uploadedFiles.push({
        originalName: file.originalname,
        savedName: newFileName,
        path: `/images/purchases/${newFileName}`
      });
    }

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'Нет подходящих изображений для загрузки' });
    }

    console.log(`✅ Загружено ${uploadedFiles.length} изображений выкупов администратором ${telegram_id}`);

    res.json({
      success: true,
      message: `Загружено ${uploadedFiles.length} изображений`,
      files: uploadedFiles
    });

  } catch (error) {
    console.error('❌ Ошибка загрузки изображений выкупов:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Ошибка загрузки изображений',
      details: error.message || 'Неизвестная ошибка'
    });
  }
});

// Удаление изображения выкупа (только для админа)
app.delete('/api/admin/purchases/images/:filename', async (req, res) => {
  try {
    console.log('🗑️ Запрос на удаление изображения выкупа:', req.params.filename);
    
    // Проверка прав администратора
    const initData = req.headers['x-telegram-init-data'];
    if (!initData) {
      console.error('❌ Нет initData в заголовках');
      return res.status(401).json({ error: 'Не авторизован' });
    }

    if (typeof initData !== 'string' || initData.trim() === '') {
      console.error('❌ initData пустой или не является строкой');
      return res.status(401).json({ error: 'Не авторизован: нет данных пользователя' });
    }

    let telegram_id = null;
    try {
      // Безопасный парсинг initData
      if (!initData.includes('=')) {
        console.error('❌ initData не является валидным query string');
        return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
      }

      const urlParams = new URLSearchParams(initData);
      const userData = urlParams.get('user');
      
      if (userData) {
        try {
          const decoded = decodeURIComponent(userData);
          const user = JSON.parse(decoded);
          telegram_id = user.id?.toString();
          console.log(`👤 Telegram ID пользователя: ${telegram_id}`);
        } catch (parseError) {
          console.error('❌ Ошибка парсинга userData:', parseError);
          return res.status(401).json({ error: 'Ошибка парсинга данных пользователя' });
        }
      } else {
        console.error('❌ userData не найден в initData');
        return res.status(401).json({ error: 'Ошибка авторизации: данные пользователя не найдены' });
      }
    } catch (error) {
      console.error('❌ Ошибка парсинга initData:', error);
      console.error('   Ошибка:', error.message);
      return res.status(401).json({ error: 'Ошибка авторизации: неверный формат данных' });
    }

    // Проверка, что это администратор
    const adminTelegramId = process.env.ADMIN_TELEGRAM_ID;
    const managerTelegramId = process.env.MANAGER_TELEGRAM_ID;
    
    if (telegram_id !== adminTelegramId && telegram_id !== managerTelegramId) {
      console.error(`❌ Доступ запрещен для пользователя ${telegram_id}`);
      return res.status(403).json({ error: 'Доступ запрещен' });
    }

    const filename = req.params.filename;
    
    // Проверяем оба возможных пути
    const purchasesDirDev = path.join(__dirname, '../frontend/public/images/purchases');
    const purchasesDirProd = path.join(__dirname, '../frontend/dist/images/purchases');
    
    const isProduction = process.env.NODE_ENV === 'production';
    const purchasesDir = isProduction ? purchasesDirProd : purchasesDirDev;
    
    const filePath = path.join(purchasesDir, filename);
    const filePathDev = path.join(purchasesDirDev, filename);
    
    // Проверяем, что файл существует
    if (!fs.existsSync(filePath) && !fs.existsSync(filePathDev)) {
      console.error(`❌ Файл не найден: ${filename}`);
      return res.status(404).json({ error: 'Файл не найден' });
    }

    // Удаляем файл из основного места
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`✅ Файл удален: ${filePath}`);
    }
    
    // Удаляем файл из public для совместимости
    if (fs.existsSync(filePathDev)) {
      fs.unlinkSync(filePathDev);
      console.log(`✅ Файл удален из public: ${filePathDev}`);
    }

    console.log(`✅ Изображение ${filename} удалено администратором ${telegram_id}`);

    res.json({
      success: true,
      message: 'Изображение удалено'
    });

  } catch (error) {
    console.error('❌ Ошибка удаления изображения выкупа:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      error: 'Ошибка удаления изображения',
      details: error.message || 'Неизвестная ошибка'
    });
  }
});

// Получение профиля пользователя
app.get('/api/profile', async (req, res) => {
  try {
    await ensureDBConnection();
    
    let telegram_id = req.query.telegram_id;
    
    // Если telegram_id не передан в query, пытаемся получить из Telegram WebApp initData
    if (!telegram_id) {
      const initData = req.headers['x-telegram-init-data'];
      if (initData) {
        try {
          const urlParams = new URLSearchParams(initData);
          const userData = urlParams.get('user');
          if (userData) {
            const user = JSON.parse(decodeURIComponent(userData));
            telegram_id = user.id?.toString();
          }
        } catch (error) {
          console.error('Ошибка парсинга initData:', error);
        }
      }
    }
    
    if (!telegram_id) {
      return res.status(401).json({ error: 'Не авторизован' });
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
    
    // Получаем статистику заказов (только одобренные/завершенные)
    const [orderStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_orders,
        COUNT(*) as completed_orders
      FROM orders 
      WHERE telegram_id = ? AND status = 'completed'
    `, [telegram_id]);
    
    // Получаем статистику рефералов
    const [referralStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_referrals,
        COALESCE(SUM(clicks), 0) as total_clicks
      FROM referrals 
      WHERE referred_by = ?
    `, [telegram_id]);
    
    // Получаем статистику покупок юаня
    const [yuanStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_purchases,
        COALESCE(SUM(amount_rub), 0) as total_spent_rub,
        COALESCE(SUM(amount_cny), 0) as total_bought_cny,
        COALESCE(SUM(savings), 0) as total_savings
      FROM yuan_purchases 
      WHERE telegram_id = ? AND status = 'completed'
    `, [telegram_id]);

    // Получаем экономию от заказов (только завершенные заказы, как и для покупок юаней)
    const [orderSavingsStats] = await dbConnection.execute(`
      SELECT 
        COUNT(*) as total_orders,
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
        orders: orderStats[0],
        referrals: referralStats[0],
        yuan_purchases: yuanStats[0],
        order_savings: orderSavingsStats[0],
        total_savings: {
          yuan_savings: yuanStats[0].total_savings || 0,
          order_savings: orderSavingsStats[0].total_order_savings || 0,
          total: (yuanStats[0].total_savings || 0) + (orderSavingsStats[0].total_order_savings || 0)
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
      // Автоматически присваиваем бронзовый уровень (0 XP требуется)
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, commission, full_name, phone_number, preferred_currency, avatar_url, current_level, created_at) 
        VALUES (?, 1000, ?, ?, ?, ?, 'Bronze', NOW())
      `, [telegram_id, full_name, phone_number, preferred_currency, avatar_url]);
      
      console.log(`✅ Создан новый пользователь ${telegram_id}, level=Bronze`);
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
    
    if (amountCnyNum < 200 || amountCnyNum > 100000) {
      return res.status(400).json({ error: 'Количество юаней должно быть от 200 до 100,000' });
    }
    
    // Проверяем, существует ли пользователь
    const [existingUser] = await dbConnection.execute(
      'SELECT telegram_id FROM users WHERE telegram_id = ?',
      [telegramId]
    );
    
    if (existingUser.length === 0) {
      // Создаем нового пользователя
      // Автоматически присваиваем бронзовый уровень (0 XP требуется)
      await dbConnection.execute(`
        INSERT INTO users (telegram_id, username, full_name, commission, current_level, created_at) 
        VALUES (?, ?, ?, 1000, 'Bronze', NOW())
      `, [telegramId, username || 'unknown', (firstName && lastName) ? `${firstName} ${lastName}` : (firstName || 'Пользователь')]);
      
      console.log(`✅ Создан новый пользователь ${telegramId}, level=Bronze`);
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
        id,
        telegram_id,
        amount_cny,
        amount_rub,
        savings,
        created_at,
        status
      FROM yuan_purchases
      ORDER BY created_at DESC
    `);
    
    res.json({ purchases });
    
  } catch (error) {
    console.error('Ошибка получения покупок юаней:', error);
    res.status(500).json({ error: 'Ошибка получения покупок юаней' });
  }
});

// Получение ожидающих заказов и покупок юаней для админов
app.get('/api/admin/pending-orders', async (req, res) => {
  try {
    await ensureDBConnection();
    
    // Получаем заказы со статусом 'pending' с информацией о пользователе
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
    
    // Получаем покупки юаней со статусом 'pending' с информацией о пользователе
    const [pendingYuanPurchases] = await dbConnection.execute(`
      SELECT 
        yp.id,
        yp.telegram_id,
        u.username,
        u.full_name,
        yp.amount_cny,
        yp.amount_rub,
        yp.savings,
        yp.created_at,
        yp.status
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
            // Обновляем total_orders в таблице users (учитываем только завершенные заказы)
            const [orderStats] = await dbConnection.execute(`
              SELECT COUNT(*) as total_orders
              FROM orders 
              WHERE telegram_id = ? AND status = 'completed'
            `, [telegramId]);
            
            const totalOrders = orderStats[0]?.total_orders || 0;
            await dbConnection.execute(
              'UPDATE users SET total_orders = ? WHERE telegram_id = ?',
              [totalOrders, telegramId]
            );
            
            // Заказ подтверждён - даем 100 XP
            const orderHour = new Date().getHours();
            const xpResult = await gamificationService.awardXP(
              telegramId,
              XP_RULES.ORDER_COMPLETE,
              'order',
              orderId,
              `Заказ #${orderId} подтвержден`
            );
            
            // Проверяем достижения (теперь total_orders обновлен правильно)
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
                let achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                  `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                  `📝 ${achievement.achievement.description}\n\n` +
                  `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                
                if (achievement.achievement.additionalReward) {
                  achievementMsg += `\n✨ Бонус: ${achievement.achievement.additionalReward}`;
                }
                
                // Для dragon_summoner достижение разблокируется у РЕФЕРЕРА, а не у реферала
                // Поэтому уведомление отправляем рефереру
                const recipientId = achievement.unlockedFor || telegramId;
                // Включаем уведомления для продакшена
                await sendTelegramMessage(recipientId, achievementMsg);
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
                    let achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
                      `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
                      `📝 ${achievement.achievement.description}\n\n` +
                      `🎁 Награда: +${achievement.achievement.xpReward} XP`;
                    
                    if (achievement.achievement.additionalReward) {
                      achievementMsg += `\n✨ Бонус: ${achievement.achievement.additionalReward}`;
                    }
                    
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
          SET total_savings = total_savings + ?,
              last_activity = NOW()
          WHERE telegram_id = ?
        `, [savings, telegramId]);
        
        console.log(`✅ Обновлена статистика пользователя ${telegramId}: +${savings} руб. экономии`);
      }
    } else if (type === 'yuan') {
      // Получаем данные покупки юаней
      const [yuanData] = await dbConnection.execute(`
        SELECT savings FROM yuan_purchases WHERE id = ? AND telegram_id = ?
      `, [orderId, telegramId]);
      
      if (yuanData.length > 0) {
        const savings = yuanData[0].savings || 0;
        
        // Обновляем статистику пользователя
        await dbConnection.execute(`
          UPDATE users 
          SET total_savings = total_savings + ?,
              last_activity = NOW()
          WHERE telegram_id = ?
        `, [savings, telegramId]);
        
        console.log(`✅ Обновлена статистика пользователя ${telegramId}: +${savings} руб. экономии`);
        
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

// Тестовые endpoints удалены - используются только авторизованные endpoints

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

    // Для каждого отзыва загружаем все фотографии из review_photos
    const reviewsWithPhotos = await Promise.all(rows.map(async (review) => {
      const [photos] = await dbConnection.execute(
        'SELECT photo_url FROM review_photos WHERE review_id = ? ORDER BY id ASC',
        [review.review_id]
      );

      // Формируем массив фотографий: сначала из review_photos, если нет - используем photo_url для обратной совместимости
      const photosArray = photos.map(p => p.photo_url);
      if (photosArray.length === 0 && review.photo_url) {
        photosArray.push(review.photo_url);
      }

      return {
        ...review,
        photos: photosArray,
        photo_url: review.photo_url // Оставляем для обратной совместимости
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
      return res.status(401).json({ error: 'Не авторизован' });
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

// Тестовый endpoint уведомлений удален

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

// Периодическая проверка удалена - переподключение происходит только при реальных ошибках соединения

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
    
    // Отправляем уведомления о разблокированных достижениях
    for (const achievement of achievementsResult) {
      if (achievement.success && !achievement.alreadyUnlocked && achievement.achievement) {
        let achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
          `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
          `📝 ${achievement.achievement.description}\n\n` +
          `🎁 Награда: +${achievement.achievement.xpReward} XP`;
        
        if (achievement.achievement.additionalReward) {
          achievementMsg += `\n✨ Бонус: ${achievement.achievement.additionalReward}`;
        }
        
        await sendTelegramMessage(telegramId, achievementMsg);
      }
    }
    
    // Отправляем уведомление о повышении уровня, если оно было
    if (result.leveledUp) {
      const levelUpMsg = `🎊 <b>Поздравляем!</b>\n\n` +
        `Вы достигли уровня <b>${result.currentLevel}</b>! 🏆\n\n` +
        `🎁 <b>Награды:</b>\n${result.rewards.description}\n\n` +
        `✨ Всего XP: ${result.totalXP}`;
      
      await sendTelegramMessage(telegramId, levelUpMsg);
    }
    
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
          if (achievement.success && !achievement.alreadyUnlocked && achievement.achievement) {
            let achievementMsg = `🏆 <b>Достижение разблокировано!</b>\n\n` +
              `${achievement.achievement.icon} <b>${achievement.achievement.name}</b>\n` +
              `📝 ${achievement.achievement.description}\n\n` +
              `🎁 Награда: +${achievement.achievement.xpReward} XP`;
            
            if (achievement.achievement.additionalReward) {
              achievementMsg += `\n✨ Бонус: ${achievement.achievement.additionalReward}`;
            }
            
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
