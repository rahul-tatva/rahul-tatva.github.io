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
  const nearestImageData = imageDataArray.reduce((prev, curr) =>
    prev.distance < curr.distance ? prev : curr
  );
  return nearestImageData;
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
function filteredNearestImagesInVisibleViewport(
  totalImagesDataArray,
  filteringImagesWhichAreNeedsToBeExcluded
) {
  // filter out taken images
  let filteredAboveOrBelowNearestImagesData = totalImagesDataArray;
  filteringImagesWhichAreNeedsToBeExcluded.forEach((filteringImgData) => {
    // let result = [];
    // for (let index = 0; index < aboveNearestImagesInVisibleViewport.length; index++) {
    //   const imgData = aboveNearestImagesInVisibleViewport[index];
    //   if (imgData.src !== currentImgData.src) result.push(currentImgData);
    // }
    // filteredAboveNearestImagesInVisibleViewport = result;
    filteredAboveOrBelowNearestImagesData = filteredAboveOrBelowNearestImagesData.filter(
      (imgData) => imgData.src !== filteringImgData.src
    );
  });
  return filteredAboveOrBelowNearestImagesData;
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
  allAboveImages,
  allBelowImages
) {
  // here should we consider MAX( window.width, window.height) to find the nearest
  // const threshold = MAX( window.width, window.height)
  const aboveImagesInVisibleViewport = allAboveImages.filter(
    (imgData) => imgData.distance <= windowDimensions.height
  );
  const belowImagesInVisibleViewport = allBelowImages.filter(
    (imgData) => imgData.distance <= windowDimensions.height
  );
  // prepare resultant arrays
  const ABOVE_IMAGES_TO_RETURN = Math.ceil(MAX_IMAGES_TO_RETURN / 2);
  const aboveNearestImagesInVisibleViewport = aboveImagesInVisibleViewport.slice(
    0,
    ABOVE_IMAGES_TO_RETURN
  );
  const belowNearestImagesInVisibleViewport = belowImagesInVisibleViewport.slice(
    0,
    MAX_IMAGES_TO_RETURN - aboveNearestImagesInVisibleViewport.length
  );
  // merge the results
  let mixVisibleImagesInViewport = [
    ...aboveNearestImagesInVisibleViewport,
    ...belowNearestImagesInVisibleViewport,
  ];
  let filteredAboveNearestImagesInVisibleViewport = [];
  let filteredBelowNearestImagesInVisibleViewport = [];
  if (mixVisibleImagesInViewport.length < MAX_IMAGES_TO_RETURN) {
    filteredAboveNearestImagesInVisibleViewport = filteredNearestImagesInVisibleViewport(
      aboveImagesInVisibleViewport,
      aboveNearestImagesInVisibleViewport
    );
    filteredBelowNearestImagesInVisibleViewport = filteredNearestImagesInVisibleViewport(
      belowImagesInVisibleViewport,
      belowNearestImagesInVisibleViewport
    );
    const REMAINING_MAX_IMAGES_COUNT =
      MAX_IMAGES_TO_RETURN - mixVisibleImagesInViewport.length;
    const ABOVE_IMAGES_TO_RETURN_2 = Math.ceil(REMAINING_MAX_IMAGES_COUNT / 2);
    const aboveNearestImagesInVisibleViewport2 = filteredAboveNearestImagesInVisibleViewport.slice(
      0,
      ABOVE_IMAGES_TO_RETURN_2
    );
    const belowNearestImagesInVisibleViewport2 = filteredBelowNearestImagesInVisibleViewport.slice(
      0,
      REMAINING_MAX_IMAGES_COUNT - aboveNearestImagesInVisibleViewport2.length
    );
    mixVisibleImagesInViewport = [
      ...mixVisibleImagesInViewport,
      ...aboveNearestImagesInVisibleViewport2,
      ...belowNearestImagesInVisibleViewport2,
    ];
    // again filter out the resultant images from the all images arrays
    // to return final filtered arrays of images which are exclusive
    // from the resultant above or below visible images
    filteredAboveNearestImagesInVisibleViewport = filteredNearestImagesInVisibleViewport(
      allAboveImages,
      aboveNearestImagesInVisibleViewport2
    );
    filteredBelowNearestImagesInVisibleViewport = filteredNearestImagesInVisibleViewport(
      allBelowImages,
      belowNearestImagesInVisibleViewport2
    );
  }
  return {
    mixVisibleImagesInViewport,
    // extra purpose for further processing
    filteredAboveNearestImagesInVisibleViewport,
    filteredBelowNearestImagesInVisibleViewport,
  };
}
function getNearestImagesUptoCount(
  imageSortedArray,
  count = MAX_IMAGES_TO_RETURN
) {
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
function getPositionDataOfElement(domEl) {
  const boundingRect = domEl.getBoundingClientRect();
  // Get relative positions from the parentNode
  // offset positions are relative to its parent not to the window/whole page
  const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = domEl;
  const elPositionData = {
    // relative positions from the parentNode
    offsetLeft,
    offsetTop,
    offsetWidth,
    offsetHeight,
    // relative positions with window/browser/view port
    rectTop: boundingRect.top,
    rectLeft: boundingRect.left,
    rectWidth: boundingRect.width,
    rectHeight: boundingRect.height,
    center: getAbsolutePositionOfCenter(domEl),
  };
  return elPositionData;
}
function generateImageData(imgEl, adIframeEl) {
  const imageData = {
    imgEl,
    src: imgEl.src,
    distance: getAbsoluteDistanceBetweenElementsOnPage(adIframeEl, imgEl),
    ...getPositionDataOfElement(imgEl),
  };
  return imageData;
}
// to get the logs printed just uncomment the console.log
function trendiiLog(message) {
  // console.log(message);
}
window.addEventListener("load", () => {
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 150;
  const requestPayload = {
    // key: getKeyFromFlashtalkingSetup(),
    key: "12345",
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
  const w = window;
  const sf = w.$sf;
  const ext = sf && sf.ext;
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
    requestPayload.frame = { t, l, r, b, };
    requestPayload.url = window.document.referrer;
    trendiiLog(window.$sf);
    trendiiLog(window);
  }
  // same origin frame elements
  else if (window.frameElement) {
    trendiiLog(window);
    const adIframeEl = window.frameElement;
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
    // prepare request payload
    requestPayload.windowWidth = window.top.innerWidth;
    requestPayload.windowHeight = window.top.innerHeight;
    requestPayload.frame = absoluteCoordinates;
    requestPayload.url = window.location.href;
    const windowDimensions = {
      width: window.top.innerWidth,
      height: window.top.innerHeight,
      scrollX: window.top.scrollX,
      scrollY: window.top.scrollY,
    };
    const adIframeData = getPositionDataOfElement(adIframeEl);
    setTimeout(() => {
      debugger;
      // send message to the iframes
      window.postMessage(requestPayload, "*");
    }, 5000);
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
      regex.forEach((reg) => {
        if (reg.test(imgEl.src)) ignore = true;
      });
      if (!ignore) return imgEl;
    });
    const allImagesDataArray = filteredImageElements.map((imgEl) =>
      generateImageData(imgEl, adIframeEl)
    );
    trendiiLog(allImagesDataArray);
    // sort ascending by distance for nearest images
    allImagesDataArray.sort((a, b) => a.distance - b.distance);
    trendiiLog(allImagesDataArray);
    trendiiLog(findNearestImage(allImagesDataArray));
    const allAboveImagesDataArray = getAllImagesAboveCenterOfAdContainer(
      adIframeData,
      allImagesDataArray
    );
    const allBelowImagesDataArray = getAllImagesBelowCenterOfAdContainer(
      adIframeData,
      allImagesDataArray
    );
    trendiiLog(allAboveImagesDataArray);
    trendiiLog(allBelowImagesDataArray);
    const { mixVisibleImagesInViewport } = getAllImagesInVisibleViewPort(
      windowDimensions,
      allAboveImagesDataArray,
      allBelowImagesDataArray
    );
    trendiiLog(mixVisibleImagesInViewport);
    // set prioritized images firstly into the final array
    let finalResultantImagesArray = [...mixVisibleImagesInViewport];

    // Note: In this case no need to prioritize images into half above first and then half above below
    // because the, the priority based on the view port visible images is already handled and cleared into
    // the above performed steps, and we got the new array called mix visible images, which already consists
    // the above visible images and below images as per the required priority for the nearest images.
    // So in this step rather than dividing the images into the half above and half below images
    // we just need to handle the case, for normal images, Which is just return all the normal above images
    // upto the full remaining length of the array, and if not any then just return the full length with the
    // all normal below images. Here in this case no need to perform mix up for above and below.

    // To handle if any of the images are not in the viewport
    // and the returned array is not much of significance
    // then just add normal above and below images taking above images to the priority
    if (mixVisibleImagesInViewport.length < MAX_IMAGES_TO_RETURN) {
      const REMAINING_ABOVE_IMAGES_COUNT =
        MAX_IMAGES_TO_RETURN - mixVisibleImagesInViewport.length;
      const filteredAllAboveImages = filteredNearestImagesInVisibleViewport(
        allAboveImagesDataArray,
        mixVisibleImagesInViewport
      );
      const filteredAllBelowImages = filteredNearestImagesInVisibleViewport(
        allBelowImagesDataArray,
        mixVisibleImagesInViewport
      );

      // take all normal above images into first priority
      const normalAboveImages = filteredAllAboveImages.slice(
        0,
        REMAINING_ABOVE_IMAGES_COUNT
      );
      trendiiLog(normalAboveImages);
      const REMAINING_BELOW_IMAGES_COUNT =
        REMAINING_ABOVE_IMAGES_COUNT - normalAboveImages.length;
      // if any of the above images are not present i.e. above images are just zero or less than the
      // maximum required images
      // then take all the remaining images from the below images only
      const normalBelowImages = filteredAllBelowImages.slice(
        0,
        REMAINING_BELOW_IMAGES_COUNT
      );
      trendiiLog(normalBelowImages);

      // prepare final data array for the nearest images
      finalResultantImagesArray = [
        ...finalResultantImagesArray,
        ...normalAboveImages,
        ...normalBelowImages,
      ];
    }
    trendiiLog(finalResultantImagesArray);
    // prepare data for request payload
    const finalNearestImageDataArray = finalResultantImagesArray.map(
      (imgData) => ({
        src: imgData.src,
        distance: imgData.distance,
      })
    );
    trendiiLog(finalNearestImageDataArray);
    // prepare request payload
    requestPayload.nearestImageData = finalNearestImageDataArray;
    trendiiLog(requestPayload);
  }
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(requestPayload);
  const requestOptions = {
    method: "POST",
    headers,
    body: raw,
  };
  // fetch("https://beeswaxcreatives.trendii.com/adsEnvironment", requestOptions)
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
});
