-- Создаем таблицу для хранения расчетов прибыли
CREATE TABLE IF NOT EXISTS profit_calculations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  
  -- Сколько заплатил покупатель
  customer_commission DECIMAL(10, 2) NOT NULL COMMENT 'Комиссия в рублях',
  customer_product_cost_cny DECIMAL(10, 2) NOT NULL COMMENT 'Стоимость товара в юанях',
  customer_rate DECIMAL(10, 4) NOT NULL COMMENT 'Курс для покупателя',
  customer_delivery DECIMAL(10, 2) NOT NULL COMMENT 'Доставка для покупателя',
  customer_total DECIMAL(10, 2) NOT NULL COMMENT 'Итого от покупателя',
  
  -- Сколько потратил я
  my_product_cost_cny DECIMAL(10, 2) NOT NULL COMMENT 'Стоимость товара в юанях',
  my_rate DECIMAL(10, 4) NOT NULL COMMENT 'Мой курс покупки юаней',
  my_delivery DECIMAL(10, 2) NOT NULL COMMENT 'Моя стоимость доставки',
  my_total DECIMAL(10, 2) NOT NULL COMMENT 'Итого мои расходы',
  
  -- Итоговая прибыль
  profit DECIMAL(10, 2) NOT NULL COMMENT 'Чистая прибыль',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(255) COMMENT 'Кто создал расчет',
  
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  INDEX idx_order_id (order_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Расчеты прибыли по заказам';

-- Обновляем ENUM для статусов заказов, добавляем "paid" (оплачено)
ALTER TABLE orders MODIFY COLUMN status ENUM('pending', 'paid', 'completed', 'cancelled') DEFAULT 'pending';

