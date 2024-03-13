document.addEventListener('DOMContentLoaded', function () {
  const imageUrls = [
    "https://acre-image-collections.s3.amazonaws.com/image-6578722caea701702392364_medium.jpg",
    "https://acre-images.s3.amazonaws.com/image-5ac62b9e561041522936734_medium.jpeg",
    "https://acre-images.s3.amazonaws.com/image-5acac631504581523238449_medium.jpeg",
    "https://acre-image-collections.s3.amazonaws.com/image-65787222618211702392354_medium.jpg",
    "https://acre-image-collections.s3.amazonaws.com/image-657872175b22e1702392343_medium.jpg",
    "https://acre-image-collections.s3.amazonaws.com/image-657871ff7d8401702392319_medium.jpg",
    "https://acre-image-collections.s3.amazonaws.com/image-6576286c7c4b61702242412_medium.jpg",
    "https://acre-image-collections.s3.amazonaws.com/image-6578af5f9af671702408031_medium.jpg",
    "https://acre-images.s3.amazonaws.com/image-5b01cdf4b2e9a1526844916.jpg"
];

    const totalImages = 20;
    const gallery = document.getElementById('imageGallery');

    for (let index = 0; index < totalImages; index++) {
        const url = imageUrls[index % imageUrls.length];
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3 image';
        col.innerHTML = `
            <label class="image-checkbox" for="checkbox-${index}">
                <input type="checkbox" id="checkbox-${index}" tabindex="${0}" />
                <div class="image-background" data-src="${url}"></div>
            </label>
        `;
        gallery.appendChild(col);
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const src = image.getAttribute('data-src');
                image.style.backgroundImage = `url('${src}')`;
                observer.unobserve(image);
            }
        });
    }, { rootMargin: "0px 0px 50px 0px" });

    document.querySelectorAll('.image-background').forEach(img => observer.observe(img));
});
