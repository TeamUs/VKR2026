# 🎯 ФИНАЛЬНАЯ ИНСТРУКЦИЯ: Применение --base=./

## ✅ Что было исправлено:

1. ✅ Добавлен `--base=./` в команду `npm run build` в `package.json`
2. ✅ Добавлен `base: './'` в `vite.config.ts`

Это решит проблему с путями к ресурсам, из-за которой стили не загружались!

---

## 🚀 БЫСТРОЕ ПРИМЕНЕНИЕ (1 способ)

### Автоматический скрипт:

```bash
# На сервере
cd /var/www/poizonic-mini-app
chmod +x БЫСТРОЕ_ПРИМЕНЕНИЕ_BASE.sh
./БЫСТРОЕ_ПРИМЕНЕНИЕ_BASE.sh
```

Скрипт автоматически выполнит все шаги!

---

## 📋 РУЧНОЕ ПРИМЕНЕНИЕ (2 способ)

Если хотите сделать вручную:

### Шаг 1: Обновить код
```bash
cd /var/www/poizonic-mini-app
git pull origin main
```

### Шаг 2: Проверить изменения
```bash
cd frontend

# Проверить package.json
grep "build" package.json
# Должно показать: "build": "vite build --base=./"

# Проверить vite.config.ts
grep "base:" vite.config.ts
# Должно показать: base: './',
```

### Шаг 3: Очистить и пересобрать
```bash
cd /var/www/poizonic-mini-app/frontend

# Очистить старые файлы
rm -rf dist .vite node_modules/.vite

# Пересобрать
npm run build
```

### Шаг 4: Проверить пути
```bash
cd /var/www/poizonic-mini-app/frontend/dist

# Проверить index.html - пути должны быть относительными
grep -E 'href=|src=' index.html | head -5

# Должны быть пути вида:
# href="./assets/index-xxx.css"
# src="./assets/index-xxx.js"
```

### Шаг 5: Исправить права
```bash
sudo chown -R www-data:www-data /var/www/poizonic-mini-app/frontend/dist
sudo chmod -R 755 /var/www/poizonic-mini-app/frontend/dist
```

### Шаг 6: Перезагрузить Nginx
```bash
sudo systemctl reload nginx
```

---

## 🔍 ПРОВЕРКА РЕЗУЛЬТАТА

### 1. Проверить в браузере:
- Откройте сайт
- Сделайте Hard Refresh: **Ctrl+Shift+R** (Windows) или **Cmd+Shift+R** (Mac)
- Откройте консоль (F12 → Console)
- Проверьте, что стили применяются

### 2. Проверить Network tab:
- F12 → Network
- Обновите страницу
- Все ресурсы должны загружаться с кодом **200 OK**
- Проверьте, что пути относительные (начинаются с `./`)

### 3. Проверить стили:
В консоли браузера выполните:
```javascript
// Проверить style тег
const styleTag = document.querySelector('style[data-styled]');
console.log('Style tag found:', !!styleTag);
console.log('Style content length:', styleTag?.textContent?.length || 0);

// Проверить CSS переменные
const styles = getComputedStyle(document.documentElement);
console.log('--bg-primary:', styles.getPropertyValue('--bg-primary'));
console.log('--text-primary:', styles.getPropertyValue('--text-primary'));

// Проверить стили кнопки
const btn = document.querySelector('button');
if (btn) {
  const btnStyles = window.getComputedStyle(btn);
  console.log('Button background:', btnStyles.background);
  console.log('Button border-radius:', btnStyles.borderRadius);
}
```

---

## ⚠️ ЕСЛИ ПРОБЛЕМА СОХРАНЯЕТСЯ

### Проверить логи Nginx:
```bash
sudo tail -f /var/log/nginx/error.log
```

### Проверить логи сборки:
```bash
cd /var/www/poizonic-mini-app/frontend
npm run build 2>&1 | tee build.log
cat build.log | grep -i "error\|warn"
```

### Проверить, что изменения применились:
```bash
cd /var/www/poizonic-mini-app/frontend

# Проверить package.json
cat package.json | grep -A 2 "build"

# Проверить vite.config.ts
cat vite.config.ts | grep -A 2 "base:"
```

---

## 📝 ЧТО ДЕЛАЕТ `--base=./`?

**До исправления:**
- Пути были абсолютными: `/assets/index.js`
- Не работали, если сайт в подпапке или при определенных конфигурациях Nginx

**После исправления:**
- Пути относительные: `./assets/index.js`
- Работают всегда, независимо от конфигурации сервера

Это стандартное решение для production сборок Vite!

---

## ✅ ОЖИДАЕМЫЙ РЕЗУЛЬТАТ

После применения:
- ✅ Все ресурсы загружаются (CSS, JS, изображения, шрифты)
- ✅ Стили применяются корректно
- ✅ Сайт выглядит идентично локальной версии
- ✅ Нет ошибок в консоли браузера

Удачи! 🎉

