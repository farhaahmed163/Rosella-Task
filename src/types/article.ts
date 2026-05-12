export type ArticleUser = {
  name?: string
  username?: string
  profile_image?: string
  profile_image_90?: string
  website_url?: string | null
}

export type Article = {
  id: number
  title: string
  url: string
  cover_image: string | null
  published_at: string
  readable_publish_date?: string
  reading_time_minutes?: number
  public_reactions_count?: number
  tag_list?: unknown
  user?: ArticleUser
}
