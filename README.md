# カロリーチェッカー

品名を入力すると、その食品の平均カロリーを表示するWebアプリ・Chrome拡張機能です。

## ダウンロード

| 種類 | リンク |
|------|--------|
| **Webアプリ** | https://calorie-checker.pages.dev/ |
| **Chrome拡張機能** | [GitHub Releases](https://github.com/sayasaya8039/calorie-checker/releases/latest) |

## 機能

- 品名による食品検索（あいまい検索対応）
- 日本食を中心とした約120品目の内蔵カロリーデータベース
- **カロリーSlism連携**（内蔵データにない場合、外部から取得）
- ダークモード / ライトモード切り替え
- レスポンシブデザイン（スマホ対応）

## 使い方

1. 検索ボックスに品名を入力（例: カレー、ラーメン、かつ丼）
2. 該当する食品とカロリーが一覧表示されます
3. 内蔵データにない場合は、自動的にカロリーSlismから検索します
4. 右上のボタンでテーマを切り替えられます

## Chrome拡張機能のインストール

### CRXファイルから（推奨）
1. [Releases](https://github.com/sayasaya8039/calorie-checker/releases/latest)から `.crx` ファイルをダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパーモード」をON
4. `.crx` ファイルをページにドラッグ＆ドロップ

### ソースから
1. このリポジトリをクローン
2. `npm install && npm run build:extension`
3. Chromeで `chrome://extensions/` を開く
4. 「パッケージ化されていない拡張機能を読み込む」から `extension` フォルダを選択

## 開発

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# Webアプリ用ビルド
npm run build

# Chrome拡張機能用ビルド
npm run build:extension

# CRX/ZIPファイル作成
python create_icons.py
python create_zip.py
```

## 技術スタック

- React 19
- TypeScript
- Vite 7
- Cloudflare Pages（フロントエンド）
- Cloudflare Workers（APIプロキシ）

## アーキテクチャ

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  フロントエンド  │────▶│  Worker API     │────▶│  カロリーSlism   │
│  (Pages)        │     │  (プロキシ)      │     │  (外部サイト)    │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## カロリーデータについて

- カロリーは1人前の平均値です
- 実際のカロリーは調理法や分量により異なります
- 内蔵データは一般的な日本食を中心に収録
- 外部データはカロリーSlismから取得

## ライセンス

MIT
