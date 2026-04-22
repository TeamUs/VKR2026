# Сквозной процесс реферальной программы и геймификации (с привязкой к коду)

Документ описывает полный сценарий: **вход нового пользователя по обычной ссылке или по реферальной**, **скидки на комиссию**, **XP и уровни**, **достижения**, **уведомления в Telegram**, **статистика на фронте и бэке**. Указаны `frontend` и `backend` с путями к файлам.

---

## Важно для ВКР: центральные модули

| Роль | Файл |
|------|------|
| HTTP API, рефералы, подтверждение заказов, вызовы геймификации | `backend/server.js` |
| Логика XP, уровней, достижений, временной скидки на комиссию | `backend/gamification.js` |
| Инициализация пользователя, реферальный `start`, автоматический ежедневный вход | `frontend/src/App.tsx` |
| Экран «Реферальная система», ссылка, запрос статистики | `frontend/src/components/ReferralSystem.tsx` |
| Профиль: уровень, XP, достижения, опциональный ручной «ежедневный вход» | `frontend/src/components/Profile.tsx` |

---

## 1) Обычный запуск Mini App (без реферального `start`)

### Что делает пользователь

Открывает приложение из меню бота или по прямой ссылке **без** параметра `start=ref_...`.

### Frontend

- `frontend/src/App.tsx`
  - После `tg.ready()` / `tg.expand()` читается `Telegram.WebApp.initDataUnsafe.user` — строки **`932–940`**.
  - Вызывается **`initializeUser(user)`** → `POST api/user/init` с `telegramId`, `username`, `fullName` — строки **`800–812`**, **`937–940`**.

### Backend

- `backend/server.js` — `POST /api/user/init` — строки **`2342–2398`**.
  - Если пользователь **уже есть** — обновление `username`, `full_name`, `last_activity` — строки **`2360–2368`**.
  - Если пользователя **нет** — `INSERT INTO users` с **`commission = 1000`**, **`current_level = 'Bronze'`** — строки **`2369–2378`**.

Итог: новый «обычный» пользователь в БД с базовой комиссией **1000 ₽** и уровнем **Bronze**.

---

## 2) Запуск по реферальной ссылке: что ожидает frontend

### Формат deep link в коде приложения

- `frontend/src/App.tsx` — в `useEffect` читается `URLSearchParams`, параметр **`start`** — строки **`974–980`**:

```974:980:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\frontend\src\App.tsx
      // Обработка start параметра для рефералов
      const urlParams = new URLSearchParams(window.location.search);
      const startParam = urlParams.get('start');
      
      if (startParam && startParam.startsWith('ref_')) {
        const referralId = startParam.replace('ref_', '');
        handleReferral(referralId);
```

Срабатывает только если `start` начинается с префикса **`ref_`** (например `start=ref_123456789`).

### Вызов API с клиента

- `handleReferral` — строки **`1050–1072`**: `POST api/referral`, в теле передаются **`telegramId`** и **`referredBy`** (числовой id пригласившего).

### Backend-контракт реферального endpoint

- `backend/server.js` — `POST /api/referral` — строки **`2435–2657`**.
  - Из тела ожидаются **`telegramId`** и **`referralId`** — строка **`2437`**, проверка **`2439`**:

```2437:2440:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\backend\server.js
    const { telegramId, referralId, username } = req.body;
    
    if (!telegramId || !referralId) {
      return res.status(400).json({ error: 'Необходимы telegram ID и referral ID' });
```

**Замечание для ВКР:** имена полей на клиенте (`referredBy`) и на сервере (`referralId`) **не совпадают**; при строгой валидации Express запрос с телом только `referredBy` может получить **400**. Дополнительно `handleReferral` использует **`telegramUser?.id` из state** — при первом же вызове из `useEffect` state может быть ещё **не обновлён**, и уйдёт **`telegramId: 0`**. Это стоит отразить в разделе «ограничения реализации» пояснительной записки.

### Экран «Реферальная система»: какая ссылка генерируется

- `frontend/src/components/ReferralSystem.tsx` — строки **`537–547`**:
  - Имя бота: `import.meta.env.VITE_BOT_USERNAME || 'poizonic_bot'`.
  - Ссылка: `https://t.me/${botUsername}?start=${telegramId}` — **без** префикса `ref_`.

**Замечание для ВКР:** если приглашение идёт именно этой ссылкой, **`App.tsx` не распознаёт** её как реферальную (нет префикса `ref_`). Для согласованности нужно либо единый формат (`ref_<id>`) в ссылке и в парсере, либо доработка парсера под `start=<telegramId>`.

---

## 3) Backend: успешная активация реферальной программы (`POST /api/referral`)

Файл: `backend/server.js`, строки **`2435–2637`** (логика до ответа **`2639–2642`**).

### Проверки

