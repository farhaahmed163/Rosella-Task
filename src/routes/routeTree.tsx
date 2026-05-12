import type { RouteObject } from 'react-router-dom'
import { MainLayout } from '../layouts/MainLayout'
import { BookmarksPage } from '../pages/BookmarksPage'
import { HomePage } from '../pages/HomePage'

export const routeTree: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'bookmarks', element: <BookmarksPage /> },
    ],
  },
]
