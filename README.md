# Dev Log App

日々の学習や開発内容を記録・振り返りできるシンプルなログアプリです。

## URL

https://dev-log-app-omega.vercel.app

## 概要

エンジニアとしての成長を可視化するために、日々の作業ログを簡単に記録・管理できるアプリを作成しました。

ログはSupabaseに保存し、タグ検索や並び替えを使って過去の作業内容を振り返れるようにしています。

## 主な機能

- ログの作成
- ログの編集
- ログの削除
- ログの一覧表示
- キーワード検索
- タグ検索
- `#タグ` 形式のタグ自動抽出
- タグ一覧とタグごとの件数表示
- 新しい順 / 古い順の並び替え
- Supabaseによるログ保存
- 読み込み中・エラー状態の表示

## 使用技術

- Next.js
- React
- TypeScript
- Supabase
- Vercel

## セットアップ

リポジトリをクローンします。

```bash
git clone <repository-url>
cd dev-log-app
```

依存関係をインストールします。

```bash
npm install
```

`.env.local` を作成し、Supabaseの接続情報を設定します。

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

開発サーバーを起動します。

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## Supabase

このアプリでは `logs` テーブルを使用します。

主なカラムは次の通りです。

- `id`: ログのID
- `text`: ログ本文
- `date`: 作成日時
- `tags`: タグ配列

## 工夫した点

- ログ操作を `useLogs` にまとめ、UIとデータ操作の責務を分けています。
- Supabaseへのアクセス処理を `lib/supabase/logs.ts` に分離しています。
- 表示対象のログを作る検索・ソート処理を `utils/getVisibleLogs.ts` に切り出しています。
- タグ抽出やタグ集計を `utils` に分け、再利用しやすい形にしています。

## 今後の改善予定

- Supabase接続情報の環境変数管理の徹底
- エラー表示や送信中状態のUI改善
- モバイル表示の調整
- テストの追加
- READMEへのスクリーンショット追加

## 開発背景

日々の学習内容や開発記録を残したいと考えた際、手軽に使えて継続しやすいツールが欲しいと思い、本アプリを開発しました。

ポートフォリオとして、Reactの状態管理、コンポーネント分割、Supabase連携を確認できる構成にしています。
