var trendii = {};

trendii.DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS = ".mol-img-group";

trendii.MOBILE_IMAGE_GROUP_PARENT_TAG = "figure";

trendii.DESKTOP_IMAGE_CAPTION_CLASS = "imageCaption";

trendii.MOBILE_IMAGE_CAPTION_TAG = "figcaption";

trendii.SLIDER_CLASS_TO_REPLACE_WITH = "trendiiSliderUniqueString";

trendii.adsWindow = window.top;

trendii.adsDOM = trendii.adsWindow.document;

trendii.feedProducts = [];

trendii.intersectionObserver;

trendii.slidersAppendedArray = [];

trendii.sliderCount = 0;

trendii.nativeAdSimpleTemplateHTMLString = null;

trendii.nativeAdSliderTemplateHTMLString = null;

trendii.init = function () {
    trendii.log("SDK init method called");
    trendii.globals.PUBLISHER_ID = 2;
    trendii.loadScriptAndCssToHead();
    trendii.loadStyleSheetIntoHead(`${trendii.globals.CDN}/styles/daily-mail/trendii-sdk-daily-mail-slider.css`);
    trendii.loadStyleSheetIntoHead(`${trendii.globals.CDN}/styles/daily-mail/trendii-sdk-daily-mail-all-product.css`);
    if (trendii.adsDOM.readyState === "complete" || trendii.adsDOM.readyState === "interactive") {
        trendii.log(trendii.adsDOM.readyState);
        trendii.startAdGenerationProcess();
    } else {
        trendii.log("DOM in progress");
        trendii.adsDOM.addEventListener("DOMContentLoaded", () => {
            trendii.log(trendii.adsDOM.readyState);
            trendii.startAdGenerationProcess();
        });
    }
};

trendii.env = "test";

trendii.globals = {
    PUBLISHER_NAME: "",
    PUBLISHER_ID: 0,
    MOBILE_WIDTH: 480,
    CDN: "https://cdn.trendii.com/native-ads-sdk/test",
    API_GET_NATIVE_AD_PRODUCT: `https://beeswaxcreatives.trendii.com/img-creatives`,
    AD_PRODUCTS_CONTAINER: "trendii-sdk-ad-products-container",
    RETAILER_LOGO_ID: "retailer-logo",
    HTML_TEMPLATE_AD_WRAPPER_ID: "trendii-native-ad-wrapper",
    HTML_TEMPLATE_SLIDER_CONTAINER_ID: "trendii-sdk-ad-products-container",
    HTML_TEMPLATE_SIMPLE_CONTAINER_ID: "trendii-products-container-728X90"
};

trendii.globals.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `${trendii.globals.CDN}/templates/products-slider-dynamic.html`;

trendii.globals.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `${trendii.globals.CDN}/templates/products-728X90-all-product-dynamic.html`;

trendii.log = function (message) {
    if (trendii.env === "test") {
        console.log("[Trendii.SDK]", message);
    }
};

trendii.logError = function (err) {
    console.error("[Trendii.SDK]", err.stack ? err.stack : err.toString());
};

trendii.getRetailerLogoPath = function (fileName) {
    return `${trendii.globals.CDN}/iamges/retailers-logo/${fileName}`;
};

trendii.createHtmlElement = function (element, classes, innerHTML, style, href, target) {
    const htmlElement = trendii.adsDOM.createElement(element);
    htmlElement.classList.add(classes);
    if (innerHTML) {
        htmlElement.innerHTML = innerHTML;
    }
    if (style) {
        htmlElement.style = style;
    }
    if (href) {
        htmlElement.href = href;
    }
    if (target) {
        htmlElement.target = target;
    }
    return htmlElement;
};

trendii.setPublisherName = function (name) {
    trendii.globals.PUBLISHER_NAME = name;
};

trendii.loadScriptIntoHead = function (url) {
    trendii.adsDOM.head.appendChild(trendii.adsDOM.createElement("script")).src = url;
};

trendii.loadStyleSheetIntoHead = function (url) {
    let styles = trendii.adsDOM.createElement("link");
    styles.type = "text/css";
    styles.rel = "stylesheet";
    styles.href = url;
    trendii.adsDOM.head.appendChild(styles);
};

