import type { Article } from '../types/article'

export const BOOKMARKS_STORAGE_KEY = 'bookmarkedArticles'

export function loadBookmarkedArticles(): Article[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isArticleRecord)
  } catch {
    return []
  }
}

export function saveBookmarkedArticles(articles: Article[]): void {
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(articles))
  } catch {
  }
}

function isArticleRecord(value: unknown): value is Article {
  if (!value || typeof value !== 'object') return false
  const v = value as Record<string, unknown>
  return typeof v.id === 'number' && typeof v.title === 'string' && typeof v.url === 'string'
}
