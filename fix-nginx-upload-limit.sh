#!/bin/bash
# Скрипт для увеличения лимита загрузки файлов в Nginx для Poizonic Mini App

echo "🔧 Настройка Nginx для загрузки больших файлов..."
echo ""

# Находим конфигурационный файл Nginx
NGINX_CONF=""

# Сначала ищем файлы с proxy_pass на порт 3000 (Node.js приложение)
for config in \
    "/etc/nginx/sites-enabled/default" \
    "/etc/nginx/sites-available/default" \
    "/etc/nginx/conf.d/default.conf" \
    "/etc/nginx/nginx.conf" \
    "/etc/nginx/sites-enabled/poizonic" \
    "/etc/nginx/sites-available/poizonic"
do
    if [ -f "$config" ]; then
        # Проверяем, есть ли там proxy_pass на порт 3000
        if grep -q "proxy_pass.*3000" "$config" 2>/dev/null; then
            NGINX_CONF="$config"
            echo "📋 Найден конфиг с proxy_pass на порт 3000: $config"
            break
        fi
    fi
done

# Если не нашли по proxy_pass, просто берем первый существующий
if [ -z "$NGINX_CONF" ]; then
    for config in \
        "/etc/nginx/sites-enabled/default" \
        "/etc/nginx/sites-available/default" \
        "/etc/nginx/conf.d/default.conf" \
        "/etc/nginx/nginx.conf"
    do
        if [ -f "$config" ]; then
            NGINX_CONF="$config"
            echo "📋 Найден конфигурационный файл: $config"
            break
        fi
    done
fi

if [ -z "$NGINX_CONF" ]; then
    echo "❌ Конфигурационный файл Nginx не найден"
    echo "Пожалуйста, укажите путь к конфигурационному файлу вручную"
    exit 1
fi

echo "✅ Используется: $NGINX_CONF"
echo ""

# Создаем резервную копию
BACKUP_FILE="${NGINX_CONF}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$NGINX_CONF" "$BACKUP_FILE"
echo "✅ Создана резервная копия: $BACKUP_FILE"
echo ""

# Обновляем или добавляем client_max_body_size
if grep -q "client_max_body_size" "$NGINX_CONF"; then
    echo "📝 Обновляю существующий client_max_body_size..."
    sed -i 's/client_max_body_size[^;]*;/client_max_body_size 200M;/g' "$NGINX_CONF"
else
    echo "➕ Добавляю client_max_body_size..."
    # Ищем server блок и добавляем туда
    if grep -q "server {" "$NGINX_CONF"; then
        sed -i '/server {/a\    client_max_body_size 200M;' "$NGINX_CONF"
        # Добавляем таймауты тоже
        sed -i '/server {/a\    proxy_read_timeout 300s;\n    proxy_connect_timeout 300s;\n    proxy_send_timeout 300s;' "$NGINX_CONF"
    elif grep -q "http {" "$NGINX_CONF"; then
        sed -i '/http {/a\    client_max_body_size 200M;' "$NGINX_CONF"
    else
        sed -i '1i\client_max_body_size 200M;' "$NGINX_CONF"
    fi
fi

echo "✅ Конфигурация обновлена"
echo ""

# Проверяем синтаксис
echo "🔍 Проверка синтаксиса Nginx..."
if nginx -t > /dev/null 2>&1; then
    echo "✅ Синтаксис корректен"
    echo ""
    echo "🔄 Перезагрузка Nginx..."
    if systemctl reload nginx 2>/dev/null || service nginx reload 2>/dev/null; then
        echo "✅ Nginx успешно перезагружен"
        echo ""
        echo "✅ Готово! Лимит загрузки файлов увеличен до 200MB"
        echo "📊 Теперь можно загружать до 20 файлов, каждый до 50MB"
    else
        echo "❌ Не удалось перезагрузить Nginx"
        echo "Попробуйте: sudo systemctl reload nginx"
        exit 1
    fi
else
    echo "❌ Ошибка в конфигурации!"
    nginx -t
    echo ""
    echo "Восстанавливаю из резервной копии..."
    cp "$BACKUP_FILE" "$NGINX_CONF"
    echo "✅ Конфигурация восстановлена"
    exit 1
fi
