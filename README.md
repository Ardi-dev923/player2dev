# Ardi — Portfolio Website
### "A Gamer Growing Into a Programmer"

Website portfolio personal bertema **Dark Futuristic / Cyberpunk ringan / Glassmorphism**,
dibangun murni dengan **HTML, CSS, dan JavaScript** tanpa framework apa pun
(tidak ada Bootstrap, Tailwind, atau React).

Konsep besar website ini: Ardi adalah seorang **gamer yang sedang belajar menjadi
programmer**. Semua konten — dari "level bar", "stat skill", hingga "quest log
project" — sengaja dibingkai dengan bahasa gaming/RPG, dan jujur menunjukkan
status **belajar**, bukan seolah-olah developer profesional.

---

## 📁 Struktur Folder

```
portfolio/
│
├── index.html                 # Struktur HTML utama (tanpa inline CSS/JS)
│
├── css/
│   ├── style.css              # Layout utama, design tokens, struktur section
│   ├── components.css         # Card, button, navbar, footer, modal, glass, toast
│   ├── animations.css         # Keyframes: glow, fade, float, typing, dll
│   └── responsive.css         # Media query desktop / laptop / tablet / mobile
│
├── js/
│   ├── main.js                # Inisialisasi umum, toast system, contact form
│   ├── loader.js               # Loading screen & boot animation
│   ├── particles.js            # Background particle canvas
│   ├── cursor.js               # Custom cursor & mouse glow
│   ├── typing.js                # Typing animation di Hero
│   ├── animations.js            # Scroll reveal, parallax, tilt, ripple, navbar
│   ├── counter.js               # Animasi angka statistik
│   ├── terminal.js              # Fake terminal interaktif
│   ├── command-palette.js       # Command palette (Ctrl + K)
│   ├── minigame.js              # Mini game "Debug Smasher"
│   ├── music.js                  # Background music toggle
│   ├── gamification.js           # EXP, Level, Achievement & Quest system
│   ├── radar.js                  # Mini radar navigasi section
│   └── easteregg.js             # Easter egg saat logo diklik berkali-kali
│
├── assets/
│   ├── images/                 # avatar.jpg, og-cover.jpg, dll
│   ├── icons/                  # favicon.png, dll
│   ├── fonts/                  # (opsional, jika ingin self-host font)
│   └── sounds/                 # easter-egg.mp3 (opsional)
│
└── README.md
```

---

## ✨ Daftar Fitur

- Loading Screen + Boot Animation bertema "system booting"
- Sticky Navbar dengan highlight section aktif
- Hero Section dengan typing animation & floating shapes
- About (Character Sheet style, dengan level bar)
- Journey / Timeline (Save Point style)
- Skills (XP bar, jujur menampilkan persentase belajar)
- Statistics (animated counter)
- Planned Projects (status: Planning / Learning / Coming Soon)
- Fake Terminal interaktif (`help`, `about`, `skills`, dll)
- Mini Game "Debug Smasher" dengan high score tersimpan lokal
- Background Music toggle (play/pause, ikon di navbar)
- EXP, Level, Achievement & Quest System (15 achievement, persist lokal)
- Mini Radar navigasi section (desktop)
- Command Palette (`Ctrl + K` atau klik tombol `⌘K`)
- Contact Form (simulasi, belum terhubung backend)
- Toast Notification system
- Easter Egg (klik logo 5x berturut-turut)
- Custom Cursor + Mouse Glow (otomatis nonaktif di perangkat sentuh)
- Scroll Progress Bar & Back to Top button
- Glassmorphism di seluruh card/navbar/modal
- Particle background bertema digital
- Card tilt 3D + ripple effect saat klik
- Reduced-motion aware (menghormati preferensi aksesibilitas pengguna)
- SEO dasar: meta description, Open Graph, Twitter Card, JSON-LD schema
- Layout responsif penuh: desktop, laptop, tablet, mobile

---

## 🚀 Cara Menjalankan

1. Download / clone seluruh folder `portfolio/`.
2. Pastikan struktur folder tetap sama (jangan pindahkan file css/js sendiri-sendiri).
3. Buka `index.html` langsung di browser, **atau** jalankan local server
   (disarankan, supaya font & asset ter-load dengan baik), contoh:

   ```bash
   npx serve .
   ```

   atau dengan Python:

   ```bash
   python3 -m http.server 8080
   ```

