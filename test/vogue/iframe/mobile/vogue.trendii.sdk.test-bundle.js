if (typeof trendii === "undefined") {
    var trendii = {};
} else {
    if (typeof trendii != "object") {
        throw new Error("trendii already exists and is not an object.");
    }
}

trendii.AD_CONTAINERS_SELECTORS = [ {
    parentSelector: `[data-test-id="GalleryImage"]`,
    adRendererSelector: `[data-test-id="ImageWrapper"]`,
    renderFunction: null,
    appendIntoParent: false
}, {
    parentSelector: `[data-test-id="ArticleBodyImage"]`,
    adRendererSelector: `[data-test-id="Wrapper"]`,
    renderFunction: null,
    appendIntoParent: false
} ];

trendii.CURRENT_PAGE_AD_CONTAINER_SELECTOR = {};

trendii.SLIDER_CLASS_TO_REPLACE_WITH = "trendiiSliderUniqueString";

trendii.adsWindow = window.top;

trendii.adsDOM = trendii.adsWindow.document;

trendii.feedProducts = [];

trendii.slidersAppendedArray = [];

trendii.sliderCount = 0;

trendii.nativeAdSimpleTemplateHTMLString = null;

trendii.nativeAdSliderTemplateHTMLString = null;

trendii.publisherURL = "https://www.dailymail.co.uk";

trendii.publisherIdentifier = "daily-mail";

trendii.init = function() {
    if (!trendii.isURLWhiteListed()) {
        return;
    }
    trendii.console.log("SDK init method called");
    trendii.isMobileDevice = trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH;
    trendii.globals.PUBLISHER_ID = 1;
    trendii.loadScriptAndCssToHead();
    trendii.loadStyleSheetIntoHead(`${trendii.globals.CDN}/styles/daily-mail/trendii-sdk-daily-mail-all-product.css`);
    if (trendii.adsDOM.readyState === "complete" || trendii.adsDOM.readyState === "interactive") {
        trendii.console.log(trendii.adsDOM.readyState);
        trendii.startAdGenerationProcess();
    } else {
        trendii.console.log("DOM in progress");
        trendii.adsDOM.addEventListener("DOMContentLoaded", () => {
            trendii.console.log(trendii.adsDOM.readyState);
            trendii.startAdGenerationProcess();
        });
    }
};

trendii.env = "test";

trendii.globals = {
    PUBLISHER_NAME: "",
    PUBLISHER_ID: 0,
    MOBILE_WIDTH: 480,
    MAX_ADS_PER_ADVTISER: 3,
    CDN: "https://cdn.trendii.com/native-ads-sdk/test",
    BITBUCKET_CDN: "https://trendii-ads-sdk.bitbucket.io/src/assets",
    API_GET_NATIVE_AD_PRODUCT: `https://beeswaxcreatives.trendii.com/img-creatives`,
    API_SET_NATIVE_AD_VIEW_IMPRESSION: `https://beeswaxcreatives.trendii.com/feed-visibility-logs/add`,
    RETAILER_LOGO_ID: "retailer-logo",
    HTML_TEMPLATE_AD_WRAPPER_ID: "trendii-native-ad-wrapper",
    HTML_TEMPLATE_SLIDER_CONTAINER_ID: "trendii-sdk-ad-products-container",
    HTML_TEMPLATE_SIMPLE_CONTAINER_ID: "trendii-products-container-728X90"
};

trendii.globals.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `${trendii.globals.CDN}/templates/products-slider-dynamic.html`;

trendii.globals.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `${trendii.globals.CDN}/templates/products-728X90-all-product-dynamic.html`;

trendii.template = {};

trendii.template.adHeader = `<div class="trendii-ad-header">
	<span class="trendii-ad-header-title">Shop the look with</span>
	<div class="trendii-brand-logo-container">
		<img src="##RETAILER_LOGO_URL##" id="retailer-logo" title="##RETAILER_NAME##" class="trendii-brand-logo-image" />
	</div>
</div>`;

