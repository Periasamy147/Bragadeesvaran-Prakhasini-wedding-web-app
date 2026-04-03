// ─────────────────────────────────────────────
// DATA INJECTOR ENGINE
// Maps variables from site-data.js to HTML DOM
// ─────────────────────────────────────────────
(() => {
  // Inject values into designated DOM targets
  document.querySelectorAll("[data-site]").forEach(el => {
    const key = el.getAttribute("data-site");
    const val = SITE_DATA[key];
    
    if (val !== undefined) {
      if (el.tagName === 'IFRAME') {
        el.src = val;
      } else {
        el.innerHTML = val;
      }
    }
  });

  // Inject logic for the specific loader names if we want, 
  // but it's simpler to just do standard data-site attachments!
})();
