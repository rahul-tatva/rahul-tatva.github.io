function getPositionAtCenter(element) {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}
function getDistanceBetweenElements(a, b) {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);
  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}
function findNearestImage(imageDataArray) {
  const nearestImageData = imageDataArray.reduce(function (prev, curr) {
    return prev.distance < curr.distance ? prev : curr;
  });
  return nearestImageData;
}
function get3ImagesAboveAdContainer(adContainerEl, imageSortedArray) {
  const iframeTop = adContainerEl.offsetTop;
  const above3NearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== 3; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.imageEl.offsetTop <= adContainerEl.offsetTop) {
      above3NearestImages.push(imgData);
      count++;
    }
  }
  return above3NearestImages;
}
function get3ImagesBelowAdContainer(adContainerEl, imageSortedArray) {
  const iframeTop = adContainerEl.offsetTop;
  const below3NearestImages = [];
  let count = 0;
  for (let index = 0; index < imageSortedArray.length && count !== 3; index++) {
    const imgData = imageSortedArray[index];
    if (imgData.imageEl.offsetTop > adContainerEl.offsetTop) {
      below3NearestImages.push(imgData);
      count++;
    }
  }
  return below3NearestImages;
}

function getNearest6Images(imageSortedArray) {
  return imageSortedArray.slice(0, 6);
}
document.addEventListener("DOMContentLoaded", function handleDOMLoaded() {
  // check if its a safe frame
  var w = window,
    sf = w["$sf"],
    ext = sf && sf.ext;
  if (ext) {
    const sfCoordinates = sf.ext.geom();
    console.log(window.$sf);
    console.log(window);
  }
  // same origin frame elements
  else if (w.frameElement) {
    const allImageData = [];
    console.log(window);
    const adContainerIframeEl = window.frameElement;
    // Get Left Position
    const iframeLeft = adContainerIframeEl.offsetLeft;
    // Get Top Position
    const iframeTop = adContainerIframeEl.offsetTop;
    // Get Width
    const iframeWidth = adContainerIframeEl.offsetWidth;
    // Get Height
    const iframeHeight = adContainerIframeEl.offsetHeight;
    // check if the iframe having id attribute
    if (window.frameElement.id) {
      const adContainerElId = window.frameElement.id;
      const adContainerEl = window.top.document.getElementById(adContainerElId);
    }
    const topWindow = window.top;
    // TO DO throw error if image selector not present
    const imageCollection = topWindow.document.images;
    for (var i = 0; i < imageCollection.length; i++) {
      const imageEl = imageCollection[i];
      const imgElSrc = imageCollection[i].src;
      // Get Left Position
      const imageLeft = adContainerIframeEl.offsetLeft;
      // Get Top Position
      const imageTop = adContainerIframeEl.offsetTop;
      // Get Width
      const imageWidth = adContainerIframeEl.offsetWidth;
      // Get Height
      const imageHeight = adContainerIframeEl.offsetHeight;
      const distance = getDistanceBetweenElements(adContainerIframeEl, imageEl);
      const imageData = {
        src: imgElSrc,
        distance: distance,
        imageEl: imageEl,
        l: imageLeft,
        t: imageTop,
        w: imageWidth,
        h: imageHeight,
      };
      allImageData.push(imageData);
    } // for loop end
    console.log(findNearestImage(allImageData));
    // sort ascending by distance for nearest images
    allImageData.sort(function (a, b) {
      return a.distance - b.distance;
    });
    console.log(allImageData);

    console.log(get3ImagesAboveAdContainer(adContainerIframeEl, allImageData));
    console.log(get3ImagesAboveAdContainer(adContainerIframeEl, allImageData));
    console.log(getNearest6Images(allImageData));
  }
});
