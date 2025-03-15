window.onload = function () {
    // Ladebildschirm ausblenden
    document.getElementById('loadingScreen').style.display = 'none';
    console.log("loadingscreen disabled")
};

function calculateImagesPerRow() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = windowWidth / windowHeight;

    let iprow;

    // Bestimme die Anzahl der Bilder basierend auf dem Seitenverhältnis
    if (aspectRatio > 1.65) {  // Sehr breite Fenster
        iprow = 4;  // Mehr Bilder pro Reihe
    } else if (aspectRatio > 1) {  // Normale Fenster
        iprow = 3;  // Standardanzahl
    } else {  // Hohe Fenster (weniger Bildbreite)
        iprow = 2;  // Weniger Bilder pro Reihe
    }

    return iprow;
}

function calculateGallery() {
    const iprow = calculateImagesPerRow(); //images per row
    const gap = 10

    const images = document.querySelectorAll('.gallery img');

    const gallerywidth = document.querySelector('.gallery').getBoundingClientRect().width;

    for (let i = 0; i < images.length; i += iprow) {
        const group = Array.from(images).slice(i, i + iprow);

        let totalWidth = 0;

        group.forEach(img => {
            totalWidth += img.naturalWidth / img.naturalHeight;
            console.log(img.naturalWidth)
        });

        console.log(`Total Width: ${totalWidth}`)

        group.forEach(img => {
            const imgWidthPercentage = ((img.naturalWidth / img.naturalHeight) / totalWidth);
            img.style.width = `${imgWidthPercentage * ((gallerywidth - 1 /* -1 weil es sonst buggt*/) - (group.length - 1) * gap)}px`;
            console.log(`Gruppe ${Math.floor(i / iprow) + 1}:`, img.src);
        });
    }

    console.log("calculated Gallery")
};

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');

// Klick-Event für jedes Bild in der Galerie hinzufügen
document.querySelectorAll('.gallery img').forEach(image => {
    image.addEventListener('click', () => {
        lightboxImage.src = image.src;  // Das angeklickte Bild einfügen

        lightboxImage.style.left = `auto`;
        lightboxImage.style.top = `auto`;
        lightboxImage.style.width = `auto`;

        const rect = image.getBoundingClientRect();

        const targetRect = lightboxImage.getBoundingClientRect();

        const X = rect.left;
        const Y = rect.top;
        const W = rect.width;

        const targetX = targetRect.left;
        const targetY = targetRect.top;
        const targetW = targetRect.width;

        lightboxImage.style.left = `${X}px`;
        lightboxImage.style.top = `${Y}px`;
        lightboxImage.style.width = `${W}px`;
        lightbox.classList.add('visible'); // Lightbox einblenden

        setTimeout(() => {
            lightboxImage.style.left = `${targetX}px`;
            lightboxImage.style.top = `${targetY}px`;
            lightboxImage.style.width = `${targetW}px`;
        }, 0);
    });
});

// Klick-Event zum Schließen der Lightbox
lightbox.addEventListener('click', () => {
    lightbox.classList.remove('visible'); // Lightbox ausblenden
});

window.addEventListener('load', calculateGallery);
window.addEventListener('resize', calculateGallery);