trendii.template.simpleAdContainer = `<div class="trendii-ads-body">
	<div class="trendii-responsive-ad-wrapper" id="trendii-native-ad-wrapper">
		<div class="trendii-ad-outer-wrapper">
			${trendii.template.adHeader}
			<div class="trendii-product-item-wrapper" id="trendii-products-container-728X90">
				<div class="##PRODUCT_WRAPPER_CLASS##">
					<div class="##PRODUCT_WRAPPER_ROW_CLASS##">
						##PRODUCT_HTML##
					<div>
				</div>
			</div>
		</div>
	</div>
</div>`;

trendii.template.productItemContainer = `<div class="##PRODUCT_ITEM_CONTAINER_CLASS##">
	<div class="trendii-product-item-container" 
		onclick="trendiiSDKOpenProductLink(event, '##PRODUCT_ITEM_URL_TO_CLICK##');">
		<div class="trendii-product-item">
			<div class="trendii-product-item-image"
				style="background-image: url('##PRODUCT_IMAGE_URL##');">
				<span style="display: ##ON_SALE_VISIBLE##;" class="trendii-onsale">
					ON SALE
				</span>
			</div>
			##PRODUCT_DETAILS_WRAPPER_IN_ITEM##
		</div>
		##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##
		##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##
	</div>
</div>`;

trendii.template.productDetailsWrapper = `<div class="trendii-product-details-wrapper">
	<p class="trendii-product-name">##PRODUCT_NAME##</p>
	<em class="trendii-product-price">##PRODUCT_PRICE##</em>
</div>`;

trendii.template.productDetailsMobileWrapper = `<div class="trendii-product-details-wrapper-mobile">
	<p class="trendii-product-name">##PRODUCT_NAME##</p>
	<em class="trendii-product-price">##PRODUCT_PRICE##</em>
</div>`;

trendii.template.silderAdContainer = `<div class="trendii-block728X90-slider-wrapper" 
	id="trendii-native-ad-wrapper"
	sytle="display: none;">
	<div class="trendii-ad-outer-wrapper">
		${trendii.template.adHeader}
		<div class="trendii-product-item-wrapper splide" id="##PRODUCT_SLIDER_ID##" sytle="display: none;">
			<div class="trendii-slider-title splide__arrows">
				<button class="trendii-btn trendii-btn-slider splide__arrow splide__arrow--prev" style="display: none"
					title="Previous">
					<img src="https://cdn.trendii.com/assets/prev.svg" alt="prev-icon" />
				</button>

				<div class="trendii-all-product splide__track">
					<ul class="splide__list" id="trendii-sdk-ad-products-container">
						##PRODUCT_HTML##
					</ul>
				</div>
				<button class="trendii-btn trendii-btn-slider splide__arrow splide__arrow--next" title="Next">
					<img id="slider-next-button" src="https://cdn.trendii.com/assets/arrow_pink.svg" alt="next-icon" />
				</button>
			</div>
		</div>
	</div>
</div>`;

trendii.template.sliderProductItemContriner = `<li class="splide__slide">
	<div class="trendii-product-item-container"
		onclick="trendiiSDKOpenProductLink(event, '##PRODUCT_ITEM_URL_TO_CLICK##');">
		<div class="trendii-product-item"
			style="background-image: url('##PRODUCT_IMAGE_URL##');">
			<span style="display: ##ON_SALE_VISIBLE##;" class="trendii-onsale">
				ON SALE
			</span>
			##PRODUCT_DETAILS_WRAPPER_IN_ITEM##
		</div>
		##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##
	</div>
</li>`;

