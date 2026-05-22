import Parser from 'rss-parser';
import axios from 'axios';
import fs from 'fs/promises';
import 'dotenv/config';

const parser = new Parser();

// RSS ленты футбольных новостей
const RSS_FEEDS = [
  'https://www.skysports.com/rss/12040', // Sky Sports Football
  'https://www.espn.com/espn/rss/soccer/news', // ESPN Soccer
  'http://feeds.bbci.co.uk/sport/football/rss.xml', // BBC Sport Football
];

async function fetchRSSFeeds() {
  const allArticles = [];
  
  for (const feedUrl of RSS_FEEDS) {
    try {
      console.log(`Парсинг: ${feedUrl}`);
      const feed = await parser.parseURL(feedUrl);
      
      // Берём последние 5 новостей из каждого источника
      const articles = feed.items.slice(0, 5).map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        content: item.contentSnippet || item.content || '',
        source: feed.title
      }));
      
      allArticles.push(...articles);
    } catch (error) {
      console.error(`Ошибка парсинга ${feedUrl}:`, error.message);
    }
  }
  
  return allArticles;
}

async function translateWithAI(article) {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Ты спортивный журналист. Перепиши футбольную новость на русском языке. Сохрани факты, но сделай текст живым и интересным. Ответ должен быть 2-3 абзаца.'
          },
          {
            role: 'user',
            content: `Заголовок: ${article.title}\n\nТекст: ${article.content}`
          }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Ошибка AI перевода:', error.message);
    return `${article.title}\n\n${article.content}`;
  }
}

async function main() {
  console.log('Начинаю сбор новостей...');
  
  const articles = await fetchRSSFeeds();
  console.log(`Собрано ${articles.length} новостей`);
  
  console.log('Обработка через AI...');
  const processedNews = [];
  
  for (const article of articles) {
    const translatedContent = await translateWithAI(article);
    processedNews.push({
      ...article,
      translatedContent,
      processedAt: new Date().toISOString()
    });
    
    // Задержка чтобы не спамить API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  await fs.writeFile('news-data.json', JSON.stringify(processedNews, null, 2));
  console.log('Новости сохранены в news-data.json');
}

main();
