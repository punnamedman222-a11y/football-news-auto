# ⚽ Футбольные Новости - Автоматический Сайт

Современный автоматический сайт с футбольными новостями. Парсит RSS-ленты, переводит через AI, публикует на Vercel.

🔗 **Live Demo:** https://football-news-auto.vercel.app

## ✨ Возможности

- 📰 **Автоматический парсинг** из BBC Sport, Sky Sports, ESPN
- 🤖 **AI перевод** через OpenRouter (бесплатная модель)
- 🎨 **Современный дизайн** с тёмной темой
- 🔍 **Поиск** по заголовкам и содержимому
- 🏷️ **Фильтры** по источникам новостей
- ⚡ **Быстрая загрузка** - статический сайт
- 📱 **Адаптивный** дизайн для всех устройств
- 🔄 **Автообновление** раз в день через GitHub Actions
- ♿ **Доступность** - семантический HTML, ARIA-атрибуты

## 🚀 Быстрый старт

### Локальная разработка

```bash
# Клонировать репозиторий
git clone https://github.com/punnamedman222-a11y/football-news-auto.git
cd football-news-auto

# Установить зависимости
npm install

# Создать .env файл
cp .env.example .env
# Добавить свой OPENROUTER_API_KEY

# Собрать новости
npm run fetch

# Собрать сайт
npm run build

# Запустить локальный сервер
npm run dev
```

Открой http://localhost:8000

### Деплой на Vercel

1. Fork этот репозиторий
2. Импортируй в Vercel: https://vercel.com/new
3. Добавь переменную окружения `OPENROUTER_API_KEY`
4. Задеплой

### Настройка автообновления

Добавь секреты в GitHub (Settings → Secrets and variables → Actions):

- `OPENROUTER_API_KEY` - твой ключ OpenRouter
- `VERCEL_TOKEN` - токен Vercel (https://vercel.com/account/tokens)
- `VERCEL_ORG_ID` - ID организации (из `.vercel/project.json`)
- `VERCEL_PROJECT_ID` - ID проекта (из `.vercel/project.json`)

## 📁 Структура проекта

```
football-news-auto/
├── scripts/
│   ├── fetch-news.js    # Парсинг RSS + AI обработка
│   └── build-site.js    # Генерация HTML
├── public/              # Готовый сайт
├── .github/workflows/   # GitHub Actions
│   └── update-news.yml  # Автообновление
├── package.json
├── vercel.json          # Конфигурация Vercel
└── README.md
```

## 🛠️ Технологии

- **Node.js** - среда выполнения
- **RSS Parser** - парсинг новостных лент
- **OpenRouter API** - AI перевод (бесплатная модель)
- **Vercel** - хостинг и деплой
- **GitHub Actions** - автоматизация

## ⚙️ Конфигурация

### Изменить время обновления

Отредактируй `.github/workflows/update-news.yml`:

```yaml
schedule:
  - cron: '0 8 * * *'  # 8:00 UTC = 11:00 МСК
```

### Добавить источники новостей

Отредактируй `scripts/fetch-news.js`:

```javascript
const RSS_FEEDS = [
  'https://www.skysports.com/rss/12040',
  'https://www.espn.com/espn/rss/soccer/news',
  'http://feeds.bbci.co.uk/sport/football/rss.xml',
  // Добавь свои RSS ленты
];
```

### Изменить AI модель

В `scripts/fetch-news.js` строка 46:

```javascript
model: 'gryphe/mythomax-l2-13b:free',  // Бесплатная модель
```

Другие бесплатные модели: https://openrouter.ai/docs#models

## 🎨 Кастомизация дизайна

Отредактируй `scripts/build-site.js` - весь CSS встроен в шаблон.

**Основные цвета:**
- Фон: `#0a0e27`
- Карточки: `#1a1f3a`
- Акцент: `#667eea`

## 📊 Производительность

- ⚡ **Параллельная обработка** - все новости переводятся одновременно
- 🔄 **Retry логика** - 3 попытки при ошибках API
- 📦 **Статический HTML** - мгновенная загрузка
- 🎯 **Оптимизация** - минимальные зависимости

## 🔒 Безопасность

- ✅ API ключи в переменных окружения
- ✅ `.env` в `.gitignore`
- ✅ `rel="noopener noreferrer"` на внешних ссылках
- ✅ Timeout для API запросов

## 📝 Лицензия

MIT

## 🤝 Вклад

Pull requests приветствуются! Для больших изменений сначала открой issue.

## 📧 Контакты

Вопросы? Открой issue на GitHub.

---

Сделано с ⚽ и ❤️
