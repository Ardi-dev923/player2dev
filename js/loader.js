/* ==========================================================================
   LOADER.JS — Loading Screen & Boot Animation
   Mensimulasikan proses "booting system" sebelum konten utama ditampilkan.
   ========================================================================== */

(function () {
  'use strict';

  const loaderEl = document.getElementById('loader');
  const barFill = document.getElementById('loaderBarFill');
  const statusText = document.getElementById('loaderStatus');
  const percentText = document.getElementById('loaderPercent');

  if (!loaderEl) return;

  // Pesan boot yang berganti seiring progress, sesuai tema gamer -> programmer
  const bootMessages = [
    'BOOTING SYSTEM',
    'LOADING PLAYER DATA',
    'COMPILING SKILLS',
    'MOUNTING TERMINAL',
    'SYNCING JOURNEY LOG',
    'READY TO SPAWN'
  ];

  let progress = 0;
  let msgIndex = 0;

  function updateLoader() {
    // Increment acak agar terasa natural, bukan linear sempurna
    const increment = Math.random() * 9 + 3;
    progress = Math.min(progress + increment, 100);

    if (barFill) barFill.style.width = progress + '%';
    if (percentText) percentText.textContent = Math.floor(progress) + '%';

    const targetMsgIndex = Math.min(
      Math.floor((progress / 100) * bootMessages.length),
      bootMessages.length - 1
    );

    if (targetMsgIndex !== msgIndex) {
      msgIndex = targetMsgIndex;
      if (statusText) {
        statusText.innerHTML = bootMessages[msgIndex] + '<span class="loader__dots">...</span>';
      }
    }

    if (progress < 100) {
      setTimeout(updateLoader, 120);
    } else {
      finishLoading();
    }
  }

  function finishLoading() {
    setTimeout(() => {
      loaderEl.classList.add('is-hidden');
      document.body.classList.add('loaded');
      // Trigger event agar modul lain (scroll reveal dll) tahu loader sudah selesai
      window.dispatchEvent(new CustomEvent('app:loaded'));

      // Hapus loader dari DOM setelah transisi selesai demi performa
      setTimeout(() => {
        if (loaderEl.parentNode) {
          loaderEl.parentNode.removeChild(loaderEl);
        }
      }, 700);
    }, 350);
  }

  // Mulai loader setelah DOM siap
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateLoader, 200);
  });

  // Fallback: jika karena alasan tertentu loader macet, paksa selesai
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (progress < 100) {
        progress = 100;
        finishLoading();
      }
    }, 4000);
  });
})();
