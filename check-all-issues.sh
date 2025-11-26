#!/bin/bash

echo "=========================================="
echo "🔍 ПРОВЕРКА ВСЕХ ТРЕХ ПРОБЛЕМ"
echo "=========================================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

cd /var/www/poizonic-mini-app || exit 1

echo "══════════════════════════════════════════"
echo "1️⃣  ПРОВЕРКА: SECRET_KEY в .env"
echo "══════════════════════════════════════════"
echo ""

if [ -f backend/.env ]; then
    echo "${GREEN}✅ backend/.env существует${NC}"
    if grep -q "JWT_SECRET\|SECRET_KEY" backend/.env 2>/dev/null; then
        echo "${YELLOW}⚠️  SECRET_KEY/JWT_SECRET найден в .env${NC}"
        echo "Это используется только в backend, не влияет на frontend стили"
    else
        echo "${YELLOW}⚠️  SECRET_KEY/JWT_SECRET НЕ найден в .env${NC}"
    fi
else
    echo "${RED}❌ backend/.env не существует${NC}"
fi

echo ""
echo "══════════════════════════════════════════"
echo "2️⃣  ПРОВЕРКА: requirements.txt (Python файл)"
echo "══════════════════════════════════════════"
echo ""

if [ -f requirements.txt ]; then
    echo "${YELLOW}⚠️  requirements.txt найден${NC}"
    echo "Это Python файл (aiogram, selenium и т.д.)"
    echo "Проверка: используется ли pip install?"
    
    if command -v pip >/dev/null 2>&1; then
        echo "pip установлен: ${GREEN}✅${NC}"
        echo "Проверка установленных Python пакетов:"
        pip list 2>/dev/null | grep -i "aiogram\|selenium" | head -3 || echo "  Нет aiogram/selenium пакетов"
    else
        echo "pip НЕ установлен: ${GREEN}✅ (это нормально для Node.js проекта)${NC}"
    fi
    
    echo ""
    echo "${YELLOW}⚠️  РЕКОМЕНДАЦИЯ:${NC}"
    echo "  requirements.txt - это Python зависимости"
    echo "  Для Node.js проекта используйте только npm install"
    echo "  Убедитесь, что на сервере НЕ запускается pip install"
else
    echo "${GREEN}✅ requirements.txt не найден (это нормально)${NC}"
fi

echo ""
echo "══════════════════════════════════════════"
echo "3️⃣  ПРОВЕРКА: Windows vs Ubuntu различия"
echo "══════════════════════════════════════════"
echo ""

echo "3.1. Версии Node.js и npm:"
echo "  Node.js: $(node -v 2>/dev/null || echo 'НЕ УСТАНОВЛЕН')"
echo "  npm: $(npm -v 2>/dev/null || echo 'НЕ УСТАНОВЛЕН')"
echo ""

echo "3.2. Проверка файла Music Warrior.ttf (с пробелом):"
cd frontend 2>/dev/null || exit 1

if [ -f "public/Music Warrior.ttf" ]; then
    echo "  ${GREEN}✅ public/Music Warrior.ttf существует${NC}"
    ls -lh "public/Music Warrior.ttf"
else
    echo "  ${RED}❌ public/Music Warrior.ttf НЕ найден${NC}"
fi

if [ -f "dist/Music Warrior.ttf" ]; then
    echo "  ${GREEN}✅ dist/Music Warrior.ttf существует${NC}"
    ls -lh "dist/Music Warrior.ttf"
else
    echo "  ${YELLOW}⚠️  dist/Music Warrior.ttf НЕ найден${NC}"
    echo "  Это может быть проблемой - файл должен быть в dist после сборки"
fi

echo ""
echo "3.3. Проверка зависимостей:"
if [ -f package.json ]; then
    echo "  Версия styled-components в package.json:"
    grep '"styled-components"' package.json
    echo ""
    
    if [ -d node_modules/styled-components ]; then
        echo "  Установленная версия styled-components:"
        npm list styled-components 2>/dev/null | grep styled-components | head -1
    else
        echo "  ${RED}❌ styled-components не установлен!${NC}"
    fi
