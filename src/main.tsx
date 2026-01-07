import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router'
import { ErrorBoundary, SettingsInitializer } from './ui/components'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <SettingsInitializer>
        <RouterProvider router={router} />
      </SettingsInitializer>
    </ErrorBoundary>
  </StrictMode>,
)
