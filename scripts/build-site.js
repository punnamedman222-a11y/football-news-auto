import fs from 'fs/promises';

async function buildSite() {
  const newsData = JSON.parse(await fs.readFile('news-data.json', 'utf-8'));
  
  const newsHTML = newsData.map(article => `
    <article class="news-card">
      <div class="news-meta">
        <span class="source">${article.source}</span>
        <span class="date">${new Date(article.pubDate).toLocaleDateString('ru-RU')}</span>
      </div>
      <h2>${article.title}</h2>
      <div class="content">${article.translatedContent}</div>
      <a href="${article.link}" target="_blank" class="read-more">Читать оригинал →</a>
    </article>
  `).join('');
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Футбольные Новости</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #0a0e27;
      color: #e0e0e0;
      line-height: 1.6;
    }
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    h1 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      opacity: 0.9;
      font-size: 1.1rem;
    }
    .container {
      max-width: 900px;
      margin: 2rem auto;
      padding: 0 1rem;
    }
    .news-card {
      background: #1a1f3a;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      transition: transform 0.2s;
    }
    .news-card:hover {
      transform: translateY(-4px);
    }
    .news-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: #888;
    }
    .source {
      color: #667eea;
      font-weight: 600;
    }
    h2 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.5rem;
    }
    .content {
      margin-bottom: 1rem;
      color: #b0b0b0;
    }
    .read-more {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    .read-more:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-size: 0.9rem;
    }
    .update-time {
      background: #1a1f3a;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 1.5rem;
      color: #888;
    }
  </style>
</head>
<body>
  <header>
    <h1>⚽ Футбольные Новости</h1>
    <p class="subtitle">Свежие новости из мира футбола каждый день</p>
  </header>
  
  <div class="container">
    <div class="update-time">
      Обновлено: ${new Date().toLocaleString('ru-RU')}
    </div>
    
    ${newsHTML}
  </div>
  
  <footer>
    <p>Новости обновляются автоматически каждый день</p>
  </footer>
</body>
</html>`;
  
  await fs.writeFile('public/index.html', html);
  console.log('Сайт собран в public/index.html');
}

buildSite();