4. Buka `http://localhost:8080` di browser.

---

## 🖼️ Catatan Tentang Assets

File-file di `assets/images/avatar.jpg`, `assets/icons/favicon.png`, dan
`assets/sounds/easter-egg.mp3` **belum disertakan** (placeholder). Website
tetap berjalan normal tanpa file-file ini karena sudah ada fallback:

- Avatar → fallback huruf inisial "A" otomatis muncul jika `avatar.jpg` tidak ada.
- Sound easter egg → akan diam saja (silent fail) jika file belum di-upload.
- Favicon → browser akan menampilkan ikon default jika belum diisi.

Silakan ganti / tambahkan asset asli kamu di folder terkait sesuai nama file
yang sudah dirujuk di `index.html`.

---

## 🛠️ Tech Stack

- HTML5 semantic
- CSS3 murni (custom properties / variables, Grid, Flexbox, backdrop-filter)
- JavaScript ES6+ murni (modular, tanpa framework)
- Google Fonts: Chakra Petch (display), Space Grotesk (body), JetBrains Mono (kode/terminal)

Tidak ada dependency eksternal selain Google Fonts (opsional, bisa di-self-host
ke folder `assets/fonts/` bila ingin fully offline).

---

## 📌 Status Project

Website ini sendiri masuk dalam daftar "Quest Log" project Ardi dengan status
**Learning** — akan terus di-iterasi seiring Ardi belajar lebih banyak
JavaScript, animasi, dan best practice frontend.

---

## 📝 Changelog

### v2.0 — Phase 2: Gamifikasi
Lanjutan dari Phase 1 (Visual Foundation), fase ini menambahkan "jiwa
game" yang sebenarnya ke portfolio — pengunjung sekarang punya progress
sendiri yang persist antar kunjungan.

- **EXP & Level System** — setiap aksi penting (buka section, main
  game, pakai terminal, dll) memberi EXP. Level naik tiap 100 EXP.
  Ditampilkan di HUD kecil pada navbar (`LV.x` + bar), dan level bar di
  section About sekarang **dinamis** mengikuti progress asli (dulu
  angkanya statis/hardcoded — sekarang selalu sinkron dengan HUD).
- **Achievement & Quest System (gabungan)** — 15 achievement berbeda,
  masing-masing unlock otomatis saat aksi terkait dilakukan (membuka
  section, menjalankan command terminal, membuka command palette, main
  Debug Smasher, menyalakan musik, menemukan easter egg, dst). Quest
  "Full Explorer" otomatis terbuka kalau semua section sudah dikunjungi.
- **Achievement Popup** — notifikasi ala game muncul di pojok kanan atas
  setiap achievement baru terbuka, lengkap dengan ikon & jumlah EXP.
- **Achievement Panel** — drawer yang bisa dibuka lewat HUD di navbar
  atau command palette (`Ctrl+K` → "Buka Achievements"), menampilkan
  semua 15 quest: yang belum terbuka ditampilkan sebagai `???` (misteri),
  yang sudah terbuka menampilkan judul, deskripsi, dan EXP-nya.
  Progress (mis. "3 / 15") tersimpan otomatis di localStorage.
- **Fake Save Progress** — indikator kecil "💾 Progress Saved" muncul
  sebentar di bawah layar setiap kali progress baru tersimpan.
- **Mini Radar** — widget titik-titik kecil di sisi kanan layar (desktop
  only) menunjukkan section mana yang sedang aktif, dan bisa diklik
  untuk lompat cepat ke section tersebut. Disembunyikan di mobile/tablet
  karena kurang relevan di touch device & berpotensi menutupi konten.

### v2.0 — Phase 1: Visual Foundation
Awal dari Portfolio V2, fokus ke fondasi visual sebelum lanjut ke fase
gamifikasi, showcase, dan secret mode di fase berikutnya.

- **Boot Sequence V2** — loading screen dirombak total jadi simulasi
  "booting OS": baris log terminal muncul satu-satu (typewriter), status
  check (`[OK]` / `[WARN]` / `[....]` / `[DONE]`), progress bar yang
  nyambung ke jumlah baris selesai, dan glitch effect acak di logo
  selama proses boot.
- **Interactive Hero V2** — menambahkan 5 floating icon (🎮💻⌨️🧠🚀) dengan
  parallax depth berbasis posisi mouse. Pakai teknik *lerp* (linear
  interpolation) di dalam `requestAnimationFrame` supaya gerakan terasa
  halus & "mengejar" mouse secara premium, bukan langsung snap.
