import {searchClient} from '../config/config.js';

let storage_local = window.localStorage;
let count = 0;
let cart = {};

if (storage_local.getItem('cart')) {
    cart = JSON.parse(storage_local.getItem('cart'));
}

if (storage_local.getItem('count')){
    count = parseInt( storage_local.getItem('count') );
}

const search = instantsearch({
    indexName: 'menu-products-production',
    searchClient,
});

//  widgets custom o personalizados

// widgets de hits o mostrar elementos en tarjetas
const HitsRender = (renderOptions, isFirstRender) => {
    const {hits, results, bindEvent, widgetParams} = renderOptions;

    console.log('aqui estan los objetos de el hits', hits);


    //${ item.image_urls.length > 0 ? item.image_urls[0] : '../assets/images/errors-images/image-not-found.jpeg'}
    // ${ item.image_urls.length > 0 ? intervalo = setInterval(() => { let container = document.getElementById('imagen-product'); if (posicionActual >= item.image_urls.length - 1) {posicionActual = 0;}else { posicionActual++;}  container.src = `${item.image_urls[posicionActual]}`; }, TIEMPO_INTERVALO_MILESIMAS_SEG) : '../assets/images/errors-images/image-not-found.jpeg'}
    let posicionActual = 0;

    widgetParams.container.innerHTML = `
            ${hits.map(item =>
        `
            <div class="col">
            <div class="card rounded-0 product-card">
                        <a href="/views/product-details.html?objectID=${item.objectID}" id="container_carrousel_imgs">
                            <img src="${item.image_urls.length > 0 ? item.image_urls[posicionActual] : '../assets/images/errors-images/image-not-found.jpeg'}" class="card-img-top" alt="${item.name}" id="imagen-product">
                        </a>
                    <div class="card-body">
                        <div class="product-info">
                            <a href="product-details.html?objectID=${item.objectID}">
                                <p class="product-catergory font-13 mb-1 itembrand">${item.brand}</p>
                                <p class="product-catergory font-13 mb-1 itemsubtype" id="itemsubtype">${(item.brand_subtype) === null || undefined ? '' :  item.brand_subtype }</p>
                            </a>
                            <a href="product-details.html?objectID=${item.objectID}">
                                <h6 class="product-name mb-2 itemname">${instantsearch.highlight({attribute: 'name', hit: item})}</h6>
                            </a>
                            <div class="d-flex align-items-center">
                                <div class="mb-1 product-price itemprice jcitemprice">
                                    <!--   <span class="fs-5 currencyformat jcpriceformat">CAD </span><span class="fs-5">\$${item.bucket_price}</span>-->
                                    <span class="fs-5 currencyformat jcpriceformat">CAD </span>
                                    <span class="fs-5 jcpricingnw">\$${(item.available_weights[0] === "each") ? item.price_each : (item.available_weights[0] === "gram") ? item.price_gram : (item.available_weights[0] === "eighth ounce") ? item.price_eighth_ounce : (item.available_weights[0] === "quarter ounce") ? item.price_quarter_ounce : (item.available_weights[0] === "half ounce") ? item.price_half_ounce : (item.available_weights[0] === "ounce") ? item.price_ounce : (item.available_weights[0] === "half gram") ? item.price_half_gram : '00.00'}</span>
                                    <span class="er-each jceachformat" style="align-items: flex-end;">${(item.available_weights[0] === "each") ? '/each' : (item.available_weights[0] === "gram") ? '/1G' : (item.available_weights[0] === "eighth ounce") ? '/3.5G' : (item.available_weights[0] === "quarter ounce") ? '/7G' : (item.available_weights[0] === "half ounce") ? '/14G' : (item.available_weights[0] === "ounce") ? '/28G' : (item.available_weights[0] === "half gram") ? '/0.5G' : '00.00'}</span>
                                </div>
                            </div>
                            <div class="product-action mt-2" id="content">
                               <div class="d-grid gap-2">
                                    <a class="btn btn-dark btn-ecomm" id="add_to_cart_btn" id_product="${item.objectID}"><i class="bx bxs-cart-add"></i>add to cart</a>
                                    <a href="/views/product-details.html?objectID=${item.objectID}" class="btn btn-light btn-ecomm">Product Details</a>
                               </div> 
                            </div> 
                        </div>
                    </div>
                </div>
        </div>
        `
    ).join('')}
    `;

    window.onload = function () {
        let bton = document.querySelectorAll('#add_to_cart_btn');

        bton.forEach( btn => {
            btn.addEventListener('click', function () {
                console.log("add to cart");
                let id = btn.getAttribute('id_product');
                let hit = hits.filter( hit => hit.objectID === id)[0];

                console.log('aqui el object id', id);
                console.log('aqui el hit',hit);
                if (id in cart) {
                    cart[hit.product_id].count = cart[hit.product_id].count + 1;
                }else {

                    if (hit.available_weights.length === 0 ){
                        let data_product_each = {
                            productId: hit.product_id,
                            priceId: 'each',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_each);

                        cart[hit.product_id] = data_product_each;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();



                    }else if (hit.available_weights[0] === 'gram'){
                        let data_product_gram = {
                            productId: hit.product_id,
                            priceId: 'gram',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_gram);

                        cart[hit.product_id] = data_product_gram;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();

                        swal('Success!', 'Product Save success.....', 'success');
                    }else if (hit.available_weights[0] === 'eighth ounce') {
                        let data_product_eighth_ounce = {
                            productId: hit.product_id,
                            priceId: 'eighth_ounce',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_eighth_ounce);

                        cart[hit.product_id] = data_product_eighth_ounce;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();

                        swal('Success!', 'Product Save success.....', 'success');
                    }else if (hit.available_weights[0] === 'quarter ounce') {
                        let data_product_quarter_ounce = {
                            productId: hit.product_id,
                            priceId: 'quarter_ounce',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_quarter_ounce);

                        cart[hit.product_id] = data_product_quarter_ounce;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();

                        swal('Success!', 'Product Save success.....', 'success');
                    }else if (hit.available_weights[0] === 'half ounce') {
                        let data_product_half_ounce = {
                            productId: hit.product_id,
                            priceId: 'half_ounce',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_half_ounce);

                        cart[hit.product_id] = data_product_half_ounce;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();

                    }else if (hit.available_weights[0] === 'ounce') {
                        let data_product_ounce = {
                            productId: hit.product_id,
                            priceId: 'ounce',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_ounce);

                        cart[hit.product_id] = data_product_ounce;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();

                        swal('Success!', 'Product Save success.....', 'success');
                    }else if (hit.available_weights[0] === 'half gram') {
                        let data_product_half_gram = {
                            productId: hit.product_id,
                            priceId: 'half_gram',
                            count: 1
                        };
                        console.log('DATA JSON TO SAVE --> ', data_product_half_gram);

                        cart[hit.product_id] = data_product_half_gram;

                        storage_local.setItem('cart', JSON.stringify(cart));

                        count++;

                        Swal.fire({
                            title: 'Added to cart!',
                            text: `${hit.name}`,
                            imageUrl: `${hit.image_urls[0]}`,
                            imageWidth: 200,
                            imageHeight: 200,
                        });

                        itemsViewCart();
                    }

                    itemsViewCart();

                }
            });
        });
    }

};
const CustomHits = instantsearch.connectors.connectHits(HitsRender);


