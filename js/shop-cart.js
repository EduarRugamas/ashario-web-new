import {data} from '../config/data.js';

const local_storage = window.localStorage;
let products = [];

let item_product_received = JSON.parse(local_storage.getItem('data_product_2'));
console.log(JSON.parse(item_product_received));

let save_item_array = products.push(item_product_received);
console.log('array item --> ', save_item_array);

local_storage.setItem('array_items', JSON.stringify(save_item_array));

let arreglo_items_saves = JSON.parse(local_storage.getItem('array_items'));
console.log('arreglo guardado localstorage', arreglo_items_saves);


// console.log('payload --> ', data);

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
    }
}
