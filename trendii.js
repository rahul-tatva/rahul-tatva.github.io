// const API_GET_AD_PRODUCTS = "https://flashtalking-sandbox-f6i4ayd3wa-ts.a.run.app/?site=16230&banner=300x600&p1=2487&p2=1636&p3=12345";
const API_GET_AD_PRODUCTS = "https://beeswax-creative-f6i4ayd3wa-ts.a.run.app/webImageProcess";
const SUPPORTED_DIMENSIONS = ["160X600"];
class TRENDiiAd {
    constructor(options) {
        this.options = options;
        this.width = options?.width;
        this.height = options?.height;
        this.feedProducts = [];
        this.htmlString;
        this.currentlyVisibleImageSrcURL = null;
        this.intersectionObserver;
        this.AD_DIMENSION = `${this.width}X${this.height}`;
        this.checkSupportedDimensions();
        this.TRENDII_AD_CONTAINER_ID;
        this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = `trendii-products-container-${this.AD_DIMENSION}`;
        // this.API_GET_TRENDII_AD_TEMPLATE = `http://localhost:8081/Trendii-${this.AD_DIMENSION}.html`;
        this.API_GET_TRENDII_AD_TEMPLATE = `https://rahul-tatva.github.io/Trendii-${this.AD_DIMENSION}.html`;

        // initial setup
        this.createObserverForCurrentVisibleImage();
        this.getAdTemplateHTML();
        this.registerImageElementsToObserveVisibility();
    }
    checkSupportedDimensions() {
        if (!SUPPORTED_DIMENSIONS.includes(this.AD_DIMENSION)) {
            throw new Error("TRENDii Ad Dimensions must be from supported sizes only.");
        }
    };
    log(message) {
        console.log(message);
    };
    createOrGetAdContainer() {
        this.TRENDII_AD_CONTAINER_ID = "trendii-ads-iframe";
        const trendiiAdIframe = document.getElementById(this.TRENDII_AD_CONTAINER_ID);
        if (trendiiAdIframe) return trendiiAdIframe;
        else {
            const iframe = document.createElement('iframe');
            iframe.id = this.TRENDII_AD_CONTAINER_ID;
            iframe.title = "Trendii Ads";
            iframe.scrolling = "no";
            iframe.frameBorder = 0;
            iframe.width = this.width;
            iframe.height = this.height;
            // iframe.style.display = "none";
            // iframe.onload = function () {
            //     // alert('myframe is loaded');
            //     // var element = myFrame.contentWindow.document.getElementById("trendii-products-container-300X600");
            //     // const productsContainer = document.getElementById("trendii-products-container-300X600");
            //     // element.style.display = "none";
            //     // to make iframe sticky
            //     // iframe.style = "overflow: hidden; position: fixed; top: 0px; right: 0px; bottom: 0px;";
            // };
            return iframe;
        }
    };
    appendAdIFrameToContainer(adIframe) {
        // TO-DO: Throw error if the containerId not found
        // append iframe to container or fixed position
        if (this.options?.adContainerId) {
            const adContainerEl = document.getElementById(this.options.adContainerId);
            adContainerEl.appendChild(adIframe);
        } else {
            // to make iframe sticky and append to body
            adIframe.style = "overflow: hidden; position: fixed; right: 0px; bottom: 0px;";
            document.body.appendChild(adIframe);
        }
    };
    parseHTMLStringToDocument(htmlString, feedProducts, currentImageSrc) {
        // debugger;
        const domParser = new DOMParser();
        const parsedHtmlDocumentEl = domParser.parseFromString(htmlString, "text/html");
        // here the container id should be dynamic for each ads sizes
        var productsContainerEl = parsedHtmlDocumentEl.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
        productsContainerEl.innerHTML = "";
        this.createProductsSlider(productsContainerEl, feedProducts, currentImageSrc);
        // debugger;
        return parsedHtmlDocumentEl.documentElement.innerHTML;
    };
    updateSliderContainerWithAdProducts(adSliderContainerEl, feedProducts, currentImageSrc) {
        // debugger;
        // reset the container
        adSliderContainerEl.innerHTML = "";
        this.createProductsSlider(adSliderContainerEl, feedProducts, currentImageSrc);
        // debugger;
        // return parsedHtmlDocument.documentElement.innerHTML;
    };
    bindAdProductsToAdIframe(currentImageSrc) {
        const iframe = this.createOrGetAdContainer();
        // debugger;
        // check if iframe consists of the ad container already
        const adSliderContainerEl = iframe.contentWindow?.document.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
        if (adSliderContainerEl) {
            // only update products container
            this.updateSliderContainerWithAdProducts(adSliderContainerEl, this.feedProducts, currentImageSrc);
            // debugger;
            const src = iframe.contentDocument.documentElement.innerHTML;
            iframe.srcdoc = src;
            // iframe.contentDocument.location.reload(true);
        }
        // create from scratch
        else {
            iframe.srcdoc = this.parseHTMLStringToDocument(this.htmlString, this.feedProducts, currentImageSrc);
            this.appendAdIFrameToContainer(iframe);
        }
    };
    getAdTemplateHTML(onSuccessCallback, onErrorCallback) {
        axios
            .get(this.API_GET_TRENDII_AD_TEMPLATE)
            .then(response => {
                // debugger;
                this.htmlString = response.data;
                // console.log(response.data);
                if (typeof onSuccessCallback === "function") onSuccessCallback(response);
            })
            .catch((error) => {
                console.error(error);
                if (typeof onErrorCallback === "function") onErrorCallback(error);
            });
    };
    createProductsSlider(productsContainerEl, feedProducts, currentImageSrc) {
        // debugger;
        let sliderItemListEl;
        const currentImageData = feedProducts.find(x => x.imageSource === currentImageSrc);
        const adProducts = currentImageData?.adProductsData;
        // TO-DO: Not found any ad products for the particular image
        if (adProducts?.length > 0) {
            for (let index = 0; index < adProducts.length; index++) {
                const product = adProducts[index];
                if (index % 4 === 0) {
                    // create a new list element
                    sliderItemListEl = document.createElement("LI");
                    sliderItemListEl.classList.add("splide__slide");
                }
                const productItemEl = this.createSliderProductItemElement(product);
                sliderItemListEl.appendChild(productItemEl);
                productsContainerEl.appendChild(sliderItemListEl);
            }
        }
    };
    createSliderProductItemElement(product) {
        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItem.style.backgroundImage = `url(${product.image})`;

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
    };
    // to fetch the image's ad products from trendii api
    getAdProductsByImageURL(imageSource = "", onSuccessCallback, onErrorCallback) {
        const requestBody = {
            // url: imageSource,
            url: "https://images.squarespace-cdn.com/content/v1/5d7b55a7cab21367173472ca/1617021622513-QDKPHMGC7Q77PSLTU7NO/ke17ZwdGBToddI8pDm48kMhuiFqOarpg5ZSSgOuL4KxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIfwzeWaN1u0xgydZbMMaNw0yictQozOKVrF7K98f8aA0KMshLAGzx4R3EDFOm1kBS/20-46-1-e409ebc018a94120833d9bf6b7eb1047.jpg"
        };
        axios
            .post(API_GET_AD_PRODUCTS, requestBody)
            .then((response) => {
                // console.log(response.data);
                // this.productsFeed = response.data;
                const result = response.data;
                const imageSourceWithAdProducts = {
                    imageSource: imageSource,
                    // adProductsData: response.data.result.map(x => {
                    //     x.localimage = imageSource;
                    //     return x;
                    // }),
                    adProductsData: result.payload.list,
                };
                // create an array where key is imageSource and values are adProductsData
                this.feedProducts.push(imageSourceWithAdProducts);
                // if the current visible image is stored and the data is fetched
                if (this.currentlyVisibleImageSrcURL === imageSource && this.htmlString) {
                    this.bindAdProductsToAdIframe(this.currentlyVisibleImageSrcURL);
                }
                if (typeof onSuccessCallback === "function") onSuccessCallback(response);
            })
            .catch((error) => {
                console.error(error);
                if (typeof onErrorCallback === "function") onErrorCallback(error);
            });
    };
    handleDOMLoaded() {
        // debugger;
        // TO DO throw error if image selector not present
        const allImageElements = document.querySelectorAll(this.options.adImagesSelector);
        // debugger;
        const initialLoadImageSource = allImageElements[0].src;
        allImageElements.forEach((imgEl) => {
            // debugger;
            const imageSourceURL = imgEl.src;
            this.intersectionObserver.observe(imgEl);
            // fetch the ad products using api for all the products
            this.getAdProductsByImageURL(imageSourceURL, function () {
                // debugger;
                // if (this.feedProducts.length === 1) {
                //     this.bindAdProductsToAdIframe(initialLoadImageSource);
                // }
            });
        });
    };
    registerImageElementsToObserveVisibility() {
        document.addEventListener("DOMContentLoaded", this.handleDOMLoaded.bind(this));
    };
    handleIntersectionEntries(entries, observer) {
        // debugger;
        entries.forEach((entry) => {
            console.log(entry);
            // debugger;
            // check if image el is visible in screen/window
            if (entry.isIntersecting) {
                const visibleImageSrc = entry.target?.currentSrc || "";
                console.log(visibleImageSrc);
                this.currentlyVisibleImageSrcURL = visibleImageSrc;
                if (this.feedProducts.length > 0) {
                    this.bindAdProductsToAdIframe(visibleImageSrc);
                }
                // this.getSimilarProducts(currentImageSrc, (response) => {
                //     this.getHTMLTemplate(response.data);
                // });
                // debugger;
                // if (entry.intersectionRatio >= 1.0) {
                //     // image is fully visible in t0.75he screen
                // }
                // deregister intersection observer apis
                // observer.unobserve(entry.target);
            };
        });
    };
    createObserverForCurrentVisibleImage() {
        // debugger;
        /**
         * Checking whether image is there to check the data
         */
        if (!!window.IntersectionObserver) {
            const options = {
                rootMargin: "0px 0px 0px 0px",
                // threshold: 0.10,
            };
            this.intersectionObserver = new IntersectionObserver(this.handleIntersectionEntries.bind(this), options);
        }
    };
}