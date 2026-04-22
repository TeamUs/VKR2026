# Сквозной процесс реализации административной панели (frontend + backend, по этапам)

Документ описывает, **как администратор попадает в админку**, как устроен компонент `AdminPanel`, **какие HTTP-эндпоинты** используются, и где логика на **backend**. Стиль — как у других code-map файлов в `mini_app_vkr`.

---

## Важно: безопасность в текущей реализации (после исправления)

1. **Backend-first авторизация** реализована в `backend/server.js`:
   - `POST /api/admin/auth/login` (строка около `3008`) принимает `telegramId` + `password`;
   - проверяет Telegram ID по списку `ADMIN_TELEGRAM_IDS`;
   - пароль сравнивается **по SHA-256 хешу** (`ADMIN_PASSWORD_HASH`, с `timingSafeEqual`);
   - при успехе выставляется **`HttpOnly` cookie** `admin_session` с подписью HMAC (`admin_session` нельзя читать из JS).
2. Для всех остальных `'/api/admin/*'` включён middleware (`app.use('/api/admin', ...)`, строка около `3059`), который валидирует cookie-сессию и отклоняет неавторизованные запросы.
3. `POST /api/admin/auth/logout` сбрасывает cookie сессию.
4. На frontend `Profile.tsx` больше не сравнивает хеш локально: `checkPassword` вызывает backend-логин (`api/admin/auth/login`) с `credentials: 'include'`.

Для ВКР: теперь проверка админа по Telegram ID + паролю выполняется на сервере, а секрет хранится в виде хеша.

---

## 1) Пользователь с правами открывает профиль

### Frontend

- `frontend/src/App.tsx` — нижняя навигация переключает `activeTab`; при `activeTab === 'profile'` подгружается `Profile` в `Suspense` — строки `1238–1248`.
- `frontend/src/components/Profile.tsx`:
  - флаг **`isAdmin`** выставляется в `useEffect`: сравнение `Telegram.WebApp.initDataUnsafe.user.id` со списком **`['690296532', '7696515351']`** — строки `1255–1270`;
  - в шапке профиля при `isAdmin` показывается кнопка **👨🏻‍💻** — строки `2223–2231`.

### Backend

- На этом шаге backend не вызывается (только UI и данные профиля по другим API).

---

## 2) Вход в админ-панель: пароль и навигация

### Frontend

- Нажатие на кнопку админки: `handleAdminClick` — открывает модальное окно ввода пароля — строки `2120–2128`.
- `handlePasswordSubmit`: вызывает **`checkPassword`**; при успехе — **`onNavigate('admin')`** — строки `2132–2146`.
- **`checkPassword`**: отправляет `telegramId` и пароль на backend в `POST api/admin/auth/login` (`credentials: 'include'`) — строки `1914–1930` (обновлённая логика).
- `frontend/src/App.tsx`:
  - **`navigateTo('admin')`** обрабатывается так: `setActiveTab('admin' as any)` — строки `1086–1087`;
  - при **`activeTab === 'admin'`** рендерится **ленивая** загрузка `AdminPanel` — строки `17`, `1252–1259`.

### Backend

- `backend/server.js`:
  - `POST /api/admin/auth/login` — проверяет `telegramId` + пароль (по хешу), выставляет подписанную `HttpOnly` cookie.
  - `POST /api/admin/auth/logout` — удаляет cookie.
  - `app.use('/api/admin', ...)` — обязательная проверка сессии для всех admin API кроме login/logout.

---

## 3) Загрузка админ-панели и первичные данные

### Frontend

- `frontend/src/components/AdminPanel.tsx`:
  - при монтировании `useEffect` вызывает локальный `checkAdminAccess` (в UI он сейчас не основной механизм защиты), затем:
  - затем **`loadAdminData()`**, **`loadUsersList()`**, **`loadReviewsForModeration()`** — строки `1043–1045`;
  - **`loadAdminData`** параллельно запрашивает:
    - `GET api/admin/stats`
    - `GET api/admin/users`
    - `GET api/admin/orders`
    - `GET api/admin/pending-orders`  
    с заголовком **`X-Telegram-User-Id`** — строки `1077–1089`;
  - раздел покупки юаней на клиенте **очищается** (`setYuanPurchases([])` и т.д.) — комментарий «ВКР» — строки `1100–1102`.

