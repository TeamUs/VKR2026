#!/bin/bash

echo "=========================================="
echo "🚀 БЫСТРОЕ ПРИМЕНЕНИЕ --base=./ ИСПРАВЛЕНИЯ"
echo "=========================================="
echo ""

cd /var/www/poizonic-mini-app || exit 1

echo "📥 Шаг 1: Обновление кода с GitHub..."
git pull origin main

echo ""
echo "✅ Шаг 2: Проверка изменения в package.json..."
cd frontend
if grep -q "vite build --base=./" package.json; then
    echo "✅ Параметр --base=./ найден в package.json"
else
    echo "❌ ОШИБКА: Параметр --base=./ не найден!"
    echo "Проверьте package.json вручную"
    exit 1
fi

echo ""
echo "🧹 Шаг 3: Очистка старых файлов сборки..."
rm -rf dist .vite node_modules/.vite
echo "✅ Очистка завершена"

echo ""
echo "🔨 Шаг 4: Пересборка проекта с --base=./..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Сборка успешно завершена!"
else
    echo "❌ ОШИБКА при сборке!"
    exit 1
fi

echo ""
echo "🔍 Шаг 5: Проверка путей в index.html..."
if grep -q 'href="./assets/' dist/index.html; then
    echo "✅ Пути относительные (./assets/) - правильно!"
elif grep -q 'href="/assets/' dist/index.html; then
    echo "⚠️  ВНИМАНИЕ: Пути абсолютные (/assets/) - проверьте конфигурацию!"
else
    echo "⚠️  Не удалось определить тип путей"
fi

echo ""
echo "🔐 Шаг 6: Исправление прав доступа..."
sudo chown -R www-data:www-data /var/www/poizonic-mini-app/frontend/dist
sudo chmod -R 755 /var/www/poizonic-mini-app/frontend/dist
echo "✅ Права доступа установлены"

echo ""
echo "🔄 Шаг 7: Перезагрузка Nginx..."
sudo systemctl reload nginx
echo "✅ Nginx перезагружен"

echo ""
echo "=========================================="
echo "✅ ВСЕ ШАГИ ЗАВЕРШЕНЫ!"
echo "=========================================="
echo ""
echo "📋 Следующие шаги:"
echo "1. Откройте сайт в браузере"
echo "2. Сделайте Hard Refresh (Ctrl+Shift+R)"
echo "3. Проверьте консоль браузера (F12)"
echo "4. Проверьте, что стили применяются"
echo ""
echo "🔍 Для проверки путей выполните:"
echo "   cd /var/www/poizonic-mini-app/frontend/dist"
echo "   grep -oP '(href|src)=\"[^\"]*\"' index.html | head -5"

