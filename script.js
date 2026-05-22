/**
 * Sami Fariz Portfolio — minimal, performance-focused interactions
 */

(function () {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.site-nav__toggle');
  const navList = document.querySelector('.site-nav__list');
  const navLinks = document.querySelectorAll('[data-nav]');
  const sections = document.querySelectorAll('section[id]');
  const reveals = document.querySelectorAll('.reveal');
  const yearEl = document.getElementById('year');
  const contactForm = document.getElementById('contact-form');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header state */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile navigation */
  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navList.classList.toggle('is-open', !open);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
      });
    });
  }

  /* Smooth in-page navigation */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const offset = (header?.offsetHeight ?? 72) + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      history.pushState(null, '', id);
    });
  });

  /* Active nav link */
  function updateActiveNav() {
    if (!navLinks.length) return;

    const offset = (header?.offsetHeight ?? 72) + 120;
    let current = '';

    sections.forEach((section) => {
      const top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        current = section.getAttribute('id') || '';
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href')?.slice(1);
      link.classList.toggle('is-active', href === current);
    });
  }

  /* Scroll reveal */
  if (reveals.length && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* Hero visible on load */
  document.querySelectorAll('.hero .reveal').forEach((el) => {
    requestAnimationFrame(() => el.classList.add('is-visible'));
  });

  /* Contact form acknowledgment */
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.dataset.defaultText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }

      setTimeout(() => {
        alert('Thank you for reaching out. I will get back to you soon.');
        if (btn) {
          btn.textContent = btn.dataset.defaultText || 'Send message';
          btn.disabled = false;
        }
      }, 400);
    });
  }
})();
