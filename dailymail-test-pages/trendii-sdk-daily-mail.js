const MOBILE_WIDTH = 480;
const TRENDII_NATIVE_ADS_CDN = "https://cdn.trendii.com/native-ads-sdk/assets";
const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
const PUBLISHER_NAME = "DAILY_MAIL";
const RETAILER_LOGO_ID = "retailer-logo";

// ad by default to below this class element
const DESKTOP_DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share";
const DESKTOP_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share.b-loaded";

const MOBILE_DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".img-share";
const MOBILE_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS = ".img-share.b-loaded";

const DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS = ".mol-img-group";
const MOBILE_IMAGE_GROUP_PARENT_TAG = "figure";

const DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS = 'imageCaption';
const MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG = 'figcaption';

const RETAILER_NAME_TO_REPLACE_WITH = "{{RETAILER_NAME}}";
const SLIDER_CLASS_TO_REPLACE_WITH = "trendiiSliderUniqueString";
const SCRIPT_ID_TO_REPLACE = "trendiiSliderUniqueString-script";
// var intersectionObserver;



var adsWindow = window.top;
// if (adsWindow.IntersectionObserverV1) {
//   var IntersectionObserverV1 = adsWindow.IntersectionObserverV1;
// }
var adsDOM = adsWindow.document;
class TRENDiiAd {
  constructor(options) {
    //debugger;
    this.loadScriptIntoHead("https://cdn.trendii.com/native-ads-sdk/intersection-observer.min.js");
    this.loadScriptIntoHead("https://cdn.trendii.com/assets/splide.min.js");
    // this.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js");

    this.loadStyleSheetIntoHead("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/assets/splide-core.min.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/native-ads-sdk/trendii-sdk-daily-mail-slider.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/native-ads-sdk/trendii-sdk-daily-mail-all-product.css");
    console.log("sdk constructor initialized");
    // this.loadStyleSheet("https://cdn.trendii.com/native-ads-sdk/Products-Silder.css");
    // this.loadScript("https://unpkg.com/axios/dist/axios.min.js");
    // <link rel="stylesheet" href="./sdk-html-templates/trendii-sdk-daily-mail-slider.css"></link>

    // variable needed to store some data and info
    this.feedProducts = [];
    this.intersectionObserver;
    // this.feedProductsWithGeneratedAds = [];

    // native ads constants
    this.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `https://cdn.trendii.com/native-ads-sdk/Products-Slider-dynamic.html`;
    this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `https://cdn.trendii.com/native-ads-sdk/Products-728X90-all-product-dynamic.html`;
    this.HTML_TEMPLATE_SIMPLE_CONTAINER_ID = "trendii-products-container-728X90";
    this.nativeAdSimpleTemplateHTMLString = null;

    this.nativeAdSliderTemplateHTMLString = null;
    this.API_GET_NATIVE_AD_PRODUCT = `https://beeswaxcreatives.trendii.com/img-creatives`;
    this.HTML_TEMPLATE_AD_WRAPPER_ID = "trendii-native-ad-wrapper";
    this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = "trendii-sdk-ad-products-container";
    this.slidersAppendedArray = [];
    this.sliderCount = 0;


    if (adsDOM.readyState === "complete") {
      // Fully loaded!
      console.log("complete");
      this.startAdGenerationProcess();
    }
    else if (adsDOM.readyState === "interactive") {
      // DOM ready! Images, frames, and other subresources are still downloading.
      console.log("interactive");
      this.startAdGenerationProcess();
    }
    else {
      // Loading still in progress.
      // To wait for it to complete, add "DOMContentLoaded" or "load" listeners.
      console.log("DOM in progress");

      adsDOM.addEventListener("DOMContentLoaded", () => {
        // DOM ready! Images, frames, and other subresources are still downloading.
        console.log("DOMContentLoaded");
        this.startAdGenerationProcess();
      });
      // adsWindow.addEventListener("load", () => {
      //   // Fully loaded!
      // });
    }
  }
  startAdGenerationProcess() {
    Promise.all([
      fetch(this.API_GET_NATIVE_AD_SLIDER_TEMPLATE).then((response) => response.text()),
      fetch(this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE).then((response) => response.text()),
    ])
      .then(allResponses => {
        this.nativeAdSliderTemplateHTMLString = allResponses[0];
        this.nativeAdSimpleTemplateHTMLString = allResponses[1];

        // this.initializeIntersectionObserver();
        // let intersectionObserver;
        const options = {
          // root: adsDOM.body,
          rootMargin: "0px",
          threshold: 0.1,
        };


        if (adsWindow.IntersectionObserverV1) {
          this.intersectionObserver = new adsWindow.IntersectionObserverV1(
            this.handleIntersectionEntries.bind(this),
            options
          );
        } else {
          this.intersectionObserver = new IntersectionObserver(
            this.handleIntersectionEntries.bind(this),
            options
          );
        }

        let allParentEls;
        if (adsWindow.innerWidth <= MOBILE_WIDTH) {
          allParentEls = Array.from(adsDOM.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG));
        } else {
          allParentEls = Array.from(adsDOM.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
        }
        // start observing them
        allParentEls.forEach((parentEl) => {
          this.intersectionObserver.observe(parentEl);
        });
        this.log(this.feedProducts);
      });
  }
  loadStyleSheetIntoHead(url) {
    var styles = adsDOM.createElement('link');
    styles.type = "text/css";
    styles.rel = "stylesheet";
    styles.href = url;
    adsDOM.head.appendChild(styles);
  }
  loadScript(url) {
    adsDOM.body.appendChild(adsDOM.createElement("script")).src = url;
  }
  loadScriptIntoHead(url) {
    adsDOM.head.appendChild(adsDOM.createElement("script")).src = url;
  }
  handleIntersectionEntries(entries, observer) {
    // // debugger;
    entries.forEach((entry) => {
      // console.log(entry);
      // check if image el is visible in screen/window
      // if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
      if (entry.isIntersecting) {
        const visibleParentEl = entry.target;
        observer.unobserve(entry.target);
        console.log("observer unregistered for ", visibleParentEl);
        // console.log(visibleParentEl);
        // this.log(visibleParentEl.getElementsByTagName('img'));
        const imageElsInsideSameParent = Array.from(visibleParentEl.getElementsByTagName('img'));
        const imagesPresentInSameParent = imageElsInsideSameParent
          .map(img => {
            if (img.getAttribute("data-src")) return img.getAttribute("data-src");
            return img.getAttribute("src");
          })
          // filter null values or undefined
          .filter(x => x);
        // call the apis here
        const requestBody = {
          webpageUrl: adsWindow.location.href,
          imageUrls: imagesPresentInSameParent,
          publisherId: 2,
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
            // if feed does not deliver an empty response
            if (response !== "") {
              if (response.success && response.success === true) {
                const adProductsData = response;
                let foundImageData = null, foundImageElement = null, foundIndex = null;
                // find any one image from the parent to render ad
                for (let i = 0; i < imageElsInsideSameParent.length; i++) {
                  const currentImageEle = imageElsInsideSameParent[i];
                  const imageSrcToShowAd = currentImageEle.src;
                  const imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
                  foundIndex = adProductsData.payload
                    .findIndex((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
                  foundImageData = adProductsData.payload[foundIndex];
                  // check if event the first image have ad products
                  // just stop finding for other images
                  if (foundImageData.products && foundImageData.products.length > 0) {
                    foundImageElement = currentImageEle;
                    break;
                  }
                }
                if (foundImageData.products && foundImageData.products.length > 0) {
                  // this.sliderCount;
                  // generate the ad on the go
                  // and then just append to the this parent
                  this.generatedAdForSingleImage(foundImageData, this.sliderCount);
                  this.sliderCount++;
                  if (foundImageData.generatedAdHTML) {
                    // handle the mobile version
                    if (adsWindow.innerWidth <= MOBILE_WIDTH) {
                      // append the found ad just after the image caption
                      const titleOfImageGroup = visibleParentEl
                        .getElementsByTagName(MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG)[0];
                      if (titleOfImageGroup) {
                        titleOfImageGroup.after(foundImageData.generatedAdHTML);
                      }
                      // just to handle the image without caption for mobile
                      else {
                        visibleParentEl.appendChild(foundImageData.generatedAdHTML);
                      }
                    }
                    // desktop version
                    else {
                      // append the found ad just after the image caption
                      visibleParentEl
                        .getElementsByClassName(DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS)[0]
                        .after(foundImageData.generatedAdHTML);
                      foundImageData.isAdGenerated = true;
                      console.log("ad rendered for ", visibleParentEl);
                      // once ad is rendered no need to observe this parent element any more
                      // deregister intersection observer apis

                    }

                    const identifier = foundImageData.sliderId;
                    const sliderIdSelector = `#${identifier}`;
                    // console.log(identifier);
                    if (foundImageData.isSliderTemplate) {
                      this.slidersAppendedArray.push(foundImageData.sliderId);
                      console.log(adsWindow.Splide);
                      if (adsWindow.Splide) {
                        const testSlider = new adsWindow.Splide(sliderIdSelector, {
                          type: 'loop',
                          pagination: false,
                          gap: 10,
                          autoWidth: true,
                          autoHeight: true,
                        }).mount();
                        const adProductsSliderContainer = adsDOM.getElementById(identifier);
                        adProductsSliderContainer.style.display = "block";
                        const adWrapper = foundImageData.generatedAdHTML;
                        adWrapper.setAttribute("data-slider-appended", "true");
                        adWrapper.style.display = "block";
                        this.log("slider appended");
                        testSlider.on('mounted', function () {
                          console.log("mounted");
                          // This will be executed.
                        });
                      }
                    }
                  }
                }
              }
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
    });
  }
  // getAllDailyMailBlogImagesFromDOM() {
  //   //debugger;
  //   // TO DO throw error if image selector not present
  //   // this.allImageElements = adsDOM.querySelectorAll(this.options.adImagesSelector);
  //   this.allValidImageSrcArray = [];
  //   if (adsWindow.innerWidth <= MOBILE_WIDTH) {

  //     const alreadyLoadedImagesArray = Array.from(adsDOM.querySelectorAll(MOBILE_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("src"));
  //     this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

  //     // async loadable images
  //     const imagesWhichAreYetToBeLoaded = Array.from(adsDOM.querySelectorAll(MOBILE_DAILY_MAIL_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("data-src"))
  //       // filter null values or undefined
  //       .filter(x => x);
  //     this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
  //   } else {
  //     // consider desktop view
  //     const alreadyLoadedImagesArray = Array.from(adsDOM.querySelectorAll(DESKTOP_DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("src"));
  //     this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

  //     // async loadable images
  //     const imagesWhichAreYetToBeLoaded = Array.from(adsDOM.querySelectorAll(DESKTOP_DAILY_MAIL_IMAGE_SELECTOR_CLASS))
  //       .map(img => img.getAttribute("data-src"))
  //       // filter null values or undefined
  //       .filter(x => x);
  //     this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
  //   }
  //   this.log(this.allValidImageSrcArray);
  // };
  generatedAdForSingleImage(imageData, foundIndex) {
    const generatedAd = this.createAdsForAllProductsInAdvance(imageData, foundIndex);
    imageData.generatedAdHTML = generatedAd;
  }
  createAdTemplatesForAllProducts() {
    this.feedProducts.payload.map((imageData, index) => {
      if (imageData.products && imageData.products.length > 0) {
        const generatedAd = this.createAdsForAllProductsInAdvance(imageData, index);
        imageData.generatedAdHTML = generatedAd;
        // imageData.generatedAdString = generatedAd.innerHTML;
      }
    });
  }
  createAdsForAllProductsInAdvance(imageData, index) {
    //debugger;
    const imageUrl = imageData.imageUrl;
    const BRAND_NAME = imageData.advertiserName;
    let products = imageData.products;
    // to test 1-2-3-4 products case
    // const products = imageData.products.slice(0, (index % 2 === 0 ? 2 : 1));
    // for 3 and 4 products
    // const products = imageData.products.slice(0, (index % 2 === 0 ? 3 : 4));
    if (adsWindow.innerWidth > MOBILE_WIDTH) {
      products = imageData.products.slice(0, 4);
    }
    const advertiserName = imageData.advertiserName;
    const identifier = `splide${index}`;
    imageData.sliderId = identifier;
    switch (products.length) {
      case 1:
      case 2:
      case 3:
      case 4: {
        imageData.isSliderTemplate = false;
        // const newDOM = this.nativeAdSimpleTemplateHTMLString
        //   .replaceAll(SLIDER_CLASS_TO_REPLACE_WITH, identifier);

        const domParser = new DOMParser();
        const simpleTemplateDOM = domParser.parseFromString(this.nativeAdSimpleTemplateHTMLString, "text/html");

        // dynamic logo for the advertiser
        const logoUrl = `${TRENDII_NATIVE_ADS_CDN}/${advertiserName.toLowerCase()}.png`;
        const retailerLogoEl = simpleTemplateDOM.getElementById(RETAILER_LOGO_ID);
        retailerLogoEl.title = advertiserName;
        // when the logo is used as the image tag
        retailerLogoEl.src = logoUrl;

        const productsContainerEl = simpleTemplateDOM.getElementById(
          this.HTML_TEMPLATE_SIMPLE_CONTAINER_ID
        );
        productsContainerEl.innerHTML = "";

        // const logo = adsDOM.getElementById("logo");
        // logo.addEventListener("click", function () {
        //   adsWindow.open(feedProducts[0].url, "_blank");
        // });
        initializeRenderingProductsBasedOnCount(products, productsContainerEl);
        const resultantAdWrapper = simpleTemplateDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
        return resultantAdWrapper;
      }
      // break;

      default: {
        imageData.isSliderTemplate = true;
        const newDOM = this.nativeAdSliderTemplateHTMLString
          .replaceAll(SLIDER_CLASS_TO_REPLACE_WITH, identifier);
        // .replaceAll(RETAILER_NAME_TO_REPLACE_WITH, advertiserName);

        const domParser = new DOMParser();
        const templatesDOM = domParser.parseFromString(newDOM, "text/html");

        // dynamic logo for the advertiser
        const logoUrl = `${TRENDII_NATIVE_ADS_CDN}/${advertiserName.toLowerCase()}.png`;
        const retailerLogoEl = templatesDOM.getElementById(RETAILER_LOGO_ID);
        retailerLogoEl.title = advertiserName;
        // when the logo is used as the image tag
        retailerLogoEl.src = logoUrl;

        // when the logo is used as the div tag
        // const newBackgroundStyle = 'url("' + logoUrl + '") no-repeat center center';
        // // retailerLogoEl.style.background = `url("${logoUrl}") no-repeat center center;`;
        // retailerLogoEl.style.background = newBackgroundStyle;
        // retailerLogoEl.style.backgroundSize = "contain";

        // to resolve the issue for the slider getting too much height while rendering
        const adProductsSliderContainer = templatesDOM.getElementById(identifier);
        adProductsSliderContainer.style.display = "none";


        let productsContainerEl = templatesDOM.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
        productsContainerEl.innerHTML = "";

        // create slider html template and append to the container
        products.forEach((product) => this.createSliderItemProduct(product, productsContainerEl));
        const resultantAdWrapper = templatesDOM.getElementById(this.HTML_TEMPLATE_AD_WRAPPER_ID);
        resultantAdWrapper.style.display = "none";
        return resultantAdWrapper;
      }
      // break;
    }
  }
  getAllParentImageGroupClassMobile() {
    let allParentElements;
    if (adsWindow.innerWidth <= MOBILE_WIDTH) {
      allParentElements = adsDOM.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG);
    } else {
      allParentElements = adsDOM.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS);
    }
    this.parentImageGroupElements = Array.from(allParentElements);
    this.log(this.parentImageGroupElements);
    // let isThereAnySliderAds = false;
    let foundImageData = null;
    let foundImageElement = null;
    this.parentImageGroupElements.forEach((parentEl, index) => {

      this.log(parentEl.getElementsByTagName('img'));
      const allImagesPresentInTheSameGroup = Array.from(parentEl.getElementsByTagName('img'));
      //debugger;

      for (let i = 0; i < allImagesPresentInTheSameGroup.length; i++) {
        const currentImageEle = allImagesPresentInTheSameGroup[i];
        const imageSrcToShowAd = currentImageEle.src;
        const imageDataSrcToShowAd = currentImageEle.getAttribute("data-src");
        foundImageData = this.feedProducts.payload
          .find((imageData) => imageData.imageUrl === imageSrcToShowAd || imageDataSrcToShowAd);
        if (foundImageData.generatedAdHTML) {
          foundImageElement = currentImageEle;
          break;
        }
      }
      // const currentImageEle = parentEl.getElementsByTagName('img')[0];
      // this.log(imageSrcToShowAd);
      // this.log(imageDataSrcToShowAd);
      // this.log(findImageData);

      if (foundImageData.generatedAdHTML) {
        // isThereAnySliderAds = true;
        const adContainer = adsDOM.createElement('div');
        adContainer.classList.add("adContainer");
        adContainer.style.background = "yellow";
        adContainer.style.maxHeight = "300px";
        // adContainer.appendChild(findImageData.generatedAdHTML);

        const adContainerMobile = adsDOM.createElement('div');
        adContainerMobile.classList.add("ads-inside-the-images");
        // adContainerMobile.style.background = "yellow";
        // adContainerMobile.style.height = "max-content";
        // adContainerMobile.appendChild(foundImageData.generatedAdHTML);
        // foundImageElement.after(adContainerMobile);

        // handle the mobile version
        if (adsWindow.innerWidth <= MOBILE_WIDTH) {
          // append the found ad just after the image caption
          const titleOfImageGroup = parentEl
            .getElementsByTagName(MOBILE_DAILY_MAIL_IMAGE_CAPTION_TAG)[0];
          if (titleOfImageGroup) {
            titleOfImageGroup.after(foundImageData.generatedAdHTML);
          }
          else {
            parentEl.appendChild(foundImageData.generatedAdHTML);
          }
        }
        // desktop version
        else {
          // append the found ad just after the image caption
          parentEl
            .getElementsByClassName(DESKTOP_DAILY_MAIL_IMAGE_CAPTION_CLASS)[0]
            .after(foundImageData.generatedAdHTML);
          // parentEl
          //   .after(foundImageData.generatedAdHTML);
        }



        // //debugger;
        // const div = adsDOM.createElement('div');
        // div.style.background = "yellow";
        // div.style.height = "100px";
        // parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(div);
        // if (index === (this.parentImageGroupElements.length - 1) && isThereAnySliderAds) { }
      }
    });
    // adsDOM.querySelectorAll(".mol-img-group")[0].getElementsByTagName('img');
    // adsDOM.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0];
    // adsDOM.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0].after(t);
  }
  getAllAdContainersFromDOM() {
    // this.allAdContainers = adsDOM.querySelectorAll(this.options.adContainer);
  }
  log(message) {
    console.log(message);
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
    const sliderItem = adsDOM.createElement("LI");
    sliderItem.classList.add("splide__slide");
    productsContainer.appendChild(sliderItem);

    const productItemRedirectContainer = adsDOM.createElement("A");
    productItemRedirectContainer.classList.add("product-redirection-link");
    productItemRedirectContainer.style = "text-decoration: none;";
    productItemRedirectContainer.href = product.url;
    productItemRedirectContainer.target = "_blank";
    sliderItem.appendChild(productItemRedirectContainer);

    const productItemContainer = adsDOM.createElement("DIV");
    productItemContainer.classList.add("product-item-container");
    productItemContainer.addEventListener("click", function () {
      adsWindow.open(product.url, "_blank");
    });
    productItemRedirectContainer.appendChild(productItemContainer);

    const productItem = adsDOM.createElement("DIV");
    productItem.classList.add("product-item");
    productItem.style.backgroundImage = `url(${product.image})`;
    productItemContainer.appendChild(productItem);

    if (product.sale) {
      const onSaleTag = adsDOM.createElement("SPAN");
      onSaleTag.classList.add("onsale");
      onSaleTag.innerHTML = "ON SALE";
      productItem.appendChild(onSaleTag);
    }

    const productDetailsWrapper = adsDOM.createElement("DIV");
    productDetailsWrapper.classList.add("product-details-wrapper");
    productItem.appendChild(productDetailsWrapper);
    productDetailsWrapper.addEventListener("click", function () {
      adsWindow.open(product.url, "_blank");
    });

    const productDetailsWrapperMobile = adsDOM.createElement("DIV");
    productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
    productItemContainer.appendChild(productDetailsWrapperMobile);
    // productDetailsWrapperMobile.addEventListener("click", function () {
    //   adsWindow.open(product.url, "_blank");
    // });

    // const productName = adsDOM.createElement("B");
    // productName.classList.add("brand-name");
    // productName.innerHTML = this.brandName;
    // productDetailsWrapper.appendChild(productName);

    const productNameP = adsDOM.createElement("P");
    productNameP.classList.add("product-name");
    productNameP.innerHTML = product.name;
    productDetailsWrapper.appendChild(productNameP);

    const productNamePMobile = adsDOM.createElement("P");
    productNamePMobile.classList.add("product-name");
    productNamePMobile.innerHTML = product.name;
    productDetailsWrapperMobile.appendChild(productNamePMobile);

    // const productCashbackPercentage = adsDOM.createElement("SPAN");
    // productCashbackPercentage.classList.add("product-cashback-chip");
    // productCashbackPercentage.innerHTML = "4%" + " Cashback";
    // productDetailsWrapper.appendChild(productCashbackPercentage);

    const productPrice = adsDOM.createElement("EM");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = product.currency + product.price;
    productDetailsWrapper.appendChild(productPrice);

    const productPriceMobile = adsDOM.createElement("EM");
    productPriceMobile.classList.add("product-price");
    productPriceMobile.innerHTML = product.currency + product.price;
    productDetailsWrapperMobile.appendChild(productPriceMobile);
  }
  /*
  getProductsForAllImages(onSuccessCallback) {
    //debugger;
    const requestBody = {
      "webpageUrl": adsWindow.location.href,
      "imageUrls": this.allValidImageSrcArray,
      "publisherId": 1,
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
          if (response.success && response.success === true) {
            //debugger;
            this.feedProducts = response;
            // this.log(response.data);
            // this.appendAdContainersToImages();
            // const domParser = new DOMParser();
            // const parsedHtmlDocumentEl = domParser.parseFromString(this.nativeAdHTMLString, "text/html");
            // // here the container id should be dynamic for each ads sizes
            // this.productsContainerEl = parsedHtmlDocumentEl.getElementById(
            //   this.NATIVE_AD_HTML_TEMPLATE_SLIDER_CONTAINER_ID
            // );
            // this.productsContainerEl.innerHTML = "";
 
 
            // for desktop cant use the same approach as of now for intersection apis
            // this.createAdTemplatesForAllProducts();
 
            // handle mobile version
            if (adsWindow.innerWidth <= 480) {
              this.createAdTemplatesForAllProducts();
              this.getAllParentImageGroupClassMobile();
            }
            // handle desktop version
            else {
              // this.initializeIntersectionObserver().bind(this);
              let allParentElements;
              // for mobile devices parents
              if (adsWindow.innerWidth <= MOBILE_WIDTH) {
                allParentElements = Array.from(adsDOM.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG));
              } else {
                // for desktop devices parents
                allParentElements = Array.from(adsDOM.querySelectorAll(DESKTOP_IMAGE_GROUP_PARENT_DIV_CLASS));
              }
              allParentElements.forEach((parentEl) => {
                // // debugger;
                this.intersectionObserver.observe(parentEl);
              });
              this.log(this.feedProducts);
            }
          }
          // else {
          //   this.feedProducts = adsWindow.FEED_PRODUCTS;
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
  getProductsForVisibleImages(allVisibleImages, onSuccessCallback) {
    const requestBody = {
      "webpageUrl": adsWindow.location.href,
      "imageUrls": allVisibleImages,
      "publisherId": 1,
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
        // if feed does not deliver an empty response
        if (response !== "") {
          if (response.success && response.success === true) {
            // this.feedProducts = response;
            onSuccessCallback(response);
          }
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
  */
};
(function () {
  // native ad options to implement
  // const options = {
  //   adImagesSelector: ".ad-image",
  //   isNativeAd: true,
  //   // adPosition: "bottom", // "bottom" || "left" || "right" || "top"
  //   brandName: "TRENDii"
  // };
  var myTrendii = new TRENDiiAd();
  myTrendii.log("initialize new instance");
})();

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


      // <div class="one-product-wrapper">
      //   <div class="row">
      //     <div class="col-12">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO POLO POLO POLOPOLOPOLO POLO POLO POLO vPOLO
      // 							POLO POLO POLO POLO POLO POLO POLO POLO POLO POLO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v tekno v
      //           tekno tekno tekno v tekno v tekno tekno tekno v tekno v
      // 						</p>
      //           <em class="product-price">$260</em>
      // 					</div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      /*
      const product = adRenderingProducts[0];

      const productItemRedirectContainer = adsDOM.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      productsContainer.appendChild(productItemRedirectContainer);

      const oneProductWrapper = adsDOM.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productItemRedirectContainer.appendChild(oneProductWrapper);

      const productItemContainer = adsDOM.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        adsWindow.open(product.url, "_blank");
      });
      oneProductWrapper.appendChild(productItemContainer);

