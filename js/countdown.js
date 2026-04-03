(() => {
  const TARGET     = new Date(SITE_DATA.countdownTarget);
  const daysEl     = document.getElementById('cd-days');
  const hoursEl    = document.getElementById('cd-hours');
  const minutesEl  = document.getElementById('cd-minutes');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    const diff = TARGET - Date.now();

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minutesEl.textContent = '00';
      clearInterval(timer);
      return;
    }

    daysEl.textContent    = pad(Math.floor(diff / 864e5));
    hoursEl.textContent   = pad(Math.floor((diff % 864e5) / 36e5));
    minutesEl.textContent = pad(Math.floor((diff % 36e5) / 6e4));
  }

  tick();
  const timer = setInterval(tick, 60000);
  window.addEventListener('pagehide', () => clearInterval(timer));
})();
