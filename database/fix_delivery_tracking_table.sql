-- Удаление существующей таблицы delivery_tracking и всех связанных индексов
DROP TABLE IF EXISTS `delivery_tracking`;

-- Создание новой таблицы delivery_tracking подходящей под систему
CREATE TABLE `delivery_tracking` (
  `tracking_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `internal_tracking_number` varchar(50) NOT NULL UNIQUE,
  `status` ENUM(
    'Создан', 
    'Доставка внутри Китая', 
    'На складе в Китае', 
    'Отправлен на таможню', 
    'Доставка в РФ', 
    'Доставлен'
  ) DEFAULT 'Создан',
  `last_updated` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tracking_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  INDEX `idx_tracking_number` (`internal_tracking_number`),
  INDEX `idx_order_id` (`order_id`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Добавляем tracking_number в существующие заказы (если есть)
INSERT INTO delivery_tracking (order_id, internal_tracking_number, status)
SELECT 
    order_id, 
    CONCAT('POIZONIC-', LPAD(order_id, 6, '0')) as internal_tracking_number,
    'Создан' as status
FROM orders 
WHERE order_id NOT IN (SELECT order_id FROM delivery_tracking);

-- Проверяем результат
SELECT 
    COUNT(*) as total_orders,
    COUNT(dt.order_id) as orders_with_tracking
FROM orders o
LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id;
