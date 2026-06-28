/* ==========================================================================
   MINIGAME.JS — "Debug Smasher"
   Mini game sederhana bertema gamer -> programmer: klik bug sebelum
   menghilang, hindari klik "clean code" yang sudah benar.
   Dibuat dengan DOM murni (absolute positioning), tanpa canvas, supaya
   tetap selaras dengan filosofi "masih belajar, bertahap" di website ini.
   ========================================================================== */

(function () {
  'use strict';

  const board = document.getElementById('gameBoard');
  const overlay = document.getElementById('gameOverlay');
  const overlayTitle = document.getElementById('gameOverlayTitle');
  const overlayDesc = document.getElementById('gameOverlayDesc');
  const startBtn = document.getElementById('gameStartBtn');
  const scoreEl = document.getElementById('gameScore');
  const timeEl = document.getElementById('gameTime');
  const highScoreEl = document.getElementById('gameHighScore');

  if (!board || !startBtn) return;

  const ROUND_DURATION = 30; // detik
  const HIGH_SCORE_KEY = 'ardi_portfolio_debugsmasher_highscore';

  // Jenis target: bug biasa (paling sering), bug langka (lebih jarang,
  // poin lebih besar), dan "clean code" (jangan diklik / penalti)
  const TARGET_TYPES = [
    { type: 'bug', emoji: '🐛', points: 10, weight: 70, life: 1300 },
    { type: 'rare-bug', emoji: '🪲', points: 30, weight: 18, life: 1000 },
    { type: 'clean-code', emoji: '✅', points: -15, weight: 12, life: 1100 }
  ];

  let score = 0;
  let timeLeft = ROUND_DURATION;
  let spawnTimer = null;
  let countdownTimer = null;
  let isRunning = false;
  let activeTargets = new Set();

  /* ---------- HIGH SCORE (localStorage — aman dipakai di sini karena ini
     file statis biasa, bukan artifact React/HTML preview) ---------- */
  function getHighScore() {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  }

  function setHighScore(value) {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  }

  function renderHighScore() {
    if (highScoreEl) highScoreEl.textContent = getHighScore();
  }

  /* ---------- PEMILIHAN TIPE TARGET BERDASARKAN WEIGHT ---------- */
  function pickTargetType() {
    const totalWeight = TARGET_TYPES.reduce((sum, t) => sum + t.weight, 0);
    let rand = Math.random() * totalWeight;

    for (const t of TARGET_TYPES) {
      if (rand < t.weight) return t;
      rand -= t.weight;
    }
    return TARGET_TYPES[0];
  }

  /* ---------- SPAWN SATU TARGET DI POSISI RANDOM ---------- */
  function spawnTarget() {
    if (!isRunning) return;

    const boardRect = board.getBoundingClientRect();
    const targetSize = 46;

    // Beri padding agar target tidak terlalu mepet ke tepi board
    const maxX = Math.max(boardRect.width - targetSize, 0);
    const maxY = Math.max(boardRect.height - targetSize, 0);
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    const config = pickTargetType();

    const target = document.createElement('button');
    target.className = `game-target game-target--${config.type}`;
    target.textContent = config.emoji;
    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.setAttribute('aria-label', config.type);

    function removeTarget() {
      if (board.contains(target)) board.removeChild(target);
      activeTargets.delete(target);
    }

    target.addEventListener('click', () => {
      handleHit(config, target);
      removeTarget();
    });

    // Target otomatis hilang sendiri jika tidak diklik dalam waktu "life"
    const lifeTimer = setTimeout(removeTarget, config.life);
    target._lifeTimer = lifeTimer;

    board.appendChild(target);
    activeTargets.add(target);
  }

  /* ---------- HANDLE KLIK TARGET ---------- */
  function handleHit(config, targetEl) {
    score = Math.max(0, score + config.points);
    scoreEl.textContent = score;

    // Feedback kecil: popup angka poin (+10 / +30 / -15) di posisi klik
    const popup = document.createElement('span');
    popup.className = 'game-points-popup' + (config.points < 0 ? ' game-points-popup--negative' : '');
    popup.textContent = (config.points > 0 ? '+' : '') + config.points;
    popup.style.left = targetEl.style.left;
    popup.style.top = targetEl.style.top;
    board.appendChild(popup);
    setTimeout(() => popup.remove(), 700);
  }

  /* ---------- SPAWN LOOP (interval makin cepat seiring waktu) ---------- */
  function scheduleNextSpawn() {
    if (!isRunning) return;

    const elapsed = ROUND_DURATION - timeLeft;
    // Mulai dari ~850ms antar spawn, makin cepat (minimal ~400ms) seiring waktu berjalan
    const interval = Math.max(850 - elapsed * 15, 400);

    spawnTimer = setTimeout(() => {
      spawnTarget();
      scheduleNextSpawn();
    }, interval);
  }

  /* ---------- MULAI GAME ---------- */
  function startGame() {
    score = 0;
    timeLeft = ROUND_DURATION;
    isRunning = true;

    scoreEl.textContent = score;
    timeEl.textContent = timeLeft;
    overlay.classList.add('is-hidden');

    scheduleNextSpawn();

    countdownTimer = setInterval(() => {
      timeLeft--;
      timeEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  /* ---------- AKHIRI GAME ---------- */
  function endGame() {
    isRunning = false;
    clearTimeout(spawnTimer);
    clearInterval(countdownTimer);

    // Bersihkan semua target yang masih aktif di board
    activeTargets.forEach((target) => {
      clearTimeout(target._lifeTimer);
      if (board.contains(target)) board.removeChild(target);
    });
    activeTargets.clear();

    const previousHigh = getHighScore();
    const isNewHigh = score > previousHigh;
    if (isNewHigh) {
      setHighScore(score);
      renderHighScore();
    }

    // Hook ke sistem achievement (Fase 2): selesai 1 round = unlock quest,
    // dan kalau score cukup tinggi (>=100) ada achievement tambahan.
    if (typeof window.Gamify === 'object') {
      window.Gamify.unlock('minigame_played');
      if (score >= 100) window.Gamify.unlock('minigame_master');
    }

    overlayTitle.textContent = isNewHigh ? 'High Score Baru! 🎉' : 'Round Selesai';
    overlayDesc.innerHTML = isNewHigh
      ? `Mantap! Score kamu <strong>${score}</strong> — rekor baru di browser ini.`
      : `Score kamu: <strong>${score}</strong>. High score saat ini: ${getHighScore()}.`;
    startBtn.textContent = 'Main Lagi';
    overlay.classList.remove('is-hidden');

    if (typeof window.showToast === 'function') {
      showToast(
        isNewHigh ? `High score baru: ${score}! 🏆` : `Round selesai, score: ${score}`,
        isNewHigh ? 'success' : 'default'
      );
    }
  }

  startBtn.addEventListener('click', startGame);

  // Hentikan game otomatis jika user pindah tab terlalu lama (hemat resource,
  // dan menghindari skor "curang" karena target menumpuk di background)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning) {
      endGame();
    }
  });

  document.addEventListener('DOMContentLoaded', renderHighScore);
})();
