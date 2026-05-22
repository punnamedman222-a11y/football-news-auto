import fs from 'fs/promises';

async function buildSite() {
  const newsData = JSON.parse(await fs.readFile('news-data.json', 'utf-8'));
  
  const newsHTML = newsData.map((article, index) => `
    <article class="news-card" data-source="${article.source}" data-index="${index}">
      <div class="news-meta">
        <span class="source">${article.source}</span>
        <span class="date">${new Date(article.pubDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>
      <h2>${article.title}</h2>
      <div class="content">${article.translatedContent}</div>
      <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="read-more">Читать оригинал →</a>
    </article>
  `).join('');
  
  const sources = [...new Set(newsData.map(a => a.source))];
  const filterButtons = sources.map(source => 
    `<button class="filter-btn" data-source="${source}">${source}</button>`
  ).join('');
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>⚽ Футбольные Новости - Свежие новости каждый день</title>
  <meta name="description" content="Автоматический сайт с последними футбольными новостями из BBC Sport, Sky Sports и ESPN. Обновляется каждый день.">
  <meta property="og:title" content="⚽ Футбольные Новости">
  <meta property="og:description" content="Свежие футбольные новости каждый день">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://football-news-auto.vercel.app">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚽</text></svg>">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0e27;
      color: #e0e0e0;
      line-height: 1.6;
    }
    
    header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    h1 {
      font-size: clamp(1.8rem, 5vw, 2.5rem);
      margin-bottom: 0.5rem;
      animation: fadeIn 0.6s ease-out;
    }
    
    .subtitle {
      opacity: 0.9;
      font-size: clamp(0.9rem, 3vw, 1.1rem);
      animation: fadeIn 0.8s ease-out;
    }
    
    .controls {
      max-width: 1200px;
      margin: 2rem auto 1rem;
      padding: 0 1rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    }
    
    .search-box {
      flex: 1;
      min-width: 250px;
      position: relative;
    }
    
    #searchInput {
      width: 100%;
      padding: 0.75rem 1rem;
      background: #1a1f3a;
      border: 2px solid #2a2f4a;
      border-radius: 8px;
      color: #e0e0e0;
      font-size: 1rem;
      transition: all 0.3s;
    }
    
    #searchInput:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .filters {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .filter-btn {
      padding: 0.5rem 1rem;
      background: #1a1f3a;
      border: 2px solid #2a2f4a;
      border-radius: 8px;
      color: #e0e0e0;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .filter-btn:hover {
      border-color: #667eea;
      transform: translateY(-2px);
    }
    
    .filter-btn.active {
      background: #667eea;
      border-color: #667eea;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto 2rem;
      padding: 0 1rem;
    }
    
    .update-time {
      background: #1a1f3a;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      text-align: center;
      margin-bottom: 2rem;
      color: #888;
      font-size: 0.9rem;
    }
    
    .news-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 1.5rem;
    }
    
    .news-card {
      background: #1a1f3a;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      transition: all 0.3s;
      animation: slideUp 0.5s ease-out;
      animation-fill-mode: both;
    }
    
    .news-card:nth-child(1) { animation-delay: 0.1s; }
    .news-card:nth-child(2) { animation-delay: 0.2s; }
    .news-card:nth-child(3) { animation-delay: 0.3s; }
    
    .news-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
    }
    
    .news-card.hidden {
      display: none;
    }
    
    .news-meta {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      font-size: 0.85rem;
      color: #888;
      flex-wrap: wrap;
    }
    
    .source {
      color: #667eea;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      background: rgba(102, 126, 234, 0.1);
      border-radius: 4px;
    }
    
    h2 {
      color: #fff;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      line-height: 1.4;
    }
    
    .content {
      margin-bottom: 1rem;
      color: #b0b0b0;
      line-height: 1.7;
    }
    
    .read-more {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: gap 0.3s;
    }
    
    .read-more:hover {
      gap: 0.75rem;
    }
    
    footer {
      text-align: center;
      padding: 3rem 1rem;
      color: #666;
      font-size: 0.9rem;
      border-top: 1px solid #2a2f4a;
    }
    
    .no-results {
      text-align: center;
      padding: 3rem;
      color: #888;
      font-size: 1.1rem;
      display: none;
    }
    
    .no-results.show {
      display: block;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @media (max-width: 768px) {
      .news-grid {
        grid-template-columns: 1fr;
      }
      
      .controls {
        flex-direction: column;
        align-items: stretch;
      }
      
      .filters {
        justify-content: center;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>⚽ Футбольные Новости</h1>
    <p class="subtitle">Свежие новости из мира футбола каждый день</p>
  </header>
  
  <div class="controls">
    <div class="search-box">
      <input type="text" id="searchInput" placeholder="🔍 Поиск по новостям...">
    </div>
    <div class="filters">
      <button class="filter-btn active" data-source="all">Все источники</button>
      ${filterButtons}
    </div>
  </div>
  
  <div class="container">
    <div class="update-time">
      Обновлено: ${new Date().toLocaleString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}
    </div>
    
    <div class="news-grid">
      ${newsHTML}
    </div>
    
    <div class="no-results">
      Ничего не найдено. Попробуйте другой запрос.
    </div>
  </div>
  
  <footer>
    <p>Новости обновляются автоматически каждый день в 11:00 МСК</p>
    <p style="margin-top: 0.5rem; opacity: 0.7;">Источники: BBC Sport, Sky Sports, ESPN</p>
  </footer>
  
  <script>
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const noResults = document.querySelector('.no-results');
    
    let currentFilter = 'all';
    let currentSearch = '';
    
    function filterNews() {
      let visibleCount = 0;
      
      newsCards.forEach(card => {
        const source = card.dataset.source;
        const title = card.querySelector('h2').textContent.toLowerCase();
        const content = card.querySelector('.content').textContent.toLowerCase();
        
        const matchesFilter = currentFilter === 'all' || source === currentFilter;
        const matchesSearch = currentSearch === '' || 
          title.includes(currentSearch) || 
          content.includes(currentSearch);
        
        if (matchesFilter && matchesSearch) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      
      if (visibleCount === 0) {
        noResults.classList.add('show');
      } else {
        noResults.classList.remove('show');
      }
    }
    
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      filterNews();
    });
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.source;
        filterNews();
      });
    });
  </script>
</body>
</html>`;
  
  await fs.writeFile('public/index.html', html);
  console.log('✅ Сайт собран в public/index.html');
}

buildSite();
