-- Добавляем поле last_activity в таблицу users для отслеживания онлайн-статуса
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_activity TIMESTAMP NULL DEFAULT NULL;

-- Создаем индекс для быстрого поиска активных пользователей
CREATE INDEX IF NOT EXISTS idx_users_last_activity ON users(last_activity);

-- Обновляем существующих пользователей, устанавливая last_activity = created_at
UPDATE users SET last_activity = created_at WHERE last_activity IS NULL;

