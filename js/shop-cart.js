import {data} from '../config/data.js';
let local_storage = window.localStorage;
let cart = {};

if (local_storage.getItem('cart')){
    cart = JSON.parse(local_storage.getItem('cart'));
}

console.log(cart);

if (data.payload.products.length === 0 ){
    window.addEventListener("message", receiveMessage, false);
}else {
    data.payload.products.push(cart);
    window.addEventListener("message", receiveMessage, false);
}




function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
    }
}
