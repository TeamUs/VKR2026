-- Добавление столбца avatar_url в таблицу users
-- Этот скрипт добавляет поле для хранения URL аватарки пользователя из Telegram

-- Проверяем, существует ли столбец avatar_url
SET @sql = (SELECT IF(
  (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
   WHERE TABLE_NAME = 'users'
   AND COLUMN_NAME = 'avatar_url'
   AND TABLE_SCHEMA = DATABASE()) = 0,
  'ALTER TABLE users ADD COLUMN avatar_url varchar(500) DEFAULT NULL',
  'SELECT "Column avatar_url already exists" as message'
));

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Добавляем комментарий к столбцу
ALTER TABLE users MODIFY COLUMN avatar_url varchar(500) DEFAULT NULL COMMENT 'URL аватарки пользователя из Telegram';

-- Проверяем результат
SELECT 
  COLUMN_NAME,
  DATA_TYPE,
  IS_NULLABLE,
  COLUMN_DEFAULT,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'users' 
AND TABLE_SCHEMA = DATABASE()
AND COLUMN_NAME = 'avatar_url';





