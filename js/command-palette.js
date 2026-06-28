/* ==========================================================================
   COMMAND-PALETTE.JS — Ctrl+K Command Palette
   Navigasi cepat ala developer tools (VS Code / Raycast style) untuk
   menavigasi section, tanpa framework apa pun.
   ========================================================================== */

(function () {
  'use strict';

  const palette = document.getElementById('commandPalette');
  const backdrop = document.getElementById('commandPaletteBackdrop');
  const input = document.getElementById('commandInput');
  const list = document.getElementById('commandList');
  const cmdBtn = document.getElementById('cmdBtn');

  if (!palette || !input || !list) return;

  // Daftar aksi yang tersedia di command palette
  const actions = [
    { label: 'Buka Home', hint: 'section', action: () => scrollToSection('#hero') },
    { label: 'Buka About', hint: 'section', action: () => scrollToSection('#about') },
    { label: 'Buka Journey', hint: 'section', action: () => scrollToSection('#journey') },
    { label: 'Buka Skills', hint: 'section', action: () => scrollToSection('#skills') },
    { label: 'Buka Projects', hint: 'section', action: () => scrollToSection('#projects') },
    { label: 'Buka Terminal', hint: 'section', action: () => scrollToSection('#terminal') },
    { label: 'Buka Mini Game', hint: 'section', action: () => scrollToSection('#minigame') },
    { label: 'Buka Contact', hint: 'section', action: () => scrollToSection('#contact') },
    {
      label: 'Buka Achievements',
      hint: 'gamify',
      action: () => {
        if (typeof window.Gamify === 'object') window.Gamify.openPanel();
      }
    },
    { label: 'Scroll ke Atas', hint: 'action', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    {
      label: 'Toggle Musik',
      hint: 'action',
      action: () => {
        const musicBtn = document.getElementById('musicToggle');
        if (musicBtn) musicBtn.click();
      }
    },
    {
      label: 'Toggle Tema Glow (preview)',
      hint: 'fun',
      action: () => {
        document.body.classList.toggle('glitch-active');
        showToastIfAvailable('Mode ambient sedikit berubah ✨', 'success');
      }
    },
    {
      label: 'Tentang Website Ini',
      hint: 'info',
      action: () =>
        showToastIfAvailable('Dibuat manual dengan HTML, CSS, JS murni. No framework.', 'success')
    }
  ];

  let filteredActions = [...actions];
  let activeIndex = 0;

  function showToastIfAvailable(message, type) {
    if (typeof window.showToast === 'function') {
      window.showToast(message, type);
    }
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function renderList() {
    list.innerHTML = '';

    if (filteredActions.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'command-palette__item';
      empty.textContent = 'Tidak ada hasil ditemukan.';
      list.appendChild(empty);
      return;
    }

    filteredActions.forEach((action, index) => {
      const item = document.createElement('li');
      item.className = 'command-palette__item' + (index === activeIndex ? ' is-active' : '');
      item.innerHTML = `<span>${action.label}</span><span class="command-palette__item-hint">${action.hint}</span>`;

      item.addEventListener('mouseenter', () => {
        activeIndex = index;
        renderList();
      });

      item.addEventListener('click', () => {
        runAction(action);
      });

      list.appendChild(item);
    });
  }

  function runAction(action) {
    closePalette();
    setTimeout(() => action.action(), 150);
  }

  function filterActions(query) {
    const q = query.trim().toLowerCase();
    filteredActions = q
      ? actions.filter((a) => a.label.toLowerCase().includes(q))
      : [...actions];
    activeIndex = 0;
    renderList();
  }

  function openPalette() {
    palette.hidden = false;
    document.body.style.overflow = 'hidden';
    input.value = '';
    filterActions('');
    setTimeout(() => input.focus(), 50);

    // Hook ke sistem achievement (Fase 2)
    if (typeof window.Gamify === 'object') {
      window.Gamify.unlock('palette_used');
    }
  }

  function closePalette() {
    palette.hidden = true;
    document.body.style.overflow = '';
  }

  function isPaletteOpen() {
    return !palette.hidden;
  }

  // ---------- EVENT LISTENERS ----------

  document.addEventListener('keydown', (e) => {
    const isCmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';

    if (isCmdK) {
      e.preventDefault();
      isPaletteOpen() ? closePalette() : openPalette();
      return;
    }

    if (isPaletteOpen()) {
      if (e.key === 'Escape') {
        closePalette();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, filteredActions.length - 1);
        renderList();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        renderList();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredActions[activeIndex]) {
          runAction(filteredActions[activeIndex]);
        }
      }
    }
  });

  input.addEventListener('input', (e) => filterActions(e.target.value));
  backdrop.addEventListener('click', closePalette);
  if (cmdBtn) cmdBtn.addEventListener('click', openPalette);
})();