//   fin de widgets custom o personalizados


search.addWidgets([

        instantsearch.widgets.configure({filters: 'kind:flower AND store_id:4434'}),

        instantsearch.widgets.searchBox({
            container: '#searchBox',
            placeholder: 'Search for Products',
            cssClasses: {
                input: 'form-control bg-transparent'
            }
        }),

    instantsearch.widgets.refinementList({
        container: '#container-menu',
        attribute: 'category',
        templates: {
            item: `
                      <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
                        <span>{{label}} ({{count}})</span>
                      </a>
                    `,
        },
    }),
    instantsearch.widgets.clearRefinements({
        container: '#clear-category',
        includedAttributes: ['category'],
        cssClasses: {
            root: 'clear-button-rootjc',
            button: [
                'clear-button-js',
                'clear-button-jc--subclass',
            ],
        },
        templates: {
            resetLabel: 'All Lineage',
        },
    }),
    instantsearch.widgets.refinementList({
        container: '#jcweight-list',
        attribute: 'available_weights',
        templates: {
            item(item) {
                const {url, label, count, isRefined} = item;

                return `
                <a href="${url}" style="${isRefined ? 'font-weight: bold' : ''}">
                    <span>${ (label === 'each') ? 'each' : (label === 'gram') ? '1G' : (label === 'eighth ounce') ? '3.5G' : (label === 'quarter ounce') ? '7G' : (label === 'half ounce') ? '14G' : (label === 'ounce')? '28G' : (label === 'half gram')? '0.5G': label } (${count})</span>
                </a>
                `;

            }
        },
    }),

    instantsearch.widgets.clearRefinements({
        container: '#clear-weight',
        includedAttributes: ['available_weights'],
        cssClasses: {
            root: 'clear-button-rootjc',
            button: [
                'clear-button-js',
                'clear-button-jc--subclass',
            ],
        },
        templates: {
            resetLabel: 'All Weights',
        },
    }),


        instantsearch.widgets.rangeSlider({
            container: '#container-price',
            attribute: 'bucket_price',
        }),

        instantsearch.widgets.rangeSlider({
            container: '#container-thc',
            attribute: 'percent_thc',
        }),
        instantsearch.widgets.rangeSlider({
            container: '#container-cbd',
            attribute: 'percent_cbd',
        }),


    CustomHits({container: document.querySelector('#container-hits')}),

    instantsearch.widgets.pagination({
        container: '#pagination-container',
    }),
]);

