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

          // Hook ke sistem achievement (Fase 2)
          if (typeof window.Gamify === 'object') {
            window.Gamify.unlock('music_used');
          }
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

  /* ---------- AUTOPLAY UNMUTED — DICOBA PAKSA SAAT HALAMAN LOAD ----------
     PERINGATAN: kebijakan autoplay browser modern (Chrome, Firefox, Safari,
     Edge) MEMBLOKIR audio unmuted yang diputar otomatis tanpa interaksi user
     sama sekali di domain tersebut. Baris di bawah ini SENGAJA tetap mencoba
     memutar otomatis sesuai permintaan, tapi hasilnya tidak konsisten:
     - Di beberapa browser/device yang sudah pernah ada interaksi dengan
       domain ini sebelumnya, autoplay unmuted BISA berhasil.
     - Di kebanyakan kasus (terutama saat pertama kali buka tab), browser
       akan menolak permintaan ini secara diam-diam (promise rejected),
       dan musik TIDAK akan terdengar sampai user klik tombol secara manual.
     Tidak ada cara dari sisi kode untuk memaksa browser mengizinkan ini
     100% dari waktu — keputusan akhir selalu ada di tangan browser. */
  function attemptForcedAutoplay() {
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise
        .then(() => {
          isPlaying = true;
          updateIcon();
          if (typeof window.Gamify === 'object') {
            window.Gamify.unlock('music_used');
          }
        })
        .catch(() => {
          // Diblokir browser — diamkan tanpa toast error supaya tidak
          // terasa seperti "bug" di kunjungan pertama. Tombol manual di
          // navbar tetap selalu berfungsi sebagai fallback.
          isPlaying = false;
          updateIcon();
        });
    }
  }

  window.addEventListener('app:loaded', () => {
    setTimeout(attemptForcedAutoplay, 300);
  });
})();
