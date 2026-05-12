import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routeTree } from './routeTree'

const router = createBrowserRouter(routeTree)

export function AppRouter() {
  return <RouterProvider router={router} />
}
