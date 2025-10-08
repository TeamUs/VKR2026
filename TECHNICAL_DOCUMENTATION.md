# Техническая документация Poizonic Mini App

## 📋 Содержание

1. [Обзор проекта](#1-обзор-проекта)
2. [Архитектура приложения](#2-архитектура-приложения)
3. [Структура базы данных](#3-структура-базы-данных)
4. [Backend: API и бизнес-логика](#4-backend-api-и-бизнес-логика)
5. [Frontend: Компоненты и UI](#5-frontend-компоненты-и-ui)
6. [Интеграции и внешние сервисы](#6-интеграции-и-внешние-сервисы)
7. [Потоки данных и взаимодействия](#7-потоки-данных-и-взаимодействия)
8. [Безопасность и валидация](#8-безопасность-и-валидация)

---

## 1. Обзор проекта

### 1.1 Назначение

**Poizonic Mini App** — это Telegram Mini App для автоматизации бизнес-процессов, связанных с:
- Покупкой и продажей китайской валюты (юаней)
- Оформлением заказов из Китая
- Расчетом стоимости и комиссий
- Реферальной системой с бонусами
- Административным управлением заказами и пользователями

### 1.2 Целевая аудитория

- **Клиенты**: пользователи Telegram, которые хотят купить юани или оформить заказ из Китая
- **Администраторы**: менеджеры, которые обрабатывают заказы, управляют курсами валют и пользователями

### 1.3 Ключевые возможности

**Для клиентов:**
- Покупка юаней по актуальному курсу
- Оформление заказов с автоматическим расчетом стоимости
- Калькулятор цен с учетом доставки и комиссии
- Реферальная система (получение бонусов за приглашение друзей)
- Отслеживание статуса заказов
- Просмотр FAQ, инструкций, отзывов

**Для администраторов:**
- Управление курсом юаня
- Обработка заказов и покупок юаней
- Управление пользователями (блокировка, разблокировка)
- Просмотр аналитики и статистики
- Реферальная система (управление бонусами, скидками на комиссию)
- Отправка уведомлений пользователям
- Калькулятор дохода
- Мониторинг активности

### 1.4 Технологический стек

**Frontend:**
- React 18 с TypeScript
- Styled Components (CSS-in-JS)
- Telegram Web App SDK
- Chart.js (для графиков аналитики)
- Axios (HTTP-клиент)

**Backend:**
- Node.js + Express.js
- MySQL/MariaDB (база данных)
- mysql2/promise для работы с БД
- Cheerio (парсинг HTML)
- Multer (загрузка файлов)
- CORS, dotenv

**Окружение разработки:**
- Локальная разработка (без Docker на данный момент)
- Git для контроля версий

### 1.5 Основные принципы разработки

1. **Модульность**: компоненты разделены по функциональности
2. **Типобезопасность**: использование TypeScript для предотвращения ошибок
3. **Адаптивность**: интерфейс адаптирован под мобильные устройства
4. **Безопасность**: валидация данных Telegram, защита API-эндпоинтов
5. **UX-ориентированность**: тактильная обратная связь (haptic feedback), анимации, интуитивный интерфейс

---

## 2. Архитектура приложения

### 2.1 Общая схема

```
┌─────────────────────────────────────────────────────────────┐
│                     Telegram Platform                        │
│  ┌────────────────┐              ┌────────────────┐         │
│  │ Telegram Bot   │◄────────────►│  Mini App UI   │         │
│  │  (Bot API)     │              │   (WebView)    │         │
│  └────────┬───────┘              └────────┬───────┘         │
└───────────┼──────────────────────────────┼─────────────────┘
            │                              │
            │ Webhooks/                    │ HTTP Requests
            │ Notifications                │ (REST API)
            ▼                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend Server                          │
│                    (Node.js + Express)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Layer (REST Endpoints)                          │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Business Logic Layer                                │   │
│  │  - Order Management                                  │   │
│  │  - Exchange Rate Management                          │   │
│  │  - Referral System                                   │   │
│  │  - User Management                                   │   │
│  │  - Notifications                                     │   │
│  ├──────────────────────────────────────────────────────┤   │
│  │  Database Access Layer (MySQL Queries)               │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ SQL Queries
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   MySQL/MariaDB Database                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │  users   │ │  orders  │ │ yuan_... │ │ referral │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Клиент-серверная модель

**Frontend (React SPA):**
- Работает внутри Telegram WebView
- Полностью клиентское приложение (Single Page Application)
- Взаимодействует с Backend через REST API
- Использует Telegram Web App SDK для интеграции с платформой

**Backend (Node.js Server):**
- Обрабатывает HTTP-запросы от Frontend
- Управляет бизнес-логикой
- Взаимодействует с базой данных MySQL/MariaDB
- Отправляет уведомления через Telegram Bot API

**Database (MySQL/MariaDB):**
- Хранит все данные приложения
- Обеспечивает ACID-транзакции
- Поддерживает связи между таблицами

### 2.3 Структура проекта

```
poizonic-mini-app_reserve_copy/
│
├── backend/                      # Backend приложение
│   ├── server.js                 # Главный файл сервера
│   ├── package.json              # Зависимости Backend
│   ├── .env                      # Переменные окружения (не в Git)
│   └── env.example               # Пример файла .env
│
├── frontend/                     # Frontend приложение
│   ├── public/                   # Статические файлы
│   │   └── index.html            # HTML-шаблон
│   ├── src/                      # Исходный код
│   │   ├── components/           # React-компоненты
│   │   │   ├── MainMenu.tsx      # Главное меню
│   │   │   ├── OrderForm.tsx     # Форма заказа
│   │   │   ├── PriceCalculator.tsx  # Калькулятор цен
│   │   │   ├── ExchangeRate.tsx  # Покупка юаней
│   │   │   ├── ReferralSystem.tsx   # Реферальная система
│   │   │   ├── FAQ.tsx           # Часто задаваемые вопросы
│   │   │   ├── Instructions.tsx  # Инструкции
│   │   │   ├── AboutUs.tsx       # О нас
│   │   │   ├── Reviews.tsx       # Отзывы
│   │   │   ├── AdminPanel.tsx    # Админ-панель
│   │   │   └── BottomNavigation.tsx  # Нижнее меню навигации
│   │   ├── types/                # TypeScript типы
│   │   │   └── telegram.ts       # Типы для Telegram Web App
│   │   ├── App.tsx               # Главный компонент приложения
│   │   └── index.tsx             # Точка входа
│   └── package.json              # Зависимости Frontend
│
├── database/                     # SQL-схемы
│   └── schema.sql                # Схема базы данных
│
└── TECHNICAL_DOCUMENTATION.md    # Этот файл
```

### 2.4 Поток данных

**1. Инициализация приложения:**
```
Пользователь открывает Mini App в Telegram
    ↓
Telegram передает initData (идентификатор пользователя, данные)
    ↓
Frontend получает initData через Telegram.WebApp SDK
    ↓
Frontend отправляет GET /api/user/:telegramId
    ↓
Backend проверяет/создает пользователя в БД
    ↓
Возвращает данные пользователя Frontend
    ↓
Интерфейс готов к работе
```

**2. Создание заказа:**
```
Пользователь заполняет форму заказа
    ↓
Frontend валидирует данные
    ↓
POST /api/orders с данными заказа
    ↓
Backend сохраняет заказ в БД
    ↓
Backend отправляет уведомление администраторам через Telegram Bot
    ↓
Возвращает подтверждение Frontend
    ↓
Frontend показывает успешное сообщение + haptic feedback
```

**3. Обработка заказа администратором:**
```
Администратор открывает AdminPanel
    ↓
GET /api/orders/pending (получение ожидающих заказов)
    ↓
Администратор меняет статус заказа
    ↓
PUT /api/orders/:id/status
    ↓
Backend обновляет статус в БД
    ↓
Backend отправляет уведомление пользователю через Telegram Bot
    ↓
Возвращает обновленные данные Frontend
```

### 2.5 Основные паттерны проектирования

**1. Component-Based Architecture (Frontend):**
- Каждый UI-элемент — отдельный React-компонент
- Переиспользование компонентов (например, кнопки, модальные окна)
- Состояние управляется через React hooks (useState, useEffect)

**2. RESTful API (Backend):**
- Стандартные HTTP-методы (GET, POST, PUT, DELETE)
- Ресурсно-ориентированные эндпоинты
- JSON для передачи данных

**3. Separation of Concerns:**
- Разделение логики: Frontend (UI), Backend (бизнес-логика), Database (данные)
- Компоненты Frontend не содержат прямых SQL-запросов
- Backend не содержит UI-логики

**4. Event-Driven (Telegram Bot):**
- Асинхронная отправка уведомлений
- Не блокирует основной поток выполнения

---

## 3. Структура базы данных

### 3.1 Обзор

База данных: **MySQL/MariaDB**  
Кодировка: **UTF8MB4** (для поддержки emoji и международных символов)  
Collation: **utf8mb4_unicode_ci** (правильная сортировка и сравнение)

**Почему UTF8MB4?**
- ✅ Поддержка emoji (😊, 🛒, 💰, 🚚, ✅, ❌)
- ✅ Китайские символы (важно для Poizon)
- ✅ Все 4-байтовые UTF-8 символы
- ✅ Международные символы (арабский, кириллица, и т.д.)

**Важно:** Стандартный `utf8` в MySQL поддерживает только 3 байта и **не включает** большинство emoji!

### 3.2 Таблицы и их назначение

#### Таблица `users` — Пользователи
Хранит информацию о всех пользователях системы.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `telegram_id` | BIGINT | ID пользователя в Telegram | PRIMARY KEY, NOT NULL |
| `username` | VARCHAR(100) | Юзернейм в Telegram | NULL |
| `first_name` | VARCHAR(100) | Имя пользователя | NULL |
| `last_name` | VARCHAR(100) | Фамилия пользователя | NULL |
| `commission` | DECIMAL(5,2) | Комиссия для пользователя (0.00-1.00) | DEFAULT 0.05 (5%) |
| `access_expires_at` | TIMESTAMP | Дата окончания скидки на комиссию | NULL |
| `referred_by` | BIGINT | ID реферала, который пригласил | NULL, FK -> users.telegram_id |
| `is_admin` | BOOLEAN | Флаг администратора | DEFAULT FALSE |
| `is_blocked` | BOOLEAN | Флаг блокировки пользователя | DEFAULT FALSE |
| `created_at` | TIMESTAMP | Дата регистрации | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `telegram_id`
- INDEX: `idx_users_telegram_id`
- INDEX: `idx_users_referred_by`

#### Таблица `orders` — Заказы из Китая
Хранит все заказы пользователей.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `order_id` | INT | Уникальный ID заказа | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID пользователя | FK -> users.telegram_id, ON DELETE SET NULL |
| `username` | VARCHAR(100) | Юзернейм пользователя | NULL |
| `product_link` | VARCHAR(255) | Ссылка на товар | NULL |
| `product_name` | TEXT | Название товара | NULL |
| `product_size` | VARCHAR(50) | Размер товара | NULL |
| `product_price_yuan` | DECIMAL(10,2) | Цена товара в юанях | NULL |
| `product_weight` | DECIMAL(10,2) | Вес товара (кг) | NULL |
| `full_name` | VARCHAR(255) | ФИО получателя | NULL |
| `phone_number` | VARCHAR(255) | Телефон получателя | NULL |
| `pickup_point_address` | VARCHAR(255) | Адрес пункта выдачи | NULL |
| `status` | ENUM | Статус заказа | 'pending', 'processing', 'shipped', 'delivered', 'cancelled' |
| `total_cost_rub` | DECIMAL(10,2) | Итоговая стоимость в рублях | NULL |
| `commission_amount` | DECIMAL(10,2) | Сумма комиссии | NULL |
| `exchange_rate` | DECIMAL(10,4) | Курс юаня на момент заказа | NULL |
| `created_at` | TIMESTAMP | Дата создания заказа | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Дата последнего обновления | ON UPDATE CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `order_id`
- INDEX: `idx_orders_telegram_id`
- INDEX: `idx_orders_created_at`
- INDEX: `idx_orders_status`

#### Таблица `yuan_purchases` — Покупка юаней
Хранит запросы на покупку юаней.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `purchase_id` | INT | Уникальный ID покупки | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID пользователя | FK -> users.telegram_id, ON DELETE SET NULL |
| `username` | VARCHAR(100) | Юзернейм пользователя | NULL |
| `yuan_amount` | DECIMAL(10,2) | Количество юаней | NOT NULL |
| `rub_amount` | DECIMAL(10,2) | Сумма в рублях | NOT NULL |
| `exchange_rate` | DECIMAL(10,4) | Курс обмена | NOT NULL |
| `payment_method` | VARCHAR(50) | Способ оплаты | NULL |
| `status` | ENUM | Статус покупки | 'pending', 'processing', 'completed', 'cancelled' |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |
| `updated_at` | TIMESTAMP | Дата обновления | ON UPDATE CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `purchase_id`
- INDEX: `idx_yuan_telegram_id`
- INDEX: `idx_yuan_created_at`
- INDEX: `idx_yuan_status`

#### Таблица `referrals` — Реферальная система
Хранит реферальные ссылки и статистику.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `id` | INT | Уникальный ID записи | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID пользователя-реферала | UNIQUE, FK -> users.telegram_id, ON DELETE CASCADE |
| `referral_url` | VARCHAR(255) | Реферальная ссылка | NULL |
| `referred_by` | BIGINT | Кто пригласил | NULL, FK -> users.telegram_id |
| `clicks` | INT | Количество кликов | DEFAULT 0 |
| `total_referrals` | INT | Количество приглашенных | DEFAULT 0 |
| `bonus_amount` | DECIMAL(10,2) | Накопленные бонусы | DEFAULT 0.00 |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `id`
- UNIQUE INDEX: `telegram_id`
- INDEX: `idx_referrals_telegram_id`
- INDEX: `idx_referrals_referred_by`

#### Таблица `exchange_rates` — Курсы валют
Хранит историю курсов юаня.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `rate_id` | INT | Уникальный ID | PRIMARY KEY, AUTO_INCREMENT |
| `rate` | DECIMAL(10,4) | Курс юаня к рублю | NOT NULL |
| `is_active` | BOOLEAN | Активный курс | DEFAULT TRUE |
| `created_by` | BIGINT | Кто установил курс | FK -> users.telegram_id |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `rate_id`
- INDEX: `idx_rate_active`
- INDEX: `idx_rate_created_at`

#### Таблица `user_activity` — Логи активности пользователей
Хранит логи действий пользователей для мониторинга и аналитики.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `activity_id` | INT | Уникальный ID | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID пользователя | FK -> users.telegram_id |
| `action_type` | VARCHAR(50) | Тип действия | NOT NULL |
| `action_data` | TEXT (JSON) | Дополнительные данные | NULL |
| `ip_address` | VARCHAR(45) | IP-адрес | NULL |
| `user_agent` | TEXT | User Agent | NULL |
| `created_at` | TIMESTAMP | Дата действия | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `activity_id`
- INDEX: `idx_activity_telegram_id`
- INDEX: `idx_activity_created_at`
- INDEX: `idx_activity_type`

#### Таблица `system_logs` — Системные логи
Хранит системные события и ошибки.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `log_id` | INT | Уникальный ID | PRIMARY KEY, AUTO_INCREMENT |
| `log_level` | VARCHAR(20) | Уровень лога | 'info', 'warning', 'error', 'critical' |
| `log_message` | TEXT | Сообщение | NOT NULL |
| `log_data` | TEXT (JSON) | Дополнительные данные | NULL |
| `telegram_id` | BIGINT | Связанный пользователь | NULL |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `log_id`
- INDEX: `idx_logs_level`
- INDEX: `idx_logs_created_at`

#### Таблица `reviews` — Отзывы пользователей
Хранит отзывы пользователей о сервисе.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `review_id` | INT | Уникальный ID | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID пользователя | FK -> users.telegram_id |
| `username` | VARCHAR(100) | Юзернейм | NULL |
| `rating` | INT | Оценка (1-5) | NOT NULL, CHECK (rating BETWEEN 1 AND 5) |
| `comment` | TEXT | Текст отзыва | NULL |
| `image_url` | VARCHAR(255) | URL фото отзыва | NULL |
| `is_approved` | BOOLEAN | Одобрен модератором | DEFAULT FALSE |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |

**Индексы:**
- PRIMARY KEY: `review_id`
- INDEX: `idx_reviews_telegram_id`
- INDEX: `idx_reviews_approved`

#### Таблица `notifications` — Уведомления
Хранит отправленные уведомления.

| Поле | Тип | Описание | Ограничения |
|------|-----|----------|-------------|
| `notification_id` | INT | Уникальный ID | PRIMARY KEY, AUTO_INCREMENT |
| `telegram_id` | BIGINT | ID получателя (NULL = всем) | NULL |
| `message` | TEXT | Текст уведомления | NOT NULL |
| `is_sent` | BOOLEAN | Отправлено | DEFAULT FALSE |
| `sent_by` | BIGINT | Кто отправил | FK -> users.telegram_id |
| `created_at` | TIMESTAMP | Дата создания | DEFAULT CURRENT_TIMESTAMP |
| `sent_at` | TIMESTAMP | Дата отправки | NULL |

**Индексы:**
- PRIMARY KEY: `notification_id`
- INDEX: `idx_notifications_telegram_id`
- INDEX: `idx_notifications_sent`

### 3.3 Связи между таблицами

```
users (telegram_id)
  ├─► orders (telegram_id) [1:N] - пользователь может иметь много заказов
  ├─► yuan_purchases (telegram_id) [1:N] - пользователь может покупать юани
  ├─► referrals (telegram_id) [1:1] - у пользователя одна реферальная ссылка
  ├─► referrals (referred_by) [1:N] - пользователь может пригласить многих
  ├─► user_activity (telegram_id) [1:N] - пользователь имеет много действий
  ├─► reviews (telegram_id) [1:N] - пользователь может оставлять отзывы
  └─► notifications (telegram_id) [1:N] - пользователь получает уведомления

exchange_rates (rate_id)
  └─► orders (exchange_rate) [связь по значению]

users (telegram_id - admin)
  ├─► exchange_rates (created_by) [1:N] - админ создает курсы
  └─► notifications (sent_by) [1:N] - админ отправляет уведомления
```

### 3.4 Бизнес-логика на уровне БД

**Триггеры:**
- Нет явных триггеров (логика на уровне Backend)

**Ограничения (Constraints):**
- Foreign Keys с `ON DELETE SET NULL` для orders/yuan_purchases (сохраняем данные при удалении пользователя)
- Foreign Keys с `ON DELETE CASCADE` для referrals (удаляем реферальную ссылку вместе с пользователем)
- CHECK constraint для reviews.rating (1-5)
- UNIQUE constraint для referrals.telegram_id

**Значения по умолчанию:**
- `users.commission` = 0.05 (5%)
- `users.is_admin` = FALSE
- `users.is_blocked` = FALSE
- Все `created_at` = CURRENT_TIMESTAMP
- Счетчики (clicks, total_referrals) = 0
- Бонусы = 0.00

### 3.5 Миграции и обновления схемы

Схема хранится в `database/schema.sql`.

**Процесс обновления:**
1. Изменения вносятся в `schema.sql`
2. Новые таблицы/поля создаются через `CREATE TABLE IF NOT EXISTS` или `ALTER TABLE`
3. Backend автоматически адаптируется к новым полям

**Важно:** При добавлении новых полей используются значения по умолчанию или NULL для совместимости с существующими записями.

---

## 4. Backend: API и бизнес-логика

### 4.1 Обзор Backend

**Файл:** `backend/server.js`  
**Порт:** 3000 (по умолчанию)  
**Framework:** Express.js  
**База данных:** MySQL через `mysql2/promise`

**Подключение к БД с UTF8MB4:**
```javascript
dbConnection = await mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'poizonic',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  collation: 'utf8mb4_unicode_ci'
});

// Устанавливаем UTF8MB4 для текущей сессии
await dbConnection.execute("SET NAMES 'utf8mb4'");
await dbConnection.execute("SET CHARACTER SET utf8mb4");
await dbConnection.execute("SET character_set_connection=utf8mb4");
```

Это гарантирует правильную работу с emoji и международными символами во всех запросах.

### 4.2 Структура Backend

```javascript
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

app.use(cors());                  // Разрешает кросс-доменные запросы
app.use(express.json());          // Парсинг JSON в теле запроса
app.use('/uploads', express.static('uploads')); // Статические файлы
```

### 4.3 API Endpoints

#### 📌 **Пользователи (Users)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| GET | `/api/user/:telegramId` | Получить данные пользователя | `telegramId` (path) |
| POST | `/api/user` | Создать/обновить пользователя | `telegramId`, `username`, `firstName`, `lastName` (body) |
| PUT | `/api/user/:telegramId/block` | Заблокировать пользователя | `telegramId` (path) |
| PUT | `/api/user/:telegramId/unblock` | Разблокировать пользователя | `telegramId` (path) |
| GET | `/api/users` | Получить список всех пользователей | - |
| GET | `/api/users/stats` | Получить статистику пользователей | - |

**Пример запроса:**
```javascript
// GET /api/user/7696515351
Response: {
  telegram_id: 7696515351,
  username: "artemprihodko",
  commission: 0.05,
  is_admin: true,
  created_at: "2024-01-01T00:00:00.000Z"
}
```

#### 📌 **Заказы (Orders)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| POST | `/api/orders` | Создать новый заказ | Все данные заказа (body) |
| GET | `/api/orders` | Получить список заказов | `status`, `telegramId` (query, опционально) |
| GET | `/api/orders/:id` | Получить заказ по ID | `id` (path) |
| PUT | `/api/orders/:id/status` | Обновить статус заказа | `id` (path), `status` (body) |
| DELETE | `/api/orders/:id` | Удалить заказ | `id` (path) |
| GET | `/api/orders/pending` | Получить ожидающие заказы | - |
| GET | `/api/orders/user/:telegramId` | Заказы конкретного пользователя | `telegramId` (path) |

**Пример создания заказа:**
```javascript
// POST /api/orders
Request body: {
  telegram_id: 7696515351,
  username: "artemprihodko",
  product_link: "https://poizon.com/product/123",
  product_name: "Nike Air Max",
  product_size: "42",
  product_price_yuan: 599,
  product_weight: 1.2,
  full_name: "Иванов Иван Иванович",
  phone_number: "+79991234567",
  pickup_point_address: "Москва, ул. Ленина, 1",
  exchange_rate: 12.5
}

Response: {
  order_id: 42,
  status: "pending",
  total_cost_rub: 8236.25,
  commission_amount: 374.69,
  created_at: "2024-01-01T12:00:00.000Z"
}
```

**Логика при создании заказа:**
1. Валидация данных
2. Получение текущего курса юаня из БД
3. Расчет стоимости доставки (вес × 800 ₽/кг)
4. Расчет комиссии (зависит от пользователя)
5. Расчет итоговой стоимости
6. Сохранение в БД
7. Отправка уведомления администраторам через Telegram Bot

#### 📌 **Покупка юаней (Yuan Purchases)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| POST | `/api/yuan/purchase` | Создать запрос на покупку юаней | `telegramId`, `yuanAmount` (body) |
| GET | `/api/yuan/purchases` | Список всех покупок | `status`, `telegramId` (query, опц.) |
| GET | `/api/yuan/purchases/:id` | Получить покупку по ID | `id` (path) |
| PUT | `/api/yuan/purchases/:id/status` | Обновить статус покупки | `id`, `status` (body) |
| DELETE | `/api/yuan/purchases/:id` | Удалить покупку | `id` (path) |

**Пример:**
```javascript
// POST /api/yuan/purchase
Request: {
  telegram_id: 7696515351,
  yuan_amount: 1000
}

Response: {
  purchase_id: 15,
  yuan_amount: 1000,
  rub_amount: 12500,
  exchange_rate: 12.5,
  status: "pending"
}
```

#### 📌 **Курс валюты (Exchange Rate)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| GET | `/api/exchange-rate` | Получить текущий курс юаня | - |
| POST | `/api/exchange-rate` | Установить новый курс | `rate`, `createdBy` (body) |
| GET | `/api/exchange-rate/history` | История курсов | - |

**Пример:**
```javascript
// GET /api/exchange-rate
Response: {
  rate: 12.5,
  created_at: "2024-01-01T00:00:00.000Z"
}

// POST /api/exchange-rate
Request: {
  rate: 12.8,
  created_by: 7696515351
}
```

#### 📌 **Реферальная система (Referrals)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| GET | `/api/referral/:telegramId` | Получить реферальные данные | `telegramId` (path) |
| POST | `/api/referral/create` | Создать реферальную ссылку | `telegramId` (body) |
| POST | `/api/referral/click` | Зарегистрировать клик | `telegramId` (body) |
| GET | `/api/referral/stats/:telegramId` | Статистика рефералов | `telegramId` (path) |
| PUT | `/api/referral/:telegramId/commission` | Обновить комиссию реферала | `telegramId`, `commission`, `days` (body) |
| GET | `/api/referrals` | Список всех рефералов (админ) | `filter` (query, опц.) |

**Логика реферальной системы:**
1. Пользователь получает уникальную ссылку с параметром `?ref=telegram_id`
2. При переходе по ссылке регистрируется клик
3. При регистрации нового пользователя по ссылке:
   - Новый пользователь сохраняется с `referred_by = telegram_id`
   - Рефералу начисляются бонусы
   - Опционально: реферал получает скидку на комиссию

**Пример:**
```javascript
// GET /api/referral/7696515351
Response: {
  telegram_id: 7696515351,
  referral_url: "https://t.me/poizonic_bot?start=ref_7696515351",
  clicks: 42,
  total_referrals: 12,
  bonus_amount: 500.00
}
```

#### 📌 **Админ-панель (Admin)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| GET | `/api/admin/dashboard` | Данные для дашборда | - |
| GET | `/api/admin/analytics` | Аналитика (графики) | `period` (query) |
| GET | `/api/admin/monitoring` | Мониторинг активности | - |
| POST | `/api/admin/notification` | Отправить уведомление | `message`, `telegramId` (body, опц.) |

**Дашборд включает:**
- Общее количество пользователей
- Активных пользователей (за 7 дней)
- Заблокированных пользователей
- Количество заказов (всего, в обработке, завершенных)
- Количество покупок юаней
- Средний чек
- Выручка

**Пример:**
```javascript
// GET /api/admin/dashboard
Response: {
  totalUsers: 1523,
  activeUsers: 421,
  blockedUsers: 5,
  totalOrders: 3421,
  pendingOrders: 42,
  completedOrders: 3201,
  totalRevenue: 4234567.89,
  avgOrderValue: 1238.52
}
```

#### 📌 **Отзывы (Reviews)**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| POST | `/api/reviews` | Создать отзыв | `telegramId`, `rating`, `comment`, `image` (body) |
| GET | `/api/reviews` | Получить все отзывы | `approved` (query, опц.) |
| GET | `/api/reviews/:id` | Получить отзыв по ID | `id` (path) |
| PUT | `/api/reviews/:id/approve` | Одобрить отзыв | `id` (path) |
| DELETE | `/api/reviews/:id` | Удалить отзыв | `id` (path) |

**Загрузка изображений:**
- Использует `multer` для загрузки файлов
- Сохраняет в `uploads/reviews/`
- Лимит: 5 МБ
- Форматы: только изображения

#### 📌 **Парсинг товаров Poizon**

| Метод | Endpoint | Описание | Параметры |
|-------|----------|----------|-----------|
| POST | `/api/parse-product` | Парсинг данных товара | `productLink` (body) |

**Логика парсинга:**
1. Принимает ссылку на товар Poizon
2. Извлекает spuId из URL
3. Делает запрос к Poizon API/веб-странице
4. Парсит HTML с помощью Cheerio
5. Извлекает:
   - Название товара
   - Цену (в юанях)
   - Доступные размеры
   - Описание
   - Изображения

**Пример:**
```javascript
// POST /api/parse-product
Request: {
  productLink: "https://poizon.com/product?spuId=123456"
}

Response: {
  productName: "Nike Air Max 90",
  price: 599,
  availableSizes: ["40", "41", "42", "43"],
  description: "Classic sneakers...",
  images: ["url1", "url2"]
}
```

### 4.4 Интеграция с Telegram Bot API

**Функция отправки сообщений:**
```javascript
async function sendTelegramMessage(chatId, message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    })
  });
}
```

**Когда отправляются уведомления:**
1. **Новый заказ:** уведомление всем администраторам
2. **Изменение статуса заказа:** уведомление пользователю
3. **Покупка юаней:** уведомление администраторам
4. **Системные уведомления:** от админа пользователям

### 4.5 Логирование и мониторинг

**Логирование активности пользователя:**
```javascript
async function logUserActivity(telegramId, actionType, actionData) {
  await dbConnection.execute(
    'INSERT INTO user_activity (telegram_id, action_type, action_data) VALUES (?, ?, ?)',
    [telegramId, actionType, JSON.stringify(actionData)]
  );
}
```

**Типы действий:**
- `order_created` - создание заказа
- `yuan_purchase` - покупка юаней
- `referral_click` - клик по реферальной ссылке
- `page_view` - просмотр страницы

**Системные логи:**
```javascript
async function createSystemLog(logLevel, logMessage, logData, telegramId) {
  await dbConnection.execute(
    'INSERT INTO system_logs (log_level, log_message, log_data, telegram_id) VALUES (?, ?, ?, ?)',
    [logLevel, logMessage, JSON.stringify(logData), telegramId]
  );
}
```

### 4.6 Обработка ошибок

**Стандартный формат ошибки:**
```javascript
res.status(500).json({
  error: 'Internal Server Error',
  message: 'Описание ошибки',
  details: { ... }
});
```

**Коды состояния:**
- `200` - успех
- `201` - создано
- `400` - неверный запрос
- `401` - не авторизован
- `403` - запрещено
- `404` - не найдено
- `500` - внутренняя ошибка сервера

**Переподключение к БД:**
```javascript
async function ensureDBConnection() {
  if (!dbConnection || dbConnection.state === 'disconnected') {
    await connectDB();
  }
  await dbConnection.execute('SELECT 1'); // Проверка соединения
}
```

### 4.7 Расчет стоимости

**Формула расчета стоимости заказа:**

```javascript
// 1. Стоимость товара в рублях
const productCostRub = productPriceYuan * exchangeRate;

// 2. Стоимость доставки
const deliveryCost = productWeight * 800; // 800 ₽ за кг

// 3. Базовая стоимость
const baseCost = productCostRub + deliveryCost;

// 4. Комиссия
const commission = baseCost * userCommission; // например, 0.05 = 5%

// 5. Итоговая стоимость
const totalCost = baseCost + commission;
```

**Пример расчета:**
- Цена товара: 599 ¥
- Курс: 12.5 ₽/¥
- Вес: 1.2 кг
- Комиссия пользователя: 5%

Расчет:
1. Стоимость товара: 599 × 12.5 = 7,487.5 ₽
2. Доставка: 1.2 × 800 = 960 ₽
3. Базовая стоимость: 7,487.5 + 960 = 8,447.5 ₽
4. Комиссия: 8,447.5 × 0.05 = 422.375 ₽
5. **Итого: 8,869.875 ₽ ≈ 8,870 ₽**

---

## 5. Frontend: Компоненты и UI

### 5.1 Обзор Frontend

**Технологии:**
- React 18 + TypeScript
- Styled Components (CSS-in-JS)
- Telegram Web App SDK
- Chart.js для графиков
- Axios для HTTP-запросов

**Точка входа:** `frontend/src/index.tsx`  
**Главный компонент:** `frontend/src/App.tsx`

### 5.2 Главный компонент `App.tsx`

```typescript
function App() {
  const [currentView, setCurrentView] = useState('main');
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Инициализация Telegram WebApp
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Получение данных пользователя
    const initDataUnsafe = tg.initDataUnsafe;
    const telegramId = initDataUnsafe?.user?.id;
    
    // Загрузка данных пользователя из API
    fetchUser(telegramId);
    
    // Определение темы
    setIsDark(tg.colorScheme === 'dark');
  }, []);

  return (
    <Container $isDark={isDark}>
      {currentView === 'main' && <MainMenu />}
      {currentView === 'order' && <OrderForm />}
      {currentView === 'calculator' && <PriceCalculator />}
      {/* ... другие представления ... */}
      <BottomNavigation />
    </Container>
  );
}
```

**Ключевые состояния:**
- `currentView` - текущий экран (main, order, calculator, admin, etc.)
- `user` - данные пользователя (telegram_id, username, commission, is_admin)
- `isDark` - темная/светлая тема (автоматически от Telegram)

### 5.3 Компоненты приложения

#### 📱 **MainMenu.tsx** - Главное меню

**Назначение:** Точка входа для пользователей, отображает основные функции.

**Структура:**
```tsx
<MainMenu>
  <Header>
    <WelcomeMessage>Добро пожаловать, {username}</WelcomeMessage>
    <UserStats>Ваша комиссия: {commission}%</UserStats>
  </Header>
  
  <MenuButtons>
    <Button onClick={() => navigateTo('order')}>🛒 Оформить заказ</Button>
    <Button onClick={() => navigateTo('yuan')}>💵 Купить юани</Button>
    <Button onClick={() => navigateTo('calculator')}>🧮 Калькулятор</Button>
    <Button onClick={() => navigateTo('referral')}>👥 Рефералы</Button>
    <Button onClick={() => navigateTo('faq')}>❓ FAQ</Button>
    <Button onClick={() => navigateTo('about')}>ℹ️ О нас</Button>
  </MenuButtons>
