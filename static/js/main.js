// =====================
// Dark Mode
// =====================
(function() {
  const STORAGE_KEY = 'theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  function setTheme(theme) {
    document.documentElement.classList.toggle(DARK, theme === DARK);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Set on load (backup for inline script)
  setTheme(getPreferred());

  // Global toggle function
  window.toggleTheme = function() {
    const isDark = document.documentElement.classList.contains(DARK);
    setTheme(isDark ? LIGHT : DARK);
  };

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? DARK : LIGHT);
    }
  });
})();

// =====================
// Reading Progress
// =====================
(function() {
  const progress = document.getElementById('reading-progress');
  if (!progress) return;

  function updateProgress() {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrolled / height) * 100 : 0;
    progress.style.width = percent + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

// =====================
// Header Shadow on Scroll
// =====================
(function() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.classList.toggle('shadow-lg', window.scrollY > 10);
  }, { passive: true });
})();

// =====================
// Mobile Menu Toggle
// =====================
(function() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
})();

// =====================
// Page Transitions
// =====================
(function() {
  const main = document.querySelector('main');
  if (!main) return;

  // Fade in on load
  main.style.opacity = '0';
  main.style.transition = 'opacity 0.2s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.style.opacity = '1';
    });
  });

  // Handle back/forward button (bfcache restoration)
  window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
      // Page was restored from bfcache, reset opacity
      main.style.opacity = '1';
    }
  });

  // Fade out on navigate (internal links only)
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;
    if (link.host !== window.location.host) return;
    if (link.hasAttribute('target')) return;

    e.preventDefault();
    main.style.opacity = '0';
    setTimeout(() => {
      window.location = link.href;
    }, 200);
  });
})();
