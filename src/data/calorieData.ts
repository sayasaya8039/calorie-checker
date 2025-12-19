// 日本食の代表的な料理のカロリーデータベース
// カロリーは1人前の平均値（kcal）

export interface FoodItem {
  name: string;
  calories: number;
  category: string;
  aliases?: string[];
}

export const foodDatabase: FoodItem[] = [
  // ご飯・丼物
  { name: "白米", calories: 269, category: "ご飯", aliases: ["ごはん", "ライス"] },
  { name: "カレーライス", calories: 760, category: "丼物", aliases: ["カレー"] },
  { name: "かつ丼", calories: 920, category: "丼物", aliases: ["カツ丼", "カツどん"] },
  { name: "親子丼", calories: 680, category: "丼物" },
  { name: "牛丼", calories: 650, category: "丼物" },
  { name: "天丼", calories: 780, category: "丼物" },
  { name: "うな丼", calories: 650, category: "丼物", aliases: ["うなぎ丼", "鰻丼"] },
  { name: "海鮮丼", calories: 550, category: "丼物" },
  { name: "チャーハン", calories: 580, category: "ご飯", aliases: ["炒飯", "焼き飯"] },
  { name: "オムライス", calories: 720, category: "ご飯" },
  { name: "ハヤシライス", calories: 680, category: "ご飯" },
  { name: "ビビンバ", calories: 590, category: "ご飯" },
  { name: "おにぎり", calories: 180, category: "ご飯", aliases: ["おむすび"] },

  // 麺類
  { name: "ラーメン", calories: 500, category: "麺類", aliases: ["らーめん"] },
  { name: "味噌ラーメン", calories: 550, category: "麺類" },
  { name: "とんこつラーメン", calories: 600, category: "麺類", aliases: ["豚骨ラーメン"] },
  { name: "醤油ラーメン", calories: 480, category: "麺類" },
  { name: "塩ラーメン", calories: 450, category: "麺類" },
  { name: "つけ麺", calories: 650, category: "麺類" },
  { name: "うどん", calories: 340, category: "麺類" },
  { name: "きつねうどん", calories: 420, category: "麺類" },
  { name: "天ぷらうどん", calories: 530, category: "麺類" },
  { name: "カレーうどん", calories: 490, category: "麺類" },
  { name: "そば", calories: 320, category: "麺類", aliases: ["蕎麦"] },
  { name: "ざるそば", calories: 350, category: "麺類", aliases: ["ざる蕎麦"] },
  { name: "かけそば", calories: 330, category: "麺類" },
  { name: "焼きそば", calories: 520, category: "麺類" },
  { name: "ナポリタン", calories: 590, category: "麺類" },
  { name: "ペペロンチーノ", calories: 520, category: "麺類" },
  { name: "カルボナーラ", calories: 680, category: "麺類" },
  { name: "ミートソース", calories: 620, category: "麺類", aliases: ["ミートソーススパゲティ"] },
  { name: "冷やし中華", calories: 480, category: "麺類" },
  { name: "素麺", calories: 350, category: "麺類", aliases: ["そうめん"] },

  // 定食・主菜
  { name: "とんかつ", calories: 480, category: "揚げ物", aliases: ["トンカツ", "豚カツ"] },
  { name: "チキンカツ", calories: 420, category: "揚げ物" },
  { name: "唐揚げ", calories: 380, category: "揚げ物", aliases: ["からあげ", "から揚げ"] },
  { name: "天ぷら盛り合わせ", calories: 450, category: "揚げ物" },
  { name: "エビフライ", calories: 320, category: "揚げ物", aliases: ["海老フライ"] },
  { name: "コロッケ", calories: 180, category: "揚げ物" },
  { name: "メンチカツ", calories: 280, category: "揚げ物" },
  { name: "ハンバーグ", calories: 450, category: "肉料理" },
  { name: "生姜焼き", calories: 380, category: "肉料理", aliases: ["しょうが焼き", "豚の生姜焼き"] },
  { name: "焼き魚", calories: 200, category: "魚料理" },
  { name: "サバの味噌煮", calories: 280, category: "魚料理", aliases: ["鯖の味噌煮"] },
  { name: "ブリの照り焼き", calories: 320, category: "魚料理", aliases: ["鰤の照り焼き"] },
  { name: "刺身盛り合わせ", calories: 250, category: "魚料理", aliases: ["刺身"] },
  { name: "焼肉定食", calories: 750, category: "肉料理" },
  { name: "ステーキ", calories: 600, category: "肉料理" },
  { name: "肉じゃが", calories: 350, category: "煮物" },

  // 寿司
  { name: "にぎり寿司", calories: 400, category: "寿司", aliases: ["握り寿司", "寿司"] },
  { name: "ちらし寿司", calories: 550, category: "寿司" },
  { name: "巻き寿司", calories: 350, category: "寿司", aliases: ["巻きずし"] },
  { name: "いなり寿司", calories: 380, category: "寿司", aliases: ["稲荷寿司"] },
  { name: "手巻き寿司", calories: 120, category: "寿司" },

  // パン・軽食
  { name: "食パン", calories: 160, category: "パン", aliases: ["トースト"] },
  { name: "クロワッサン", calories: 230, category: "パン" },
  { name: "メロンパン", calories: 350, category: "パン" },
  { name: "あんぱん", calories: 280, category: "パン", aliases: ["アンパン"] },
  { name: "カレーパン", calories: 320, category: "パン" },
  { name: "サンドイッチ", calories: 350, category: "パン" },
  { name: "ホットドッグ", calories: 420, category: "軽食" },
  { name: "ハンバーガー", calories: 450, category: "軽食" },
  { name: "チーズバーガー", calories: 520, category: "軽食" },
  { name: "ピザ", calories: 600, category: "軽食", aliases: ["ピッツァ"] },

  // 中華料理
  { name: "餃子", calories: 280, category: "中華", aliases: ["ギョーザ", "ぎょうざ"] },
  { name: "シュウマイ", calories: 180, category: "中華", aliases: ["焼売"] },
  { name: "春巻き", calories: 200, category: "中華", aliases: ["春巻"] },
  { name: "麻婆豆腐", calories: 350, category: "中華", aliases: ["マーボー豆腐", "マーボ豆腐"] },
  { name: "回鍋肉", calories: 380, category: "中華", aliases: ["ホイコーロー"] },
  { name: "青椒肉絲", calories: 320, category: "中華", aliases: ["チンジャオロース"] },
  { name: "酢豚", calories: 400, category: "中華", aliases: ["すぶた"] },
  { name: "八宝菜", calories: 280, category: "中華" },
  { name: "エビチリ", calories: 250, category: "中華", aliases: ["海老チリ"] },
  { name: "天津飯", calories: 550, category: "中華" },
  { name: "中華丼", calories: 580, category: "中華" },
  { name: "レバニラ炒め", calories: 320, category: "中華", aliases: ["レバニラ"] },

  // 鍋・汁物
  { name: "味噌汁", calories: 50, category: "汁物", aliases: ["みそ汁"] },
  { name: "豚汁", calories: 150, category: "汁物" },
  { name: "けんちん汁", calories: 120, category: "汁物" },
  { name: "すき焼き", calories: 650, category: "鍋物" },
  { name: "しゃぶしゃぶ", calories: 500, category: "鍋物" },
  { name: "おでん", calories: 350, category: "鍋物" },
  { name: "寄せ鍋", calories: 400, category: "鍋物" },
  { name: "キムチ鍋", calories: 450, category: "鍋物" },
  { name: "もつ鍋", calories: 480, category: "鍋物" },

  // 副菜・サラダ
  { name: "サラダ", calories: 80, category: "サラダ", aliases: ["野菜サラダ"] },
  { name: "ポテトサラダ", calories: 180, category: "サラダ" },
  { name: "マカロニサラダ", calories: 200, category: "サラダ" },
  { name: "冷奴", calories: 80, category: "副菜", aliases: ["冷やっこ"] },
  { name: "枝豆", calories: 130, category: "副菜" },
  { name: "ほうれん草のおひたし", calories: 30, category: "副菜" },
  { name: "きんぴらごぼう", calories: 80, category: "副菜" },
  { name: "ひじきの煮物", calories: 60, category: "副菜" },
  { name: "卵焼き", calories: 150, category: "副菜", aliases: ["玉子焼き", "だし巻き卵"] },
  { name: "納豆", calories: 100, category: "副菜" },

  // デザート・スイーツ
  { name: "ショートケーキ", calories: 350, category: "デザート" },
  { name: "チョコレートケーキ", calories: 380, category: "デザート" },
  { name: "チーズケーキ", calories: 320, category: "デザート" },
  { name: "プリン", calories: 150, category: "デザート" },
  { name: "シュークリーム", calories: 230, category: "デザート" },
  { name: "アイスクリーム", calories: 180, category: "デザート", aliases: ["アイス"] },
  { name: "パフェ", calories: 400, category: "デザート" },
  { name: "パンケーキ", calories: 450, category: "デザート", aliases: ["ホットケーキ"] },
  { name: "たい焼き", calories: 230, category: "デザート", aliases: ["たいやき", "鯛焼き"] },
  { name: "どら焼き", calories: 280, category: "デザート", aliases: ["どらやき"] },
  { name: "大福", calories: 200, category: "デザート" },
  { name: "団子", calories: 120, category: "デザート", aliases: ["だんご"] },
  { name: "わらび餅", calories: 170, category: "デザート" },

  // 飲み物
  { name: "コーヒー", calories: 8, category: "飲み物", aliases: ["ブラックコーヒー"] },
  { name: "カフェラテ", calories: 120, category: "飲み物", aliases: ["ラテ"] },
  { name: "紅茶", calories: 2, category: "飲み物" },
  { name: "緑茶", calories: 2, category: "飲み物", aliases: ["お茶"] },
  { name: "オレンジジュース", calories: 90, category: "飲み物" },
  { name: "コーラ", calories: 90, category: "飲み物" },
  { name: "ビール", calories: 140, category: "飲み物" },
  { name: "日本酒", calories: 200, category: "飲み物" },
  { name: "ワイン", calories: 75, category: "飲み物" },

  // ファストフード
  { name: "フライドポテト", calories: 320, category: "ファストフード", aliases: ["ポテト", "フレンチフライ"] },
  { name: "チキンナゲット", calories: 280, category: "ファストフード", aliases: ["ナゲット"] },
  { name: "フライドチキン", calories: 350, category: "ファストフード" },
  { name: "牛丼（並）", calories: 650, category: "ファストフード" },
  { name: "牛丼（大盛）", calories: 850, category: "ファストフード" },
];

// 検索関数
export function searchFood(query: string): FoodItem[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return foodDatabase.filter(item => {
    // メイン名で検索
    if (item.name.toLowerCase().includes(normalizedQuery)) return true;

    // エイリアスで検索
    if (item.aliases) {
      return item.aliases.some(alias =>
        alias.toLowerCase().includes(normalizedQuery)
      );
    }

    return false;
  }).sort((a, b) => {
    // 完全一致を優先
    const aExact = a.name.toLowerCase() === normalizedQuery;
    const bExact = b.name.toLowerCase() === normalizedQuery;
    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // 前方一致を次に優先
    const aStarts = a.name.toLowerCase().startsWith(normalizedQuery);
    const bStarts = b.name.toLowerCase().startsWith(normalizedQuery);
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;

    return 0;
  });
}
