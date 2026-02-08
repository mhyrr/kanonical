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
// Narrative Scroll
// =====================
(function() {
  var track = document.getElementById('narrative-track');
  if (!track) return;

  var TOTAL_STEPS = 13;
  // Steps 3+4 both highlight text index 3 (cigars) with different photos
  var STEP_TO_TEXT = [0, 1, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  var list = document.getElementById('narrative-list');
  var textCol = track.querySelector('.narrative-text-col');
  var items = list.querySelectorAll('.narrative-item');
  var photos = track.querySelectorAll('.narrative-photo');

  var currentStep = -1;
  var ticking = false;

  function update() {
    var rect = track.getBoundingClientRect();
    var scrolled = Math.max(0, -rect.top);
    var maxScroll = track.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    var progress = Math.min(1, scrolled / maxScroll);
    var step = Math.min(TOTAL_STEPS - 1, Math.round(progress * (TOTAL_STEPS - 1)));

    if (step === currentStep) return;
    currentStep = step;

    var textIndex = STEP_TO_TEXT[step];

    // Update text opacity
    for (var i = 0; i < items.length; i++) {
      var dist = Math.abs(i - textIndex);
      if (dist === 0) {
        items[i].style.opacity = '1';
      } else if (dist === 1) {
        items[i].style.opacity = '0.25';
      } else if (dist === 2) {
        items[i].style.opacity = '0.12';
      } else {
        items[i].style.opacity = '0.06';
      }
    }

    // Align active text item with photo center
    var activeItem = items[textIndex];
    var photoFrame = track.querySelector('.narrative-photo-frame');
    var stageRect = track.querySelector('.narrative-stage');
    var photoTop = photoFrame.offsetTop;
    var photoCenter = photoTop + photoFrame.offsetHeight / 2;
    var listTop = textCol.offsetTop;
    var itemCenter = activeItem.offsetTop + activeItem.offsetHeight / 2;
    var offset = (photoCenter - listTop) - itemCenter;
    list.style.transform = 'translateY(' + offset + 'px)';

    // Update photos
    for (var j = 0; j < photos.length; j++) {
      if (j === step) {
        photos[j].classList.add('active');
      } else {
        photos[j].classList.remove('active');
      }
    }
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  update();
})();

// =====================
// Mobile Narrative Fade-in
// =====================
(function() {
  var mobileItems = document.querySelectorAll('.narrative-mobile-item');
  if (!mobileItems.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  mobileItems.forEach(function(item) {
    observer.observe(item);
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
