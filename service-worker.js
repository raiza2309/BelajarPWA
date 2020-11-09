const CACHE_NAME = "firstpwa-v8";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/article.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "js/api.js",
    "/manifest.json",
    "/assets/img/Logo.png",
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
    var base_url = "https://api.football-data.org/v2/";

    if(event.request.url.indexOf("clubs.html?id=2019") > -1){
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
                    if(cacheName !== CACHE_NAME && cacheName.startsWith('firstpwa')) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});