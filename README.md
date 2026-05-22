# Футбольные Новости - Автоматический Сайт

Автоматический сайт с футбольными новостями. Парсит RSS-ленты, переводит через AI, публикует на Vercel.

## Возможности

- 📰 Парсинг новостей из BBC Sport, Sky Sports, ESPN
- 🤖 Автоматический перевод через OpenRouter (gpt-3.5-turbo)
- 🎨 Современный дизайн
- ⚡ Статический сайт на Vercel
- 🔄 Автообновление раз в день через GitHub Actions

## Установка

1. Клонируй репозиторий
2. Установи зависимости:
```bash
npm install
```

3. Создай `.env` файл:
```bash
cp .env.example .env
```

4. Добавь свой API ключ OpenRouter в `.env`:
```
OPENROUTER_API_KEY=your_key_here
```

## Использование

### Локально

```bash
# Собрать новости
npm run fetch

# Собрать сайт
npm run build

# Запустить локальный сервер
npm run dev
```

Открой http://localhost:8000

### Деплой на Vercel

1. Установи Vercel CLI:
```bash
npm install -g vercel
```

2. Залогинься:
```bash
vercel login
```

3. Задеплой:
```bash
vercel --prod
```

4. Добавь секреты в GitHub:
   - `OPENROUTER_API_KEY` - твой ключ OpenRouter
   - `VERCEL_TOKEN` - токен Vercel (получи в настройках)
   - `VERCEL_ORG_ID` - ID организации Vercel
   - `VERCEL_PROJECT_ID` - ID проекта Vercel

## Автообновление

GitHub Actions автоматически обновляет новости каждый день в 8:00 UTC (11:00 МСК).

Можно запустить вручную: Actions → Update News Daily → Run workflow

## Структура

```
football-news-auto/
├── scripts/
│   ├── fetch-news.js    # Парсинг RSS и AI обработка
│   └── build-site.js    # Генерация HTML
├── public/              # Готовый сайт
├── .github/workflows/   # GitHub Actions
└── package.json
```

## Лицензия

MIT
