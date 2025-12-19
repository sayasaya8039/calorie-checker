import { useState, useEffect } from 'react';
import { searchFood, type FoodItem } from './data/calorieData';
import { SearchResult } from './components/SearchResult';
import './App.css';

// package.jsonからバージョンを取得
const APP_VERSION = '1.0.0';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleSearch = (value: string) => {
    setQuery(value);
    setResults(searchFood(value));
  };

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

        <SearchResult results={results} query={query} />
      </main>

      <footer className="footer">
        <p>※ カロリーは1人前の平均値です</p>
        <p className="version">v{APP_VERSION}</p>
      </footer>
    </div>
  );
}

export default App;
