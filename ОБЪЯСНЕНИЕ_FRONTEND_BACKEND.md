# 📚 ОБЪЯСНЕНИЕ: Как работают Frontend и Backend в Production

## 🤔 ВОПРОС: Нужно ли запускать Frontend в production?

**Короткий ответ: НЕТ!** Frontend в production НЕ запускается как процесс.

---

## 🏗️ КАК ЭТО РАБОТАЕТ:

### Development (локально) - ДВА процесса:

```
┌─────────────────┐      ┌─────────────────┐
│  Frontend       │      │  Backend        │
│  (Vite Dev)     │      │  (Node.js)      │
│  порт 3001      │◄────►│  порт 3000      │
│  npm run dev    │      │  npm start      │
└─────────────────┘      └─────────────────┘
```

**Зачем два процесса:**
- Frontend dev server предоставляет hot reload (изменения видны сразу)
- Backend API работает отдельно
- Можно разрабатывать независимо

---

### Production (на сервере) - ОДИН процесс + статические файлы:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Nginx          │      │  Backend        │      │  Frontend       │
│  (веб-сервер)   │      │  (Node.js)      │      │  (статические   │
│  порт 80/443    │      │  порт 3000      │      │   файлы)        │
│                 │      │  PM2            │      │  dist/          │
│  Раздает HTML,  │      │  npm start      │      │  (НЕ процесс!)  │
│  CSS, JS файлы  │      │                 │      │                 │
│  из frontend/   │      │  Обрабатывает   │      │  Просто файлы   │
│  dist/          │      │  API запросы    │      │  на диске       │
└─────────────────┘      └─────────────────┘      └─────────────────┘
     │                          │
     └──────────┬───────────────┘
                │
                ▼
         Пользователь
```

**Как это работает:**

1. **Frontend:**
   - ✅ Собирается один раз: `npm run build`
   - ✅ Создает статические файлы в `frontend/dist/`
   - ✅ Это просто HTML, CSS, JS файлы на диске
   - ✅ НЕ запускается как процесс
   - ✅ Отдается через Nginx как обычный сайт

2. **Backend:**
   - ✅ Запускается как Node.js процесс через PM2
   - ✅ Обрабатывает API запросы (`/api/*`)
   - ✅ Работает постоянно
   - ✅ Перезапускается автоматически

3. **Nginx:**
   - ✅ Отдает статические файлы frontend из `dist/`
   - ✅ Проксирует API запросы на backend (`/api/*` → `http://localhost:3000`)

---

## 🔄 ЧТО ДЕЛАЕТСЯ ПРИ ДЕПЛОЕ:

### Шаг 1: Обновление кода
```bash
git pull origin main
```

### Шаг 2: Сборка Frontend (один раз)
```bash
cd frontend
npm run build  # Создает статические файлы в dist/
```

### Шаг 3: Запуск Backend (постоянно)
```bash
pm2 start ecosystem.config.js  # Запускает backend процесс
```

### Шаг 4: Nginx уже настроен и раздает файлы

---

## ✅ ПРАВИЛЬНАЯ КОНФИГУРАЦИЯ:

### PM2 управляет ТОЛЬКО Backend:

```javascript
// ecosystem.config.js
{
  name: 'poizonic-backend',
  script: './backend/server.js',  // Только backend!
  // Frontend НЕ здесь!
}
```

### Frontend собирается отдельно:

```bash
cd frontend
npm run build  # Создает dist/ с готовыми файлами
```

### Nginx раздает Frontend и проксирует Backend:

```nginx
server {
    # Frontend - статические файлы
    location / {
        root /var/www/poizonic-mini-app/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Backend - прокси на Node.js процесс
    location /api/ {
        proxy_pass http://localhost:3000;
    }
}
```

---

## 🎯 ИТОГО:

### ❌ НЕПРАВИЛЬНО:
- Запускать frontend как Node.js процесс в production
- Иметь два процесса PM2 (frontend + backend)

### ✅ ПРАВИЛЬНО:
- Frontend = статические файлы (dist/), отдаются через Nginx
- Backend = один процесс Node.js, управляется через PM2
- Frontend собирается при деплое, затем просто отдается как файлы

---

## 📝 ЧТО НУЖНО СДЕЛАТЬ:

1. **PM2 должен управлять ТОЛЬКО backend**
2. **Frontend собирается отдельно при деплое** (или через скрипт)
3. **Nginx уже настроен и раздает frontend файлы**

**Мой предыдущий скрипт `start-production.js` был избыточным** - он собирал frontend, но frontend не нужно "запускать", он просто должен быть собран.

**Правильный подход:** PM2 для backend, сборка frontend при деплое.

