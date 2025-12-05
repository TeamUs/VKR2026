#!/bin/bash
# Скрипт для увеличения лимита загрузки файлов в Nginx для Poizonic Mini App

set -e  # Останавливаем выполнение при ошибке

echo "🔧 Настройка Nginx для загрузки больших файлов..."
echo ""

# Цвета для вывода
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Функция для вывода ошибок
error() {
    echo -e "${RED}❌ $1${NC}"
}

# Функция для вывода успешных сообщений
success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Функция для вывода предупреждений
warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Функция для вывода информации
info() {
    echo -e "📋 $1"
}

# Ищем конфигурационный файл Nginx
info "Поиск конфигурационного файла Nginx..."

NGINX_CONF=""

# Сначала ищем файлы с proxy_pass на порт 3000 (Node.js приложение)
POSSIBLE_CONFIGS=(
    "/etc/nginx/sites-enabled/default"
    "/etc/nginx/sites-available/default"
    "/etc/nginx/conf.d/default.conf"
    "/etc/nginx/nginx.conf"
    "/etc/nginx/sites-enabled/poizonic"
    "/etc/nginx/sites-available/poizonic"
)

for config in "${POSSIBLE_CONFIGS[@]}"; do
    if [ -f "$config" ]; then
        # Проверяем, есть ли там proxy_pass на порт 3000
        if grep -q "proxy_pass.*3000\|proxy_pass.*localhost:3000" "$config" 2>/dev/null; then
            NGINX_CONF="$config"
            info "Найден конфиг с proxy_pass на порт 3000: $config"
            break
        fi
    fi
done

# Если не нашли по proxy_pass, просто берем первый существующий
if [ -z "$NGINX_CONF" ]; then
    for config in "${POSSIBLE_CONFIGS[@]}"; do
        if [ -f "$config" ]; then
            NGINX_CONF="$config"
            info "Найден конфигурационный файл: $config"
            break
        fi
    done
fi

if [ -z "$NGINX_CONF" ]; then
    error "Конфигурационный файл Nginx не найден в стандартных местах"
    echo ""
    echo "Пожалуйста, укажите путь к конфигурационному файлу вручную:"
    echo "  bash fix-nginx-upload-limit.sh /путь/к/nginx.conf"
    exit 1
fi

success "Используется конфигурационный файл: $NGINX_CONF"
echo ""

# Создаем резервную копию
BACKUP_FILE="${NGINX_CONF}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$NGINX_CONF" "$BACKUP_FILE"
success "Создана резервная копия: $BACKUP_FILE"
echo ""

# Создаем временный файл для новой конфигурации
TEMP_FILE=$(mktemp)
cp "$NGINX_CONF" "$TEMP_FILE"

info "Обновление конфигурации..."

# Находим блок server {} который содержит proxy_pass
# Сначала проверяем, есть ли уже client_max_body_size в server блоке
if grep -q "client_max_body_size" "$TEMP_FILE"; then
    info "Обновляю существующий client_max_body_size..."
    # Обновляем все существующие значения client_max_body_size до 200M
    sed -i 's/client_max_body_size[^;]*;/client_max_body_size 200M;/g' "$TEMP_FILE"
    success "Обновлен client_max_body_size до 200M"
else
    info "Добавляю client_max_body_size..."
    
    # Ищем server блок с proxy_pass
    # Если найден server блок с proxy_pass, добавляем туда
    if grep -q "server {" "$TEMP_FILE"; then
        # Находим строку с server { и добавляем после нее
        # Используем awk для более надежной обработки
        awk '
        /server[ \t]*{/ {
            print
            getline
            # Если следующая строка не пустая и не содержит закрывающую скобку
            if ($0 !~ /^[ \t]*}/) {
                print "    client_max_body_size 200M;"
                print "    proxy_read_timeout 300s;"
                print "    proxy_connect_timeout 300s;"
                print "    proxy_send_timeout 300s;"
            }
        }
        { print }
        ' "$TEMP_FILE" > "${TEMP_FILE}.new"
        mv "${TEMP_FILE}.new" "$TEMP_FILE"
        success "Добавлен client_max_body_size 200M и таймауты в server блок"
    else
        # Если нет server блока, добавляем в http блок
        if grep -q "http {" "$TEMP_FILE"; then
            sed -i '/http[ \t]*{/a\    client_max_body_size 200M;' "$TEMP_FILE"
            success "Добавлен client_max_body_size 200M в http блок"
        else
            # Если нет ни server, ни http блока, добавляем в начало файла
            sed -i '1i\client_max_body_size 200M;' "$TEMP_FILE"
            warning "Добавлен client_max_body_size 200M в начало файла (не найдены стандартные блоки)"
        fi
    fi
fi

# Добавляем таймауты для proxy, если их еще нет
if ! grep -q "proxy_read_timeout" "$TEMP_FILE"; then
    # Ищем location блок с proxy_pass и добавляем туда таймауты
    if grep -q "location.*{" "$TEMP_FILE"; then
        sed -i '/location.*{/a\        proxy_read_timeout 300s;\n        proxy_connect_timeout 300s;\n        proxy_send_timeout 300s;' "$TEMP_FILE"
        success "Добавлены таймауты для proxy"
    fi
fi

# Заменяем оригинальный файл
mv "$TEMP_FILE" "$NGINX_CONF"
echo ""

# Проверяем синтаксис
info "Проверка синтаксиса Nginx..."
if nginx -t 2>&1 | grep -q "syntax is ok\|test is successful"; then
    success "Синтаксис конфигурации корректен"
    echo ""
    
    # Показываем что было изменено
    info "Изменения в конфигурации:"
    grep -n "client_max_body_size\|proxy.*timeout" "$NGINX_CONF" || true
    echo ""
    
    # Перезагружаем Nginx
    info "Перезагрузка Nginx..."
    if systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null; then
        success "Nginx успешно перезагружен с новыми настройками"
        echo ""
        success "✅ Готово! Лимит загрузки файлов увеличен до 200MB"
        echo ""
        info "Теперь вы можете загружать до 20 файлов, каждый до 50MB"
        info "Общий размер всех файлов в одном запросе может быть до 200MB"
    else
        error "Не удалось перезагрузить Nginx"
        error "Попробуйте выполнить вручную: sudo systemctl reload nginx"
        exit 1
    fi
else
    error "Обнаружена ошибка в конфигурации Nginx!"
    echo ""
    error "Восстанавливаю конфигурацию из резервной копии..."
    cp "$BACKUP_FILE" "$NGINX_CONF"
    success "Конфигурация восстановлена из резервной копии"
    echo ""
    error "Пожалуйста, исправьте конфигурацию вручную и попробуйте снова"
    exit 1
fi
