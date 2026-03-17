# Развёртывание второго мини-приложения на том же сервере

Пошаговая инструкция: все действия, как для первого приложения (Poizonic), но для второго (ВКР). Выполнять на сервере по порядку.

---

## Порядок действий при первом деплое

1. **Локально:** закоммитить и **запушить** все изменения в репозиторий ВКР (GitHub).
2. **На сервере:** склонировать репозиторий (если ещё не клонирован) или выполнить **git pull** в каталоге приложения.
3. **На сервере:** установить зависимости, собрать фронт, настроить **.env**, импортировать схему БД и запустить backend (PM2). То есть сначала на сервер попадает актуальный код, затем подключается и настраивается БД.

---

## Предположения

- Первое приложение уже работает: **poizonic** в `/var/www/poizonic-mini-app`, порт **3000**, домен **poizonic.ru** (или ваш).
- На сервере установлены: **Node.js** (v18+), **npm**, **Git**, **Nginx**, **PM2**, при необходимости **Certbot** (SSL).
- Второе приложение: репозиторий **VKR2026**, отдельный порт (**3001** или **3002**), доступ по подпути **/vkr/** на том же домене или по отдельному поддомену.

---

## Часть 1. Подготовка сервера (если ещё не делали для первого приложения)

### 1.1 Подключение к серверу

```bash
ssh user@ВАШ_СЕРВЕР
# или
ssh user@IP_АДРЕС
```

### 1.2 Установка Node.js (если нет)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

### 1.3 Установка PM2 глобально

```bash
sudo npm install -g pm2
pm2 -v
```

### 1.4 Установка Nginx (если нет)

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

### 1.5 Установка Certbot для SSL (если нет HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
# Сертификат для домена (для первого приложения):
# sudo certbot --nginx -d poizonic.ru
```

---

## Часть 2. Второе приложение: код и зависимости

### 2.1 Создать каталог для второго приложения

```bash
sudo mkdir -p /var/www/vkr-mini-app
sudo chown $USER:$USER /var/www/vkr-mini-app
cd /var/www/vkr-mini-app
```

### 2.2 Клонировать репозиторий ВКР

```bash
git clone https://github.com/TeamUs/VKR2026.git .
# или если репозиторий приватный:
# git clone https://github.com/TeamUs/VKR2026.git .
# ввести логин/токен при запросе
```

### 2.3 Установить зависимости backend

```bash
cd /var/www/vkr-mini-app/backend
npm install
```

### 2.4 Установить зависимости frontend и собрать статику

При сборке для ВКР фронт уже настроен на подпуть `/vkr/` (в репозитории в `frontend/.env.production` задано `VITE_APP_BASE_PATH=/vkr/`). Запросы к API идут относительными путями (`api/...`), поэтому с открытой страницы `https://домен/vkr/` они уйдут на `https://домен/vkr/api/...` — менять пути в коде не нужно.

Опционально: если в приложении используется реферальная ссылка и у бота ВКР другой username, перед сборкой задайте в `frontend/.env.production` переменную (без символа @):

```env
VITE_BOT_USERNAME=имя_вашего_бота_вкр
```

Затем:

```bash
cd /var/www/vkr-mini-app/frontend
npm install
npm run build
```

В результате папка `frontend/dist` будет содержать собранное приложение (для отдачи через Nginx).

---

## Часть 3. База данных для второго приложения

### 3.1 Вариант A: отдельная база на том же MySQL

Подключиться к MySQL (локально или по IP, как у первого приложения):

```bash
mysql -u root -p
# или
mysql -h 194.87.190.90 -u DB_USER -p
```

Создать базу и пользователя (если нужен отдельный):

```sql
CREATE DATABASE vkr_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Если нужен отдельный пользователь:
-- CREATE USER 'vkr_user'@'%' IDENTIFIED BY 'пароль';
-- GRANT ALL ON vkr_db.* TO 'vkr_user'@'%';
-- FLUSH PRIVILEGES;
```

Импортировать схему (таблицы):

```bash
cd /var/www/vkr-mini-app
mysql -h ХОСТ -u ПОЛЬЗОВАТЕЛЬ -p vkr_db < database/schema.sql
```

Если в проекте есть отдельная схема для ВКР без юаней (`schema_vkr.sql`) — использовать её:

```bash
mysql -h ХОСТ -u ПОЛЬЗОВАТЕЛЬ -p vkr_db < database/schema_vkr.sql
```

### 3.2 Вариант B (рекомендуется при одной БД на хостинге): та же база, таблицы с префиксом `vkr_`

Если на хостинге доступна только **одна база** (например, `default_db`), не создавайте отдельную `vkr_db`. В проекте ВКР код уже переведён на таблицы с префиксом **vkr_** (`vkr_users`, `vkr_orders`, `vkr_reviews` и т.д.).

1. **Не создавать** новую БД. Использовать ту же, что и основное приложение (например, `default_db`).
2. Импортировать схему с префиксом в **ту же** базу:

```bash
cd /var/www/vkr-mini-app
mysql -h ХОСТ -u ПОЛЬЗОВАТЕЛЬ -p default_db < database/schema_vkr_prefix.sql
```

3. В **backend/.env** для ВКР указать **ту же** базу:

```env
DB_NAME=default_db
```

Основное приложение продолжает работать с таблицами без префикса (`users`, `orders`, …), ВКР — с таблицами `vkr_*`. Данные разделены по именам таблиц.

---

## Часть 4. Конфигурация второго приложения (.env)

### 4.1 Создать .env в backend

```bash
cd /var/www/vkr-mini-app/backend
cp env.example .env
nano .env
```

Заполнить минимум (подставьте свои значения; токен не коммитить в git):

```env
BOT_TOKEN=ВАШ_ТОКЕН_ОТ_BOTFATHER_ДЛЯ_БОТА_ВКР
ADMIN_TELEGRAM_ID=ваш_telegram_id
MANAGER_TELEGRAM_ID=ваш_telegram_id

DB_HOST=194.87.190.90
DB_USER=gen_user
DB_PASSWORD=ваш_пароль
DB_NAME=vkr_db
DB_PORT=3306

PORT=3001
NODE_ENV=production
FRONTEND_URL=https://poizonic.ru/vkr/
CORS_ORIGINS=https://poizonic.ru

# Остальное по необходимости (как в env.example)
```

Токен бота ВКР один раз вписывается только в этот файл .env на сервере. В репозиторий не добавлять.

Сохранить (Ctrl+O, Enter, Ctrl+X в nano).

Важно: **PORT** должен отличаться от первого приложения (3000 → 3001 или 3002). **DB_NAME** — база именно для ВКР (например, `vkr_db`).

**Токен бота:** в коде токен нигде не хранится — только в `backend/.env` как `BOT_TOKEN`. Менять нужно именно в `.env` на сервере (и локально при запуске бэкенда ВКР). В репозиторий `.env` не коммитить.

---

## Часть 5. PM2: запуск backend второго приложения

### 5.1 Создать ecosystem-конфиг для ВКР

В корне второго приложения создать или отредактировать `ecosystem.config.js`:

```bash
cd /var/www/vkr-mini-app
nano ecosystem.config.js
```

Содержимое (имя и порт — свои):

```javascript
module.exports = {
  apps: [
    {
      name: 'vkr-backend',
      script: './backend/server.js',
      cwd: '/var/www/vkr-mini-app',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      max_memory_restart: '500M',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'uploads', 'frontend', '.git'],
    },
  ],
};
```

Создать папку для логов:

```bash
mkdir -p /var/www/vkr-mini-app/logs
```

### 5.2 Запустить процесс через PM2

```bash
cd /var/www/vkr-mini-app
pm2 start ecosystem.config.js
pm2 status
```

Должны быть видны оба процесса: `poizonic-backend` (порт 3000) и `vkr-backend` (порт 3001).

### 5.3 Сохранить список процессов PM2 (автозапуск после перезагрузки сервера)

```bash
pm2 save
pm2 startup
# выполнить команду, которую выведет pm2 startup (sudo ...)
```

---

## Часть 6. Nginx: статика и API второго приложения

Нужно добавить раздачу статики по **/vkr/** и проксирование **/vkr/api/** на порт второго бэкенда.

### 6.1 Открыть конфиг Nginx

Обычно конфиг сайта лежит здесь:

- `/etc/nginx/sites-available/default`
- или `/etc/nginx/sites-available/poizonic`
- или `/etc/nginx/conf.d/default.conf`

```bash
sudo nano /etc/nginx/sites-available/default
# или
sudo nano /etc/nginx/sites-available/poizonic
```

### 6.2 Добавить блоки для ВКР

Внутри блока `server { ... }` (тот, где уже есть `server_name` вашего домена) добавить:

**Раздача статики фронта ВКР по пути /vkr/:**

```nginx
location /vkr/ {
    alias /var/www/vkr-mini-app/frontend/dist/;
    try_files $uri $uri/ /vkr/index.html;
}
```

**Проксирование API ВКР с /vkr/api/ на бэкенд (порт 3001):**

```nginx
location /vkr/api/ {
    proxy_pass http://127.0.0.1:3001/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 200M;
    proxy_read_timeout 300s;
    proxy_connect_timeout 300s;
    proxy_send_timeout 300s;
}
```

Не трогать существующие `location /` и `location /api/` для первого приложения (если они есть в этом же server).

### 6.3 Проверить конфиг и перезагрузить Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## Часть 7. Telegram Bot (BotFather)

### 7.1 Создать бота для ВКР (если ещё не создан)

В Telegram: [@BotFather](https://t.me/BotFather) → **/newbot** → имя и username для бота ВКР → получить токен.

