/* ==========================================================================
   MAIN.JS — Inisialisasi Website
   Menyatukan fitur kecil yang tidak punya file modular sendiri:
   toast notification system, footer year, dan contact form handler.
   Modul lain (loader, cursor, particles, dst.) sudah mengatur dirinya
   sendiri di file masing-masing dan tinggal di-load melalui index.html.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- TOAST NOTIFICATION SYSTEM ---------- */
  // Diekspos secara global (window.showToast) agar modul lain (command-palette,
  // easteregg, contact form) bisa memicu toast tanpa duplikasi logic.
  function showToast(message, type = 'default') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-leaving');
      toast.addEventListener('animationend', () => toast.remove());
    }, 3200);
  }
  window.showToast = showToast;

  /* ---------- FOOTER YEAR ---------- */
  function setFooterYear() {
    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- CONTACT FORM (simulasi pengiriman, tanpa backend) ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('nameInput');
      const emailInput = document.getElementById('emailInput');
      const messageInput = document.getElementById('messageInput');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Lengkapi semua field dulu ya.', 'error');
        return;
      }

      // Catatan: ini hanya simulasi front-end. Belum terhubung ke backend/email service
      // karena Ardi masih dalam tahap belajar — fitur backend masih "Planning".
      showToast(`Terima kasih, ${nameInput.value.trim()}! Pesan kamu tersimpan (simulasi).`, 'success');
      form.reset();
    });
  }

  /* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
  function initActiveNavHighlight() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.navbar__link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });

            // Hook ke sistem achievement (Fase 2): buka section tertentu
            // pertama kali = unlock quest terkait. Gamify.unlock() sendiri
            // sudah aman dipanggil berkali-kali (no-op kalau sudah unlock).
            if (typeof window.Gamify === 'object' && id !== 'hero') {
              window.Gamify.unlock('visit_' + id);
            }
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- WELCOME TOAST (sekali, setelah loader selesai) ---------- */
  function initWelcomeToast() {
    window.addEventListener('app:loaded', () => {
      setTimeout(() => {
        showToast('Selamat datang di journey Ardi! 🎮 ➜ 💻', 'success');
      }, 600);
    });
  }

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    setFooterYear();
    initContactForm();
    initActiveNavHighlight();
    initWelcomeToast();
  });
})();
