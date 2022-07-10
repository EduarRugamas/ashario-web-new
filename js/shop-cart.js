import { data } from '../config/data.js';
const local_storage = window.localStorage;


let item_product_received = local_storage.getItem('data_product_2');
console.log(JSON.parse(item_product_received));

let item_to_payload = JSON.parse(item_product_received);
data.payload.products.push(item_to_payload);

console.log('payload --> ', data);

window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "analyticsEvent" && payload.name === "cartItemRemoval") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
     } //else if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
    //     window.localStorage.removeItem('data_product_2');
    // }
}
