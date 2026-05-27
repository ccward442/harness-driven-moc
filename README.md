# harness-driven-moc — work-log mockups

> 個人向け業務ログ + AI 壁打ち日報システム **work-log** の UI モックアップ集 (Modernize スタイル)。
> Claude Code 用ハーネス [spec-driven-harness](../../) で生成した提案用プロトタイプ。

## 公開URL

GitHub Pages を有効化すると以下のURLで閲覧できます:

```
https://ccward442.github.io/harness-driven-moc/
```

ルートを開くと画面ランチャー (`index.html`) が表示され、10画面の任意のスクリーンに飛べます。

## 画面一覧 (10画面)

| ID | 画面 | 概要 |
|---|---|---|
| S-01 | ログイン | Google OAuth (Supabase Auth) |
| S-02 | ダッシュボード | 今日のタスク / 「日報作る」CTA / 直近日報 |
| S-03 | プロジェクト一覧 | PJ の作成・編集・アーカイブ |
| S-04 | タスクボード | Todo/Doing/Done のカンバン |
| S-05 | タスク詳細 | コメント・履歴・ステータス変更 |
| S-06 | AI 壁打ちチャット | YWT 対話で日報を仕上げる |
| S-07 | 日報一覧・検索 | 日付/キーワード/タグで絞り込み |
| S-08 | 日報詳細・編集 | YWT 形式編集・公開状態切替 |
| S-09 | 週次/月次サマリ | AI が KPT を生成 |
| S-10 | 設定 | テーマ / アカウント / ログアウト |

## 特徴

- **レスポンシブ対応** — lg ≥ 1024 / md 640–1023 / sm < 640 の 3 ブレイクポイント。サイドバはハンバーガー → ドロワ展開
- **クリック可能** — ボタンは Toast / Modal / 画面遷移を返す。「飾りボタン」なし
- **モックデータ集約** — `_data/*.js` に projects / tasks / diary entries 等を分離
- **ビルド不要** — 純静的HTML/CSS/JS。`open index.html` でローカル動作

## ローカル動作確認

```bash
git clone https://github.com/ccward442/harness-driven-moc.git
cd harness-driven-moc
open index.html      # macOS
# or: xdg-open index.html  (Linux)
# or: start index.html      (Windows)
```

## デプロイ (GitHub Pages)

1. このリポジトリの **Settings** → **Pages** へ
2. **Source**: Deploy from a branch
3. **Branch**: `main` / `/(root)` を選択
4. 数十秒待つと `https://ccward442.github.io/harness-driven-moc/` で公開される

## ファイル構成

```
harness-driven-moc/
├── index.html               ← 画面ランチャー (ルート)
├── _shared.css              ← 共通スタイル (Modernize トークン + レスポンシブ)
├── _shared.js               ← 共通ランタイム (Toast / Modal / ドロワ / フォーム)
├── _data/                   ← モックデータ
│   ├── seed.js              ← 共通基準値
│   ├── projects.js
│   ├── tasks.js
│   ├── diary-entries.js
│   ├── chat-messages.js
│   └── comments.js
└── s-01-login.html ... s-10-settings.html  ← 10画面
```

## ライセンス

社内提案向け試作 — 配布前にライセンスを設定してください。

---

🤖 Generated with [Claude Code](https://claude.com/claude-code) + [spec-driven-harness](https://github.com/ccward442/spec-driven-harness)