1. **`telegramId === referralId`** — запрет «пригласить самого себя» — строки **`2445–2448`**.
2. Пользователь с **`telegramId`** **не должен** уже существовать в `users` — строки **`2451–2464`**. Иначе — сообщение в Telegram и **400**.

### Условия бонуса для нового пользователя (реферала)

- Загружается реферер: `users.current_level` — строки **`2468–2471`**.
- По умолчанию **`referralCommission = 400`**, **`referralDays = 14`** — строки **`2474–2475`**.
- Если реферер **Diamond** — **`referralCommission = 0`**, **`referralDays = 14`** — строки **`2477–2480`**.

### Запись в БД

- `INSERT INTO users` с полями **`commission`**, **`referred_by`**, **`access_expires_at = NOW() + referralDays`**, **`current_level = 'Bronze'`** — строки **`2485–2489`**.

### Бонус рефереру (продление сниженной комиссии)

- Если реферер **не Diamond** — обновление **`commission = 400`** и **`access_expires_at`** (продление на **7 дней** или новая дата) — блок **`2493–2526`**.

### Уведомления в Telegram

- Новому пользователю — **`sendTelegramMessage(telegramId, newUserMessage)`** — строки **`2528–2546`**.
- Рефереру — **`sendTelegramMessage(referralId, referrerMessage)`** — строки **`2548–2572`**.

### Логи активности и системный лог

- `logUserActivity` для реферала и реферера — строки **`2574–2583`**.
- `createSystemLog` — строки **`2585–2589`**.

---

## 4) Геймификация при успешном реферале

Сразу после создания пользователя по рефералу — блок **`2591–2636`** в `server.js`:

1. **`gamificationService.awardXP(referralId, XP_RULES.REFERRAL_REGISTRATION, 'referral', ...)`** — **50 XP** рефереру (константа в `gamification.js`).
2. **`checkReferralAchievements(referralId, telegramId)`** — см. ниже.
3. При **`xpResult.leveledUp`** — отдельное сообщение о новом уровне — строки **`2607–2614`**.
4. Цикл по новым достижениям — сообщения с иконкой, названием, XP — строки **`2617–2630`**.

---

## 5) Ядро геймификации: уровни, XP, награды уровня

Файл: **`backend/gamification.js`**.

### Пороги уровней по XP

- Объект **`LEVELS`** — строки **`12–18`** (Bronze → Diamond по диапазонам `minXP`/`maxXP`).

### Текстовое описание выгоды уровня (в т.ч. снижение комиссии)

- **`LEVEL_REWARDS`** — строки **`21–42`** (например Silver: комиссия **900 ₽**, Gold **700 ₽**, Platinum **400 ₽**, Diamond **0 ₽**).

### Правила начисления XP

- **`XP_RULES`** — строки **`45–50`**:
  - **`ORDER_COMPLETE: 100`** — за подтверждённый заказ (см. шаг 8).
  - **`REFERRAL_REGISTRATION: 50`** — за приведённого реферала.
  - **`YUAN_PER_100RUB`** — в ВКР покупки юаней отключены на API; связанные проверки в приложении возвращают пустой список.

### Начисление XP и повышение уровня

- Метод **`awardXP`** — строки **`73–167`**:
  - Читает **`users.xp`**, **`users.current_level`** — строки **`81–92`**.
  - Обновляет **`xp`**, пишет **`xp_history`** — строки **`95–115`**.
  - Пересчитывает уровень **`calculateLevel(newXP)`** — строки **`117–125`**; при смене уровня — **`UPDATE users SET current_level`**, **`INSERT INTO level_history`** — строки **`121–130`**.
  - Возвращает **`leveledUp`**, **`rewards`** из **`LEVEL_REWARDS`** — строки **`137–145`**.

---

## 6) Достижения: разблокировка, XP за достижение, временная скидка на комиссию

### Общий метод

- **`checkAndUnlockAchievement(telegramId, achievementKey)`** — `gamification.js` **строки `225–360`**:
  - Проверка `user_achievements` (две возможные схемы таблицы) — строки **`232–248`**.
  - Загрузка метаданных из **`achievements`** — строки **`257–266`**.
  - Вставка в **`user_achievements`** — строки **`272–287`**.
  - Если у достижения **`xp_reward > 0`** — повторный вызов **`awardXP`** с источником **`achievement`** — строки **`290–306`**.
  - Если задано **`additional_reward`** — вызывается **`applyTemporaryDiscount`** — строки **`315–329`**.

### Временная скидка (600 ₽ вместо базовой комиссии)

- **`applyTemporaryDiscount`** — строки **`940–949`**: выставляет **`users.temp_discount_active = TRUE`** и **`temp_discount_end_date`**.

### Где это учитывается при расчёте цены

