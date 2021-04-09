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
    const adContainerFrameEl = window.frameElement;
    // Get Left Position
    const iframeLeft = adContainerFrameEl.offsetLeft;
    // Get Top Position
    const iframeTop = adContainerFrameEl.offsetTop;
    // Get Width
    const iframeWidth = adContainerFrameEl.offsetWidth;
    // Get Height
    const iframeHeight = adContainerFrameEl.offsetHeight;
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
      const imageLeft = adContainerFrameEl.offsetLeft;
      // Get Top Position
      const imageTop = adContainerFrameEl.offsetTop;
      // Get Width
      const imageWidth = adContainerFrameEl.offsetWidth;
      // Get Height
      const imageHeight = adContainerFrameEl.offsetHeight;
      const distance = getDistanceBetweenElements(adContainerEl, imageEl);
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
    }
    console.log(findNearestImage(allImageData));
    // sort ascending for nearest images
    allImageData.sort(function (a, b) {
      return a.distance - b.distance;
    });
    console.log(allImageData);
  }
});
