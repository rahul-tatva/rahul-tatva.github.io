const MAX_IMAGES_TO_RETURN = 6;
function getPositionOfCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}
function getAbsolutePositionOfCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  const absLeft = left + window.top.scrollX;
  const absTop = top + window.top.scrollY;
  return {
    x: absLeft + width / 2, // x = x1 + (width / 2)
    y: absTop + height / 2, // y = y1 + (height / 2)
  };
}
function getAbsolutePositionOnPage(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.top.scrollX,
    top: rect.top + window.top.scrollY,
    width: rect.width,
    height: rect.height,
  };
}
function getAbsoluteDistanceBetweenElementsOnPage(a, b) {
  const aPosition = getAbsolutePositionOfCenter(a);
  const bPosition = getAbsolutePositionOfCenter(b);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}
function getDistanceBetweenCenterOfElements(a, b) {
  const aCenterPosition = a.center;
  const bCenterPosition = b.center;
  return Math.hypot(
    aCenterPosition.x - bCenterPosition.x,
    aCenterPosition.y - bCenterPosition.y
  );
}
function findNearestImage(imageDataArray) {
  const nearestImageData = imageDataArray.reduce(function (prev, curr) {
    return prev.distance < curr.distance ? prev : curr;
  });
  return nearestImageData;
}
function getImagesAboveCenterOfAdContainer(
  adContainerData,
  imageSortedArray,
  countOfImagesToReturn = (MAX_IMAGES_TO_RETURN / 2)
) {
  const aboveNearestImages = [];
  let count = 0;
  for (
    let index = 0;
    index < imageSortedArray.length && count !== countOfImagesToReturn;
    index++
  ) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y <= adContainerData.center.y) {
      aboveNearestImages.push(imgData);
      count++;
    }
  }
  return aboveNearestImages;
}
function getAllImagesAboveCenterOfAdContainer(
  adContainerData,
  imageSortedArray
) {
  const aboveNearestImages = [];
  for (let index = 0; index < imageSortedArray.length; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y <= adContainerData.center.y)
      aboveNearestImages.push(imgData);
  }
  return aboveNearestImages;
}
function getImagesBelowCenterOfAdContainer(
  adContainerData,
  imageSortedArray,
  countOfImagesToReturn = (MAX_IMAGES_TO_RETURN / 2)
) {
  const belowNearestImages = [];
  let count = 0;
  for (
    let index = 0;
    index < imageSortedArray.length && count !== countOfImagesToReturn;
    index++
  ) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y > adContainerData.center.y) {
      belowNearestImages.push(imgData);
      count++;
    }
  }
  return belowNearestImages;
}
function getAllImagesBelowCenterOfAdContainer(
  adContainerData,
  imageSortedArray
) {
  const belowNearestImages = [];
  for (let index = 0; index < imageSortedArray.length; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y > adContainerData.center.y)
      belowNearestImages.push(imgData);
  }
  return belowNearestImages;
}
function getAllImagesInVisibleViewPort(
  windowDimensions,
  allAboveNearestImages,
  allBelowNearestImages
) {
  // here should we consider MAX( window.width, window.height) to find the nearest
  // const threshold = MAX( window.width, window.height)
  const aboveImagesInVisibleViewport = [];
  for (let index = 0; index < allAboveNearestImages.length; index++) {
    const imgData = allAboveNearestImages[index];
    if (imgData.distance <= windowDimensions.width) {
      aboveImagesInVisibleViewport.push(imgData);
    }
  }
  const belowImagesInVisibleViewport = [];
  // belowNearestImagesInVisibleViewport = allBelowNearestImages.filter((imgData) => imgData.distance <= windowDimensions.height);
  for (let index = 0; index < allBelowNearestImages.length; index++) {
    const imgData = allBelowNearestImages[index];
    if (imgData.distance <= windowDimensions.width) {
      belowImagesInVisibleViewport.push(imgData);
    }
  }
  // prepare resultant arrays
  const resultantAboveNearestImagesInVisibleViewport = aboveImagesInVisibleViewport.slice(0, (MAX_IMAGES_TO_RETURN / 2));
  const resultBelowNearestImagesInVisibleViewport = belowImagesInVisibleViewport.slice(0, MAX_IMAGES_TO_RETURN - resultantAboveNearestImagesInVisibleViewport.length);

  let filteredAboveNearestImagesInVisibleViewport = aboveImagesInVisibleViewport;
  resultantAboveNearestImagesInVisibleViewport.forEach((currentImgData) => {
    // let result = [];
    // for (let index = 0; index < aboveNearestImagesInVisibleViewport.length; index++) {
    //   const imgData = aboveNearestImagesInVisibleViewport[index];
    //   if (imgData.src !== currentImgData.src) result.push(currentImgData);
    // }
    // filteredAboveNearestImagesInVisibleViewport = result;
    filteredAboveNearestImagesInVisibleViewport = filteredAboveNearestImagesInVisibleViewport
      .filter((imgData) => imgData.src !== currentImgData.src);
  });

  let filteredBelowNearestImagesInVisibleViewport = belowImagesInVisibleViewport;
  resultBelowNearestImagesInVisibleViewport.forEach((currentImgData) => {
    // let result = [];
    // for (let index = 0; index < belowNearestImagesInVisibleViewport.length; index++) {
    //   const element = array[index];
    //   if (element.src !== currentImgData.src) result.push(currentImgData);
    // }
    // filteredBelowNearestImagesInVisibleViewport = result;
    filteredBelowNearestImagesInVisibleViewport = filteredBelowNearestImagesInVisibleViewport
      .filter((imgData) => imgData.src !== currentImgData.src);
  });

  // merge the results
  const mixVisibleImagesInViewport = [
    ...resultantAboveNearestImagesInVisibleViewport,
    ...resultBelowNearestImagesInVisibleViewport,
  ];
  return {
    mixVisibleImagesInViewport,
    // extra purpose for further processing
    filteredAboveNearestImagesInVisibleViewport,
    filteredBelowNearestImagesInVisibleViewport,
  };
}
function getNearestImagesUptoCount(imageSortedArray, count = MAX_IMAGES_TO_RETURN) {
  return imageSortedArray.slice(0, count);
}
function getKeyFromFlashtalkingSetup() {
  let keyValue = "";
  const scriptElementsCollection = document.getElementsByTagName("script");
  for (let i = 0; i < scriptElementsCollection.length; i++) {
    const scriptElement = scriptElementsCollection[i];
    if (scriptElement.getAttribute("src")) {
      const srcUrl = scriptElement.getAttribute("src");
      const urlObj = new URL(srcUrl);
      if (urlObj.searchParams.has("trendiiparam3")) {
        keyValue = urlObj.searchParams.get("trendiiparam3");
        break;
      }
    }
  }
  return keyValue;
}
// function testDimensionsOfElement(domElArray) {
//   domElArray.forEach(el => {
//     const toolTipDiv = document.createElement("DIV");
//     toolTipDiv.innerHTML = "test chckec";
//     toolTipDiv.style.backgroundColor = "white";
//     toolTipDiv.style.position = "absolute";
//     toolTipDiv.style.zIndex = 99;
//     el.parentNode.prepend(toolTipDiv)
//   });
// }
// to get the logs printed just uncomment the console.log
function trendiiLog(message) {
  console.log(message);
}
window.addEventListener("load", function handleWindowLoaded() {
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 150;
  const requestPayload = {
    key: getKeyFromFlashtalkingSetup(),
    windowWidth: 0,
    windowHeight: 0,
    frame: {
      // t: 516,
      // l: 211,
      // r: 371,
      // b: 1116,
    },
    // nearestImagesData: [],
  };
  // check if its a safe frame
  const w = window,
    sf = w["$sf"],
    ext = sf && sf.ext;
  if (ext) {
    /**
     * Identifies the z-index and location, width, and height (in pixels) of the SafeFrame container relative
     * to the browser or application window (win). In addition, width, height, and area percentage of
     * SafeFrame content in view is provided, based on how much of the container is located within the
     * boundaries of the browser or application window (win).
     */
    const sfCoordinates = sf.ext.geom();
    const { w, h } = sfCoordinates.win;
    const { t, l, r, b } = sfCoordinates.self;
    // prepare request payload
    requestPayload.windowWidth = w;
    requestPayload.windowHeight = h;
    requestPayload.frame = { t, l, r, b };
    trendiiLog(window.$sf);
    trendiiLog(window);
  }
  // same origin frame elements
  else if (window.frameElement) {
    trendiiLog(window);
    const adIframeEl = window.frameElement;
    // offset positions are relative to its parent not to the window/whole page
    const {
      offsetTop,
      offsetLeft,
      offsetWidth,
      offsetHeight,
    } = adIframeEl;
    const boundingRect = adIframeEl.getBoundingClientRect();
    // absolute positions from the relation to page itself including scrolls
    const absLeft = boundingRect.left + window.top.scrollX;
    const absTop = boundingRect.top + window.top.scrollY;
    // including scrolls
    const absoluteCoordinates = {
      t: absTop,
      l: absLeft,
      r: absLeft + boundingRect.width,
      b: absTop + boundingRect.height,
    };
    const windowDimensions = {
      width: window.top.innerWidth,
      height: window.top.innerHeight,
      scrollX: window.top.scrollX,
      scrollY: window.top.scrollY,
    };
    // prepare request payload
    requestPayload.windowWidth = window.top.innerWidth;
    requestPayload.windowHeight = window.top.innerHeight;
    requestPayload.frame = absoluteCoordinates;
    const adIframeCoordinates = {
      iframeEl: adIframeEl,
      // relative positions from the parentNode
      offsetLeft,
      offsetTop,
      offsetWidth,
      offsetHeight,
      rectTop: boundingRect.top,
      rectLeft: boundingRect.left,
      rectWidth: boundingRect.width,
      rectHeight: boundingRect.height,
      center: getAbsolutePositionOfCenter(adIframeEl),
    };
    // TO DO throw error if image selector not present
    const domImages = window.top.document.images;
    const allImagesArray = Array.from(domImages);
    // testDimensionsOfElement(allImagesArray);
    const regex = [
      /^.*(\.svg|\.gif|\.webp)(\?.*)?$/,
      /^data:(.+);base64,(.+)$/,
      /^data:image\/svg\+xml,(.+)$/,
      /^https:\/\/([\w\.]+)?facebook([\w\.-]+)\/.*/i,
    ];
    const filteredImageElements = allImagesArray.filter((imgEl) => {
      let ignore = false;
      if (imgEl.width < MIN_WIDTH && imgEl.height < MIN_HEIGHT) ignore = true;
      regex.forEach((reg) => { if (reg.test(imgEl.src)) ignore = true; });
      if (!ignore) return imgEl;
    });
    const allImagesDataArray = filteredImageElements.map((imgEl) => {
      const elemRect = imgEl.getBoundingClientRect();
      // Get relative positions from the parentNode
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = imgEl;
      const imageData = {
        imgEl,
        src: imgEl.src,
        // relative positions from the parentNode
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
        center: getAbsolutePositionOfCenter(imgEl),
        distance: getAbsoluteDistanceBetweenElementsOnPage(
          adIframeEl,
          imgEl
        ),
        // relative positions with window/browser/view port
        rectTop: elemRect.top,
        rectLeft: elemRect.left,
        rectWidth: elemRect.width,
        rectHeight: elemRect.height,
      };
      return imageData;
    });
    trendiiLog(allImagesDataArray);
    // sort ascending by distance for nearest images
    allImagesDataArray.sort((a, b) => a.distance - b.distance);
    trendiiLog(allImagesDataArray);
    trendiiLog(findNearestImage(allImagesDataArray));
    const allAboveImagesDataArray = getAllImagesAboveCenterOfAdContainer(
      adIframeCoordinates,
      allImagesDataArray
    );
    const allBelowImagesDataArray = getAllImagesBelowCenterOfAdContainer(
      adIframeCoordinates,
      allImagesDataArray
    );
    trendiiLog(allAboveImagesDataArray);
    trendiiLog(allBelowImagesDataArray);
    const {
      mixVisibleImagesInViewport,
      filteredAboveNearestImagesInVisibleViewport,
      filteredBelowNearestImagesInVisibleViewport,
    } = getAllImagesInVisibleViewPort(
      windowDimensions,
      allAboveImagesDataArray,
      allBelowImagesDataArray
    );
    trendiiLog(mixVisibleImagesInViewport);
    /*
    if (mixVisibleImagesInViewport.length < MAX_IMAGE_TO_RETURN) {
      const getRemainingImages = [];
      const remainingCount = MAX_IMAGES_TO_RETURN - visibleImagesInViewPort.length;
      switch (remainingCount) {
        case 1:
          // get 1 above image
          break;
        case 2:
          // get 1 above image
          // get 1 below
          break;

        case MAX_IMAGES_TO_RETURN:
          // get (MAX_IMAGES_TO_RETURN/2) above
          // get (MAX_IMAGES_TO_RETURN/2) below
          break;
        default:
          break;
      }
      if (remainingCount > 1) {

      } else {

      }
      const aboveImageCount = Math.ceil(remainingCount / 2);
    }

    // prepare data for request payload
    const aboveNearestImagesData = allAboveNearestImagesData.map((imgData) => ({
      src: imgData.src,
      distance: imgData.distance,
    }));
    const belowNearestImagesData = allBelowNearestImagesData.map((imgData) => ({
      src: imgData.src,
      distance: imgData.distance,
    }));
    */
    // prepare request payload
    requestPayload.nearestImageData = [
      ...mixVisibleImagesInViewport,
    ];
    trendiiLog(requestPayload);
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(requestPayload);
  const requestOptions = {
    method: "POST",
    headers: headers,
    body: raw,
  };
  fetch("https://beeswaxcreatives.trendii.com/adsEnvironment", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
});
