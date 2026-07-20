// Liseberg story-first — header state, progress bar, section rail scrollspy, reveal
(function () {
  var header = document.getElementById('site-header');
  var bar = document.getElementById('progress-bar');
  var railLinks = Array.prototype.slice.call(document.querySelectorAll('#rail a'));
  var sections = railLinks.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('scrolled', y > 12);

    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

    // scrollspy: last section whose top passed the 40% line
    var mark = window.innerHeight * 0.4, active = 0;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].getBoundingClientRect().top <= mark) active = i;
    }
    railLinks.forEach(function (a, i) { a.classList.toggle('active', i === active); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // reveal
  var items = document.querySelectorAll('.chapter, .hero-shot');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
