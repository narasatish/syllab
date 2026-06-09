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
const CACHE_VERSION = 'syllab-v89-2026-06-09-a11y-fixes';
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

  // Navigation (HTML) → network-first, fall back to cached shell.
  // ALWAYS resolves to a real Response (never undefined → no respondWith crash).
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const copy = res.clone();
        caches.open(STATIC_CACHE).then((c) => c.put('/', copy)).catch(() => {});
        return res;
      } catch {
        const shell = (await caches.match('/')) || (await caches.match('/index.html'));
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
