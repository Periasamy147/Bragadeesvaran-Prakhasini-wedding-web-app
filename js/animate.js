// ── Scroll Progress ──
const scrollBar = document.getElementById('scroll-progress');
if (scrollBar) {
  document.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    scrollBar.style.width = pct + '%';
  }, { passive: true });
}

// ── Image Preload ──
window.addEventListener('load', () => {
  document.querySelectorAll('.memories__item img').forEach((el) => {
    const img = new Image();
    img.src = el.dataset.src || el.src;
  });
});

// ── Image Protection ──
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

// ── Scroll Animations ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
