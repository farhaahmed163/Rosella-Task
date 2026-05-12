import { usePageTitle } from '../hooks/usePageTitle'

export function HomePage() {
  usePageTitle('Home')

  return (
    <section
      className="space-y-3 text-pretty"
      aria-labelledby="home-heading"
    >
      <h1
        id="home-heading"
        className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
      >
        Home
      </h1>

    </section>
  )
}