- `backend/server.js` — `POST /api/calculate-price` — блок **`2083–2158`**:
  - Чтение **`temp_discount_active`**, **`temp_discount_end_date`** — строки **`2096–2108`**.
  - Если скидка активна и **600 < комиссии по уровню** — итоговая комиссия **600 ₽** — строки **`2143–2146`**.

### Награды уровня в том же расчёте

- Тот же маршрут: для **Silver/Gold/Platinum/Diamond** подставляются **900 / 700 / 400 / 0 ₽** — **`switch (userLevel)`** — строки **`2135–2140`**.
- Для **Bronze** и **нулевого** числа неотменённых заказов — **первый заказ без комиссии** (**`levelCommission = 0`**) — строки **`2121–2132`**.

---

## 7) Ежедневный вход и стрик (два разных API)

### A) Автоматически при открытии приложения

- `frontend/src/App.tsx` — отдельный `useEffect` — строки **`824–884`**:
  - Один раз в сутки на клиенте (ключ **`localStorage` `dailyLogin_${telegramId}`**) — строки **`837–849`**.
  - Запрос **`POST api/gamification/daily-login`** с **`{ telegramId }`** — строки **`851–855`**.

- `backend/server.js` — **`POST /api/gamification/daily-login`** — строки **`6405–6474`**:
  - Вызывает **`gamificationService.updateDailyLogin(telegramId)`** — строка **`6415`**.
  - При новых достижениях из стрика — цикл **`sendTelegramMessage`** — строки **`6429–6450`**.
  - При стрике **≥ 5** дней и без новых достижений — отдельное сообщение о стрике — строки **`6453–6466`**.

- Логика стрика и достижений за дни подряд — **`GamificationService.updateDailyLogin`** — `gamification.js` **строки `417–583`**: обновление **`last_daily_login`**, **`login_streak`**, проверка ключей **`daily_ritual`**, **`weekly_devotion`**, и т.д. — строки **`538–572`**.

### B) Ручной вызов из профиля (другой endpoint)

- `frontend/src/components/Profile.tsx` — **`handleDailyLogin`** — **`POST api/daily-login`** — строки **`1852–1860`**.

- `backend/server.js` — **`POST /api/daily-login`** — строки **`6757–6856`**:
  - Использует поля **`last_login_date`**, **`login_streak`**, **`total_logins`** (имена отличаются от ветки **`gamification/daily-login`**, которая опирается на **`last_daily_login`**) — строки **`6769–6809`**.
  - Начисляет **10 XP** — строки **`6802–6817`**.
  - **`checkActivityAchievements`** и уведомления — строки **`6820–6847`**.
  - В **`res.json`** указано **`levelUp: result.levelUp`**, тогда как **`awardXP`** возвращает **`leveledUp`** — строка **`6853`** (возможная несогласованность имён полей на фронте).

Итог для ВКР: в системе **два параллельных механизма** «ежедневного входа» с разными полями БД и разным XP; для описания процесса важно не смешивать их в одну «формулу».

---

## 8) XP и достижения за заказы (ключевой момент: не при создании заказа)

XP за заказ начисляется **после подтверждения оплаты администратором**, а не в `POST /api/orders`.

### Backend

- `backend/server.js` — **`POST /api/admin/confirm-order`** — строки **`4674–4832`**.
  - Для **`type === 'order'`** — обновление **`orders.status = 'paid'`** — строки **`4684–4690`**.
  - Пересчёт **`users.total_orders`** по заказам со статусом **`paid` или `completed`** — строки **`4707–4718`**.
  - **`awardXP(..., XP_RULES.ORDER_COMPLETE, ...)`** — **100 XP** — строки **`4720–4728`**.
  - **`checkOrderAchievements(telegramId, orderId, orderHour)`** — строки **`4730–4735`**.
  - Уведомления о **level up** и **достижениях** — строки **`4737–4763`** (для **`dragon_summoner`** получатель может быть **реферер** — **`achievement.unlockedFor`** — см. `gamification.js` **`713–719`**).
  - Дополнительно **`checkSavingsAchievements`** и сообщения — строки **`4816–4826`**.

### Логика достижений по заказам (сервер)

- `gamification.js` — **`checkOrderAchievements`** — строки **`608–722`**: пороги по **`total_orders`**, ночной заказ, суммы по **`orders.estimated_savings`**, сезонные условия, цепочка рефералов и т.д.

### Frontend

- Пользователь оформляет заказ в **`OrderForm.tsx`** (`POST /api/orders`) — геймификация на этом шаге **не вызывается** в показанном сценарии; отображение прогресса — в **профиле** после обновления данных.

---

## 9) Достижения по рефералам (подсчёт в БД)

