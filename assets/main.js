document.addEventListener('DOMContentLoaded', () => {

  // ===== HEADER SCROLL =====
  const header = document.getElementById('header');
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 20);
    if (backTop) backTop.classList.toggle('visible', window.scrollY > 300);
  });

  // ===== ACTIVE NAV 底線指示器 =====
  const currentPath = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href !== '/' && currentPath.includes(href.replace(/\/wdesign-site/, ''))) {
      a.classList.add('active-page');
    } else if (href === '/' && (currentPath === '/' || currentPath.endsWith('/wdesign-site/'))) {
      a.classList.add('active-page');
    }
  });

  // ===== HAMBURGER =====
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('mainNav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }


  // ===== 圓圈貼齊分隔線置中 =====
  const heroIcons = document.querySelectorAll('.icon-deco-hero');
  heroIcons.forEach(icon => {
    const header = icon.closest('.page-hero-header');
    if (header) {
      const rect = header.getBoundingClientRect();
      icon.style.position = 'absolute';
      icon.style.bottom = '-18px';
      icon.style.left = '50%';
      icon.style.transform = 'translateX(-50%)';
      icon.style.zIndex = '20';
    }
  });

  // ===== HERO SLIDESHOW =====
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  if (slides.length) {
    let current = 0;
    const goTo = (idx) => {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = idx;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    };
    dots.forEach(dot => {
      dot.addEventListener('click', () => goTo(+dot.dataset.idx));
    });
    setInterval(() => goTo((current + 1) % slides.length), 5000);
  }

  // ===== SERVICE TABS =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.service-slide').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      const tab = document.getElementById('tab-' + btn.dataset.tab);
      if (tab) tab.classList.add('active');
    });
  });

  // ===== BACK TO TOP =====
  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ===== CONTACT FORM =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      btn.textContent = '送出中...';
      btn.disabled = true;
      try {
        await fetch('/', { method: 'POST', body: new FormData(form) });
        const success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
        form.reset();
      } catch {
        alert('送出失敗，請直接來電或來信聯繫我們。');
      }
      btn.textContent = '送　出';
      btn.disabled = false;
    });
  }
});
