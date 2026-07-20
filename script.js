// header shrink on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// rotating realm word
const realms = ['DIGITAL', 'EXPERIENTIAL', 'PRODUCT'];
let realmIdx = 0;
const realmEl = document.getElementById('realm-word');
setInterval(() => {
  realmEl.classList.add('fade-out');
  setTimeout(() => {
    realmIdx = (realmIdx + 1) % realms.length;
    realmEl.textContent = realms[realmIdx];
    realmEl.classList.remove('fade-out');
  }, 280);
}, 2600);

// hero parallax
const hero = document.getElementById('hero');
let plxRaf = null;
hero.addEventListener('mousemove', (e) => {
  const r = hero.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5;
  const ny = (e.clientY - r.top) / r.height - 0.5;
  if (plxRaf) return;
  plxRaf = requestAnimationFrame(() => {
    plxRaf = null;
    hero.querySelectorAll('[data-plx]').forEach(el => {
      const d = parseFloat(el.dataset.plx) * 400;
      el.style.transform = `translate3d(${(-nx * d).toFixed(1)}px,${(-ny * d).toFixed(1)}px,0)`;
    });
  });
});
hero.addEventListener('mouseleave', () => {
  hero.querySelectorAll('[data-plx]').forEach(el => {
    el.style.transition = 'transform .6s cubic-bezier(.2,.7,.2,1)';
    el.style.transform = 'translate3d(0,0,0)';
    setTimeout(() => { el.style.transition = ''; }, 650);
  });
});

// magnetic buttons
document.querySelectorAll('.magnet').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const b = btn.getBoundingClientRect();
    const x = (e.clientX - b.left - b.width / 2) * 0.18;
    const y = (e.clientY - b.top - b.height / 2) * 0.3;
    btn.style.transform = `translate(${x}px,${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// ===== SPA case-study overlay =====
(function () {
  const overlay = document.getElementById('cs-overlay');
  const frame = document.getElementById('cs-frame');
  const closeBtn = document.getElementById('cs-close');
  if (!overlay || !frame) return;

  let scrollY = 0;
  let loadedSrc = null;

  function open(src) {
    scrollY = window.scrollY || window.pageYOffset;
    if (loadedSrc !== src) {
      overlay.classList.remove('loaded');
      frame.src = src + (src.indexOf('?') > -1 ? '&' : '?') + 'embed=1';
      loadedSrc = src;
    } else {
      overlay.classList.add('loaded');
    }
    document.body.style.top = -scrollY + 'px';
    document.body.classList.add('cs-open');
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    if (location.hash !== '#case') history.pushState({ cs: true }, '', '#case');
  }

  function close() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('cs-open');
    document.body.style.top = '';
    window.scrollTo(0, scrollY);
    if (location.hash === '#case') history.replaceState(null, '', location.pathname + location.search);
  }

  frame.addEventListener('load', function () {
    if (frame.src) overlay.classList.add('loaded');
  });

  document.querySelectorAll('[data-cs]').forEach(function (card) {
    card.addEventListener('click', function (e) {
      e.preventDefault();
      open(card.getAttribute('data-cs'));
    });
  });

  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
  });
  window.addEventListener('popstate', function () {
    if (overlay.classList.contains('open')) close();
  });
  // case study asks to return to the portfolio
  window.addEventListener('message', function (e) {
    if (e.data && e.data.cs === 'close' && overlay.classList.contains('open')) close();
  });
})();