</MainMenu>
```

**Функции:**
- Приветствие пользователя
- Быстрый доступ ко всем функциям
- Отображение персональной информации (комиссия)
- Адаптивный дизайн

#### 📦 **OrderForm.tsx** - Форма оформления заказа

**Назначение:** Создание нового заказа на товар из Китая.

**Поля формы:**
1. **Ссылка на товар** (product_link)
   - С кнопкой "Парсинг" для автозаполнения
   - Валидация URL
   
2. **Автозаполняемые поля** (после парсинга):
   - Название товара
   - Цена в юанях
   - Доступные размеры (dropdown)
   
3. **Ручной ввод веса** (product_weight)
   - В килограммах
   - Подсказка: "Обычно 1.0-1.5 кг для обуви"
   
4. **Данные получателя:**
   - ФИО (full_name)
   - Телефон (phone_number)
   - Адрес пункта выдачи (pickup_point_address)

**Логика работы:**
```typescript
const handleParse = async () => {
  try {
    const response = await axios.post('/api/parse-product', { 
      productLink 
    });
    
    setProductName(response.data.productName);
    setProductPrice(response.data.price);
    setAvailableSizes(response.data.availableSizes);
    
    // Haptic feedback
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  } catch (error) {
    alert('Ошибка парсинга');
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
  }
};

