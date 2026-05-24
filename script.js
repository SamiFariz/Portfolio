/**
 * Sami Fariz Portfolio — recruiter-focused interactions
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
  const skillCards = document.querySelectorAll('[data-skill-card]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* Sticky header */
  const onScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    }
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
      document.body.style.overflow = !open ? 'hidden' : '';
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('is-open');
        document.body.style.overflow = '';
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
      const offset = (header?.offsetHeight ?? 76) + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      history.pushState(null, '', id);
    });
  });

  function updateActiveNav() {
    if (!navLinks.length) return;

    const offset = (header?.offsetHeight ?? 76) + 140;
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
  if (reveals.length) {
    if (prefersReducedMotion) {
      reveals.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
      );

      reveals.forEach((el) => revealObserver.observe(el));
    }
  }

  /* Hero visible on load */
  document.querySelectorAll('.hero .reveal').forEach((el) => {
    requestAnimationFrame(() => el.classList.add('is-visible'));
  });

  /* Subtle skill card tilt */
  if (skillCards.length && !prefersReducedMotion) {
    skillCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(600px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* Contact form */
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.dataset.defaultText = btn.textContent;
        btn.textContent = 'Sending…';
        btn.disabled = true;
      }

      setTimeout(() => {
        if (btn) {
          btn.textContent = btn.dataset.defaultText || 'Send message';
          btn.disabled = false;
        }
      }, 400);
    });
  }
})();
