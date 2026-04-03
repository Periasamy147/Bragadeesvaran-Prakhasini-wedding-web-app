(() => {
  const tracks = SITE_DATA.tracks;

  let current = 0;
  let playing = false;
  let fadeTimer = null;

  const audio      = new Audio();
  const songEl     = document.getElementById('player-song');
  const artistEl   = document.getElementById('player-artist');
  const playBtn    = document.getElementById('player-play');
  const prevBtn    = document.getElementById('player-prev');
  const nextBtn    = document.getElementById('player-next');
  const fillEl     = document.getElementById('player-fill');
  const iconPlay   = playBtn.querySelector('.icon-play');
  const iconPause  = playBtn.querySelector('.icon-pause');
  const visualizer = document.getElementById('exp-visualizer');

  // ── Fade in volume ──
  function fadeIn() {
    clearInterval(fadeTimer);
    audio.volume = 0;
    fadeTimer = setInterval(() => {
      if (audio.volume < 0.95) {
        audio.volume = Math.min(1, +(audio.volume + 0.05).toFixed(2));
      } else {
        audio.volume = 1;
        clearInterval(fadeTimer);
      }
    }, 80);
  }

  // ── Load track ──
  function load(index, autoplay = playing) {
    current = (index + tracks.length) % tracks.length;
    const t = tracks[current];
    audio.src            = t.src;
    songEl.textContent   = t.song;
    artistEl.textContent = t.artist;
    fillEl.style.width   = '0%';
    localStorage.setItem('player-track', current);
    if (autoplay) audio.play().catch(() => {});
  }

  function togglePlay() {
    playing ? audio.pause() : audio.play().catch(() => {});
  }

  audio.addEventListener('play', () => {
    playing = true;
    iconPlay.style.display  = 'none';
    iconPause.style.display = '';
    playBtn.setAttribute('aria-pressed', 'true');
    playBtn.setAttribute('aria-label', 'Pause');
    if (visualizer) visualizer.classList.add('is-playing');
    fadeIn();
  });

  audio.addEventListener('pause', () => {
    playing = false;
    clearInterval(fadeTimer);
    iconPlay.style.display  = '';
    iconPause.style.display = 'none';
    playBtn.setAttribute('aria-pressed', 'false');
    playBtn.setAttribute('aria-label', 'Play');
    if (visualizer) visualizer.classList.remove('is-playing');
  });

  // ── Auto next song ──
  audio.addEventListener('ended', () => load(current + 1, true));

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    fillEl.style.width = (audio.currentTime / audio.duration * 100) + '%';
  });

  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', () => load(current - 1));
  nextBtn.addEventListener('click', () => load(current + 1));

  // ── Resume last song ──
  const saved = parseInt(localStorage.getItem('player-track'), 10);
  const validIndex = Number.isFinite(saved) && saved >= 0 && saved < tracks.length ? saved : 0;
  load(validIndex);
})();
