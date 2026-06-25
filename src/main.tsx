import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ErrorBoundary'
import { installGlobalErrorReporting } from './lib/errorReporter'
import { initAnalytics } from './lib/analytics'
import { initScrollReveal } from './lib/scrollReveal'

// Capture uncaught errors / promise rejections → email alert to the owner.
installGlobalErrorReporting()
// Analytics (GTM / Clarity) — DEFERRED until the main thread is idle so its ~800ms of
// third-party JS no longer blocks the critical render path (faster mobile LCP). It still
// captures the session: initAnalytics() sends the initial pageview when it loads.
if (typeof window !== 'undefined') {
  const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback;
  if (ric) ric(() => initAnalytics(), { timeout: 4000 });
  else window.addEventListener('load', () => window.setTimeout(() => initAnalytics(), 1500));
}

const rootEl = document.getElementById('root')!
const tree = (
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

// True SSR: production HTML now ships the real app inside #root, so we HYDRATE it
// (attach to existing markup — no full re-render → faster, content visible from the
// first byte). In dev the server-rendered markup is absent (#root is empty), so we
// fall back to a fresh client render. We detect via a server-set flag + child nodes.
if (rootEl.firstElementChild && document.documentElement.dataset.ssr === 'true') {
  hydrateRoot(rootEl, tree)
} else {
  createRoot(rootEl).render(tree)
}

// Legacy: older builds shipped a hidden #prerender-seo block; remove it if present
// (no-op for SSR builds, which don't emit it).
requestAnimationFrame(() => { document.getElementById('prerender-seo')?.remove(); });

// Scroll-reveal animations (transform/opacity only; respects reduced-motion).
initScrollReveal();

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
