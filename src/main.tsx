import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import { installGlobalErrorReporting } from './lib/errorReporter'
import { initAnalytics } from './lib/analytics'

// Capture uncaught errors / promise rejections → email alert to the owner.
installGlobalErrorReporting()
// Analytics — inert unless VITE_GA_ID is set at build time.
initAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

// Register service worker for PWA (only in production builds — avoids dev-server noise)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .catch(() => { /* registration failed — non-fatal, app still works as a website */ });
  });
}

// Wake the backend dyno early so the first AI call doesn't hit a cold start
if (import.meta.env.PROD) {
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://syllab-backend.onrender.com';
  // Fire-and-forget — nudges the Render dyno awake. Uses /api/health (pure uptime,
  // NO Gemini call) instead of /api/ai/health, to avoid touching the AI API on
  // every page load (budget-friendly).
  fetch(`${apiBase}/api/health`, { method: 'GET', cache: 'no-store' }).catch(() => { /* ignore */ });
}
