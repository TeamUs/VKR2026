# Poizonic Mini App

Telegram Mini App для заказов с Poizon - современное приложение для заказа товаров с китайского маркетплейса Poizon.

## 🚀 Быстрый старт

### Локальная разработка

1. **Клонирование репозитория**
   ```bash
   git clone https://github.com/TeamUs/poizonic-mini-app.git
   cd poizonic-mini-app
   ```

2. **Установка зависимостей**
   ```bash
   npm run install-all
   ```

3. **Запуск проекта**
   ```bash
   npm start
   ```

   Это запустит:
   - Бэкенд на http://localhost:3000
   - Фронтенд на http://localhost:3001

### Ручной запуск

**Бэкенд:**
```bash
cd backend
npm install
npm start
```

**Фронтенд:**
```bash
cd frontend
npm install
npm run dev
```

## 🏗️ Архитектура

### Backend (Node.js + Express)
- **Порт:** 3000
- **API Endpoints:**
  - `GET /api/health` - Проверка здоровья сервера
  - `GET /api/exchange-rate` - Получение курса юаня
  - `POST /api/calculate-price` - Расчет стоимости товара
  - `POST /api/orders` - Создание заказа
  - `POST /api/referral` - Обработка рефералов
  - `GET /api/user/:telegramId` - Информация о пользователе

### Frontend (React + Vite)
- **Порт:** 3001
- **Технологии:**
  - React 18
  - TypeScript
  - Styled Components
  - Vite (вместо Create React App)

## 📁 Структура проекта

```
poizonic-mini-app/
├── backend/                 # Backend сервер
│   ├── server.js           # Основной файл сервера
│   ├── package.json        # Зависимости бэкенда
│   └── env.example         # Пример переменных окружения
├── frontend/               # Frontend приложение
│   ├── src/
│   │   ├── components/     # React компоненты
│   │   ├── App.tsx         # Главный компонент
│   │   └── index.tsx       # Точка входа
│   ├── index.html          # HTML шаблон
│   ├── vite.config.ts      # Конфигурация Vite
│   └── package.json        # Зависимости фронтенда
├── database/               # База данных
│   └── schema.sql          # SQL схема
├── images/                 # Изображения
├── start-local.js          # Скрипт запуска
└── package.json            # Корневой package.json
```

## 🔧 Настройка

### Переменные окружения

Создайте файл `.env` в папке `backend/` на основе `env.example`:

```env
# База данных
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=poizonic
DB_PORT=3306

# Telegram Bot
BOT_TOKEN=your_bot_token
ADMIN_CHAT_ID=your_admin_chat_id

# Сервер
PORT=3000
NODE_ENV=development
```

### База данных

1. Создайте базу данных MySQL
2. Импортируйте схему из `database/schema.sql`

## 🚀 Деплой

### На сервер

1. **Клонирование на сервер**
   ```bash
   git clone https://github.com/TeamUs/poizonic-mini-app.git
   cd poizonic-mini-app
   ```

2. **Установка зависимостей**
   ```bash
   npm run install-all
   ```

3. **Сборка фронтенда**
   ```bash
   npm run build
   ```

4. **Настройка Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       # Frontend
       location / {
           root /path/to/poizonic-mini-app/frontend/dist;
           try_files $uri $uri/ /index.html;
       }
       
       # API
       location /api/ {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Запуск бэкенда**
   ```bash
   cd backend
   npm start
   ```

## 📱 Telegram Mini App

Приложение интегрировано с Telegram Web App API и поддерживает:

- Авторизацию через Telegram
- Haptic feedback
- Кнопки навигации
- Реферальную систему
- Расчет стоимости товаров
- Создание заказов

## 🛠️ Разработка

### Добавление новых компонентов

1. Создайте компонент в `frontend/src/components/`
2. Добавьте его в `App.tsx`
3. Обновите навигацию в `MainMenu.tsx`

### Добавление новых API endpoints

1. Добавьте маршрут в `backend/server.js`
2. Обновите типы в `frontend/src/types/`
3. Создайте функции для работы с API

## 📄 Лицензия

MIT License - см. файл [LICENSE](LICENSE)

## 👥 Команда

Poizonic Team

## 📞 Поддержка

Telegram: @poizonic_manager