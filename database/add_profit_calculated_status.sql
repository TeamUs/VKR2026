-- Добавляем новый статус "profit_calculated" для заказов
ALTER TABLE orders MODIFY COLUMN status 
  ENUM('pending', 'paid', 'completed', 'cancelled', 'profit_calculated') 
  DEFAULT 'pending';

-- Проверяем, что изменения применились
SELECT COLUMN_TYPE 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() 
  AND TABLE_NAME = 'orders' 
  AND COLUMN_NAME = 'status';

