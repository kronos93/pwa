/* ;
((c) => {
    const cuadrado = (value, callback) => {

        setTimeout(() => {
            callback(value, value * value);
        }, Math.random() * 100);
    };
    cuadrado(2, (value, result) => {
        c('Inicio del callbakc');
        c(`Callback: ${value}, ${result}`);
        cuadrado(3, (value, result) => {
            c('Inicio del callbakc');
            c(`Callback: ${value}, ${result}`);
            cuadrado(4, (value, result) => {
                c('Inicio del callbakc');
                c(`Callback: ${value}, ${result}`);
                cuadrado(5, (value, result) => {
                    c('Inicio del callbakc');
                    c(`Callback: ${value}, ${result}`);
                });
            });
        });
        cuadrado(6, (value, result) => {
            c('Inicio del callbakc');
            c(`Callback: ${value}, ${result}`);
        });
    });
})(console.log); */

((c) => {
    const cuadrado = (value) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ value: value, result: value * value });
            }, Math.random() * 2000);
        });

    };
    cuadrado(2)
        .then(obj => {
            c('Inicio de la promesa');
            c(`Promise: ${obj.value}, ${obj.result}`);
            return cuadrado(3);
        })
        .then(obj => {
            c(`Promise: ${obj.value}, ${obj.result}`);
            return cuadrado(4);
        })
        .then(obj => {
            c(`Promise: ${obj.value}, ${obj.result}`);
            return cuadrado(5);
        })
        .then(obj => {
            c('Fin de promesa')
            c(`Promise: ${obj.value}, ${obj.result}`);
            return cuadrado(6);
        })
        .catch((err) => c("Ha ocurrido un error " + err));
})(console.log);