- **Aurora Background** — layer gradient blur lembut yang bergerak pelan
  di belakang particle canvas, menambah kedalaman visual tanpa
  mengganggu keterbacaan teks.
- **Particle Background V2** — partikel sekarang saling terhubung garis
  tipis kalau berdekatan (efek "network/code graph"), dan bereaksi lebih
  kuat ke posisi mouse (repulsion/menjauh, bukan tarikan halus seperti
  sebelumnya).
- **Scroll Animation Premium** — tiap section sekarang punya arah reveal
  yang berbeda (`data-reveal`): About slide kiri/kanan (converging),
  Journey tilt masuk, Skills & Stats scale pop-in dengan stagger delay,
  Projects flip 3D. Tidak monoton fade-up semua seperti sebelumnya.
- **Fix kecil:** reposisi floating icon di breakpoint mobile/tablet
  (≤768px) supaya tidak menabrak teks hero, karena posisi yang pas di
  desktop ternyata overlap saat layout teks jadi lebih tinggi di layar
  kecil.

### v1.5 — 2 Fitur Baru: Mini Game & Background Music
- **Fitur baru: Mini Game "Debug Smasher"** — game klik-klik sederhana
  bertema debugging. Klik 🐛 bug biasa (+10 poin) atau 🪲 bug langka
  (+30 poin) sebelum hilang, dan hindari klik ✅ clean code (-15 poin).
  Round berlangsung 30 detik, makin lama target makin cepat muncul.
  High score tersimpan otomatis di browser (localStorage) tanpa backend.
- **Fitur baru: Background Music Toggle** — tombol speaker di navbar
  untuk play/pause musik ambient (`assets/sounds/bgm.mp3`, belum
  disertakan — placeholder). Musik tidak auto-play (browser modern
  memblokir autoplay bersuara), jadi hanya mulai saat tombol diklik.
  Ada toast peringatan otomatis kalau file musik belum diisi.
- Section baru "Mini Game" ditambahkan di antara Terminal dan Contact,
  termasuk di navbar dan command palette (`Ctrl+K` → "Buka Mini Game" /
  "Toggle Musik").

### v1.3 — Polish & Bug Fixes
- **Fix:** overlay command palette (`#commandPalette`) sebelumnya tetap
  menutupi seluruh halaman dan blocking semua klik walau sudah berstatus
  `hidden`, karena konflik specificity CSS. Sekarang sudah benar-benar
  tersembunyi saat ditutup.
- **Fix:** efek ripple sebelumnya memasang `overflow: hidden` permanen di
  setiap card, yang tanpa sengaja ikut memotong efek glow (`box-shadow`)
  saat card di-hover. Sekarang `overflow: hidden` hanya aktif sementara,
  selama animasi ripple berjalan saja.
- **Fix:** highlight nav link aktif (saat scroll ke section tertentu)
  sebelumnya tidak punya gaya visual sama sekali walau class-nya sudah
  di-toggle lewat JavaScript. Sekarang sudah berwarna cyan + underline.
- **Polish:** titik "..." pada loading screen sebelumnya statis, sekarang
  dianimasikan berjalan agar terasa lebih hidup.
- **Polish:** baris di fake terminal sekarang punya warna berbeda —
  hijau untuk command yang diketik, pink untuk error — supaya lebih
  mudah dibaca dibanding sebelumnya yang satu warna semua.
- **A11y:** ditambahkan `:focus-visible` global dengan outline cyan,
  supaya pengguna yang navigasi dengan keyboard (Tab) tetap bisa melihat
  elemen mana yang sedang fokus — sebelumnya custom cursor & reset CSS
  membuat indikator fokus benar-benar hilang.
- **Polish:** transisi opacity pada custom cursor saat mouse keluar/masuk
  jendela browser, supaya tidak terasa "patah" / snap tiba-tiba.

### v1.0
- Rilis awal: struktur folder lengkap, semua fitur inti (loader, cursor,
  particle, typing, scroll reveal, counter, fake terminal, command palette,
  easter egg, toast, dsb).
- Termasuk hotfix overlay command palette yang sempat blocking semua klik
  di halaman (ditemukan & langsung diperbaiki sebelum rilis v1.3 ini).
