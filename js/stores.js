import {searchClient} from '../config/config.js';

let storage_local = window.localStorage;
let count = 0;

if (storage_local.getItem('count')){
    count = parseInt( storage_local.getItem('count') );
}

itemsViewCart()

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
                                <p class="product-catergory font-13 mb-1 itemsubtype">${item.brand_subtype}</p>
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
                                    <button class="btn btn-dark btn-ecomm" id="add_to_cart_btn"><i class="bx bxs-cart-add"></i>add to cart</button>
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
            item: `
                      <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
                        <span>{{label}} ({{count}})</span>
                      </a>
                    `,
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


//        instantsearch.widgets.numericMenu({
//            container: '#container-price',
    //           attribute: 'bucket_price',
    //           items: [
    //              {
    //                   label: 'All'
    //               },
    //               {
    //                   label: 'Under $20', end: 20
    //               },
    //               {
    //                   label: '$20 - $40', start: 20, end: 40
    //               },
    //               {
    //                   label: '$40 - $60', start: 40, end: 60
    //              },
    //               {
    //                   label: '$60 - $80', start: 60, end: 80
    //               },
    //               {
    //                   label: '$80 & above', start: 80
    //               }
    //           ]
    //       }),

    CustomHits({container: document.querySelector('#container-hits')}),

    instantsearch.widgets.pagination({
        container: '#pagination-container',
    }),
]);

search.start();

let frame = document.getElementById('jane-menu');
frame.style = 'display: none;';

function itemsViewCart() {
    let view_items_count = document.getElementById('quantity_items');
    view_items_count.textContent = `${count} ITEMS`;
    storage_local.setItem('count', count);
}



window.onload = function () {
    let bton = document.querySelectorAll('#add_to_cart_btn');

    bton.forEach( btn => {
         btn.addEventListener('click', function (){
            console.log('se clickeo el btn add to cart');
         });
    })
}











