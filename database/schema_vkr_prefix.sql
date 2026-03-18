-- ВКР Mini App: те же таблицы с префиксом vkr_ в ОДНОЙ БД (default_db).
-- Импорт: mysql -h ХОСТ -u ПОЛЬЗОВАТЕЛЬ -p default_db < database/schema_vkr_prefix.sql
-- В .env ВКР: DB_NAME=default_db (та же БД, что и основное приложение).

SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci';
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `vkr_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `achievement_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requirement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `xp_reward` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `achievement_key` (`achievement_key`),
  KEY `idx_achievement_key` (`achievement_key`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `vkr_achievements` (`achievement_key`, `name`, `description`, `category`, `icon`, `requirement`, `xp_reward`) VALUES
('dragon_newbie', 'Дракон-новичок', 'Сделайте свой первый заказ', 'Заказы', '🐉', '1 заказ', 100),
('chain_orders', 'Цепь заказов', '3 заказа за неделю', 'Заказы', '⛓️', '3 заказа за неделю', 300),
('emperor_purchases', 'Император покупок', '10 заказов из разных категорий', 'Заказы', '👑', '10 заказов', 1000),
('golden_chain', 'Золотая цепочка', 'Первый реферал сделал заказ', 'Рефералы', '💛', '1 активный реферал', 200),
('referral_festival', 'Реферальный фестиваль', '3 реферала за месяц', 'Рефералы', '🎊', '3 реферала за месяц', 600),
('dragon_summoner', 'Дракон-призыватель', 'Ваш реферал привел еще одного', 'Рефералы', '📣', 'Реферал 2-го уровня', 500),
('lucky_calculation', 'Удачный расчет', 'Сэкономьте 1,000₽ за месяц', 'Экономия', '💡', '1,000₽ экономии за месяц', 200),
('balance_master', 'Мастер баланса', '5 расчетов цен без заказа', 'Экономия', '⚖️', '5 расчетов цены', 300),
('economy_dragon', 'Эконом-дракон', 'Сэкономьте 5,000₽ всего', 'Экономия', '🐲', '5,000₽ общей экономии', 1000),
('daily_ritual', 'Ежедневный ритуал', 'Вход 5 дней подряд', 'Активность', '☕', '5 дней подряд', 200),
('lunar_cycle', 'Лунный цикл', 'Активность 28 дней', 'Активность', '🌕', '28 дней активности', 800),
('year_of_dragon', 'Год дракона', '365 дней в приложении', 'Активность', '📅', '365 дней', 5000),
('night_hunter', 'Ночной охотник', 'Заказ после 22:00', 'Творческие', '🌙', 'Заказ после 22:00', 100),
('combo_dragon', 'Комбо-дракон', 'Заказ + реферал в один день', 'Творческие', '🔥', 'Заказ и реферал за 1 день', 400),
('lucky_number', 'Счастливый номер', '8-й заказ', 'Творческие', '8️⃣', '8 заказов', 800),
('share_wisdom', 'Поделись мудростью', 'Поделитесь гайдом в соцсетях', 'Социальные', '📜', 'Поделиться гайдом', 200),
('group_dragon', 'Групповой дракон', 'Создайте чат с рефералами', 'Социальные', '👥', 'Создать групповой чат', 500),
('viral_fire', 'Вирусный огонь', 'Ваш пост о приложении набрал 10 лайков', 'Социальные', '🔴', '10 лайков на посте', 300),
('new_year_luck', 'Новый год удачи', '3 заказа в январе', 'Сезонные', '🧧', '3 заказа в январе', 600),
('summer_fire', 'Летний огонь', 'Реферал летом', 'Сезонные', '☀️', 'Реферал летом', 400),
('promo_dragon', 'Акция-дракон', 'Заказ во время промо', 'Сезонные', '💥', 'Заказ во время промо', 500)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`), `description` = VALUES(`description`), `category` = VALUES(`category`), `icon` = VALUES(`icon`), `requirement` = VALUES(`requirement`), `xp_reward` = VALUES(`xp_reward`);

CREATE TABLE IF NOT EXISTS `vkr_users` (
  `telegram_id` bigint NOT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferred_currency` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT 'RUB',
  `avatar_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commission` int DEFAULT 1000,
  `access_expires_at` timestamp NULL DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_activity` timestamp NULL DEFAULT NULL,
  `xp` int DEFAULT 0,
  `current_level` varchar(20) DEFAULT 'Bronze',
  `last_daily_login` date DEFAULT NULL,
  `login_streak` int DEFAULT 0,
  PRIMARY KEY (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_point` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pickup_point_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` mediumtext COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estimated_savings` decimal(10,2) DEFAULT '5000.00',
  `status` enum('pending','paid','completed','cancelled','profit_calculated') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  KEY `idx_orders_telegram_id_status` (`telegram_id`),
  KEY `idx_orders_created_at` (`created_at`),
  KEY `idx_orders_status` (`status`),
  KEY `idx_orders_telegram_id` (`telegram_id`),
  KEY `idx_orders_analytics` (`created_at`,`status`,`estimated_savings`),
  KEY `idx_orders_telegram_created` (`telegram_id`,`created_at`),
  CONSTRAINT `vkr_orders_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `vkr_users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_user_achievements` (
  `user_id` bigint NOT NULL,
  `achievement_id` int NOT NULL,
  `unlocked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `achievement_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_achievement_id` (`achievement_id`),
  KEY `idx_unlocked_at` (`unlocked_at`),
  CONSTRAINT `vkr_user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `vkr_users` (`telegram_id`) ON DELETE CASCADE,
  CONSTRAINT `vkr_user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `vkr_achievements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_xp_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `xp_amount` int NOT NULL,
  `reason` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `entity_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telegram_id` (`telegram_id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_entity` (`entity_type`, `entity_id`),
  KEY `idx_source` (`telegram_id`, `source`, `source_id`),
  CONSTRAINT `vkr_xp_history_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `vkr_users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_level_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `old_level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `xp_at_levelup` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telegram_id` (`telegram_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `vkr_level_history_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `vkr_users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_link` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `estimated_savings` decimal(10,2) DEFAULT '5000.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order_id` (`order_id`),
  CONSTRAINT `vkr_order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `vkr_orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_delivery_tracking` (
  `tracking_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `internal_tracking_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('Создан','Доставка внутри Китая','На складе в Китае','Отправлен на таможню','Доставка в РФ','Доставлен') COLLATE utf8mb4_unicode_ci DEFAULT 'Создан',
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tracking_id`),
  UNIQUE KEY `internal_tracking_number` (`internal_tracking_number`),
  KEY `idx_tracking_number` (`internal_tracking_number`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_status` (`status`),
  KEY `idx_tracking_order_id` (`order_id`),
  KEY `idx_tracking_status` (`status`),
  CONSTRAINT `vkr_delivery_tracking_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `vkr_orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_exchange_rates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `currency_from` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency_to` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` decimal(10,4) NOT NULL,
  `favorable_rate` decimal(10,4) NOT NULL,
  `source` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT 'CBRF',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `currency_pair` (`currency_from`,`currency_to`),
  KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_referrals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `referral_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `clicks` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `telegram_id` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `photo_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','approved','rejected') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `admin_comment` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`review_id`),
  KEY `telegram_id` (`telegram_id`),
  KEY `idx_reviews_status_created` (`status`,`created_at`),
  KEY `idx_reviews_telegram_id` (`telegram_id`),
  KEY `idx_reviews_created_at` (`created_at`),
  CONSTRAINT `vkr_reviews_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `vkr_users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_yuan_purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `amount_cny` decimal(10,2) DEFAULT NULL,
  `exchange_rate` decimal(10,4) DEFAULT NULL,
  `favorable_rate` decimal(10,4) DEFAULT NULL,
  `amount_rub` decimal(10,2) DEFAULT NULL,
  `savings` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','paid','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `tariff` enum('standard','vip','super_vip') COLLATE utf8mb4_unicode_ci DEFAULT 'standard',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  KEY `telegram_id` (`telegram_id`),
  KEY `idx_yuan_telegram_id` (`telegram_id`),
  KEY `idx_yuan_created_at` (`created_at`),
  KEY `idx_yuan_status` (`status`),
  CONSTRAINT `vkr_yuan_purchases_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `vkr_users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_profit_calculations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `customer_commission` decimal(10,2) NOT NULL,
  `customer_product_cost_cny` decimal(10,2) NOT NULL,
  `customer_rate` decimal(10,4) NOT NULL,
  `customer_delivery` decimal(10,2) NOT NULL,
  `customer_total` decimal(10,2) NOT NULL,
  `my_product_cost_cny` decimal(10,2) NOT NULL,
  `my_rate` decimal(10,4) NOT NULL,
  `my_delivery` decimal(10,2) NOT NULL,
  `my_total` decimal(10,2) NOT NULL,
  `profit` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `vkr_profit_calculations_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `vkr_orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_user_activity` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `action_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_data` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telegram_id` (`telegram_id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `vkr_system_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `log_level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `log_message` text COLLATE utf8mb4_unicode_ci,
  `log_data` text COLLATE utf8mb4_unicode_ci,
  `telegram_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
