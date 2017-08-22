fetch('index.html')
    .then(response => {
        console.log(response);
        return response.text();
    })
    .then(responseText => console.log(responseText))
    .catch(err => console.log(err));
fetch('./img/icon_128x128.png')
    .then(response => response.blob())
    .then(responseBlob => {
        console.log(responseBlob);
        let objURL = URL.createObjectURL(responseBlob);
        let img = document.createElement('img');
        img.src = objURL;
        document.body.appendChild(img);
    });