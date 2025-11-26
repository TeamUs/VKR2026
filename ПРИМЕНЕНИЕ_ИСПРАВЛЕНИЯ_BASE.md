# 🔧 ПРИМЕНЕНИЕ ИСПРАВЛЕНИЯ --base=./

## Что делает `--base=./`?

Параметр `--base=./` в команде сборки Vite указывает, что все пути к ресурсам должны быть относительными, а не абсолютными. Это критично для production, особенно когда приложение развернуто на сервере.

**Без `--base=./`:**
- Пути: `/assets/index.js` (абсолютные)
- Могут не работать на поддоменах или в подпапках

**С `--base=./`:**
- Пути: `./assets/index.js` (относительные)
- Работают везде!

---

## 🚀 ИНСТРУКЦИЯ ДЛЯ СЕРВЕРА

### Шаг 1: Подключиться к серверу
```bash
ssh root@ваш_сервер_ip
# или
ssh root@poizonic.ru
```

### Шаг 2: Перейти в директорию проекта
```bash
cd /var/www/poizonic-mini-app
```

### Шаг 3: Обновить код с GitHub
```bash
git pull origin main
```

### Шаг 4: Проверить, что изменение применилось
```bash
cd frontend
cat package.json | grep "build"
# Должно показать: "build": "vite build --base=./",
```

### Шаг 5: Очистить старую сборку
```bash
cd /var/www/poizonic-mini-app/frontend
rm -rf dist .vite node_modules/.vite
```

### Шаг 6: Пересобрать проект с новым параметром
```bash
npm run build
```

Вы должны увидеть в выводе, что используется `--base=./`.

### Шаг 7: Проверить собранные файлы
```bash
# Проверить index.html - пути должны быть относительными
cat dist/index.html | grep -E "href=|src=" | head -10

# Должны быть пути вида:
# - href="./assets/..."
# - src="./assets/..."
# А НЕ:
# - href="/assets/..."
# - src="/assets/..."
```

### Шаг 8: Исправить права доступа
```bash
sudo chown -R www-data:www-data /var/www/poizonic-mini-app/frontend/dist
sudo chmod -R 755 /var/www/poizonic-mini-app/frontend/dist
```

### Шаг 9: Перезагрузить Nginx
```bash
sudo systemctl reload nginx
```

### Шаг 10: Проверить сайт
1. Откройте сайт в браузере
2. Откройте консоль (F12 → Console)
3. Проверьте, что стили применяются
4. Проверьте Network tab - все ресурсы должны загружаться (200 OK)

---

## 🔍 ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА

### Проверить пути в index.html
```bash
cd /var/www/poizonic-mini-app/frontend/dist
cat index.html | grep -oP '(href|src)="[^"]*"' | head -10
```

**Ожидаемый результат:**
```
href="./assets/index-xxx.css"
src="./assets/index-xxx.js"
```

**НЕ должно быть:**
```
href="/assets/index-xxx.css"
src="/assets/index-xxx.js"
```

### Проверить логи сборки
```bash
cd /var/www/poizonic-mini-app/frontend
npm run build 2>&1 | tee build.log

# Проверить на ошибки
grep -i "error\|warn\|fail" build.log
```

### Проверить в браузере консоль
Откройте сайт и выполните в консоли:
```javascript
// Проверить, что ресурсы загружаются
const links = Array.from(document.querySelectorAll('link[href], script[src]'));
console.log('Ресурсы:');
links.forEach(link => {
  const attr = link.href || link.src;
  console.log(attr, '✅' || '❌');
});

// Проверить стили
const styleTag = document.querySelector('style[data-styled]');
console.log('Style tag length:', styleTag?.textContent?.length || 0);
```

---

## ⚠️ ЕСЛИ НЕ ПОМОГЛО

Если проблема сохраняется, проверьте:

1. **Nginx конфигурация** - возможно, нужны дополнительные настройки:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```

2. **Права доступа** - убедитесь, что nginx может читать файлы

3. **Кеш браузера** - сделайте Hard Refresh (Ctrl+Shift+R)

4. **Логи Nginx**:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   ```

---

## ✅ ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

После применения `--base=./`:
- ✅ Все пути к ресурсам относительные
- ✅ Стили загружаются и применяются
- ✅ JavaScript файлы загружаются
- ✅ Шрифты загружаются
- ✅ Изображения загружаются
- ✅ Сайт выглядит как в локальной версии

