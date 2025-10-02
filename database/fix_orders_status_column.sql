-- Исправление колонки status в таблице orders
-- Сначала удаляем существующую колонку, затем добавляем заново

-- Удаляем существующую колонку status из таблицы orders
ALTER TABLE orders DROP COLUMN IF EXISTS status;

-- Добавляем колонку status заново с правильными параметрами
ALTER TABLE orders 
ADD COLUMN status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending' 
COMMENT 'Статус заказа: pending - ожидает подтверждения, completed - завершен, cancelled - отменен';

-- Устанавливаем статус 'completed' для всех существующих заказов
UPDATE orders SET status = 'completed' WHERE status = 'pending';

-- Создаем индекс для оптимизации запросов по статусу
CREATE INDEX idx_orders_status ON orders(status);

-- Проверяем результат
SELECT 
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'orders' 
AND TABLE_SCHEMA = DATABASE()
AND COLUMN_NAME = 'status';




