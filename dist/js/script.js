const imageUrls=["https://acre-image-collections.s3.amazonaws.com/image-6578722caea701702392364_medium.jpg","https://acre-images.s3.amazonaws.com/image-5ac62b9e561041522936734_medium.jpeg","https://acre-images.s3.amazonaws.com/image-5acac631504581523238449_medium.jpeg","https://acre-image-collections.s3.amazonaws.com/image-65787222618211702392354_medium.jpg","https://acre-image-collections.s3.amazonaws.com/image-657872175b22e1702392343_medium.jpg","https://acre-image-collections.s3.amazonaws.com/image-657871ff7d8401702392319_medium.jpg","https://acre-image-collections.s3.amazonaws.com/image-6576286c7c4b61702242412_medium.jpg","https://acre-image-collections.s3.amazonaws.com/image-6578af5f9af671702408031_medium.jpg","https://acre-images.s3.amazonaws.com/image-5b01cdf4b2e9a1526844916.jpg"];let galleryElement,imageElements,prevContainerWidth=0;function populateGallery(a,t=a.length,e){galleryElement=document.querySelector("#imageGallery");let i="";for(let e=0;e<t;e++){var n=a[e%a.length];i+=createGalleryItemHtml(e,n)}galleryElement.innerHTML=i,initializeImageLoadObserver(e),initializeImageResizeObserver()}function createGalleryItemHtml(e,a){return`
    <div class="image" role="presentation">
      <label class="image-checkbox" for="checkbox-${e}">
        <input type="checkbox" id="checkbox-${e}" tabindex="0" />
        <div class="image-background img-thumbnail" data-src="${a}" role="img" aria-label="Gallery Image ${e+1}"></div>
      </label>
    </div>
  `}function getDynamicThresholdAndRootMargin(e){let a=.01,t="50px";switch(e){case"slow-2g":case"2g":a=.001,t="200px";break;case"3g":a=.01,t="100px";break;default:a=.1,t="50px"}return{threshold:a,rootMargin:t}}function initializeImageLoadObserver(e){imageElements=galleryElement.querySelectorAll(".image-background");const a=new IntersectionObserver((e,a)=>{e.filter(e=>e.isIntersecting).forEach(e=>{loadImageBackground(e.target),a.unobserve(e.target)})},getDynamicThresholdAndRootMargin(e));imageElements.forEach(e=>a.observe(e))}function loadImageBackground(e){var a=e.getAttribute("data-src");e.style.backgroundImage=`url('${a}')`}function initializeImageResizeObserver(){const a=document.querySelector(".container");new ResizeObserver(()=>{var e=a.getBoundingClientRect().width;e!==prevContainerWidth&&(setImageHeightVariable(a),prevContainerWidth=e)}).observe(a)}function setImageHeightVariable(){var e=imageElements[0];e&&(e=e.getBoundingClientRect().width,galleryElement.style.setProperty("--image-height",e+"px"))}document.addEventListener("DOMContentLoaded",()=>{var e=navigator.connection?navigator.connection.effectiveType:"4g";populateGallery(imageUrls,20,e)});