      const productItem = adsDOM.createElement("DIV");
      productItem.classList.add("product-item");
      productItem.classList.add("main-item");
      productItem.style.backgroundImage = `url(${product.image})`;
      productItemContainer.appendChild(productItem);

      if (product.sale) {
        const onSaleTag = adsDOM.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
      }

      const productDetailsWrapper = adsDOM.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItemContainer.appendChild(productDetailsWrapper);

      const productName = adsDOM.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = adsDOM.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);
      */


      // <div class="one-product-wrapper">
      //     <div class="row">
      //         <div class="col-12">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      // 					   <b class="brand-name">MARCO POLO </b>
      //                     <p class="product-name">M2K tekno sneakers</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
      const product = adRenderingProducts[0];
      // const adWrapper = adsDOM.getElementsByClassName("block728X90-wrapper")[0];
      // adWrapper.addEventListener("click", function () {
      //   adsWindow.open(product.url, "_blank");
      // });
      // // to fix curser pointer issue
      // adWrapper.style.cursor = "pointer";

      const oneProductWrapper = adsDOM.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productsContainer.appendChild(oneProductWrapper);

      const row = adsDOM.createElement("DIV");
      row.classList.add("row");
      oneProductWrapper.appendChild(row);

      const col = adsDOM.createElement("DIV");
      col.classList.add("col-12");
      row.appendChild(col);

      const productItemRedirectContainer = adsDOM.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      col.appendChild(productItemRedirectContainer);

      const productItemContainer = adsDOM.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        adsWindow.open(product.url, "_blank");
      });
      productItemRedirectContainer.appendChild(productItemContainer);

      const productItem = adsDOM.createElement("DIV");
      productItem.classList.add("product-item");
      productItemContainer.appendChild(productItem);

      const productItemImage = adsDOM.createElement("DIV");
      productItemImage.classList.add("product-item-image");
      productItemImage.style.backgroundImage = `url(${product.image})`;
      productItem.appendChild(productItemImage);

      if (product.sale) {
        const onSaleTag = adsDOM.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItemImage.appendChild(onSaleTag);
      }

      const productDetailsWrapper = adsDOM.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItemContainer.appendChild(productDetailsWrapper);

      const productName = adsDOM.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = adsDOM.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);
      break;
    }
    case 2: {
      // <div class="two-product-wrapper">
      //     <div class="row">
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      //                     <b class="brand-name">MARCO POLO POLO POLO POLO</b>
      //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //         <div class="col-6">
      //             <div class="product-item-container">
      //                 <div class="product-item">
      //                     <div class="product-item-image"
      //                         style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //                     </div>
      //                 </div>
      //                 <div class="product-details-wrapper">
      //                     <b class="brand-name">MARCO POLO </b>
      //                     <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //                     <em class="product-price">$260</em>
      //                 </div>
      //             </div>
      //         </div>
      //     </div>
      // </div>
      const twoProductWrapper = adsDOM.createElement("DIV");
      twoProductWrapper.classList.add("two-product-wrapper");
      productsContainer.appendChild(twoProductWrapper);

      const row = adsDOM.createElement("DIV");
      row.classList.add("row");
      twoProductWrapper.appendChild(row);

      for (let i = 0; i <= 1; i++) {
        const product = adRenderingProducts[i];

        const col = adsDOM.createElement("DIV");
        col.classList.add("col-6");
        row.appendChild(col);

        const productItemContainer = adsDOM.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemContainer.addEventListener("click", function () {
          adsWindow.open(product.url, "_blank");
        });
        col.appendChild(productItemContainer);

        const productItem = adsDOM.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = adsDOM.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        const productDetailsWrapper = adsDOM.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        const productName = adsDOM.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = adsDOM.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);
      }
      break;
    }
    case 3: {
      // <div class="three-product-wrapper">
      //   <div class="row row-cols-3">
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      // 					 <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>;
      const threeProductWrapper = adsDOM.createElement("DIV");
      threeProductWrapper.classList.add("three-product-wrapper");
      productsContainer.appendChild(threeProductWrapper);

      const row = adsDOM.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-3");
      threeProductWrapper.appendChild(row);

      for (let i = 0; i <= 2; i++) {
        const product = adRenderingProducts[i];

        const col = adsDOM.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = adsDOM.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = adsDOM.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = adsDOM.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = adsDOM.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = adsDOM.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = adsDOM.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        // const brandName = adsDOM.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = adsDOM.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = adsDOM.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        // mobile wrapper
        const productDetailsWrapperMobile = adsDOM.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = adsDOM.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = adsDOM.createElement("EM");
        productPriceMobile.classList.add("product-price");
        productPriceMobile.innerHTML = product.currency + product.price;
        productDetailsWrapperMobile.appendChild(productPriceMobile);
      }
      break;
    }
    case 4: {
      // <div class="four-product-wrapper">
      //   <div class="row row-cols-4">
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/4.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //           <div class="product-details-wrapper">
      //             <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //             <em class="product-price">$260</em>
      //           </div>
      //         </div>

      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>;
      const fourProductWrapper = adsDOM.createElement("DIV");
      fourProductWrapper.classList.add("four-product-wrapper");
      productsContainer.appendChild(fourProductWrapper);

      const row = adsDOM.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-4");
      fourProductWrapper.appendChild(row);

      for (let i = 0; i <= 3; i++) {
        const product = adRenderingProducts[i];

        const col = adsDOM.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = adsDOM.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = adsDOM.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = adsDOM.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = adsDOM.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = adsDOM.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = adsDOM.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItem.appendChild(productDetailsWrapper);

        // const brandName = adsDOM.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = adsDOM.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = adsDOM.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        // mobile detailer wrapper
        const productDetailsWrapperMobile = adsDOM.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = adsDOM.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = adsDOM.createElement("EM");
        productPriceMobile.classList.add("product-price");
        productPriceMobile.innerHTML = product.currency + product.price;
        productDetailsWrapperMobile.appendChild(productPriceMobile);
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
      const fiveProductWrapper = adsDOM.createElement("DIV");
      fiveProductWrapper.classList.add("five-product-wrapper");
      productsContainer.appendChild(fiveProductWrapper);

      const product = adRenderingProducts[0];

      const row = adsDOM.createElement("DIV");
      row.classList.add("row");
      fiveProductWrapper.appendChild(row);

      const col = adsDOM.createElement("DIV");
      col.classList.add("col");
      row.appendChild(col);

      const productItemRedirectContainer = adsDOM.createElement("A");
      productItemRedirectContainer.classList.add("product-redirection-link");
      productItemRedirectContainer.style = "text-decoration: none;";
      productItemRedirectContainer.href = product.url;
      productItemRedirectContainer.target = "_blank";
      col.appendChild(productItemRedirectContainer);

      const productItemContainer = adsDOM.createElement("DIV");
      productItemContainer.classList.add("product-item-container");
      productItemContainer.addEventListener("click", function () {
        adsWindow.open(product.url, "_blank");
      });
      productItemRedirectContainer.appendChild(productItemContainer);

      const productItem = adsDOM.createElement("DIV");
      productItem.classList.add("product-item");
      productItem.style.backgroundImage = `url(${product.image})`;
      productItemContainer.appendChild(productItem);

      if (product.sale) {
        const onSaleTag = adsDOM.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItem.appendChild(onSaleTag);
      }

      const productDetailsWrapper = adsDOM.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItem.appendChild(productDetailsWrapper);

      const brandName = adsDOM.createElement("B");
      brandName.classList.add("brand-name");
      brandName.innerHTML = BRAND_NAME;
      productDetailsWrapper.appendChild(brandName);

      const productName = adsDOM.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = adsDOM.createElement("EM");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = product.currency + product.price;
      productDetailsWrapper.appendChild(productPrice);

      let countIndex = 1;
      for (let i = 1; i <= 2; i++) {
        const row = adsDOM.createElement("DIV");
        row.classList.add("row");
        row.classList.add("secondary-product-row");
        fiveProductWrapper.appendChild(row);

        for (let i = 1; i <= 2; i++) {
          const product = adRenderingProducts[countIndex];

          const col = adsDOM.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = adsDOM.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = adsDOM.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            adsWindow.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

          const productItem = adsDOM.createElement("DIV");
          productItem.classList.add("product-item");
          productItem.style.backgroundImage = `url(${product.image})`;
          productItemContainer.appendChild(productItem);

          if (product.sale) {
            const onSaleTag = adsDOM.createElement('SPAN');
            onSaleTag.classList.add("onsale");
            onSaleTag.innerHTML = "ON SALE";
            productItem.appendChild(onSaleTag);
          }

          const productDetailsWrapper = adsDOM.createElement("DIV");
          productDetailsWrapper.classList.add("product-details-wrapper");
          productItem.appendChild(productDetailsWrapper);

          const brandName = adsDOM.createElement("B");
          brandName.classList.add("brand-name");
          brandName.innerHTML = BRAND_NAME;
          productDetailsWrapper.appendChild(brandName);

          const productName = adsDOM.createElement("P");
          productName.classList.add("product-name");
          productName.innerHTML = product.name;
          productDetailsWrapper.appendChild(productName);

          const productPrice = adsDOM.createElement("EM");
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

      const sixProductWrapper = adsDOM.createElement("DIV");
      sixProductWrapper.classList.add("six-product-wrapper");
      productsContainer.appendChild(sixProductWrapper);

      let countIndex = 0;
      for (let index = 1; index <= 3; index++) {

        const row = adsDOM.createElement("DIV");
        row.classList.add("row");
        row.classList.add("secondary-product-row");
        sixProductWrapper.appendChild(row);

        for (let i = 1; i <= 2; i++) {
          const product = adRenderingProducts[countIndex];

          const col = adsDOM.createElement("DIV");
          col.classList.add("col-6");
          row.appendChild(col);

          const productItemRedirectContainer = adsDOM.createElement("A");
          productItemRedirectContainer.classList.add("product-redirection-link");
          productItemRedirectContainer.style = "text-decoration: none;";
          productItemRedirectContainer.href = product.url;
          productItemRedirectContainer.target = "_blank";
          col.appendChild(productItemRedirectContainer);

          const productItemContainer = adsDOM.createElement("DIV");
          productItemContainer.classList.add("product-item-container");
          productItemContainer.addEventListener("click", function () {
            adsWindow.open(product.url, "_blank");
          });
          productItemRedirectContainer.appendChild(productItemContainer);

          const productItem = adsDOM.createElement("DIV");
          productItem.classList.add("product-item");
          productItem.style.backgroundImage = `url(${product.image})`;
          productItemContainer.appendChild(productItem);

          if (product.sale) {
            const onSaleTag = adsDOM.createElement('SPAN');
            onSaleTag.classList.add("onsale");
            onSaleTag.innerHTML = "ON SALE";
            productItem.appendChild(onSaleTag);
          }

          const productDetailsWrapper = adsDOM.createElement("DIV");
          productDetailsWrapper.classList.add("product-details-wrapper");
          productItem.appendChild(productDetailsWrapper);

          const brandName = adsDOM.createElement("B");
          brandName.classList.add("brand-name");
          brandName.innerHTML = BRAND_NAME;
          productDetailsWrapper.appendChild(brandName);

          const productName = adsDOM.createElement("P");
          productName.classList.add("product-name");
          productName.innerHTML = product.name;
          productDetailsWrapper.appendChild(productName);

          const productPrice = adsDOM.createElement("EM");
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

