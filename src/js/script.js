document.addEventListener("DOMContentLoaded", initializeGallery);
const imageUrls = [
  "https://acre-image-collections.s3.amazonaws.com/image-6578722caea701702392364_medium.jpg",
  "https://acre-images.s3.amazonaws.com/image-5ac62b9e561041522936734_medium.jpeg",
  "https://acre-images.s3.amazonaws.com/image-5acac631504581523238449_medium.jpeg",
  "https://acre-image-collections.s3.amazonaws.com/image-65787222618211702392354_medium.jpg",
  "https://acre-image-collections.s3.amazonaws.com/image-657872175b22e1702392343_medium.jpg",
  "https://acre-image-collections.s3.amazonaws.com/image-657871ff7d8401702392319_medium.jpg",
  "https://acre-image-collections.s3.amazonaws.com/image-6576286c7c4b61702242412_medium.jpg",
  "https://acre-image-collections.s3.amazonaws.com/image-6578af5f9af671702408031_medium.jpg",
  "https://acre-images.s3.amazonaws.com/image-5b01cdf4b2e9a1526844916.jpg",
];

let imageElements;

function initializeGallery() {
  const galleryElement = document.getElementById("imageGallery");
  populateGallery(galleryElement);
  adjustImageHeightsOnResize();
  initializeImageObserver();
}

function populateGallery(galleryElement) {
  const totalImages = 20;

  for (let index = 0; index < totalImages; index++) {
    const imageUrl = imageUrls[index % imageUrls.length];
    const galleryItemHtml = createGalleryItemHtml(index, imageUrl);
    galleryElement.innerHTML += galleryItemHtml;
  }
  imageElements = document.querySelectorAll(".image-background");
}

function createGalleryItemHtml(index, imageUrl) {
  return `
      <div class="image">
        <label class="image-checkbox" for="checkbox-${index}">
          <input type="checkbox" id="checkbox-${index}" tabindex="0" />
          <div class="image-background img-thumbnail" data-src="${imageUrl}"></div>
        </label>
      </div>
    `;
}

function initializeImageObserver() {
  const observer = new IntersectionObserver(handleIntersection);
  imageElements.forEach((image) => observer.observe(image));
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const imageElement = entry.target;
      loadImageBackground(imageElement);
      adjustImageHeight(imageElement);
      observer.unobserve(imageElement);
    }
  });
}

function loadImageBackground(imageElement) {
  const imageUrl = imageElement.getAttribute("data-src");
  imageElement.style.backgroundImage = `url('${imageUrl}')`;
}

function adjustImageHeight(imageElement) {
  const width = imageElement.getBoundingClientRect().width;
  imageElement.style.setProperty("--image-height", `${width}px`);
}

function adjustImageHeightsOnResize() {
  window.addEventListener("resize", () =>
    imageElements.forEach(adjustImageHeight),
  );
}
