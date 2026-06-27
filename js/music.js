/* ==========================================================================
   MUSIC.JS — Background Music Toggle
   Mengelola play/pause musik ambient di navbar. Preferensi mute/unmute
   disimpan di localStorage supaya konsisten saat reload.
   Browser modern memblokir autoplay dengan suara tanpa interaksi user,
   jadi musik HANYA dimulai ketika tombol ini diklik secara langsung.
   ========================================================================== */

(function () {
  'use strict';

  const audio = document.getElementById('bgmAudio');
  const toggleBtn = document.getElementById('musicToggle');
  const iconEl = document.getElementById('musicIcon');

  if (!audio || !toggleBtn || !iconEl) return;

  const MUSIC_PREF_KEY = 'ardi_portfolio_music_on';
  const VOLUME = 0.35;

  audio.volume = VOLUME;
  let isPlaying = false;
  let hasWarnedMissingFile = false;

  function updateIcon() {
    iconEl.textContent = isPlaying ? '🔊' : '🔇';
    toggleBtn.setAttribute('aria-pressed', String(isPlaying));
    toggleBtn.title = isPlaying ? 'Pause musik' : 'Putar musik';
  }

  function warnIfFileMissing() {
    if (hasWarnedMissingFile) return;
    hasWarnedMissingFile = true;
    if (typeof window.showToast === 'function') {
      window.showToast('Musik belum diisi — taruh file di assets/sounds/bgm.mp3', 'error');
    }
  }

  function playMusic() {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise
        .then(() => {
          isPlaying = true;
          updateIcon();
          localStorage.setItem(MUSIC_PREF_KEY, 'on');
        })
        .catch(() => {
          // Gagal play kemungkinan besar karena file belum ada / browser block
          isPlaying = false;
          updateIcon();
          warnIfFileMissing();
        });
    }
  }

  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    updateIcon();
    localStorage.setItem(MUSIC_PREF_KEY, 'off');
  }

  toggleBtn.addEventListener('click', () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  // Jika file audio gagal di-load sama sekali (404 dsb.), beri tahu user
  // sekali saja lewat toast, bukan error console yang membingungkan.
  audio.addEventListener('error', warnIfFileMissing);

  updateIcon();

  // Catatan: preferensi "on" dari sesi sebelumnya TIDAK auto-play di sini,
  // karena browser modern memblokir autoplay bersuara tanpa interaksi user.
  // Preferensi hanya dipakai sebagai indikasi, bukan untuk auto-start.
})();
