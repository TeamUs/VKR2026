#!/bin/bash
# Скрипт для увеличения лимита загрузки файлов в Nginx

echo "🔧 Настройка Nginx для загрузки больших файлов..."

# Находим конфигурационный файл Nginx
NGINX_CONF=""
if [ -f "/etc/nginx/sites-available/default" ]; then
    NGINX_CONF="/etc/nginx/sites-available/default"
elif [ -f "/etc/nginx/sites-enabled/default" ]; then
    NGINX_CONF="/etc/nginx/sites-enabled/default"
elif [ -f "/etc/nginx/nginx.conf" ]; then
    NGINX_CONF="/etc/nginx/nginx.conf"
fi

if [ -z "$NGINX_CONF" ]; then
    echo "❌ Конфигурационный файл Nginx не найден"
    echo "Пожалуйста, укажите путь к конфигурационному файлу вручную"
    exit 1
fi

echo "📋 Найден конфигурационный файл: $NGINX_CONF"

# Создаем резервную копию
cp "$NGINX_CONF" "${NGINX_CONF}.backup.$(date +%Y%m%d_%H%M%S)"
echo "✅ Создана резервная копия: ${NGINX_CONF}.backup.$(date +%Y%m%d_%H%M%S)"

# Проверяем, есть ли уже client_max_body_size
if grep -q "client_max_body_size" "$NGINX_CONF"; then
    echo "📝 Обновляю существующий client_max_body_size..."
    sed -i 's/client_max_body_size.*/client_max_body_size 100M;/' "$NGINX_CONF"
else
    echo "➕ Добавляю client_max_body_size в http блок..."
    # Добавляем в http блок
    if grep -q "http {" "$NGINX_CONF"; then
        sed -i '/http {/a \    client_max_body_size 100M;' "$NGINX_CONF"
    else
        # Или добавляем в server блок
        if grep -q "server {" "$NGINX_CONF"; then
            sed -i '/server {/a \    client_max_body_size 100M;' "$NGINX_CONF"
        else
            echo "⚠️ Не удалось найти http или server блок, добавляю в начало файла"
            sed -i '1i\client_max_body_size 100M;' "$NGINX_CONF"
        fi
    fi
fi

echo "✅ Конфигурация обновлена"

# Проверяем синтаксис
echo "🔍 Проверка синтаксиса Nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Синтаксис корректный"
    echo "🔄 Перезагрузка Nginx..."
    systemctl reload nginx
    echo "✅ Nginx перезагружен с новыми настройками"
else
    echo "❌ Ошибка в конфигурации Nginx"
    echo "Восстанавливаю из резервной копии..."
    cp "${NGINX_CONF}.backup."* "$NGINX_CONF" 2>/dev/null || echo "⚠️ Не удалось восстановить резервную копию"
    exit 1
fi

echo ""
echo "✅ Готово! Лимит загрузки файлов увеличен до 100MB"
echo "📝 Вы можете проверить настройку командой:"
echo "   grep client_max_body_size $NGINX_CONF"

