(() => {
  // Glow (ambient flashlight)
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  // Dot (precise pointer)
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  // Ring (trails behind and wraps buttons)
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let glowX = mouseX, glowY = mouseY;
  let lastSparkleX = mouseX, lastSparkleY = mouseY;
  let isClicking = false;

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'cursor-sparkle';
    document.body.appendChild(sparkle);

    // Random drift down and out
    const driftX = (Math.random() - 0.5) * 40; 
    const driftY = Math.random() * 40 + 10; 
    
    sparkle.style.setProperty('--startX', `${x}px`);
    sparkle.style.setProperty('--startY', `${y}px`);
    sparkle.style.setProperty('--endX', `${x + driftX}px`);
    sparkle.style.setProperty('--endY', `${y + driftY}px`);

    setTimeout(() => {
      if(sparkle.parentNode) sparkle.remove();
    }, 900);
  }

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Dot snaps instantly
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  // Magnetic hover states on interactive elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, input, .player, .nav, .event__card')) {
      ring.classList.add('is-hovering');
      dot.classList.add('is-hovering');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, input, .player, .nav, .event__card')) {
      ring.classList.remove('is-hovering');
      dot.classList.remove('is-hovering');
    }
  });

  document.addEventListener('mousedown', () => isClicking = true);
  document.addEventListener('mouseup', () => isClicking = false);

  (function animate() {
    let ringScale = isClicking ? 0.8 : 1;
    // Ring follows smoothly
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%) scale(${ringScale})`;

    // Glow follows even smoother
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.transform = `translate(${glowX}px, ${glowY}px)`;

    // Sparkle trail (spawns when mouse moves enough)
    if (Math.hypot(mouseX - lastSparkleX, mouseY - lastSparkleY) > 30) {
      createSparkle(mouseX, mouseY);
      lastSparkleX = mouseX;
      lastSparkleY = mouseY;
    }

    requestAnimationFrame(animate);
  })();
})();
