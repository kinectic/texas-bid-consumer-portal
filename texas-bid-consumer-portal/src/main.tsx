import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getViewFromLocation, getPathForView } from './data/viewData'

const currentPath = window.location.pathname
const normalizedView = getViewFromLocation(currentPath)
const normalizedPath = getPathForView(normalizedView)

if (currentPath !== normalizedPath) {
  window.history.replaceState({}, '', normalizedPath)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
