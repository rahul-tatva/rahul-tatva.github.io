function getPositionOfCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}
function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionOfCenter(a);
  const bPosition = getPositionOfCenter(b);
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
  let tagId = "";
  const iframeCollection = document.getElementsByTagName('iframe');
  // Array.from(collection).forEach(someFn)
  // for (var header of this.headers) {
  //    trendiiLog(header);
  // }
  for (const i = 0; i < iframeCollection.length; i++) {
    const iframe = iframeCollection[i];
    if (iframe.getAttribute('name') && iframe.getAttribute('src').contains('flashtalking')) {
      const data = iframe.getAttribute('name');
      const jsonObj = JSON.parse(data);
      const key = jsonObj.trendiiparam3;
      tagId = key;
      break;
    }
  }
  return tagId;
}

function getDOMElementDimensions(domEl) {
  // Get Left Position
  const iframeLeft = domEl.offsetLeft;
  // Get Top Position
  const iframeTop = domEl.offsetTop;
  // Get Width
  const iframeWidth = domEl.offsetWidth;
  // Get Height
  const iframeHeight = domEl.offsetHeight;
  const iframeCoordinates = {
    t: iframeTop,
    l: iframeLeft,
    r: iframeLeft + iframeWidth,
    b: iframeTop + iframeHeight,
  };
  return iframeCoordinates;
}
function trendiiLog(message) {
  console.log(message);
}
document.addEventListener("DOMContentLoaded", function handleDOMLoaded() {
  debugger;
  const MIN_WIDTH = 200;
  const MIN_HEIGHT = 150;
  getTagIdKeyFromFlashtalkingAdFrame();
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
    requestPayload.windowWidth = w;
    requestPayload.windowHeight = h;
    requestPayload.frame = { t, l, r, b };
    trendiiLog(window.$sf);
    trendiiLog(window);
  }
  // same origin frame elements
  else if (w.frameElement) {
    trendiiLog(window);
    const adContainerIframeEl = window.frameElement;
    // Get Left Position
    const iframeLeft = adContainerIframeEl.offsetLeft;
    // Get Top Position
    const iframeTop = adContainerIframeEl.offsetTop;
    // Get Width
    const iframeWidth = adContainerIframeEl.offsetWidth;
    // Get Height
    const iframeHeight = adContainerIframeEl.offsetHeight;
    const { t, l, r, b } = getDOMElementDimensions(adContainerIframeEl);
    requestPayload.frame = { t, l, r, b };
    const iframeCoordinates = {
      t, l, r, b,
      center: getPositionOfCenter(adContainerIframeEl),
    };
    // check if the iframe having id attribute
    if (window.frameElement.id) {
      const adContainerElId = window.frameElement.id;
      const adContainerEl = window.top.document.getElementById(adContainerElId);
    }
    const topWindow = window.top;
    // TO DO throw error if image selector not present
    const domImages = topWindow.document.images;
    const allDOMImagesArray = Array.from(domImages);
    const regex = [
      /^.*(\.svg|\.gif)(\?.*)?$/,
      /^data:(.+);base64,(.+)$/,
      /^data:image\/svg\+xml,(.+)$/,
      /^https:\/\/([\w\.]+)?facebook([\w\.-]+)\/.*/i,
    ];
    const allImageData = allDOMImagesArray.map(imgEl => {
      let ignore = false;
      if (imgEl.width < MIN_WIDTH && imgEl.height < MIN_HEIGHT) ignore = true;
      regex.forEach(reg => {
        if (reg.test(imgEl.currentSrc)) ignore = true;
      });
      if (ignore) return null;
      const elemRect = imgEl.getBoundingClientRect();
      // const elemTop = Math.ceil(window.scrollY + elemRect.top);
      // const elemLeft = Math.ceil(window.scrollX + elemRect.left);
      // Get Left Position
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = imgEl;
      const imageData = {
        src: imgEl.currentSrc,
        offsetLeft,
        offsetTop,
        offsetWidth,
        offsetHeight,
        center: getPositionOfCenter(imgEl),
        distance: getDistanceBetweenElements(adContainerIframeEl, imgEl),
        rectTop: elemRect.top,
        rectLeft: elemRect.left,
        rectWidth: elemRect.width,
        rectHeight: elemRect.height,
      };
      return imageData;
    });
    trendiiLog(allImageData);
    // const allImageData = [];
    // for (var i = 0; i < imageCollection.length; i++) {
    //   const imageEl = imageCollection[i];
    //   const imgElSrc = imageCollection[i].src;
    //   const distance = getDistanceBetweenElements(adContainerIframeEl, imageEl);
    //   const imageData = {
    //     src: imgElSrc,
    //     distance: distance,
    //     imageEl: imageEl,
    //     center: getPositionOfCenter(imageEl),
    //   };
    //   allImageData.push(imageData);
    // } // for loop end
    trendiiLog(findNearestImage(allImageData));
    // sort ascending by distance for nearest images
    allImageData.sort((a, b) => a.distance - b.distance);
    trendiiLog(allImageData);
    const above3NearestImages = get3ImagesAboveAdContainer(
      adContainerIframeEl,
      allImageData
    );
    const below3NearestImages = get3ImagesAboveAdContainer(
      adContainerIframeEl,
      allImageData
    );
    const nearest6ImagesData = getNearest6Images(allImageData);
    trendiiLog(above3NearestImages);
    trendiiLog(below3NearestImages);
    trendiiLog(nearest6ImagesData);
    const aboveNearestImages = getImagesAboveCenterOfAdContainer(
      adContainerIframeEl,
      allImageData
    );
    const belowNearestImages = getImagesBelowCenterOfAdContainer(
      adContainerIframeEl,
      allImageData
    );
    trendiiLog(aboveNearestImages);
    trendiiLog(belowNearestImages);

    // fetch('https://beeswaxcreatives.trendii.com/adsEnvironment', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ a: 1, b: 'Textual content' })
    // });
  }
});
