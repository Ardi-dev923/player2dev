/* ==========================================================================
   LOADER.JS — Boot Sequence V2 (Sinematik)
   Loading screen ala "booting OS": baris log terminal yang muncul satu-satu
   (typewriter), status check, progress bar yang nyambung ke jumlah baris
   yang sudah selesai, dan glitch effect sesekali pada logo.
   ========================================================================== */

(function () {
  'use strict';

  const loaderEl = document.getElementById('loader');
  const terminalEl = document.getElementById('loaderTerminal');
  const barFill = document.getElementById('loaderBarFill');
  const percentText = document.getElementById('loaderPercent');
  const logoEl = document.getElementById('loaderLogo');

  if (!loaderEl) return;

  // Skenario boot log — urutan ini yang membuat loading terasa "sinematik"
  // dibanding sekadar progress bar polos. Tiap baris punya status sendiri.
  const bootLog = [
    { text: 'INIT core_modules.sys', status: 'ok' },
    { text: 'MOUNTING /journey/gamer-to-dev', status: 'ok' },
    { text: 'CHECKING dependencies...', status: 'check' },
    { text: 'HTML5 / CSS3 / JavaScript', status: 'ok' },
    { text: 'LOADING skill_tree.dat', status: 'ok' },
    { text: 'VERIFYING terminal access', status: 'check' },
    { text: 'WARNING: experience masih level rendah', status: 'warn' },
    { text: 'COMPILING portfolio.exe', status: 'ok' },
    { text: 'SYNCING particle background', status: 'ok' },
    { text: 'ACCESS GRANTED', status: 'success' }
  ];

  let lineIndex = 0;
  let progress = 0;

  function appendLine(line) {
    const row = document.createElement('div');
    row.className = `loader__line loader__line--${line.status}`;

    const prefix =
      line.status === 'ok' ? '[OK]' :
      line.status === 'warn' ? '[WARN]' :
      line.status === 'success' ? '[DONE]' :
      '[....]';

    row.innerHTML = `<span class="loader__line-prefix">${prefix}</span> ${line.text}`;
    terminalEl.appendChild(row);
    terminalEl.scrollTop = terminalEl.scrollHeight;
  }

  // Glitch effect singkat pada logo, dipanggil acak selama proses boot
  function triggerLogoGlitch() {
    if (!logoEl) return;
    logoEl.classList.add('glitch-active');
    setTimeout(() => logoEl.classList.remove('glitch-active'), 280);
  }

  function processNextLine() {
    if (lineIndex >= bootLog.length) {
      return finishLoading();
    }

    const line = bootLog[lineIndex];
    appendLine(line);
    lineIndex++;

    progress = Math.min(Math.round((lineIndex / bootLog.length) * 100), 100);
    if (barFill) barFill.style.width = progress + '%';
    if (percentText) percentText.textContent = progress + '%';

    // Glitch sesekali secara acak, lebih sering menjelang akhir boot
    if (Math.random() < 0.35) triggerLogoGlitch();

    // Baris "CHECKING" / "VERIFYING" terasa lebih lama (simulasi proses),
    // baris biasa lebih cepat agar boot tetap terasa snappy keseluruhan.
    const delay = line.status === 'check' ? 420 : 220;
    setTimeout(processNextLine, delay);
  }

  function finishLoading() {
    triggerLogoGlitch();
    setTimeout(() => {
      loaderEl.classList.add('is-hidden');
      document.body.classList.add('loaded');
      window.dispatchEvent(new CustomEvent('app:loaded'));

      setTimeout(() => {
        if (loaderEl.parentNode) {
          loaderEl.parentNode.removeChild(loaderEl);
        }
      }, 700);
    }, 450);
  }

  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(processNextLine, 350);
  });

  // Fallback: kalau macet karena alasan apa pun, paksa selesai
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (lineIndex < bootLog.length) {
        lineIndex = bootLog.length;
        finishLoading();
      }
    }, 5000);
  });
})();
