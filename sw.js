// آفتاب‌یار — Service Worker
// Caches the app shell so the estimator works fully offline.
// Bump CACHE_VERSION whenever index.html/manifest/icons change so users get the update.
const CACHE_VERSION = 'aftabyar-v5';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-192.png',
  './icon-maskable-512.png'
];

// Third-party assets we'd like available offline once fetched at least once
// (PDF reading works offline after first load; live translation still needs internet).
const RUNTIME_CACHE = 'aftabyar-runtime-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION && k !== RUNTIME_CACHE)
          .map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache the live translation API — it must always hit the network,
  // and if offline it should simply fail so the app can fall back to English text.
  if (url.hostname.includes('mymemory.translated.net')) {
    return;
  }

  // App shell: cache-first (instant load, works offline).
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // Third-party (pdf.js from CDN, etc.): network-first, fall back to runtime cache if offline.
  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});
