import { useEffect } from 'react'

const appName = 'Developer Feed'

export function usePageTitle(pageTitle: string) {
  useEffect(() => {
    const previous = document.title
    document.title = `${pageTitle} · ${appName}`
    return () => {
      document.title = previous
    }
  }, [pageTitle])
}
