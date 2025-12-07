import { FastMcp, Tool } from 'fastmcp'
import { QiitaService } from './qiitaService'
import { QiitaArticle } from './schemas'

// QiitaServiceのインスタンスを準備
const qiitaService = new QiitaService()

/**
 * FastMCPを使ってMCPサーバーを定義します。
 * FastMcpクラスのインスタンスが、サーバー全体の設定を保持します。
 */
export const server = new FastMcp({
    // このサーバーが公開するツールやリソースの配列を定義
    tools: [
        // Tool関数を使って、公開するツールを定義します。
        // TypeScriptの型とデコレーターに近い記述で直感的に書けます。
        Tool({
            // AIが呼び出す関数名
            name: 'get_trending_articles',
            // AIがツールの用途を理解するための説明文（非常に重要）
            description: '特定の技術タグ（例: "TypeScript", "React"）に一致する、Qiitaの最新のトレンド記事（いいねが多い順）を最大10件取得します。',

            // AIがツールを呼び出す際に必要な引数を定義
            // FastMCPでは、型情報から自動でJSONスキーマを生成するため、
            // ここでは引数名と説明の定義に集中できます。
            parameters: {
                tag: {
                    type: 'string',
                    description: '検索したい技術タグ名（例: "TypeScript", "Next.js"）'
                },
                count: {
                    type: 'number',
                    description: '取得したい記事の最大件数（デフォルトは10）',
                    optional: true // オプション引数としてマーク
                }
            },

            // 実際の処理ロジックを非同期関数として直接記述
            handler: async ({ tag, count }: { tag: string, count?: number }) => {
                // countがない場合はデフォルト値の10を使用
                const articles = await qiitaService.getArticlesByTag(tag, count || 10)

                // 取得した記事をAIに返す
                return {
                    message: `タグ "${tag}" のトレンド記事を${articles?.length}件取得しました。`,
                    articles: articles?.map((article: QiitaArticle) => ({
                        title: article.title,
                        url: article.url,
                        likes: article.likes_count,
                        tags: article.tags.join(', ')
                    }))
                }
            }
        })
    ],
    // resources: [] // 静的なデータなどを公開する場合はここに定義
})