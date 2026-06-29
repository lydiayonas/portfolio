// CANVAS BG
(function() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], time = 0;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(initial) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.life = 0;
      this.maxLife = Math.random() * 300 + 200;
      const palettes = [[139,92,246],[217,70,239],[6,182,212],[245,158,11],[16,185,129]];
      this.color = palettes[Math.floor(Math.random() * palettes.length)];
      this.wave = Math.random() * Math.PI * 2;
    }
    update() {
      this.life++;
      this.x += this.speedX + Math.sin(time * 0.002 + this.wave) * 0.2;
      this.y += this.speedY;
      if (this.life > this.maxLife || this.y < -20) this.reset(false);
    }
    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
      const [r,g,b] = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < 120; i++) particles.push(new Particle());

  function drawOrbs() {
    const orbs = [
      { x: W*0.15, y: H*0.25, r: 280, c:[139,92,246], s:0.0003, amp:50 },
      { x: W*0.85, y: H*0.1,  r: 220, c:[217,70,239], s:0.0005, amp:40 },
      { x: W*0.5,  y: H*0.8,  r: 200, c:[6,182,212],  s:0.0004, amp:60 },
    ];
    orbs.forEach(o => {
      const px = o.x + Math.sin(time * o.s) * o.amp;
      const py = o.y + Math.cos(time * o.s * 1.3) * o.amp * 0.7;
      const grad = ctx.createRadialGradient(px,py,0,px,py,o.r);
      grad.addColorStop(0, `rgba(${o.c[0]},${o.c[1]},${o.c[2]},0.07)`);
      grad.addColorStop(1, 'transparent');
      ctx.beginPath(); ctx.arc(px,py,o.r,0,Math.PI*2);
      ctx.fillStyle = grad; ctx.fill();
    });
  }

  function animate() {
    time++;
    ctx.clearRect(0,0,W,H);
    drawOrbs();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();
