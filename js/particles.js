(() => {
  // ── Canvas setup ──
  const canvas = document.createElement('canvas');
  canvas.id = 'petal-canvas';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  const COLORS = ['#C9B8E8', '#F2C4CE', '#D9A7B0', '#EDE3F5', '#e8d8f0', '#ffffff'];
  const COUNT  = window.innerWidth < 600 ? 18 : 28;

  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  // ── Petal path (teardrop / leaf shape) ──
  function petalPath(size) {
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.bezierCurveTo( size * 0.6, -size * 0.5,  size * 0.6,  size * 0.5, 0,  size);
    ctx.bezierCurveTo(-size * 0.6,  size * 0.5, -size * 0.6, -size * 0.5, 0, -size);
    ctx.closePath();
  }

  // ── Particle class ──
  class Petal {
    constructor(fromTop = false) {
      this.init(fromTop);
    }

    init(fromTop = false) {
      this.x     = Math.random() * W;
      this.y     = fromTop ? -(Math.random() * 80 + 10) : Math.random() * H;
      this.size  = 4 + Math.random() * 9;
      this.vy    = 0.35 + Math.random() * 0.65;
      this.angle = Math.random() * Math.PI * 2;
      this.spin  = (Math.random() - 0.5) * 0.025;
      this.wave  = Math.random() * Math.PI * 2;
      this.waveSpeed = 0.012 + Math.random() * 0.018;
      this.waveAmp   = 0.4  + Math.random() * 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = 0.25 + Math.random() * 0.45;
      // fade-in as it spawns
      this.currentAlpha = fromTop ? 0 : this.alpha;
    }

    update() {
      this.y    += this.vy;
      this.wave += this.waveSpeed;
      this.x    += Math.sin(this.wave) * this.waveAmp;
      this.angle += this.spin;

      // fade in gently from top
      if (this.currentAlpha < this.alpha) {
        this.currentAlpha = Math.min(this.alpha, this.currentAlpha + 0.008);
      }

      if (this.y > H + 20) this.init(true);
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.globalAlpha = this.currentAlpha;
      ctx.shadowColor = this.color;
      ctx.shadowBlur  = 8;
      ctx.fillStyle   = this.color;
      petalPath(this.size);
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Init particles ──
  const petals = Array.from({ length: COUNT }, () => new Petal(false));

  // ── Animation loop ──
  let raf;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }
    raf = requestAnimationFrame(loop);
  }

  // Pause when tab is hidden — saves CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(loop);
    }
  });

  loop();
})();
