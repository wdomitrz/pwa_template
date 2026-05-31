const CACHE_NAME = "simple-pwa-v1";
const CACHE_PREFIX = "simple-pwa-";
const IS_LOCAL = ["localhost", "127.0.0.1", "::1"].includes(
  self.location.hostname,
);
const FILES = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./sw.js",
  "./icon.svg",
  "./manifest.json",
];

self.addEventListener("install", (event) => {
  if (IS_LOCAL) {
    self.skipWaiting();
    return;
  }

  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter(
              (name) =>
                (IS_LOCAL || name !== CACHE_NAME) &&
                name.startsWith(CACHE_PREFIX),
            )
            .map((name) => caches.delete(name)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  if (IS_LOCAL) return;
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
