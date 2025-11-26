#!/bin/bash

echo "=========================================="
echo "🔧 ИСПРАВЛЕНИЕ КОНФЛИКТА GIT"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd /var/www/poizonic-mini-app || exit 1

echo "📂 Текущая директория: $(pwd)"
echo ""

echo "🧹 Шаг 1: Удаление node_modules..."
rm -rf frontend/node_modules backend/node_modules
echo "${GREEN}✅ node_modules удалены${NC}"
echo ""

echo "🔄 Шаг 2: Сброс всех локальных изменений..."
git reset --hard HEAD
echo "${GREEN}✅ Локальные изменения отменены${NC}"
echo ""

echo "🧽 Шаг 3: Очистка неотслеживаемых файлов..."
git clean -fd
echo "${GREEN}✅ Неотслеживаемые файлы удалены${NC}"
echo ""

echo "📥 Шаг 4: Обновление кода с GitHub..."
git pull origin main

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Код успешно обновлен!${NC}"
else
    echo "${RED}❌ ОШИБКА при обновлении кода!${NC}"
    exit 1
fi
echo ""

echo "📦 Шаг 5: Проверка изменений в package.json..."
cd frontend
if grep -q "vite build --base=./" package.json; then
    echo "${GREEN}✅ Параметр --base=./ найден в package.json${NC}"
else
    echo "${YELLOW}⚠️  Параметр --base=./ НЕ найден${NC}"
fi

if grep -q "base: './'" vite.config.ts; then
    echo "${GREEN}✅ Параметр base: './' найден в vite.config.ts${NC}"
else
    echo "${YELLOW}⚠️  Параметр base: './' НЕ найден${NC}"
fi
echo ""

echo "📥 Шаг 6: Установка зависимостей..."
npm ci

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Зависимости установлены!${NC}"
else
    echo "${RED}❌ ОШИБКА при установке зависимостей!${NC}"
    exit 1
fi
echo ""

echo "🔨 Шаг 7: Пересборка проекта..."
rm -rf dist .vite node_modules/.vite
npm run build

if [ $? -eq 0 ]; then
    echo "${GREEN}✅ Проект успешно собран!${NC}"
else
    echo "${RED}❌ ОШИБКА при сборке!${NC}"
    exit 1
fi
echo ""

echo "🔍 Шаг 8: Проверка путей в index.html..."
if [ -f dist/index.html ]; then
    if grep -q 'href="./assets/' dist/index.html; then
        echo "${GREEN}✅ Пути относительные (./assets/) - правильно!${NC}"
    else
        echo "${YELLOW}⚠️  Пути могут быть не относительными${NC}"
    fi
else
    echo "${RED}❌ dist/index.html не найден!${NC}"
fi
echo ""

echo "🔐 Шаг 9: Исправление прав доступа..."
sudo chown -R www-data:www-data /var/www/poizonic-mini-app/frontend/dist
sudo chmod -R 755 /var/www/poizonic-mini-app/frontend/dist
echo "${GREEN}✅ Права доступа установлены${NC}"
echo ""

echo "🔄 Шаг 10: Перезагрузка Nginx..."
sudo systemctl reload nginx
echo "${GREEN}✅ Nginx перезагружен${NC}"
echo ""

echo "=========================================="
echo "${GREEN}✅ ВСЕ ШАГИ ЗАВЕРШЕНЫ УСПЕШНО!${NC}"
echo "=========================================="
echo ""
echo "📋 Следующие шаги:"
echo "1. Откройте сайт в браузере"
echo "2. Сделайте Hard Refresh (Ctrl+Shift+R)"
echo "3. Проверьте консоль браузера (F12)"
echo "4. Проверьте, что стили применяются"
echo ""