const handleSubmit = async () => {
  // Валидация
  if (!productLink || !fullName || !phone || !address) {
    alert('Заполните все поля');
    return;
  }
  
  try {
    const response = await axios.post('/api/orders', {
      telegram_id: user.telegram_id,
      username: user.username,
      product_link: productLink,
      product_name: productName,
      product_size: selectedSize,
      product_price_yuan: productPrice,
      product_weight: weight,
      full_name: fullName,
      phone_number: phone,
      pickup_point_address: address
    });
    
    alert(`Заказ создан! Итого: ${response.data.total_cost_rub} ₽`);
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    
    // Очистка формы
    resetForm();
  } catch (error) {
    alert('Ошибка создания заказа');
  }
};
```

**UX-особенности:**
- Автозаполнение через парсинг (экономит время)
- Haptic feedback на каждое действие
- Валидация на клиенте перед отправкой
- Автоматический расчет итоговой стоимости в реальном времени

#### 🧮 **PriceCalculator.tsx** - Калькулятор стоимости

**Назначение:** Предварительный расчет стоимости заказа без создания заказа.

**Поля:**
- Цена товара (¥)
- Вес (кг)
- Курс юаня (автоматически загружается)
- Комиссия пользователя (автоматически)

**Расчет в реальном времени:**
```typescript
useEffect(() => {
  const productCostRub = priceYuan * exchangeRate;
  const deliveryCost = weight * 800;
  const baseCost = productCostRub + deliveryCost;
  const commission = baseCost * user.commission;
  const total = baseCost + commission;
  
  setCalculatedCost({
    productCostRub,
    deliveryCost,
    commission,
    total
  });
}, [priceYuan, weight, exchangeRate, user.commission]);
```

**Отображение:**
```
┌────────────────────────────────┐
│ Стоимость товара:  7,487.50 ₽  │
│ Доставка (1.2 кг): 960.00 ₽    │
│ Комиссия (5%):     422.38 ₽    │
├────────────────────────────────┤
│ ИТОГО:             8,869.88 ₽  │
└────────────────────────────────┘
```

#### 💱 **ExchangeRate.tsx** - Покупка юаней

**Назначение:** Запрос на покупку китайской валюты.

**Функционал:**
- Отображение текущего курса
- Поле ввода количества юаней
- Автоматический расчет суммы в рублях
- Создание запроса на покупку

```typescript
const handlePurchase = async () => {
  try {
    await axios.post('/api/yuan/purchase', {
      telegram_id: user.telegram_id,
      yuan_amount: yuanAmount
    });
    
    alert(`Запрос на покупку ${yuanAmount} ¥ отправлен!`);
    window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
  } catch (error) {
    alert('Ошибка создания запроса');
  }
};
```

#### 👥 **ReferralSystem.tsx** - Реферальная система

**Назначение:** Управление рефералами и получение бонусов.

**Отображаемые данные:**
- Реферальная ссылка (с кнопкой "Копировать")
- Количество кликов
- Количество приглашенных друзей
- Накопленные бонусы
- Срок действия скидки на комиссию

```tsx
<ReferralCard>
  <ReferralLink>
    {referralUrl}
    <CopyButton onClick={copyToClipboard}>📋 Копировать</CopyButton>
  </ReferralLink>
  
  <Stats>
    <Stat>
      <Label>Кликов:</Label>
      <Value>{clicks}</Value>
    </Stat>
    <Stat>
      <Label>Приглашено:</Label>
      <Value>{totalReferrals}</Value>
    </Stat>
    <Stat>
      <Label>Бонусы:</Label>
      <Value>{bonusAmount} ₽</Value>
    </Stat>
  </Stats>
  
  {accessExpiresAt && (
    <ExpiryInfo>
      Скидка на комиссию действует до: {formatDate(accessExpiresAt)}
    </ExpiryInfo>
  )}
