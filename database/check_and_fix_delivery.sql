-- Проверяем существование таблицы delivery_tracking
SHOW TABLES LIKE 'delivery_tracking';

-- Проверяем структуру таблицы
DESCRIBE delivery_tracking;

-- Проверяем количество записей
SELECT COUNT(*) as total_tracking_records FROM delivery_tracking;

-- Проверяем количество заказов
SELECT COUNT(*) as total_orders FROM orders;

-- Если таблица пуста, создаем записи для всех существующих заказов
INSERT IGNORE INTO delivery_tracking (order_id, internal_tracking_number, status)
SELECT 
    order_id, 
    CONCAT('POIZONIC-', LPAD(order_id, 6, '0')) as internal_tracking_number,
    'Создан' as status
FROM orders;

-- Проверяем результат
SELECT 
    COUNT(*) as total_orders,
    COUNT(dt.order_id) as orders_with_tracking,
    (COUNT(dt.order_id) / COUNT(*)) * 100 as coverage_percentage
FROM orders o
LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id;

-- Показываем несколько примеров
SELECT 
    o.order_id,
    o.telegram_id,
    o.full_name,
    dt.internal_tracking_number,
    dt.status,
    dt.created_at
FROM orders o
LEFT JOIN delivery_tracking dt ON o.order_id = dt.order_id
ORDER BY o.order_id DESC
LIMIT 5;

