if (typeof trendii === "undefined") {
    var trendii = {};
} else {
    if (typeof trendii != "object") {
        throw new Error("trendii already exists and is not an object.");
    }
}

trendii.adsWindow = window.top;

trendii.adsDOM = trendii.adsWindow.document;

trendii.feedProducts = [];

trendii.slidersAppendedArray = [];

trendii.sliderCount = 0;

trendii.nativeAdSimpleTemplateHTMLString = null;

trendii.nativeAdSliderTemplateHTMLString = null;

trendii.init = function (publisher, publisherClientId) {
    const {
        id,
        name,
        isFloatingAds,
        isLogViewImpression,
        maxAdsPerAdv,
        blacklistedUrls,
        desktopParentSelector,
        desktopCaptionSelector,
        mobileParentSelector,
        mobileCaptionSelector,
        nativeSdkId,
        templateFile,
        cssFile
    } = publisher;
    if (!trendii.isURLWhiteListed()) {
        return;
    }
    trendii.console.log("SDK init method called");
    trendii.globals.PUBLISHER_ID = id;
    trendii.globals.PUBLISHER_NAME = name;
    trendii.globals.MAX_ADS_PER_ADVTISER = maxAdsPerAdv;
    trendii.DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS = desktopParentSelector[0];
    trendii.MOBILE_IMAGE_GROUP_PARENT_TAG = mobileParentSelector[0];
    trendii.DESKTOP_IMAGE_CAPTION_CLASS = desktopCaptionSelector[0];
    trendii.MOBILE_IMAGE_CAPTION_TAG = mobileCaptionSelector[0];
    trendii.nativeSdkId = nativeSdkId;
    trendii.isFloatingAds = isFloatingAds;
    trendii.isLogViewImpression = isLogViewImpression;
    trendii.blacklistedUrls = blacklistedUrls;
    trendii.publisherClientId = publisherClientId;
    trendii.loadScriptAndCssToHead();
    trendii.loadStyleSheetIntoHead(cssFile);
    if (trendii.adsDOM.readyState === "complete" || trendii.adsDOM.readyState === "interactive") {
        trendii.console.log(trendii.adsDOM.readyState);
        trendii.startAdGenerationProcess(templateFile);
    } else {
        trendii.console.log("DOM in progress");
        trendii.adsDOM.addEventListener("DOMContentLoaded", () => {
            trendii.console.log(trendii.adsDOM.readyState);
            trendii.startAdGenerationProcess(templateFile);
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
    API_GET_NATIVE_AD_PRODUCT: `https://beeswaxcreatives.trendii.com/mock/img-creatives`,
    API_SET_NATIVE_AD_VIEW_IMPRESSION: `https://beeswaxcreatives.trendii.com/feed-visibility-logs/add`,
    RETAILER_LOGO_ID: "retailer-logo",
    HTML_TEMPLATE_AD_WRAPPER_ID: "trendii-native-ad-wrapper",
    HTML_TEMPLATE_SLIDER_CONTAINER_ID: "trendii-sdk-ad-products-container",
    HTML_TEMPLATE_SIMPLE_CONTAINER_ID: "trendii-products-container-728X90"
};

trendii.globals.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `${trendii.globals.CDN}/templates/products-slider-dynamic.html`;

trendii.globals.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `${trendii.globals.CDN}/templates/products-728X90-all-product-dynamic.html`;

trendii.getSimpleAdWrapperHtml = function (imageUrl, advertiserName, productsCount) {
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

trendii.getProductHtml = function (product, which) {
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

trendii.getSliderAdWrapperHtml = function (imageUrl, advertiserName, productsCount, sliderId) {
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

trendii.getSliderProductHtml = function (product) {
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

trendii.getFloatingAdWrapperHtml = function (imageUrl, advertiserName, productsCount) {
    try {
        let html = trendii.isMobileDevice ? trendii.template.floatingMobileAdContainer : trendii.template.floatingAdContainer;
        const htmlClass = {
            1: "trendii-one-product-wrapper",
            2: "trendii-two-product-wrapper",
            3: "trendii-three-product-wrapper",
            4: "trendii-four-product-wrapper",
            5: "trendii-five-product-wrapper",
            6: "trendii-six-product-wrapper"
        };
        Object.freeze(htmlClass);
        html = html.replace("##RETAILER_LOGO_URL##", imageUrl);
        html = html.replace("##RETAILER_NAME##", advertiserName);
        html = html.replace("##PRODUCT_WRAPPER_CLASS##", htmlClass[productsCount]);
        switch (productsCount) {
            case 1:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.oneFloatingMobileAdWrapper : trendii.template.oneFloatingAdWrapper);
                break;

            case 2:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.twoFloatingMobileAdWrapper : trendii.template.twoFloatingAdWrapper);
                break;

            case 3:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.threeFloatingMobileAdWrapper : trendii.template.threeFloatingAdWrapper);
                break;

            case 4:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.fourFloatingMobileAdWrapper : trendii.template.fourFloatingAdWrapper);
                break;

            case 5:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.fiveFloatingMobileAdWrapper : trendii.template.fiveFloatingAdWrapper);
                break;

            case 6:
                html = html.replace("##PRODUCT_HTML##", trendii.isMobileDevice ? trendii.template.sixFloatingMobileAdWrapper : trendii.template.sixFloatingAdWrapper);
                break;
        }
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.getFloatingProductHtml = function (product, which) {
    try {
        let html;
        if (trendii.isMobileDevice) {
            if (which > 4) {
                html = trendii.template.floatingMobileProductItemContainerSmall;
            } else {
                html = trendii.template.floatingMobileProductItemContainer;
            }
        } else {
            html = trendii.template.floatingProductItemContainer;
        }
        html = html.replace("##PRODUCT_ITEM_URL_TO_CLICK##", product.url);
        html = html.replace("##PRODUCT_IMAGE_URL##", product.image);
        html = html.replace("##ON_SALE_VISIBLE##", product.sale ? "block" : "none");
        let detailsHtml = trendii.template.productDetailsWrapper;
        if (trendii.isMobileDevice && which < 3 || !trendii.isMobileDevice) {
            detailsHtml = detailsHtml.replace("##PRODUCT_NAME##", product.name);
        } else {
            detailsHtml = detailsHtml.replace("##PRODUCT_NAME##", "");
        }
        detailsHtml = detailsHtml.replace("##PRODUCT_PRICE##", product.currency + product.price);
        if (trendii.isMobileDevice) {
            if (which === 3 || which === 4) {
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", detailsHtml);
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", "");
                html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
            } else if (which > 4) {
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", "");
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", "");
                html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
            } else {
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", detailsHtml);
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", "");
                html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
            }
        } else {
            if (which > 3 && which != 5) {
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", detailsHtml);
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", "");
                html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
            } else {
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_WRAPPER##", detailsHtml);
                html = html.replace("##PRODUCT_DETAILS_WRAPPER_IN_ITEM##", "");
                html = html.replace("##PRODUCT_DETAILS_MOBILE_WRAPPER_IN_WRAPPER##", "");
            }
        }
        return html;
    } catch (err) {
        trendii.console.error(err);
        return "";
    }
};

trendii.console = function () {
    return {
        log: function () {
            if (trendii.env === "test") {
                let args = Array.prototype.slice.call(arguments);
                args.unshift("[Trendii.SDK] ==>");
                console.log.apply(console, args);
            }
        },
        error: function () {
            let args = Array.prototype.slice.call(arguments);
            args.unshift("[Trendii.SDK] ==>");
            console.error.apply(console, args);
        }
    };
}();

trendii.getRetailerLogoPath = function (fileName) {
    return `${trendii.globals.CDN}/images/retailers-logo/${fileName}`;
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

trendii.getImageURLsWithCount = function (element) {
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

trendii.getImageUrl = function (element) {
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

trendii.fetchProducts = function (params) {
    return trendii.apiPost(trendii.globals.API_GET_NATIVE_AD_PRODUCT, params);
};

trendii.setViewImpression = function (params) {
    return trendii.apiPost(trendii.globals.API_SET_NATIVE_AD_VIEW_IMPRESSION, params);
};

trendii.apiPost = async function (url, params) {
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

trendii.canShowAdForAdvertiser = function (advertiserName, index, isForFloating) {
    try {
        const advertiserIndex = trendii.advertiserLog.findIndex(item => item.name === advertiserName.toLowerCase() && item.isForFloating === isForFloating);
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
                lastIndex: index,
                isForFloating: isForFloating
            };
            trendii.advertiserLog.push(advertiserLog);
            return true;
        }
    } catch (err) {
        trendii.console.error(err);
        return false;
    }
};

trendii.getPacingValue = function (count) {
    try {
        return Math.ceil(count / trendii.globals.MAX_ADS_PER_ADVTISER);
    } catch (err) {
        trendii.console.error(err);
        return [];
    }
};

trendii.openProductLink = function (e, url) {
    try {
        trendii.adsWindow.open(url, "_blank");
        e.preventDefault();
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.isURLWhiteListed = function () {
    let isWhiteListed = true;
    if (trendii.blacklistedUrls && trendii.blacklistedUrls.length > 0) {
        const urls = trendii.blacklistedUrls;
        for (let i = 0; i < urls.length; i++) {
            if (window.location.href.indexOf(urls[i]) >= 0) {
                isWhiteListed = false;
                break;
            }
        }
    }
    return isWhiteListed;
};

trendii.appendJavacriptToHead = function () {
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

trendii.setAdTemplates = async function (templateURL) {
    try {
        const response = await fetch(templateURL);
        if (!response.ok) {
            trendii.console.error("Ad template not found.");
            return false;
        }
        const adDOM = new DOMParser().parseFromString(await response.text(), "text/html");
        trendii.template = {};
        const allElements = adDOM.querySelectorAll("[selector]");
        let selector;
        for (let i = 0; i < allElements.length; i++) {
            selector = allElements[i].getAttribute("selector");
            trendii.template[selector] = allElements[i].innerHTML;
        }
        let html;
        if (!trendii.template.adHeader) {
            trendii.template.adHeader = "";
        }
        if (!trendii.template.adHeaderFloating) {
            trendii.template.adHeaderFloating = "";
        }
        if (!trendii.template.adHeaderFloatingMobile) {
            trendii.template.adHeaderFloatingMobile = "";
        }
        for (var key in trendii.template) {
            if (trendii.template.hasOwnProperty(key)) {
                html = trendii.template[key].replace("##AD_HEADER_HTML##", trendii.template.adHeader);
                html = html.replace("##AD_HEADER_FLOATING_HTML##", trendii.template.adHeaderFloating);
                html = html.replace("##AD_HEADER_FLOATING_HTML_MOBILE##", trendii.template.adHeaderFloatingMobile);
                html = html.replace('##on_sale_visible##=""', 'style="display: ##ON_SALE_VISIBLE##;"');
                trendii.template[key] = html;
            }
        }
        return true;
    } catch (err) {
        trendii.console.error(err);
        return false;
    }
};

trendii.startAdGenerationProcess = async function (templateURL) {
    try {
        trendii.advertiserLog = [];
        trendii.pacingValue = 0;
        trendii.intersectionIndex = 0;
        trendii.intersectionIndexFloating = 0;
        trendii.isFloatingAdContainerRendered = false;
        trendii.isMobileDevice = trendii.adsWindow.innerWidth <= trendii.globals.MOBILE_WIDTH;
        trendii.appendJavacriptToHead();
        if (!trendii.setAdTemplates(templateURL)) {
            return;
        }
        trendii.imageIntersectionObserver;
        trendii.imageIntersectionObserverFloating;
        const options = {
            rootMargin: "0px",
            threshold: .1
        };
        if (trendii.adsWindow.TrendiiIntersectionObserver) {
            trendii.imageIntersectionObserver = new trendii.adsWindow.TrendiiIntersectionObserver(trendii.handleImageIntersectionEntries, options);
            if (trendii.isFloatingAds) {
                trendii.imageIntersectionObserverFloating = new trendii.adsWindow.TrendiiIntersectionObserver(trendii.handleImageIntersectionEntriesFloating, options);
            }
        } else {
            trendii.imageIntersectionObserver = new IntersectionObserver(trendii.handleImageIntersectionEntries, options);
            if (trendii.isFloatingAds) {
                trendii.imageIntersectionObserverFloating = new IntersectionObserver(trendii.handleImageIntersectionEntriesFloating, options);
            }
        }
        let allParentEls = Array.from(trendii.adsDOM.querySelectorAll(trendii.isMobileDevice ? trendii.MOBILE_IMAGE_GROUP_PARENT_TAG : trendii.DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
        trendii.console.log("Fetched all parents element.", allParentEls);
        trendii.pacingValue = trendii.getPacingValue(allParentEls.length);
        for (let i = 0; i < allParentEls.length; i++) {
            trendii.imageIntersectionObserver.observe(allParentEls[i]);
            if (trendii.isFloatingAds) {
                trendii.imageIntersectionObserverFloating.observe(allParentEls[i]);
            }
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.handleImageIntersectionEntries = function (entries, observer) {
    try {
        for (let i = 0; i < entries.length; i++) {
            trendii.console.log("Image intersection called for below image ads.");
            trendii.handleImageIntersectionEntry(entries[i], observer, false);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.handleImageIntersectionEntriesFloating = function (entries, observer) {
    try {
        for (let i = 0; i < entries.length; i++) {
            trendii.console.log("Image intersection called for floating ads.");
            trendii.handleImageIntersectionEntry(entries[i], observer, true);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.handleImageIntersectionEntry = async function (entry, observer, isForFloating) {
    try {
        if (entry.isIntersecting) {
            const visibleElement = entry.target;
            if (!isForFloating) {
                observer.unobserve(entry.target);
                trendii.console.log("Observer unregistered for ", visibleElement);
            }
            if (isForFloating !== true && visibleElement.getAttribute("data-is-trendii-ad")) {
                if (trendii.isLogViewImpression) {
                    const impressionId = visibleElement.getAttribute("data-trendii-ad-impression-id");
                    if (impressionId === undefined) {
                        trendii.console.error("Impression id not found.");
                        return;
                    }
                    trendii.console.log("API called to send impressions for ad.");
                    const creativeId = visibleElement.getAttribute("data-trendii-ad-creative-id");
                    const productsIds = visibleElement.getAttribute("datat-trendii-ad-products-id");
                    const requestBody = {
                        impressionId: impressionId,
                        creativeId: creativeId,
                        deviceType: trendii.isMobileDevice ? "MOBILE" : "PC",
                        products: productsIds ? productsIds.split(",") : [],
                        nativeSdkId: trendii.nativeSdkId,
                        publisherClientId: trendii.publisherClientId
                    };
                    trendii.setViewImpression(requestBody);
                }
                return;
            }
            if (isForFloating === true && trendii.isFloatingAdGenerated(visibleElement)) {
                trendii.showFloatingAd(visibleElement);
                return;
            }
            const intersectionIndex = isForFloating ? trendii.intersectionIndexFloating++ : trendii.intersectionIndex++;
            trendii.console.log("API called to fetch products.");
            const fetchedImages = trendii.getImageURLsWithCount(visibleElement);
            const requestBody = {
                webpageUrl: trendii.adsWindow.location.href,
                imageUrls: fetchedImages.urls,
                publisherId: trendii.globals.PUBLISHER_ID,
                publisherClientId: trendii.publisherClientId
            };
            const response = await trendii.fetchProducts(requestBody);
            const startTime = performance.now();
            if (!(response !== "" && response.success && response.success === true && response.payload && response.payload.length > 0)) {
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
            if (!trendii.canShowAdForAdvertiser(imageCreative.advertiserName, intersectionIndex, isForFloating)) {
                trendii.console.log(`Maximum ads generated for ${imageCreative.advertiserName}. (Floating: ${isForFloating})`);
                return;
            }
            imageCreative.productsId = trendii.getAllProductsId(imageCreative.products);
            if (isForFloating === true) {
                trendii.generateFloatingAdHtml(imageCreative);
            } else {
                trendii.generateAdHtml(imageCreative);
            }
            if (imageCreative.adHtml === undefined || imageCreative.adHtml === null) {
                trendii.console.log("Ad html not generated.");
                return;
            }
            trendii.console.log("Ad html generated.");
            if (isForFloating) {
                visibleElement.setAttribute("data-trendii-floating-ad-generated", true);
                imageCreative.adHtml.setAttribute("data-is-trendii-floating-ad", true);
                imageCreative.adHtml.setAttribute("data-trendii-floating-ad-impression-id", imageCreative.impressionId);
                imageCreative.adHtml.setAttribute("data-trendii-floating-ad-creative-id", imageCreative.creativeId);
                imageCreative.adHtml.setAttribute("data-trendii-floating-ad-products-id", imageCreative.productsId);
                imageCreative.adHtml.style.zIndex = Number.MAX_SAFE_INTEGER;
            } else {
                imageCreative.adHtml.setAttribute("data-is-trendii-ad", true);
                imageCreative.adHtml.setAttribute("data-trendii-ad-impression-id", imageCreative.impressionId);
                imageCreative.adHtml.setAttribute("data-trendii-ad-creative-id", imageCreative.creativeId);
                imageCreative.adHtml.setAttribute("data-trendii-ad-products-id", imageCreative.productsId);
            }
            if (trendii.isFloatingAds === true) {
                trendii.appendFloatingAdHtml(imageCreative, visibleElement);
            } else {
                trendii.appendAdHtml(imageCreative, visibleElement);
            }
            trendii.console.log("Appended ad html.");
            var endTime = performance.now();
            trendii.console.log("Time taken: " + (endTime - startTime) + " ms.");
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.generateAdHtml = function (imageCreative) {
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
                        productItemsHtml += trendii.getSliderProductHtml(products[i]);
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

trendii.appendAdHtml = function (imageCreative, visibleElement) {
    try {
        const captionElement = visibleElement.getElementsByTagName(trendii.isMobileDevice ? trendii.MOBILE_IMAGE_CAPTION_TAG : trendii.DESKTOP_IMAGE_CAPTION_CLASS)[0];
        if (captionElement !== undefined) {
            captionElement.after(imageCreative.adHtml);
        } else {
            visibleElement.appendChild(imageCreative.adHtml);
        }
        if (imageCreative.isSliderTemplate) {
            trendii.registerSlider(imageCreative);
        }
        trendii.imageIntersectionObserver.observe(imageCreative.adHtml);
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.registerSlider = function (imageCreative) {
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
            testSlider.on("mounted", function () {
                trendii.console.log("Splide mounted.");
            });
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.generateFloatingAdHtml = function (imageCreative) {
    try {
        const products = imageCreative.products.slice(0, 2);
        const productCount = products.length;
        imageCreative.isSliderTemplate = false;
        let adWrapper = trendii.getFloatingAdWrapperHtml(trendii.getRetailerLogoPath(`${imageCreative.advertiserName.toLowerCase()}.png`), imageCreative.advertiserName, productCount);
        for (let i = 0; i < productCount; i++) {
            adWrapper = adWrapper.replace(`##PRODUCT_ITEM_HTML_${i + 1}##`, trendii.getFloatingProductHtml(products[i], productCount));
        }
        imageCreative.adHtml = new DOMParser().parseFromString(adWrapper, "text/html").getElementById(trendii.globals.HTML_TEMPLATE_AD_WRAPPER_ID);
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.appendFloatingAdHtml = function (imageCreative, visibleElement) {
    try {
        trendii.adsDOM.body.appendChild(imageCreative.adHtml);
        visibleElement.setAttribute("data-trendii-floating-ad-find-id", imageCreative.impressionId);
        trendii.showFloatingAd(visibleElement);
        if (trendii.isLogViewImpression) {
            trendii.console.log("API called to send impressions for ad.");
            const requestBody = {
                impressionId: imageCreative.impressionId,
                deviceType: trendii.isMobileDevice ? "MOBILE" : "PC",
                creativeId: imageCreative.creativeId,
                products: imageCreative.productsId || [],
                nativeSdkId: trendii.nativeSdkId,
                publisherClientId: trendii.publisherClientId
            };
            trendii.setViewImpression(requestBody);
        }
    } catch (err) {
        trendii.console.error(err);
    }
};

trendii.getAllProductsId = function (products) {
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

trendii.isFloatingAdGenerated = function (element) {
    try {
        return element.getAttribute("data-trendii-floating-ad-generated");
    } catch (err) {
        trendii.console.error(err);
        return false;
    }
};

trendii.showFloatingAd = function (visibleElement) {
    try {
        const selector = trendii.isMobileDevice ? ".trendii-mobile-floating-ad-wrapper" : ".trendii-floating-ad-wrapper";
        const divsToHide = trendii.adsDOM.querySelectorAll(selector);
        for (var i = 0; i < divsToHide.length; i++) {
            divsToHide[i].style.display = "none";
        }
        const impressionId = visibleElement.getAttribute("data-trendii-floating-ad-find-id");
        const divToShow = trendii.adsDOM.querySelectorAll(`[data-trendii-floating-ad-impression-id='${impressionId}']`)[0];
        divToShow.style.display = "block";
    } catch (err) {
        trendii.console.error(err);
    }
};

const element = window.top.document.createElement("div");

element.setAttribute("data-trendii-init-div", true);

element.type = "text/html";

window.top.document.body.appendChild(element);