</ReferralCard>
```

**Функция копирования:**
```typescript
const copyToClipboard = () => {
  navigator.clipboard.writeText(referralUrl);
  alert('Ссылка скопирована!');
  window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
};
```

#### ❓ **FAQ.tsx** - Часто задаваемые вопросы

**Структура:**
```tsx
<FAQ>
  {faqItems.map(item => (
    <FAQItem key={item.id}>
      <Question onClick={() => toggleItem(item.id)}>
        {item.question}
        <Icon>{isOpen ? '▼' : '▶'}</Icon>
      </Question>
      {isOpen && <Answer>{item.answer}</Answer>}
    </FAQItem>
  ))}
</FAQ>
```

**Категории вопросов:**
- Заказы
- Доставка
- Оплата
- Реферальная система
- Общие вопросы

#### ℹ️ **AboutUs.tsx** - О компании

**Содержимое:**
- Описание сервиса
- Преимущества
- Контакты
- Социальные сети

#### 📝 **Reviews.tsx** - Отзывы

**Функционал:**
- Отображение одобренных отзывов
- Форма добавления нового отзыва (рейтинг + текст + фото)
- Загрузка изображения

```typescript
const handleSubmitReview = async () => {
  const formData = new FormData();
  formData.append('telegram_id', user.telegram_id);
  formData.append('rating', rating);
  formData.append('comment', comment);
  if (image) formData.append('image', image);
  
  await axios.post('/api/reviews', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  alert('Отзыв отправлен на модерацию!');
};
```

#### 🛠️ **AdminPanel.tsx** - Административная панель

**Доступ:** Только для пользователей с `is_admin = true`

**Структура:**
```tsx
<AdminPanel>
  <Navigation>
    <NavSection title="Общее">
      <NavItem onClick={() => setSection('dashboard')}>Дашборд</NavItem>
      <NavItem onClick={() => setSection('analytics')}>Аналитика</NavItem>
      <NavItem onClick={() => setSection('monitoring')}>Мониторинг</NavItem>
    </NavSection>
    
    <NavSection title="Требуют действия">
      <NavItem onClick={() => setSection('delivery')}>Доставка</NavItem>
      <NavItem onClick={() => setSection('pending')}>Ожидающие</NavItem>
    </NavSection>
    
    <NavSection title="Данные">
      <NavItem onClick={() => setSection('users')}>Пользователи</NavItem>
      <NavItem onClick={() => setSection('orders')}>Заказы</NavItem>
      <NavItem onClick={() => setSection('yuan')}>Юани</NavItem>
      <NavItem onClick={() => setSection('referrals')}>Рефералы</NavItem>
    </NavSection>
    
    <NavItem onClick={() => setSection('calculator')}>Калькулятор дохода</NavItem>
    
    <NavSection title="Управление">
      <NavItem onClick={() => setSection('notifications')}>Уведомления</NavItem>
      <NavItem onClick={() => setSection('management')}>Управление</NavItem>
    </NavSection>
  </Navigation>
  
  <Content>
    {section === 'dashboard' && <Dashboard />}
    {section === 'analytics' && <Analytics />}
    {/* ... другие разделы ... */}
  </Content>
</AdminPanel>
```

**Разделы админки:**

**1. Дашборд** - Основные метрики:
- Всего пользователей / активных / заблокированных
- Заказы (всего / в обработке / завершенные)
- Покупки юаней
- Выручка / средний чек

**2. Аналитика** - Графики (Chart.js):
- Динамика регистраций
- Динамика заказов
- Выручка по дням/месяцам
- Популярные товары

**3. Мониторинг** - Активность пользователей:
- Последние действия
- Онлайн пользователи
- Логи системы

**4. Доставка** - Управление статусами заказов:
```tsx
<OrderList>
  {orders.map(order => (
    <OrderCard key={order.order_id}>
      <OrderInfo>
        #{order.order_id} - {order.product_name}
        <UserInfo>@{order.username}</UserInfo>
      </OrderInfo>
      
      <StatusSelector
        value={order.status}
        onChange={(status) => updateOrderStatus(order.order_id, status)}
      >
        <option value="pending">Ожидает</option>
        <option value="processing">В обработке</option>
        <option value="shipped">Отправлено</option>
        <option value="delivered">Доставлено</option>
        <option value="cancelled">Отменено</option>
      </StatusSelector>
    </OrderCard>
  ))}
</OrderList>
```

**При изменении статуса:**
- Обновление в БД
- Отправка уведомления пользователю в Telegram

**5. Ожидающие** - Фильтрация по типу:
- Покупка юаней
- Оформление заказов

**6. Пользователи** - Управление:
- Список пользователей
- Фильтры (все / заблокированные / активные)
- Блокировка / разблокировка
- Просмотр истории

**7. Заказы** - Все заказы:
- Фильтры по статусу
- Поиск по ID / username
- Просмотр деталей
- Удаление

**8. Юани** - Покупки юаней:
- Фильтры по статусу
- Изменение статуса
- Удаление

**9. Рефералы** - Управление реферальной системой:
- Список всех рефералов
- Фильтры (с бонусами / без)
- Продление скидки на комиссию (+7 или +30 дней)
- Изменение комиссии

**10. Калькулятор дохода** - Расчет прибыли:
- Выбор заказа из списка
- Автоматический перенос данных
- Расчет дохода с учетом всех расходов

**11. Уведомления** - Рассылка:
```tsx
<NotificationForm>
  <TextArea
    placeholder="Введите текст уведомления..."
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    autoResize
  />
  
  <SendButton onClick={sendNotification}>
    Отправить всем пользователям
  </SendButton>
</NotificationForm>
```

**12. Управление** - История пользователей:
- Выбор пользователя
- Загрузка истории заказов
- Просмотр деталей заказа в модальном окне

#### 🧭 **BottomNavigation.tsx** - Нижнее меню навигации

**Назначение:** Постоянная навигация по основным разделам.

```tsx
<NavigationContainer $isDark={isDark}>
  <NavButton onClick={() => navigate('main')}>
    <Icon>🏠</Icon>
    <Label>Главная</Label>
  </NavButton>
  
  <NavButton onClick={() => navigate('order')}>
    <Icon>🛒</Icon>
    <Label>Заказ</Label>
  </NavButton>
  
  <NavButton onClick={() => navigate('calculator')}>
    <Icon>🧮</Icon>
    <Label>Калькулятор</Label>
  </NavButton>
  
  <NavButton onClick={() => navigate('referral')}>
    <Icon>👥</Icon>
    <Label>Рефералы</Label>
  </NavButton>
  
  {user?.is_admin && (
    <NavButton onClick={() => navigate('admin')}>
      <Icon>⚙️</Icon>
      <Label>Админ</Label>
    </NavButton>
  )}
</NavigationContainer>
```

**Особенности:**
- Фиксированная позиция (bottom: -1px)
- Полупрозрачный фон с backdrop-filter: blur
- Адаптация под темную/светлую тему
- Haptic feedback при нажатии

### 5.4 Styled Components

**Пример стилизации:**
```typescript
const NavigationContainer = styled.div<{ $isDark: boolean }>`
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100%;
  background: ${props => props.$isDark
    ? 'rgba(40, 40, 45, 0.4)'
    : 'rgba(255, 252, 248, 0.4)'
  };
  border-top: 1px solid ${props => props.$isDark 
    ? 'rgba(196, 77, 77, 0.3)' 
    : 'rgba(162, 59, 59, 0.2)'
  };
  backdrop-filter: blur(25px) saturate(1.3) brightness(1.1);
  z-index: 9999;
  padding: 4px 0 6px 0;
`;
```

**Преимущества Styled Components:**
- Изоляция стилей (никаких глобальных конфликтов)
- Динамические стили через props
- TypeScript поддержка
- Автоматическое удаление неиспользуемых стилей

### 5.5 Интеграция с Telegram WebApp

**Доступные методы:**
```typescript
const tg = window.Telegram.WebApp;

// Инициализация
tg.ready();
tg.expand();

// Haptic feedback
tg.HapticFeedback.impactOccurred('light');      // Легкая вибрация
tg.HapticFeedback.impactOccurred('medium');     // Средняя
tg.HapticFeedback.impactOccurred('heavy');      // Сильная
tg.HapticFeedback.notificationOccurred('success'); // Успех
tg.HapticFeedback.notificationOccurred('error');   // Ошибка
tg.HapticFeedback.notificationOccurred('warning'); // Предупреждение
tg.HapticFeedback.selectionChanged();           // Изменение выбора

// Тема
const colorScheme = tg.colorScheme; // 'light' или 'dark'
const themeParams = tg.themeParams; // Цвета темы

// Данные пользователя
const user = tg.initDataUnsafe.user; // { id, first_name, last_name, username }

// Закрытие приложения
tg.close();

// Главная кнопка
tg.MainButton.setText('Отправить');
tg.MainButton.show();
tg.MainButton.onClick(handleSubmit);
```

**Типы для TypeScript** (`types/telegram.ts`):
```typescript
interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  colorScheme: 'light' | 'dark';
  initDataUnsafe: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
    };
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
    notificationOccurred: (type: 'success' | 'error' | 'warning') => void;
    selectionChanged: () => void;
  };
  MainButton: {
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}
```

---

## 6. Интеграции и внешние сервисы

### 6.1 Telegram Bot API

**Использование:**
- Отправка уведомлений пользователям
- Получение данных пользователя через initData
- Отправка сообщений администраторам

**Конфигурация:**
```javascript
const BOT_TOKEN = process.env.BOT_TOKEN;
const MANAGER_TELEGRAM_ID = process.env.MANAGER_TELEGRAM_ID;
```

**Основные сценарии:**

**1. Новый заказ → Уведомление администратору:**
```javascript
const message = `
🛒 <b>Новый заказ #${order_id}</b>

👤 Пользователь: @${username}
📦 Товар: ${product_name}
📏 Размер: ${product_size}
💰 Цена: ${product_price_yuan} ¥
⚖️ Вес: ${product_weight} кг

📍 Получатель: ${full_name}
📞 Телефон: ${phone_number}
🏢 Адрес: ${pickup_point_address}

💵 Итоговая стоимость: ${total_cost_rub} ₽
💸 Комиссия: ${commission_amount} ₽
`;

