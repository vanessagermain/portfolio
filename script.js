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
