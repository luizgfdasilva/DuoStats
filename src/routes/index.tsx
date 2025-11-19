import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { Home } from '../pages/Home'
import { Settings } from '../pages/Settings'
import { NotFound } from '../pages/NotFound'

/**
 * Application routes configuration
 * Using createBrowserRouter for better data loading and error handling
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
])

export function AppRoutes() {
  return <RouterProvider router={router} />
}