await sendTelegramMessage(MANAGER_TELEGRAM_ID, message);
```

**2. Изменение статуса → Уведомление пользователю:**
```javascript
const statusMessages = {
  'processing': '⏳ Ваш заказ принят в обработку',
  'shipped': '🚚 Ваш заказ отправлен',
  'delivered': '✅ Ваш заказ доставлен',
  'cancelled': '❌ Ваш заказ отменен'
};

const message = `
${statusMessages[newStatus]}

Заказ #${order_id}
${product_name}

${newStatus === 'delivered' ? 'Спасибо за покупку! 🎉' : ''}
`;

await sendTelegramMessage(user.telegram_id, message);
```

### 6.2 Poizon (Dewu) - Парсинг товаров

**Процесс парсинга:**

**1. Извлечение spuId из URL:**
```javascript
function extractSpuIdFromUrl(url) {
  // Полный URL: https://poizon.com/product?spuId=123456
  const match = url.match(/spuId=(\d+)/);
  if (match) return match[1];
  
  // Короткая ссылка: https://dw4.co/t/abc123
  if (url.includes('dw4.co')) {
    return await getRedirectUrl(url);
  }
  
  return null;
}
```

**2. Получение HTML страницы:**
```javascript
const response = await fetch(productUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ...'
  }
});
const html = await response.text();
```

**3. Парсинг с помощью Cheerio:**
```javascript
const $ = cheerio.load(html);

