/**
 * Syllab.in Service Worker
 *
 * Strategy:
 *  - Static assets (JS/CSS/images): cache-first with network fallback
 *  - Navigation requests (HTML): network-first with cache fallback (so users get fresh app shell when online,
 *    but the app still opens when offline)
 *  - API requests: never cached (always go to network)
 *
 * Bump CACHE_VERSION on every deploy to force clients to pick up the new build.
 */
const CACHE_VERSION = 'syllab-v362-2026-08-26-noindex-admin-rewrite';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/icon-maskable.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => !k.startsWith(CACHE_VERSION))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  let url;
  try { url = new URL(req.url); } catch { return; }

  // CROSS-ORIGIN (Wikimedia diagrams, Firebase, fonts, CDNs): do NOT intercept.
  // Let the browser handle them natively — intercepting risks returning a
  // non-Response and breaking the load (this caused the Wikipedia ERR_FAILED
  // flood + "Failed to convert value to 'Response'"). The app has its own
  // <img onerror> fallback for dead diagram URLs.
  if (url.origin !== self.location.origin) return;

  // Our own API endpoints → always live network, never the SW.
  if (url.pathname.startsWith('/api/')) return;

  // Navigation (HTML) → network-first, fall back to this URL's own cached copy.
  // ALWAYS resolves to a real Response (never undefined → no respondWith crash).
  //
  // Every navigation used to be cached under the single key '/', and the offline
  // fallback read that same key. So the cache entry for the homepage held
  // whatever page was loaded last, and an offline visitor asking for any URL got
  // it — verified in a real browser, where the cached '/' was holding the
  // /sample-papers/class-7-english document.
  //
  // On a client-rendered SPA that is invisible: the HTML is a route-agnostic
  // shell, so React reads window.location and renders the right page whichever
  // document arrived. It stops being invisible the moment any HTML becomes
  // route-SPECIFIC — which is exactly what SSR does. Serving one route's
  // server-rendered markup for another URL makes hydrateRoot mismatch, and the
  // route's Suspense boundary never leaves its fallback: a permanent spinner.
  // That is the shape of the v288 SSR incident, and re-enabling SSR on top of
  // this caching would have reproduced it.
  //
  // So each URL now caches under itself, and the fallback prefers this URL's own
  // copy. The shared shell is a last resort and is only ever a safe answer while
  // the served HTML stays route-agnostic.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const copy = res.clone();
        caches.open(STATIC_CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      } catch {
        const shell = (await caches.match(req))
          || (await caches.match('/'))
          || (await caches.match('/index.html'));
        return shell || new Response(
          '<!doctype html><meta charset="utf-8"><title>Offline</title><body style="font-family:system-ui,sans-serif;text-align:center;padding:60px"><h1>You\'re offline</h1><p>Reconnect and reload to continue.</p></body>',
          { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } },
        );
      }
    })());
    return;
  }

  // Static assets → cache-first, runtime-cache on miss.
  // ALWAYS resolves to a real Response.
  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    } catch {
      // Never return undefined — that throws "Failed to convert value to 'Response'".
      return cached || Response.error();
    }
  })());
});
