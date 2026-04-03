(() => {

  // ── Back to Top ──────────────────────────────────────────
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ── Section Dot Nav ──────────────────────────────────────
  const dots     = [...document.querySelectorAll('.dot-nav__dot')];
  const sections = dots.map(d => document.getElementById(d.dataset.section)).filter(Boolean);

  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d =>
          d.classList.toggle('is-active', d.dataset.section === entry.target.id)
        );
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => dotObserver.observe(s));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  // ── Parallax Hero ────────────────────────────────────────
  const hero = document.querySelector('.hero');

  function parallaxHero() {
    if (window.scrollY < window.innerHeight) {
      hero.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }
  }

  window.addEventListener('scroll', parallaxHero, { passive: true });


  // ── Image Tilt (3D) ──────────────────────────────────────
  document.querySelectorAll('.profile__image-wrap').forEach(wrap => {
    wrap.style.transition = 'transform 0.15s ease';
    wrap.style.willChange = 'transform';

    wrap.addEventListener('mousemove', e => {
      const r  = wrap.getBoundingClientRect();
      const rx = ((e.clientY - r.top  - r.height / 2) / r.height) * -10;
      const ry = ((e.clientX - r.left - r.width  / 2) / r.width)  *  10;
      wrap.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    });

    wrap.addEventListener('mouseleave', () => {
      wrap.style.transform = '';
    });
  });


  // ── Parallax Gallery ─────────────────────────────────────
  const galleryItems = [...document.querySelectorAll('.memories__item')];
  // Alternate speed per column position (0.05 / 0.02 / 0.07)
  const speeds = [0.05, 0.02, 0.07];

  function parallaxGallery() {
    galleryItems.forEach((item, i) => {
      const rect  = item.getBoundingClientRect();
      const mid   = rect.top + rect.height / 2 - window.innerHeight / 2;
      const speed = speeds[i % 3];
      item.style.setProperty('--py', `${mid * speed}px`);
    });
  }

  window.addEventListener('scroll', parallaxGallery, { passive: true });
  parallaxGallery();

})();
