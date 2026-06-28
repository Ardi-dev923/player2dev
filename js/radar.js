/* ==========================================================================
   RADAR.JS — Mini Radar Navigasi (Fase 2)
   Widget kecil di pinggir layar menampilkan titik untuk setiap section.
   Titik yang aktif (sesuai posisi scroll saat ini) menyala, dan setiap
   titik bisa diklik untuk lompat cepat ke section terkait — semacam
   "minimap" ala game, dipakai untuk navigasi.
   ========================================================================== */

(function () {
  'use strict';

  const radarEl = document.getElementById('miniRadar');
  if (!radarEl) return;

  // Daftar section yang ditampilkan di radar, urut sesuai urutan di halaman
  const SECTIONS = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'journey', label: 'Journey' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'terminal', label: 'Terminal' },
    { id: 'minigame', label: 'Mini Game' },
    { id: 'contact', label: 'Contact' }
  ];

  // Bangun titik-titik radar berdasarkan section yang benar-benar ada di DOM
  const availableSections = SECTIONS.filter((s) => document.getElementById(s.id));
  if (!availableSections.length) return;

  const dotElements = {};

  availableSections.forEach((section) => {
    const dot = document.createElement('button');
    dot.className = 'mini-radar__dot';
    dot.setAttribute('data-section', section.id);
    dot.setAttribute('aria-label', 'Lompat ke section ' + section.label);
    dot.innerHTML = `<span class="mini-radar__tooltip">${section.label}</span>`;

    dot.addEventListener('click', () => {
      const target = document.getElementById(section.id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });

    radarEl.appendChild(dot);
    dotElements[section.id] = dot;
  });

  function setActive(id) {
    Object.keys(dotElements).forEach((key) => {
      dotElements[key].classList.toggle('is-active', key === id);
    });
  }

  // Pakai IntersectionObserver yang sama gayanya dengan active-nav-highlight
  // di main.js, supaya konsisten menentukan "section mana yang sedang aktif"
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.getAttribute('id'));
        }
      });
    },
    { rootMargin: '-45% 0px -45% 0px' }
  );

  availableSections.forEach((section) => {
    const el = document.getElementById(section.id);
    if (el) observer.observe(el);
  });

  // Set default aktif di awal (Home) sebelum user mulai scroll
  setActive('hero');
})();
