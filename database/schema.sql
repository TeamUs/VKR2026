-- Poizonic Mini App Database Schema
-- Создание таблиц для Telegram Mini App
--
-- ВАЖНО: Используется UTF8MB4 для полной поддержки:
-- - Emoji (😊, 🛒, 💰, и т.д.)
-- - Международных символов (китайские, арабские, и т.д.)
-- - 4-байтовых UTF-8 символов
--
-- Перед запуском убедитесь, что БД создана с правильной кодировкой:
-- CREATE DATABASE poizonic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Устанавливаем кодировку для текущей сессии
SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
SET CHARACTER SET utf8mb4;

SET FOREIGN_KEY_CHECKS = 0;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS `users` (
  `telegram_id` bigint NOT NULL,
  `commission` decimal(5,2) DEFAULT 0.05,
  `access_expires_at` timestamp NULL DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица заказов
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `product_link` varchar(255) DEFAULT NULL,
  `product_size` varchar(50) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `pickup_point_address` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `telegram_id` (`telegram_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Таблица рефералов
CREATE TABLE IF NOT EXISTS `referrals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `referral_url` varchar(255) DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `clicks` int DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `telegram_id` (`telegram_id`),
  CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Индексы для оптимизации
CREATE INDEX idx_users_telegram_id ON users(telegram_id);
CREATE INDEX idx_orders_telegram_id ON orders(telegram_id);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_referrals_telegram_id ON referrals(telegram_id);
CREATE INDEX idx_referrals_referred_by ON referrals(referred_by);

SET FOREIGN_KEY_CHECKS = 1;
