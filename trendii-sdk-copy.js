// const API_GET_AD_PRODUCTS =
//   "https://flashtalking-sandbox-f6i4ayd3wa-ts.a.run.app/?site=16230&banner=300x600&p1=12345&p2=12345&p3=12345";
const API_GET_AD_PRODUCTS =
  "https://beeswaxcreatives.trendii.com/img-creatives";
const SUPPORTED_DIMENSIONS = ["160X600", "300X600"];
const BRAND_NAME = "TRENDii";
// const STICKY_AD_CONTAINER_ID = "trendii-ad-container-sticky";
const STICKY_AD_CONTAINER_ID = "trendiiads-float-right";


const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
const PUBLISHER_NAME = "DAILY_MAIL";
// ad by default to below this class element
const BLOG_MAIN_IMAGES_SELECTOR_CLASS = ".thumb-image";
const BLOG_MAIN_IMAGES_SELECTOR_CLASS_NAME = "thumb-image";
const IMAGE_GROUP_PARENT_DIV_CLASS = ".image-block";
const DAILY_MAIL_IMAGE_CAPTION_CLASS = 'imageCaption';
const SLIDER_CLASS_TO_REPLACE = "trendiiSliderUniqueString";
const SCRIPT_ID_TO_REPLACE = "trendiiSliderUniqueString-script";
class TRENDiiAd {
  constructor(options) {
    this.loadScript("https://cdn.trendii.com/assets/splide.min.js");
    this.loadStyleSheet("https://cdn.trendii.com/assets/splide-core.min.css");
    // this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/daily-mail.css");
    this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/Products-Silder.css");


    this.options = options;
    this.width = options?.width;
    this.height = options?.height;
    this.blogContainerSelector = options?.blogContainerSelector;
    this.showAdBlock = true;
    // // debugger;
    this.feedProducts = [];
    this.nativeAdFeedProducts = [];
    this.htmlString;
    this.allImageElements;
    this.currentlyVisibleImageSrcURL = null;
    this.intersectionObserver;
    this.AD_DIMENSION = `${this.width}X${this.height}`;
    this.checkSupportedDimensions();
    this.TRENDII_AD_CONTAINER_ID = "trendii-ads-iframe";
    this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = `trendii-products-container-${this.AD_DIMENSION}`;
    // this.API_GET_TRENDII_AD_TEMPLATE = `http://localhost:8081/Trendii-${this.AD_DIMENSION}.html`;
    this.API_GET_TRENDII_AD_TEMPLATE = `https://rahul-tatva.github.io/Trendii-${this.AD_DIMENSION}-new.html`;
    // this.API_GET_TRENDII_AD_TEMPLATE = `https://cdn.trendii.com/trendii-blogs-ads/templates/Trendii-${this.AD_DIMENSION}.html`;

    // this.parentDiv = document.createElement("div");
    // this.parentDiv.setAttribute("id", "trendiiads-float-right");
    // document.body.prepend(this.parentDiv);
    // document.getElementById("trendiiads-float-right").hidden = true;

    // initial setup
    this.createObserverForCurrentVisibleImage();
    this.getAdTemplateHTML();
    this.registerImageElementsToObserveVisibility();
    if (this.blogContainerSelector) {
      window.addEventListener("scroll", function () {
        // // debugger;
        var blogContainerHeight = document
          .querySelector(this.blogContainerSelector)
          .scrollHeight;
        var topOffset = document
          .querySelector(this.blogContainerSelector)
          .offsetTop;
        var bottomHeight = document
          .querySelector(this.blogContainerSelector)
          .offsetHeight;

        var bottomOffsetDiv = topOffset + blogContainerHeight;
        var ua = navigator.userAgent.toLowerCase();
        var isAndroid = ua.indexOf("android") > -1; // Detect Android devices
        var isIos = ua.indexOf("iphone") > -1; // Detect IOS devices
        if (isAndroid || isIos) {
          if (
            window.pageYOffset <= topOffset ||
            window.pageYOffset > blogContainerHeight
          ) {
            // document.getElementById(STICKY_AD_CONTAINER_ID).hidden = true;
            const adContainer = document.getElementById(this.TRENDII_AD_CONTAINER_ID);
            if (adContainer) {
              adContainer.hidden = true;
              this.showAdBlock = false;
            }
          }
        } else {
          // console.log(window.pageYOffset);
          const finalTopLimit = topOffset - this.height;
          const finalBottomLimit = bottomOffsetDiv - (window.innerHeight / 2);
          if (window.pageYOffset <= (finalTopLimit) || window.pageYOffset > (finalBottomLimit)
          ) {
            // document.getElementById(STICKY_AD_CONTAINER_ID).hidden = true;
            const adContainer = document.getElementById(this.TRENDII_AD_CONTAINER_ID);
            if (adContainer) {
              adContainer.hidden = true;
              this.showAdBlock = false;
            }
          }
          else {
            const adContainer = document.getElementById(this.TRENDII_AD_CONTAINER_ID);
            if (adContainer) {
              adContainer.hidden = false;
              this.showAdBlock = true;
            }
          }
        }
        //   if (showAdBlock === true) {
        //     document.querySelectorAll("img").forEach((img) => {
        //       observer.observe(img);
        //     });
        //   }
      }.bind(this));
    }

    // native ads constants
    this.API_GET_NATIVE_AD_TEMPLATE = `https://rahul-tatva.github.io/sdk-html-templates/Products-Slider-dynamic.html`;
    this.nativeAdTemplateHTMLString = null;
    this.API_GET_NATIVE_AD_PRODUCT = `https://beeswaxcreatives.trendii.com/img-creatives`;
    this.HTML_TEMPLATE_AD_WRAPPER_ID = "trendii-native-ad-wrapper";
    this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID = "trendii-sdk-ad-products-container";

    // document.addEventListener("DOMContentLoaded", () => {
    //   //debugger;
    //   this.getAllImageFromTheDOM();
    //   const requestOptions = { method: "GET" };
    //   fetch(this.API_GET_NATIVE_AD_TEMPLATE, requestOptions)
    //     .then((response) => response.text())
    //     .then((response) => {
    //       //debugger;
    //       // //debugger;
    //       this.nativeAdTemplateHTMLString = response;
    //       // this.log(response.data);
    //       // this.getProductsForAllImages();
    //       // this.appendAdContainersToImages();
    //       this.getProductsForAllImages();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       typeof onErrorCallback === "function" && onErrorCallback(error);
    //     });
    // });
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
  loadScriptIntoHead(url) {
    document.head.appendChild(document.createElement("script")).src = url;
  }
  getProductsForAllImages(onSuccessCallback) {
    //debugger;
    const requestBody = {
      // "webpageUrl": "https://rahul-tatva.github.io/fashion-blog-below-ads.html",
      //window.location.href,
      "webpageUrl": window.location.href,
      "publisherId": 1,
      "publisher_name": "Trendii Blog",
      "domain": "blog.trendii.com",
      "active": true,
      "imageUrls": this.allValidImageSrcArray
    };
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(requestBody);
    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };
    fetch(this.API_GET_NATIVE_AD_PRODUCT, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        //debugger;
        // if feed does not deliver an empty response
        if (response !== "") {
          if (response?.success === true) {
            //debugger;
            this.nativeAdFeedProducts = response;
            // this.log(response.data);
            // this.appendAdContainersToImages();
            // const domParser = new DOMParser();
            // const parsedHtmlDocumentEl = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
            // // here the container id should be dynamic for each ads sizes
            // this.productsContainerEl = parsedHtmlDocumentEl.getElementById(
            //   this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
            // );
            // this.productsContainerEl.innerHTML = "";
            this.createAdTemplatesForAllProducts();
            if (Boolean(this.adCreated)) this.getAllParentImageGroupClass();
            // new Splide('.splide', {
            //   type: 'loop',
            //   // perPage: 6,
            //   pagination: false,
            //   gap: 10,
            //   autoWidth: true,
            //   // width: 400,
            //   // fixedWidth: 200,
            // }).mount();
            this.log(this.nativeAdFeedProducts);
          }
          // else {
          //   this.feedProducts = window.FEED_PRODUCTS;
          //   this.createAdTemplatesForAllProducts();
          //   this.getAllParentImageGroupClass();
          //   onSuccessCallback();
          //   this.log(this.feedProducts);
          // }
        } else {
          // empty response from feed
          this.log("empty feed response");
        }
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
  }
  getAllParentImageGroupClass() {
    const allParentElements = document.querySelectorAll(IMAGE_GROUP_PARENT_DIV_CLASS);
    this.parentImageGroupElements = Array.from(allParentElements);
    this.log(this.parentImageGroupElements);
    // let isThereAnySliderAds = false;
    let foundImageData = null;
    this.parentImageGroupElements.forEach((parentEl, index) => {

      this.log(parentEl.getElementsByTagName('img'));
      const allImagesPresentInTheSameGroup = Array.from(parentEl.getElementsByTagName('img'));
      //debugger;

      for (let i = 0; i < allImagesPresentInTheSameGroup.length; i++) {
        const currentImageEle = allImagesPresentInTheSameGroup[i];
        const imageSrcToShowAd = currentImageEle.src;
        const imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
        foundImageData = this.nativeAdFeedProducts.payload
          .find((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
        if (foundImageData?.generatedAdHTML) { break; }
      }
      // const currentImageEle = parentEl.getElementsByTagName('img')[0];
      // this.log(imageSrcToShowAd);
      // this.log(imageDataSrcToShowAd);
      // this.log(findImageData);

      if (foundImageData?.generatedAdHTML) {
        // isThereAnySliderAds = true;
        const adContainer = document.createElement('div');
        adContainer.classList.add("adContainer");
        adContainer.style.background = "yellow";
        adContainer.style.height = "200px";
        // adContainer.appendChild(findImageData.generatedAdHTML);

        // append the found ad just after the image caption
        parentEl
          .getElementsByClassName(BLOG_MAIN_IMAGES_SELECTOR_CLASS_NAME)[0]
          // .getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0]
          .after(foundImageData.generatedAdHTML);
        // .after(adContainer);
        // parentEl
        //   .after(foundImageData.generatedAdHTML);
        // const script = foundImageData.scriptTag;
        const identifier = foundImageData.sliderId;
        const sliderIdSelector = `#${identifier}`;
        setTimeout(() => {
          // const sc = document.createElement('script');
          // sc.innerHTML = foundImageData.scriptTag.innerHTML;
          // document.body.appendChild(sc);
          this.log("scripts append");
          const adProductsSliderContainer = document.getElementById(identifier);
          adProductsSliderContainer.style.display = "block";
          //debugger;
          // setup the splid lib to initialize the slider
          const testSlider = new Splide(sliderIdSelector, {
            type: 'loop',
            // perPage: 6,
            pagination: false,
            gap: 10,
            autoWidth: true,
            // height: 125,
            autoHeight: true,
            // width: 400,
            // fixedWidth: 200,
          }).mount();
          testSlider.on('mounted', function () {
            console.log("mounted");
            // This will be executed.
          });
        }, 2000);
        // const div = document.createElement('div');
        // div.style.background = "yellow";
        // parentEl.getElementsByClassName('imageCaption')[0].after(div);
        // parentEl.getElementsByClassName('imageCaption')[0].after(div);
      }
      // //debugger;
      // const div = document.createElement('div');
      // div.style.background = "yellow";
      // div.style.height = "100px";
      // parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(div);
      // if (index === (this.parentImageGroupElements.length - 1) && isThereAnySliderAds) { }
    });
    // document.querySelectorAll(".mol-img-group")[0].getElementsByTagName('img');
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0];
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0].after(t);
  }
  createAdTemplatesForAllProducts() {
    this.nativeAdFeedProducts.payload.map((imageData, index) => {
      if (imageData?.products.length > 0) {
        this.adCreated = true;
        const ad = this.createAdsForAllProductsInAdvance(imageData, index);
        imageData.generatedAdHTML = ad;
        imageData.generatedAdString = ad.innerHTML;
      }
    });
  }
  createAdsForAllProductsInAdvance(imageData, index) {
    //debugger;
    const products = imageData.products;
    const identifier = `splide${index}`;
    const newDOM = this.nativeAdTemplateHTMLString.replaceAll(SLIDER_CLASS_TO_REPLACE, identifier);
    const domParser = new DOMParser();
    const templatesDOM = domParser.parseFromString(newDOM, "text/html");

    // to resolve the issue for the slider getting too much height while rendering
    const adProductsSliderContainer = templatesDOM.getElementById(identifier);
    adProductsSliderContainer.style.display = "none";

    let productsContainerEl = templatesDOM.getElementById(this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID);
    // productsContainerEl.style.display = "none";
    // productsContainerEl.style.visibility = "hidden";

    const scriptId = `${identifier}-script`;
    let scriptTag = templatesDOM.getElementById(scriptId);
    productsContainerEl.innerHTML = "";
    imageData.scriptTag = scriptTag;
    imageData.sliderId = identifier;
    products.forEach((product) => this.createSliderItemProduct(product, productsContainerEl));
    const resultantAdWrapper = templatesDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
    return resultantAdWrapper;
  }
  getAllImageFromTheDOM() {
    this.allValidImageSrcArray = [];
    const alreadyLoadedImagesArray = Array.from(document.querySelectorAll(this.options.adImagesSelector))
      .map(img => img.getAttribute("src"));
    this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);
  }
  checkSupportedDimensions() {
    if (!SUPPORTED_DIMENSIONS.includes(this.AD_DIMENSION)) {
      throw new Error("TRENDii Ad Dimensions must be from supported sizes only.");
    }
  }
  log(message) {
    console.log(message);
  }
  createOrGetAdContainer() {
    const trendiiAdIframe = document.getElementById(this.TRENDII_AD_CONTAINER_ID);
    if (trendiiAdIframe) return trendiiAdIframe;
    else {
      const iframe = document.createElement("iframe");
      iframe.id = this.TRENDII_AD_CONTAINER_ID;
      iframe.title = "Trendii Ads";
      iframe.scrolling = "no";
      iframe.frameBorder = 0;
      iframe.width = this.width;
      iframe.height = this.height;
      // iframe.sandbox = "allow-top-navigation allow-scripts allow-popups";
      iframe.sandbox = "allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation";
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
  }
  appendAdIFrameToContainer(adIframe) {
    // TO-DO: Throw error if the containerId not found
    // append iframe to container or fixed position
    if (this.options?.adContainerId) {
      const existingAdContainerEl = document.getElementById(this.options.adContainerId);
      existingAdContainerEl.appendChild(adIframe);
    } else {
      // to make iframe sticky and append to body
      adIframe.style = "overflow: hidden; z-index:9999; position: fixed; right: 0px; bottom: 0px;";
      document.body.appendChild(adIframe);
    }
  }
  parseHTMLStringToDocument(htmlString, productsArray, currentImageSrc) {
    // // debugger;
    const domParser = new DOMParser();
    const parsedHtmlDocumentEl = domParser.parseFromString(htmlString, "text/html");
    // here the container id should be dynamic for each ads sizes
    var productsContainerEl = parsedHtmlDocumentEl.getElementById(
      this.HTML_TEMPLATE_SLIDER_CONTAINER_ID
    );
    productsContainerEl.innerHTML = "";
    this.createProductsSlider(productsContainerEl, productsArray, currentImageSrc);
    // // debugger;
    return parsedHtmlDocumentEl.documentElement.innerHTML;
  }
  // updateSliderContainerWithAdProducts(
  //   adSliderContainerEl,
  //   feedProducts,
  //   currentImageSrc
  // ) {
  //   // // debugger;
  //   // reset the container
  //   adSliderContainerEl.innerHTML = "";
  //   this.createProductsSlider(
  //     adSliderContainerEl,
  //     feedProducts,
  //     currentImageSrc
  //   );
  //   // // debugger;
  //   // return parsedHtmlDocument.documentElement.innerHTML;
  // }
  bindAdProductsToAdIframe(currentImageSrc) {
    const iframe = this.createOrGetAdContainer();
    iframe.hidden = false;
    // // debugger;
    // check if iframe consists of the ad container already
    const adSliderContainerEl = iframe.contentWindow?.document.getElementById(
      this.HTML_TEMPLATE_SLIDER_CONTAINER_ID
    );
    if (adSliderContainerEl) {
      // only update products container
      // this.updateSliderContainerWithAdProducts(adSliderContainerEl, this.feedProducts, currentImageSrc);

      // // debugger;
      const imageData = this.feedProducts
        .find((x) => x.imageSource === currentImageSrc);
      if (imageData.adProductsData.length > 0) {
        const src = imageData.iframeHtmlSrc;
        iframe.srcdoc = src;
        // iframe.contentDocument.location.reload(true);
      }
    }
    // create from scratch
    else {
      iframe.srcdoc = this.parseHTMLStringToDocument(
        this.htmlString,
        this.feedProducts,
        currentImageSrc
      );
      this.appendAdIFrameToContainer(iframe);
    }
  }
  getAdTemplateHTML(onSuccessCallback, onErrorCallback) {
    const requestOptions = {
      method: "GET",
      url: this.API_GET_TRENDII_AD_TEMPLATE,
    };
    axios(requestOptions)
      .then((response) => {
        // // debugger;
        this.htmlString = response.data;
        // console.log(response.data);
        if (typeof onSuccessCallback === "function") onSuccessCallback(response);
      })
      .catch((error) => {
        console.error(error);
        if (typeof onErrorCallback === "function") onErrorCallback(error);
      });
  }
  // to fetch the image's ad products from trendii api
  getAdProductsByImageURL(
    imageSource = "",
    onSuccessCallback,
    onErrorCallback
  ) {
    // const requestBody = {
    //   url: imageSource,
    //   // url:
    //   // "https://images.squarespace-cdn.com/content/v1/5d7b55a7cab21367173472ca/1617021622513-QDKPHMGC7Q77PSLTU7NO/ke17ZwdGBToddI8pDm48kMhuiFqOarpg5ZSSgOuL4KxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIfwzeWaN1u0xgydZbMMaNw0yictQozOKVrF7K98f8aA0KMshLAGzx4R3EDFOm1kBS/20-46-1-e409ebc018a94120833d9bf6b7eb1047.jpg",
    //   // webpageUrl: "https://rahul-tatva.github.io/fashion-blog-below-ads.html",
    // };

    const requestBody = {
      // "webpageUrl": "https://rahul-tatva.github.io/fashion-blog-below-ads.html",//window.location.href,
      webpageUrl: window.location.href,
      publisherId: 1,
      publisher_name: "Trendii Blog",
      domain: "blog.trendii.com",
      active: true,
      imageUrls: [imageSource]
    };


    const requestOptions = {
      method: 'POST',
      // method: "GET",
      url: API_GET_AD_PRODUCTS,
      data: { ...requestBody },
    };
    // debugger;

    axios(requestOptions)
      .then((response) => {
        // debugger;
        // console.log(response.data);
        // this.productsFeed = response.data;
        const result = response.data;
        const imageSourceWithAdProducts = {
          imageSource: imageSource,
          adProductsData: result.payload[0].products,
          // testing data
          // adProductsData: result.payload[0].products.map((x) => {
          //   x.image = imageSource;
          //   return x;
          // }),

          // test data
          // adProductsData: result.result,
          // adProductsData: result.result.map((x) => {
          //   x.image = imageSource;
          //   x.localImage = imageSource;
          //   return x;
          // }),
        };
        // create an array where key is imageSource and values are adProductsData
        this.feedProducts.push(imageSourceWithAdProducts);
        const iframeHtmlSrc = this.parseHTMLStringToDocument(this.htmlString, this.feedProducts, imageSource);
        imageSourceWithAdProducts.iframeHtmlSrc = iframeHtmlSrc;
        // if the current visible image is stored and the data is fetched
        if (
          this.currentlyVisibleImageSrcURL === imageSource &&
          this.htmlString
        ) {
          this.bindAdProductsToAdIframe(this.currentlyVisibleImageSrcURL);
        }
        if (typeof onSuccessCallback === "function") onSuccessCallback(response);
      })
      .catch((error) => {
        console.error(error);
        if (typeof onErrorCallback === "function") onErrorCallback(error);
      });
  }
  handleDOMLoaded() {
    // // debugger;
    // TO DO throw error if image selector not present
    this.allImageElements = document.querySelectorAll(this.options.adImagesSelector);
    // // debugger;
    const initialLoadImageSource = this.allImageElements[0].src;
    this.allImageElements.forEach((imgEl) => {
      // // debugger;
      const imageSourceURL = imgEl.src;
      this.intersectionObserver.observe(imgEl);
      // fetch the ad products using api for all the products
      this.getAdProductsByImageURL(imageSourceURL, function () {
        // // debugger;
        // if (this.feedProducts.length === 1) {
        //     this.bindAdProductsToAdIframe(initialLoadImageSource);
        // }
      });
    });

    this.getAllImageFromTheDOM();
    const requestOptions = { method: "GET" };
    fetch(this.API_GET_NATIVE_AD_TEMPLATE, requestOptions)
      .then((response) => response.text())
      .then((response) => {
        //debugger;
        // //debugger;
        this.nativeAdTemplateHTMLString = response;
        // this.log(response.data);
        // this.getProductsForAllImages();
        // this.appendAdContainersToImages();
        this.getProductsForAllImages();
      })
      .catch((error) => {
        console.error(error);
        typeof onErrorCallback === "function" && onErrorCallback(error);
      });
  }
  registerImageElementsToObserveVisibility() {
    document.addEventListener("DOMContentLoaded", this.handleDOMLoaded.bind(this));
  }
  handleIntersectionEntries(entries, observer) {
    // // debugger;
    entries.forEach((entry) => {
      // console.log(entry);
      // // debugger;
      // check if image el is visible in screen/window
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        const visibleImageSrc = entry.target?.src || "";
        // console.log(visibleImageSrc);
        this.currentlyVisibleImageSrcURL = visibleImageSrc;
        // just to check that the ads is not rendered before the products are fetched
        if (this.feedProducts.length > 0) {
          this.bindAdProductsToAdIframe(visibleImageSrc);
        }
        // this.getSimilarProducts(currentImageSrc, (response) => {
        //     this.getHTMLTemplate(response.data);
        // });
        // // debugger;
        // if (entry.intersectionRatio >= 1.0) {
        //     // image is fully visible in t0.75he screen
        // }
        // deregister intersection observer apis
        // observer.unobserve(entry.target);
      }
    });
  }
  createObserverForCurrentVisibleImage() {
    // // debugger;
    /**
     * Checking whether image is there to check the data
     */
    if (!!window.IntersectionObserver) {
      const options = {
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.5,
      };
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersectionEntries.bind(this),
        options
      );
    }
  }
  sliderListProductCount() {
    switch (this.AD_DIMENSION) {
      case "160X600":
        return 4;
      case "300X600":
        return 3;
      default:
        break;
    }
  }
  createProductsSlider(productsContainerEl, sliderRenderingProducts, currentImageSrc) {
    // // debugger;
    let sliderItemListEl;
    const currentImageData = sliderRenderingProducts
      .find((x) => x.imageSource === currentImageSrc);
    const adProducts = currentImageData?.adProductsData.slice(0, 6);
    // const sliderListItemProductCount = this.sliderListProductCount();
    // TO-DO: Not found any ad products for the particular image
    if (adProducts?.length > 0) {
      initializeRenderingProductsBasedOnCount(adProducts, productsContainerEl);
      // for (let index = 0; index < adProducts.length; index++) {
      //   const product = adProducts[index];
      //   if (index % sliderListItemProductCount === 0) {
      //     // create a new list element
      //     sliderItemListEl = document.createElement("LI");
      //     sliderItemListEl.classList.add("splide__slide");
      //   }
      //   const productItemEl = this.createSliderProductItemElement(product);
      //   sliderItemListEl.appendChild(productItemEl);
      //   productsContainerEl.appendChild(sliderItemListEl);
      // }
    }
  }
  createSliderProductItemElement(product) {

    // to handle the slider cloning system we need anchor tag elements as the 
    // products redirection links
    const productItemRedirectContainer = document.createElement("A");
    productItemRedirectContainer.style = "text-decoration: none;";
    productItemRedirectContainer.href = product.url;
    productItemRedirectContainer.target = "_blank";

    const productItem = document.createElement("DIV");
    productItem.classList.add("product-item");
    console.log(product.image);
    productItem.style.backgroundImage = `url(${product.image})`;
    // // debugger;
    // function test() {
    //   console.log("clcick product");
    //   window.open(product.url, "_blank");
    // }
    // productItem.onclick = "test();";
    // productItem.addEventListener("click", function () {
    //   console.log("clcick product");
    //   // debugger;
    //   window.open(product.url, "_blank");
    // });

    if (product.sale) {
      const onSaleTag = document.createElement("SPAN");
      onSaleTag.classList.add("onsale");
      onSaleTag.innerHTML = "ON SALE";
      productItem.appendChild(onSaleTag);
    }

    const productItemCardBody = document.createElement("DIV");
    productItemCardBody.classList.add("card-body");

    const productName = document.createElement("B");
    const productNameText = document.createTextNode(BRAND_NAME);
    productName.appendChild(productNameText);
    productItemCardBody.appendChild(productName);

    const productCashback = document.createElement("P");
    productCashback.innerHTML = product.name;
    productItemCardBody.appendChild(productCashback);

    const productPriceLink = document.createElement("EM");
    productPriceLink.innerHTML = product.currency + product.price;
    productItemCardBody.appendChild(productPriceLink);

    productItem.appendChild(productItemCardBody);

    // const cashbackLabel = document.createElement("I");
    // cashbackLabel.classList.add("cashback-chip");
    // cashbackLabel.innerHTML = product.cashback + " cashback";
    // productItem.appendChild(cashbackLabel);

    productItemRedirectContainer.appendChild(productItem);
    return productItemRedirectContainer;
    // return productItem;
  }
  createSliderItemProduct(product, productsContainer) {
    // <li class="splide__slide">
    //   <div class="product-item-container">
    //     <div class="product-item"
    //       style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
    //       <span class="onsale">ON SALE</span>
    //       <div class="product-details-wrapper">
    //         <b class="brand-name">TRENDii</b>
    //         <p class="product-name">M2K tekno sneakers</p>
    //         <span class="product-cashback-chip">2% Cashback</span>
    //         <em class="product-price">$260</em>
    //       </div>
    //     </div>
    //   </div>
    // </li>
    const sliderItem = document.createElement("LI");
    sliderItem.classList.add("splide__slide");
    productsContainer.appendChild(sliderItem);

    const productItemRedirectContainer = document.createElement("A");
    productItemRedirectContainer.classList.add("product-redirection-link");
    productItemRedirectContainer.style = "text-decoration: none;";
    productItemRedirectContainer.href = product.url;
    productItemRedirectContainer.target = "_blank";
    sliderItem.appendChild(productItemRedirectContainer);

    const productItemContainer = document.createElement("DIV");
    productItemContainer.classList.add("product-item-container");
    productItemContainer.addEventListener("click", function () {
      window.open(product.url, "_blank");
    });
    productItemRedirectContainer.appendChild(productItemContainer);

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

    // const productDetailsWrapperMobile = document.createElement("DIV");
    // productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
    // productItemContainer.appendChild(productDetailsWrapperMobile);
    // productDetailsWrapperMobile.addEventListener("click", function () {
    //   window.open(product.url, "_blank");
    // });

    const productName = document.createElement("B");
    productName.classList.add("brand-name");
    productName.innerHTML = BRAND_NAME;
    productDetailsWrapper.appendChild(productName);

    const productNameP = document.createElement("P");
    productNameP.classList.add("product-name");
    productNameP.innerHTML = product.name;
    productDetailsWrapper.appendChild(productNameP);

    // const productNamePMobile = document.createElement("P");
    // productNamePMobile.classList.add("product-name");
    // productNamePMobile.innerHTML = product.name;
    // productDetailsWrapperMobile.appendChild(productNamePMobile);

    // const productCashbackPercentage = document.createElement("SPAN");
    // productCashbackPercentage.classList.add("product-cashback-chip");
    // productCashbackPercentage.innerHTML = "4%" + " Cashback";
    // productDetailsWrapper.appendChild(productCashbackPercentage);

    const productPrice = document.createElement("EM");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = product.currency + product.price;
    productDetailsWrapper.appendChild(productPrice);

    // const productPriceMobile = document.createElement("EM");
    // productPriceMobile.classList.add("product-price");
    // productPriceMobile.innerHTML = product.currency + product.price;
    // productDetailsWrapperMobile.appendChild(productPriceMobile);
  }
}
function initializeRenderingProductsBasedOnCount(adRenderingProducts, productsContainer) {
  switch (adRenderingProducts.length) {
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
      const product = adRenderingProducts[0];

      const productItemRedirectContainer = document.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      productsContainer.appendChild(productItemRedirectContainer);

      const oneProductWrapper = document.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productItemRedirectContainer.appendChild(oneProductWrapper);

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
        const product = adRenderingProducts[i];

        const row = document.createElement("DIV");
        row.classList.add("row");
        row.classList.add("secondary-product-row");
        twoProductWrapper.appendChild(row);

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemContainer.addEventListener("click", function () {
          window.open(product.url, "_blank");
        });
        productItemRedirectContainer.appendChild(productItemContainer);

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
        const product = adRenderingProducts[i];

        const row = document.createElement("DIV");
        row.classList.add("row");
        threeProductWrapper.appendChild(row);

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

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
          const product = adRenderingProducts[countIndex];

          const col = document.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = document.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = document.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            window.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

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

      const product = adRenderingProducts[0];

      const row = document.createElement("DIV");
      row.classList.add("row");
      fiveProductWrapper.appendChild(row);

      const col = document.createElement("DIV");
      col.classList.add("col");
      row.appendChild(col);

      const productItemRedirectContainer = document.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      col.appendChild(productItemRedirectContainer);

      const productItemContainer = document.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        window.open(product.url, "_blank");
      });
      productItemRedirectContainer.appendChild(productItemContainer);

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
          const product = adRenderingProducts[countIndex];

          const col = document.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = document.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = document.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            window.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

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
          const product = adRenderingProducts[countIndex];

          const col = document.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = document.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = document.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            window.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

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