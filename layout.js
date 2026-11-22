(async function () {
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');

  async function loadComponent(url, targetEl) {
    if (!targetEl) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to load ' + url);
      targetEl.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
    }
  }

  await Promise.all([
    loadComponent('components/header.html', headerMount),
    loadComponent('components/footer.html', footerMount)
  ]);

  // تحديد الصفحة الحالية لتفعيل اللينك النشط
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#navMenu a').forEach(link => {
    const targetPage = link.getAttribute('data-page');
    if (targetPage === currentPath) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // تشغيل قائمة الموبايل بعد حقن الهيدر
  const navMenu = document.getElementById('navMenu');
  const menuBtn = document.getElementById('menuBtn');

  if (navMenu && menuBtn) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }
})();
