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
import { revealPrerenderedProseWhenReady } from './lib/revealPrerendered'

// Capture uncaught errors / promise rejections → email alert to the owner.
installGlobalErrorReporting()
// Analytics (GTM / Clarity) — deferred, because gtag is 165 KB of third-party JS.
//
// This used to use a 4000ms idle timeout. On a throttled mobile main thread the
// idle callback never gets a quiet slot, so it fired at the timeout — landing
// almost exactly on LCP (measured 4.6s) and costing 249ms of blocking time right
// where it hurts most. Lighthouse attributed more blocking to Google Tag Manager
// than to anything else on the page.
//
// Now it starts on whichever comes first:
//   • the first real interaction (scroll / pointer / key) — an engaged visitor is
//     tracked within milliseconds of engaging, so this loses nothing that matters;
//   • otherwise an idle slot, with the fallback timeout pushed well clear of LCP.
// A visitor who leaves without interacting inside that window goes uncounted. That
// is the deliberate trade: a bounce we did not measure costs less than a slower
// first paint for everyone who stayed.
if (typeof window !== 'undefined') {
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    for (const e of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
      window.removeEventListener(e, start);
    }
    initAnalytics();
  };
  for (const e of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
    window.addEventListener(e, start, { once: true, passive: true });
  }
  // NOT requestIdleCallback. v297 used ric(start, { timeout: 9000 }) intending a
  // 9s deferral, but ric fires at the FIRST IDLE MOMENT or the timeout,
  // whichever is sooner — the timeout is a ceiling, not a floor. The page goes
  // idle almost at once, so analytics still started early and the change
  // measured as a no-op (GTM blocking time was unchanged, 249ms -> 268ms).
  // Only a real timer actually defers.
  window.setTimeout(start, 9000);
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

// The prerendered body is not junk to be deleted — it is the page's authored
// prose, and deleting it made 4,521 paragraphs across 1,880 pages readable by
// Googlebot and by nobody else. revealPrerenderedProse() keeps the sections the
// React components do not already render and puts them on the page.
//
// setTimeout, not requestAnimationFrame: rAF is suspended while a tab is hidden,
// so a page opened in a background tab kept the invisible block in the DOM
// indefinitely. A timeout runs either way.
revealPrerenderedProseWhenReady();

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
