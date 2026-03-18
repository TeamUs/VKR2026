-- Копирование всех таблиц со всем содержимым в таблицы с префиксом vkr_
-- Запускать в той же БД (default_db), где лежат исходные таблицы.
-- В DBeaver: выберите default_db и выполните весь скрипт.

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Удалить старые vkr_ таблицы (если есть)
DROP TABLE IF EXISTS `vkr_system_logs`;
DROP TABLE IF EXISTS `vkr_user_activity`;
DROP TABLE IF EXISTS `vkr_profit_calculations`;
DROP TABLE IF EXISTS `vkr_yuan_purchases`;
DROP TABLE IF EXISTS `vkr_reviews`;
DROP TABLE IF EXISTS `vkr_referrals`;
DROP TABLE IF EXISTS `vkr_exchange_rates`;
DROP TABLE IF EXISTS `vkr_delivery_tracking`;
DROP TABLE IF EXISTS `vkr_order_items`;
DROP TABLE IF EXISTS `vkr_level_history`;
DROP TABLE IF EXISTS `vkr_xp_history`;
DROP TABLE IF EXISTS `vkr_user_achievements`;
DROP TABLE IF EXISTS `vkr_orders`;
DROP TABLE IF EXISTS `vkr_achievements`;
DROP TABLE IF EXISTS `vkr_users`;

-- 2. Создать копии таблиц со всеми данными (структура + данные)
-- Порядок: сначала таблицы без зависимостей, потом зависимые.
CREATE TABLE `vkr_achievements` AS SELECT * FROM `achievements`;
CREATE TABLE `vkr_users` AS SELECT * FROM `users`;
CREATE TABLE `vkr_orders` AS SELECT * FROM `orders`;
CREATE TABLE `vkr_user_achievements` AS SELECT * FROM `user_achievements`;
CREATE TABLE `vkr_xp_history` AS SELECT * FROM `xp_history`;
CREATE TABLE `vkr_level_history` AS SELECT * FROM `level_history`;
CREATE TABLE `vkr_order_items` AS SELECT * FROM `order_items`;
CREATE TABLE `vkr_delivery_tracking` AS SELECT * FROM `delivery_tracking`;
CREATE TABLE `vkr_exchange_rates` AS SELECT * FROM `exchange_rates`;
CREATE TABLE `vkr_referrals` AS SELECT * FROM `referrals`;
CREATE TABLE `vkr_reviews` AS SELECT * FROM `reviews`;
CREATE TABLE `vkr_yuan_purchases` AS SELECT * FROM `yuan_purchases`;
CREATE TABLE `vkr_profit_calculations` AS SELECT * FROM `profit_calculations`;

-- Если в БД есть эти таблицы — раскомментируйте:
-- CREATE TABLE `vkr_user_activity` AS SELECT * FROM `user_activity`;
-- CREATE TABLE `vkr_system_logs` AS SELECT * FROM `system_logs`;

SET FOREIGN_KEY_CHECKS = 1;
