# Анализ системы геймификации Poizonic

## Выполненные исправления

### 1. **Логика комиссии (временная vs постоянная)**
- **Было:** Уровень перезаписывал временную скидку — постоянная комиссия всегда побеждала
- **Стало:** Используется `Math.min` — временная скидка 600₽ применяется только если она выгоднее комиссии уровня (900/700/400/0₽)

### 2. **Конфликт updateUserAchievementsAndLevels с XP**
- **Было:** При подтверждении покупки юаней уровень пересчитывался по числу заказов (6→Silver, 21→Gold), затирая XP-based уровень
- **Стало:** Функция удалена — уровень задаётся только через XP в gamification

### 3. **XP за покупку юаней**
- Исправлен запрос: `amount_yuan` → `amount_cny` (как в БД)
- XP: 1 за каждые 100₽ (floor(amount_rub / 100))

### 4. **Достижение First Follower**
- **Было:** Проверялось при регистрации реферала, когда у него ещё 0 заказов — достижение не могло разблокироваться
- **Стало:** Проверяется в `checkOrderAchievements` при первом заказе реферала — реферер получает First Follower

### 5. **Совместимость с разными схемами БД**
- `xp_history`: поддержка `source/source_id` и `reason/entity_type/entity_id`
- `user_achievements`: поддержка `(telegram_id, achievement_key)` и `(user_id, achievement_id)`
- `temp_discount_*`: graceful fallback при отсутствии колонок

### 6. **Yuan purchases**
- Все запросы переведены с `id` на `purchase_id` (соответствует schema.sql)

---

## Начисление XP

| Источник        | XP | Момент начисления |
|-----------------|----|-------------------|
| Заказ           | 100 | При подтверждении админом (status → paid) |
| Покупка юаней   | floor(amount_rub / 100) | При подтверждении |
| Реферал         | 50 | При регистрации по реф. ссылке |
| Достижение      | по xp_reward в БД | При разблокировке |

---

## Проверка достижений

| Триггер | Метод | Достижения |
|---------|-------|------------|
| Ежедневный вход | `updateDailyLogin` | daily_ritual (3), weekly_devotion (7), lunar_cycle (14), monthly_master (30), century_streak (100), year_of_dragon (365) |
| Подтверждение заказа | `checkOrderAchievements` | dragon_newbie, lucky_start, imperial_step, lucky_number, order_marathon, jubilee_order, delivery_master, order_legend, night_hunter, dragon_hunter, chain_orders, new_year_luck, dragon_summoner, first_follower |
| Регистрация реферала | `checkReferralAchievements` | first_follower*, lucky_chain, referral_marathon, dragon_chain, summer_fire |
| Покупка юаней | `checkYuanAchievements` | first_exchange, yuan_newbie, currency_dragon, volume_exchange, yuan_master |
| Расчёт стоимости | `checkActivityAchievements`, `checkSavingsAchievements` | year_of_luck, active_calculator, combo_activity, lucky_calculation, economy_master, dragon_saver, imperial_economy, calculation_combo |

*First Follower теперь проверяется при первом заказе реферала

---

## Уведомления

- Level up — `sendTelegramMessage` после `awardXP` / `checkOrderAchievements` / `checkReferralAchievements` / `checkYuanAchievements`
- Достижение — цикл по `achievements` с `sendTelegramMessage`
- Daily login достижения — в `updateDailyLogin` (API `/api/gamification/daily-login`)
- Стрик ≥5 дней — отдельное уведомление (если нет новых достижений)

---

## Уровни и комиссия

| Уровень | XP | Комиссия |
|---------|-----|----------|
| Bronze | 0–999 | 1000₽ (первый заказ 0₽) |
| Silver | 1000–4999 | 900₽ |
| Gold | 5000–24999 | 700₽ |
| Platinum | 25000–99999 | 400₽ |
| Diamond | 100000+ | 0₽ |

Временная скидка 600₽ (от достижений) применяется только если она меньше комиссии уровня.

---

## Миграции БД

1. **`database/migration_gamification.sql`** — добавить колонки: `temp_discount_active`, `temp_discount_end_date`, `total_orders`, `total_savings`, и т.д.
2. **`database/achievements_sync.sql`** — добавить все достижения, которые проверяет gamification

Запуск:
```bash
mysql -u user -p poizonic < database/migration_gamification.sql
mysql -u user -p poizonic < database/achievements_sync.sql
```
