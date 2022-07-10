import { data } from '../config/data.js';
const local_storage = window.localStorage;


// if (local_storage.getItem('data_product_1') === true) {
//     console.log('Se recibio el item product 1');
//     console.log(JSON.parse(local_storage.getItem('data_product_1')));
// } else if (local_storage.getItem('data_product_2') === true) {
//     console.log('Se recibio el item product 2');
//     console.log(JSON.parse(local_storage.getItem('data_product_2')));
// }

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
