<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>TRENDii Ads | 300X600</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=no"
    />
    <meta name="description" content="This is Ads of Trendii Web" />
    <script src="https://rahul-tatva.github.io/assets/splide.min.js"></script>
    <link
      rel="stylesheet"
      href="https://rahul-tatva.github.io/assets/splide-core.min.css"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap"
    />
    <style>
      * {
        outline: none !important;
      }
      body {
        font-size: 14px;
        line-height: 18px;
        font-family: "Nunito Sans", sans-serif;
        -ms-overflow-style: scrollbar;
        -webkit-font-smoothing: subpixel-antialiased;
        margin: 0;
        padding: 0;
      }
      p {
        margin: 0;
      }
      .btn {
        background: none;
        box-shadow: none !important;
        outline: none !important;
        border: 0;
        cursor: pointer;
      }
      .btn.btn-slider {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2px 4px;
        border-radius: 50%;
      }
      .btn.btn-slider img {
        display: inline-block;
        vertical-align: top;
        width: 8px;
        height: 12px;
      }

      .block300X600-wrapper {
        display: block;
        width: 300px;
        height: 600px;
        background: #f9f9f9;
      }
      .block300X600-wrapper .outer {
        padding: 0 10px;
      }
      .block300X600-wrapper .brand-logo {
        overflow: hidden;
        padding: 14px 0;
        text-align: center;
        width: 280px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        background: #f32b97;
      }
      .block300X600-wrapper .brand-logo .logo-container {
        display: block;
        width: 99px;
        height: 21px;
        margin: 0 auto;
        background: url("https://rahul-tatva.github.io/assets/trendii-horizontal-logo-white.svg")
          no-repeat center center;
        background-size: contain;
      }
      .block300X600-wrapper .brand-logo .brand-title {
        display: block;
        font-size: 12px;
        line-height: 16px;
        color: #fff;
      }

      .block300X600-wrapper .product-item-wrapper .slider-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 13px 0;
      }
      .block300X600-wrapper
        .product-item-wrapper
        .slider-title
        .products-title {
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        font-weight: 700;
        color: #333333;
        margin: 0;
      }

      .block300X600-wrapper .all-product {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-bottom: -9px;
        height: 507px;
      }
      .block300X600-wrapper .product-item {
        position: relative;
        cursor: pointer;
        display: inline-block;
        vertical-align: middle;
        width: 133px;
        height: 157px;
        border-radius: 10px;
        border: 1px solid #e3e3e3;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        margin: 0 0 10px;
        overflow: hidden;
      }
      .block300X600-wrapper .splide__slide {
        display: inline-block;
        margin-right: 10px;
      }

      .block300X600-wrapper .product-item .card-body {
        color: #fff;
        display: block;
        border-radius: 10px;
        position: absolute;
        bottom: -100%;
        left: 0;
        right: 0;
        background: rgba(22, 22, 22, 0.75);
        z-index: 1;
        padding: 8px 10px;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .block300X600-wrapper .product-item .card-body b {
        display: block;
        font-size: 13px;
        line-height: 16px;
        font-weight: 600;
        max-height: 17px;
        overflow: hidden;
        padding-bottom: 0;
        margin-bottom: 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .block300X600-wrapper .product-item .card-body p {
        display: block;
        font-size: 13px;
        line-height: 16px;
        font-weight: 200;
        max-height: 17px;
        overflow: hidden;
        padding-bottom: 0;
        margin-bottom: 4px;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .block300X600-wrapper .product-item .card-body em {
        display: block;
        font-size: 13px;
        line-height: 16px;
        font-weight: 700;
        max-height: 17px;
        font-style: normal;
        text-decoration: none;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .block300X600-wrapper .product-item .onsale {
        display: block;
        padding: 2px 4px;
        text-transform: uppercase;
        position: absolute;
        top: 9px;
        left: -1px;
        width: 35px;
        background: #f32b97;
        color: #fff;
        font-size: 8px;
        line-height: 10px;
        z-index: 2;
        transition: all 0.3s ease;
      }
      .block300X600-wrapper .product-item .onsale:after {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        left: 100%;
        top: 0;
        bottom: 0;
        border-left: 0 solid transparent;
        border-right: 7px solid #fff0;
        border-top: 7px solid #f32b97;
        border-bottom: 7px solid #f32b97;
      }
      .block300X600-wrapper .splide__slide {
        margin-right: 5px;
      }

      .block300X600-wrapper .product-item .cashback-chip {
        background: rgba(23, 23, 23, 0.7);
        border-radius: 12px;
        color: #fff;
        font-size: 10px;
        line-height: 15px;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 2px;
        position: absolute;
        bottom: 6px;
        left: 50%;
        transform: translate(-50%, 0);
        min-width: 80px;
        text-align: center;
        font-style: normal;
        transition: all 0.3s ease;
        opacity: 1;
        visibility: visible;
      }
      .block300X600-wrapper .product-item:hover .onsale {
        opacity: 0;
        visibility: hidden;
        left: -100%;
      }
      .block300X600-wrapper .product-item:hover .card-body {
        opacity: 1;
        visibility: visible;
        bottom: 0;
      }
      .block300X600-wrapper .product-item:hover .cashback-chip {
        opacity: 0;
        visibility: hidden;
        bottom: -100%;
      }

             /* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
} 


    </style>
  </head>

  <body>
    <!-- 300X600 Ads wrapper start  -->
    <div class="block300X600-wrapper">
      <div class="outer">
        <div class="brand-logo">
        <!-- Trigger/Open The Modal -->
        <button id="myBtn">Open Modal</button>
          <a
            href="https://trendii.com/"
            target="_"
            title="TRENDii"
            class="logo-container"
          >
          </a>
        </div>

        <div class="product-item-wrapper splide">
          <div class="slider-title splide__arrows">
            <button
              class="btn btn-slider splide__arrow splide__arrow--prev"
              title="Previous"
            >
              <img src="https://rahul-tatva.github.io/assets/prev.svg" alt="" />
            </button>
            <h4 class="products-title">PRODUCTS</h4>
            <button
              class="btn btn-slider splide__arrow splide__arrow--next"
              title="Next"
            >
              <img src="https://rahul-tatva.github.io/assets/next.svg" alt="" />
            </button>
          </div>
          <div class="all-product splide__track">
            <ul class="splide__list" id="trendii-products-container-300X600">
              <li class="splide__slide">
                <div
                  class="product-item"
                  title="Product Name1"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/1.jpg);
                  "
                >
                  <span class="onsale">ON SALE</span>
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name2"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/2.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name3"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/3.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>
              </li>
              <li class="splide__slide">
                <div
                  class="product-item"
                  title="Product Name4"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/4.jpg);
                  "
                >
                  <span class="onsale">ON SALE</span>
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name5"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/2.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name6"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/3.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>
              </li>

              <li class="splide__slide">
                <div
                  class="product-item"
                  title="Product Name2"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/2.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name3"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/3.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name4"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/4.jpg);
                  "
                >
                  <span class="onsale">ON SALE</span>
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>
              </li>

              <li class="splide__slide">
                <div
                  class="product-item"
                  title="Product Name2"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/2.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name3"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/3.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name4"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/4.jpg);
                  "
                >
                  <span class="onsale">ON SALE</span>
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>
              </li>

              <li class="splide__slide">
                <div
                  class="product-item"
                  title="Product Name2"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/2.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name3"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/3.jpg);
                  "
                >
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>

                <div
                  class="product-item"
                  title="Product Name4"
                  style="
                    background-image: url(https://rahul-tatva.github.io/assets/4.jpg);
                  "
                >
                  <span class="onsale">ON SALE</span>
                  <div class="card-body">
                    <b>Nike</b>
                    <p>M2K tekno sneakers</p>
                    <em>$ 260</em>
                  </div>
                  <i class="cashback-chip">2% cashback</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
      <!-- The Modal -->
<div id="myModal" class="modal">
  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>
</div>
    <!-- 300X600 Ads wrapper end  -->
    <script>
      new Splide(".splide", {
        type: "loop",
        height: 507,
        perPage: 2,
        pagination: false,
        autoHeight: true,
        fixedWidth: 139,
      }).mount();

      
      // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
    </script>
  </body>
</html>