// Цена
const price = $('button:contains("¥")').first().text().match(/(\d+)/)[1];

// Название
const productName = $('h1').first().text().trim();

// Размеры
const availableSizes = [];
$('div[title]').each((i, el) => {
  const size = $(el).attr('title');
  if (size && /^\d+(\.\d+)?$/.test(size)) {
    availableSizes.push(size);
  }
});
```

**Обработка ошибок:**
- Ссылка недоступна → возврат ошибки
- spuId не найден → запрос альтернативного URL
- Парсинг не удался → ручной ввод данных

### 6.3 Frontend → Backend Communication

**HTTP-клиент: Axios**

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Перехватчик ошибок
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      alert('Необходима авторизация');
    } else if (error.response?.status === 500) {
      alert('Ошибка сервера. Попробуйте позже.');
    }
    return Promise.reject(error);
  }
);
```

---

## 7. Потоки данных и взаимодействия

### 7.1 Полный цикл создания заказа

```
┌──────────────────────────────────────────────────────────────┐
│ 1. ПОЛЬЗОВАТЕЛЬ ОТКРЫВАЕТ ФОРМУ ЗАКАЗА                       │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ 2. ВСТАВЛЯЕТ ССЫЛКУ НА ТОВАР                                 │
│    - Нажимает кнопку "Парсинг"                               │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼ POST /api/parse-product
┌──────────────────────────────────────────────────────────────┐
│ 3. BACKEND ПАРСИТ СТРАНИЦУ POIZON                            │
│    - Извлекает spuId из URL                                  │
│    - Скачивает HTML страницы                                 │
│    - Парсит: название, цену, размеры                         │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼ Response: { productName, price, sizes }
┌──────────────────────────────────────────────────────────────┐
│ 4. FRONTEND АВТОЗАПОЛНЯЕТ ПОЛЯ                               │
│    - Название товара                                         │
│    - Цена в юанях                                            │
│    - Доступные размеры (dropdown)                            │
│    - Haptic feedback: успех                                  │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ 5. ПОЛЬЗОВАТЕЛЬ ВЫБИРАЕТ РАЗМЕР И ЗАПОЛНЯЕТ ОСТАЛЬНОЕ        │
│    - Вес товара                                              │
│    - ФИО получателя                                          │
│    - Телефон                                                 │
│    - Адрес пункта выдачи                                     │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ 6. FRONTEND РАССЧИТЫВАЕТ ПРЕДВАРИТЕЛЬНУЮ СТОИМОСТЬ           │
│    - Получает курс: GET /api/exchange-rate                   │
│    - Стоимость товара = цена ¥ × курс                        │
│    - Доставка = вес × 800 ₽/кг                               │
│    - Комиссия = (товар + доставка) × user.commission         │
│    - ИТОГО отображается в реальном времени                   │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ 7. ПОЛЬЗОВАТЕЛЬ НАЖИМАЕТ "ОФОРМИТЬ ЗАКАЗ"                    │
│    - Frontend валидирует все поля                            │
│    - Haptic feedback: selection changed                      │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼ POST /api/orders
┌──────────────────────────────────────────────────────────────┐
│ 8. BACKEND СОЗДАЕТ ЗАКАЗ                                     │
│    - Валидация данных                                        │
│    - Получение актуального курса из БД                       │
│    - Расчет итоговой стоимости и комиссии                    │
│    - Сохранение в таблицу orders                             │
│    - Логирование: user_activity                              │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ├──────► INSERT INTO orders (...)
                   │
                   ├──────► INSERT INTO user_activity (...)
                   │
                   └──────► sendTelegramMessage(MANAGER_ID, ...)
                   │
                   ▼
┌──────────────────────────────────────────────────────────────┐
│ 9. УВЕДОМЛЕНИЕ ОТПРАВЛЕНО АДМИНИСТРАТОРУ                     │
│    "🛒 Новый заказ #42 от @artemprihodko"                    │
└──────────────────┬───────────────────────────────────────────┘
                   │
                   ▼ Response: { order_id, total_cost, ... }
┌──────────────────────────────────────────────────────────────┐
│ 10. FRONTEND ПОКАЗЫВАЕТ УСПЕШНОЕ СООБЩЕНИЕ                   │
│     "Заказ создан! Итого: 8,870 ₽"                           │
│     - Haptic feedback: success                               │
│     - Очистка формы                                          │
└──────────────────────────────────────────────────────────────┘
```