fi

echo ""
echo "3.4. Проверка прав доступа:"
if [ -d dist ]; then
    echo "  Права на dist/:"
    ls -ld dist/
    echo "  Права на dist/assets/ (если существует):"
    [ -d dist/assets ] && ls -ld dist/assets/ || echo "  dist/assets не существует"
    echo ""
    
    echo "  Права на node_modules/.bin/ (если существует):"
    [ -d node_modules/.bin ] && ls -ld node_modules/.bin/ || echo "  node_modules/.bin не существует"
fi

echo ""
echo "3.5. Проверка package-lock.json:"
if [ -f package-lock.json ]; then
    echo "  ${GREEN}✅ package-lock.json существует${NC}"
    echo "  Размер: $(du -h package-lock.json | cut -f1)"
    echo "  Дата изменения: $(stat -c %y package-lock.json 2>/dev/null || stat -f %Sm package-lock.json 2>/dev/null || echo 'неизвестно')"
else
    echo "  ${YELLOW}⚠️  package-lock.json НЕ существует${NC}"
    echo "  Рекомендуется использовать npm ci для установки"
fi

echo ""
echo "3.6. Проверка собранных файлов:"
if [ -d dist ]; then
    echo "  Размер dist/: $(du -sh dist/ | cut -f1)"
    echo "  Количество файлов: $(find dist -type f | wc -l)"
    echo ""
    
    if [ -f dist/index.html ]; then
        echo "  ${GREEN}✅ dist/index.html существует${NC}"
        echo "  Проверка подключения стилей:"
        grep -i "style\|link.*css" dist/index.html | head -3
    else
        echo "  ${RED}❌ dist/index.html НЕ существует${NC}"
    fi
    
    if [ -d dist/assets ]; then
        echo ""
        echo "  Файлы в dist/assets/:"
        ls -lh dist/assets/ | head -5
        echo ""
        
        echo "  Поиск styled-components в JS файлах:"
        find dist/assets -name "*.js" -type f -exec grep -l "styled-components" {} \; | head -3 || echo "    styled-components не найден в JS файлах"
    else
        echo "  ${RED}❌ dist/assets/ НЕ существует${NC}"
    fi
else
    echo "  ${RED}❌ dist/ не существует - проект не собран!${NC}"
fi

echo ""
echo "3.7. Проверка кеша Vite:"
if [ -d .vite ] || [ -d node_modules/.vite ]; then
    echo "  ${YELLOW}⚠️  Найден кеш Vite${NC}"
    [ -d .vite ] && echo "    .vite/ существует"
    [ -d node_modules/.vite ] && echo "    node_modules/.vite/ существует"
    echo "  Рекомендуется удалить перед пересборкой"
else
    echo "  ${GREEN}✅ Кеш Vite не найден (это нормально)${NC}"
fi

echo ""
echo "══════════════════════════════════════════"
echo "📋 ИТОГОВЫЕ РЕКОМЕНДАЦИИ"
echo "══════════════════════════════════════════"
echo ""

echo "1. ${GREEN}SECRET_KEY${NC}: Не влияет на стили (используется только в backend)"
echo ""
echo "2. ${YELLOW}requirements.txt${NC}: Убедиться, что не используется pip install"
echo ""
echo "3. ${RED}Windows/Ubuntu различия${NC}: Основная вероятная причина!"
echo "   - Проверить версии Node.js (должны совпадать с локальной)"
echo "   - Пересобрать с npm ci"
echo "   - Проверить файл Music Warrior.ttf"
echo "   - Исправить права доступа"
echo "   - Очистить кеш Vite"

echo ""
echo "=========================================="
echo "✅ ПРОВЕРКА ЗАВЕРШЕНА"
echo "=========================================="

