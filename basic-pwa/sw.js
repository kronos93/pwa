const CACHE_NAME = 'pwa-edteam-cache-v1';
urlsToCache = [
    '/',
    './',
    './?utm=homescreen',
    './styles.css',
    './script.js',
    './sw.js',
    './favicon.ico',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
]
self.addEventListener('install', e => {
    console.log('SW instalado');
    e.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(cache => {
            console.log('Archivos en cache');
            return cache.addAll(urlsToCache);
        })
        .catch(err => console.log('Falló el registro de cache', err))
    );
});

self.addEventListener('activate', e => {
    console.log('SW activado');
    const cacheList = [
        CACHE_NAME
    ];
    e.waitUntil(
        caches
        .keys()
        //Depurar cache
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheList.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            console.log('El cache esta limpio y actualizado');
            return self.clients.claim();
        })
        .catch(err => console.log('Falló la actualización del cache', err))
    );
});

self.addEventListener('fetch', e => {
    console.log('SW recuperado');
    e.respondWith(
        caches
        .match(e.request)
        .then(response => {
            if (response) {
                return response;
            }
            //console.log();
            return fetch(e.request)
                .then(response => {
                    let responseToCache = response.clone();
                    caches
                        .open(CACHE_NAME)
                        .then(cache => {
                            cache
                                .put(e.request, responseToCache)
                                .catch(err => { console.log(`${request.url}: ${err.message}`) });
                        });
                    return response;
                });
        })
    );
});