import {searchClient} from '../config/config.js';

const urlParams = new URLSearchParams(window.location.search);

const objectId = urlParams.get('objectID');
const indexName = 'menu-products-production';
const index = searchClient.initIndex(indexName);

console.log('el objecto id', objectId);

index.search('', {
    filters: `objectID:${objectId}`
}).then(({hits}) => {
    console.log(hits);
    const contenedor = document.getElementById('product-details');

    contenedor.innerHTML = `
       <section class="py-3 border-bottom border-top d-none d-md-flex bg-light">
            <div class="container">
                <div class="page-breadcrumb d-flex align-items-center">
                    <h3 class="breadcrumb-title pe-3">${hits[0].name}</h3>
                    <div class="col-4 col-md-auto order-2 order-md-4 ms-auto">
                        <div class="top-cart-icons float-start">
                            <nav class="navbar navbar-expand">
                                <ul class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a href="/views/shop-cart.html" class="nav-link position-relative cart-link">
                                            <span class="alert-count" id="count_quantity_cart">0</span>
                                            <i class="bx bx-shopping-bag"></i>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
       </section>
    <!--end breadcrumb-->
    <!--start product detail-->
       <section class="py-4">
            <div class="container">
                <div class="product-detail-card">
                    <div class="product-detail-body">
                        <div class="row g-0">
                            <div class="col-12 col-lg-5">
                                <div class="image-zoom-section">
                                    <div class="product-gallery owl-carousel owl-theme border mb-3 p-3 owl-loaded owl-drag">
                                        <div class="owl-stage-outer">
                                            <div class="owl-item" style="width: 400px; align-items: center; object-fit: cover;">
                                                <div class="item">
                                                    <img src="" alt="" class="img-fluid" id="imagen_carusel">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="selector-imgs-products" style="" class="border mb-2 p-2">
                                        <!-- <img src="${hits[0].image_urls[0]}" alt="" style="margin-right: 25px;" class="border p-1"> -->
                                        <!-- <img src="${hits[0].image_urls[1]}" alt="" class="border p-1"> -->
                                    </div>
                                </div>                                
                            </div>
                            <div class="col-12 col-lg-7">
                                <div class="product-info-section p-3">
                                        <div class="badge bg-badge-category mb-2">
                                            <p style="text-transform: uppercase;" class="m-1 align-content-center font-14">${hits[0].type}</p>
                                        </div>
                                        <h3 class="mt-4 mt-lg-0 mb-0">${hits[0].name}</h3>
                                        <div class="d-inline-block mt-2" >
                                            <p class="badge bg-success font-13 ">${hits[0].brand}</p>
                                            <p class="badge bg-success font-13" id="item_sub_type"></p> 
                                        </div>
                                        
                                        <div >
                                            <div class="mb-1 product-price itemprice jcitemprice">
                                                <span class="fs-5 currencyformat jcpriceformat">CAD</span>
                                                <span class="fs-5 jcpricingnw" id="text_price"></span>
                                                <span class="er-each jceachformat" id="text_weights_format"></span>
                                            </div>
                                        </div>
                                        <!--<div class="d-flex align-items-center mt-0 gap-2" id="text_price"></div>-->
                                        <div class="mt-3">
                                            <h6>Details:</h6>
                                            <dl class="row mt-3" id="container-details-dl">
                                                <dt class="col-sm-3">Product id</dt>
                                                <dd class="col-sm-9"># ${hits[0].product_id}</dd>
                                            </dl>
                                            <!--<p class="mb-0">${hits[0].description}</p>-->
                                        
                                            <h6>Description:</h6>
                                             <p class="mb-0">${hits[0]._highlightResult.description.value}</p>
                                        </div>
                                        <div class="row row-cols-auto align-items-center mt-3">
                                            <div class="col" id="container_quantity">
                                                <label class="form-label">Quantity</label>
                                                <select class="form-select form-select-sm" id="quantity"></select>
                                            </div>
                                            <div class="col" id="container_weight">
                                                <label class="form-label">weight</label>
                                                <select class="form-select form-select-sm" id="select-weight"></select>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-2 mt-3">
<!--                                            <a href="" class="btn btn-white btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</a>-->
                                            <button type="submit" class="btn btn-dark btn-ecomm" id="add-to-cart"><i class="bx bxs-cart-add"></i>Add to Cart</button>
                                        </div>
                                        <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </section>
    `;

    let frame = document.getElementById('jane-menu');
    frame.style= 'display: none;';

    if (hits[0].percent_cbd === 0 || hits[0].percent_cbd === null) {
        console.log('no tiene cbd');
    } else {
        let container_details = document.getElementById('container-details-dl');
        let dt_title = document.createElement('dt');
        let dd_string = document.createElement('dd');
        dt_title.className = 'col-sm-3';
        dt_title.style = 'text-transform: uppercase;';
        dt_title.textContent = 'cbd';
        dd_string.className = 'col-sm-9';
        dd_string.textContent = `${hits[0].percent_cbd}%`;
        container_details.appendChild(dt_title);
        container_details.appendChild(dd_string);
    }

    if (hits[0].percent_cbda === 0 || hits[0].percent_cbda === null) {
        console.log('no tiene cbda');
    } else {
        let container_details = document.getElementById('container-details-dl');
        let dt_title = document.createElement('dt');
        let dd_string = document.createElement('dd');
        dt_title.className = 'col-sm-3';
        dt_title.style = 'text-transform: uppercase;';
        dt_title.textContent = 'cbda';
        dd_string.className = 'col-sm-9';
        dd_string.textContent = `${hits[0].percent_cbda}%`;
        container_details.appendChild(dt_title);
        container_details.appendChild(dd_string);
    }

    if (hits[0].percent_tac === 0 || hits[0].percent_tac === null) {
        console.log('no tiene tac');
    } else {
        let container_details = document.getElementById('container-details-dl');
        let dt_title = document.createElement('dt');
        let dd_string = document.createElement('dd');
        dt_title.className = 'col-sm-3';
        dt_title.style = 'text-transform: uppercase;';
        dt_title.textContent = 'tac';
        dd_string.className = 'col-sm-9';
        dd_string.textContent = `${hits[0].percent_tac}%`;
        container_details.appendChild(dt_title);
        container_details.appendChild(dd_string);
    }

    if (hits[0].percent_thc === 0 || hits[0].percent_thc === null) {
        console.log('no tiene percent_thc');
    }else {
        let container_details = document.getElementById('container-details-dl');
        let dt_title = document.createElement('dt');
        let dd_string = document.createElement('dd');
        dt_title.className = 'col-sm-3';
        dt_title.style = 'text-transform: uppercase;';
        dt_title.textContent = 'tac';
        dd_string.className = 'col-sm-9';
        dd_string.textContent = `${hits[0].percent_thc}%`;
        container_details.appendChild(dt_title);
        container_details.appendChild(dd_string);
    }


    if (hits[0].percent_thca === 0 || hits[0].percent_thca === null){
        console.log('no tiene percent_thca');
    }else {
        let container_details = document.getElementById('container-details-dl');
        let dt_title = document.createElement('dt');
        let dd_string = document.createElement('dd');
        dt_title.className = 'col-sm-3';
        dt_title.style = 'text-transform: uppercase;';
        dt_title.textContent = 'tac';
        dd_string.className = 'col-sm-9';
        dd_string.textContent = `${hits[0].percent_thca}%`;
        container_details.appendChild(dt_title);
        container_details.appendChild(dd_string);
    }


if (hits[0].max_cart_quantity === 0 || hits[0].max_cart_quantity === null || hits[0].max_cart_quantity === undefined) {
    console.log('No hay cantidad disponible para el carrito');
} else {

    const container_select_quantity = document.querySelector('#quantity');
    let max_cart_quantity = hits[0].max_cart_quantity;

    console.log('cantidad maxima para enviar al carrito: ', max_cart_quantity);

    for (let quantity_select = 1; quantity_select <= max_cart_quantity; quantity_select++) {
        console.log(quantity_select);
        const options_quantity = document.createElement('option');
        options_quantity.value = quantity_select;
        options_quantity.text = quantity_select;
        container_select_quantity.appendChild(options_quantity);
    }
}

let brand_sub_type = document.getElementById('item_sub_type');

if (hits[0].brand_subtype === null || undefined) {
    brand_sub_type.className='d-none';
}else {
    brand_sub_type.textContent=`${hits[0].brand_subtype}`;
}


if (hits[0].available_weights.length === 0) {

    let container_select_weight = document.querySelector('#container_weight');
    container_select_weight.style = 'display: none;';
    console.log('No existe ningun elemento en el available weight');

} else {

    let container_select_weight = document.querySelector('#select-weight');

    for (let item of hits[0].available_weights) {

        console.log('weight: ', item);
        const options = document.createElement('option');
        options.value = item;
        options.text = item;
        container_select_weight.appendChild(options);

    }
}

const $select_weight = document.querySelector('#select-weight');
const $select_quantity = document.querySelector('#quantity');
let container_price = document.getElementById('text_price');

if (hits[0].available_weights.length === 0) {
    container_price.textContent = `$ ${hits[0].price_each}`;
} else {
    let option_weigh_current = document.getElementById('select-weight').value;
    console.log(option_weigh_current);
    if (option_weigh_current === 'gram') {
        container_price.textContent = `$ ${hits[0].price_gram}`;
    } else if (option_weigh_current === 'eighth ounce') {
        container_price.textContent = `$ ${hits[0].price_eighth_ounce}`;
    } else if (option_weigh_current === 'quarter ounce') {
        container_price.textContent = `$ ${hits[0].price_quarter_ounce}`;
    } else if (option_weigh_current === 'half ounce') {
        container_price.textContent = `$ ${hits[0].price_half_ounce}`;
    } else if (option_weigh_current === 'ounce') {
        container_price.textContent = `$ ${hits[0].price_ounce}`;
    } else if (option_weigh_current === "half gram") {
        container_price.textContent = `$ ${hits[0].price_half_gram}`;
    }
}

function selected_weight_change() {
    let option_select_quantity = document.getElementById('quantity');
    let current_option_weight = document.getElementById('select-weight').value;
    let h4_price_string = document.getElementById('text_price');
    let text_weight_format = document.getElementById('text_weights_format');
    if (current_option_weight === 'gram') {
        h4_price_string.textContent = `$ ${hits[0].price_gram}`;
        text_weight_format.textContent = '/1G';
        option_select_quantity.selectedIndex = 0;
    } else if (current_option_weight === 'eighth ounce') {
        h4_price_string.textContent = `$ ${hits[0].price_eighth_ounce}`;
        text_weight_format.textContent = '/3.5G';
        option_select_quantity.selectedIndex = 0;
    } else if (current_option_weight === 'quarter ounce') {
        h4_price_string.textContent = `$ ${hits[0].price_quarter_ounce}`;
        text_weight_format.textContent = '/7G';
        option_select_quantity.selectedIndex = 0;
    } else if (current_option_weight === 'half ounce') {
        h4_price_string.textContent = `$ ${hits[0].price_half_ounce}`;
        text_weight_format.textContent = '/14G';
        option_select_quantity.selectedIndex = 0;
    } else if (current_option_weight === 'half gram') {
        h4_price_string.textContent = `$ ${hits[0].price_half_gram}`;
        text_weight_format.textContent = '/0.5G';
        option_select_quantity.selectedIndex = 0;
    } else if (current_option_weight === 'ounce') {
        h4_price_string.textContent = `$ ${hits[0].price_ounce}`;
        text_weight_format.textContent = '/28G';
        option_select_quantity.selectedIndex = 0;
    }

}

function selected_quantity_change() {

    let selec_option_quantity = parseInt(document.getElementById('quantity').value);
    let select_option_weight = document.getElementById('select-weight').value;
    let h4_price_replace = document.getElementById('text_price');
    let price_each_int = parseFloat(hits[0].price_each);
    if (hits[0].available_weights.length === 0) {
        let price_each_string = (price_each_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_each_string}`;
    } else if (select_option_weight === 'gram') {
        let price_gram_int = parseFloat(hits[0].price_gram);
        let price_gram_string = (price_gram_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_gram_string}`;

    } else if (select_option_weight === 'eighth ounce') {
        let price_eighth_ounce_int = parseFloat(hits[0].price_eighth_ounce);
        let price_eighth_ounce_string = (price_eighth_ounce_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_eighth_ounce_string}`;

    } else if (select_option_weight === 'quarter ounce') {
        let price_quarter_ounce_int = parseFloat(hits[0].price_quarter_ounce);
        let price_quarter_ounce_string = (price_quarter_ounce_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_quarter_ounce_string}`;

    } else if (select_option_weight === 'half ounce') {
        let price_half_ounce_int = parseFloat(hits[0].price_half_ounce);
        let price_half_ounce_string = (price_half_ounce_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_half_ounce_string}`;

    } else if (select_option_weight === 'half gram') {
        let price_half_gram_int = parseFloat(hits[0].price_half_gram);
        let price_half_gram_string = (price_half_gram_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_half_gram_string}`;

    } else if (select_option_weight === 'ounce') {
        let price_ounce_int = parseFloat(hits[0].price_ounce);
        let price_ounce_string = (price_ounce_int * selec_option_quantity).toFixed(2);
        h4_price_replace.textContent = `$ ${price_ounce_string}`;

    }

}

$select_weight.addEventListener('change', selected_weight_change);
$select_quantity.addEventListener('change', selected_quantity_change);

 let btn_add_to_cart = document.getElementById('add-to-cart');

    let storage_local = window.localStorage;
    let count = 0;
    let cart = {};


    if (storage_local.getItem('count')) {
        count = parseInt(storage_local.getItem('count'));
    }


    if (storage_local.getItem('cart')){
        cart = JSON.parse(storage_local.getItem('cart'));
    }

    updateCart();

    btn_add_to_cart.addEventListener('click', btn_add_cart);

 function btn_add_cart () {
     const product_id = hits[0].product_id;

     let selected_option_quantity = parseInt(document.getElementById('quantity').value);
     let selected_option_weight = document.getElementById('select-weight').value;
     selected_option_weight = selected_option_weight.replace(/ /g, '_');

     console.log(`Informacion a enviar: -> ${product_id}, ${selected_option_quantity}, ${selected_option_weight} `);

     console.log('------- Funtion add to cart -------');

     if ((product_id === null || product_id === undefined) || (selected_option_quantity === 0 || selected_option_quantity === null || selected_option_quantity === undefined)) {
         console.log("los datos vienen vacios o null o undefined");
         console.log("El productId esta vacio y el count esta vacio");
         storage_local.clear();
     } else if (selected_option_weight === "" || selected_option_weight === null || selected_option_weight === undefined) {

        if (product_id in cart) {

            cart[product_id].count = selected_option_quantity;
            console.log(cart);

        }else {

            let data_product_1 = {
                productId: product_id,
                priceId: 'each',
                count: selected_option_quantity
            };
            console.log('DATA JSON TO SAVE --> ', data_product_1);
            cart[product_id] = data_product_1;
        }

        count++;

        console.log(cart);

        storage_local.setItem('cart', JSON.stringify(cart));

        console.log(`Se guardo en el local_storage key --> ${cart[product_id]}`);

        updateCart();

        swal('Success!', 'Product Save success.....', 'success');

     } else {

         if (product_id in cart) {
             cart[product_id].count = selected_option_quantity;
             console.log('el producto se modifico el quantity', cart);
         }else {
             let data_product_2 = {
                 productId: product_id,
                 priceId: selected_option_weight,
                 count: selected_option_quantity
             };
             console.log('DATA JSON TO SAVE --> ', data_product_2);
             cart[product_id] = data_product_2;
         }

         count++;

         console.log(cart);

         storage_local.setItem('cart', JSON.stringify(cart));

         console.log(`Se guardo en el local_storage key --> ${cart[product_id]}`);

         console.log(JSON.stringify(cart));

         updateCart();

         swal('Success!', 'Product Save success.....', 'success');

     }

 }

 function updateCart() {
        document.getElementById('count_quantity_cart').textContent = count;
        storage_local.setItem('count', count);
 }


const images = hits[0].image_urls;

let $container_img = document.querySelector('#imagen_carusel');
let miniatura_img = document.querySelector('#selector-imgs-products');

if (images.length === 0) {
    $container_img.src = '../assets/images/errors-images/image-not-found.jpeg';
} else {

      images.forEach( (miniatura,  index) => {
            console.log(miniatura);
            console.log(index)
            let img_miniatura = document.createElement('img');
            img_miniatura.id='images_miniaturas';
            img_miniatura.className='border p-1';
            if (index === 0) {
                img_miniatura.className='active_item';
                $container_img.src=`${miniatura}`;
            }
            img_miniatura.src=`${miniatura}`;
            miniatura_img.appendChild(img_miniatura);
            const img_mini_all = document.querySelectorAll('#images_miniaturas');
            img_mini_all.forEach(mini => {
                mini.addEventListener('click', function () {
                    const active_item = document.querySelector('.active_item');
                    active_item.classList.remove('active_item');
                    this.classList.add('active_item');
                    $container_img.src = this.src;
                });
            });
      });
}
});



