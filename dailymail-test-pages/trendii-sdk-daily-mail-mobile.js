const API_GET_AD_PRODUCTS =
  "https://flashtalking-sandbox-f6i4ayd3wa-ts.a.run.app/?site=16230&banner=300x600&p1=12345&p2=12345&p3=12345";
// const API_GET_AD_PRODUCTS =
//   "https://beeswax-creative-f6i4ayd3wa-ts.a.run.app/webImageProcess";
const MOBILE_WIDTH = 480;
const TRENDII_NATIVE_ADS_CDN = "https://cdn.trendii.com/native-ads-sdk/assets";
const SUPPORTED_DIMENSIONS = ["160X600", "300X600"];
const AD_PRODUCTS_CONTAINER = "trendii-sdk-ad-products-container";
const PUBLISHER_NAME = "DAILY_MAIL";
const RETAILER_LOGO_ID = "retailer-logo";

// ad by default to below this class element
const DAILY_MAIL_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share";
const DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS = ".blkBorder.img-share.b-loaded";

const DAILY_MAIL_MOBILE_IMAGE_SELECTOR_CLASS = ".img-share";
const DAILY_MAIL_MOBILE_LOADED_IMAGE_SELECTOR_CLASS = ".img-share.b-loaded";

const IMAGE_GROUP_PARENT_DIV_CLASS = ".mol-img-group";
const MOBILE_IMAGE_GROUP_PARENT_TAG = "figure";

const DAILY_MAIL_IMAGE_CAPTION_CLASS = 'imageCaption';
const DAILY_MAIL_MOBILE_IMAGE_CAPTION_TAG = 'figcaption';

