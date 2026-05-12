import { useEffect } from 'react'
import { PrimaryNavLinks } from './PrimaryNavLinks'

type MobileMenuDrawerProps = {
  open: boolean
  onClose: () => void
  menuId: string
}

export function MobileMenuDrawer({
  open,
  onClose,
  menuId,
}: MobileMenuDrawerProps) {
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  return (
    <div
      className={`fixed inset-0 z-40 md:hidden ${
        open ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-zinc-950/25 backdrop-blur-md transition-opacity duration-200 ease-out dark:bg-zinc-950/40 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`absolute left-0 top-0 flex h-full w-[min(100%,18rem)] flex-col border-r border-zinc-200 bg-white shadow-xl transition-transform duration-200 ease-out dark:border-zinc-800 dark:bg-zinc-900 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Developer Feed
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            aria-label="Close menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <PrimaryNavLinks
            orientation="vertical"
            onItemClick={onClose}
          />
        </div>
      </aside>
    </div>
  )
}
