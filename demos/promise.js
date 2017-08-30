// let promise = new Promise( (resolve, reject) => {
//    /*  const FLAG = 10;
//     FLAG === 10 ? resolve('Todo bien') : reject(Error('Algo salio mal :(')); */
//     setTimeout(() => {
//         resolve('Todo bien') 
//     }, 3000);
// });

// promise
// .then(response => {
//     console.log(response);
// })
// .catch(err => {
//     console.log(err);
// });
((c) => {
    const cuadrado = (value, callback) => {
        setTimeout(() => {
            callback(value, value * value);
        }, Math.random() * 1000);
    };
    cuadrado(2, (value, result) => {
        c('Inicio de callback');
        c(`Callback ${value} ${result}`);
        cuadrado(4, (value, result) => {
            c(`Callback ${value} ${result}`);
            cuadrado(6, (value, result) => {
                c(`Callback ${value} ${result}`);

            });
        });
        cuadrado(8, (value, result) => {
            c(`Callback ${value} ${result}`);
            c('Fin del callback');
        });
    });
})(console.log);
((c) => {

    const cuadrado = (value) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ value: value, result: value * value });
            }, Math.random() * 4000);
        });
    };
    cuadrado(2)
        .then(result => {
            c('Inicio de promise');
            c(`Promise: ${result.value} ${result.result}`);
            return cuadrado(4);
        })
        .then(result => {
            c(`Promise: ${result.value} ${result.result}`);
            return cuadrado(6);
        })
        .then(result => {
            c(`Promise: ${result.value} ${result.result}`);
            c('Fin de promise');
        });
    console.log('Mensaje xxx');
})(console.log);