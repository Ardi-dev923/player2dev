/* ==========================================================================
   EASTEREGG.JS — Easter Egg Ketika Logo Diklik Beberapa Kali
   Klik logo "<Ardi/>" 5x dalam waktu singkat untuk memicu efek tersembunyi.
   ========================================================================== */

(function () {
  'use strict';

  const logo = document.getElementById('logoTrigger');
  const sound = document.getElementById('easterEggSound');
  if (!logo) return;

  const CLICKS_REQUIRED = 5;
  const CLICK_TIMEOUT = 1500; // ms — reset hitungan jika klik terlalu lambat

  let clickCount = 0;
  let resetTimer = null;
  let alreadyTriggered = false;

  // Pesan rahasia yang akan tampil sebagai toast saat easter egg aktif
  const secretMessages = [
    'Achievement Unlocked: Curious Clicker 🎮',
    'Kamu menemukan easter egg! Sama seperti debugging — sabar berbuah hasil.',
  ];

  function triggerEasterEgg() {
    if (alreadyTriggered) return;
    alreadyTriggered = true;

    document.body.classList.add('shake');
    logo.classList.add('glitch-active');

    // Hook ke sistem achievement (Fase 2)
    if (typeof window.Gamify === 'object') {
      window.Gamify.unlock('easter_egg_found');
    }

    // Coba mainkan sound efek (boleh gagal diam-diam jika file belum ada)
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        /* file audio belum tersedia — diamkan, bukan error kritikal */
      });
    }

    secretMessages.forEach((msg, i) => {
      setTimeout(() => {
        if (typeof window.showToast === 'function') {
          window.showToast(msg, 'success');
        }
      }, i * 900);
    });

    setTimeout(() => {
      document.body.classList.remove('shake');
      logo.classList.remove('glitch-active');
      // Boleh ditrigger lagi setelah beberapa saat
      setTimeout(() => { alreadyTriggered = false; }, 3000);
    }, 700);

    clickCount = 0;
  }

  logo.addEventListener('click', (e) => {
    e.preventDefault();

    clickCount++;
    clearTimeout(resetTimer);

    if (clickCount >= CLICKS_REQUIRED) {
      triggerEasterEgg();
      return;
    }

    // Beri sedikit feedback visual setiap klik mendekati target
    logo.style.transform = `scale(${1 + clickCount * 0.03})`;
    setTimeout(() => { logo.style.transform = 'scale(1)'; }, 150);

    resetTimer = setTimeout(() => {
      clickCount = 0;
    }, CLICK_TIMEOUT);
  });
})();
