// カロリーSlismスクレイピング用Cloudflare Worker (Hono)
import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface CalorieResult {
  name: string;
  calories: number;
  serving: string;
  source: string;
  url: string;
}

const app = new Hono();

// CORS設定
app.use('*', cors());

// ルートエンドポイント
app.get('/', (c) => {
  return c.text('Calorie API - Use /api/search?q=食品名');
});

// 検索エンドポイント
app.get('/api/search', async (c) => {
  const query = c.req.query('q');

  if (!query) {
    return c.json({ error: '検索クエリが必要です', results: [] }, 400);
  }

  try {
    const results = await searchCalorieSlism(query);
    return c.json({ query, results });
  } catch {
    return c.json({ error: 'スクレイピングに失敗しました', results: [] }, 500);
  }
});

export default app;

// カロリーSlism検索
async function searchCalorieSlism(query: string): Promise<CalorieResult[]> {
  const searchUrl = `https://calorie.slism.jp/search/?s=${encodeURIComponent(query)}`;

  const response = await fetch(searchUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'text/html,application/xhtml+xml',
      'Accept-Language': 'ja,en;q=0.9',
    }
  });

  if (!response.ok) {
    return await searchViaFallback(query);
  }

  const html = await response.text();
  return parseSearchResults(html);
}

// フォールバック検索
async function searchViaFallback(query: string): Promise<CalorieResult[]> {
  const commonFoods: Record<string, { id: string; name: string }[]> = {
    'カレー': [
      { id: '200000', name: 'カレーライス' },
      { id: '200059', name: 'カツカレー' },
      { id: '200621', name: 'チキンカレー' },
      { id: '200412', name: 'スープカレー' },
    ],
    'ラーメン': [
      { id: '200147', name: 'ラーメン' },
      { id: '200148', name: '味噌ラーメン' },
      { id: '200149', name: '塩ラーメン' },
      { id: '200150', name: '醤油ラーメン' },
      { id: '200151', name: 'とんこつラーメン' },
    ],
    'うどん': [
      { id: '200120', name: 'うどん' },
      { id: '200121', name: 'きつねうどん' },
      { id: '200122', name: 'たぬきうどん' },
    ],
    '丼': [
      { id: '200060', name: 'かつ丼' },
      { id: '200061', name: '親子丼' },
      { id: '200062', name: '牛丼' },
      { id: '200063', name: '天丼' },
    ],
  };

  const results: CalorieResult[] = [];

  for (const [key, foods] of Object.entries(commonFoods)) {
    if (query.includes(key) || key.includes(query)) {
      for (const food of foods) {
        const result = await fetchFoodPage(food.id);
        if (result) {
          results.push(result);
        }
      }
    }
  }

  return results;
}

// 個別ページ取得
async function fetchFoodPage(id: string): Promise<CalorieResult | null> {
  try {
    const url = `https://calorie.slism.jp/${id}/`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
      }
    });

    if (!response.ok) return null;

    const html = await response.text();
    return parseFoodPage(html, url);
  } catch {
    return null;
  }
}

// 検索結果パース
function parseSearchResults(html: string): CalorieResult[] {
  const results: CalorieResult[] = [];
  const linkPattern = /<a[^>]*href="\/(\d+)\/"[^>]*>([^<]+)<\/a>/g;
  const caloriePattern = /(\d+(?:\.\d+)?)\s*kcal/gi;

  let match;
  while ((match = linkPattern.exec(html)) !== null) {
    const id = match[1];
    const name = match[2].trim();
    const nearbyText = html.substring(match.index, match.index + 500);
    const calMatch = caloriePattern.exec(nearbyText);

    if (calMatch) {
      results.push({
        name,
        calories: parseFloat(calMatch[1]),
        serving: '1人前',
        source: 'カロリーSlism',
        url: `https://calorie.slism.jp/${id}/`
      });
    }
    caloriePattern.lastIndex = 0;
  }

  return results.slice(0, 10);
}

// 個別ページパース
function parseFoodPage(html: string, url: string): CalorieResult | null {
  const jsonLdMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/i);

  if (jsonLdMatch) {
    try {
      const jsonLd = JSON.parse(jsonLdMatch[1]);
      if (jsonLd.name && jsonLd.nutrition?.calories) {
        const caloriesNum = parseFloat(jsonLd.nutrition.calories.replace(/[^\d.]/g, ''));
        return {
          name: jsonLd.name,
          calories: caloriesNum,
          serving: jsonLd.nutrition.servingSize || '1人前',
          source: 'カロリーSlism',
          url
        };
      }
    } catch {
      // JSON-LDパース失敗
    }
  }

  const h1Match = html.match(/<h1[^>]*>([^<]+)</i);
  const calMatch = html.match(/<strong>(\d+(?:\.\d+)?)\s*kcal<\/strong>/i);

  if (h1Match && calMatch) {
    return {
      name: h1Match[1].trim(),
      calories: parseFloat(calMatch[1]),
      serving: '1人前',
      source: 'カロリーSlism',
      url
    };
  }

  return null;
}