const RETAILER_NAME_TO_REPLACE_WITH = "{{RETAILER_NAME}}";
const SLIDER_CLASS_TO_REPLACE_WITH = "trendiiSliderUniqueString";
const SCRIPT_ID_TO_REPLACE = "trendiiSliderUniqueString-script";
window.FEED_PRODUCTS = {
  "success": true,
  "payload": [
    {
      "imageUrl": "https://i.dailymail.co.uk/i/pix/2016/07/02/21/35E49B0200000578-3671741-image-m-78_1467491674048.jpg",
      "products": [
        {
          "id": 4132934,
          "price": "990.00",
          "name": "Needle & Thread Sweet Petal embroidered dress - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/c317b9a054040539f4e2a6a4a75a83d5.jpg",
          "url": "https://trendii.com/dress/needle--thread-sweet-petal-embroidered-dress--white/d74bf41dc704cc218a7d726eb793e443",
          "currency": "£"
        },
        {
          "id": 4827204,
          "price": "920.00",
          "name": "Needle & Thread - Sweet Petal embroidered dress - women - Polyester - 6 - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/ef5c49bfad066ac9199016a5a872bf97.jpg",
          "url": "https://trendii.com/dress/needle--thread--sweet-petal-embroidered-dress--women--polyester--6--white/dcd5c84004e376860262256ffbf0fe9f",
          "currency": "$"
        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://cdn.trendii.com/assets/1.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://cdn.trendii.com/assets/2.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://cdn.trendii.com/assets/3.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://cdn.trendii.com/assets/4.jpg"

        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/1f43e1d522e530c8c627fe5995d53c09.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/607401445c51e9a8e60c9957437a3595.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/29f2196d2e992c2bb6e0ea932920de99.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/129/3fb71ff836dbbebb786d1523041bd803.JPG"
        }
      ]
    },
    {
      "imageUrl": "https://i.dailymail.co.uk/i/pix/2016/07/02/21/35E49AFE00000578-3671741-image-a-85_1467491854768.jpg",
      "products": [
        {
          "id": 4132934,
          "price": "990.00",
          "name": "Needle & Thread Sweet Petal embroidered dress - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/c317b9a054040539f4e2a6a4a75a83d5.jpg",
          "url": "https://trendii.com/dress/needle--thread-sweet-petal-embroidered-dress--white/d74bf41dc704cc218a7d726eb793e443",
          "currency": "£"
        },
        {
          "id": 4827204,
          "price": "920.00",
          "name": "Needle & Thread - Sweet Petal embroidered dress - women - Polyester - 6 - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/ef5c49bfad066ac9199016a5a872bf97.jpg",
          "url": "https://trendii.com/dress/needle--thread--sweet-petal-embroidered-dress--women--polyester--6--white/dcd5c84004e376860262256ffbf0fe9f",
          "currency": "$"
        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://cdn.trendii.com/assets/1.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://cdn.trendii.com/assets/2.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://cdn.trendii.com/assets/3.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://cdn.trendii.com/assets/4.jpg"

        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/1f43e1d522e530c8c627fe5995d53c09.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/607401445c51e9a8e60c9957437a3595.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/29f2196d2e992c2bb6e0ea932920de99.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/129/3fb71ff836dbbebb786d1523041bd803.JPG"
        }
      ]
    },
    {
      "imageUrl": "https://i.dailymail.co.uk/i/pix/2016/07/02/21/35E4A21200000578-3671741-image-m-89_1467492028765.jpg",
      "products": [
        {
          "id": 4132934,
          "price": "990.00",
          "name": "Needle & Thread Sweet Petal embroidered dress - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/c317b9a054040539f4e2a6a4a75a83d5.jpg",
          "url": "https://trendii.com/dress/needle--thread-sweet-petal-embroidered-dress--white/d74bf41dc704cc218a7d726eb793e443",
          "currency": "£"
        },
        {
          "id": 4827204,
          "price": "920.00",
          "name": "Needle & Thread - Sweet Petal embroidered dress - women - Polyester - 6 - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/ef5c49bfad066ac9199016a5a872bf97.jpg",
          "url": "https://trendii.com/dress/needle--thread--sweet-petal-embroidered-dress--women--polyester--6--white/dcd5c84004e376860262256ffbf0fe9f",
          "currency": "$"
        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://cdn.trendii.com/assets/1.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://cdn.trendii.com/assets/2.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://cdn.trendii.com/assets/3.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://cdn.trendii.com/assets/4.jpg"

        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/1f43e1d522e530c8c627fe5995d53c09.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/607401445c51e9a8e60c9957437a3595.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/29f2196d2e992c2bb6e0ea932920de99.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/129/3fb71ff836dbbebb786d1523041bd803.JPG"
        }
      ]
    },
    {
      "imageUrl": "https://i.dailymail.co.uk/i/pix/2016/07/02/21/35E49B0E00000578-3671741-image-a-98_1467492130770.jpg",
      "products": [
        {
          "id": 4132934,
          "price": "990.00",
          "name": "Needle & Thread Sweet Petal embroidered dress - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/c317b9a054040539f4e2a6a4a75a83d5.jpg",
          "url": "https://trendii.com/dress/needle--thread-sweet-petal-embroidered-dress--white/d74bf41dc704cc218a7d726eb793e443",
          "currency": "£"
        },
        {
          "id": 4827204,
          "price": "920.00",
          "name": "Needle & Thread - Sweet Petal embroidered dress - women - Polyester - 6 - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/ef5c49bfad066ac9199016a5a872bf97.jpg",
          "url": "https://trendii.com/dress/needle--thread--sweet-petal-embroidered-dress--women--polyester--6--white/dcd5c84004e376860262256ffbf0fe9f",
          "currency": "$"
        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://cdn.trendii.com/assets/1.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://cdn.trendii.com/assets/2.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://cdn.trendii.com/assets/3.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://cdn.trendii.com/assets/4.jpg"

        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/1f43e1d522e530c8c627fe5995d53c09.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/607401445c51e9a8e60c9957437a3595.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/29f2196d2e992c2bb6e0ea932920de99.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/129/3fb71ff836dbbebb786d1523041bd803.JPG"
        }
      ]
    },
    {
      "imageUrl": "https://i.dailymail.co.uk/i/pix/2016/07/02/21/35E49B0600000578-3671741-image-m-103_1467492294627.jpg",
      "products": [
        {
          "id": 4132934,
          "price": "990.00",
          "name": "Needle & Thread Sweet Petal embroidered dress - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/c317b9a054040539f4e2a6a4a75a83d5.jpg",
          "url": "https://trendii.com/dress/needle--thread-sweet-petal-embroidered-dress--white/d74bf41dc704cc218a7d726eb793e443",
          "currency": "£"
        },
        {
          "id": 4827204,
          "price": "920.00",
          "name": "Needle & Thread - Sweet Petal embroidered dress - women - Polyester - 6 - White",
          "cashback": "4%",
          "sale": false,
          "category": "dress",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/ef5c49bfad066ac9199016a5a872bf97.jpg",
          "url": "https://trendii.com/dress/needle--thread--sweet-petal-embroidered-dress--women--polyester--6--white/dcd5c84004e376860262256ffbf0fe9f",
          "currency": "$"
        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://cdn.trendii.com/assets/1.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://cdn.trendii.com/assets/2.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://cdn.trendii.com/assets/3.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://cdn.trendii.com/assets/4.jpg"

        },
        {
          "name": "Levi's turned hem denim shorts - White",
          "price": "102.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151575&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Flevis-turned-hem-denim-shorts--white%2F983e3a1c9ee2d82afba6b929196fc46a",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/1f43e1d522e530c8c627fe5995d53c09.jpg"
        },
        {
          "name": "Acne Studios - high-rise denim shorts - women - Cotton - 25, 26 - Blue",
          "price": "320.00",
          "sale": false,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=7470268&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Facne-studios--highrise-denim-shorts--women--cotton--25-26--blue%2F1a6577625b11ccbf1606da90eab40d3b",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/310/607401445c51e9a8e60c9957437a3595.jpg"
        },
        {
          "name": "FRAME cutoff shorts - White",
          "price": "286.00",
          "sale": false,
          "category": "shorts",
          "currency": "£",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=4151674&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fframe-cutoff-shorts--white%2F5f2df18200d959ebbc0244afc694ffa3",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/33/29f2196d2e992c2bb6e0ea932920de99.jpg"
        },
        {
          "name": "MAISON MARGIELA Shorts - Item 13301120",
          "price": "569.40",
          "sale": true,
          "category": "shorts",
          "currency": "$",
          "url": "https://affiliate.trendii.com/affiliate-link?affiliateId=TRENDII&utm_source=12345&utm_campaign=12345&utm_term=8338005&utm_content=12345&utm_medium=12345&redirectUrl=https%3A%2F%2Ftrendii.com%2Fshorts%2Fmaison-margiela-shorts--item-13301120%2F37777f125f61b7a648e938715d690ecf",
          "image": "https://storage.googleapis.com/trendii-products/__trendii__images__/129/3fb71ff836dbbebb786d1523041bd803.JPG"
        }
      ]
    },
  ]
};
class TRENDiiAd {
  constructor(options) {
    //debugger;
    this.loadScriptIntoHead("https://cdn.trendii.com/assets/splide.min.js");
    // this.loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js");

    this.loadStyleSheetIntoHead("https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css");
    this.loadStyleSheetIntoHead("https://cdn.trendii.com/assets/splide-core.min.css");
    this.loadStyleSheetIntoHead("https://rahul-tatva.github.io/sdk-html-templates/trendii-sdk-daily-mail-slider.css");
    this.loadStyleSheetIntoHead("https://rahul-tatva.github.io/sdk-html-templates/trendii-sdk-daily-mail-all-product.css");
    console.log("sdk constructor initialized");
    // this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/Products-Silder.css");
    // this.loadScript("https://unpkg.com/axios/dist/axios.min.js");
    // <link rel="stylesheet" href="./sdk-html-templates/trendii-sdk-daily-mail-slider.css"></link>
    // options initialization
    this.options = options;
    this.width = options?.width || 0;
    this.height = options?.height || 0;
    // native ad options to by pass iframes
    this.isNativeAd = options?.isNativeAd || false;
    this.adPosition = options?.adPosition || "bottom";
    this.brandName = options?.brandName || "";
    this.blogContainerSelector = options?.blogContainerSelector;
    //debugger;

    // variable needed to store some data and info
    this.feedProducts = [];
    this.htmlString;
    this.allImageElements;
    this.currentlyVisibleImageSrcURL = null;
    this.intersectionObserver;
    // this.feedProductsWithGeneratedAds = [];

    // native ads constants
    this.API_GET_NATIVE_AD_SLIDER_TEMPLATE = `https://rahul-tatva.github.io/sdk-html-templates/Products-Slider-dynamic.html`;
    this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE = `https://rahul-tatva.github.io/sdk-html-templates/Products-728X90-all-product-dynamic.html`;
    this.HTML_TEMPLATE_SIMPLE_CONTAINER_ID = "trendii-products-container-728X90";
    this.nativeAdSimpleTemplateHTMLString = null;

    this.nativeAdSliderTemplateHTMLString = null;
    this.API_GET_NATIVE_AD_PRODUCT = `https://beeswaxcreatives.trendii.com/img-creatives`;
    this.HTML_TEMPLATE_AD_WRAPPER_ID = "trendii-native-ad-wrapper";
    this.HTML_TEMPLATE_SLIDER_CONTAINER_ID = "trendii-sdk-ad-products-container";

    //NATIVE AD CODE START
    // document.addEventListener("DOMContentLoaded", this.handleDOMLoaded.bind(this));
    // window.addEventListener("load", () => { });

    // window.addEventListener("load", () => {
    //   console.log("DOM is ready");
    //   //debugger;
    //   this.getAllDailyMailBlogImagesFromDOM();
    //   const requestOptions = { method: "GET" };

    //   Promise.all([
    //     fetch(this.API_GET_NATIVE_AD_SLIDER_TEMPLATE).then((response) => response.text()),
    //     fetch(this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE).then((response) => response.text()),
    //   ]).then(allResponses => {
    //     this.nativeAdSliderTemplateHTMLString = allResponses[0];
    //     this.nativeAdSimpleTemplateHTMLString = allResponses[1];
    //     // const response3 = allResponses[2];
    //     console.log("templates are ready");
    //     this.getProductsForAllImages();
    //   });
    // });

    document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM is ready");
      //debugger;
      this.getAllDailyMailBlogImagesFromDOM();
      const requestOptions = { method: "GET" };

      Promise.all([
        fetch(this.API_GET_NATIVE_AD_SLIDER_TEMPLATE).then((response) => response.text()),
        fetch(this.API_GET_NATIVE_AD_SIMPLE_TEMPLATE).then((response) => response.text()),
      ]).then(allResponses => {
        this.nativeAdSliderTemplateHTMLString = allResponses[0];
        this.nativeAdSimpleTemplateHTMLString = allResponses[1];
        // const response3 = allResponses[2];
        console.log("templates are ready");
        this.getProductsForAllImages();
      });

      // fetch(this.API_GET_NATIVE_AD_SLIDER_TEMPLATE, requestOptions)
      //   .then((response) => response.text())
      //   .then((response) => {
      //     //debugger;
      //     // //debugger;
      //     this.nativeAdSliderTemplateHTMLString = response;
      //     // this.log(response.data);
      //     // this.getProductsForAllImages();
      //     // this.appendAdContainersToImages();
      //     this.getProductsForAllImages();
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     typeof onErrorCallback === "function" && onErrorCallback(error);
      //   });
    });
  }
  loadStyleSheetIntoHead(url) {
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
  getAllDailyMailBlogImagesFromDOM() {
    //debugger;
    // TO DO throw error if image selector not present
    this.allImageElements = document.querySelectorAll(this.options.adImagesSelector);
    this.allValidImageSrcArray = [];
    if (window.innerWidth <= MOBILE_WIDTH) {

      const alreadyLoadedImagesArray = Array.from(document.querySelectorAll(DAILY_MAIL_MOBILE_LOADED_IMAGE_SELECTOR_CLASS))
        .map(img => img.getAttribute("src"));
      this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

      // async loadable images
      const imagesWhichAreYetToBeLoaded = Array.from(document.querySelectorAll(DAILY_MAIL_MOBILE_IMAGE_SELECTOR_CLASS))
        .map(img => img.getAttribute("data-src"))
        // filter null values or undefined
        .filter(x => x);
      this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
    } else {
      // consider desktop view
      const alreadyLoadedImagesArray = Array.from(document.querySelectorAll(DAILY_MAIL_LOADED_IMAGE_SELECTOR_CLASS))
        .map(img => img.getAttribute("src"));
      this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);

      // async loadable images
      const imagesWhichAreYetToBeLoaded = Array.from(document.querySelectorAll(DAILY_MAIL_IMAGE_SELECTOR_CLASS))
        .map(img => img.getAttribute("data-src"))
        // filter null values or undefined
        .filter(x => x);
      this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
    }

    this.log(this.allValidImageSrcArray);
  };
  initializeSliderSetup() {
    // new Splide('.splide', {
    //   type: 'loop',
    //   // perPage: 6,
    //   pagination: false,
    //   gap: 10,
    //   autoWidth: true,
    //   // width: 400,
    //   // fixedWidth: 200,
    // }).mount();
  }
  getProductsForAllImages(onSuccessCallback) {
    //debugger;
    const requestBody = {
      // "webpageUrl": "https://rahul-tatva.github.io/fashion-blog-below-ads.html",
      "webpageUrl": window.location.href,
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
          if (response?.success === true) {
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
            this.createAdTemplatesForAllProducts();
            this.getAllParentImageGroupClassMobile();
            this.log(this.feedProducts);
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
  createAdTemplatesForAllProducts() {
    this.feedProducts.payload.map((imageData, index) => {
      if (imageData?.products.length > 0) {
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
    if (window.innerWidth > MOBILE_WIDTH) {
      products = imageData.products.slice(0, 4);
    }
    const advertiserName = imageData.advertiserName;
    const identifier = `splide${index}`;
    imageData.sliderId = identifier;

    // const newDOM = this.nativeAdSliderTemplateHTMLString
    //   .replaceAll(SLIDER_CLASS_TO_REPLACE_WITH, identifier);
    // // .replaceAll(RETAILER_NAME_TO_REPLACE_WITH, advertiserName);

    // const domParser = new DOMParser();
    // const templatesDOM = domParser.parseFromString(newDOM, "text/html");


    // dynamic logo for the advertiser
    // const logoUrl = `${TRENDII_NATIVE_ADS_CDN}/${advertiserName.toLowerCase()}.png`;
    // const retailerLogoEl = templatesDOM.getElementById(RETAILER_LOGO_ID);
    // retailerLogoEl.title = advertiserName;
    // // when the logo is used as the image tag
    // retailerLogoEl.src = logoUrl;


    // when the logo is used as the div tag
    // const newBackgroundStyle = 'url("' + logoUrl + '") no-repeat center center';
    // // retailerLogoEl.style.background = `url("${logoUrl}") no-repeat center center;`;
    // retailerLogoEl.style.background = newBackgroundStyle;
    // retailerLogoEl.style.backgroundSize = "contain";

    // to resolve the issue for the slider getting too much height while rendering
    // const adProductsSliderContainer = templatesDOM.getElementById(identifier);
    // adProductsSliderContainer.style.display = "none";


    // let productsContainerEl = templatesDOM.getElementById(this.HTML_TEMPLATE_SLIDER_CONTAINER_ID);
    // productsContainerEl.innerHTML = "";

    // const scriptId = `${identifier}-script`;
    // let scriptTag = templatesDOM.getElementById(scriptId);
    // imageData.scriptTag = scriptTag;
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

        // const logo = document.getElementById("logo");
        // logo.addEventListener("click", function () {
        //   window.open(feedProducts[0].url, "_blank");
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
        // productsContainerEl.style.display = "none";
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
    if (window.innerWidth <= MOBILE_WIDTH) {
      allParentElements = document.querySelectorAll(MOBILE_IMAGE_GROUP_PARENT_TAG);
    } else {
      allParentElements = document.querySelectorAll(IMAGE_GROUP_PARENT_DIV_CLASS);
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
        if (foundImageData?.generatedAdHTML) {
          foundImageElement = currentImageEle;
          break;
        }
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
        adContainer.style.maxHeight = "300px";
        // adContainer.appendChild(findImageData.generatedAdHTML);

        const adContainerMobile = document.createElement('div');
        adContainerMobile.classList.add("ads-inside-the-images");
        // adContainerMobile.style.background = "yellow";
        // adContainerMobile.style.height = "max-content";
        // adContainerMobile.appendChild(foundImageData.generatedAdHTML);
        // foundImageElement.after(adContainerMobile);

        // append the found ad just after the image caption
        const titleOfImageGroup = parentEl
          .getElementsByTagName(DAILY_MAIL_MOBILE_IMAGE_CAPTION_TAG)[0];
        if (titleOfImageGroup) {
          titleOfImageGroup.after(foundImageData.generatedAdHTML);
        } else {
          parentEl.appendChild(foundImageData.generatedAdHTML);
        }

        // parentEl
        //   .after(foundImageData.generatedAdHTML);
        // const script = foundImageData.scriptTag;
        const identifier = foundImageData.sliderId;
        const sliderIdSelector = `#${identifier}`;
        console.log(identifier);

        // const sc = document.createElement('script');
        // sc.innerHTML = foundImageData.scriptTag.innerHTML;
        // document.body.appendChild(sc);
        //debugger;
        // setup the splid lib to initialize the slider

        if (foundImageData.isSliderTemplate) {
          console.log(window.Splide);
          if (window.Splide) {
            const testSlider = new Splide(sliderIdSelector, {
              type: 'loop',
              pagination: false,
              gap: 10,
              autoWidth: true,
              autoHeight: true,
            }).mount();
            const adProductsSliderContainer = document.getElementById(identifier);
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



          // setTimeout(() => { }, 2000);

          // const div = document.createElement('div');
          // div.style.background = "yellow";
          // parentEl.getElementsByClassName('imageCaption')[0].after(div);
          // parentEl.getElementsByClassName('imageCaption')[0].after(div);
        }
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
  getAllAdContainersFromDOM() {
    this.allAdContainers = document.querySelectorAll(this.options.adContainer);
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

    const productDetailsWrapperMobile = document.createElement("DIV");
    productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
    productItemContainer.appendChild(productDetailsWrapperMobile);
    // productDetailsWrapperMobile.addEventListener("click", function () {
    //   window.open(product.url, "_blank");
    // });

    // const productName = document.createElement("B");
    // productName.classList.add("brand-name");
    // productName.innerHTML = this.brandName;
    // productDetailsWrapper.appendChild(productName);

    const productNameP = document.createElement("P");
    productNameP.classList.add("product-name");
    productNameP.innerHTML = product.name;
    productDetailsWrapper.appendChild(productNameP);

    const productNamePMobile = document.createElement("P");
    productNamePMobile.classList.add("product-name");
    productNamePMobile.innerHTML = product.name;
    productDetailsWrapperMobile.appendChild(productNamePMobile);

    // const productCashbackPercentage = document.createElement("SPAN");
    // productCashbackPercentage.classList.add("product-cashback-chip");
    // productCashbackPercentage.innerHTML = "4%" + " Cashback";
    // productDetailsWrapper.appendChild(productCashbackPercentage);

    const productPrice = document.createElement("EM");
    productPrice.classList.add("product-price");
    productPrice.innerHTML = product.currency + product.price;
    productDetailsWrapper.appendChild(productPrice);

    const productPriceMobile = document.createElement("EM");
    productPriceMobile.classList.add("product-price");
    productPriceMobile.innerHTML = product.currency + product.price;
    productDetailsWrapperMobile.appendChild(productPriceMobile);
  }
}

(function () {
  // var foo = 3;
  // this.log(foo);

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

      const productName = document.createElement("P");
      productName.classList.add("product-name");
      productName.innerHTML = product.name;
      productDetailsWrapper.appendChild(productName);

      const productPrice = document.createElement("EM");
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
      // const adWrapper = document.getElementsByClassName("block728X90-wrapper")[0];
      // adWrapper.addEventListener("click", function () {
      //   window.open(product.url, "_blank");
      // });
      // // to fix curser pointer issue
      // adWrapper.style.cursor = "pointer";

      const oneProductWrapper = document.createElement("DIV");
      oneProductWrapper.classList.add("one-product-wrapper");
      productsContainer.appendChild(oneProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      oneProductWrapper.appendChild(row);

      const col = document.createElement("DIV");
      col.classList.add("col-12");
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
      productItemContainer.appendChild(productItem);

      const productItemImage = document.createElement("DIV");
      productItemImage.classList.add("product-item-image");
      productItemImage.style.backgroundImage = `url(${product.image})`;
      productItem.appendChild(productItemImage);

      if (product.sale) {
        const onSaleTag = document.createElement('SPAN');
        onSaleTag.classList.add("onsale");
        onSaleTag.innerHTML = "ON SALE";
        productItemImage.appendChild(onSaleTag);
      }

      const productDetailsWrapper = document.createElement("DIV");
      productDetailsWrapper.classList.add("product-details-wrapper");
      productItemContainer.appendChild(productDetailsWrapper);

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
      const twoProductWrapper = document.createElement("DIV");
      twoProductWrapper.classList.add("two-product-wrapper");
      productsContainer.appendChild(twoProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      twoProductWrapper.appendChild(row);

      for (let i = 0; i <= 1; i++) {
        const product = adRenderingProducts[i];

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
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

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
      //   <div class="row row-cols-3">
      //     <div class="col">
      //       <div class="product-item-container">
      //         <div class="product-item">
      //           <div class="product-item-image"
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
      //           <em class="product-price">$260</em>
      //         </div>
      //         <div class="product-details-wrapper-mobile">
      //           <p class="product-name">Relaxed Stripe Dress</p>
      //           <em class="product-price">$119.00</em>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      const threeProductWrapper = document.createElement("DIV");
      threeProductWrapper.classList.add("three-product-wrapper");
      productsContainer.appendChild(threeProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-3");
      threeProductWrapper.appendChild(row);

      for (let i = 0; i <= 2; i++) {
        const product = adRenderingProducts[i];

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = document.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        // const brandName = document.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = document.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = document.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        const productDetailsWrapperMobile = document.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = document.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = document.createElement("EM");
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      //             style="background-image: url(https://cdn.trendii.com/assets/1.jpg)">
      //             <span class="onsale">ON SALE</span>
      //           </div>
      //         </div>
      //         <div class="product-details-wrapper">
      //           <b class="brand-name">MARCO POLO </b>
      //           <p class="product-name">M2K tekno sneakers tekno tekno tekno tekno tekno v</p>
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
      const fourProductWrapper = document.createElement("DIV");
      fourProductWrapper.classList.add("four-product-wrapper");
      productsContainer.appendChild(fourProductWrapper);

      const row = document.createElement("DIV");
      row.classList.add("row");
      row.classList.add("row-cols-4");
      fourProductWrapper.appendChild(row);

      for (let i = 0; i <= 3; i++) {
        const product = adRenderingProducts[i];

        const col = document.createElement("DIV");
        col.classList.add("col");
        row.appendChild(col);

        const productItemRedirectContainer = document.createElement("A");
        productItemRedirectContainer.classList.add("product-redirection-link");
        // productItemRedirectContainer.style = "text-decoration: none;";
        productItemRedirectContainer.href = product.url;
        productItemRedirectContainer.target = "_blank";
        col.appendChild(productItemRedirectContainer);

        const productItemContainer = document.createElement("DIV");
        productItemContainer.classList.add("product-item-container");
        productItemRedirectContainer.appendChild(productItemContainer);

        const productItem = document.createElement("DIV");
        productItem.classList.add("product-item");
        productItemContainer.appendChild(productItem);

        const productItemImage = document.createElement("DIV");
        productItemImage.classList.add("product-item-image");
        productItemImage.style.backgroundImage = `url(${product.image})`;
        productItem.appendChild(productItemImage);

        if (product.sale) {
          const onSaleTag = document.createElement('SPAN');
          onSaleTag.classList.add("onsale");
          onSaleTag.innerHTML = "ON SALE";
          productItemImage.appendChild(onSaleTag);
        }

        const productDetailsWrapper = document.createElement("DIV");
        productDetailsWrapper.classList.add("product-details-wrapper");
        productItemContainer.appendChild(productDetailsWrapper);

        // const brandName = document.createElement("B");
        // brandName.classList.add("brand-name");
        // brandName.innerHTML = BRAND_NAME;
        // productDetailsWrapper.appendChild(brandName);

        const productName = document.createElement("P");
        productName.classList.add("product-name");
        productName.innerHTML = product.name;
        productDetailsWrapper.appendChild(productName);

        const productPrice = document.createElement("EM");
        productPrice.classList.add("product-price");
        productPrice.innerHTML = product.currency + product.price;
        productDetailsWrapper.appendChild(productPrice);

        const productDetailsWrapperMobile = document.createElement("DIV");
        productDetailsWrapperMobile.classList.add("product-details-wrapper-mobile");
        productItemContainer.appendChild(productDetailsWrapperMobile);

        const productNameMobile = document.createElement("P");
        productNameMobile.classList.add("product-name");
        productNameMobile.innerHTML = product.name;
        productDetailsWrapperMobile.appendChild(productNameMobile);

        const productPriceMobile = document.createElement("EM");
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