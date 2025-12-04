// src/QiitaService.ts

import axios from 'axios'
import type { QiitaArticle } from './schemas'

const QIITA_API_BASE_URL = 'https://qiita.com/api/v2'

/**
 * Qiita APIと通信し、記事データを取得・整形するサービス
 */
export class QiitaService {
  /**
   * 指定されたタグを含む記事を、いいね数が多い順に取得する
   * @param tag 検索したいタグ名 (例: 'TypeScript', 'React')
   * @param per_page 取得する記事数 (最大100)
   * @returns 整形されたQiitaArticleの配列
   */
  async getArticlesByTag(tag: string, per_page: number = 10): Promise<QiitaArticle[] | undefined> {
    try {
      const response = await axios.get(`${QIITA_API_BASE_URL}/items`, {
        params: {
          // 検索条件: 指定されたタグ
          query: `tag:${tag}`,
          // ページあたりの記事数
          per_page: per_page,
          // ソートはデフォルトで「ストック数（いいね数）」順です
        },
      })

      // 取得した生のデータ (JSON) を、schemas.tsで定義した型にマッピング（変換）する
      const articles: QiitaArticle[] = response.data.map((item: any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        user_id: item.user.id,
        likes_count: item.likes_count,
        created_at: item.created_at,
        // タグの配列を、タグ名の文字列配列に変換する
        tags: item.tags.map((tag: { name: string }) => tag.name),
      }))

      console.log(`[QiitaService] タグ: ${tag} の記事を ${articles.length} 件取得しました。`)

      return articles
    } catch (error) {
      if (error instanceof Error) {
        console.error('[QiitaService Error] Qiita APIからの記事取得に失敗しました:', error.message)
        // 失敗した場合は空の配列を返すか、エラーを再スローします
        throw new Error(`Qiita APIでエラーが発生しました: ${error.message}`)
      } else {
        // 2. Error オブジェクトではない場合の対処（文字列や他の型かもしれない）
        console.error('不明なエラーが発生しました:', error)
      }
    }
  }
}