- `gamification.js` — **`checkReferralAchievements`** — строки **`731–783`**:
  - Количество приглашённых: **`SELECT COUNT(*) FROM users WHERE referred_by = ?`** — строки **`736–740`** (именно таблица **`users`**, не `referrals`).
  - Достижения **`first_follower`**, **`lucky_chain`**, **`referral_marathon`**, **`dragon_chain`**, сезонное **`summer_fire`**.

**Замечание для ВКР:** **`POST /api/referral-stats`** и блок **`statistics.referrals`** в **`GET /api/profile`** считают **`FROM referrals`** — строки **`1929–1983`**, **`3768–3775`**. Если при активации реферала в **`/api/referral`** не создаётся строка в **`referrals`**, счётчики **`total_referrals` / `total_clicks`** на UI могут **не отражать** фактических записей в **`users.referred_by`**. Это расхождение источников данных стоит явно указать в анализе.

---

## 10) Отображение на frontend: профиль и рефералы

### Профиль

- `frontend/src/components/Profile.tsx`:
  - **`fetchProfileData`** — `GET api/profile` с заголовком **`x-telegram-init-data`** — строки **`1634–1638`**.
  - Параллельно **`GET api/gamification/:telegramId`** — строки **`1663–1704`**.
  - Список достижений по категориям — **`GET api/gamification/:id/achievements-by-category`** — строки **`1708–1728`**.
  - Проверка недавнего level up — **`GET api/gamification/:id/level-history`** и конфetti — строки **`1669–1687`**, **`1751–1752`**.
  - Отображение уровня, XP, прогресса — например строки **`2328–2360`** (точные номера могут сдвинуться при правках файла).

### Реферальный экран

- `frontend/src/components/ReferralSystem.tsx`:
  - Генерация ссылки и **`loadReferralStats`** при монтировании — строки **`540–551`**.
  - **`POST api/referral-stats`** — строки **`565–571`**.
  - Отображение **`stats.currentCommission`**, **`discountActive`**, **`totalReferrals`**, **`totalClicks`** — блок со **`StatsGrid`** начинается около **`675+`** (см. файл).

### Навигация

- `frontend/src/components/MainMenu.tsx` — переход на экран рефералов — строки **`666–668`** (кнопка «Реферальная система» / `referral`).
- `frontend/src/App.tsx` — рендер **`ReferralSystem`** при **`currentView === 'referral'`** — строки **`1214–1216`**.

---

## 11) Прочие API геймификации (для полноты карты)

| Метод | Назначение | Файл, примерные строки |
|--------|------------|-------------------------|
| `GET /api/gamification/:telegramId` | XP, уровень, стрик, достижения, `levelRewards` | `server.js` **`6337–6402`** |
| `GET /api/gamification/leaderboard` | Топ по XP | **`6477–6496`** |
| `GET /api/gamification/:telegramId/xp-history` | История XP | **`6500–6519`** |
| `GET /api/gamification/:telegramId/level-history` | История смены уровней | **`6523–6539`** |
| `GET /api/gamification/:telegramId/achievements-by-category` | Все достижения по категориям | **`6543–6560`** |
| `GET /api/user/achievements/:telegramId` | Альтернативная выдача достижений | **`6592+`** |

---

## 12) Планировщик и истечение скидок

- Подключение планировщика — `server.js` строка **`100`** (`scheduler`).
- Ручной вызов проверки истечения — **`POST /api/check-expired-discounts`** — строки **`6570–6584`** (и ещё вызов около **`6742`** в смежном админском сценарии).

Детали сброса **`access_expires_at`** / комиссии после истечения — в **`backend/scheduler.js`** (при необходимости расширьте карту отдельным подпунктом с цитатами из этого файла).

---

## 13) Краткая формулировка для пояснительной записки (сквозной сценарий)

При первом открытии Mini App клиент регистрирует пользователя через **`/api/user/init`** с комиссией по умолчанию и уровнем Bronze. Если в ссылке бота передан параметр **`start`**, клиентский код может вызвать **`/api/referral`** для нового пользователя: сервер создаёт запись с полем **`referred_by`**, пониженной комиссией и сроком **`access_expires_at`**, обновляет бонусы реферера и рассылает уведомления в Telegram; рефереру начисляется XP и проверяются реферальные достижения. Параллельно при запуске приложения вызывается **`/api/gamification/daily-login`** для стрика и связанных достижений с уведомлениями. XP за выполненные заказы начисляется при **`/api/admin/confirm-order`**: обновляется счётчик заказов, начисляется фиксированное XP, проверяются заказные и «экономические» достижения, пользователь получает сообщения о новых уровнях и ачивках. Уровни определяются суммарным XP по порогам в **`gamification.js`**; снижение комиссии в расчёте стоимости учитывается в **`/api/calculate-price`** через уровень пользователя, первый заказ Bronze и активную временную скидку из полей **`temp_discount_*`**. Профиль и реферальный экран подгружают агрегированную статистику и геймификацию через описанные GET/POST маршруты.
