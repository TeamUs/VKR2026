# 🔧 ИСПРАВЛЕНИЕ ПРОБЛЕМЫ С TELEGRAM MINI APP

## ✅ ЧТО ИСПРАВЛЕНО:

1. **Убрал localhost из heartbeat URL** - теперь используется относительный путь `/api/...`
2. **Улучшена обработка загрузки** - приложение запустится даже если Telegram WebApp не загрузился
3. **Увеличен таймаут загрузки** до 2 секунд

---

## 🚀 ЧТО НУЖНО СДЕЛАТЬ НА СЕРВЕРЕ:

### Шаг 1: Обновить код

```bash
cd /var/www/poizonic-mini-app
git pull origin main
```

### Шаг 2: Пересобрать frontend

```bash
cd frontend
npm run build
cd ..
```

### Шаг 3: Проверить/настроить CORS в backend

Проверьте, что в `backend/.env` правильно настроены CORS:

```env
CORS_ORIGINS=https://poizonic.ru,https://web.telegram.org,https://webk.telegram.org,https://webz.telegram.org
```

Или если CORS настроен через код, проверьте `backend/server.js` - должно быть:
```javascript
app.use(cors({
  origin: ['https://poizonic.ru', 'https://web.telegram.org', 'https://webk.telegram.org', 'https://webz.telegram.org'],
  credentials: true
}));
```

### Шаг 4: Перезапустить backend

```bash
pm2 restart poizonic-backend
```

### Шаг 5: Проверить логи

```bash
pm2 logs poizonic-backend --lines 50
```

Ищите ошибки при запросе `/api/user/init`.

---

## 🔍 ДИАГНОСТИКА:

### Проверить в браузере (не в Telegram):

1. Откройте https://poizonic.ru/ в обычном браузере
2. Откройте консоль (F12)
3. Проверьте ошибки:
   - CORS errors
   - Failed to fetch
   - Network errors

### Проверить API:

```bash
curl https://poizonic.ru/api/health
```

Должно вернуть:
```json
{"status":"OK","timestamp":"..."}
```

### Проверить логи backend:

```bash
pm2 logs poizonic-backend --lines 100 | grep -i "error\|cors\|init"
```

---

## ⚠️ ВОЗМОЖНЫЕ ПРОБЛЕМЫ:

### 1. CORS ошибки

**Решение:** Убедитесь, что CORS разрешает запросы с Telegram доменов:
- `https://web.telegram.org`
- `https://webk.telegram.org`  
- `https://webz.telegram.org`

### 2. API не отвечает

**Решение:** Проверьте, что backend работает:
```bash
curl http://localhost:3000/api/health
pm2 status
```

### 3. Telegram WebApp скрипт не загружается

**Решение:** Проверьте в Network tab, загружается ли `telegram-web-app.js`

### 4. Бесконечная загрузка

**Решение:** 
- Откройте консоль браузера
- Найдите ошибки JavaScript
- Проверьте, что все ресурсы загружаются

---

## 📝 ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА:

### Проверить Nginx конфигурацию:

```bash
sudo nginx -t
sudo systemctl status nginx
```

### Проверить SSL сертификат:

```bash
curl -I https://poizonic.ru
```

Должен показать `200 OK` или `301/302 redirect`.

---

## ✅ ПОСЛЕ ИСПРАВЛЕНИЙ:

1. Обновите код на сервере
2. Пересоберите frontend
3. Перезапустите backend
4. Проверьте работу в Telegram

Если проблема сохраняется, проверьте консоль браузера на ошибки!

