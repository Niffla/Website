function calculateImagesPerRow() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const aspectRatio = windowWidth / windowHeight;

    let iprow;

    // Bestimme die Anzahl der Bilder basierend auf dem Seitenverhältnis
    if (aspectRatio > 1.5) {  // Sehr breite Fenster
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
            totalWidth += img.naturalWidth;
            console.log(img.naturalWidth)
        });

        console.log(`Total Width: ${totalWidth}`)

        group.forEach(img => {
            const imgWidthPercentage = (img.naturalWidth / totalWidth);
            img.style.width = `${imgWidthPercentage * ((gallerywidth - 1 /* -1 weil es sonst buggt*/) - (group.length - 1) * gap)}px`;
            console.log(`Gruppe ${Math.floor(i / iprow) + 1}:`, img.src);
        });
    }

    console.log("calculated Gallery")
};



window.addEventListener('load', calculateGallery);
window.addEventListener('resize', calculateGallery);
