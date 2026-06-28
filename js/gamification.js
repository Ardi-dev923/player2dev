/* ==========================================================================
   GAMIFICATION.JS — EXP, Level, Achievement & Quest System (Fase 2)
   Sistem ini jadi "otak" gamifikasi seluruh website: setiap aksi penting
   (buka section, main game, pakai terminal, dst) memberi EXP & bisa
   unlock achievement. Modul lain (main.js, terminal.js, minigame.js, dst)
   memanggil window.Gamify.unlock(id) — tidak perlu tahu detail internalnya.
   Semua progress disimpan di localStorage, jadi persist antar kunjungan.
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'ardi_portfolio_gamify_v1';
  const EXP_PER_LEVEL = 100;

  // ---------- DAFTAR ACHIEVEMENT / QUEST ----------
  // Setiap achievement = 1 quest yang otomatis terbuka saat aksi terkait
  // dilakukan pengunjung. "exp" adalah reward EXP saat pertama kali unlock.
  const ACHIEVEMENTS = [
    { id: 'first_boot', icon: '🎮', title: 'Player Joined', desc: 'Membuka portfolio ini untuk pertama kali', exp: 10 },
    { id: 'visit_about', icon: '🪪', title: 'Lihat Character Sheet', desc: 'Membuka section About', exp: 15 },
    { id: 'visit_journey', icon: '🕰️', title: 'Time Traveler', desc: 'Membuka section Journey', exp: 15 },
    { id: 'visit_skills', icon: '📊', title: 'Stat Checker', desc: 'Membuka section Skills', exp: 15 },
    { id: 'visit_projects', icon: '🗂️', title: 'Quest Seeker', desc: 'Membuka section Projects', exp: 15 },
    { id: 'visit_terminal', icon: '🖥️', title: 'Hacker Wannabe', desc: 'Membuka section Terminal', exp: 15 },
    { id: 'visit_minigame', icon: '🕹️', title: 'Arcade Visitor', desc: 'Membuka section Mini Game', exp: 15 },
    { id: 'visit_contact', icon: '📡', title: 'Socialite', desc: 'Membuka section Contact', exp: 15 },
    { id: 'terminal_used', icon: '⌨️', title: 'Command Runner', desc: 'Menjalankan command pertama di terminal', exp: 20 },
    { id: 'palette_used', icon: '🔍', title: 'Power User', desc: 'Membuka Command Palette (Ctrl+K)', exp: 20 },
    { id: 'minigame_played', icon: '🐛', title: 'Debugger', desc: 'Menyelesaikan 1 round Debug Smasher', exp: 25 },
    { id: 'minigame_master', icon: '🏆', title: 'Elite Debugger', desc: 'Dapat score 100+ dalam 1 round Debug Smasher', exp: 40 },
    { id: 'music_used', icon: '🎵', title: 'DJ Ardi', desc: 'Menyalakan background music', exp: 15 },
    { id: 'easter_egg_found', icon: '🥚', title: 'Secret Finder', desc: 'Menemukan easter egg tersembunyi', exp: 30 },
    { id: 'explorer', icon: '🗺️', title: 'Full Explorer', desc: 'Membuka semua section di website', exp: 50 }
  ];

  const SECTION_ACHIEVEMENT_IDS = [
    'visit_about', 'visit_journey', 'visit_skills',
    'visit_projects', 'visit_terminal', 'visit_minigame', 'visit_contact'
  ];

  // ---------- STATE (load dari localStorage) ----------
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* localStorage korup / tidak tersedia — mulai dari state kosong */
    }
    return { exp: 0, unlocked: [] };
  }

  let state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      showSaveIndicator();
    } catch (e) {
      /* diamkan — localStorage mungkin penuh / disabled, tidak kritikal */
    }
  }

  function getLevel(exp) {
    return Math.floor(exp / EXP_PER_LEVEL) + 1;
  }

  function getProgressPercent(exp) {
    return exp % EXP_PER_LEVEL;
  }

  /* ---------- SAVE INDICATOR ("Fake Save Progress" ala game console) ---------- */
  let saveIndicatorTimer = null;
  function showSaveIndicator() {
    const el = document.getElementById('saveIndicator');
    if (!el) return;
    el.classList.add('is-visible');
    clearTimeout(saveIndicatorTimer);
    saveIndicatorTimer = setTimeout(() => el.classList.remove('is-visible'), 1800);
  }

  /* ---------- HUD (Level + EXP bar di navbar) DAN SINKRONISASI
     dengan level bar statis di section About — supaya tidak ada dua
     angka level yang berbeda ditampilkan ke pengunjung (dulu About
     punya angka level hardcoded yang tidak nyambung dengan HUD). ---------- */
  function renderHud() {
    const level = getLevel(state.exp);
    const percent = getProgressPercent(state.exp);

    const levelEl = document.getElementById('hudLevel');
    const fillEl = document.getElementById('hudExpFill');
    if (levelEl) levelEl.textContent = 'LV.' + level;
    if (fillEl) fillEl.style.width = percent + '%';

    const aboutFill = document.getElementById('aboutLevelFill');
    const aboutLabel = document.getElementById('aboutLevelLabel');
    if (aboutFill) aboutFill.style.width = percent + '%';
    if (aboutLabel) aboutLabel.textContent = `LV.${level} — ${percent}% to next level`;
  }

  /* ---------- ACHIEVEMENT POPUP (ala notifikasi game) ---------- */
  function showAchievementPopup(achievement) {
    const container = document.getElementById('achievementPopupContainer');
    if (!container) return;

    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.innerHTML = `
      <span class="achievement-popup__icon">${achievement.icon}</span>
      <div class="achievement-popup__body">
        <span class="achievement-popup__label">Achievement Unlocked</span>
        <span class="achievement-popup__title">${achievement.title}</span>
        <span class="achievement-popup__exp">+${achievement.exp} EXP</span>
      </div>
    `;
    container.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('is-leaving');
      popup.addEventListener('animationend', () => popup.remove());
    }, 3200);
  }

  /* ---------- RENDER PANEL ACHIEVEMENT (daftar lengkap) ---------- */
  function renderAchievementPanel() {
    const list = document.getElementById('achievementList');
    const countEl = document.getElementById('achievementCount');
    if (!list) return;

    list.innerHTML = '';
    ACHIEVEMENTS.forEach((a) => {
      const isUnlocked = state.unlocked.includes(a.id);
      const item = document.createElement('li');
      item.className = 'achievement-item' + (isUnlocked ? ' is-unlocked' : '');
      item.innerHTML = `
        <span class="achievement-item__icon">${isUnlocked ? a.icon : '🔒'}</span>
        <div class="achievement-item__body">
          <span class="achievement-item__title">${isUnlocked ? a.title : '???'}</span>
          <span class="achievement-item__desc">${isUnlocked ? a.desc : 'Belum terbuka'}</span>
        </div>
        <span class="achievement-item__exp">+${a.exp}</span>
      `;
      list.appendChild(item);
    });

    if (countEl) countEl.textContent = `${state.unlocked.length} / ${ACHIEVEMENTS.length}`;
  }

  /* ---------- UNLOCK ACHIEVEMENT ---------- */
  function unlock(id) {
    if (state.unlocked.includes(id)) return; // sudah pernah unlock, abaikan

    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;

    state.unlocked.push(id);
    state.exp += achievement.exp;

    renderHud();
    showAchievementPopup(achievement);
    renderAchievementPanel();
    saveState();

    if (typeof window.showToast === 'function' && id !== 'first_boot') {
      // Toast singkat tambahan selain popup achievement (opsional, ringan)
    }

    // Cek quest gabungan "Full Explorer": semua section sudah dikunjungi
    const allSectionsVisited = SECTION_ACHIEVEMENT_IDS.every((sid) => state.unlocked.includes(sid));
    if (allSectionsVisited && !state.unlocked.includes('explorer')) {
      setTimeout(() => unlock('explorer'), 600);
    }
  }

  /* ---------- PUBLIC API ---------- */
  window.Gamify = {
    unlock,
    getState: () => ({ ...state }),
    getLevel: () => getLevel(state.exp),
    isUnlocked: (id) => state.unlocked.includes(id),
    openPanel: () => {
      const panel = document.getElementById('achievementPanel');
      if (panel) panel.classList.add('is-open');
    },
    closePanel: () => {
      const panel = document.getElementById('achievementPanel');
      if (panel) panel.classList.remove('is-open');
    }
  };

  /* ---------- INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    renderHud();
    renderAchievementPanel();

    const hudBtn = document.getElementById('hudButton');
    const panel = document.getElementById('achievementPanel');
    const closeBtn = document.getElementById('achievementPanelClose');
    const backdrop = document.getElementById('achievementPanelBackdrop');

    if (hudBtn) hudBtn.addEventListener('click', () => window.Gamify.openPanel());
    if (closeBtn) closeBtn.addEventListener('click', () => window.Gamify.closePanel());
    if (backdrop) backdrop.addEventListener('click', () => window.Gamify.closePanel());
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) {
        window.Gamify.closePanel();
      }
    });
  });

  // "Player Joined" otomatis unlock begitu boot sequence selesai
  window.addEventListener('app:loaded', () => {
    setTimeout(() => unlock('first_boot'), 800);
  });
})();
