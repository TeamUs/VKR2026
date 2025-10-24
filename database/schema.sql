-- Poizonic Mini App Database Schema
-- Актуальная схема базы данных
-- Обновлено: 21 октября 2025
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

--
-- Table structure for table `achievements`
--

CREATE TABLE IF NOT EXISTS `achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `achievement_key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Unique identifier for achievement',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Display name of achievement',
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Achievement description',
  `category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Achievement category',
  `icon` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Emoji icon for achievement',
  `requirement` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Requirement description',
  `xp_reward` int DEFAULT '0' COMMENT 'XP bonus when unlocked',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `achievement_key` (`achievement_key`),
  KEY `idx_achievement_key` (`achievement_key`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Вставка достижений с правильными описаниями (без наград)
INSERT INTO `achievements` (`achievement_key`, `name`, `description`, `category`, `icon`, `requirement`, `xp_reward`) VALUES
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
ON DUPLICATE KEY UPDATE
  `name` = VALUES(`name`),
  `description` = VALUES(`description`),
  `category` = VALUES(`category`),
  `icon` = VALUES(`icon`),
  `requirement` = VALUES(`requirement`),
  `xp_reward` = VALUES(`xp_reward`);

--
-- Table structure for table `user_achievements`
--

CREATE TABLE IF NOT EXISTS `user_achievements` (
  `user_id` bigint NOT NULL COMMENT 'Reference to users.telegram_id',
  `achievement_id` int NOT NULL COMMENT 'Reference to achievements.id',
  `unlocked_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'When achievement was unlocked',
  PRIMARY KEY (`user_id`, `achievement_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_achievement_id` (`achievement_id`),
  KEY `idx_unlocked_at` (`unlocked_at`),
  CONSTRAINT `user_achievements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE,
  CONSTRAINT `user_achievements_ibfk_2` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `xp_history`
--

CREATE TABLE IF NOT EXISTS `xp_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `xp_amount` int NOT NULL COMMENT 'Amount of XP gained/lost',
  `reason` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Why XP was awarded',
  `entity_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Type of entity (order, achievement, etc)',
  `entity_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'ID of related entity',
  `description` text COLLATE utf8mb4_unicode_ci COMMENT 'Additional description',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telegram_id` (`telegram_id`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_entity` (`entity_type`, `entity_id`),
  CONSTRAINT `xp_history_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `level_history`
--

CREATE TABLE IF NOT EXISTS `level_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint NOT NULL,
  `old_level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `new_level` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `xp_at_levelup` int NOT NULL COMMENT 'XP amount when level up occurred',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_telegram_id` (`telegram_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `level_history_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `telegram_id` bigint NOT NULL,
  `commission` int DEFAULT 1000 COMMENT 'Комиссия в рублях (1000₽ по умолчанию, 400₽ для рефералов)',
  `access_expires_at` timestamp NULL DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `xp` int DEFAULT 0 COMMENT 'Experience points for gamification',
  `current_level` varchar(20) DEFAULT 'Bronze' COMMENT 'Current gamification level',
  `last_daily_login` date DEFAULT NULL COMMENT 'Last daily login date for streak tracking',
  `login_streak` int DEFAULT 0 COMMENT 'Consecutive daily login streak',
  PRIMARY KEY (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `orders`
--

CREATE TABLE IF NOT EXISTS `orders` (
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
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `order_items`
--

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_link` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_size` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `estimated_savings` decimal(10,2) DEFAULT '5000.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_items_order_id` (`order_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `delivery_tracking`
--

CREATE TABLE IF NOT EXISTS `delivery_tracking` (
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
  CONSTRAINT `delivery_tracking_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `exchange_rates`
--

CREATE TABLE IF NOT EXISTS `exchange_rates` (
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

--
-- Table structure for table `referrals`
--

CREATE TABLE IF NOT EXISTS `referrals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `referral_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referred_by` bigint DEFAULT NULL,
  `clicks` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `telegram_id` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
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
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `yuan_purchases`
--

CREATE TABLE IF NOT EXISTS `yuan_purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `telegram_id` bigint DEFAULT NULL,
  `amount_cny` decimal(10,2) DEFAULT NULL,
  `exchange_rate` decimal(10,4) DEFAULT NULL,
  `amount_rub` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','paid','completed','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `tariff` enum('standard','vip','super_vip') COLLATE utf8mb4_unicode_ci DEFAULT 'standard',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purchase_id`),
  KEY `telegram_id` (`telegram_id`),
  KEY `idx_yuan_telegram_id` (`telegram_id`),
  KEY `idx_yuan_created_at` (`created_at`),
  KEY `idx_yuan_status` (`status`),
  CONSTRAINT `yuan_purchases_ibfk_1` FOREIGN KEY (`telegram_id`) REFERENCES `users` (`telegram_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `profit_calculations`
--

CREATE TABLE IF NOT EXISTS `profit_calculations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `customer_commission` decimal(10,2) NOT NULL COMMENT 'Комиссия в рублях',
  `customer_product_cost_cny` decimal(10,2) NOT NULL COMMENT 'Стоимость товара в юанях',
  `customer_rate` decimal(10,4) NOT NULL COMMENT 'Курс для покупателя',
  `customer_delivery` decimal(10,2) NOT NULL COMMENT 'Доставка для покупателя',
  `customer_total` decimal(10,2) NOT NULL COMMENT 'Итого от покупателя',
  `my_product_cost_cny` decimal(10,2) NOT NULL COMMENT 'Стоимость товара в юанях',
  `my_rate` decimal(10,4) NOT NULL COMMENT 'Мой курс покупки юаней',
  `my_delivery` decimal(10,2) NOT NULL COMMENT 'Моя стоимость доставки',
  `my_total` decimal(10,2) NOT NULL COMMENT 'Итого мои расходы',
  `profit` decimal(10,2) NOT NULL COMMENT 'Чистая прибыль',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Кто создал расчет',
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `profit_calculations_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Расчеты прибыли по заказам';

SET FOREIGN_KEY_CHECKS = 1;