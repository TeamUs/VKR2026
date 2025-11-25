const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');
const path = require('path');

const app = express();
const PORT = process.env.DEPLOY_WEBHOOK_PORT || 9000;
const SECRET = process.env.DEPLOY_WEBHOOK_SECRET || 'your-secret-key-change-me';

// Middleware для парсинга JSON
app.use(express.json());

// Функция для выполнения команд
function execCommand(command, cwd) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        reject(error);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      console.log(`Stdout: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Функция для проверки подписи (если используется)
function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

// Маршрут для получения webhook от GitHub
app.post('/deploy', async (req, res) => {
  try {
    // Проверка секрета (опционально, если используется)
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (token !== SECRET) {
        console.error('❌ Неверный секретный ключ');
        return res.status(401).json({ error: 'Unauthorized' });
      }
    }

    console.log('🚀 Начало автоматического деплоя...');
    
    const projectPath = process.env.PROJECT_PATH || '/var/www/poizonic-mini-app/poizonic-mini-app_reserve_copy';
    
    // Шаг 1: Получение последних изменений
    console.log('📥 Получение последних изменений из Git...');
    await execCommand('git fetch origin', projectPath);
    await execCommand('git pull origin main', projectPath);
    
    // Шаг 2: Обновление зависимостей Backend
    console.log('📦 Обновление зависимостей Backend...');
    await execCommand('npm ci --production', path.join(projectPath, 'backend'));
    
    // Шаг 3: Обновление зависимостей Frontend
    console.log('📦 Обновление зависимостей Frontend...');
    await execCommand('npm ci', path.join(projectPath, 'frontend'));
    
    // Шаг 4: Сборка Frontend
    console.log('🏗️  Сборка Frontend...');
    await execCommand('npm run build', path.join(projectPath, 'frontend'));
    
    // Шаг 5: Перезапуск Backend
    console.log('🔄 Перезапуск Backend...');
    await execCommand('pm2 restart poizonic-backend || pm2 start ecosystem.config.js', projectPath);
    
    // Шаг 6: Перезагрузка Nginx
    console.log('🔄 Перезагрузка Nginx...');
    await execCommand('sudo systemctl reload nginx', projectPath);
    
    console.log('✅ Деплой завершен успешно!');
    
    res.json({ 
      success: true, 
      message: 'Деплой выполнен успешно',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Ошибка во время деплоя:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'deploy-webhook' });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Webhook сервер запущен на порту ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/deploy`);
});

