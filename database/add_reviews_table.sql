-- Добавление таблицы отзывов
-- Миграция для добавления функционала отзывов

-- Таблица отзывов
CREATE TABLE IF NOT EXISTS `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `rating` int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  `review_text` text DEFAULT NULL,
  `photo_url` varchar(500) DEFAULT NULL,
  `is_approved` boolean DEFAULT FALSE,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `telegram_id` (`telegram_id`),
  KEY `is_approved` (`is_approved`),
  KEY `created_at` (`created_at`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Индексы для оптимизации
CREATE INDEX idx_reviews_telegram_id ON reviews(telegram_id);
CREATE INDEX idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
CREATE INDEX idx_reviews_rating ON reviews(rating);






