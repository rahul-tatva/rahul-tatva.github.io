feedSuccess(window.FEED_PRODUCTS);
function feedSuccess(feedResponse) {
    let sliderItem;
    // if feed does not deliver an empty response
    if (feedResponse !== "") {
        if (feedResponse.success && feedResponse.success === true) {
            const feedProducts = feedResponse.result;
            const productsContainer = document.getElementById("trendii-products-container-300X600");
            for (let index = 0; index < feedProducts.length; index++) {
                const product = feedProducts[index];
                if (index % 3 === 0) {
                    sliderItem = document.createElement("LI");
                    sliderItem.classList.add("splide__slide");
                }
                const productItemEl = createProductSlideItem(product);
                sliderItem.appendChild(productItemEl);
                productsContainer.appendChild(sliderItem);
            }
            new Splide('.splide', {
                type: 'loop',
                height: 507,
                pagination: false,
                autoHeight: true,
                fixedWidth: 139,
                autoplay: true,
                pauseOnHover: false,
                interval: 3000,
                perMove: 2,
            }).mount();
        } else {
            console.log("error returned");
        }
    } else {
        // empty response from feed
        console.log("empty feed response");
    }
}

function createProductSlideItem(product) {
    const productItem = document.createElement("DIV");
    productItem.classList.add("product-item");
    productItem.style.backgroundImage = `url(${product.localimage})`;
    if (product.sale) {
        const onSaleTag = document.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
    }
    const productItemCardBody = document.createElement("DIV");
    productItemCardBody.classList.add("card-body");

    const productName = document.createElement("B");
    const productNameText = document.createTextNode(product.name);
    productName.appendChild(productNameText);
    productItemCardBody.appendChild(productName);

    const productCashback = document.createElement("P");
    productCashback.innerHTML = product.name;
    productItemCardBody.appendChild(productCashback);

    const productPriceLink = document.createElement("EM");
    productPriceLink.innerHTML = product.currency + product.price;
    productItemCardBody.appendChild(productPriceLink);

    productItem.appendChild(productItemCardBody);

    const cashbackLabel = document.createElement("I");
    cashbackLabel.classList.add("cashback-chip");
    cashbackLabel.innerHTML = product.cashback + " cashback";
    productItem.appendChild(cashbackLabel);
    return productItem;
}