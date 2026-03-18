-- Удаление всех таблиц ВКР с префиксом vkr_ в default_db.
-- Использование: mysql -h ХОСТ -u ПОЛЬЗОВАТЕЛЬ -p default_db < database/drop_vkr_tables.sql
-- Выполнять перед пересозданием vkr_ таблиц из копии основных (см. DEPLOY_SECOND_MINI_APP_ON_SERVER.md).

SET FOREIGN_KEY_CHECKS = 0;

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

SET FOREIGN_KEY_CHECKS = 1;
