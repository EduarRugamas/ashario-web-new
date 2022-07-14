import {data} from '../config/data.js';

let local_storage = window.localStorage;
let cart = {};
let count = 0;


if (local_storage.getItem('cart')) {
    cart = JSON.parse(local_storage.getItem('cart'));
}

if (local_storage.getItem('count')){
    count = count = parseInt(local_storage.getItem('count'));
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

// event of delete item of the cart
window.addEventListener("message", DeleteItemCart, false);

//event of update item of the cart
window.addEventListener("message", UpdateItemCart, false)


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
        removeItemCart(cart, payload.properties.productId);
    }
}

function UpdateItemCart (event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "analyticsEvent" && payload.name === "cartItemChangeCount") {
        console.log('Updating cart item');
        console.table(payload);
        //ejecutar funcion que eliminara el producto del localstorage
        updatingItemCart(cart, payload.properties.productId, payload.properties.count);
    }
}


function removeItemCart (cart, productId) {
    //local_storage.removeItem(productId);
    console.log(cart);
    console.log(productId);
    console.log('Producto seleccionado a eliminar', cart[productId]);
    delete cart[productId];
    console.log(cart);
    local_storage.setItem('cart', JSON.stringify(cart));
    count--;
    updateCartCount();
}

function updatingItemCart (cart, productId, count) {
    console.log(cart);
    console.log('id de el producto',productId);
    console.log('Producto seleccionado a actualizar', cart[productId]);
    cart[productId].count = count;
    console.log(cart);
    local_storage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    document.getElementById('count_quantity_cart').textContent = count;
    local_storage.setItem('count', count);
}

