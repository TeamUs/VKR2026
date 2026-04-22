# Сквозной процесс отзывов и модерации (frontend + backend, по этапам)

Документ описывает полный жизненный цикл отзыва: от открытия раздела пользователем до публикации после модерации в админке.

---

## Важно: в `server.js` есть дублирующий маршрут `GET /api/reviews`

В `backend/server.js` маршрут `app.get('/api/reviews', ...)` объявлен дважды:

1. Первый — строки `2872–2930`.
2. Второй — строки `6276–6332`.

В Express срабатывает **первый подходящий** маршрут, поэтому фактически используется блок `2872–2930` (если он не вызывает `next()`).

---

## 1) Пользователь открывает экран «Отзывы»

### Frontend

- `frontend/src/components/MainMenu.tsx`  
  Кнопка «Отзывы» вызывает `handleButtonClick('reviews')` — строки `690–694`.
- `frontend/src/App.tsx`  
  При `currentView === 'reviews'` рендерится `<Reviews ... />` — строки `1226–1234`.

### Backend

- На шаге навигации backend не вызывается.

---

## 2) Загрузка списка отзывов и средней оценки

### Frontend

- `frontend/src/components/Reviews.tsx`:
  - `fetchReviews(page)` — запрос `GET api/reviews?page=&limit=` — строки `858–866`.
  - `fetchAverageRating()` — запрос `GET api/reviews/average-rating` — строки `907–914`.
  - В `useEffect` оба запроса стартуют при открытии раздела — строки `920–926`.

### Backend

- `backend/server.js`:
  - `GET /api/reviews` — строки `2872–2930`:
    - выбирает только `is_approved = 1` — `2882`, `2892`;
    - пагинация (`page`, `limit`, `offset`) — `2876–2878`;
    - подтягивает `avatar_url` через `LEFT JOIN users` — `2888–2891`;
    - дополнительно собирает все фото из `review_photos` — `2897–2915`;
    - возвращает `reviews`, `total`, `totalPages` — `2919–2925`.
  - `GET /api/reviews/average-rating` — строки `2933–2957`:
    - считает `AVG(rating)` только по `is_approved = 1` — `2938–2941`.

---

## 3) Пользователь нажимает «Написать отзыв»

### Frontend

- `frontend/src/components/Reviews.tsx`:
  - хранит состояние `isWriteModalOpen` — строка `776`;
  - `handleWriteReview()` открывает модалку и фиксирует скролл — `813–822`;
  - внизу рендерится `<WriteReviewModal ... onSuccess={handleReviewSuccess} />` (см. блок около строк `1215+`).
- `handleReviewSuccess()` после успешной отправки перезагружает текущую страницу отзывов — строки `824–827`.

### Backend

- Пока не вызывается (пока пользователь только открыл модалку).

---

## 4) Пользователь отправляет отзыв (текст/оценка/медиа)

### Frontend (основной путь)

- `frontend/src/components/WriteReviewModal.tsx`:
  - собирает Telegram-данные пользователя (`initDataUnsafe.user`) — `525–533`;
  - формирует `FormData` (`telegram_id`, `username`, `full_name`, `rating`, `review_text`, `avatar_url`, `photos[]`) — `546–559`;
  - отправляет `POST api/reviews` — `561–564`;
  - при успехе показывает «Спасибо за ваш отзыв», очищает форму и закрывает модалку — `566–583`.

### Backend (основной путь)

- `backend/server.js`:
  - статическая раздача файлов отзывов: `app.use('/uploads', express.static(...))` — `136–137`;
  - `multer` для отзывов (`uploads/reviews`, 10MB, image/video) — `139–164`;
  - `POST /api/reviews` — `2960–3082`:
    - поддерживает snake_case/camelCase входные поля — `2964–2970`;
    - валидация (`telegram_id`, `rating`) — `2981–2985`;
    - создаёт пользователя при отсутствии (Bronze, commission=1000) или обновляет профильные поля — `2987–3011`;
    - сохраняет отзыв в `reviews` с `is_approved = 0` — `3021–3024`;
    - сохраняет все вложения в `review_photos` — `3028–3036`;
    - пишет `logUserActivity` и `createSystemLog` — `3039–3052`;
    - шлёт менеджеру уведомление «требует модерации» — `3055–3068`;
    - **не публикует в канал сразу**, ждёт модерации — `3070–3071`.

Итог: отзыв сохранён, но на публичный экран ещё не попал.

---

## 5) Модератор открывает админку и список отзывов

### Frontend

