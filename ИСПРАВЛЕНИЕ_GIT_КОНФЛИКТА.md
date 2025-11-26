# 🔧 ИСПРАВЛЕНИЕ КОНФЛИКТА GIT

## Проблема:
Git не может обновить код, потому что:
1. `node_modules` содержит локальные изменения (но он не должен быть в Git!)
2. Есть изменения в важных файлах (package.json, vite.config.ts)

## ✅ РЕШЕНИЕ:

### Вариант 1: Отменить все локальные изменения и обновить (рекомендуется)

```bash
cd /var/www/poizonic-mini-app

# 1. Удалить node_modules (он не должен быть в Git)
rm -rf frontend/node_modules backend/node_modules

# 2. Отменить все локальные изменения и получить свежий код из Git
git reset --hard HEAD
git clean -fd

# 3. Обновить код с GitHub
git pull origin main

# 4. Переустановить зависимости
cd frontend
npm ci

# 5. Пересобрать проект
npm run build
```

### Вариант 2: Сохранить изменения и обновить

Если вы хотите сохранить какие-то локальные изменения:

```bash
cd /var/www/poizonic-mini-app

# 1. Удалить node_modules
rm -rf frontend/node_modules backend/node_modules

# 2. Сохранить изменения в stash
git stash

# 3. Обновить код
git pull origin main

# 4. Вернуть изменения (если нужно)
git stash pop

# 5. Переустановить зависимости
cd frontend
npm ci

# 6. Пересобрать проект
npm run build
```

### Вариант 3: Принудительное обновление (если не важны локальные изменения)

```bash
cd /var/www/poizonic-mini-app

# 1. Удалить все локальные изменения
git fetch origin
git reset --hard origin/main

# 2. Удалить node_modules
rm -rf frontend/node_modules backend/node_modules

# 3. Переустановить зависимости
cd frontend
npm ci

# 4. Пересобрать проект
npm run build
```

---

## 🎯 РЕКОМЕНДУЕМЫЙ ПОДХОД:

Используйте **Вариант 1** - он самый безопасный и чистый.

После этого примените исправление `--base=./` через новый код из Git.

