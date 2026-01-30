-- Миграция геймификации: недостающие колонки
-- Выполнить если приложение падает с ошибками колонок
-- Если колонка уже есть — будет ошибка "Duplicate column", можно игнорировать

-- users: временная скидка
ALTER TABLE users ADD COLUMN temp_discount_active TINYINT(1) DEFAULT 0;
ALTER TABLE users ADD COLUMN temp_discount_end_date TIMESTAMP NULL;

-- users: статистика (если нет)
ALTER TABLE users ADD COLUMN total_orders INT DEFAULT 0;
ALTER TABLE users ADD COLUMN total_savings DECIMAL(12,2) DEFAULT 0;
ALTER TABLE users ADD COLUMN total_yuan_bought DECIMAL(12,2) DEFAULT 0;
ALTER TABLE users ADD COLUMN total_referrals INT DEFAULT 0;
ALTER TABLE users ADD COLUMN calculation_count INT DEFAULT 0;
ALTER TABLE users ADD COLUMN last_calculation_date TIMESTAMP NULL;

-- achievements: доп. награда
ALTER TABLE achievements ADD COLUMN additional_reward TEXT NULL;

-- xp_history: source/source_id (если код использует)
ALTER TABLE xp_history ADD COLUMN source VARCHAR(100) NULL;
ALTER TABLE xp_history ADD COLUMN source_id VARCHAR(100) NULL;

-- user_achievements: новая схема (если есть только user_id/achievement_id)
-- Добавить telegram_id, achievement_key для совместимости
ALTER TABLE user_achievements ADD COLUMN telegram_id BIGINT NULL;
ALTER TABLE user_achievements ADD COLUMN achievement_key VARCHAR(100) NULL;
ALTER TABLE user_achievements ADD COLUMN xp_awarded INT NULL;
