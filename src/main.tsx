import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
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
  // Fire-and-forget — no await, no error UI. Just nudges the dyno awake.
  fetch(`${apiBase}/api/ai/health`, { method: 'GET', cache: 'no-store' }).catch(() => { /* ignore */ });
}