### 7.2 Обработка заказа администратором

```
Администратор открывает "Доставка"
         ↓
   GET /api/orders?status=pending
         ↓
   Список ожидающих заказов
         ↓
   Изменяет статус заказа #42 на "Отправлено"
         ↓
   PUT /api/orders/42/status
         ↓
   UPDATE orders SET status='shipped'
         ↓
   Отправка уведомления пользователю
         ↓
   Пользователь получает: "🚚 Ваш заказ отправлен"
```

### 7.3 Реферальная система

```
Пользователь А получает реферальную ссылку
         ↓
   Отправляет другу Б
         ↓
   Пользователь Б переходит по ссылке (ref=A)
         ↓
   POST /api/referral/click (регистрация клика)
         ↓
   Пользователь Б регистрируется
         ↓
   INSERT INTO users (..., referred_by=A)
         ↓
   UPDATE referrals (total_referrals++, bonus_amount+=100)
         ↓
   Пользователь А получает бонус 100 ₽
```

---

## 8. Безопасность и валидация

### 8.1 Валидация данных Telegram

**В текущей реализации:**
- Данные получаются от Telegram Web App SDK
- Backend полагается на telegram_id из initDataUnsafe

**Для продакшена - валидация initData:**
```javascript
function validateTelegramData(initData) {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get('hash');
  urlParams.delete('hash');
  
  const dataCheckString = Array.from(urlParams.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest();
  
  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  
  return calculatedHash === hash;
}
```

