#!/bin/bash
# Деплой ВКР Mini App (второе приложение на сервере)
# Путь на сервере: /var/www/vkr-mini-app

set -e
echo "🚀 Деплой VKR Mini App..."
echo ""

cd /var/www/vkr-mini-app || exit 1

echo "📥 Обновление кода из Git..."
git pull origin main
echo "✅ Код обновлён"
echo ""

echo "📦 Сборка frontend..."
cd frontend && npm run build
cd ..
echo "✅ Frontend собран"
echo ""

echo "🔄 Перезапуск backend..."
pm2 restart vkr-backend 2>/dev/null || pm2 start ecosystem.config.js
echo "✅ Backend перезапущен"
echo ""

echo "📊 Статус:"
pm2 status
echo ""
echo "✅ Деплой завершён."
