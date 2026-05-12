export type FeedView = 'all' | 'bookmarked'

type FeedViewToggleProps = {
  value: FeedView
  onChange: (view: FeedView) => void
}

const tabBase =
  'min-w-0 flex-1 cursor-pointer rounded-lg px-2 py-2 text-center text-xs font-medium leading-snug outline-none transition-[color,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-violet-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 dark:focus-visible:ring-offset-zinc-900 sm:flex-none sm:px-4 sm:text-sm sm:leading-normal'

const activeTab =
  'bg-violet-600 font-semibold text-white shadow-md shadow-violet-500/30 ring-1 ring-violet-500/50 dark:bg-violet-500 dark:shadow-lg dark:shadow-violet-950/50 dark:ring-violet-400/40'

const inactiveTab =
  'bg-transparent text-zinc-600 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'

export function FeedViewToggle({ value, onChange }: FeedViewToggleProps) {
  return (
    <div
      role="tablist"
      aria-label="Article feed"
      className="flex w-full flex-row gap-0.5 rounded-xl border border-zinc-200/90 bg-zinc-100 p-1 shadow-inner dark:border-zinc-600 dark:bg-zinc-900/80 sm:w-auto sm:shrink-0"
    >
      <button
        type="button"
        role="tab"
        aria-selected={value === 'all'}
        className={`${tabBase} ${value === 'all' ? activeTab : inactiveTab}`}
        onClick={() => onChange('all')}
      >
        All Articles
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={value === 'bookmarked'}
        title="Bookmarked Articles"
        className={`${tabBase} ${value === 'bookmarked' ? activeTab : inactiveTab}`}
        onClick={() => onChange('bookmarked')}
      >
        Bookmarked Articles
      </button>
    </div>
  )
}
