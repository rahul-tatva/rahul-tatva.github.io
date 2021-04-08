// need to import mezr.js whenever this js file needs to be used.
/*!
 * mezr v0.6.2
 * https://github.com/niklasramo/mezr
 * Copyright (c) 2016 Niklas Rämö <inramo@gmail.com>
 * Released under the MIT license
 */
// references:
//stackoverflow.com/questions/17628456/measure-distance-between-two-html-elements-centers

document.addEventListener("DOMContentLoaded", function handleDOMLoaded() {
  console.log("anaylitics test");
  const adContainerWithNearestImageData = [];
  // const coordinates = window.$sf.ext.geom;
  // debugger;
  const currentUrl = window.location.href;

  // const adContainerEl = document.createElement("div");
  // document.body.appendChild(adContainerEl);

  const adContainerFrameEl = window.frameElement;
  console.log(window.top.document.images);
  const adContainerElId = window.frameElement.id;
  const adContainerEl = window.top.document.getElementById(adContainerElId);
  // TO DO throw error if image selector not present
  var imageCollection = window.top.document.images;
  for (var i = 0; i < imageCollection.length; i++) {
    const imageEl = imageCollection[i];
    const imgElSrc = imageCollection[i].src;
    const distance = mezr.distance(adContainerEl, imageEl);
    const imageData = {
      imageSrc: imgElSrc,
      distance: distance,
      imageEl: imageEl,
    };
    adContainerWithNearestImageData.push(imageData);
  }
  console.log(adContainerWithNearestImageData);
  const nearestImageData = adContainerWithNearestImageData.reduce(function (
    prev,
    curr
  ) {
    return prev.distance < curr.distance ? prev : curr;
  });
  console.log(nearestImageData);
});
