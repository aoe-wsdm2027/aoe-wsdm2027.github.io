(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (header) {
    const syncHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  const sectionRail = document.querySelector('.section-rail');
  if (sectionRail) {
    const railLinks = Array.from(sectionRail.querySelectorAll('[data-section-link]'));
    const sections = railLinks
      .map(function (link) { return document.getElementById(link.dataset.sectionLink); })
      .filter(Boolean);
    let railTicking = false;

    const syncSectionRail = function () {
      const marker = window.scrollY + Math.min(window.innerHeight * 0.38, 320);
      let activeId = sections[0] ? sections[0].id : '';
      sections.forEach(function (section) {
        if (section.offsetTop <= marker) activeId = section.id;
      });
      const pageBottom = window.scrollY + window.innerHeight;
      const documentBottom = document.documentElement.scrollHeight;
      if (sections.length && pageBottom >= documentBottom - 32) {
        activeId = sections[sections.length - 1].id;
      }
      railLinks.forEach(function (link) {
        const active = link.dataset.sectionLink === activeId;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      railTicking = false;
    };

    syncSectionRail();
    window.addEventListener('scroll', function () {
      if (railTicking) return;
      railTicking = true;
      window.requestAnimationFrame(syncSectionRail);
    }, { passive: true });
    window.addEventListener('resize', syncSectionRail);
  }

  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    });
  });
})();
