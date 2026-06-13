// Minimal offline-first service worker for Oasis.
// App data lives in localStorage; this just caches the shell so it opens offline.
const CACHE = 'oasis-shell-v1'

// Resolve against the SW scope so it works under any base path (e.g. /oasis/).
const SHELL = ['./', './index.html'].map((p) => new URL(p, self.registration.scope).pathname)

self.addEventListener('install', (e) => {
  self.skipWaiting()
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  const req = e.request
  if (req.method !== 'GET') return
  e.respondWith(
    caches.match(req).then(
      (cached) =>
        cached ||
        fetch(req)
          .then((res) => {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {})
            return res
          })
          .catch(() => caches.match(new URL('./index.html', self.registration.scope).pathname)),
    ),
  )
})
