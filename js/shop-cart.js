import {data} from '../config/data.js';

let local_storage = window.localStorage;
let cart = {};
const cart_array = [];

if (local_storage.getItem('cart')) {
    cart = JSON.parse(local_storage.getItem('cart'));
}

console.log(cart);

if (data.payload.products.length === 0) {
    window.addEventListener("message", receiveMessage, false);
}

for (let item in cart) {
    console.log('productos a agregar al carrito Jane', cart[item]);
    data.payload.products.push(cart[item]);
    console.log('Elementos agregados al carrito', data.payload.products);
    window.addEventListener("message", receiveMessage, false);

}

// data.payload.products.push(cart);
window.addEventListener("message", DeleteItemCart, false);


function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
    }
}

function DeleteItemCart (event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "analyticsEvent" && payload.name === "cartItemRemoval") {
        console.log('removing from cart item');
        console.table(payload);
        //ejecutar funcion que eliminara el producto del localstorage
        removeItemLocalStorage(cart, payload.properties.productId);
    }
}

function removeItemLocalStorage (cart, productId) {
    //local_storage.removeItem(productId);
    console.log(cart);
    console.log(productId);
    console.log('Producto seleccionado a eliminar', cart[productId]);
    for (let [key, value] in Object.entries(cart[productId])) {
        cart_array.push([`${key}: ${value}`]);
    }
    console.log(cart_array);
}
