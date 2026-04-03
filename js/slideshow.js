(() => {
  const track   = document.querySelector('.slideshow__track');
  if (!track) return;

  const slides  = [...document.querySelectorAll('.slideshow__slide')];
  const dotsBox = document.querySelector('.slideshow__dots');
  const btnPrev = document.querySelector('.slideshow__btn--prev');
  const btnNext = document.querySelector('.slideshow__btn--next');
  const DELAY   = 4000; // ms per slide
  let current   = 0;
  let timer;
  let resumeTimeout;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slideshow__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i, true));
    dotsBox.appendChild(dot);
  });

  const dots = () => [...document.querySelectorAll('.slideshow__dot')];

  function goTo(index, isUserInteraction = false) {
    slides[current].classList.remove('is-active');
    dots()[current].classList.remove('is-active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    dots()[current].classList.add('is-active');
    resetTimer(isUserInteraction);
  }

  function resetTimer(isUserInteraction = false) {
    clearInterval(timer);
    clearTimeout(resumeTimeout);

    if (isUserInteraction) {
      // Pause for 5 seconds after interaction, then resume
      resumeTimeout = setTimeout(() => {
        goTo(current + 1); // Auto slide once
        timer = setInterval(() => goTo(current + 1), DELAY); // Re-establish standard interval
      }, 5000);
    } else {
      timer = setInterval(() => goTo(current + 1), DELAY);
    }
  }

  btnPrev.addEventListener('click', () => goTo(current - 1, true));
  btnNext.addEventListener('click', () => goTo(current + 1, true));

  // Pause on hover
  const box = document.querySelector('.slideshow');
  box.addEventListener('mouseenter', () => {
    clearInterval(timer);
    clearTimeout(resumeTimeout);
  });
  box.addEventListener('mouseleave', () => resetTimer(true));

  // Swipe support (touch)
  let touchX = 0;
  track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(current + (diff > 0 ? 1 : -1), true);
  });

  resetTimer();
})();
