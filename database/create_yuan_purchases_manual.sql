-- Полный SQL скрипт для создания таблицы покупок юаня
-- Выполните этот скрипт в вашей MySQL базе данных

-- 1. Создание таблицы покупок юаня
CREATE TABLE IF NOT EXISTS `yuan_purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `amount_rub` decimal(10,2) NOT NULL,
  `amount_cny` decimal(10,2) NOT NULL,
  `exchange_rate` decimal(8,4) NOT NULL,
  `favorable_rate` decimal(8,4) NOT NULL,
  `savings` decimal(10,2) DEFAULT 0.00,
  `status` enum('pending', 'completed', 'cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `telegram_id` (`telegram_id`),
  KEY `created_at` (`created_at`),
  KEY `status` (`status`),
  CONSTRAINT `yuan_purchases_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Создание индексов для оптимизации
CREATE INDEX idx_yuan_purchases_telegram_id ON yuan_purchases(telegram_id);
CREATE INDEX idx_yuan_purchases_created_at ON yuan_purchases(created_at);
CREATE INDEX idx_yuan_purchases_status ON yuan_purchases(status);

-- 3. Добавление полей в таблицу users (если их нет)
-- Проверяем и добавляем поле full_name
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_NAME = 'users' 
   AND COLUMN_NAME = 'full_name' 
   AND TABLE_SCHEMA = DATABASE()) = 0,
  'ALTER TABLE users ADD COLUMN full_name varchar(255) DEFAULT NULL',
  'SELECT "Column full_name already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Проверяем и добавляем поле phone_number
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_NAME = 'users' 
   AND COLUMN_NAME = 'phone_number' 
   AND TABLE_SCHEMA = DATABASE()) = 0,
  'ALTER TABLE users ADD COLUMN phone_number varchar(20) DEFAULT NULL',
  'SELECT "Column phone_number already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Проверяем и добавляем поле preferred_currency
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
   WHERE TABLE_NAME = 'users' 
   AND COLUMN_NAME = 'preferred_currency' 
   AND TABLE_SCHEMA = DATABASE()) = 0,
  'ALTER TABLE users ADD COLUMN preferred_currency varchar(3) DEFAULT "RUB"',
  'SELECT "Column preferred_currency already exists" as message'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. Проверка создания таблицы
SELECT 'Таблица yuan_purchases создана успешно!' as status;

-- 5. Показать структуру созданной таблицы
DESCRIBE yuan_purchases;

-- 6. Показать обновленную структуру таблицы users
DESCRIBE users;





