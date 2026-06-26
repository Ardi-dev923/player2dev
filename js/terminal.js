/* ==========================================================================
   TERMINAL.JS — Fake Terminal Interaktif
   Simulasi terminal di section #terminal. Bukan terminal sungguhan —
   hanya untuk menunjukkan kepribadian "gamer belajar ngoding" secara playful.
   ========================================================================== */

(function () {
  'use strict';

  const body = document.getElementById('terminalBody');
  const input = document.getElementById('terminalInput');
  if (!body || !input) return;

  // "Database" jawaban command — gampang ditambah tanpa ubah logic utama
  const commands = {
    help: () => [
      'Daftar command yang tersedia:',
      '  help        - tampilkan daftar command',
      '  about       - sedikit cerita tentang Ardi',
      '  skills      - lihat skill yang sedang dipelajari',
      '  journey     - ringkasan perjalanan gamer -> programmer',
      '  projects    - daftar quest / project yang sedang dikerjakan',
      '  whoami      - identitas singkat',
      '  sudo        - coba saja...',
      '  clear       - bersihkan layar terminal',
      '  exit        - "keluar" (tenang, ini cuma simulasi)'
    ],
    about: () => [
      'Ardi — mantan full-time gamer, sekarang sedang belajar programming.',
      'Masih banyak error, masih banyak nyari di dokumentasi, tapi enjoy proses-nya.'
    ],
    skills: () => [
      'HTML        [#######---] 70%',
      'CSS         [######----] 60%',
      'JavaScript  [####------] 45%',
      'Git/GitHub  [###-------] 35%',
      'Problem Solving [######--] 65%',
      'Konsistensi [########--] 80%'
    ],
    journey: () => [
      '01. Full-time gamer',
      '02. Penasaran cara game dibuat',
      '03. Belajar HTML & CSS pertama kali',
      '04. Sedang belajar JavaScript & logic dasar (CURRENT)',
      '05. ??? — belum ter-unlock'
    ],
    projects: () => [
      'Personal Portfolio v1   -> status: Learning',
      'Mini Game Tracker       -> status: Planning',
      'Quest Board To-Do List  -> status: Coming Soon',
      'Belajar Backend Dasar   -> status: Planning'
    ],
    whoami: () => ['ardi // gamer.exe -> compiling into developer.exe (38% complete)'],
    sudo: () => [
      'Permission denied: kamu bukan root di hidup orang lain,',
      'tapi di project sendiri, kamu adalah root. Keep building.'
    ],
    clear: () => {
      body.innerHTML = '';
      return null;
    },
    exit: () => [
      'Tidak ada "exit" di journey belajar — cuma checkpoint berikutnya. :)'
    ]
  };

  function printLine(text, className) {
    const line = document.createElement('div');
    line.className = 'term-line' + (className ? ' ' + className : '');
    line.textContent = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function printPromptLine(cmd) {
    printLine('ardi@dev:~$ ' + cmd, 'term-line--input');
  }

  function bootIntro() {
    const introLines = [
      'Selamat datang di fake terminal milik Ardi.',
      'Ini bukan terminal sungguhan, tapi cobalah ketik "help".'
    ];
    introLines.forEach((line) => printLine(line));
  }

  function handleCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (cmd === '') return;

    printPromptLine(raw);

    if (commands[cmd]) {
      const output = commands[cmd]();
      if (output) {
        output.forEach((line) => printLine(line));
      }
    } else {
      printLine(`command not found: ${cmd} (ketik "help" untuk daftar command)`, 'term-line--error');
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value;
      handleCommand(value);
      input.value = '';
    }
  });

  // Fokuskan input saat terminal area diklik, demi UX
  const terminalWrap = document.getElementById('fakeTerminal');
  if (terminalWrap) {
    terminalWrap.addEventListener('click', () => input.focus());
  }

  document.addEventListener('DOMContentLoaded', bootIntro);
})();
