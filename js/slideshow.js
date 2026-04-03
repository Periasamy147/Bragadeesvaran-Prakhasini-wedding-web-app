// ─────────────────────────────────────────────
//  SLIDESHOW INTERACTION ENGINE
//  Auto-play (3s), interaction pause (7s), and auto-resume.
// ─────────────────────────────────────────────

const initSlideshow = () => {
    if (window.isSlideshowStarted) return;

    const track = document.getElementById('slideshow-track');
    const dotsBox = document.querySelector('.slideshow__dots');
    const btnPrev = document.querySelector('.slideshow__btn--prev');
    const btnNext = document.querySelector('.slideshow__btn--next');

    const slides = [...(track ? track.querySelectorAll('.slideshow__slide') : [])];

    if (slides.length === 0) return;

    window.isSlideshowStarted = true;

    const DELAY = 3000; // 3s auto-play
    const PAUSE = 7000; // 7s wait after manual click
    let current = 0;
    let timer;
    let resumeTimeout;

    // Build dots
    dotsBox.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slideshow__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => goTo(i, true));
        dotsBox.appendChild(dot);
    });

    const getDots = () => [...dotsBox.querySelectorAll('.slideshow__dot')];

    function goTo(index, isUserInteraction = false) {
        const dots = getDots();
        if (slides.length <= 1) return;

        slides[current].classList.remove('is-active');
        if (dots[current]) dots[current].classList.remove('is-active');

        current = (index + slides.length) % slides.length;

        slides[current].classList.add('is-active');
        if (dots[current]) dots[current].classList.add('is-active');

        resetTimer(isUserInteraction);
    }

    function resetTimer(isUserInteraction = false) {
        clearInterval(timer);
        clearTimeout(resumeTimeout);

        if (slides.length <= 1) return;

        if (isUserInteraction) {
            resumeTimeout = setTimeout(() => {
                goTo(current + 1); 
                timer = setInterval(() => goTo(current + 1), DELAY);
            }, PAUSE);
        } else {
            timer = setInterval(() => goTo(current + 1), DELAY);
        }
    }

    btnPrev.addEventListener('click', () => goTo(current - 1, true));
    btnNext.addEventListener('click', () => goTo(current + 1, true));

    // Hover logic
    const box = document.querySelector('.slideshow');
    if (box) {
        box.addEventListener('mouseenter', () => {
            clearInterval(timer);
            clearTimeout(resumeTimeout);
        });
        box.addEventListener('mouseleave', () => resetTimer(false));
    }

    // Touch logic
    let touchX = 0;
    track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1), true);
    });

    resetTimer();
};

if (window.slideshowDataReady) {
    initSlideshow();
} else {
    window.addEventListener('slideshowReady', initSlideshow);
}
