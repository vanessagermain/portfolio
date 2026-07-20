// Liseberg case study — light interactions only
(function () {
  // embed mode when opened inside the homepage SPA overlay
  if (/[?&]embed=1/.test(location.search) || window.self !== window.top) {
    document.body.classList.add('embed');
  }
  var header = document.getElementById('site-header');
  var onScroll = function () {
    if (window.scrollY > 12) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reading progress
  var bar = document.getElementById('progress-bar');
  if (bar) {
    var onProg = function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', onProg, { passive: true });
    onProg();
  }

  // In overlay mode, links back to the portfolio close the overlay instead of navigating the iframe
  if (document.body.classList.contains('embed')) {
    document.querySelectorAll('a[href^="index.html"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        try { window.parent.postMessage({ cs: 'close' }, '*'); } catch (err) {}
      });
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
