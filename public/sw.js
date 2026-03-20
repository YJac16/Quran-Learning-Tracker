/* Quran Learning Tracker PWA service worker */

const CACHE_VERSION = "quran-tracker-cache-v2";
const CACHE_NAME = CACHE_VERSION;

// Keep the list small; the root-word dataset will be cached too.
const CORE_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/sw.js",
  "/data/quranRootsDetailed.json",
  "/data/allah99.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => {
        // If caching fails (e.g. offline first load), don't block install.
      })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => (key === CACHE_NAME ? null : caches.delete(key)))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((res) => {
          // Cache successful responses for subsequent visits.
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => {
          // For navigations, try the app shell.
          if (req.mode === "navigate") return caches.match("/index.html");
          return undefined;
        });
    })
  );
});

