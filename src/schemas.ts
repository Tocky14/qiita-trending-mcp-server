// MCPのContextとして使用する記事データの定義
export interface QiitaArticle {
  id: string
  title: string
  url: string
  user_id: string
  likes_count: number
  created_at: string
  tags: string[]
}
