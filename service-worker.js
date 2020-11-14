const CACHE_NAME = "football-v10";
var urlsToCache = [
    "/",
    "/index.html",
    "/clubs.html",
    "/detail-club.html",
    "/myfavorite.html",
    "/css/style.css",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/sw.js",
    "/js/idb.js",
    "/js/db.js",
    "/service-worker.js",
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
    "https://fonts.googleapis.com/icon?family=Material+Icons"
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

self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: "/assets/img/Football Logo 192px.png",
        badge: "/assets/img/Football Logo 192px.png",
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Informasi Sepak Bola', options)
    );
});