search.start();

let frame = document.getElementById('jane-menu');
frame.style = 'display: none;';

itemsViewCart();


function itemsViewCart() {
    document.getElementById('count_quantity_cart').textContent = count;
    storage_local.setItem('count', count);
}


function searchProduct(product_id, store_id) {
    const indexName = 'menu-products-production';
    const index = searchClient.initIndex(indexName);

    index.search( '', {
        filters: `product_id:${product_id} AND store_id:${store_id}`
    }).then( ({hits}) => {
        list_items_mini_cart.innerHTML=`
        <div className="dropdown-item">
            <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                    <h6 className="cart-product-title">Men White T-Shirt</h6>
                    <p className="cart-product-price">1 X $29.00</p>
                </div>
                <div className="position-relative">
                    <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i></div>
                    <div className="cart-product">
                        <img src="${hits[0].images_url[0]}" className="" alt="product image">
                    </div>
                </div>
            </div>
        </div>
        `
    }).catch( (error) => {
        console.log('hay un error en la busqueda', error);
    });
}

// `
//                       <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
//                         <span>{{label}} ({{count}})</span>
//                         <span>${}</span>
//                       </a>
//                     `

// window.onload = function () {
//     let bton = document.querySelectorAll('#add_to_cart_btn');
//
//     bton.forEach( btn => {
//          btn.addEventListener('click', function (){
//             console.log('se clickeo el btn add to cart');
//          });
//     })
// };


// <div className="dropdown-item">
//     <div className="d-flex align-items-center">
//         <div className="flex-grow-1">
//             <h6 className="cart-product-title">Men White T-Shirt</h6>
//             <p className="cart-product-price">1 X $29.00</p>
//         </div>
//         <div className="position-relative">
//             <div className="cart-product-cancel position-absolute"><i className='bx bx-x'></i>
//             </div>
//             <div className="cart-product">
//                 <img src="assets/images/products/01.png" className="" alt="product image">
//             </div>
//         </div>
//     </div>
// </div>











