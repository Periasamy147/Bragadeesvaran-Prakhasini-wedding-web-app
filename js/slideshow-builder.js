// ─────────────────────────────────────────────
//  DYNAMIC SLIDESHOW DISCOVERY & BUILDER
//  Automatically finds and builds slideshow from Cloudinary.
// ─────────────────────────────────────────────

(async () => {
  const track = document.getElementById('slideshow-track');
  if (!track) return;

  const MAX_SLIDES = 20; 
  const foundImages = [];
  
  // Helper to check image existence
  const checkImage = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  };

  for (let i = 1; i <= MAX_SLIDES; i++) {
    const publicId = `${i}`;
    const url = CLD.url(publicId, 'w_900,h_600,c_fill');
    
    const exists = await checkImage(url);
    if (exists) {
      foundImages.push(url);
    } else {
      break; 
    }
  }

  // Build the DOM
  track.innerHTML = '';
  if (foundImages.length === 0) {
    track.innerHTML = '<div class="slideshow__empty">No slideshow photos found.</div>';
    return;
  }

  foundImages.forEach((imgUrl, idx) => {
    const figure = document.createElement('figure');
    figure.className = (idx === 0) ? 'slideshow__slide is-active' : 'slideshow__slide';
    figure.innerHTML = `<img src="${imgUrl}" alt="Slide ${idx + 1}" /><figcaption></figcaption>`;
    track.appendChild(figure);
  });

  // Set global flag and notify system
  window.slideshowDataReady = true;
  window.dispatchEvent(new CustomEvent('slideshowReady'));
})();
