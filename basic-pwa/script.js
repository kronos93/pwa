//Registro de las caracteristicas de las PWA
((w, d, n, c) => {
    //Registro de SW
    if ('serviceWorker' in n) {
        w.addEventListener('load', () => {
            n.serviceWorker.register('./sw.js')
                .then(registration => {
                    c(registration);
                    c('Service worker registrado con éxito', registration.scope);
                })
                .catch(err => c(`Ha ocurrido un error ${err}`));
        });
    }
    //Activación y permisos de notificaciones
    if (w.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(status => {
            c(status);
            let n = new Notification('Notificación', {
                body: 'Soy una notificación...',
                icon: './img/icon_192x192.png',
            });
        });
    }
    //Activar sincronización de fondo
    if ('serviceWorker' in n && 'SyncManager' in w) {
        function registerBGSync() {
            n.serviceWorker.ready
                .then(registration => {
                    return registration.sync.register('github')
                    .then( () => c('Sincronización de fondo registrada'))
                    .catch( err => c('Falló la sincronización de fondo', err));
                });
        }
        registerBGSync();
    }
})(window, document, navigator, console.log);
//Detectar el estado de la conexión
((w, d, n, c) => {
    const header = d.querySelector('.Header');
    const metaTagTheme = d.querySelector('meta[name=theme-color]');
    function networkStatus(e) {
        c(e, e.type);
        if (n.onLine) {
            metaTagTheme.setAttribute('content', '#F7DF1E');
            header.classList.remove('u-offline');
            alert('Conexión recuperada :)..');
        } else {
            metaTagTheme.setAttribute('content', '#666');
            header.classList.add('u-offline');
            alert('Conexión perdida :(...');
        }
    }
    d.addEventListener('DOMContentLoaded', e => {
        console.log('DOMContentLoaded: ', this);
        if (!n.onLine) {
            networkStatus(this);
        }
        w.addEventListener('online', networkStatus);
        w.addEventListener('offline', networkStatus);
    });
})(window, document, navigator, console.log);

((w, d, n, c) => {

})(window, document, navigator, console.log);