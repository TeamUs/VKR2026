-- Исправление колонки status в таблице yuan_purchases
-- Проверяем существование колонки и исправляем при необходимости

-- Проверяем, существует ли колонка status в yuan_purchases
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_NAME = 'yuan_purchases'
   AND COLUMN_NAME = 'status'
   AND TABLE_SCHEMA = DATABASE()) > 0,
  'SELECT "Column status already exists in yuan_purchases" as message',
  'ALTER TABLE yuan_purchases ADD COLUMN status ENUM(''pending'', ''completed'', ''cancelled'') DEFAULT ''pending'' COMMENT ''Статус покупки: pending - ожидает подтверждения, completed - завершена, cancelled - отменена'''
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Если колонка уже существует, обновляем её параметры
ALTER TABLE yuan_purchases 
MODIFY COLUMN status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending' 
COMMENT 'Статус покупки: pending - ожидает подтверждения, completed - завершена, cancelled - отменена';

-- Устанавливаем статус 'completed' для всех существующих покупок
UPDATE yuan_purchases SET status = 'completed' WHERE status = 'pending';

-- Создаем индекс для оптимизации запросов по статусу
CREATE INDEX idx_yuan_purchases_status ON yuan_purchases(status);

-- Проверяем результат
SELECT 
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'yuan_purchases' 
AND TABLE_SCHEMA = DATABASE()
AND COLUMN_NAME = 'status';




