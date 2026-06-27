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
