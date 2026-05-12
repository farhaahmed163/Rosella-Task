import { NavLink } from 'react-router-dom'
import { ROUTES } from '../types/routes'

const linkClassName = ({
  isActive,
  orientation,
}: {
  isActive: boolean
  orientation: 'horizontal' | 'vertical'
}) => {
  const base =
    'rounded-lg text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50 dark:focus-visible:ring-offset-zinc-950'

  const layout =
    orientation === 'vertical'
      ? 'block w-full px-4 py-3 text-left'
      : 'px-3 py-2'

  const state = isActive
    ? 'border border-violet-500/40 bg-violet-500/10 text-zinc-900 dark:border-violet-400/35 dark:bg-violet-500/15 dark:text-zinc-50'
    : 'border border-transparent text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100'

  return [base, layout, state].join(' ')
}

type PrimaryNavLinksProps = {
  orientation: 'horizontal' | 'vertical'
  onItemClick?: () => void
  id?: string
}

export function PrimaryNavLinks({
  orientation,
  onItemClick,
  id,
}: PrimaryNavLinksProps) {
  const navClass =
    orientation === 'vertical'
      ? 'flex flex-col gap-1'
      : 'flex flex-wrap items-center gap-1'

  return (
    <nav id={id} className={navClass} aria-label="Primary">
      <NavLink
        to={ROUTES.home}
        end
        onClick={() => onItemClick?.()}
        className={({ isActive }) =>
          linkClassName({ isActive, orientation })
        }
      >
        Home
      </NavLink>
      <NavLink
        to={ROUTES.bookmarks}
        onClick={() => onItemClick?.()}
        className={({ isActive }) =>
          linkClassName({ isActive, orientation })
        }
      >
        Bookmarks
      </NavLink>
    </nav>
  )
}
