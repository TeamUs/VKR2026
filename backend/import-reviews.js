const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Подключение к базе данных
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'default_db',
  charset: 'utf8mb4'
};

async function ensureUser(connection, username, fullName) {
  // Если username null, используем случайный telegram_id (для отзывов без username)
  // Но лучше найти существующего пользователя или создать с null username
  let telegramId;
  
  if (username) {
    // Пытаемся найти пользователя по username
    const [users] = await connection.execute(
      'SELECT telegram_id FROM users WHERE username = ?',
      [username]
    );
    
    if (users.length > 0) {
      return users[0].telegram_id;
    }
    
    // Если не найден, создаем нового пользователя
    // Используем случайный telegram_id (начиная с 1000000, чтобы не пересекаться с реальными)
    telegramId = 1000000 + Math.floor(Math.random() * 1000000);
    
    await connection.execute(
      'INSERT INTO users (telegram_id, username, full_name, registration_date) VALUES (?, ?, ?, NOW())',
      [telegramId, username, fullName || null]
    );
    
    return telegramId;
  } else if (fullName) {
    // Если нет username, но есть fullName, создаем пользователя с null username
    telegramId = 1000000 + Math.floor(Math.random() * 1000000);
    
    await connection.execute(
      'INSERT INTO users (telegram_id, username, full_name, registration_date) VALUES (?, ?, ?, NOW())',
      [telegramId, null, fullName]
    );
    
    return telegramId;
  }
  
  // Если ни username, ни fullName нет, создаем анонимного пользователя
  telegramId = 1000000 + Math.floor(Math.random() * 1000000);
  await connection.execute(
    'INSERT INTO users (telegram_id, username, full_name, registration_date) VALUES (?, ?, ?, NOW())',
    [telegramId, null, 'Аноним', NOW()]
  );
  
  return telegramId;
}

async function importReviews() {
  let connection;
  
  try {
    // Читаем JSON файл
    const jsonPath = path.join(__dirname, 'reviews-data.json');
    const jsonData = fs.readFileSync(jsonPath, 'utf8');
    const reviews = JSON.parse(jsonData);
    
    console.log(`Найдено ${reviews.length} отзывов для импорта`);
    
    // Подключаемся к БД
    connection = await mysql.createConnection(dbConfig);
    console.log('Подключено к базе данных');
    
    for (const review of reviews) {
      try {
        // Получаем или создаем пользователя
        const telegramId = await ensureUser(connection, review.username, review.fullName);
        
        // Вставляем отзыв с рейтингом 5
        const [result] = await connection.execute(
          `INSERT INTO reviews (telegram_id, username, full_name, rating, review_text, photo_url, created_at)
           VALUES (?, ?, ?, 5, ?, ?, ?)`,
          [
            telegramId,
            review.username || null,
            review.fullName || null,
            review.text,
            null, // photo_url будет null, все фото будут в review_photos
            review.date || new Date()
          ]
        );
        
        const reviewId = result.insertId;
        
        // Обрабатываем фотографии
        if (review.photoUrls && Array.isArray(review.photoUrls) && review.photoUrls.length > 0) {
          // Первую фотографию сохраняем в photo_url для обратной совместимости
          const firstPhoto = review.photoUrls[0];
          
          await connection.execute(
            'UPDATE reviews SET photo_url = ? WHERE review_id = ?',
            [firstPhoto, reviewId]
          );
          
          // Все фотографии сохраняем в review_photos
          for (const photoUrl of review.photoUrls) {
            await connection.execute(
              'INSERT INTO review_photos (review_id, photo_url) VALUES (?, ?)',
              [reviewId, photoUrl]
            );
          }
          
          console.log(`✓ Отзыв ${reviewId}: ${review.username || review.fullName || 'Аноним'} - ${review.photoUrls.length} фото`);
        } else {
          console.log(`✓ Отзыв ${reviewId}: ${review.username || review.fullName || 'Аноним'} - без фото`);
        }
        
      } catch (error) {
        console.error(`Ошибка при импорте отзыва:`, error.message);
        console.error(`Отзыв:`, review);
      }
    }
    
    console.log('\nИмпорт завершен!');
    
  } catch (error) {
    console.error('Ошибка при импорте:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Запускаем импорт
importReviews();
