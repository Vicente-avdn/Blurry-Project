const logonav = document.querySelector(".nav__item--logo img");
const nav = document.querySelector("nav");
const chevronLeft = document.querySelector('.chevron__left');
const chevronRight = document.querySelector('.chevron__right');
const imageContainer = document.querySelector('.header__image-container');
const images = document.querySelectorAll('.header__image');

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        logonav.style.height = "70px";
        nav.style.padding = "0px";
    }
});
window.addEventListener("scroll", () => {
    if (window.scrollY < 50) {
        logonav.style.height = null;
        nav.style.padding = null;
    }
});

let currentIndex = 0;
let carouselInterval;

chevronLeft.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - 1;
    }
    updateCarousel();
    resetCarouselInterval();
});

chevronRight.addEventListener('click', () => {
    if (currentIndex < images.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
    resetCarouselInterval();
});

function updateCarousel() {
    const translateXValue = -currentIndex * 100 / images.length;
    imageContainer.style.transform = `translateX(${translateXValue}%)`;
    updateChevronPosition();
}

function updateChevronPosition() {
    const imageWidth = images[0].clientWidth;
    chevronLeft.style.left = `${10 + currentIndex * imageWidth}px`;
    chevronRight.style.right = `${10 + (images.length - currentIndex - 1) * imageWidth}px`;
}

function autoChangeSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}

function startCarousel() {
    if (window.innerWidth <= 827) {
        carouselInterval = setInterval(autoChangeSlide, 5000);
    }
}

function resetCarouselInterval() {
    clearInterval(carouselInterval);
    startCarousel();
}

startCarousel();

window.addEventListener('resize', () => {
    if (window.innerWidth > 1153) {
        currentIndex = 0;
        imageContainer.style.transform = 'none';
        clearInterval(carouselInterval);
    } else {
        updateCarousel();
        resetCarouselInterval();
    }
});
