(() => {
  // Map data-img attribute → IMAGES key from config.js
  document.querySelectorAll('img[data-img]').forEach(img => {
    const key = img.dataset.img;
    if (IMAGES[key]) img.src = IMAGES[key];
  });
})();
