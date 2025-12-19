import { useState, useEffect, useCallback } from 'react';
import { searchFood, type FoodItem } from './data/calorieData';
import { SearchResult } from './components/SearchResult';
import './App.css';

const APP_VERSION = '1.1.0';
const API_URL = 'https://calorie-api.sayasaya.workers.dev';

// 外部APIからの結果型
interface ExternalResult {
  name: string;
  calories: number;
  serving: string;
  source: string;
  url: string;
}

function App() {
  const [query, setQuery] = useState('');
  const [localResults, setLocalResults] = useState<FoodItem[]>([]);
  const [externalResults, setExternalResults] = useState<FoodItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // 外部API検索（デバウンス用）
  const searchExternal = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setExternalResults([]);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        // 外部結果をFoodItem形式に変換
        const converted: FoodItem[] = data.results.map((r: ExternalResult) => ({
          name: r.name,
          calories: r.calories,
          category: r.source,
          url: r.url
        }));
        setExternalResults(converted);
      }
    } catch {
      setSearchError('外部検索に失敗しました');
      setExternalResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // デバウンス処理
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2 && localResults.length === 0) {
        searchExternal(query);
      } else {
        setExternalResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query, localResults.length, searchExternal]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setLocalResults(searchFood(value));
    setSearchError(null);
  };

  // ローカル結果と外部結果を結合
  const allResults = [...localResults, ...externalResults];

  return (
    <div className="app">
      <header className="header">
        <h1 className="title">カロリーチェッカー</h1>
        <button
          className="theme-toggle"
          onClick={() => setIsDark(!isDark)}
          aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="main">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="品名を入力（例: カレー）"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              className="clear-button"
              onClick={() => handleSearch('')}
              aria-label="検索をクリア"
            >
              ✕
            </button>
          )}
        </div>

        {isSearching && (
          <div className="searching">
            <span className="spinner"></span>
            外部データを検索中...
          </div>
        )}

        {searchError && (
          <div className="search-error">{searchError}</div>
        )}

        <SearchResult results={allResults} query={query} />

        {externalResults.length > 0 && (
          <p className="external-note">
            ※ 「カロリーSlism」のデータを含みます
          </p>
        )}
      </main>

      <footer className="footer">
        <p>※ カロリーは1人前の平均値です</p>
        <p className="version">v{APP_VERSION}</p>
      </footer>
    </div>
  );
}

export default App;
