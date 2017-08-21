if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log(registration);
                console.log('Service worker registrado con éxito', registration.scope);
            })
            .catch(err => console.log(`Ha ocurrido un error ${err}`));
    });
}