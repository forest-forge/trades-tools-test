// Offline cache for tileslate: the page is one self-contained file.
const C = "tileslate-1.0.0";
self.addEventListener("install", (e) => e.waitUntil(caches.open(C).then((c) => c.addAll(["./", "index.html", "icon.png", "icon-512.png", "manifest.webmanifest"])).then(() => self.skipWaiting())));
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== C).map((x) => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => { if (e.request.method !== "GET") return; e.respondWith(fetch(e.request).then((r) => { const copy = r.clone(); caches.open(C).then((c) => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("index.html")))); });
