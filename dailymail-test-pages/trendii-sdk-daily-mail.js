const API_GET_AD_PRODUCTS =
  "https://flashtalking-sandbox-f6i4ayd3wa-ts.a.run.app/?site=16230&banner=300x600&p1=12345&p2=12345&p3=12345";
// const API_GET_AD_PRODUCTS =
//   "https://beeswax-creative-f6i4ayd3wa-ts.a.run.app/webImageProcess";
const SUPPORTED_DIMENSIONS = ["160X600", "300X600"];
const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
const PUBLISHER_NAME = "DAILYMAIL";
// ad by default to below this class element
const DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share";
const IMAGE_GROUP_PARENT_DIV_CLASS = ".mol-img-group";
const DAILY_MAIL_IMAGE_CAPTION_CLASS = 'imageCaption';
class TRENDiiAd {
  constructor(options) {
    debugger;
    this.loadStyleSheet("https://cdn.trendii.com/assets/splide-core.min.css");
    this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/daily-mail.css");
    this.loadScript("https://unpkg.com/axios/dist/axios.min.js");
    this.loadScript("https://cdn.trendii.com/assets/splide.min.js");
    // <link rel="stylesheet" href="./sdk-html-templates/daily-mail.css"></link>
    // options initialization
    this.options = options;
    this.width = options?.width || 0;
    this.height = options?.height || 0;
    // native ad options to by pass iframes
    this.isNativeAd = options?.isNativeAd || false;
    this.adPosition = options?.adPosition || "bottom";
    this.brandName = options?.brandName || "";
    this.blogContainerSelector = options?.blogContainerSelector;
    debugger;


    // variable needed to store some data and info
    this.feedProducts = [];
    this.htmlString;
    this.allImageElements;
    this.currentlyVisibleImageSrcURL = null;
    this.intersectionObserver;
    this.feedProductsWithGeneratedAds = [];

    // native ads constants
    this.GET_NATIVE_AD_TEMPLATE = `https://rahul-tatva.github.io/sdk-html-templates/Products-Slider.html`;
    this.nativeAdHTMLString = null;
    this.GET_NATIVE_AD_PRODUCT = `https://beeswaxcreatives.trendii.com/img-creatives`;
    this.NATIVE_AD_HTML_TEMPLATE_WRAPPER_ID = "trendii-native-ad-wrapper";
    this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID = "trendii-sdk-ad-products-container";



    //NATIVE AD CODE START
    // document.addEventListener("DOMContentLoaded", this.handleDOMLoaded.bind(this));
    // window.addEventListener("load", () => { });



    // window.addEventListener("load", () => {ss
    document.addEventListener("DOMContentLoaded", () => {
      debugger;
      this.getAllImagesFromDOM();
      const requestOptions = {
        method: "GET",
      };
      fetch(this.GET_NATIVE_AD_TEMPLATE, requestOptions)
        .then((response) => response.text())
        .then((response) => {
          debugger;
          // debugger;
          this.nativeAdHTMLString = response;
          // console.log(response.data);
          // this.getProductsForAllImages();
          // this.appendAdContainersToImages();
          this.getProductsForAllImages();
        })
        .catch((error) => {
          console.error(error);
          typeof onErrorCallback === "function" && onErrorCallback(error);
        });



    });
  }
  loadStyleSheet(url) {
    var styles = document.createElement('link');
    styles.type = "text/css";
    styles.rel = "stylesheet";
    styles.href = url;
    document.head.appendChild(styles);
  }
  loadScript(url) {
    document.body.appendChild(document.createElement("script")).src = url;
  }
  getAllImagesFromDOM() {
    debugger;
    // TO DO throw error if image selector not present
    this.allImageElements = document.querySelectorAll(this.options.adImagesSelector);
    this.allValidImageSrcArray = [];
    // this.allValidImageSrcArray = Array.from(document.querySelectorAll('.blkBorder.img-share.b-loaded'))
    //   .map(img => img.getAttribute("src"));
    // a.push(...b);
    const otherValues = Array.from(document.querySelectorAll(DAILY_MAIL_IMAGE_SELECTOR_CLASS))
      .map(img => img.getAttribute("data-src")).filter(x => x);
    this.allValidImageSrcArray.push(...otherValues);
    console.log(this.allValidImageSrcArray);
  };
  getProductsForAllImages() {
    debugger;
    // const imageurls = [];
    // this.allImageElements.forEach(imageEl => {
    //   imageurls.push(imageEl.src);
    // });
    const requestBody = {
      // "webpageUrl": "https://rahul-tatva.github.io/fashion-blog-below-ads.html",//window.location.href,
      "webpageUrl": window.location.href,
      "imageUrls": this.allValidImageSrcArray
    };
    // const requestOptions = {
    //   method: "POST",
    //   url: this.GET_NATIVE_AD_PRODUCT,
    //   data: { ...requestBody },
    // };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(requestBody);
    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };
    fetch(this.GET_NATIVE_AD_PRODUCT, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        debugger;
        // debugger;
        this.feedProducts = response;
        // console.log(response.data);
        // this.appendAdContainersToImages();
        // const domParser = new DOMParser();
        // const parsedHtmlDocumentEl = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
        // // here the container id should be dynamic for each ads sizes
        // this.productsContainerEl = parsedHtmlDocumentEl.getElementById(
        //   this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
        // );
        // this.productsContainerEl.innerHTML = "";
        this.createAdTemplatesForAllProducts();
        this.getAllParentImageGroupClass();
        console.log(this.feedProducts);
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
    // axios(requestOptions)
    //   .then((response) => {
    //     debugger;
    //     // debugger;
    //     this.feedProducts = response.data;
    //     // console.log(response.data);
    //     this.appendAdContainersToImages();
    //     this.getAllParentImageGroupClass();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     typeof onErrorCallback === "function" && onErrorCallback(error);
    //   });
    //  this.feedProducts = window.FEED_PRODUCTS;
  }
  createAdTemplatesForAllProducts() {
    debugger;
    this.feedProducts.payload.map((imageData) => {
      debugger;
      if (imageData?.products.length > 0) {
        const ad = this.createAdsForAllProducts(imageData?.products);
        imageData.generatedAdHTML = ad;
        imageData.generatedAdString = ad.innerHTML;
      }
    });
  }
  createAdsForAllProducts(products) {
    debugger;
    const domParser = new DOMParser();
    const templatesDOM = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
    // here the container id should be dynamic for each ads sizes
    let productsContainerEl = templatesDOM.getElementById(
      this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
    );
    productsContainerEl.innerHTML = "";
    debugger;
    products.forEach((product) => this.createSliderItemProduct(product, productsContainerEl));
    const resultantAdWrapper = templatesDOM.getElementById(
      this.NATIVE_AD_HTML_TEMPLATE_WRAPPER_ID
    );
    return resultantAdWrapper;
  }
  getAllParentImageGroupClass() {
    const allParentElements = document.querySelectorAll(IMAGE_GROUP_PARENT_DIV_CLASS);
    this.parentImageGroupElements = Array.from(allParentElements);
    console.log(this.parentImageGroupElements);
    this.parentImageGroupElements.forEach((parentEl) => {
      console.log(parentEl.getElementsByTagName('img'));
      const takeFirstImageEl = parentEl.getElementsByTagName('img')[0];
      let imageSrcToShowAd = takeFirstImageEl.src;
      let imageDataSrcToShowAd = takeFirstImageEl.getAttribute("data-src");
      let findImageData = this.feedProducts.payload
        .find((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
      if (!findImageData) {
        const takeSecondImageEl = parentEl.getElementsByTagName('img')[1];
        if (takeSecondImageEl) {
          imageSrcToShowAd = takeSecondImageEl.src;
          imageDataSrcToShowAd = takeSecondImageEl.getAttribute("data-src");
          findImageData = this.feedProducts.payload
            .find((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
        }
      }
      console.log(imageSrcToShowAd);
      console.log(imageDataSrcToShowAd);
      console.log(findImageData);
      // if (findImageData?.imageUrl) {
      //   // parentEl.getElementsByClassName('imageCaption')[0].after(findImageData.generatedAd);
      //   // const div = document.createElement('div');
      //   // div.style.background = "yellow";
      //   // parentEl.getElementsByClassName('imageCaption')[0].after(div);

      //   const div = document.createElement('div');
      //   div.style.background = "yellow";
      //   div.style.height = "100px";
      //   parentEl.getElementsByClassName('imageCaption')[0].after(div);
      // }
      debugger;
      const div = document.createElement('div');
      div.style.background = "yellow";
      div.style.height = "100px";
      parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(div);
    });
    // document.querySelectorAll(".mol-img-group")[0].getElementsByTagName('img');
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0];
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0].after(t);
  }
  getAllAdContainersFromDOM() {
    this.allAdContainers = document.querySelectorAll(this.options.adContainer);
  }
  appendAdContainersToImages() {
    debugger;
    this.allImageElements.forEach(imageEl => {
      this.adContainer = document.createElement("DIV");
      this.adContainer.classList.add("ad-container");
      // this.adContainer.style.background = "yellow";
      // adContainer.innerHTML = "tesetste";
      const imageSrc = imageEl.src;
      debugger;
      this.renderAdInsideTheAdContainer(imageSrc, this.adContainer);
      debugger;
      imageEl.after(this.adContainer);
      debugger;
      // imageEl.parentNode.insertAdjacentHTML(sliderItem, imageEl.nextSibling);
      // imageEl.insertAdjacentHTML("afterend", sliderItem);
      // imageEl.parentNode.appendChild(sliderItem);
    });
    new Splide('.splide', {
      type: 'loop',
      // perPage: 6,
      pagination: false,
      gap: 10,
      autoWidth: true,
      // width: 400,
      // fixedWidth: 200,
    }).mount();
  }
  renderAdInsideTheAdContainer(imageSrc, adContainer) {
    const domParser = new DOMParser();
    const parsedHtmlDocumentEl = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
    // here the container id should be dynamic for each ads sizes
    this.productsContainerEl = parsedHtmlDocumentEl.getElementById(
      this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
    );
    this.productsContainerEl.innerHTML = "";
    debugger;
    this;
    this.generateAdsForAllProducts(window.FEED_PRODUCTS, imageSrc, parsedHtmlDocumentEl).bind(this);

    const generatedNativeAd = parsedHtmlDocumentEl.body;
    adContainer.innerHTML = generatedNativeAd.innerHTML;
  }
  log(message) {
    console.log(message);
  }
  getNativeAdTemplateHTML(onSuccessCallback, onErrorCallback) {
    const requestOptions = {
      method: "GET",
      url: this.GET_NATIVE_AD_TEMPLATE,
    };
    axios(requestOptions)
      .then((response) => {
        debugger;
        // debugger;
        this.nativeAdHTMLString = response.data;
        // console.log(response.data);
        typeof onSuccessCallback === "function" && onSuccessCallback(response);
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
  }
  generateAdsForAllProducts(feedResponse, templatesDOM) {
    // if feed does not deliver an empty response
    if (feedResponse !== "") {
      if (feedResponse?.success === true) {
        debugger;
        this.feedProductsWithGeneratedAds = feedResponse.payload.map((imageData) => {
          if (imageData?.imageUrl && imageData.products.length > 0) {
            var productsContainer = templatesDOM.getElementById(AD_PRODUCTS_CONTAINER);
            imageData.products.forEach((product) => this.createSliderItemProduct(product, productsContainer));
            imageData.generatedAd = templatesDOM;
            imageData.generatedString = templatesDOM.innwHtml;
          }
          return imageData;
        });
      } else {
        console.log("error returned");
      }
    } else {
      // empty response from feed
      console.log("empty feed response");
    }
  }
  createSliderItemProduct(product, productsContainer) {
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
    productItem.appendChild(productDetailsWrapper);
    productDetailsWrapper.addEventListener("click", function () {
      window.open(product.url, "_blank");
    });
    const productName = document.createElement("B");
    productName.classList.add("brand-name");
    productName.innerHTML = this.brandName;
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
  }
}

(function () {
  // var foo = 3;
  // console.log(foo);


  // native ad options to implement
  const options = {
    adImagesSelector: ".ad-image",
    isNativeAd: true,
    // adPosition: "bottom", // "bottom" || "left" || "right" || "top"
    brandName: "TRENDii"
  };

  var myTrendii = new TRENDiiAd(options);
  myTrendii.log("test log");
})();

