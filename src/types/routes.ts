export const ROUTES = {
  home: '/',
  bookmarks: '/bookmarks',
} as const

export type AppRoutePath = (typeof ROUTES)[keyof typeof ROUTES]
