document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".carousel__container");

    if (!carousel) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;

    // pause quand l'utilisateur survole ou touche le carrousel
    carousel.addEventListener("mouseenter", () => (paused = true));
    carousel.addEventListener("mouseleave", () => (paused = false));
    carousel.addEventListener("touchstart", () => (paused = true), { passive: true });

    setInterval(() => {
        if (paused) return;

        const item = carousel.querySelector(".carousel__item");
        const gap = parseFloat(getComputedStyle(carousel).columnGap) || 0;
        const step = item ? item.getBoundingClientRect().width + gap : carousel.clientWidth;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        const next = carousel.scrollLeft >= maxScroll - 1 ? 0 : Math.min(carousel.scrollLeft + step, maxScroll);

        carousel.scrollTo({
            left: next,
            behavior: "smooth"
        });
    }, 3000);
});
