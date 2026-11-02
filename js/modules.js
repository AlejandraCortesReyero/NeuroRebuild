'use strict';
(() => {
  const content = window.NEURO_CONTENT;
  if (!content) return;
  const currentPilot = new URLSearchParams(location.search).get('site') || 'kyiv';
  const pilotData = content.pilots[currentPilot] || content.pilots.kyiv;
  const safeURL = value => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value, location.href);
      return ['https:', 'http:'].includes(url.protocol) || (url.protocol === 'file:' && !/^[a-z]+:/i.test(value)) ? url.href : null;
    } catch { return null; }
  };
  // Fixed, non-draggable map. Native buttons provide Enter/Space and touch access.
  const markers = [...document.querySelectorAll('[data-map-pilot]')];
  function selectPilot(key) {
    const pilot = content.pilots[key];
    if (!pilot) return;
    markers.forEach(marker => marker.setAttribute('aria-pressed', String(marker.dataset.mapPilot === key)));
    document.querySelector('#map-city').textContent = pilot.name;
    document.querySelector('#map-country').textContent = pilot.country;
    document.querySelector('#map-description').textContent = pilot.description;
    const image = document.querySelector('#map-photo');
    image.src = pilot.image;
    image.alt = pilot.imageAlt;
    document.querySelector('#map-photo-caption').textContent = pilot.imageCaption;
    const link = document.querySelector('#map-pilot-link');
    link.href = `pilot.html?site=${encodeURIComponent(key)}`;
    link.replaceChildren(document.createTextNode(`Explore ${pilot.name} `));
    const arrow = document.createElement('span'); arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); link.append(arrow);
  }
  if (markers.length) {
    markers.forEach((marker, index) => {
      marker.addEventListener('click', () => selectPilot(marker.dataset.mapPilot));
      marker.addEventListener('keydown', event => {
        if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;
        event.preventDefault();
        const step = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
        const next = markers[(index + step + markers.length) % markers.length];
        next.focus(); selectPilot(next.dataset.mapPilot);
      });
    });
    selectPilot('belfast');
  }
  const context = document.querySelector('[data-local-context]');
  if (context) context.textContent = pilotData.context;
  const partnerList = document.querySelector('[data-partners]');
  if (partnerList) pilotData.partners.filter(partner => partner.approved).forEach(partner => {
    const paragraph = document.createElement('p');
    paragraph.textContent = `${partner.name} — ${partner.role}`;
    partnerList.append(paragraph);
  });

  // Confirmed public milestones only; current position derives from today's date.
  const timeline = document.querySelector('[data-timeline]');
  if (timeline) {
    const start = Date.parse(content.project.start + 'T00:00:00Z');
    const end = Date.parse(content.project.end + 'T23:59:59Z');
    function updateCurrentPosition() {
      const now = new Date();
      const ratio = Math.max(0, Math.min(1, (now.getTime() - start) / (end - start)));
      timeline.style.setProperty('--progress', `${ratio * 100}%`);
      const text = now < start ? 'Project starts' : now > end ? 'Project concluded' : 'Today · ' + new Intl.DateTimeFormat('en-GB', {
        month: 'short', year: 'numeric', timeZone: content.project.timeZone
      }).format(now);
      timeline.querySelector('[data-current-label]').textContent = text;
      timeline.querySelector('.timeline-current').classList.toggle('near-end', ratio > .8);
    }
    updateCurrentPosition();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) updateCurrentPosition(); });
  }
  // Shared publishing adapter. Empty content modules stay hidden.
  const publishable = item => item.approved === true && item.status === 'published' && item.id && item.title;
  const updates = [...content.news.map(item => ({...item, kind:'news'})), ...content.events.map(item => ({...item, kind:'event'}))]
    .filter(publishable).sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  const resources = content.resources.filter(publishable).map(item => ({...item, kind:'resource'}));
  const tagged = items => items.filter(item => (item.pilots || []).includes(currentPilot));
  const collections = { updates, resources, 'pilot-updates': tagged(updates), 'pilot-resources': tagged(resources) };
  function renderRecord(item) {
    const article = document.createElement('article'); article.className = 'published-record'; article.dataset.kind = item.kind;
    const imageURL = safeURL(item.image);
    if (imageURL) { const imageLink = document.createElement('a'); imageLink.href = 'blog-template.html'; imageLink.tabIndex = -1; imageLink.setAttribute('aria-hidden', 'true'); const image = document.createElement('img'); image.src = imageURL; image.alt = ''; image.loading = 'lazy'; imageLink.append(image); article.append(imageLink); }
    const meta = document.createElement('span'); meta.className = 'eyebrow'; meta.textContent = [item.kind, item.date, item.language].filter(Boolean).join(' / ');
    const heading = document.createElement('h3');
    const link = document.createElement('a'); link.href = 'blog-template.html'; link.textContent = item.title; heading.append(link);
    const description = document.createElement('p'); description.textContent = item.description || '';
    article.append(meta, heading, description);
    if (item.kind === 'event') {
      const event = document.createElement('p'); event.className = 'event-meta';
      event.textContent = [item.startDate, item.timeZone, item.location, item.eventStatus].filter(Boolean).join(' · '); article.append(event);
    }
    return article;
  }
  Object.entries(collections).forEach(([key, records]) => {
    document.querySelectorAll(`[data-content-section="${key}"]`).forEach(section => { section.hidden = records.length === 0; });
    document.querySelectorAll(`[data-content-list="${key}"]`).forEach(list => { list.replaceChildren(...records.map(renderRecord)); });
  });
  if (updates.length) document.querySelectorAll('[data-news-navigation]').forEach(placeholder => {
    const link = document.createElement('a'); link.href = 'news.html'; link.textContent = 'News & Events'; placeholder.replaceWith(link);
  });
})();
