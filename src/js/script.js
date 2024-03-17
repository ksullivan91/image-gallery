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

let galleryElement;
let imageElements;
let container;
let prevContainerWidth = 0;

function populateGallery(
  imageUrls,
  totalImages = imageUrls.length,
  connectionSpeed,
  containerElement,
) {
  container = containerElement;
  galleryElement = document.querySelector("#imageGallery");
  let galleryInnerHTML = "";
  for (let i = 0; i < totalImages; i++) {
    let imageUrl = imageUrls[i % imageUrls.length];
    galleryInnerHTML += createGalleryItemHtml(i, imageUrl);
  }
  galleryElement.innerHTML = galleryInnerHTML;

  initializeImageLoadObserver(connectionSpeed);
  initializeImageResizeObserver();
}

function createGalleryItemHtml(index, imageUrl) {
  return `
    <div class="image" role="presentation">
      <label class="image-checkbox" for="checkbox-${index}">
        <input type="checkbox" id="checkbox-${index}" tabindex="0" />
        <div class="image-background img-thumbnail" data-src="${imageUrl}" role="img" aria-label="Gallery Image ${index + 1}"></div>
      </label>
    </div>
  `;
}

function getDynamicThresholdAndRootMargin(connectionSpeed) {
  let threshold = 0.01;
  let rootMargin = "50px";

  switch (connectionSpeed) {
    case "slow-2g":
    case "2g":
      threshold = 0.001;
      rootMargin = "200px";
      break;
    case "3g":
      threshold = 0.01;
      rootMargin = "100px";
      break;
    case "4g":
    default:
      threshold = 0.1;
      rootMargin = "50px";
      break;
  }

  return { threshold, rootMargin };
}

function initializeImageLoadObserver(connectionSpeed) {
  imageElements = galleryElement.querySelectorAll(".image-background");
  const observer = new IntersectionObserver((entries, observer) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        loadImageBackground(entry.target);
        observer.unobserve(entry.target);
      });
  }, getDynamicThresholdAndRootMargin(connectionSpeed));

  imageElements.forEach((image) => observer.observe(image));
}

function loadImageBackground(imageElement) {
  const imageUrl = imageElement.getAttribute("data-src");
  imageElement.style.backgroundImage = `url('${imageUrl}')`;
}

function initializeImageResizeObserver() {
  const resizeObserver = new ResizeObserver(() => {
    const newContainerWidth = container.getBoundingClientRect().width;
    if (newContainerWidth !== prevContainerWidth) {
      setImageHeightVariable(container);
      prevContainerWidth = newContainerWidth;
    }
  });

  resizeObserver.observe(container);
}

function setImageHeightVariable() {
  const imageElement = imageElements[0];
  if (imageElement) {
    const width = imageElement.getBoundingClientRect().width;
    galleryElement.style.setProperty("--image-height", `${width}px`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const connectionSpeed = navigator.connection
    ? navigator.connection.effectiveType
    : "4g";

  populateGallery(
    imageUrls,
    1000,
    connectionSpeed,
    document.querySelector(".container-fluid"),
  );
});
