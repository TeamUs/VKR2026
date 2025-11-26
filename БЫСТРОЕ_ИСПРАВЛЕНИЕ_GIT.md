# ⚡ БЫСТРОЕ ИСПРАВЛЕНИЕ GIT КОНФЛИКТА

## Проблема:
Git не может обновить код, потому что `node_modules` содержит изменения.

## ✅ РЕШЕНИЕ - Выполните эти команды на сервере:

```bash
cd /var/www/poizonic-mini-app

# 1. Удалить node_modules (они не должны быть в Git)
rm -rf frontend/node_modules backend/node_modules

# 2. Отменить все локальные изменения в Git
git reset --hard HEAD

# 3. Удалить все неотслеживаемые файлы
git clean -fd

# 4. Теперь обновить код
git pull origin main

# 5. Установить зависимости заново
cd frontend
npm ci

# 6. Пересобрать проект
npm run build
```

## Или одной командой:

```bash
cd /var/www/poizonic-mini-app && rm -rf frontend/node_modules backend/node_modules && git reset --hard HEAD && git clean -fd && git pull origin main && cd frontend && npm ci && npm run build
```

---

## После этого:

1. Проверить, что сборка прошла успешно
2. Исправить права: `sudo chown -R www-data:www-data /var/www/poizonic-mini-app/frontend/dist`
3. Перезагрузить Nginx: `sudo systemctl reload nginx`