### 7.2 Привязать Mini App к боту

В BotFather: **/mybots** → выбрать бота ВКР → **Bot Settings** → **Menu Button** или **Configure Mini App** → указать URL:

```
https://poizonic.ru/vkr/
```

(обязательно со слэшем в конце). Токен этого бота должен быть в **backend/.env** как `BOT_TOKEN`.

---

## Часть 8. Проверка

### 8.1 Backend отвечает локально

На сервере:

```bash
curl http://127.0.0.1:3001/api/health
# или любой ваш эндпоинт, например:
curl http://127.0.0.1:3001/api/exchange-rate
```

Ожидается ответ без ошибки соединения.

### 8.2 Через Nginx

С хоста (браузер или curl):

```text
https://poizonic.ru/vkr/
https://poizonic.ru/vkr/api/...
```

Должны открываться фронт и API.

### 8.3 Открыть Mini App в Telegram

В боте ВКР нажать кнопку меню / Mini App — должен открыться интерфейс по адресу `https://poizonic.ru/vkr/`.

---

## Часть 9. Деплой обновлений (как для первого приложения)

Скрипт для второго приложения. Создать `/var/www/vkr-mini-app/deploy.sh`:

```bash
#!/bin/bash
echo "🚀 Деплой VKR Mini App..."
cd /var/www/vkr-mini-app || exit 1

echo "📥 Обновление кода из Git..."
git pull origin main
[ $? -ne 0 ] && { echo "❌ Ошибка git pull"; exit 1; }

echo "📦 Сборка frontend..."
cd frontend && npm run build
[ $? -ne 0 ] && { echo "❌ Ошибка сборки frontend"; exit 1; }
cd ..

echo "🔄 Перезапуск backend..."
pm2 restart vkr-backend || pm2 start ecosystem.config.js

echo "📊 Статус:"
pm2 status
echo "✅ Деплой завершён."
```

