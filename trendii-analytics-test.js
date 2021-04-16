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
    x: absLeft + width / 2,
    y: absTop + height / 2,
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
function getDistanceBetweenElements(a, b) {
  const aPosition = getAbsolutePositionOfCenter(a);
  const bPosition = getAbsolutePositionOfCenter(b);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}
function findNearestImage(imageDataArray) {
  const nearestImageData = imageDataArray.reduce(function (prev, curr) {
    return prev.distance < curr.distance ? prev : curr;
  });
  return nearestImageData;
}
function get3ImagesAboveAdContainer(adContainerEl, imageSortedArray) {
  const above3NearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== 3; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.offsetTop <= adContainerEl.offsetTop) {
      above3NearestImages.push(imgData);
      count++;
    }
  }
  return above3NearestImages;
}
function getImagesAboveCenterOfAdContainer(adContainerEl, imageSortedArray, countOfImagesToReturn = 3) {
  const aboveNearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== countOfImagesToReturn; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y <= adContainerEl.center.y) {
      aboveNearestImages.push(imgData);
      count++;
    }
  }
  return aboveNearestImages;
}
function get3ImagesBelowAdContainer(adContainerEl, imageSortedArray) {
  const below3NearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== 3; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.offsetTop > adContainerEl.offsetTop) {
      below3NearestImages.push(imgData);
      count++;
    }
  }
  return below3NearestImages;
}
function getImagesBelowCenterOfAdContainer(adContainerEl, imageSortedArray, countOfImagesToReturn = 3) {
  const belowNearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== countOfImagesToReturn; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.center.y > adContainerEl.center.y) {
      belowNearestImages.push(imgData);
      count++;
    }
  }
  return belowNearestImages;
}
function getNearest6Images(imageSortedArray) {
  return imageSortedArray.slice(0, 6);
}
function getTagIdKeyFromFlashtalkingAdFrame() {
  let keyValue = "";
  const scriptElementsCollection = document.getElementsByTagName("script");
  for (let i = 0; i < scriptElementsCollection.length; i++) {
    const scriptElement = scriptElementsCollection[i];
    if (scriptElement.getAttribute("src").includes("trendiiparam3")) {
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
function getDOMElementDimensions(domEl) {
  // Get Left Position
  const elementLeft = domEl.offsetLeft;
  // Get Top Position
  const elementTop = domEl.offsetTop;
  // Get Width
  const elementWidth = domEl.offsetWidth;
  // Get Height
  const elementHeight = domEl.offsetHeight;
  const elementCoordinates = {
    t: elementTop,
    l: elementLeft,
    r: elementLeft + elementWidth,
    b: elementTop + elementHeight,
  };
  return elementCoordinates;
}
// to get the logs printed just uncomment the console.log 
function trendiiLog(message) {
  console.log(message);
}
window.addEventListener("load", function handleWindowLoaded() {
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 150;
  const requestPayload = {
    key: getTagIdKeyFromFlashtalkingAdFrame(),
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
  const w = window, sf = w["$sf"], ext = sf && sf.ext;
  if (ext) {
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
    const adContainerIframeEl = window.frameElement;
    const { t, l, r, b } = getDOMElementDimensions(adContainerIframeEl);
    // prepare request payload
    requestPayload.windowWidth = window.top.innerWidth;
    requestPayload.windowHeight = window.top.innerHeight;
    requestPayload.frame = { t, l, r, b };
    const adIframeCoordinates = {
      adContainerIframeEl,
      t, l, r, b,
      center: getAbsolutePositionOfCenter(adContainerIframeEl),
    };
    // TO DO throw error if image selector not present
    const domImages = window.top.document.images;
    const allDOMImagesArray = Array.from(domImages);
    // testDimensionsOfElement(allDOMImagesArray);
    const regex = [
      /^.*(\.svg|\.gif)(\?.*)?$/,
      /^data:(.+);base64,(.+)$/,
      /^data:image\/svg\+xml,(.+)$/,
      /^https:\/\/([\w\.]+)?facebook([\w\.-]+)\/.*/i,
    ];
    const filteredImageData = allDOMImagesArray.filter(imgEl => {
      let ignore = false;
      if (imgEl.width < MIN_WIDTH && imgEl.height < MIN_HEIGHT) ignore = true;
      regex.forEach(reg => {
        if (reg.test(imgEl.currentSrc)) ignore = true;
      });
      if (!ignore) return imgEl;
    });
    const allImageData = filteredImageData.map(imgEl => {
      const elemRect = imgEl.getBoundingClientRect();
      // to get the absolute positions of the elements from the window
      // var topPos = imgEl.getBoundingClientRect().top + window.scrollY;
      // var leftPos = imgEl.getBoundingClientRect().left + window.scrollX;
      // const elemTop = Math.ceil(window.scrollY + elemRect.top);
      // const elemLeft = Math.ceil(window.scrollX + elemRect.left);
      // Get relative positions from the parentNode
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = imgEl;
      const imageData = {
        imgEl,
        src: imgEl.currentSrc,
        // relative positions from the parentNode
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
        center: getAbsolutePositionOfCenter(imgEl),
        distance: getDistanceBetweenElements(adContainerIframeEl, imgEl),
        // relative positions with window/browser/view port
        rectTop: elemRect.top,
        rectLeft: elemRect.left,
        rectWidth: elemRect.width,
        rectHeight: elemRect.height,
      };
      return imageData;
    });
    trendiiLog(allImageData);
    // sort ascending by distance for nearest images
    allImageData.sort((a, b) => a.distance - b.distance);
    trendiiLog(allImageData);
    trendiiLog(findNearestImage(allImageData));
    // const above3NearestImages = get3ImagesAboveAdContainer(
    //   adContainerIframeEl,
    //   allImageData
    // );
    // const below3NearestImages = get3ImagesAboveAdContainer(
    //   adContainerIframeEl,
    //   allImageData
    // );
    // const nearest6ImagesData = getNearest6Images(allImageData);
    // trendiiLog(above3NearestImages);
    // trendiiLog(below3NearestImages);
    // trendiiLog(nearest6ImagesData);
    const aboveNearestImages = getImagesAboveCenterOfAdContainer(
      adIframeCoordinates,
      allImageData
    );
    const belowNearestImages = getImagesBelowCenterOfAdContainer(
      adIframeCoordinates,
      allImageData
    );
    trendiiLog(aboveNearestImages);
    trendiiLog(belowNearestImages);
    // prepare data for request payload
    const aboveNearestImagesData = aboveNearestImages.map((imgData) => ({ src: imgData.src, distance: imgData.distance }));
    const belowNearestImagesData = belowNearestImages.map((imgData) => ({ src: imgData.src, distance: imgData.distance }));
    // prepare request payload
    requestPayload.nearestImageData = [
      ...aboveNearestImagesData,
      ...belowNearestImagesData
    ];
    trendiiLog(requestPayload);
  }
  // TO-DO: remove this line for key after tested
  // requestPayload.key = "123123123";
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(requestPayload);
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: raw,
    // redirect: 'follow'
  };
  fetch("https://beeswaxcreatives.trendii.com/adsEnvironment", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
});