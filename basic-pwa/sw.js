const CACHE_NAME = 'pwa-edteam-cache-v1';
urlsToCache = [
    './',
    './?utm_source=homescreen',
    './index.html?utm_source=homescreen',
    './manifest.json',
    './styles.css',
    './script.js',
    './sw.js',
    './favicon.ico',
    './img/icon_192x192.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
];
self.addEventListener('install', e => {
    console.info('Evento:', 'SW instalado');
    e.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.log('Archivos en cache');
                return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting()); //skipWaiting forza al SW a activarse;

            })
            .catch(err => console.error('Falló el registro de cache', err))
    );
});

self.addEventListener('activate', e => {
    console.info('Evento:', 'SW activado');
    const cacheWhitelist = [
        CACHE_NAME
    ];
    e.waitUntil(
        caches
            .keys()
            //Depurar cache
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.info('Cache actualizado');
                return self.clients.claim(); // Le indica al SW activar el cache actual
            })
            .catch(err => console.error('Falló la actualización del cache', err))
    );
});

self.addEventListener('fetch', e => {
    console.log('Evento: ', 'SW recuperado');
    e.respondWith(
        //Miramos si la petición coincide con un elemento del cache
        caches.match(e.request)
            .then(response => {
                console.log('Recuperando cache');
                //Si coincide retornamos el elemento del cache
                //De lo contrario, solicitamos el elemento a la red
                return response || fetch(e.request)
                    .then(response => {
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache
                                    .put(e.request, response.clone())
                                    .catch(err => { console.error(`${e.request.url}: ${err.message}`) });
                            });
                    });
                return response;
            })
    );
});

self.addEventListener('push', e => {
    console.log('Evento: Push');
    let title = 'Demo Push notification';
    let options = {
        body: 'Clic para regresar a la aplicación',
        icon: './img/icon_192x192.png',
        vibrate: [100, 50, 100], //3 vibraciones
        data: { //Datos a través de la notificación
            id: 1
        },
        actions: [
            {
                action: 'Si',
                title: 'Amo esta app :)',
                icon: './img/icon_192x192.png'
            },
            {
                action: 'No',
                title: 'No me gusta esta app :(',
                icon: './img/icon_192x192.png'
            }
        ]
    };
    e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
    console.log(e);
    if (e.action === 'Si') {
        console.log('Amo esta app :)');
        clients.openWindow('https://ed.team'); //clients objeto nativo de notification
    }
    else if (e.action === 'No') {
        console.log('No me gusta esta app :(');
    }
    e.notification.close();
});

self.addEventListener('sync', e => {
    console.log('Evento: sincronización de fondo', e);
});