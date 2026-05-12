import { useEffect, useState } from 'react'
import { ArticleCard } from '../components/ArticleCard'
import { FeedViewToggle, type FeedView } from '../components/FeedViewToggle'
import type { Article } from '../types/article'
import { isArticleBookmarked, toggleArticleBookmark } from '../utils/bookmarkList'
import {
  loadBookmarkedArticles,
  saveBookmarkedArticles,
} from '../utils/bookmarkedArticlesStorage'
import { usePageTitle } from '../hooks/usePageTitle'

const ARTICLES_URL = 'https://dev.to/api/articles?per_page=30'

function normalizeTags(tagList: unknown): string[] {
  if (Array.isArray(tagList)) {
    return tagList.filter((t): t is string => typeof t === 'string')
  }
  if (typeof tagList === 'string') {
    return tagList
      .split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export function HomePage() {
  usePageTitle('Home')

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [feedView, setFeedView] = useState<FeedView>('all')
  const [bookmarks, setBookmarks] = useState<Article[]>(loadBookmarkedArticles)

  useEffect(() => {
    saveBookmarkedArticles(bookmarks)
  }, [bookmarks])

  useEffect(() => {
    const controller = new AbortController()

    async function loadArticles() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(ARTICLES_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Could not load articles (${response.status})`)
        }

        const data: unknown = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Unexpected response from server')
        }

        setArticles(data as Article[])
      } catch (err) {
        if (controller.signal.aborted) return
        const message =
          err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
        setArticles([])
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadArticles()

    return () => controller.abort()
  }, [])

  function handleToggleBookmark(article: Article) {
    setBookmarks((prev) => toggleArticleBookmark(prev, article))
  }

  const articlesToShow =
    feedView === 'bookmarked' ? bookmarks : articles

  return (
    <section
      className={loading ? 'text-pretty' : 'space-y-6 text-pretty'}
      aria-labelledby={loading ? undefined : 'home-heading'}
      aria-label={loading ? 'Home' : undefined}
      aria-busy={loading}
    >
      {loading ? (
        <div
          className="flex min-h-[calc(100svh-5.5rem)] w-full flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading articles</span>
          <div
            className="h-11 w-11 animate-spin rounded-full border-[3px] border-zinc-200 border-t-violet-600 dark:border-zinc-700 dark:border-t-violet-400"
            aria-hidden="true"
          />
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <h1
                id="home-heading"
                className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
              >
                Home
              </h1>
              <p className="max-w-prose text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
                Latest articles from the DEV community.
              </p>
            </div>
            <FeedViewToggle value={feedView} onChange={setFeedView} />
          </div>

          {error && (
            <div
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-200"
              role="alert"
            >
              {error}
            </div>
          )}

          {feedView === 'all' && !error && articles.length === 0 && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No articles to show.
            </p>
          )}

          {feedView === 'bookmarked' && bookmarks.length === 0 && (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/80 px-6 py-12 text-center dark:border-zinc-600 dark:bg-zinc-900/40">
              <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">
                No bookmarks yet
              </p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Switch to <span className="font-medium">All Articles</span> and
                tap the bookmark on a card to save it here.
              </p>
            </div>
          )}

          {articlesToShow.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {articlesToShow.map((article) => {
                const authorName =
                  article.user?.name?.trim() ||
                  article.user?.username ||
                  'Unknown author'

                const websiteUrl = article.user?.website_url?.trim()
                const authorImage =
                  article.user?.profile_image_90?.trim() ||
                  article.user?.profile_image?.trim() ||
                  null

                return (
                  <ArticleCard
                    key={article.id}
                    title={article.title}
                    articleUrl={article.url}
                    authorName={authorName}
                    authorImageUrl={authorImage}
                    authorWebsiteUrl={websiteUrl || null}
                    tags={normalizeTags(article.tag_list)}
                    reactionCount={article.public_reactions_count ?? 0}
                    readingTimeMinutes={article.reading_time_minutes ?? 1}
                    publishedAtIso={article.published_at ?? ''}
                    readablePublishDate={article.readable_publish_date}
                    coverImageUrl={article.cover_image ?? null}
                    isBookmarked={isArticleBookmarked(bookmarks, article.id)}
                    onBookmarkToggle={() =>
                      handleToggleBookmark(article)
                    }
                  />
                )
              })}
            </div>
          )}
        </>
      )}
    </section>
  )
}