trendii.getSimpleAdWrapperHtml = function(imageUrl, advertiserName, productsCount) {
    try {
        let html = trendii.template.simpleAdContainer;
        const htmlClass = {
            1: {
                wrapper: "trendii-one-product-wrapper",
                row: "trendii-row"
            },
            2: {
                wrapper: "trendii-two-product-wrapper",
                row: "trendii-row"
            },
            3: {
                wrapper: "trendii-three-product-wrapper",
                row: "trendii-row trendii-row-cols-3"
            },
            4: {
                wrapper: "trendii-four-product-wrapper",
                row: "trendii-row trendii-row-cols-4"
            }
        };
        Object.freeze(htmlClass);
        html = html.replace("##RETAILER_LOGO_URL##", imageUrl);
        html = html.replace("##RETAILER_NAME##", advertiserName);
        html = html.replace("##PRODUCT_WRAPPER_CLASS##", htmlClass[productsCount].wrapper);
        html = html.replace("##PRODUCT_WRAPPER_ROW_CLASS##", htmlClass[productsCount].row);
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.getProductHtml = function(product, which) {
    try {
        let html = trendii.template.productItemContainer;
        const htmlClass = {
            1: "trendii-col-12",
            2: "trendii-col-6",
            3: "trendii-col",
            4: "trendii-col"
        };
        Object.freeze(htmlClass);
        html = html.replace("##PRODUCT_ITEM_CONTAINER_CLASS##", htmlClass[which]);
        html = html.replace("##PRODUCT_ITEM_URL_TO_CLICK##", product.url);
        html = html.replace("##PRODUCT_IMAGE_URL##", product.image);
        html = html.replace("##ON_SALE_VISIBLE##", product.sale ? "block" : "none");
        let detailsHtml = trendii.template.productDetailsWrapper;
        detailsHtml = detailsHtml.replace("##PRODUCT_NAME##", product.name);
        detailsHtml = detailsHtml.replace("##PRODUCT_PRICE##", product.currency + product.price);
        if (which > 3) {
            html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", detailsHtml);
            html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", "");
        } else {
            html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", detailsHtml);
            html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", "");
        }
        if (which > 2) {
            let detailsMobileHtml = trendii.template.productDetailsMobileWrapper;
            detailsMobileHtml = detailsMobileHtml.replace("##PRODUCT_NAME##", product.name);
            detailsMobileHtml = detailsMobileHtml.replace("##PRODUCT_PRICE##", product.currency + product.price);
            html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", detailsMobileHtml);
        } else {
            html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
        }
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.getSliderAdWrapperHtml = function(imageUrl, advertiserName, productsCount, sliderId) {
    try {
        let html = trendii.template.silderAdContainer;
        html = html.replace("##PRODUCT_SLIDER_ID##", sliderId);
        html = html.replace("##RETAILER_LOGO_URL##", imageUrl);
        html = html.replace("##RETAILER_NAME##", advertiserName);
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.getSliderProductHtml = function(product, which) {
    try {
        let html = trendii.template.sliderProductItemContriner;
        html = html.replace("##PRODUCT_ITEM_URL_TO_CLICK##", product.url);
        html = html.replace("##PRODUCT_IMAGE_URL##", product.image);
        html = html.replace("##ON_SALE_VISIBLE##", product.sale ? "block" : "none");
        let detailsHtml = trendii.template.productDetailsWrapper;
        detailsHtml = detailsHtml.replace("##PRODUCT_NAME##", product.name);
        detailsHtml = detailsHtml.replace("##PRODUCT_PRICE##", product.currency + product.price);
        html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", detailsHtml);
        let detailsMobileHtml = trendii.template.productDetailsMobileWrapper;
        detailsMobileHtml = detailsMobileHtml.replace("##PRODUCT_NAME##", product.name);
        detailsMobileHtml = detailsMobileHtml.replace("##PRODUCT_PRICE##", product.currency + product.price);
        html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", detailsMobileHtml);
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.console = function() {
    return {
        log: function() {
            if (trendii.env === "test") {
                let args = Array.prototype.slice.call(arguments);
                args.unshift("[Trendii.SDK] ==>");
                console.log.apply(console, args);
            }
        },
        error: function() {
            let args = Array.prototype.slice.call(arguments);
            args.unshift("[Trendii.SDK] ==>");
            console.error.apply(console, args);
        }
    };
}();

trendii.getRetailerLogoPath = function(fileName) {
    return `${trendii.globals.CDN}/images/retailers-logo/${fileName}`;
};

trendii.createHtmlElement = function(element, classes, innerHTML, style, href, target) {
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

trendii.setPublisherName = function(name) {
    trendii.globals.PUBLISHER_NAME = name;
};

trendii.loadScriptIntoHead = function(url) {
    trendii.adsDOM.head.appendChild(trendii.adsDOM.createElement("script")).src = url;
};

trendii.loadStyleSheetIntoHead = function(url) {
    let styles = trendii.adsDOM.createElement("link");
    styles.type = "text/css";
    styles.rel = "stylesheet";
    styles.href = url;
    trendii.adsDOM.head.appendChild(styles);
};

trendii.loadScriptAndCssToHead = function() {
    if (trendii.env === "test") {
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/intersection-observer.js`);
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/splide.js`);
    } else {
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/intersection-observer.min.js`);
        trendii.loadScriptIntoHead(`${trendii.globals.CDN}/scripts/common/splide.min.js`);
    }
    trendii.loadStyleSheetIntoHead(`${trendii.globals.CDN}/styles/common/splide-core.min.css`);
};

trendii.getImageURLsWithCount = function(element) {
    try {
        const imageElements = Array.from(element.getElementsByTagName("img"));
        return {
            elements: imageElements,
            urls: imageElements.map(img => trendii.getImageUrl(img)).filter(x => x)
        };
    } catch (err) {
        trendii.console.error(err);
        return {
            elements: [],
            urls: []
        };
    }
};

trendii.getImageUrl = function(element) {
    try {
        if (element.getAttribute("data-src")) {
            return element.getAttribute("data-src");
        } else {
            return element.getAttribute("src");
        }
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.fetchProducts = function(params) {
    return trendii.apiPost(trendii.globals.API_GET_NATIVE_AD_PRODUCT, params);
};

trendii.setViewImpression = function(params) {
    return trendii.apiPost(trendii.globals.API_SET_NATIVE_AD_VIEW_IMPRESSION, params);
};

trendii.apiPost = async function(url, params) {
    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(params)
        };
        return fetch(url, requestOptions).then(response => response.json());
    } catch (err) {
        trendii.console.error(err);
        return null;
    }
};

trendii.canShowAdForAdvertiser = function(advertiserName, index) {
    try {
        const advertiserIndex = trendii.advertiserLog.findIndex(item => item.name === advertiserName.toLowerCase());
        let advertiserLog;
        if (advertiserIndex >= 0) {
            advertiserLog = trendii.advertiserLog[advertiserIndex];
            if (advertiserLog.count < trendii.globals.MAX_ADS_PER_ADVTISER && advertiserLog.lastIndex + trendii.pacingValue <= index) {
                advertiserLog.count += 1;
                advertiserLog.lastIndex = index;
                trendii.advertiserLog[advertiserIndex] = advertiserLog;
                return true;
            } else {
                return false;
            }
        } else {
            advertiserLog = {
                name: advertiserName.toLowerCase(),
                count: 1,
                lastIndex: index
            };
            trendii.advertiserLog.push(advertiserLog);
            return true;
        }
    } catch (err) {
        trendii.console.error(err);
        return false;
    }
};

trendii.getPacingValue = function(count) {
    try {
        return Math.ceil(count / trendii.globals.MAX_ADS_PER_ADVTISER);
    } catch (err) {
        trendii.console.error(err);
        return [];
    }
};

trendii.openProductLink = function(e, url) {
    try {
        trendii.adsWindow.open(url, "_blank");
        e.preventDefault();
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.isURLWhiteListed = function() {
    let isWhiteListed = true;
    if (trendii.globals.blacklistedUrls && trendii.globals.blacklistedUrls[trendii.publisherIdentifier]) {
        const urls = trendii.globals.blacklistedUrls[trendii.publisherIdentifier];
        for (let i = 0; i < urls.length; i++) {
            if (window.location.href.indexOf(urls[i]) >= 0) {
                isWhiteListed = false;
                break;
            }
        }
    }
    return isWhiteListed;
};

trendii.appendJavacriptToHead = function() {
    try {
        const trendiiScripts = `function trendiiSDKOpenProductLink (e, url) {
            try {
                window.open(url, '_blank');
                e.preventDefault();
            } catch (err) {
                trendii.console.error(err);
            }
        };`;
        const script = trendii.adsDOM.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = trendiiScripts;
        trendii.adsDOM.getElementsByTagName("head")[0].appendChild(script);
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.advertiserLog = [];

trendii.pacingValue = 0;

trendii.intersectionIndex = 0;

trendii.startAdGenerationProcess = function() {
    try {
        trendii.appendJavacriptToHead();
        trendii.imageIntersectionObserver;
        const options = {
            rootMargin: "0px",
            threshold: .1
        };
        if (trendii.adsWindow.TrendiiIntersectionObserver) {
            trendii.imageIntersectionObserver = new trendii.adsWindow.TrendiiIntersectionObserver(trendii.handleImageIntersectionEntries, options);
        } else {
            trendii.imageIntersectionObserver = new IntersectionObserver(trendii.handleImageIntersectionEntries, options);
        }
        let allParentEls = trendii.selectAllParentElementsFromDOM();
        trendii.console.log("All parent elements.", allParentEls);
        trendii.pacingValue = trendii.getPacingValue(allParentEls.length);
        for (let i = 0; i < allParentEls.length; i++) {
            trendii.imageIntersectionObserver.observe(allParentEls[i]);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.selectAllParentElementsFromDOM = function() {
    let allParentEls;
    for (let index = 0; index < trendii.AD_CONTAINERS_SELECTORS.length; index++) {
        const selectorObj = trendii.AD_CONTAINERS_SELECTORS[index];
        allParentEls = Array.from(trendii.adsDOM.querySelectorAll(selectorObj.parentSelector));
        if (allParentEls.length > 0) {
            trendii.CURRENT_PAGE_AD_CONTAINER_SELECTOR = selectorObj;
            trendii.console.log("Found structure", selectorObj);
            return allParentEls;
        }
    }
};

trendii.handleImageIntersectionEntries = function(entries, observer) {
    try {
        for (let i = 0; i < entries.length; i++) {
            trendii.handleImageIntersectionEntry(entries[i], observer);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.handleImageIntersectionEntry = async function(entry, observer) {
    try {
        if (entry.isIntersecting) {
            const visibleElement = entry.target;
            observer.unobserve(entry.target);
            trendii.console.log("Observer unregistered for ", visibleElement);
            if (visibleElement.getAttribute("data-is-trendii-ad")) {
                const impressionId = visibleElement.getAttribute("trendii-ad-impression-id");
                if (impressionId === undefined) {
                    trendii.console.error("Impression id not found.");
                    return;
                }
                trendii.console.log("API called to send impressions for ad.");
                const productsIds = visibleElement.getAttribute("trendii-ad-products-id");
                const requestBody = {
                    impressionId: impressionId,
                    deviceType: trendii.isMobileDevice ? "MOBILE" : "PC",
                    products: productsIds ? productsIds.split(",") : []
                };
                trendii.setViewImpression(requestBody);
                return;
            }
            trendii.intersectionIndex++;
            trendii.console.log("API called to fetch products.");
            const fetchedImages = trendii.getImageURLsWithCount(visibleElement);
            const requestBody = {
                webpageUrl: trendii.adsWindow.location.href,
                imageUrls: fetchedImages.urls,
                publisherId: trendii.globals.PUBLISHER_ID
            };
            const response = await trendii.fetchProducts(requestBody);
            const startTime = performance.now();
            if (!(response !== "" && response.success && response.success === true)) {
                trendii.console.log("No creatives found.");
                return;
            }
            let imageCreative = null;
            const imageElementsLength = fetchedImages.elements.length;
            for (let i = 0; i < imageElementsLength; i++) {
                imageCreative = response.payload.find(imageData => imageData.imageUrl === trendii.getImageUrl(fetchedImages.elements[i]));
                if (imageCreative.products && imageCreative.products.length > 0) {
                    break;
                }
            }
            if (!(imageCreative.products && imageCreative.products.length > 0)) {
                trendii.console.log("No product found.");
                return;
            }
            trendii.console.log("Products found.");
            if (!trendii.canShowAdForAdvertiser(imageCreative.advertiserName, trendii.intersectionIndex)) {
                trendii.console.log(`Maximum ads generated for ${imageCreative.advertiserName}.`);
                return;
            }
            imageCreative.productsId = trendii.getAllProductsId(imageCreative.products);
            trendii.generateAdHtml(imageCreative);
            if (imageCreative.adHtml === undefined) {
                trendii.console.log("Ad html not generated.");
                return;
            }
            trendii.console.log("Ad html generated.");
            imageCreative.adHtml.setAttribute("data-is-trendii-ad", true);
            imageCreative.adHtml.setAttribute("trendii-ad-impression-id", imageCreative.impressionId);
            imageCreative.adHtml.setAttribute("trendii-ad-products-id", imageCreative.productsId);
            trendii.appendAdHtml(imageCreative, visibleElement);
            trendii.console.log("Appended ad html.");
            var endTime = performance.now();
            trendii.console.log("Time taken: " + (endTime - startTime) + " ms.");
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.generateAdHtml = function(imageCreative) {
    try {
        const products = trendii.isMobileDevice ? imageCreative.products : imageCreative.products.slice(0, 4);
        const productCount = products.length;
        switch (productCount) {
          case 1:
          case 2:
          case 3:
          case 4:
            {
                imageCreative.isSliderTemplate = false;
                let adWrapper = trendii.getSimpleAdWrapperHtml(trendii.getRetailerLogoPath(`${imageCreative.advertiserName.toLowerCase()}.png`), imageCreative.advertiserName, products.length);
                let productItemsHtml = "";
                for (let i = 0; i < productCount; i++) {
                    productItemsHtml += trendii.getProductHtml(products[i], productCount);
                }
                adWrapper = adWrapper.replace("##PRODUCT_HTML##", productItemsHtml);
                imageCreative.adHtml = new DOMParser().parseFromString(adWrapper, "text/html").getElementById(trendii.globals.HTML_TEMPLATE_AD_WRAPPER_ID);
            }
            break;

          default:
            {
                imageCreative.isSliderTemplate = true;
                ++trendii.sliderCount;
                imageCreative.sliderId = `splide${trendii.sliderCount}`;
                let adWrapper = trendii.getSliderAdWrapperHtml(trendii.getRetailerLogoPath(`${imageCreative.advertiserName.toLowerCase()}.png`), imageCreative.advertiserName, products.length, imageCreative.sliderId);
                let productItemsHtml = "";
                for (let i = 0; i < productCount; i++) {
                    productItemsHtml += trendii.getSliderProductHtml(products[i], productCount);
                }
                adWrapper = adWrapper.replace("##PRODUCT_HTML##", productItemsHtml);
                imageCreative.adHtml = new DOMParser().parseFromString(adWrapper, "text/html").getElementById(trendii.globals.HTML_TEMPLATE_AD_WRAPPER_ID);
            }
            break;
        }
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.appendAdHtml = function(imageCreative, visibleElement) {
    try {
        let isAdAppended = false;
        const selectorObj = trendii.CURRENT_PAGE_AD_CONTAINER_SELECTOR;
        const adRendererElement = visibleElement.querySelector(selectorObj.adRendererSelector);
        if (adRendererElement !== undefined) {
            if (selectorObj.renderFunction) {
                adRendererElement[renderFunction].apply(adRendererElement, [ imageCreative.adHtml ]);
                isAdAppended = true;
            } else {
                adRendererElement.after(imageCreative.adHtml);
                isAdAppended = true;
            }
        } else if (selectorObj.appendIntoParent) {
            visibleElement.appendChild(imageCreative.adHtml);
            isAdAppended = true;
        }
        if (isAdAppended) {
            if (imageCreative.isSliderTemplate) {
                trendii.registerSlider(imageCreative);
            }
            trendii.imageIntersectionObserver.observe(imageCreative.adHtml);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.registerSlider = function(imageCreative) {
    try {
        const identifier = imageCreative.sliderId;
        trendii.slidersAppendedArray.push(identifier);
        if (trendii.adsWindow.Splide) {
            const testSlider = new trendii.adsWindow.Splide(`#${identifier}`, {
                type: "loop",
                pagination: false,
                gap: 10,
                autoWidth: true,
                autoHeight: true
            }).mount();
            const slider = trendii.adsDOM.getElementById(identifier);
            slider.style.display = "block";
            const adWrapper = imageCreative.adHtml;
            adWrapper.setAttribute("data-slider-appended", "true");
            adWrapper.style.display = "block";
            trendii.console.log("Slider appended");
            testSlider.on("mounted", function() {
                trendii.console.log("Splide mounted.");
            });
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.getAllProductsId = function(products) {
    try {
        const productsIds = [];
        for (let i = 0; i < products.length; i++) {
            productsIds.push(products[i].id);
        }
        return productsIds;
    } catch (err) {
        trendii.console.error(err);
        return [];
    }
};

if (window.location.origin === trendii.publisherURL || trendii.env === "test") {
    trendii.init();
}