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
const CACHE_VERSION = 'syllab-v42-2026-06-01-colleges-95';
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

  const url = new URL(req.url);

  // Never cache cross-origin API or Firebase / auth calls
  if (url.origin !== self.location.origin) {
    // Allow opaque image loads from Wikimedia etc. through cache, but no-cache for everything else
    if (req.destination === 'image') {
      event.respondWith(
        caches.open(RUNTIME_CACHE).then(async (cache) => {
          const cached = await cache.match(req);
          if (cached) return cached;
          try {
            const res = await fetch(req);
            if (res && res.status === 200) cache.put(req, res.clone());
            return res;
          } catch {
            return cached || Response.error();
          }
        })
      );
    }
    return;
  }

  // Skip our own API endpoints (anything under /api/ if we add it later)
  if (url.pathname.startsWith('/api/')) return;

  // Navigation requests → network-first, fallback to cached shell
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          // Cache the latest shell so offline reloads work
          const copy = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put('/', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    );
    return;
  }

  // Static assets → cache-first, runtime-cache on miss
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (!res || res.status !== 200 || res.type !== 'basic') return res;
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => cached);
    })
  );
});
