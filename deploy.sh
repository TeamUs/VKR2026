#!/bin/bash

# Скрипт для быстрого деплоя Poizonic Mini App
# Использование: ./deploy.sh

set -e  # Остановка при ошибке

echo "🚀 Начало деплоя Poizonic Mini App..."

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Проверка, что скрипт запущен из правильной директории
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    print_error "Скрипт должен быть запущен из корневой директории проекта!"
    exit 1
fi

# Шаг 1: Обновление кода из Git
print_warning "Шаг 1: Получение последних изменений из Git..."
if [ -d ".git" ]; then
    git pull
    print_success "Код обновлен"
else
    print_warning "Директория .git не найдена, пропускаем обновление"
fi

# Шаг 2: Обновление зависимостей Backend
print_warning "Шаг 2: Обновление зависимостей Backend..."
cd backend
if [ -f "package.json" ]; then
    npm install --production
    print_success "Зависимости Backend обновлены"
else
    print_error "Файл package.json не найден в backend/"
    exit 1
fi
cd ..

# Шаг 3: Обновление зависимостей Frontend
print_warning "Шаг 3: Обновление зависимостей Frontend..."
cd frontend
if [ -f "package.json" ]; then
    npm install
    print_success "Зависимости Frontend обновлены"
else
    print_error "Файл package.json не найден в frontend/"
    exit 1
fi

# Шаг 4: Сборка Frontend
print_warning "Шаг 4: Сборка Frontend..."
npm run build
if [ -d "dist" ]; then
    print_success "Frontend собран успешно"
else
    print_error "Директория dist не создана после сборки!"
    exit 1
fi
cd ..

# Шаг 5: Перезапуск Backend через PM2
print_warning "Шаг 5: Перезапуск Backend..."
if command -v pm2 &> /dev/null; then
    pm2 restart poizonic-backend || pm2 start ecosystem.config.js
    print_success "Backend перезапущен"
else
    print_error "PM2 не установлен!"
    exit 1
fi

# Шаг 6: Перезагрузка Nginx
print_warning "Шаг 6: Перезагрузка Nginx..."
if command -v nginx &> /dev/null; then
    sudo nginx -t && sudo systemctl reload nginx
    print_success "Nginx перезагружен"
else
    print_warning "Nginx не найден, пропускаем"
fi

# Финальное сообщение
echo ""
print_success "🎉 Деплой завершен успешно!"
echo ""
echo "Проверьте статус:"
echo "  - PM2: pm2 status"
echo "  - Логи: pm2 logs poizonic-backend"
echo "  - Nginx: sudo systemctl status nginx"
echo ""

