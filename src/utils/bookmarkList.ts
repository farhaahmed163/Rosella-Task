import type { Article } from '../types/article'

export function isArticleBookmarked(bookmarks: Article[], articleId: number): boolean {
  return bookmarks.some((b) => b.id === articleId)
}

export function toggleArticleBookmark(bookmarks: Article[], article: Article): Article[] {
  const exists = bookmarks.some((b) => b.id === article.id)
  if (exists) {
    return bookmarks.filter((b) => b.id !== article.id)
  }
  return [...bookmarks, article]
}
