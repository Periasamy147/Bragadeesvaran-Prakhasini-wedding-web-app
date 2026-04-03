(() => {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');

  const items = Array.from(
    document.querySelectorAll('.memories__item img')
  );

  let current = 0;
  let navTimer = null;

  function open(index) {
    current = index;
    const img = items[current];
    lbImg.src             = img.src;
    lbImg.alt             = img.alt;
    lbCaption.textContent = img.closest('figure').querySelector('figcaption')?.textContent ?? '';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function navigate(dir) {
    current = (current + dir + items.length) % items.length;
    const target = current;
    lbImg.classList.add('is-switching');
    clearTimeout(navTimer);
    navTimer = setTimeout(() => {
      open(target);
      lbImg.classList.remove('is-switching');
    }, 150);
  }

  items.forEach((img, i) =>
    img.closest('figure').addEventListener('click', () => open(i))
  );

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => navigate(-1));
  lbNext.addEventListener('click', () => navigate(1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
})();