- `frontend/src/components/AdminPanel.tsx`:
  - вкладка `reviews` — секция «Модерация отзывов» — `5349–5359`;
  - загрузка для модерации: `loadReviewsForModeration()` → `GET api/admin/reviews` — `1114–1125`;
  - фильтр статусов (`pending` / `approved` / `all`) — `5380–5397`, применение фильтра — `5409–5413`.

### Backend

- `backend/server.js`:
  - `GET /api/admin/reviews` — `3087–3133`:
    - принимает `status` и пагинацию — `3091–3099`;
    - формирует `WHERE` по модерации — `3096–3101`;
    - возвращает отзывы с полями `is_approved`, `moderated_at`, `moderated_by` — `3111–3113`;
    - возвращает `totalPages` и текущий статус — `3121–3128`.

---

## 6) Одобрение отзыва модератором

### Frontend

- `frontend/src/components/AdminPanel.tsx`:
  - кнопка `✅ Одобрить` в карточке отзыва — `5556–5574`;
  - `approveReview(reviewId)` вызывает `POST api/admin/reviews/:reviewId/approve` — `1140–1147`;
  - при успехе перезагружает список и показывает сообщение — `1149–1153`.

### Backend

- `backend/server.js`:
  - `POST /api/admin/reviews/:reviewId/approve` — `3136–3188`:
    - выставляет `is_approved = 1`, `moderated_at = NOW()`, `moderated_by` — `3144–3148`;
    - читает данные отзыва после апрува — `3151–3155`;
    - отправляет менеджеру уведомление об одобрении — `3176–3177`;
    - заготовка отправки в канал отзывов есть, но сейчас закомментирована — `3160–3175`.

Итог: с этого момента отзыв попадает в публичную выдачу `GET /api/reviews` (т.к. фильтр по `is_approved = 1`).

---

## 7) Удаление отзыва модератором

### Frontend

- `frontend/src/components/AdminPanel.tsx`:
  - кнопка `🗑️ Удалить` — `5576–5593`;
  - `deleteReview(reviewId)` вызывает `DELETE api/admin/reviews/:reviewId` — `1162–1173`;
  - подтверждение `confirm(...)` и перезагрузка списка после успеха — `1163–1178`.

### Backend

- `backend/server.js`:
  - `DELETE /api/admin/reviews/:reviewId` — `3191–3213`:
    - удаляет запись из `reviews` — `3198–3200`;
    - отправляет менеджеру уведомление — `3202–3203`.

---

## 8) Что видит пользователь после модерации

### Frontend

- `Reviews.tsx` снова дергает `GET /api/reviews` и отображает карточки/медиа, включая `photos[]`.
- При клике по карточке открывается модалка подробного просмотра (`selectedReview`) — `835–855`.

### Backend

- В публичную выдачу попадают только `is_approved = 1` (см. `2892` / `6294`).

---

## 9) Админская статистика по отзывам

### Frontend

- В текущем `AdminPanel.tsx` основной упор — список и действия модерации; endpoint статистики готов для расширения UI.

### Backend

- `GET /api/admin/reviews/stats` — `3216–3250`:
  - `total_reviews`, `approved_reviews`, `pending_reviews`, `average_rating` — `3221–3228`;
  - динамика по дням за 7 суток — `3231–3240`.

---

## 10) Legacy-пути отзывов (в проекте есть, но основной поток другой)

В `backend/server.js` есть старые/упрощённые endpoint'ы:

- `POST /api/submit-review` — `1896–1926` (только отправка менеджеру, без полноценной модерации/медиа).
- `POST /api/submit-review-direct` — `1999–2041` (прямая запись в `reviews`, без `is_approved`-процесса как в основном `POST /api/reviews`).

Основной актуальный путь для Mini App сейчас:  
**`WriteReviewModal.tsx` → `POST /api/reviews` → модерация в `AdminPanel.tsx`**.

---

## 11) Краткий сквозной сценарий для пояснительной записки

Пользователь открывает раздел «Отзывы», где клиент получает только одобренные модератором записи и средний рейтинг. При создании отзыва в модальном окне frontend отправляет форму `multipart/form-data` с оценкой, текстом и вложениями в `POST /api/reviews`. Сервер валидирует данные, сохраняет отзыв в БД со статусом `is_approved = 0`, записывает медиа в `review_photos`, логирует событие и уведомляет менеджера, что отзыв ждёт модерации. Модератор в админ-панели просматривает очередь, выполняет одобрение (`POST /api/admin/reviews/:id/approve`) либо удаление (`DELETE /api/admin/reviews/:id`). После одобрения отзыв становится видимым в публичном API `GET /api/reviews`, и пользователи видят его в приложении.

