-- Добавление поля status в таблицы orders и yuan_purchases
-- Для системы подтверждения заказов админом

-- Добавляем поле status в таблицу orders
ALTER TABLE orders 
ADD COLUMN status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending' 
COMMENT 'Статус заказа: pending - ожидает подтверждения, completed - завершен, cancelled - отменен';

-- Добавляем поле status в таблицу yuan_purchases (если его еще нет)
-- Проверяем, существует ли уже поле status
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_NAME = 'yuan_purchases'
   AND COLUMN_NAME = 'status'
   AND TABLE_SCHEMA = DATABASE()) = 0,
  'ALTER TABLE yuan_purchases ADD COLUMN status ENUM(''pending'', ''completed'', ''cancelled'') DEFAULT ''pending'' COMMENT ''Статус покупки: pending - ожидает подтверждения, completed - завершена, cancelled - отменена''',
  'SELECT "Column status already exists in yuan_purchases" as message'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Обновляем существующие записи - устанавливаем статус 'completed' для уже существующих заказов
UPDATE orders SET status = 'completed' WHERE status = 'pending';
UPDATE yuan_purchases SET status = 'completed' WHERE status = 'pending';

-- Создаем индексы для оптимизации запросов по статусу
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_yuan_purchases_status ON yuan_purchases(status);

-- Проверяем результат
SELECT 
  'orders' as table_name,
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'orders' 
AND TABLE_SCHEMA = DATABASE()
AND COLUMN_NAME = 'status'

UNION ALL

SELECT 
  'yuan_purchases' as table_name,
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'yuan_purchases' 
AND TABLE_SCHEMA = DATABASE()
AND COLUMN_NAME = 'status';




