const BRAND_NAME = "TRENDii";
const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
feedSuccess(window.FEED_PRODUCTS);
function feedSuccess(feedResponse) {
    // if feed does not deliver an empty response
    if (feedResponse !== "") {
        if (feedResponse?.success === true) {
            const feedProducts = feedResponse.payload;
            const productsContainer = document.getElementById(AD_PRODUCTS_CONTAINER);
            initializeRenderingAdProductsSlider(feedProducts, productsContainer);
        } else {
            console.log("error returned");
        }
    } else {
        // empty response from feed
        console.log("empty feed response");
    }
}

function initializeRenderingAdProductsSlider(feedProducts, productsContainer) {
    feedProducts.forEach((product) => {
        createSliderItemProduct(product, productsContainer);
    });

    new Splide('.splide', {
        type: 'loop',
        // perPage: 6,
        pagination: false,
        gap: 10,
        autoWidth: true,
        width: 400,
        // fixedWidth: 200,
    }).mount();
}

function createSliderItemProduct(product, productsContainer) {
    // <li class="splide__slide">
    //     <div class="product-item-container">
    //         <div class="product-item"
    //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
    //             <span class="onsale">ON SALE</span>
    //             <div class="product-details-wrapper">
    //                 <b class="brand-name">TRENDii</b>
    //                 <p class="product-name">M2K tekno sneakers</p>
    //                 <span class="product-cashback-chip">2% Cashback</span>
    //                 <em class="product-price">$260</em>
    //             </div>
    //         </div>
    //     </div>
    // </li>
    const sliderItem = document.createElement("LI");
    sliderItem.classList.add("splide__slide");
    productsContainer.appendChild(sliderItem);

    const productItemContainer = document.createElement("DIV");
    productItemContainer.classList.add("product-item-container");
    productItemContainer.addEventListener("click", function () {
        window.open(product.url, "_blank");
    });
    sliderItem.appendChild(productItemContainer);

    const productItem = document.createElement("DIV");
    productItem.classList.add("product-item");
    productItem.style.backgroundImage = `url(${product.image})`;
    productItemContainer.appendChild(productItem);

    if (product.sale) {
        const onSaleTag = document.createElement("SPAN");
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
    }

    const productDetailsWrapper = document.createElement("DIV");
    productDetailsWrapper.classList.add("product-details-wrapper");

    const productName = document.createElement("B");
    productName.classList.add("brand-name");
    productName.innerHTML = BRAND_NAME;
    productDetailsWrapper.appendChild(productName);

    const productNameP = document.createElement("P");
    productNameP.classList.add("product-name");
    productNameP.innerHTML = product.name;
    productDetailsWrapper.appendChild(productNameP);

    const productCashbackPercentage = document.createElement("SPAN");
    productCashbackPercentage.classList.add("product-cashback-chip");
    productCashbackPercentage.innerHTML = "4%" + " Cashback";
    productDetailsWrapper.appendChild(productCashbackPercentage);

    const productPrice = document.createElement("EM");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = product.currency + product.price;
    productDetailsWrapper.appendChild(productPrice);

    productItem.appendChild(productDetailsWrapper);
    return productItem;
}
