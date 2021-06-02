const BRAND_NAME = "TRENDii";
feedSuccess(window.FEED_PRODUCTS);
function feedSuccess(feedResponse) {
    // if feed does not deliver an empty response
    if (feedResponse !== "") {
        if (feedResponse.success && feedResponse.success === true) {
            const feedProducts = feedResponse.result.slice(0, 1);
            const productsContainer = document.getElementById(
                "trendii-products-container-300X600"
            );
            const logo = document.getElementById("logo");
            logo.addEventListener("click", function () {
                window.open(feedProducts[0].url, "_blank");
            });
            initializeRenderingProductsBasedOnCount(feedProducts, productsContainer);
        } else {
            console.log("error returned");
        }
    } else {
        // empty response from feed
        console.log("empty feed response");
    }
}

function initializeRenderingProductsBasedOnCount(feedProducts, productsContainer) {
    switch (feedProducts.length) {
        case 1: {
            // <div class="one-product-wrapper">
            //     <div class="product-item-container">
            //         <div class="product-item main-item"
            //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //         </div>
            //         <div class="product-details-wrapper">
            //             <b class="brand-name">MARCO POLO</b>
            //             <p class="product-name">M2K tekno sneakers sneakers sn eakers sneake rssneakerstekno tekno
            //                     tekno</p>
            //             <em class="product-price">$260</em>
            //         </div>
            //     </div>
            // </div>
            const product = feedProducts[0];

            const oneProductWrapper = document.createElement("DIV");
            oneProductWrapper.classList.add("one-product-wrapper");
            productsContainer.appendChild(oneProductWrapper);

            const productItemContainer = document.createElement("DIV");
            productItemContainer.classList.add("product-item-container");
            productItemContainer.addEventListener("click", function () {
                window.open(product.url, "_blank");
            });
            oneProductWrapper.appendChild(productItemContainer);

            const productItem = document.createElement("DIV");
            productItem.classList.add("product-item");
            productItem.classList.add("main-item");
            productItem.style.backgroundImage = `url(${product.image})`;
            productItemContainer.appendChild(productItem);

            if (product.sale) {
                const onSaleTag = document.createElement('SPAN');
                onSaleTag.classList.add("onsale");
                onSaleTag.innerHTML = "ON SALE";
                productItem.appendChild(onSaleTag);
            }

            const productDetailsWrapper = document.createElement("DIV");
            productDetailsWrapper.classList.add("product-details-wrapper");
            productItemContainer.appendChild(productDetailsWrapper);

            const brandName = document.createElement("B");
            brandName.classList.add("brand-name");
            brandName.innerHTML = BRAND_NAME;
            productDetailsWrapper.appendChild(brandName);

            const productName = document.createElement("P");
            productName.classList.add("product-name");
            productName.innerHTML = product.name;
            productDetailsWrapper.appendChild(productName);

            const productPrice = document.createElement("EM");
            productPrice.classList.add("product-price");
            productPrice.innerHTML = product.currency + product.price;
            productDetailsWrapper.appendChild(productPrice);
            break;
        }
        case 2: {
            // <div class="two-product-wrapper">
            //     <div class="row secondary-product-row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno te kn ekno ekno ekno v ekno ot ekno
            //                             v</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno tekno v tekno tekno tekno</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            const twoProductWrapper = document.createElement("DIV");
            twoProductWrapper.classList.add("two-product-wrapper");
            productsContainer.appendChild(twoProductWrapper);

            for (let i = 0; i <= 1; i++) {
                const product = feedProducts[i];

                const row = document.createElement("DIV");
                row.classList.add("row");
                row.classList.add("secondary-product-row");
                twoProductWrapper.appendChild(row);

                const col = document.createElement("DIV");
                col.classList.add("col");
                row.appendChild(col);

                const productItemContainer = document.createElement("DIV");
                productItemContainer.classList.add("product-item-container");
                productItemContainer.addEventListener("click", function () {
                    window.open(product.url, "_blank");
                });
                col.appendChild(productItemContainer);

                const productItem = document.createElement("DIV");
                productItem.classList.add("product-item");
                productItem.style.backgroundImage = `url(${product.image})`;
                productItemContainer.appendChild(productItem);

                if (product.sale) {
                    const onSaleTag = document.createElement('SPAN');
                    onSaleTag.classList.add("onsale");
                    onSaleTag.innerHTML = "ON SALE";
                    productItem.appendChild(onSaleTag);
                }

                const productDetailsWrapper = document.createElement("DIV");
                productDetailsWrapper.classList.add("product-details-wrapper");
                productItemContainer.appendChild(productDetailsWrapper);

                const brandName = document.createElement("B");
                brandName.classList.add("brand-name");
                brandName.innerHTML = BRAND_NAME;
                productDetailsWrapper.appendChild(brandName);

                const productName = document.createElement("P");
                productName.classList.add("product-name");
                productName.innerHTML = product.name;
                productDetailsWrapper.appendChild(productName);

                const productPrice = document.createElement("EM");
                productPrice.classList.add("product-price");
                productPrice.innerHTML = product.currency + product.price;
                productDetailsWrapper.appendChild(productPrice);
            }
            break;
        }
        case 3: {
            // <div class="three-product-wrapper">
            //     <div class="row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="large-item-container">
            //                     <div class="product-item"
            //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                         <span class="onsale">ON SALE</span>
            //                     </div>
            //                     <div class="product-details-wrapper">
            //                         <b class="brand-name">MARCO POLO</b>
            //                         <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
            //                         <em class="product-price">$260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="large-item-container">
            //                     <div class="product-item"
            //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                         <span class="onsale">ON SALE</span>
            //                     </div>
            //                     <div class="product-details-wrapper">
            //                         <b class="brand-name">MARCO POLO</b>
            //                         <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
            //                         <em class="product-price">$260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="large-item-container">
            //                     <div class="product-item"
            //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                         <span class="onsale">ON SALE</span>
            //                     </div>
            //                     <div class="product-details-wrapper">
            //                         <b class="brand-name">MARCO POLO</b>
            //                         <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
            //                         <em class="product-price">$260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            const threeProductWrapper = document.createElement("DIV");
            threeProductWrapper.classList.add("three-product-wrapper");
            productsContainer.appendChild(threeProductWrapper);

            for (let i = 0; i <= 2; i++) {
                const product = feedProducts[i];

                const row = document.createElement("DIV");
                row.classList.add("row");
                threeProductWrapper.appendChild(row);

                const col = document.createElement("DIV");
                col.classList.add("col");
                row.appendChild(col);

                const productItemContainer = document.createElement("DIV");
                productItemContainer.classList.add("product-item-container");
                col.appendChild(productItemContainer);

                const largeItemContainer = document.createElement("DIV");
                largeItemContainer.classList.add("large-item-container");
                largeItemContainer.addEventListener("click", function () {
                    window.open(product.url, "_blank");
                });
                productItemContainer.appendChild(largeItemContainer);

                const productItem = document.createElement("DIV");
                productItem.classList.add("product-item");
                productItem.style.backgroundImage = `url(${product.image})`;
                largeItemContainer.appendChild(productItem);

                if (product.sale) {
                    const onSaleTag = document.createElement('SPAN');
                    onSaleTag.classList.add("onsale");
                    onSaleTag.innerHTML = "ON SALE";
                    productItem.appendChild(onSaleTag);
                }

                const productDetailsWrapper = document.createElement("DIV");
                productDetailsWrapper.classList.add("product-details-wrapper");
                largeItemContainer.appendChild(productDetailsWrapper);

                const brandName = document.createElement("B");
                brandName.classList.add("brand-name");
                brandName.innerHTML = BRAND_NAME;
                productDetailsWrapper.appendChild(brandName);

                const productName = document.createElement("P");
                productName.classList.add("product-name");
                productName.innerHTML = product.name;
                productDetailsWrapper.appendChild(productName);

                const productPrice = document.createElement("EM");
                productPrice.classList.add("product-price");
                productPrice.innerHTML = product.currency + product.price;
                productDetailsWrapper.appendChild(productPrice);
            }
            break;
        }
        case 4: {
            // <div class="four-product-wrapper">
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno te kn otekno v</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno teknotekno v</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                 </div>
            //                 <div class="product-details-wrapper">
            //                     <b class="brand-name">MARCO POLO</b>
            //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno</p>
            //                     <em class="product-price">$260</em>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            const fourProductWrapper = document.createElement("DIV");
            fourProductWrapper.classList.add("four-product-wrapper");
            productsContainer.appendChild(fourProductWrapper);

            let countIndex = 0;
            for (let i = 1; i <= 2; i++) {
                const row = document.createElement("DIV");
                row.classList.add("row");
                row.classList.add("secondary-product-row");
                fourProductWrapper.appendChild(row);

                for (let i = 1; i <= 2; i++) {
                    const product = feedProducts[countIndex];

                    const col = document.createElement("DIV");
                    col.classList.add("col-6");
                    row.appendChild(col);

                    const productItemContainer = document.createElement("DIV");
                    productItemContainer.classList.add("product-item-container");
                    productItemContainer.addEventListener("click", function () {
                        window.open(product.url, "_blank");
                    });
                    col.appendChild(productItemContainer);

                    const productItem = document.createElement("DIV");
                    productItem.classList.add("product-item");
                    productItem.style.backgroundImage = `url(${product.image})`;
                    productItemContainer.appendChild(productItem);

                    // sale lable
                    if (product.sale) {
                        const onSaleTag = document.createElement('SPAN');
                        onSaleTag.classList.add("onsale");
                        onSaleTag.innerHTML = "ON SALE";
                        productItem.appendChild(onSaleTag);
                    }

                    const productDetailsWrapper = document.createElement("DIV");
                    productDetailsWrapper.classList.add("product-details-wrapper");
                    productItemContainer.appendChild(productDetailsWrapper);

                    const brandName = document.createElement("B");
                    brandName.classList.add("brand-name");
                    brandName.innerHTML = BRAND_NAME;
                    productDetailsWrapper.appendChild(brandName);

                    const productName = document.createElement("P");
                    productName.classList.add("product-name");
                    productName.innerHTML = product.name;
                    productDetailsWrapper.appendChild(productName);

                    const productPrice = document.createElement("EM");
                    productPrice.classList.add("product-price");
                    productPrice.innerHTML = product.currency + product.price;
                    productDetailsWrapper.appendChild(productPrice);

                    countIndex++;
                }
            }
            break;
        }
        case 5: {
            // <div class="five-product-wrapper">
            //     <div class="row">
            //         <div class="col">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            const fiveProductWrapper = document.createElement("DIV");
            fiveProductWrapper.classList.add("five-product-wrapper");
            productsContainer.appendChild(fiveProductWrapper);

            const product = feedProducts[0];

            const row = document.createElement("DIV");
            row.classList.add("row");
            fiveProductWrapper.appendChild(row);

            const col = document.createElement("DIV");
            col.classList.add("col");
            row.appendChild(col);

            const productItemContainer = document.createElement("DIV");
            productItemContainer.classList.add("product-item-container");
            productItemContainer.addEventListener("click", function () {
                window.open(product.url, "_blank");
            });
            col.appendChild(productItemContainer);

            const productItem = document.createElement("DIV");
            productItem.classList.add("product-item");
            productItem.style.backgroundImage = `url(${product.image})`;
            productItemContainer.appendChild(productItem);

            if (product.sale) {
                const onSaleTag = document.createElement('SPAN');
                onSaleTag.classList.add("onsale");
                onSaleTag.innerHTML = "ON SALE";
                productItem.appendChild(onSaleTag);
            }

            const productDetailsWrapper = document.createElement("DIV");
            productDetailsWrapper.classList.add("product-details-wrapper");
            productItem.appendChild(productDetailsWrapper);

            const brandName = document.createElement("B");
            brandName.classList.add("brand-name");
            brandName.innerHTML = BRAND_NAME;
            productDetailsWrapper.appendChild(brandName);

            const productName = document.createElement("P");
            productName.classList.add("product-name");
            productName.innerHTML = product.name;
            productDetailsWrapper.appendChild(productName);

            const productPrice = document.createElement("EM");
            productPrice.classList.add("product-price");
            productPrice.innerHTML = product.currency + product.price;
            productDetailsWrapper.appendChild(productPrice);

            let countIndex = 1;
            for (let i = 1; i <= 2; i++) {
                const row = document.createElement("DIV");
                row.classList.add("row");
                row.classList.add("secondary-product-row");
                fiveProductWrapper.appendChild(row);

                for (let i = 1; i <= 2; i++) {
                    const product = feedProducts[countIndex];

                    const col = document.createElement("DIV");
                    col.classList.add("col-6");
                    row.appendChild(col);

                    const productItemContainer = document.createElement("DIV");
                    productItemContainer.classList.add("product-item-container");
                    productItemContainer.addEventListener("click", function () {
                        window.open(product.url, "_blank");
                    });
                    col.appendChild(productItemContainer);

                    const productItem = document.createElement("DIV");
                    productItem.classList.add("product-item");
                    productItem.style.backgroundImage = `url(${product.image})`;
                    productItemContainer.appendChild(productItem);

                    if (product.sale) {
                        const onSaleTag = document.createElement('SPAN');
                        onSaleTag.classList.add("onsale");
                        onSaleTag.innerHTML = "ON SALE";
                        productItem.appendChild(onSaleTag);
                    }

                    const productDetailsWrapper = document.createElement("DIV");
                    productDetailsWrapper.classList.add("product-details-wrapper");
                    productItem.appendChild(productDetailsWrapper);

                    const brandName = document.createElement("B");
                    brandName.classList.add("brand-name");
                    brandName.innerHTML = BRAND_NAME;
                    productDetailsWrapper.appendChild(brandName);

                    const productName = document.createElement("P");
                    productName.classList.add("product-name");
                    productName.innerHTML = product.name;
                    productDetailsWrapper.appendChild(productName);

                    const productPrice = document.createElement("EM");
                    productPrice.classList.add("product-price");
                    productPrice.innerHTML = product.currency + product.price;
                    productDetailsWrapper.appendChild(productPrice);

                    countIndex++;
                }
            }

            break;
        }
        case 6: {
            // <div class="six-product-wrapper">
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            //     <div class="row secondary-product-row">
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="col-6">
            //             <div class="product-item-container">
            //                 <div class="product-item"
            //                     style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
            //                     <span class="onsale">ON SALE</span>
            //                     <div class="product-details-wrapper">
            //                         <b>Nike</b>
            //                         <p>M2K tekno sneakers</p>
            //                         <em>$ 260</em>
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>

            const sixProductWrapper = document.createElement("DIV");
            sixProductWrapper.classList.add("six-product-wrapper");
            productsContainer.appendChild(sixProductWrapper);

            let countIndex = 0;
            for (let index = 1; index <= 3; index++) {

                const row = document.createElement("DIV");
                row.classList.add("row");
                row.classList.add("secondary-product-row");
                sixProductWrapper.appendChild(row);

                for (let i = 1; i <= 2; i++) {
                    const product = feedProducts[countIndex];

                    const col = document.createElement("DIV");
                    col.classList.add("col-6");
                    row.appendChild(col);

                    const productItemContainer = document.createElement("DIV");
                    productItemContainer.classList.add("product-item-container");
                    productItemContainer.addEventListener("click", function () {
                        window.open(product.url, "_blank");
                    });
                    col.appendChild(productItemContainer);

                    const productItem = document.createElement("DIV");
                    productItem.classList.add("product-item");
                    productItem.style.backgroundImage = `url(${product.image})`;
                    productItemContainer.appendChild(productItem);

                    if (product.sale) {
                        const onSaleTag = document.createElement('SPAN');
                        onSaleTag.classList.add("onsale");
                        onSaleTag.innerHTML = "ON SALE";
                        productItem.appendChild(onSaleTag);
                    }

                    const productDetailsWrapper = document.createElement("DIV");
                    productDetailsWrapper.classList.add("product-details-wrapper");
                    productItem.appendChild(productDetailsWrapper);

                    const brandName = document.createElement("B");
                    brandName.classList.add("brand-name");
                    brandName.innerHTML = BRAND_NAME;
                    productDetailsWrapper.appendChild(brandName);

                    const productName = document.createElement("P");
                    productName.classList.add("product-name");
                    productName.innerHTML = product.name;
                    productDetailsWrapper.appendChild(productName);

                    const productPrice = document.createElement("EM");
                    productPrice.classList.add("product-price");
                    productPrice.innerHTML = product.currency + product.price;
                    productDetailsWrapper.appendChild(productPrice);

                    countIndex++;
                }
            }
            break;
        }
        default: {
            break;
        }
    }
}