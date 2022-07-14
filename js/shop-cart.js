import { data } from '../config/data.js';

let local_storage = window.localStorage;
let cart = {};
let count = 0;


if (local_storage.getItem('cart')) {
    cart = JSON.parse(local_storage.getItem('cart'));
}

if (local_storage.getItem('count')){
    count = count = parseInt(local_storage.getItem('count'));
}

updateCartCount();

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
window.addEventListener("message", UpdateItemCart, false);


function receiveMessage(event) {
    let payload = event.data && event.data.payload;
    let messageType = event.data && event.data.messageType;

    if (messageType === "loadingEvent" && payload.name === "headlessAppLoaded") {
        let frame = document.getElementById("jane-menu");
        frame.contentWindow.postMessage(data, "*");
    }

    updateCartCount()
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


// template minicart
// <li className="nav-item dropdown dropdown-large">
//     <a href="#" className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative cart-link"
//        data-bs-toggle="dropdown"> <span className="alert-count">8</span>
//         <i className='bx bx-shopping-bag'></i>
//     </a>
//     <div className="dropdown-menu dropdown-menu-end">
//         <a href="javascript:;">
//             <div className="cart-header">
//                 <p className="cart-header-title mb-0">8 ITEMS</p>
//                 <p className="cart-header-clear ms-auto mb-0">VIEW CART</p>
//             </div>
//         </a>
//         <div className="cart-list">
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Men White T-Shirt</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/01.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Puma Sports Shoes</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/05.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Women Red Sneakers</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/17.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Black Headphone</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/10.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Blue Girl Shoes</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/08.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Men Leather Belt</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/18.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Men Yellow T-Shirt</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/04.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//             <a className="dropdown-item" href="javascript:;">
//                 <div className="d-flex align-items-center">
//                     <div className="flex-grow-1">
//                         <h6 className="cart-product-title">Pool Charir</h6>
//                         <p className="cart-product-price">1 X $29.00</p>
//                     </div>
//                     <div className="position-relative">
//                         <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//                         </div>
//                         <div className="cart-product">
//                             <img src="assets/images/products/16.png" className="" alt="product image">
//                         </div>
//                     </div>
//                 </div>
//             </a>
//         </div>
//         <a href="javascript:;">
//             <div className="text-center cart-footer d-flex align-items-center">
//                 <h5 className="mb-0">TOTAL</h5>
//                 <h5 className="mb-0 ms-auto">$189.00</h5>
//             </div>
//         </a>
//         <div className="d-grid p-3 border-top"><a href="javascript:;" className="btn btn-dark btn-ecomm">CHECKOUT</a>
//         </div>
//     </div>
// </li>

