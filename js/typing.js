/* ==========================================================================
   TYPING.JS — Typing Animation Effect
   Menampilkan beberapa identitas yang diketik & dihapus bergantian pada Hero.
   ========================================================================== */

(function () {
  'use strict';

  const target = document.getElementById('typingTarget');
  if (!target) return;

  // Daftar identitas yang merepresentasikan transisi gamer -> programmer
  const phrases = [
    'seorang gamer.',
    'pemain yang lagi grinding logic.',
    'calon programmer (masih belajar).',
    'Ardi — work in progress.'
  ];

  const TYPE_SPEED = 65;
  const DELETE_SPEED = 35;
  const PAUSE_AFTER_TYPE = 1600;
  const PAUSE_AFTER_DELETE = 400;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      charIndex++;
      target.textContent = currentPhrase.slice(0, charIndex);

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        return setTimeout(tick, PAUSE_AFTER_TYPE);
      }
      return setTimeout(tick, TYPE_SPEED);
    }

    // Mode menghapus
    charIndex--;
    target.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      return setTimeout(tick, PAUSE_AFTER_DELETE);
    }
    return setTimeout(tick, DELETE_SPEED);
  }

  // Mulai setelah loader selesai agar tidak bersamaan dengan boot animation
  window.addEventListener('app:loaded', () => {
    setTimeout(tick, 400);
  });

  // Fallback jika event app:loaded tidak terpicu (loader gagal load dsb.)
  setTimeout(() => {
    if (target.textContent === '') tick();
  }, 2500);
})();
