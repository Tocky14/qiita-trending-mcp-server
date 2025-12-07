-----

# 🚀 Qiita Trending MCP Server

-----

## 💡 プロジェクト概要 (Project Overview)

本プロジェクトは、**MCP (Model Context Protocol)** を用いて構築されたサーバーです。

AIエージェント（ClaudeやカスタムLLMなど）が、外部のリアルタイムデータである**Qiitaのトレンド記事**にアクセスできるようにするための「**標準化されたインターフェース**」を提供します。

AIに外部ツールを組み込む際に、カスタムなAPI連携ではなく、\*\*オープンな標準規格（MCP）\*\*を採用することで、堅牢性、セキュリティ、再利用性の高いエージェント開発基盤を構築しています。

-----

## ✨ アピールポイント (Key Features for Findy)

  * **最新技術のキャッチアップ：** AIと外部ツール連携の最新規格である**MCP**と、そのTypeScriptフレームワークである**FastMCP**を採用しています。
  * **クリーンなコード：** TypeScriptによる厳密な型定義と、ESLint/Prettierによる高いコード品質を維持しています。
  * **モジュール設計：** Qiita APIの接続（`QiitaService.ts`）とMCPのインターフェース定義（`QiitaServer.ts`）を完全に分離した、**責務を意識した設計**になっています。

-----

## 🛠️ 機能 (Available Tool)

本サーバーは、以下の単一の**Tool**を提供します。

| Tool Name | 機能概要 | パラメータ |
| :--- | :--- | :--- |
| `get_trending_articles` | 特定のタグに一致する、Qiitaのトレンド記事（いいねが多い順）を取得します。 | `tag` (string, 必須), `count` (number, オプション) |

### 📖 使用例 (AI Call Example)

AIエージェントは、以下のようなユーザーの質問に対し、このToolを呼び出します。

**ユーザーの質問:**

> 「最近流行の**TypeScript**に関するQiitaの記事を3件だけ見つけてください。」

**AIがサーバーに送信するTool実行リクエスト:**

```json
{
  "tool": "get_trending_articles",
  "arguments": {
    "tag": "TypeScript",
    "count": 3
  }
}
```

-----

## ⚙️ 技術スタック (Tech Stack)

  * **言語:** TypeScript
  * **ランタイム:** Node.js
  * **フレームワーク:** FastMCP (TypeScript Implementation)
  * **外部連携:** Qiita API v2
  * **品質管理:** ESLint, Prettier

-----

## ⬇️ セットアップ (Setup and Installation)

### 1\. クローン

```bash
git clone [YOUR_REPOSITORY_URL]
cd qiita-trending-mcp-server
```

### 2\. 依存関係のインストール

```bash
npm install
```

### 3\. サーバーの起動

このサーバーは標準入出力（STDIO）を通じてAIクライアントからのリクエストを待ち受けます。

```bash
# 開発モードでの起動
npm run start
```

> ※ 実際のAIアプリケーション（Host）で利用する場合、Host側から本サーバープロセスを起動します。

### 4\. 品質チェック

コードプッシュ前に、以下のコマンドで整形と構文チェックを実行してください。

```bash
# フォーマットの実行（自動整形）
npm run format

# リンターの実行（構文・ルールチェック）
npm run lint
```

-----

## ✅ 次の課題 (Next Steps & Testing)

本プロジェクトの品質を担保するため、`QiitaService.ts` の API連携部分を中心に**テストコード**を実装予定です。

  * `QiitaService`に対するモックを使った単体テストの導入。

-----

## 📄 ライセンス (License)

本プロジェクトは [LICENSE TYPE, e.g., MIT License] の下で公開されています。

-----