### Backend

- Перед выполнением любого `/api/admin/*` endpoint сначала проходит middleware проверки админ-сессии (cookie `admin_session`).
- `backend/server.js` — блок **«АДМИНСКИЕ ЭНДПОИНТЫ»** начинается около строки **`4306`**.
- `GET /api/admin/stats` — **`4324+`**: агрегаты по пользователям, заказам, экономии, прибыли из `profit_calculations`, активные пользователи и т.д.
- `GET /api/admin/users` — **`4430+`**: список пользователей для таблицы.
- `GET /api/admin/orders` — **`4472+`**: заказы.
- `GET /api/admin/pending-orders` — **`4534+`**: ожидающие подтверждения.
- CORS для клиента разрешает заголовок **`X-Telegram-User-Id`** — строка **`118`** (в начале настройки приложения).

---

## 4) Вкладки админ-панели (внутренний роутинг `activeTab`)

Компонент **не использует React Router** для подразделов: состояние **`activeTab`** переключает крупные секции JSX.

### Список вкладок (кнопки Tab)

По коду `AdminPanel.tsx` (примерные строки кнопок):

| `activeTab` | Назначение (по коду) | Старт загрузки данных |
|-------------|----------------------|------------------------|
| `dashboard` | обзор по `stats` | из `loadAdminData` |
| `pending` | заказы/заявки в ожидании | `pendingOrders` |
| `delivery` | доставка | `loadDeliveryOrders` при клике — `2190` |
| `reviews` | модерация отзывов | `loadReviewsForModeration` / фильтр — `1054–1056`, `2213+` |
| `referrals` | реферальные данные | `loadReferralsData` — `2303` |
| `users` | пользователи | данные из `loadAdminData` |
| `orders` | заказы | данные из `loadAdminData` + фильтры |
| `notifications` | рассылки | UI — `3228+` |
| `monitoring` | мониторинг | `loadSystemStatus` — `2267` |
| `analytics` | продажи | `loadSalesAnalytics` — `2263` |
| `user-management` | управление пользователями | секция — `3913+` |
| `profit-calculator` | калькулятор прибыли | `loadProfitOrders` — `2367` |
| `purchases` | выкупы / изображения | загрузка списка `api/purchases/images` — `1058–1072` |

Точные границы JSX-секций: условия вида `{activeTab === 'dashboard' && ...}` — например строки `2380`, `2420`, `2612`, `2807`, `3228`, `3377`, `3390`, `3913`, `4154`, `5050`, `5349`, `5606`, `5929`.

---

## 5) Типовые действия администратора и API

Ниже — связка «действие в UI» → «вызов в `AdminPanel.tsx`» → «маршрут в `server.js`». Номера строк в `AdminPanel` ориентировочные (файл большой).

### Заказы: подтверждение, статус, отмена

- **`confirm-order`** — `fetch('api/admin/confirm-order', ...)` — около строки **`1236`** в `AdminPanel.tsx`.
- **`update-order-status`** — около **`1218`**, **`1873`**.
- **`cancel-order`** — около **`1283`**.
- **`order-details`** — `GET api/admin/order-details/:orderId` — около **`1905`**.
- **`orders/:orderId/update-status`** — около **`1492`**.

Backend: `POST /api/admin/confirm-order` — **`4674+`** (в т.ч. геймификация при оплате заказа); `POST /api/admin/cancel-order` — **`4843+`**; `GET /api/admin/order-details/:orderId` — **`5695+`**; `POST /api/admin/update-order-status` — **`5761+`**; `POST /api/admin/orders/:orderId/update-status` — **`6212+`**.

### Пользователи: комиссия, история, список для уведомлений

