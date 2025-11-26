#!/bin/bash

# Скрипт для автоматического деплоя
# Обновляет код, собирает frontend, перезапускает backend

echo "🚀 Деплой Poizonic Mini App..."
echo ""

cd /var/www/poizonic-mini-app || exit 1

# 1. Обновление кода
echo "📥 Обновление кода из Git..."
git pull origin main

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при обновлении кода!"
    exit 1
fi

echo "✅ Код обновлен"
echo ""

# 2. Сборка frontend
echo "📦 Сборка frontend..."
cd frontend

npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка сборки frontend!"
    exit 1
fi

echo "✅ Frontend собран"
echo ""

cd ..

# 3. Перезапуск backend через PM2
echo "🔄 Перезапуск backend..."
pm2 restart poizonic-backend

if [ $? -ne 0 ]; then
    echo "⚠️  Backend не был запущен, запускаем..."
    pm2 start ecosystem.config.js
fi

echo "✅ Backend перезапущен"
echo ""

# 4. Показываем статус
echo "📊 Статус процессов:"
pm2 status

echo ""
echo "✅ Деплой завершен успешно!"