### 8.2 Защита от SQL-инъекций

**Все запросы используют prepared statements:**
```javascript
// ✅ БЕЗОПАСНО
await dbConnection.execute(
  'SELECT * FROM users WHERE telegram_id = ?',
  [telegramId]
);

// ❌ УЯЗВИМО (не используется в проекте)
const query = `SELECT * FROM users WHERE telegram_id = ${telegramId}`;
```

### 8.3 XSS-защита

- React автоматически экранирует все данные
- Никакого `dangerouslySetInnerHTML`
- Все пользовательские данные отображаются как текст

### 8.4 CORS

```javascript
app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true
}));
```

**Для продакшена:** ограничить origin только доменом Mini App.

### 8.5 Валидация входных данных

**Frontend:**
```typescript
function validateOrderForm(data: OrderFormData): string[] {
  const errors: string[] = [];
  
  if (!data.productLink || !isValidUrl(data.productLink)) {
    errors.push('Некорректная ссылка на товар');
  }
  
  if (!data.fullName || data.fullName.length < 3) {
    errors.push('Введите полное ФИО');
  }
  
  if (!data.phoneNumber || !/^\+?\d{10,15}$/.test(data.phoneNumber)) {
    errors.push('Некорректный номер телефона');
  }
  
  return errors;
}
```

**Backend:**
```javascript
function validateOrderData(data) {
  if (!data.telegram_id || !Number.isInteger(data.telegram_id)) {
    throw new Error('Invalid telegram_id');
  }
  
  if (!data.product_price_yuan || data.product_price_yuan <= 0) {
    throw new Error('Invalid price');
  }
  
  if (!data.product_weight || data.product_weight <= 0 || data.product_weight > 100) {
    throw new Error('Invalid weight');
  }
  
  return data;
}
```

---

## Заключение

Этот документ описывает полную архитектуру, структуру и логику работы **Poizonic Mini App**. 

### Что охватывает документ:

✅ **Обзор проекта** - назначение, возможности, технологии  
✅ **Архитектура** - клиент-серверная модель, структура проекта  
✅ **База данных** - все таблицы, связи, индексы, бизнес-логика  
✅ **Backend API** - все эндпоинты, параметры, примеры запросов  
✅ **Frontend** - компоненты, UI/UX, Telegram WebApp интеграция  
✅ **Интеграции** - Telegram Bot API, Poizon парсинг  
✅ **Потоки данных** - полные циклы взаимодействия  
✅ **Безопасность** - валидация, защита от атак  

### Для кого этот документ:

- **Разработчики** - быстрое погружение в проект
- **Технические специалисты** - понимание архитектуры
- **Владелец продукта** - техническое представление системы

### Что делать дальше:

Документ покрывает **локальную разработку**. Для полноценного продакшена потребуется дополнить:

- 🚀 Деплой на сервер (Docker, CI/CD)
- 🔒 Настройка SSL/TLS
- 💾 Резервное копирование БД
- 📊 Мониторинг и алертинг
- ⚡ Масштабирование и оптимизация
- 🔐 Продакшен-безопасность (JWT, rate limiting)

---

**Версия документа:** 1.0  
**Дата создания:** Октябрь 2025  
**Автор:** Техническая документация Poizonic Mini App

