-- Исправление колонок status в таблицах orders и yuan_purchases
-- Сначала удаляем существующие колонки, затем добавляем заново

-- ============================================
-- ИСПРАВЛЕНИЕ ТАБЛИЦЫ ORDERS
-- ============================================

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

-- ============================================
-- ИСПРАВЛЕНИЕ ТАБЛИЦЫ YUAN_PURCHASES
-- ============================================

-- Удаляем существующую колонку status из таблицы yuan_purchases
ALTER TABLE yuan_purchases DROP COLUMN IF EXISTS status;

-- Добавляем колонку status заново с правильными параметрами
ALTER TABLE yuan_purchases 
ADD COLUMN status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending' 
COMMENT 'Статус покупки: pending - ожидает подтверждения, completed - завершена, cancelled - отменена';

-- Устанавливаем статус 'completed' для всех существующих покупок
UPDATE yuan_purchases SET status = 'completed' WHERE status = 'pending';

-- Создаем индекс для оптимизации запросов по статусу
CREATE INDEX idx_yuan_purchases_status ON yuan_purchases(status);

-- ============================================
-- ПРОВЕРКА РЕЗУЛЬТАТА
-- ============================================

-- Проверяем колонку status в таблице orders
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

-- Проверяем колонку status в таблице yuan_purchases
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

-- Показываем статистику по статусам
SELECT 'orders' as table_name, status, COUNT(*) as count FROM orders GROUP BY status
UNION ALL
SELECT 'yuan_purchases' as table_name, status, COUNT(*) as count FROM yuan_purchases GROUP BY status;




