# 🔄 ШАГ 1: PM2 для Backend (правильный подход)

## ✅ КАК ЭТО РАБОТАЕТ:

### ❌ НЕПРАВИЛЬНО (мой предыдущий подход):
- Frontend и backend в одном процессе PM2
- Frontend "запускается" как процесс

### ✅ ПРАВИЛЬНО:
- **PM2 управляет ТОЛЬКО backend** (Node.js процесс)
- **Frontend = статические файлы** в `dist/`, раздаются через Nginx
- Frontend собирается один раз при деплое, затем просто отдается как файлы

---

## 🚀 НАСТРОЙКА:

### Шаг 1: Обновить код

```bash
cd /var/www/poizonic-mini-app
git pull origin main
```

### Шаг 2: PM2 управляет только backend

Уже настроено в `ecosystem.config.js`:
- Имя процесса: `poizonic-backend`
- Скрипт: `./backend/server.js`
- Только backend, frontend не здесь!

### Шаг 3: Запустить/перезапустить backend

```bash
# Если уже запущен
pm2 restart poizonic-backend

# Если не запущен
pm2 start ecosystem.config.js
```

### Шаг 4: Сохранить конфигурацию

```bash
pm2 save
```

### Шаг 5: Проверить статус

```bash
pm2 status
pm2 logs poizonic-backend --lines 50
```

---

## 📦 ДЕПЛОЙ (когда обновляете код):

### Вариант 1: Ручной

```bash
cd /var/www/poizonic-mini-app

# 1. Обновить код
git pull origin main

# 2. Собрать frontend
cd frontend
npm run build

# 3. Перезапустить backend
cd ..
pm2 restart poizonic-backend
```

### Вариант 2: Автоматический (скрипт)

```bash
cd /var/www/poizonic-mini-app
chmod +x deploy-production.sh
./deploy-production.sh
```

Скрипт автоматически:
1. Обновит код
2. Соберет frontend
3. Перезапустит backend

---

## ✅ РЕЗУЛЬТАТ:

- ✅ PM2 управляет только backend процессом
- ✅ Frontend собирается при деплое, затем раздается через Nginx
- ✅ Автозапуск backend после перезагрузки сервера
- ✅ Автоматический перезапуск при ошибках

**Простой и правильный подход!**

