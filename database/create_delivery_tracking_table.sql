-- Создание таблицы для отслеживания доставки
CREATE TABLE delivery_tracking (
    tracking_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    internal_tracking_number VARCHAR(50) UNIQUE NOT NULL,
    status ENUM(
        'Создан', 
        'Доставка внутри Китая', 
        'На складе в Китае', 
        'Отправлен на таможню', 
        'Доставка в РФ', 
        'Доставлен'
    ) DEFAULT 'Создан',
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_tracking_number (internal_tracking_number),
    INDEX idx_order_id (order_id),
    INDEX idx_status (status)
);

-- Добавляем tracking_number в существующие заказы (если есть)
INSERT INTO delivery_tracking (order_id, internal_tracking_number, status)
SELECT 
    order_id, 
    CONCAT('POIZ-', LPAD(order_id, 6, '0')) as internal_tracking_number,
    'Создан' as status
FROM orders 
WHERE order_id NOT IN (SELECT order_id FROM delivery_tracking);
