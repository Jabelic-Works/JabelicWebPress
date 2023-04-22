/** topページの記事カードの情報 */
export interface ArticleCard {
  title: string
  description: string
  tags: Array<{ title: string }> | null
  to: string
  id: string | number
}
