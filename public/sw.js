/* Quran Learning Tracker PWA service worker */

const CACHE_VERSION = "quran-tracker-cache-v3";
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
          keys.map((key) => (key === CACHE_NAME ? Promise.resolve() : caches.delete(key)))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isAppDocumentRequest(req) {
  if (req.mode === "navigate") return true;
  if (req.destination === "document") return true;
  try {
    const u = new URL(req.url);
    if (u.pathname === "/" || u.pathname === "/index.html") return true;
  } catch (_) {}
  return false;
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Always try the network first for HTML so deploys show up in Chrome (not stale cache-first).
  if (isAppDocumentRequest(req)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const a = res.clone();
            const b = res.clone();
            caches.open(CACHE_NAME).then((cache) =>
              Promise.all([
                cache.put(req, a),
                cache.put(new Request("/index.html", { method: "GET" }), b)
              ])
            );
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match("/index.html"))
        )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => {
          if (req.mode === "navigate") return caches.match("/index.html");
          return undefined;
        });
    })
  );
});

