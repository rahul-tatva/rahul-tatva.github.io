// The geom function enables an exchange of geometric dimensions and location of the SafeFrame
// container and its content in relation to the browser or application window and the screen boundaries of
// the device in which the host content is being viewed.

 document.addEventListener("DOMContentLoaded", function handleDOMLoaded() {
   // check if its a safe frame
   var w = window,
     sf = w["$sf"],
     ext = sf && sf.ext;
   if (ext) {
     const sfCoordinates = $sf.ext.geom();
     console.log(window.$sf);
     // console.log(window.sf_conf);
   }
   // same origin frame elements
   else if (w.frameElement) {
     const adContainerFrameEl = window.frameElement;
     // Get Left Position
     const iframeLeft = adContainerFrameEl.offsetLeft;
     // Get Top Position
     const iframeTop = adContainerFrameEl.offsetTop;
     const iframeWidth = adContainerFrameEl.offsetWidth;
     const iframeHeight = adContainerFrameEl.offsetHeight;
     // check if the iframe having id attribute
     if (window.frameElement.id) {
       const adContainerElId = window.frameElement.id;
       const adContainerEl = window.top.document.getElementById(
         adContainerElId
       );
     }
   }
 });
