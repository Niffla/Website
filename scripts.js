/*window.addEventListener("scroll", () => {
    // Alle Bilder im Container ansprechen
    let images = document.querySelectorAll("img");

    images.forEach((img, index) => {
        // Berechne die Verschiebung jedes Bildes individuell
        let speed = 1;  // Geschwindigkeit je Bild leicht anpassen
        img.style.transform = `translateY(${(window.scrollY - window.innerHeight * index) * speed}px)`;
    });
});*/

//cursor

const cursor = document.querySelector(".cursor");

// Mausbewegung tracken und den Cursor bewegen
document.addEventListener("mousemove", function (e) {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
});

// Cursor nur sichtbar machen, wenn über .preview
document.querySelectorAll(".interactive").forEach((preview) => {
    preview.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
    });

    preview.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
    });
});

function updateScrollSnapping() {
    window.scrollTo({
        top: Math.round(window.scrollY / window.innerHeight) * window.innerHeight,
        behavior: "smooth" // Sanfter Übergang
    });
}

window.addEventListener("scroll", () => {
    clearTimeout(window.snappingTimeout);
    window.snappingTimeout = setTimeout(updateScrollSnapping, 100); // Verzögerung für bessere UX
});

function updateSquareSize() {
    let squares = document.querySelectorAll(".square");
    let menuContainer = document.querySelector(".menu-container");

    if (window.innerWidth / window.innerHeight < 1) {
        squares.forEach(square => square.style.width = "100vw");
        squares.forEach(square => square.style.height = "50vh");
        menuContainer.style.width = "100vw";
        menuContainer.style.backgroundColor = "#ffffff";
    } else {
        squares.forEach(square => square.style.width = "50vw");
        squares.forEach(square => square.style.height = "100vh");
        menuContainer.style.width = "50vw";
        menuContainer.style.backgroundColor = "transparent";
    }
}

// Funktion beim Laden und beim Resizen des Fensters aufrufen
window.addEventListener("load", updateSquareSize);
window.addEventListener("resize", updateSquareSize);