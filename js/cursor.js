/* ==========================================================================
   CURSOR.JS — Custom Cursor & Mouse Glow Ambient Lighting
   Dinonaktifkan otomatis di perangkat sentuh / layar kecil (lihat responsive.css)
   ========================================================================== */

(function () {
  'use strict';

  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (isTouchDevice) return; // Jangan aktifkan custom cursor di mobile/touch

  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const mouseGlow = document.getElementById('mouseGlow');

  if (!cursorDot || !cursorRing) return;

  document.body.classList.add('has-custom-cursor');

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot mengikuti posisi mouse secara instan
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Loop animasi untuk efek "lag" yang halus pada ring & glow
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';

    if (mouseGlow) {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      mouseGlow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Perbesar ring saat hover elemen interaktif
  const interactiveSelectors = 'a, button, input, textarea, .tilt, .skill-card, .project-card, [data-cursor-hover]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorRing.classList.add('is-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      cursorRing.classList.remove('is-hover');
    }
  });

  // Sembunyikan cursor custom saat keluar dari window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });
})();
