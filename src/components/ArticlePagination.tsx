type ArticlePaginationProps = {
  page: number
  hasPrev: boolean
  hasNext: boolean
  busy: boolean
  onPrev: () => void
  onNext: () => void
}

export function ArticlePagination({
  page,
  hasPrev,
  hasNext,
  busy,
  onPrev,
  onNext,
}: ArticlePaginationProps) {
  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800 sm:gap-6"
      aria-label="Pagination"
    >
      <button
        type="button"
        disabled={!hasPrev || busy}
        onClick={onPrev}
        className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Previous
      </button>
      <span className="min-w-[5rem] text-center text-sm tabular-nums text-zinc-600 dark:text-zinc-400">
        Page {page}
      </span>
      <button
        type="button"
        disabled={!hasNext || busy}
        onClick={onNext}
        className="cursor-pointer rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        Next
      </button>
    </nav>
  )
}
