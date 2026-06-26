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
