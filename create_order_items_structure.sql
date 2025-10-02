-- Создаем таблицу для товаров в заказах
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_link TEXT NOT NULL,
  product_size VARCHAR(50),
  quantity INT DEFAULT 1,
  estimated_savings DECIMAL(10,2) DEFAULT 5000.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);

-- Удаляем старые поля из таблицы orders
ALTER TABLE orders DROP COLUMN product_link;
ALTER TABLE orders DROP COLUMN product_size; 
ALTER TABLE orders DROP COLUMN quantity;

-- Обновляем существующие заказы - создаем записи в order_items
INSERT INTO order_items (order_id, product_link, product_size, quantity, estimated_savings)
SELECT 
  order_id,
  product_link,
  product_size,
  quantity,
  5000.00 as estimated_savings
FROM orders 
WHERE product_link IS NOT NULL;

-- Удаляем старые поля после миграции данных
-- (уже удалены выше)
