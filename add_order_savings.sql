-- Добавляем поле estimated_savings в таблицу orders
ALTER TABLE orders ADD COLUMN estimated_savings DECIMAL(10,2) DEFAULT 5000.00;

-- Обновляем существующие заказы, устанавливая им экономию 5000₽
UPDATE orders SET estimated_savings = 5000.00 WHERE estimated_savings IS NULL;




