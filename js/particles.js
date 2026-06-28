/* ==========================================================================
   PARTICLES.JS — Background Particle Canvas
   Particle ringan bertema "data points" / bintang digital, menyatu dengan
   tema cyberpunk tanpa membebani performa.
   ========================================================================== */

(function () {
  'use strict';

  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let particles = [];
  let width, height;
  let mouseX = null, mouseY = null;

  // Jumlah partikel disesuaikan dengan luas layar agar tetap performant
  function getParticleCount() {
    const area = window.innerWidth * window.innerHeight;
    return Math.min(Math.floor(area / 14000), 110);
  }

  const colors = ['#00f0ff', '#8b5cf6', '#39ff88'];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    const count = getParticleCount();
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.5 + 0.2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // ---------- UPDATE POSISI & REAKSI MOUSE ----------
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around tepi layar
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Reaksi mouse V2: partikel di sekitar cursor saling MENJAUH
      // (repulsion) — terasa seperti "energy field", lebih hidup
      // dibanding tarikan halus versi sebelumnya.
      if (mouseX !== null) {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 130;

        if (dist < radius && dist > 0.001) {
          const force = (1 - dist / radius) * 1.8;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }
    });

    // ---------- GAMBAR CONNECTING LINES (efek "network/code graph") ----------
    // Hanya menghubungkan partikel yang cukup berdekatan, dan opacity garis
    // memudar sesuai jarak — supaya terasa seperti graph data, sejalan
    // dengan tema developer/teknologi di website ini.
    const LINK_DISTANCE = 110;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = 'rgba(0, 240, 255, ' + (1 - dist / LINK_DISTANCE) * 0.15 + ')';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // ---------- GAMBAR PARTIKEL ----------
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  }

  let animationFrame;
  function loop() {
    draw();
    animationFrame = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    createParticles();

    if (prefersReducedMotion) {
      // Tampilkan partikel statis sekali saja, tanpa animasi terus-menerus
      draw();
      return;
    }
    loop();
  }

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hentikan animasi saat tab tidak aktif demi performa & battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else if (!prefersReducedMotion) {
      loop();
    }
  });

  document.addEventListener('DOMContentLoaded', init);
})();
