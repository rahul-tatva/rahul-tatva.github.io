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
const SLIDER_CLASS_TO_REPLACE = "trendiiSliderUniqueString";
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
    debugger;
    this.loadStyleSheet("https://cdn.trendii.com/assets/splide-core.min.css");
    // this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/trendii-sdk-daily-mail-slider.css");
    this.loadStyleSheet("https://rahul-tatva.github.io/sdk-html-templates/Products-Silder.css");
    this.loadScript("https://unpkg.com/axios/dist/axios.min.js");
    this.loadScript("https://cdn.trendii.com/assets/splide.min.js");
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
    debugger;


    // variable needed to store some data and info
    this.feedProducts = [];
    this.htmlString;
    this.allImageElements;
    this.currentlyVisibleImageSrcURL = null;
    this.intersectionObserver;
    // this.feedProductsWithGeneratedAds = [];

    // native ads constants
    this.GET_NATIVE_AD_TEMPLATE = `https://rahul-tatva.github.io/sdk-html-templates/Products-Slider-dynamic.html`;
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
      const requestOptions = { method: "GET" };
      fetch(this.GET_NATIVE_AD_TEMPLATE, requestOptions)
        .then((response) => response.text())
        .then((response) => {
          debugger;
          // debugger;
          this.nativeAdHTMLString = response;
          // console.log(response.data);
          // this.getProductsForAllImages();
          // this.appendAdContainersToImages();
          this.getProductsForAllImages(this.initializeSliderSetup());
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
  loadScriptIntoHead(url) {
    document.head.appendChild(document.createElement("script")).src = url;
  }
  getAllImagesFromDOM() {
    debugger;
    // TO DO throw error if image selector not present
    this.allImageElements = document.querySelectorAll(this.options.adImagesSelector);
    this.allValidImageSrcArray = [];
    const alreadyLoadedImagesArray = Array.from(document.querySelectorAll('.blkBorder.img-share.b-loaded'))
      .map(img => img.getAttribute("src"));
    this.allValidImageSrcArray.push(...alreadyLoadedImagesArray);
    const imagesWhichAreYetToBeLoaded = Array.from(document.querySelectorAll(DAILY_MAIL_IMAGE_SELECTOR_CLASS))
      .map(img => img.getAttribute("data-src"))
      // filter null values or undefined
      .filter(x => x);
    this.allValidImageSrcArray.push(...imagesWhichAreYetToBeLoaded);
    console.log(this.allValidImageSrcArray);
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
    debugger;
    const requestBody = {
      // "webpageUrl": "https://rahul-tatva.github.io/fashion-blog-below-ads.html",//window.location.href,
      "webpageUrl": window.location.href,
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
    fetch(this.GET_NATIVE_AD_PRODUCT, requestOptions)
      .then((response) => response.json())
      .then((response) => {
        debugger;
        // if feed does not deliver an empty response
        if (response !== "") {
          if (response?.success === true) {
            debugger;
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
            // new Splide('.splide', {
            //   type: 'loop',
            //   // perPage: 6,
            //   pagination: false,
            //   gap: 10,
            //   autoWidth: true,
            //   // width: 400,
            //   // fixedWidth: 200,
            // }).mount();
            console.log(this.feedProducts);
          }
          // else {
          //   this.feedProducts = window.FEED_PRODUCTS;
          //   this.createAdTemplatesForAllProducts();
          //   this.getAllParentImageGroupClass();
          //   onSuccessCallback();
          //   console.log(this.feedProducts);
          // }
        } else {
          // empty response from feed
          console.log("empty feed response");
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
        const ad = this.createAdsForAllProducts(imageData?.products, index);
        imageData.generatedAdHTML = ad;
        imageData.generatedAdString = ad.innerHTML;
      }
    });
  }
  createAdsForAllProducts(products, index) {
    debugger;
    const newDOM = this.nativeAdHTMLString.replaceAll(SLIDER_CLASS_TO_REPLACE, `splide${index}`);
    const domParser = new DOMParser();
    const templatesDOM = domParser.parseFromString(newDOM, "text/html");
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
    let isThereAnySliderAds = false;
    this.parentImageGroupElements.forEach((parentEl, index) => {
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
      if (findImageData?.generatedAdHTML) {
        isThereAnySliderAds = true;
        const adContainer = document.createElement('div');
        adContainer.classList.add("adContainer");
        adContainer.style.background = "yellow";
        // adContainer.style.height = "100px";
        adContainer.appendChild(findImageData.generatedAdHTML);
        parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(adContainer);
        // const div = document.createElement('div');
        // div.style.background = "yellow";
        // parentEl.getElementsByClassName('imageCaption')[0].after(div);
        // parentEl.getElementsByClassName('imageCaption')[0].after(div);
      }
      // debugger;
      // const div = document.createElement('div');
      // div.style.background = "yellow";
      // div.style.height = "100px";
      // parentEl.getElementsByClassName(DAILY_MAIL_IMAGE_CAPTION_CLASS)[0].after(div);
      if (index === (this.parentImageGroupElements.length - 1) && isThereAnySliderAds) {
        setTimeout(() => {
          // new Splide('.splide', {
          //   type: 'loop',
          //   // perPage: 6,
          //   pagination: false,
          //   gap: 10,
          //   autoWidth: true,
          //   // width: 400,
          //   // fixedWidth: 200,
          // }).mount();
        }, 5000);
      }
    });
    debugger;

    debugger;
    // document.querySelectorAll(".mol-img-group")[0].getElementsByTagName('img');
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0];
    // document.querySelectorAll(".mol-img-group")[0].getElementsByClassName('imageCaption')[0].after(t);
  }
  getAllAdContainersFromDOM() {
    this.allAdContainers = document.querySelectorAll(this.options.adContainer);
  }
  // appendAdContainersToImages() {
  //   debugger;
  //   this.allImageElements.forEach(imageEl => {
  //     this.adContainer = document.createElement("DIV");
  //     this.adContainer.classList.add("ad-container");
  //     // this.adContainer.style.background = "yellow";
  //     // adContainer.innerHTML = "tesetste";
  //     const imageSrc = imageEl.src;
  //     debugger;
  //     this.renderAdInsideTheAdContainer(imageSrc, this.adContainer);
  //     debugger;
  //     imageEl.after(this.adContainer);
  //     debugger;
  //     // imageEl.parentNode.insertAdjacentHTML(sliderItem, imageEl.nextSibling);
  //     // imageEl.insertAdjacentHTML("afterend", sliderItem);
  //     // imageEl.parentNode.appendChild(sliderItem);
  //   });
  //   new Splide('.splide', {
  //     type: 'loop',
  //     // perPage: 6,
  //     pagination: false,
  //     gap: 10,
  //     autoWidth: true,
  //     // width: 400,
  //     // fixedWidth: 200,
  //   }).mount();
  // }
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