- `POST api/admin/update-user-commission` — около **`1541`**.
- `GET api/admin/user-history/:telegramId` — около **`1397`**.
- `GET api/admin/users-list` — около **`1309`** (для выбора получателя уведомления).

Backend: соответственно **`5299+`**, **`5372+`**, **`5138+`**.

### Уведомления

- Массовая / персональная рассылка: `api/admin/send-notification-all` или `send-notification-user` — около **`1334–1335`**.

Backend: **`5014+`**, **`5083+`**.

### Мониторинг и аналитика

- `GET api/admin/system-status` — около **`1381`**.
- `GET api/admin/sales-analytics` — построение URL с периодом — около **`1422`**.

Backend: **`5186+`**, **`5487+`**.

### Доставка

- `GET api/admin/delivery` — около **`1467`**.

Backend: **`6047+`**.

### Рефералы и продление скидки

- `GET api/admin/referrals-data` — около **`1607`**.
- `POST api/admin/extend-discount` — около **`1650`**.

Backend: **`6092+`**, **`6135+`**.

### Прибыль

- `GET api/admin/orders-for-profit` — около **`1574`**.
- `POST api/admin/save-profit-calculation` — около **`1801`**.

Backend: **`5930+`**, **`5826+`**, дополнительно `GET /api/admin/total-profit` — **`5905+`**.

### Модерация отзывов

См. отдельный документ `VKR_Reviews_Moderation_EndToEnd_CodeMap.md`:  
`GET/POST/DELETE api/admin/reviews*` — в `AdminPanel` — **`1114–1185`**; на сервере — **`3087–3250`**.

### Выкупы (изображения)

- Список публичных изображений: `GET api/purchases/images` — внутри `AdminPanel` при вкладке `purchases` — **`1062`**.
- Загрузка/удаление через **`api/admin/purchases/upload`** и **`api/admin/purchases/images/:filename`** — **`6306`**, **`6025`** (точные строки см. в файле).

Backend: проверка прав **admin/manager** по env — **`3305+`**, **`3597+`**.

### Прочее

- `POST api/admin/check-expired-commissions` — упоминается в контексте админ-панели в `server.js` около **`6739`** (ручная проверка сроков комиссий).

---

## 6) `X-Telegram-User-Id` и сессионная cookie

Большинство `fetch` в `AdminPanel` передают:

```text
'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
```

Пример: **`1082`**, **`1119`**, **`1145`**, **`1171`**.

`X-Telegram-User-Id` остаётся вспомогательным заголовком для контекста/логики в отдельных обработчиках, но **контроль доступа** теперь выполняется через backend-сессию (`admin_session`) в middleware `app.use('/api/admin', ...)`.

---

## 7) Сводка для пояснительной записки (одним абзацем)

Административная панель реализована как отдельный React-компонент **`AdminPanel`**, подключаемый лениво из **`App.tsx`** при переключении вкладки приложения на `admin` после навигации из профиля. Вход в админку выполняется через backend-авторизацию: frontend отправляет `telegramId` и пароль в `POST /api/admin/auth/login`, сервер проверяет Telegram ID, сверяет хеш пароля (`ADMIN_PASSWORD_HASH`) и выдаёт подписанную `HttpOnly` cookie-сессию. Далее все вызовы `/api/admin/*` проходят через middleware проверки этой сессии. Внутри панели состояние **`activeTab`** определяет отображаемый раздел (дашборд, очередь заказов, пользователи, модерация отзывов, доставка, аналитика, мониторинг, уведомления, рефералы, калькулятор прибыли, выкупы). Данные подгружаются с backend через REST API с префиксом **`/api/admin/`** (статистика, пользователи, заказы, доставка, продления скидок, уведомления и др.). Критичные действия по заказам (подтверждение оплаты, смена статуса, отмена) вызывают соответствующие **`POST`**-маршруты в **`server.js`**, где обновляется БД и при подтверждении заказа может запускаться геймификация. Отдельно для ВКР на уровне UI отключён акцент на покупках юаней, при этом часть backend-эндпоинтов юаней может сохраняться в коде, но не использоваться мини-приложением.
