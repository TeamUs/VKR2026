-- Добавление таблицы покупок юаня
-- Миграция для добавления функционала покупки китайского юаня

-- Таблица покупок юаня
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

-- Индексы для оптимизации
CREATE INDEX idx_yuan_purchases_telegram_id ON yuan_purchases(telegram_id);
CREATE INDEX idx_yuan_purchases_created_at ON yuan_purchases(created_at);
CREATE INDEX idx_yuan_purchases_status ON yuan_purchases(status);

-- Добавление полей в таблицу users для профиля (если их нет)
ALTER TABLE `users` 
ADD COLUMN IF NOT EXISTS `full_name` varchar(255) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `phone_number` varchar(20) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS `preferred_currency` varchar(3) DEFAULT 'RUB';





