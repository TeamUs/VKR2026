# Сквозной процесс расчёта стоимости (калькулятор, курс ЦБ РФ, формула) — привязка к коду

Документ описывает, как в `mini_app_vkr` пользователь получает расчёт стоимости, **где берётся курс юаня (данные ЦБ РФ)**, и **где в коде записана итоговая формула**. Указаны frontend и backend.

---

## Важно: дублирующий маршрут `POST /api/calculate-price`

В `backend/server.js` зарегистрированы **два** обработчика `app.post('/api/calculate-price', ...)`:

1. **Строки `2044–2184`** — полный расчёт по цене в юанях, весу и (опционально) `telegramId` с геймификацией комиссии. **Именно этот обработчик срабатывает**, потому что в Express используется **первый** подходящий маршрут.
2. **Строки `6870–6954`** — другой контракт тела запроса (`itemCostRub`, `deliveryCost`, `commission`) и геймификация; **до него запрос от калькулятора не доходит** (маршрут «перекрыт» первым).

Для ВКР: в описании процесса ориентируйся на обработчик **`2044–2184`**.

---

## 1) Пользователь открывает «Расчёт стоимости» (калькулятор)

### Frontend

- `frontend/src/components/MainMenu.tsx`  
  Кнопка «Расчет стоимости» → `handleButtonClick('calculator')` — строки `643–658`.
- `frontend/src/App.tsx`  
  При `currentView === 'calculator'` рендерится `<PriceCalculator .../>` — строки `1196–1198`.

### Backend

- Не вызывается (только смена экрана).

---

## 2) Пользователь вводит цену в юанях и выбирает категорию (вес)

### Frontend

- `frontend/src/components/PriceCalculator.tsx`
  - Список категорий и **вес по категории** (`weight` в кг для формулы доставки на backend) — строки `993–1000`.
  - Валидация полей — строки `1023–1058`.
  - Кнопка «Рассчитать стоимость» → `handleCalculate` → `handleManualCalculate` — строки `1015–1021`, `1023–1091`.
  - Запрос к API — строки `1065–1075`:

```1065:1075:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\frontend\src\components\PriceCalculator.tsx
      const response = await fetch('api/calculate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: priceNum,
          weight: selectedCategory.weight,
          category: selectedCategory.value
        }),
      });
```

**Замечание:** в теле запроса **нет** `telegramId`, поэтому на backend не подтягивается персональная комиссия из БД и не применяется блок геймификации комиссии (см. ниже, шаг 3).

### Backend

- Пока не считает — ждёт `POST`.

---

## 3) Backend: курс юаня к рублю (источник ЦБ РФ)

### Где берётся курс

- Файл: `backend/server.js`
- Функция: `getYuanToRubExchangeRate()` — строки **`1499–1533`**.

Логика:

1. HTTP `GET` к **`https://www.cbr-xml-daily.ru/daily_json.js`** — строки **`1502–1509`**.  
   Это JSON с курсами, основанный на официальных данных ЦБ РФ (удобный публичный источник; в коде явно указано «только API Центробанка России» — комментарий строка **`1499`**).
2. Из ответа читается **`cbrData.Valute.CNY.Value`** — строки **`1517–1518`**.
3. **Курс для расчётов в приложении:** `adjustedRate = cnyRate + 1.1` — строки **`1520–1523`**.  
   То есть к официальному значению курса CNY добавляется фиксированная надбавка **1,1** (руб./юань) — это уже **бизнес-правило приложения**, не «сырой» курс JSON.
4. При ошибке сети / отсутствии поля используется **`DEFAULT_EXCHANGE_RATE`** — строки **`1511–1514`**, **`1525–1531`**.

Константа резервного курса объявлена рядом с константой доставки — строки **`580–583`**:

```580:583:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\backend\server.js
// Константы
const DELIVERY_COST_PER_KG = 800;
// РЕЗЕРВНЫЙ курс (используется ТОЛЬКО если ЦБ РФ недоступен)
const DEFAULT_EXCHANGE_RATE = 12.5;
```

### HTTP API только для отображения курса

- `GET /api/exchange-rate` — строки **`1541–1549`**: вызывает `getYuanToRubExchangeRate()` и отдаёт `{ rate, timestamp }`.

---

## 4) Backend: **формула** полной стоимости (`POST /api/calculate-price`, активный обработчик)

- Файл: `backend/server.js`
- Маршрут: `app.post('/api/calculate-price', ...)` — строки **`2044–2184`**.

### Базовые величины

После получения курса (шаг 3):

```2078:2082:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\backend\server.js
    const currentRate = await getYuanToRubExchangeRate();
    
    const itemCostRub = price * currentRate;
    const deliveryCost = weight * DELIVERY_COST_PER_KG;
```

