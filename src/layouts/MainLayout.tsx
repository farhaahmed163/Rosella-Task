import { useEffect, useId, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MobileMenuDrawer } from '../components/MobileMenuDrawer'
import { PrimaryNavLinks } from '../components/PrimaryNavLinks'

export function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onViewportChange = () => {
      if (mq.matches) setMobileOpen(false)
    }
    mq.addEventListener('change', onViewportChange)
    return () => mq.removeEventListener('change', onViewportChange)
  }, [])

  return (
    <div className="flex min-h-svh flex-1 flex-col">
      <header className="sticky top-0 z-30 border-b border-zinc-200/90 bg-white/90 backdrop-blur-md dark:border-zinc-800/90 dark:bg-zinc-950/90">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-5 lg:max-w-5xl lg:px-6">
          <span className="truncate text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Developer Feed
          </span>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-2 text-zinc-700 transition-colors hover:bg-zinc-50 md:hidden dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
              aria-expanded={mobileOpen}
              aria-controls={menuId}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">
                {mobileOpen ? 'Close menu' : 'Open menu'}
              </span>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {mobileOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </>
                )}
              </svg>
            </button>

            <div className="hidden md:block">
              <PrimaryNavLinks orientation="horizontal" />
            </div>
          </div>
        </div>
      </header>

      <MobileMenuDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        menuId={menuId}
      />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-5 sm:py-8 lg:max-w-5xl lg:px-6 lg:py-10">
        <Outlet />
      </main>
    </div>
  )
}
