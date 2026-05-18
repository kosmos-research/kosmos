// Lightweight interactivity for the mockup

(function () {
  const navLinks = Array.from(document.querySelectorAll('.nav__link'));

  const normalizePath = (p) => {
    const path = (p || '').trim();
    if (!path) return '';
    return path.replace(/^[.\/]+/, '');
  };

  const getActiveHref = () => {
    // If current page is history.html/art.html -> highlight its menu item
    const currentPath = normalizePath(window.location.pathname);
    if (currentPath.endsWith('history.html')) return 'history.html';
    if (currentPath.endsWith('art.html')) return 'art.html';
    if (currentPath.endsWith('chronology.html')) return 'chronology.html';

    // Otherwise highlight main by hash
    return window.location.hash || '#main';
  };

  const setActive = (activeHref) => {
    navLinks.forEach((a) => {
      const href = (a.getAttribute('href') || '').trim();
      const active = href === activeHref;
      a.classList.toggle('is-active', active);
    });
  };

  // Initial
  setActive(getActiveHref());

  // On click: update active immediately
  navLinks.forEach((a) => {
    a.addEventListener('click', () => {
      const href = (a.getAttribute('href') || '').trim();
      if (href) setActive(href);
    });
  });

  // On hash change (only affects links with #...)
  window.addEventListener('hashchange', () => {
    setActive(getActiveHref());
  });

  // Mobile burger menu
  const burger = document.querySelector('.topbar__burger');
  const nav = document.querySelector('#site-nav');

  if (burger && nav) {
    const setOpen = (isOpen) => {
      nav.classList.toggle('is-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
    };

    // Initial (closed)
    setOpen(false);

    burger.addEventListener('click', () => {
      const isOpen = nav.classList.contains('is-open');
      setOpen(!isOpen);
    });

    // Close after click on a nav link
    nav.querySelectorAll('.nav__link').forEach((a) => {
      a.addEventListener('click', () => {
        setOpen(false);
      });
    });

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Small visual effect when user scrolls hero out of view
  const header = document.querySelector('.topbar');
  const hero = document.querySelector('.hero');
  if (header && hero) {
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        header.style.borderBottomColor = entry.isIntersecting
          ? 'rgba(255,211,107,.10)'
          : 'rgba(255,211,107,.22)';
      },
      { threshold: 0 }
    );
    io.observe(hero);
  }
})();

