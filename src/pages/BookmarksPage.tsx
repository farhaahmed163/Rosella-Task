import { usePageTitle } from '../hooks/usePageTitle'

export function BookmarksPage() {
  usePageTitle('Bookmarks')

  return (
    <section
      className="space-y-3 text-pretty"
      aria-labelledby="bookmarks-heading"
    >
      <h1
        id="bookmarks-heading"
        className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
      >
        Bookmarks
      </h1>

    </section>
  )
}