trendii.loadScriptAndCssToHead = function () {
    if (trendii.env === "test") {
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/intersection-observer.js`);
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/splide.js`);
    } else {
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/intersection-observer.min.js`);
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/splide.min.js`);
    }
    trendii.loadStyleSheetIntoHead(`${trendii.globals.CDN}/styles/common/splide-core.min.css`);
};

trendii.startAdGenerationProcess = function () {
    try {
        Promise.all([fetch(trendii.globals.API_GET_NATIVE_AD_SLIDER_TEMPLATE).then(response => response.text()), fetch(trendii.globals.API_GET_NATIVE_AD_SIMPLE_TEMPLATE).then(response => response.text())]).then(allResponses => {
            trendii.nativeAdSliderTemplateHTMLString = allResponses[0];
            trendii.nativeAdSimpleTemplateHTMLString = allResponses[1];
            const options = {
                rootMargin: "0px",
                threshold: .1
            };
            if (trendii.adsWindow.TrendiiIntersectionObserver) {
                trendii.intersectionObserver = new trendii.adsWindow.TrendiiIntersectionObserver(trendii.handleIntersectionEntries, options);
            } else {
                trendii.intersectionObserver = new IntersectionObserver(trendii.handleIntersectionEntries, options);
            }
            let allParentEls;
            if (trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH) {
                allParentEls = Array.from(trendii.adsDOM.querySelectorAll(trendii.MOBILE_IMAGE_GROUP_PARENT_TAG));
            } else {
                allParentEls = Array.from(trendii.adsDOM.querySelectorAll(trendii.DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
            }
            allParentEls.forEach(parentEl => {
                trendii.intersectionObserver.observe(parentEl);
            });
        });
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.handleIntersectionEntries = function (entries, observer) {
    try {
        entries.forEach(entry => {
            trendii.handleIntersectionEntry(entry, observer);
        });
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.handleIntersectionEntry = function (entry, observer) {
    try {
        if (entry.isIntersecting) {
            const visibleParentEl = entry.target;
            observer.unobserve(entry.target);
            trendii.log("observer unregistered for ", visibleParentEl);
            const imageElsInsideSameParent = Array.from(visibleParentEl.getElementsByTagName("img"));
            const imagesPresentInSameParent = imageElsInsideSameParent.map(img => {
                if (img.getAttribute("data-src")) return img.getAttribute("data-src");
                return img.getAttribute("src");
            }).filter(x => x);
            const requestBody = {
                webpageUrl: trendii.adsWindow.location.href,
                imageUrls: imagesPresentInSameParent,
                publisherId: trendii.globals.PUBLISHER_ID
            };
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            const raw = JSON.stringify(requestBody);
            const requestOptions = {
                method: "POST",
                headers: headers,
                body: raw
            };
            fetch(trendii.globals.API_GET_NATIVE_AD_PRODUCT, requestOptions).then(response => response.json()).then(response => {
                if (response !== "") {
                    if (response.success && response.success === true) {
                        const adProductsData = response;
                        let foundImageData = null, foundImageElement = null, foundIndex = null, currentImageEle, imageSrcToShowAd, imageDataSrcToShowAd;
                        const imageElsInsideSameParentLength = imageElsInsideSameParent.length;
                        for (let i = 0; i < imageElsInsideSameParentLength; i++) {
                            currentImageEle = imageElsInsideSameParent[i];
                            imageSrcToShowAd = currentImageEle.src;
                            imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
                            foundIndex = adProductsData.payload.findIndex(imageData => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
                            foundImageData = adProductsData.payload[foundIndex];
                            if (foundImageData.products && foundImageData.products.length > 0) {
                                foundImageElement = currentImageEle;
                                break;
                            }
                        }
                        if (foundImageData.products && foundImageData.products.length > 0) {
                            trendii.generatedAdForSingleImage(foundImageData, trendii.sliderCount);
                            trendii.sliderCount++;
                            if (foundImageData.generatedAdHTML) {
                                if (trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH) {
                                    const titleOfImageGroup = visibleParentEl.getElementsByTagName(trendii.MOBILE_IMAGE_CAPTION_TAG)[0];
                                    if (titleOfImageGroup) {
                                        titleOfImageGroup.after(foundImageData.generatedAdHTML);
                                    } else {
                                        visibleParentEl.appendChild(foundImageData.generatedAdHTML);
                                    }
                                } else {
                                    visibleParentEl.getElementsByClassName(trendii.DESKTOP_IMAGE_CAPTION_CLASS)[0].after(foundImageData.generatedAdHTML);
                                    foundImageData.isAdGenerated = true;
                                    trendii.log("ad rendered for ", visibleParentEl);
                                }
                                const identifier = foundImageData.sliderId;
                                const sliderIdSelector = `#${identifier}`;
                                if (foundImageData.isSliderTemplate) {
                                    trendii.slidersAppendedArray.push(foundImageData.sliderId);
                                    trendii.log(adsWindow.Splide);
                                    if (trendii.adsWindow.Splide) {
                                        const testSlider = new trendii.adsWindow.Splide(sliderIdSelector, {
                                            type: "loop",
                                            pagination: false,
                                            gap: 10,
                                            autoWidth: true,
                                            autoHeight: true
                                        }).mount();
                                        const adProductsSliderContainer = trendii.adsDOM.getElementById(identifier);
                                        adProductsSliderContainer.style.display = "block";
                                        const adWrapper = foundImageData.generatedAdHTML;
                                        adWrapper.setAttribute("data-slider-appended", "true");
                                        adWrapper.style.display = "block";
                                        trendii.log("slider appended");
                                        testSlider.on("mounted", function () {
                                            console.log("mounted");
                                        });
                                    }
                                }
                            }
                        }
                    }
                } else {
                    this.log("empty feed response");
                }
            }).catch(err => {
                trendii.logError(err);
                typeof onErrorCallback === "function" && onErrorCallback(error);
            });
        }
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.generatedAdForSingleImage = function (imageData, foundIndex) {
    imageData.generatedAdHTML = trendii.createAdsForAllProductsInAdvance(imageData, foundIndex);
};

trendii.createAdTemplatesForAllProducts = function () {
    try {
        trendii.feedProducts.payload.map((imageData, index) => {
            if (imageData.products && imageData.products.length > 0) {
                imageData.generatedAdHTML = trendii.createAdsForAllProductsInAdvance(imageData, index);
            }
        });
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.createAdsForAllProductsInAdvance = function (imageData, index) {
    try {
        const imageUrl = imageData.imageUrl;
        const BRAND_NAME = imageData.advertiserName;
        let products = imageData.products;
        if (trendii.adsWindow.innerWidth > trendii.globals.MOBILE_WIDTH) {
            products = imageData.products.slice(0, 4);
        }
        const advertiserName = imageData.advertiserName;
        const identifier = `splide${index}`;
        imageData.sliderId = identifier;
        switch (products.length) {
            case 1:
            case 2:
            case 3:
            case 4:
                {
                    imageData.isSliderTemplate = false;
                    const domParser = new DOMParser();
                    const simpleTemplateDOM = domParser.parseFromString(trendii.nativeAdSimpleTemplateHTMLString, "text/html");
                    const logoUrl = trendii.getRetailerLogoPath(`${advertiserName.toLowerCase()}.png`);
                    const retailerLogoEl = simpleTemplateDOM.getElementById(trendii.globals.RETAILER_LOGO_ID);
                    retailerLogoEl.title = advertiserName;
                    retailerLogoEl.src = logoUrl;
                    const productsContainerEl = simpleTemplateDOM.getElementById(trendii.globals.HTML_TEMPLATE_SIMPLE_CONTAINER_ID);
                    productsContainerEl.innerHTML = "";
                    trendii.initializeRenderingProductsBasedOnCount(products, productsContainerEl);
                    const resultantAdWrapper = simpleTemplateDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
                    return resultantAdWrapper;
                }

            default:
                {
                    imageData.isSliderTemplate = true;
                    const newDOM = this.nativeAdSliderTemplateHTMLString.replaceAll(trendii.SLIDER_CLASS_TO_REPLACE_WITH, identifier);
                    const domParser = new DOMParser();
                    const templatesDOM = domParser.parseFromString(newDOM, "text/html");
                    const logoUrl = trendii.getRetailerLogoPath(`${advertiserName.toLowerCase()}.png`);
                    const retailerLogoEl = templatesDOM.getElementById(RETAILER_LOGO_ID);
                    retailerLogoEl.title = advertiserName;
                    retailerLogoEl.src = logoUrl;
                    const adProductsSliderContainer = templatesDOM.getElementById(identifier);
                    adProductsSliderContainer.style.display = "none";
                    let productsContainerEl = templatesDOM.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
                    productsContainerEl.innerHTML = "";
                    products.forEach(product => trendii.createSliderItemProduct(product, productsContainerEl));
                    const resultantAdWrapper = templatesDOM.getElementById(trendii.globals.HTML_TEMPLATE_AD_WRAPPER_ID);
                    resultantAdWrapper.style.display = "none";
                    return resultantAdWrapper;
                }
        }
    } catch (err) {
        trendii.logError(err);
        return null;
    }
};

trendii.getAllParentImageGroupClassMobile = function () {
    try {
        let allParentElements;
        if (trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH) {
            allParentElements = trendii.adsDOM.querySelectorAll(trendii.MOBILE_IMAGE_GROUP_PARENT_TAG);
        } else {
            allParentElements = trendii.adsDOM.querySelectorAll(trendii.DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS);
        }
        const parentImageGroupElements = Array.from(allParentElements);
        trendii.log(this.parentImageGroupElements);
        let foundImageData = null;
        let foundImageElement = null;
        this.parentImageGroupElements.forEach((parentEl, index) => {
            trendii.log(parentEl.getElementsByTagName("img"));
            const allImagesPresentInTheSameGroup = Array.from(parentEl.getElementsByTagName("img"));
            let currentImageEle, imageSrcToShowAd, imageDataSrcToShowAd;
            for (let i = 0; i < allImagesPresentInTheSameGroup.length; i++) {
                currentImageEle = allImagesPresentInTheSameGroup[i];
                imageSrcToShowAd = currentImageEle.src;
                imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
                foundImageData = trendii.feedProducts.payload.find(imageData => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
                if (foundImageData.generatedAdHTML) {
                    foundImageElement = currentImageEle;
                    break;
                }
            }
            if (foundImageData.generatedAdHTML) {
                const adContainer = trendii.adsDOM.createElement("div");
                adContainer.classList.add("adContainer");
                adContainer.style.background = "yellow";
                adContainer.style.maxHeight = "300px";
                const adContainerMobile = trendii.adsDOM.createElement("div");
                adContainerMobile.classList.add("ads-inside-the-images");
                if (trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH) {
                    const titleOfImageGroup = parentEl.getElementsByTagName(trendii.MOBILE_IMAGE_CAPTION_TAG)[0];
                    if (titleOfImageGroup) {
                        titleOfImageGroup.after(foundImageData.generatedAdHTML);
                    } else {
                        parentEl.appendChild(foundImageData.generatedAdHTML);
                    }
                } else {
                    parentEl.getElementsByClassName(trendii.DESKTOP_IMAGE_CAPTION_CLASS)[0].after(foundImageData.generatedAdHTML);
                }
            }
        });
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.createSliderItemProduct = function (product, productsContainer) {
    try {
        const sliderItem = trendii.createHtmlElement("LI", "splide__slide");
        productsContainer.appendChild(sliderItem);
        const productItemRedirectContainer = trendii.createHtmlElement("A", "product-redirection-link", null, "text-decoration: none;", product.url, "_blank");
        sliderItem.appendChild(productItemRedirectContainer);
        const productItemContainer = trendii.createHtmlElement("DIV", "product-item-container");
        productItemContainer.addEventListener("click", function () {
            adsWindow.open(product.url, "_blank");
        });
        productItemRedirectContainer.appendChild(productItemContainer);
        const productItem = trendii.createHtmlElement("DIV", "product-item");
        productItem.style.backgroundImage = `url(${product.image})`;
        productItemContainer.appendChild(productItem);
        if (product.sale) {
            productItem.appendChild(trendii.createHtmlElement("SPAN", "onsale", "ON SALE"));
        }
        const productDetailsWrapper = trendii.createHtmlElement("DIV", "product-details-wrapper");
        productDetailsWrapper.addEventListener("click", function () {
            adsWindow.open(product.url, "_blank");
        });
        productItem.appendChild(productDetailsWrapper);
        const productDetailsWrapperMobile = trendii.createHtmlElement("DIV", "product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);
        productDetailsWrapper.appendChild(trendii.createHtmlElement("P", "product-name", product.name));
        productDetailsWrapperMobile.appendChild(trendii.createHtmlElement("P", "product-name", product.name));
        productDetailsWrapper.appendChild(trendii.createHtmlElement("EM", "product-price", product.currency + product.price));
        productDetailsWrapperMobile.appendChild(trendii.createHtmlElement("EM", "product-price", product.currency + product.price));
    } catch (err) {
        console.logError(err);
    }
};

trendii.createProductItemHtml = function (product, row, cssClass, which) {
    try {
        const col = trendii.createHtmlElement("DIV", cssClass);
        row.appendChild(col);
        const productItemRedirectContainer = trendii.createHtmlElement("A", "product-redirection-link", null, "text-decoration: none;", product.url, "_blank");
        col.appendChild(productItemRedirectContainer);
        const productItemContainer = trendii.createHtmlElement("DIV", "product-item-container");
        productItemContainer.addEventListener("click", function () {
            adsWindow.open(product.url, "_blank");
        });
        productItemRedirectContainer.appendChild(productItemContainer);
        const productItem = trendii.adsDOM.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);
        const productItemImage = trendii.createHtmlElement("DIV", "product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);
        if (product.sale) {
            productItemImage.appendChild(trendii.createHtmlElement("SPAN", "onsale", "ON SALE"));
        }
        const productDetailsWrapper = trendii.createHtmlElement("DIV", "product-details-wrapper");
        if (which > 3) {
            productItem.appendChild(productDetailsWrapper);
        } else {
            productItemContainer.appendChild(productDetailsWrapper);
        }
        productDetailsWrapper.appendChild(trendii.createHtmlElement("P", "product-name", product.name));
        productDetailsWrapper.appendChild(trendii.createHtmlElement("EM", "product-price", product.currency + product.price));
        if (which > 2) {
            const productDetailsWrapperMobile = trendii.createHtmlElement("DIV", "product-details-wrapper-mobile");
            productItemContainer.appendChild(productDetailsWrapperMobile);
            productDetailsWrapperMobile.appendChild(trendii.createHtmlElement("P", "product-name", product.name));
            productDetailsWrapperMobile.appendChild(trendii.createHtmlElement("EM", "product-price", product.currency + product.price));
        }
    } catch (err) {
        trendii.logError(err);
    }
};

trendii.initializeRenderingProductsBasedOnCount = function (adRenderingProducts, productsContainer) {
    switch (adRenderingProducts.length) {
        case 1:
            {
                const product = adRenderingProducts[0];
                const oneProductWrapper = trendii.createHtmlElement("DIV", "one-product-wrapper");
                productsContainer.appendChild(oneProductWrapper);
                const row = trendii.createHtmlElement("DIV", "row");
                oneProductWrapper.appendChild(row);
                trendii.createProductItemHtml(product, row, "col-12", adRenderingProducts.length);
                break;
            }

        case 2:
            {
                const twoProductWrapper = trendii.adsDOM.createElement("DIV");
                twoProductWrapper.classList.add("two-product-wrapper");
                productsContainer.appendChild(twoProductWrapper);
                const row = trendii.adsDOM.createElement("DIV");
                row.classList.add("row");
                twoProductWrapper.appendChild(row);
                for (let i = 0; i <= 1; i++) {
                    trendii.createProductItemHtml(adRenderingProducts[i], row, "col-6", adRenderingProducts.length);
                }
                break;
            }

        case 3:
            {
                const threeProductWrapper = trendii.adsDOM.createElement("DIV");
                threeProductWrapper.classList.add("three-product-wrapper");
                productsContainer.appendChild(threeProductWrapper);
                const row = trendii.adsDOM.createElement("DIV");
                row.classList.add("row");
                row.classList.add("row-cols-3");
                threeProductWrapper.appendChild(row);
                for (let i = 0; i <= 2; i++) {
                    trendii.createProductItemHtml(adRenderingProducts[i], row, "col", adRenderingProducts.length);
                }
                break;
            }

        case 4:
            {
                const fourProductWrapper = trendii.adsDOM.createElement("DIV");
                fourProductWrapper.classList.add("four-product-wrapper");
                productsContainer.appendChild(fourProductWrapper);
                const row = trendii.adsDOM.createElement("DIV");
                row.classList.add("row");
                row.classList.add("row-cols-4");
                fourProductWrapper.appendChild(row);
                for (let i = 0; i <= 3; i++) {
                    trendii.createProductItemHtml(adRenderingProducts[i], row, "col", adRenderingProducts.length);
                }
                break;
            }

        default:
            {
                break;
            }
    }
};

trendii.init();