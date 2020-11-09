const CACHE_NAME = "football-v10";
var urlsToCache = [
    "/",
    "/index.html",
    "/clubs.html",
    "/css/style.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/sw.js",
    "/manifest.json",
    "/assets/img/Football Logo 192px.png",
    "/assets/img/Football Logo 256px.png",
    "/assets/img/Football Logo 384px.png",
    "/assets/img/Football Logo 512px.png",
    "/assets/img/Default Logo.png",
    "/assets/img/Premier League.png",
    "/assets/img/Serie A.jpg",
    "/assets/img/Primera Division.png",
    "/assets/img/Ligue 1.png",
    "/assets/img/UCL.png",
    "/assets/data/competitions.json",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", function (event) {
    const base_url = "https://api.football-data.org/v2/";

    if(event.request.url.indexOf(base_url) > -1){
        event.respondWith(
            caches.open(CACHE_NAME).then(function (cache) {
                return fetch(event.request).then(function (response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(function (response) {
                return response || fetch(event.request);
            })
        );
    }
});

self.addEventListener("activate", function (event) {
    console.log('Aktivasi service worker baru');

    event.waitUntil(
        caches.keys()
        .then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if(cacheName !== CACHE_NAME && cacheName.startsWith('football')) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});