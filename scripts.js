function disableLoadingScreen() {
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.style.display = "none";
}

window.onload = function () {
    disableLoadingScreen();
    console.log("loadingscreen disabled")
};

function calculateImagesPerRow() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = windowWidth / windowHeight;
    let iprow;
    if (aspectRatio > 1.75) {
        iprow = 4;
    } else if (aspectRatio > 1) {
        iprow = 3;
    } else {
        iprow = 2;
    }
    return iprow;
}

function calculateGallery() {
    const galleries = document.querySelectorAll('.gallery');
    const iprow = calculateImagesPerRow();
    const gap = 10
    const gallerywidth = document.querySelector('.gallery').getBoundingClientRect().width;

    galleries.forEach(gallery => {
        const images = gallery.querySelectorAll('img');

        for (let i = 0; i < images.length; i += iprow) {
            const group = Array.from(images).slice(i, i + iprow);

            let totalWidth = 0;

            group.forEach(img => {
                totalWidth += img.naturalWidth / img.naturalHeight;
            });

            group.forEach(img => {
                const imgWidthPercentage = ((img.naturalWidth / img.naturalHeight) / totalWidth);
                img.style.width = `${imgWidthPercentage * ((gallerywidth - 1 /* -1 weil es sonst buggt*/) - (group.length - 1) * gap)}px`;
            });
        }

    });
    console.log("calculated Gallery")
};

function readImageMetadata() {
    const imageContainers = document.querySelectorAll(".image-container");

    imageContainers.forEach(container => {
        const img = container.querySelector("img");
        const infoElement = container.querySelector(".image-overlay p");

        if (!img || !infoElement) return;

        fetch(img.src)
            .then(response => response.blob())
            .then(blob => {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const exifData = new Image();
                    exifData.src = e.target.result;

                    exifData.onload = function () {
                        EXIF.getData(exifData, function () {
                            const iso = EXIF.getTag(this, "ISOSpeedRatings") || "N/A";
                            const shutterSpeed = EXIF.getTag(this, "ExposureTime") || "N/A";
                            const aperture = EXIF.getTag(this, "FNumber") || "N/A";
                            const focalLength = EXIF.getTag(this, "FocalLength") || "N/A";

                            infoElement.innerHTML = `ISO ${iso} <br> ${focalLength} mm <br> 1/${Math.round(1 / shutterSpeed)} s <br> f/${aperture}`;
                        });
                    };
                };
                reader.readAsDataURL(blob);
            })
            .catch(err => console.error("Fehler beim Laden der Bilddaten: ", err));
    });
};

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightboxContent');

document.querySelectorAll('.image-container').forEach(container => {
    container.addEventListener('click', () => {
        const clonedContainer = container.innerHTML;
        lightboxContent.innerHTML = '';
        lightboxContent.innerHTML = clonedContainer;
        lightboxContent.querySelectorAll('img').forEach(img => {
            img.removeAttribute('width');
            img.style.width = '';
        });

        console.log(lightboxContent.innerHTML);

        lightbox.classList.add('visible');
        document.body.classList.add('no-scroll');
    });
});

const buttons = document.querySelectorAll('.galleryButton');
const galleries = document.querySelectorAll('.gallery');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        galleries.forEach((gallery, galleryIndex) => {
            if (galleryIndex === index) {
                gallery.classList.remove('hidden');
            } else {
                gallery.classList.add('hidden');
            }
        });

        buttons.forEach(btn => btn.classList.remove('black'));
        button.classList.add('black');
    });
});

galleries.forEach((gallery, i) => {
    if (i !== 0) gallery.classList.add('hidden');
});
buttons[0].classList.add('black');

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('visible');
    document.body.classList.remove('no-scroll');
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        lightbox.classList.remove('visible');
        document.body.classList.remove('no-scroll');
    }
});

document.addEventListener("DOMContentLoaded", readImageMetadata);
window.addEventListener('load', calculateGallery);
window.addEventListener('resize', calculateGallery);
