const API_GET_SIMILAR_PRODUCTS = "https://flashtalking-sandbox-f6i4ayd3wa-ts.a.run.app/?site=16230&banner=300x600&p1=2487&p2=1636&p3=12345";
const SUPPORTED_DIMENSIONS = ["160X600"];
class Trendii {
    constructor(options) {
        this.options = options;
        this.width = options.width;
        this.height = options.height;
        this.AD_DIMENSION = `${this.width}X${this.height}`;
        this.checkSupportedDimensions(this.AD_DIMENSION);
        this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = `trendii-products-container-${this.AD_DIMENSION}`;
        // this.API_GET_TRENDII_AD_TEMPLATE = `http://localhost:8081/Trendii-${this.AD_DIMENSION}.html`;
        this.API_GET_TRENDII_AD_TEMPLATE = `https://rahul-tatva.github.io/Trendii-${this.AD_DIMENSION}.html`;
        this.feedProducts = [];
        this.intersectionObserver = this.createObserverForCurrentPageVisibleImage();
        this.registerImagesToObserve();
        this.getHTMLTemplate();
    }

    checkSupportedDimensions = (inputDimensions) => {
        if (!SUPPORTED_DIMENSIONS.includes(inputDimensions)) {
            throw new Error("TRENDii Ad Dimensions must be from supported sizes only.");
        }
    };
    log(message) {
        // console.log(message);
    }
    createOrGetAdContainer = () => {
        this.trendiiAdContainerId = "trendii-ads-iframe";
        const trendiiAdIframe = document.getElementById(this.trendiiAdContainerId);
        if (trendiiAdIframe) return trendiiAdIframe;
        else {
            const iframe = document.createElement('iframe');
            iframe.id = "trendii-ads-iframe";
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

    appendAdIFrameToContainer = (adIframe) => {
        // TO-DO: Throw error if the containerId not found
        // append iframe to container or fixed position
        if (this.options?.adContainerId) {
            const adContainerEl = document.getElementById(this.options.adContainerId);
            adContainerEl.appendChild(adIframe);
        } else {
            // to make iframe sticky
            adIframe.style = "overflow: hidden; position: fixed; right: 0px; bottom: 0px;";
            document.body.appendChild(adIframe);
        }
    };
    parseHTMLStringToDocument = (htmlString, feedProducts, currentImageSrc) => {
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
    updateSliderContainerWithAdProducts = (adSliderContainerEl, feedProducts, currentImageSrc) => {
        // debugger;
        // reset the container
        adSliderContainerEl.innerHTML = "";
        this.createProductsSlider(adSliderContainerEl, feedProducts, currentImageSrc);
        // debugger;
        // return parsedHtmlDocument.documentElement.innerHTML;
    };
    bindAdProductsToAdIframe = (currentImageSrc) => {
        const iframe = this.createOrGetAdContainer();
        debugger;
        // check if iframe consists of the ad container already
        const adSliderContainerEl = iframe.contentWindow?.document.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
        if (adSliderContainerEl) {
            // only update products container
            this.updateSliderContainerWithAdProducts(adSliderContainerEl, this.feedProducts, currentImageSrc);
            debugger;
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
    getHTMLTemplate = () => {
        axios
            .get(this.API_GET_TRENDII_AD_TEMPLATE)
            .then(response => {
                // debugger;
                this.htmlString = response.data;
                // console.log(response.data);
            })
            .catch(error => console.error(error));
    };
    createProductsSlider = (productsContainerEl, feedProducts, currentImageSrc) => {
        debugger;
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
    createSliderProductItemElement = (product) => {
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
    };
    // to fetch the image's ad products from trendii api
    getAdProductsByImageURL = (imageSource = "", onSuccessCallback, onErrorCallback) => {
        axios
            .get(API_GET_SIMILAR_PRODUCTS)
            .then(response => {
                // console.log(response.data);
                // this.productsFeed = response.data;
                const imageSourceWithAdProducts = {
                    imageSource: imageSource,
                    adProductsData: response.data.result.map(x => {
                        x.localimage = imageSource;
                        return x;
                    }),
                };
                // create an array where key is imageSource and values are adProductsData
                this.feedProducts.push(imageSourceWithAdProducts);
                if (typeof onSuccessCallback === "function") onSuccessCallback(response);
            })
            .catch(error => {
                console.error(error);
                if (typeof onErrorCallback === "function") onErrorCallback(error);
            });
    };
    handleDOMLoaded = () => {
        // TO DO throw error if image selector not present
        const allImageElements = document.querySelectorAll(this.options.adImagesSelector);
        // debugger;
        const initialLoadImageSource = allImageElements[0].src;
        allImageElements.forEach((imgEl) => {
            // debugger;
            const imageSourceURL = imgEl.src;
            this.intersectionObserver.observe(imgEl);
            // fetch the ad products using api for all the products
            this.getAdProductsByImageURL(imageSourceURL, () => {
                debugger;
                if (this.feedProducts.length === 1) {
                    this.bindAdProductsToAdIframe(initialLoadImageSource);
                }
            });
        });
    };
    registerImagesToObserve = () => {
        document.addEventListener("DOMContentLoaded", this.handleDOMLoaded);
        // window.addEventListener("scroll", function () {
        //     // debugger;
        // });
    };
    handleIntersectionEntries = (entries, observer) => {
        // debugger;
        entries.forEach((entry) => {
            console.log(entry);
            // debugger;
            // check if image el is visible in screen/window
            if (entry.isIntersecting) {
                //FOR MOBILE DEVICE
                // if (
                //     typeof window.orientation !== "undefined" &&
                //     entry.target.width >= 200 &&
                //     entry.target.height >= 300
                // ) {
                //     debugger;
                //     // first hide the ads
                //     document.getElementById("trendiiads-float-right").hidden = true;
                //     const currentSrc = entry.target?.currentSrc || "";
                //     var mainSrc = entry.target?.dataset?.src || "";
                //     // adData.getMatchedData(currenSrc, mainSrc);
                //     console.log(currentSrc);
                //     // FOR DESKTOP DEVICE
                // } else {
                //     if (
                //         entry.target.width >= 400 &&
                //         entry.target.width <= 700 &&
                //         entry.target.height >= 450
                //     ) {
                //         debugger;
                //         const currentSrc = entry.target?.currentSrc || "";
                //         var mainSrc = entry.target?.dataset?.src || "";
                //         console.log(currentSrc);
                //         // adData.getMatchedData(currenSrc, mainSrc);
                //     }
                // }
                const visibleImageSrc = entry.target?.currentSrc || "";
                console.log(visibleImageSrc);
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
            }
        });
    };
    createObserverForCurrentPageVisibleImage() {
        // debugger;
        /**
         * Checking whether image is there to check the data
         */
        let intersectionObserver;
        if (!!window.IntersectionObserver) {
            const options = {
                rootMargin: "0px 0px -200px 0px",
                // threshold: 0.10,
            };
            intersectionObserver = new IntersectionObserver(this.handleIntersectionEntries, options);
        }
        return intersectionObserver;
    }
}