- **`itemCostRub`** = цена товара в **юанях** × **`currentRate`** (руб. за 1 ¥ после `getYuanToRubExchangeRate`, см. `+ 1.1`).
- **`deliveryCost`** = **`weight`** (кг) × **`DELIVERY_COST_PER_KG`** (**`800`** ₽/кг) — константа строка **`581`**.

### Комиссия

- По умолчанию **`commission = 1000`** ₽ — строка **`2057`**.
- Если в теле запроса передан **`telegramId`** и есть БД — читается `users.commission` (и учёт `access_expires_at`) — строки **`2058–2076`**.

### Усложнение: геймификация комиссии (только при `telegramId`)

Если передан `telegramId` и инициализирован `gamificationService`, комиссия может стать ниже (уровни, временная скидка 600 ₽ и т.д.) — блок **`2083–2159`**, итог:

```2162:2164:c:\Users\Artyom\Desktop\Учеба\ВКР\Проект\mini_app_vkr\backend\server.js
    const commissionAmount = Math.round(finalCommission); // Округляем до целых рублей
    const totalCost = itemCostRub + commissionAmount + deliveryCost;
```

**Итоговая формула в коде:**

\[
\textit{totalCost} = \textit{price} \times \textit{currentRate} + \textit{round}(\textit{finalCommission}) + \textit{weight} \times 800
\]

где `currentRate` = курс CNY из JSON ЦБ РФ + **1.1** (или резерв **12.5**).

### Ответ клиенту

Объект `result` с полями `priceInRubles`, `deliveryCost`, `commission`, `totalCost`, `exchangeRate`, … — строки **`2165–2179`**, отправка **`res.json(result)`** — строка **`2179`**.

---

## 5) Frontend: отображение результата калькулятора

- `frontend/src/components/PriceCalculator.tsx` — строки **`1199–1244`**:
  - `priceInRubles`, `deliveryCost`, `commission`, `totalCost`;
  - в деталях — `originalPrice` (¥) и `exchangeRate` (₽/¥).

Текстовая подсказка пользователю (упрощённо) — **`1268–1274`**; фактическая комиссия на backend может отличаться, если в запрос добавить `telegramId` (сейчас калькулятор его не отправляет).

---

## 6) Отдельный экран «Курс юаня» (только просмотр курса)

### Frontend

- `frontend/src/components/ExchangeRate.tsx`
  - При монтировании `loadExchangeRate()` — строки **`391–393`**, **`395–423`**.
  - Запрос **`GET api/exchange-rate`** — строки **`401–402`**.
  - При ошибке подставляется **12.5** — строки **`418–419`** (совпадает с `DEFAULT_EXCHANGE_RATE` на backend).

- `frontend/src/App.tsx` — экран `exchange-rate` — строки **`1218–1220`**.
- `frontend/src/components/MainMenu.tsx` — кнопка «Курс юаня» — строки **`684–688`**.

### Backend

- `GET /api/exchange-rate` — **`1541–1549`**, внутри — **`getYuanToRubExchangeRate()`** (**`1499–1533`**).

---

## 7) Другие backend-ветки того же расчёта (для полноты ВКР)

Та же **базовая арифметика** `itemCostRub + commission + deliveryCost` и тот же **`getYuanToRubExchangeRate()`** используются в:

| Маршрут | Назначение | Где формула / курс |
|--------|------------|-------------------|
| `POST /api/calculate-from-link` | Цена с парсинга страницы + категория + вес | Курс: **`1632`**; `itemCostRub`, `deliveryCost`, `totalCost`: **`1634–1637`** |
| `POST /api/get-price-with-size` | Цена после выбора размера + категория + вес | Курс: **`1866`**; формула: **`1867–1870`** |

Файл для обоих: `backend/server.js`.

---

## 8) Краткая формулировка для пояснительной записки

Пользователь в разделе «Расчёт стоимости» вводит цену товара в юанях и выбирает категорию; frontend отправляет запрос `POST /api/calculate-price` с ценой и весом категории. Сервер получает курс китайского юаня к рублю из JSON `daily_json.js` сервиса `cbr-xml-daily.ru` (данные по курсу ЦБ РФ), увеличивает его на фиксированную величину 1,1 руб./юань и вычисляет стоимость товара в рублях как произведение цены в юанях на скорректированный курс; доставка считается как произведение веса (кг) на тариф 800 руб./кг; к сумме добавляется комиссия сервиса (по умолчанию 1000 руб., с возможностью персонализации при передаче идентификатора пользователя и подключённой геймификации). Итог возвращается клиенту и отображается на экране. Отдельно экран «Курс юаня» запрашивает `GET /api/exchange-rate` и показывает актуальный курс для пользователя.
