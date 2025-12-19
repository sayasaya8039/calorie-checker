import type { FoodItem } from '../data/calorieData';

interface SearchResultProps {
  results: FoodItem[];
  query: string;
}

export function SearchResult({ results, query }: SearchResultProps) {
  if (!query.trim()) {
    return (
      <div className="empty-state">
        <p>品名を入力してください</p>
        <p className="hint">例: カレー、ラーメン、かつ丼</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        <p>「{query}」に該当する品目が見つかりませんでした</p>
        <p className="hint">別のキーワードで検索してみてください</p>
      </div>
    );
  }

  return (
    <div className="results">
      <p className="result-count">{results.length}件の結果</p>
      <ul className="result-list">
        {results.map((item, index) => (
          <li key={index} className="result-item">
            <div className="result-main">
              <span className="food-name">{item.name}</span>
              <span className="food-category">{item.category}</span>
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="food-link"
                >
                  詳細を見る →
                </a>
              )}
            </div>
            <div className="calorie-display">
              <span className="calorie-value">{item.calories}</span>
              <span className="calorie-unit">kcal</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
