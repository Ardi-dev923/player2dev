/* ==========================================================================
   ANIMATIONS.JS — Scroll Reveal, Parallax, Intersection Observer,
                   Card Tilt, Ripple Effect, Scroll Progress, Sticky Navbar
   ========================================================================== */

(function () {
  'use strict';

  /* ---------- SCROLL REVEAL (Intersection Observer) ---------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* ---------- STICKY NAVBAR (shrink + background on scroll) ---------- */
  function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('is-scrolled');
      } else {
        navbar.classList.remove('is-scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- SCROLL PROGRESS BAR ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    function update() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = percent + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------- BACK TO TOP BUTTON ---------- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    function toggleVisibility() {
      if (window.scrollY > 480) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    toggleVisibility();
  }

  /* ---------- PARALLAX (Interactive Hero V2) ----------
     Memakai lerp (linear interpolation) di dalam requestAnimationFrame
     supaya gerakan terasa "mengejar" mouse secara halus (premium feel),
     dibanding versi lama yang langsung snap ke posisi mouse setiap event.
     Memakai CSS property `translate` (bukan `transform`) agar tidak
     konflik dengan animasi idle (float / iconBob) yang sudah memakai
     `transform` di file animations.css. */
  function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    if (!layers.length) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return; // parallax mouse tidak relevan di touch device

    let mouseX = 0;
    let mouseY = 0;
    const current = new Map();
    layers.forEach((el) => current.set(el, { x: 0, y: 0 }));

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // range -1..1
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function loop() {
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.depth) || 10;
        const targetX = mouseX * depth;
        const targetY = mouseY * depth;
        const state = current.get(el);

        // Lerp 0.07 -> gerakan halus dengan sedikit "lag" elegan
        state.x += (targetX - state.x) * 0.07;
        state.y += (targetY - state.y) * 0.07;

        el.style.translate = `${state.x}px ${state.y}px`;
      });
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ---------- CARD TILT (3D mouse tilt effect on .tilt elements) ---------- */
  function initCardTilt() {
    const tiltEls = document.querySelectorAll('.tilt');
    if (!tiltEls.length) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return; // Tilt mengandalkan mouse precision, skip di touch

    tiltEls.forEach((el) => {
      let frame;

      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
      });

      el.addEventListener('mouseleave', () => {
        if (frame) cancelAnimationFrame(frame);
        el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  /* ---------- RIPPLE EFFECT (on buttons & cards) ---------- */
  function initRippleEffect() {
    const rippleTargets = document.querySelectorAll('.btn, .skill-card, .project-card, .contact-link');

    rippleTargets.forEach((el) => {
      el.style.position = el.style.position || 'relative';

      el.addEventListener('click', (e) => {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);

        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';

        // overflow:hidden hanya diaktifkan SELAMA animasi ripple berjalan.
        // Jika dipasang permanen, box-shadow glow saat hover (lihat
        // components.css) akan ikut terpotong karena box-shadow dirender
        // di luar batas kotak elemen induknya.
        const previousOverflow = el.style.overflow;
        el.style.overflow = 'hidden';

        el.appendChild(ripple);
        ripple.addEventListener('animationend', () => {
          ripple.remove();
          el.style.overflow = previousOverflow;
        });
      });
    });
  }

  /* ---------- ANIMATE ABOUT LEVEL BAR (triggered on reveal) ---------- */
  function initLevelBar() {
    const levelFill = document.querySelector('.about__level-fill');
    if (!levelFill) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.getAttribute('data-fill') || 0;
            entry.target.style.width = fill + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(levelFill);
  }

  /* ---------- ANIMATE SKILL BARS (triggered on reveal) ---------- */
  function initSkillBars() {
    const fills = document.querySelectorAll('.skill-card__fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const fill = entry.target.getAttribute('data-fill') || 0;
            entry.target.style.width = fill + '%';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    fills.forEach((el) => observer.observe(el));
  }

  /* ---------- MOBILE NAVBAR TOGGLE ---------- */
  function initMobileNav() {
    const burger = document.getElementById('burgerBtn');
    const links = document.getElementById('navLinks');
    if (!burger || !links) return;

    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      burger.classList.toggle('is-active', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
    });

    // Tutup menu saat link diklik (mobile)
    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.classList.remove('is-open');
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- INIT ALL ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initStickyNavbar();
    initScrollProgress();
    initBackToTop();
    initParallax();
    initCardTilt();
    initRippleEffect();
    initLevelBar();
    initSkillBars();
    initMobileNav();
  });
})();