Сделать исполняемым и запускать при обновлении:

```bash
chmod +x /var/www/vkr-mini-app/deploy.sh
# при обновлении:
cd /var/www/vkr-mini-app && ./deploy.sh
```

---

## Краткий чек-лист (что сделать по порядку)

| № | Действие |
|---|----------|
| 1 | Подключиться к серверу по SSH |
| 2 | Создать каталог `/var/www/vkr-mini-app`, клонировать туда VKR2026 |
| 3 | В каталоге: `backend`: `npm install`; `frontend`: `npm install`, `npm run build` |
| 4 | Создать БД для ВКР (например `vkr_db`), импортировать схему |
| 5 | В `backend` создать `.env` (BOT_TOKEN, DB_*, PORT=3001, FRONTEND_URL, CORS_ORIGINS) |
| 6 | Создать/проверить `ecosystem.config.js` (name: vkr-backend, port: 3001, cwd: /var/www/vkr-mini-app) |
| 7 | Запустить: `pm2 start ecosystem.config.js`, затем `pm2 save`, `pm2 startup` |
| 8 | В Nginx добавить `location /vkr/` (alias на frontend/dist) и `location /vkr/api/` (proxy_pass на 3001) |
| 9 | Проверить: `nginx -t`, `systemctl reload nginx` |
| 10 | В BotFather указать Mini App URL: `https://ВАШ_ДОМЕН/vkr/` |
| 11 | Проверить в браузере и в Telegram открытие приложения |

После этого второе мини-приложение работает на том же сервере рядом с первым: свой порт, свой процесс PM2, свой путь и своя БД.
