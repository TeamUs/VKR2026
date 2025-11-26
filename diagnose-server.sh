#!/bin/bash

echo "=========================================="
echo "🔍 ДИАГНОСТИКА СЕРВЕРА POIZONIC"
echo "=========================================="
echo ""

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "📋 1. ВЕРСИИ СИСТЕМЫ"
echo "----------------------------------------"
echo -n "Node.js: "
node -v || echo "${RED}❌ Node.js не установлен${NC}"
echo -n "npm: "
npm -v || echo "${RED}❌ npm не установлен${NC}"
echo -n "OS: "
uname -a
echo ""

echo "📦 2. ПРОВЕРКА ПРОЕКТА"
echo "----------------------------------------"
cd /var/www/poizonic-mini-app || exit 1

echo "Текущая директория: $(pwd)"
echo "Ветка Git: $(git branch --show-current 2>/dev/null || echo 'не git репозиторий')"
echo "Последний коммит: $(git log -1 --oneline 2>/dev/null || echo 'нет коммитов')"
echo ""

echo "📁 3. СТРУКТУРА ФАЙЛОВ"
echo "----------------------------------------"
echo "Frontend существует: $([ -d frontend ] && echo "${GREEN}✅${NC}" || echo "${RED}❌${NC}")"
echo "Backend существует: $([ -d backend ] && echo "${GREEN}✅${NC}" || echo "${RED}❌${NC}")"
echo "Frontend/dist существует: $([ -d frontend/dist ] && echo "${GREEN}✅${NC}" || echo "${RED}❌${NC}")"
echo ""

if [ -d frontend/dist ]; then
    echo "Размер frontend/dist: $(du -sh frontend/dist | cut -f1)"
    echo "Количество файлов в dist: $(find frontend/dist -type f | wc -l)"
    echo ""
fi

echo "🔧 4. ЗАВИСИМОСТИ FRONTEND"
echo "----------------------------------------"
if [ -d frontend ]; then
    cd frontend
    
    if [ -f package.json ]; then
        echo "package.json существует: ${GREEN}✅${NC}"
        echo "Версия styled-components в package.json:"
        grep -A 2 '"styled-components"' package.json | grep version || grep '"styled-components"' package.json
        echo ""
        
        if [ -d node_modules ]; then
            echo "node_modules существует: ${GREEN}✅${NC}"
            echo "Размер node_modules: $(du -sh node_modules | cut -f1)"
            
            if [ -d node_modules/styled-components ]; then
                echo "styled-components установлен: ${GREEN}✅${NC}"
                echo "Версия styled-components:"
                if [ -f node_modules/styled-components/package.json ]; then
                    grep '"version"' node_modules/styled-components/package.json
                fi
            else
                echo "styled-components установлен: ${RED}❌${NC}"
            fi
            
            echo "Права на node_modules/.bin:"
            ls -ld node_modules/.bin 2>/dev/null || echo "${RED}❌ Папка не существует${NC}"
        else
            echo "node_modules существует: ${RED}❌${NC}"
        fi
    else
        echo "package.json существует: ${RED}❌${NC}"
    fi
    echo ""
else
    echo "${RED}❌ Папка frontend не существует${NC}"
    echo ""
fi

echo "🔨 5. ПРОЦЕСС СБОРКИ"
echo "----------------------------------------"
cd /var/www/poizonic-mini-app/frontend || exit 1

if [ -f package.json ]; then
    echo "Проверка скриптов в package.json:"
    grep -A 5 '"scripts"' package.json
    echo ""
    
    echo "Проверка vite.config.ts:"
    if [ -f vite.config.ts ]; then
        echo "${GREEN}✅ vite.config.ts существует${NC}"
        echo "Содержимое vite.config.ts:"
        cat vite.config.ts
        echo ""
    else
        echo "${RED}❌ vite.config.ts не существует${NC}"
        echo ""
    fi
fi

echo "📄 6. ПРОВЕРКА СОБРАННЫХ ФАЙЛОВ"
echo "----------------------------------------"
if [ -d frontend/dist ]; then
    cd frontend/dist
    
    if [ -f index.html ]; then
        echo "${GREEN}✅ index.html существует${NC}"
        echo "Размер index.html: $(du -h index.html | cut -f1)"
        echo ""
        
        echo "Проверка подключения стилей в index.html:"
        grep -i "style\|link.*css" index.html | head -5
        echo ""
        
        if [ -d assets ]; then
            echo "Папка assets существует: ${GREEN}✅${NC}"
            echo "JS файлы в assets:"
            find assets -name "*.js" -type f | head -5
            echo ""
            echo "CSS файлы в assets:"
            find assets -name "*.css" -type f | head -5
            echo ""
            
            echo "Поиск упоминаний styled-components в JS файлах:"
            find assets -name "*.js" -type f -exec grep -l "styled-components" {} \; | head -3
            echo ""
        else
            echo "Папка assets существует: ${RED}❌${NC}"
        fi
    else
        echo "${RED}❌ index.html не существует${NC}"
    fi
    echo ""
else
    echo "${RED}❌ Папка frontend/dist не существует${NC}"
    echo ""
fi

echo "🌐 7. ПРОВЕРКА NGINX"
echo "----------------------------------------"
if command -v nginx >/dev/null 2>&1; then
    echo "Nginx установлен: ${GREEN}✅${NC}"
    nginx -v
    echo ""
    
    if [ -f /etc/nginx/sites-available/poizonic ]; then
        echo "Конфиг Nginx существует: ${GREEN}✅${NC}"
        echo "Статус Nginx:"
        systemctl status nginx --no-pager -l | head -5
        echo ""
    else
        echo "Конфиг Nginx: ${YELLOW}⚠️ Проверьте путь${NC}"
    fi
else
    echo "Nginx установлен: ${RED}❌${NC}"
    echo ""
fi

echo "🔄 8. ПРОВЕРКА PM2"
echo "----------------------------------------"
if command -v pm2 >/dev/null 2>&1; then
    echo "PM2 установлен: ${GREEN}✅${NC}"
    pm2 list
    echo ""
else
    echo "PM2 установлен: ${RED}❌${NC}"
    echo ""
fi

echo "💾 9. ДИСК И ПАМЯТЬ"
echo "----------------------------------------"
df -h / | tail -1
echo ""
free -h
echo ""

echo "📊 10. ПРОЦЕССЫ NODE"
echo "----------------------------------------"
ps aux | grep node | grep -v grep || echo "Нет запущенных процессов Node.js"
echo ""

echo "=========================================="
echo "✅ ДИАГНОСТИКА ЗАВЕРШЕНА"
echo "=========================================="

