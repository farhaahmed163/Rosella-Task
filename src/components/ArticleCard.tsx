import { useState } from 'react'

export type ArticleCardProps = {
  title: string
  articleUrl: string
  authorName: string
  authorImageUrl: string | null
  /** When set, author row links here (e.g. DEV.to `user.website_url`). */
  authorWebsiteUrl: string | null
  tags: readonly string[]
  reactionCount: number
  readingTimeMinutes: number
  publishedAtIso: string
  /** DEV.to `readable_publish_date` when present; shown as-is. */
  readablePublishDate?: string | null
  coverImageUrl: string | null
  isBookmarked: boolean
  onBookmarkToggle: () => void
}

function formatPublishedFallback(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''

  const diffMs = Date.now() - date.getTime()
  const minutes = Math.floor(diffMs / (1000 * 60))
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  if (minutes < 1) return 'just now'
  if (minutes < 60) return rtf.format(-minutes, 'minute')
  if (hours < 24) return rtf.format(-hours, 'hour')
  if (days < 14) return rtf.format(-days, 'day')

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function formatReadingTime(minutes: number): string {
  const n = Math.max(1, Math.round(minutes))
  return n === 1 ? '1 min read' : `${n} min read`
}

function formatTagLabel(tag: string): string {
  const t = tag.trim()
  if (!t) return t
  return t.startsWith('#') ? t : `#${t}`
}

export function ArticleCard({
  title,
  articleUrl,
  authorName,
  authorImageUrl,
  authorWebsiteUrl,
  tags,
  reactionCount,
  readingTimeMinutes,
  publishedAtIso,
  readablePublishDate,
  coverImageUrl,
  isBookmarked,
  onBookmarkToggle,
}: ArticleCardProps) {
  const [avatarFailed, setAvatarFailed] = useState(false)
  const publishedLabel =
    readablePublishDate?.trim() ||
    formatPublishedFallback(publishedAtIso)
  const readingLabel = formatReadingTime(readingTimeMinutes)

  const avatar =
    authorImageUrl && !avatarFailed ? (
      <img
        src={authorImageUrl}
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-600"
        onError={() => setAvatarFailed(true)}
      />
    ) : (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-semibold uppercase text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200"
        aria-hidden="true"
      >
        {authorName.slice(0, 1)}
      </span>
    )

  return (
    <article
      dir="ltr"
      lang="en"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-700/90 dark:bg-zinc-900 dark:hover:border-zinc-600 dark:hover:shadow-lg"
    >
      <a
        href={articleUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-none absolute end-3 top-3 z-20 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium text-zinc-900 opacity-0 shadow-md ring-1 ring-zinc-200/80 transition-opacity duration-200 hover:bg-zinc-50 group-hover:pointer-events-auto group-hover:opacity-100 dark:bg-zinc-800 dark:text-zinc-50 dark:ring-zinc-600 dark:hover:bg-zinc-700"
      >
        <span>Read Article</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 opacity-80"
          aria-hidden="true"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <h2 className="text-balance text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-xl">
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
          >
            {title}
          </a>
        </h2>

        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
            {tags.map((tag, index) => (
              <li key={`${tag}-${index}`}>
                <span className="inline-block rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {formatTagLabel(tag)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-rose-500 opacity-90"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {reactionCount.toLocaleString('en-US')}
          </span>
          <span className="text-zinc-300 dark:text-zinc-600" aria-hidden="true">
            ·
          </span>
          <span>{readingLabel}</span>
          {publishedLabel ? (
            <>
              <span className="text-zinc-300 dark:text-zinc-600" aria-hidden="true">
                ·
              </span>
              <time dateTime={publishedAtIso}>{publishedLabel}</time>
            </>
          ) : null}
        </div>

        <div className="mt-1 border-t border-zinc-100 pt-3 dark:border-zinc-800">
          {authorWebsiteUrl ? (
            <a
              href={authorWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${authorName} — website (opens in new tab)`}
              className="flex max-w-full items-center gap-2.5 rounded-md outline-none transition-colors hover:opacity-90 focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
            >
              {avatar}
              <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {authorName}
              </span>
            </a>
          ) : (
            <div className="flex max-w-full items-center gap-2.5">
              {avatar}
              <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                {authorName}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative aspect-video w-full shrink-0 bg-zinc-100 dark:bg-zinc-800/80">
        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 text-zinc-400 dark:from-zinc-800 dark:to-zinc-900 dark:text-zinc-600"
            aria-hidden="true"
          >
            <span className="text-sm">No cover</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end border-t border-zinc-100 px-4 py-3 dark:border-zinc-800/80 sm:px-5">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onBookmarkToggle()
          }}
          aria-pressed={isBookmarked}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          className={`cursor-pointer rounded-lg p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 ${
            isBookmarked
              ? 'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300'
              : 'text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300'
          }`}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill={isBookmarked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </article>
  )
}
