'use strict';
// Navigation: keyboard accessible, closes on selection, Escape and outside click.
const menu = document.querySelector('.menu');
const nav = document.querySelector('#navigation');
function closeMenu() {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
}
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
matchMedia('(min-width:701px)').addEventListener('change', closeMenu);

// Respect reduced motion. All content is visible without JavaScript.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('pending');
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(element => {
    if (element.getBoundingClientRect().top > innerHeight) element.classList.add('pending');
    observer.observe(element);
  });
}
// Pilot pages share the confirmed project description, without invented local findings.
const pilots = {
  belfast: { city: 'Belfast', country: 'NORTHERN IRELAND', others: 'Kyiv and La Palma' },
  kyiv: { city: 'Kyiv', country: 'UKRAINE', others: 'Belfast and La Palma' },
  'la-palma': { city: 'La Palma', country: 'CANARY ISLANDS, SPAIN', others: 'Belfast and Kyiv' }
};
if (document.querySelector('[data-city]')) {
  const requested = new URLSearchParams(location.search).get('site');
  const key = Object.hasOwn(pilots, requested) ? requested : 'kyiv';
  const pilot = pilots[key];
  document.querySelectorAll('[data-city]').forEach(element => { element.textContent = pilot.city; });
  document.querySelector('[data-country]').textContent = pilot.country;
  document.querySelector('#local-lead').textContent = `${pilot.city} joins ${pilot.others} in a shared exploration of how human experience can inform urban reconstruction.`;
  document.querySelector(`[data-pilot="${key}"]`).setAttribute('aria-current', 'page');
  document.title = `${pilot.city} · Pilot place — NEURO-REBUILD`;
}
// Search and filter the planned output categories. Download controls stay disabled.
const rows = [...document.querySelectorAll('[data-resource]')];
if (rows.length) {
  let category = 'all';
  const search = document.querySelector('#resource-search');
  const tabs = [...document.querySelectorAll('.filter-tab')];
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function filter() {
    let count = 0;
    rows.forEach(row => {
      const visible = (category === 'all' || row.dataset.category === category)
        && normalize(row.textContent).includes(normalize(search.value.trim()));
      row.hidden = !visible;
      if (visible) count++;
    });
    document.querySelector('#result-count').textContent = `${count} planned output${count === 1 ? '' : 's'}`;
    document.querySelector('#empty-results').hidden = count !== 0;
    tabs.forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.category === category)));
  }
  tabs.forEach(tab => tab.addEventListener('click', () => { category = tab.dataset.category; filter(); }));
  search.addEventListener('input', filter);
  document.querySelector('#reset-filters').addEventListener('click', () => {
    category = 'all'; search.value = ''; filter(); search.focus();
  });
}
