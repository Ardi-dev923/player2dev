/* ==========================================================================
   COUNTER.JS — Animated Statistics Counter
   Menghitung angka dari 0 menuju nilai target ketika section masuk viewport.
   ========================================================================== */

(function () {
  'use strict';

  const counters = document.querySelectorAll('.stat-box__number');
  if (!counters.length) return;

  const DURATION = 1500; // ms

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
    const suffix = el.getAttribute('data-suffix') || '';
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      // Easing out-quad agar pergerakan angka tidak terasa kaku
      const eased = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(eased * target);

      el.textContent = currentValue + suffix;
      el.classList.add('is-counting');

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();
