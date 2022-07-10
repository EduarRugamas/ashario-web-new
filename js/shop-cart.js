import { data } from '../config/data.js';
const local_storage = window.localStorage;


let item_product_received = local_storage.getItem('data_product_2');
console.log(JSON.parse(item_product_received));


window.addEventListener("message", receiveMessage, false);

function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
    }
}
