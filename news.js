// Edit news-data.js for content. All supplied text is rendered without HTML.
// Updates render as a horizontal timeline, newest first: the three most recent
// fill the visible track, older ones scroll in from the right. Selecting a card
// shows its full details (papers, references, links) below the track.
(() => {
  const container = document.getElementById('news-content');
  if (!container) return;
  const hasText = value => typeof value === 'string' && value.trim().length > 0;

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?$/.test(value)) return false;
    const fullDate = value.length === 7 ? `${value}-01` : value;
    const parsed = new Date(`${fullDate}T00:00:00Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === fullDate;
  }

  function makeLink(urlValue, label) {
    if (!hasText(urlValue) || !hasText(label)) return null;
    try {
      const url = new URL(urlValue);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
      const link = document.createElement('a');
      link.href = url.href;
      link.textContent = label.trim();
      return link;
    } catch { return null; }
  }

  function el(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function paragraph(text, className, inlineLinks = []) {
    const element = el('p', className, text.trim());
    for (const reference of Array.isArray(inlineLinks) ? inlineLinks : []) {
      if (!reference || !hasText(reference.text)) continue;
      const link = makeLink(reference.url, reference.text);
      if (!link) continue;
      for (const node of Array.from(element.childNodes)) {
        if (node.nodeType !== Node.TEXT_NODE) continue;
        const position = node.textContent.indexOf(reference.text);
        if (position < 0) continue;
        node.replaceWith(node.textContent.slice(0, position), link,
          node.textContent.slice(position + reference.text.length));
        break;
      }
    }
    return element;
  }

  function appendResources(parent, resources, label) {
    if (!Array.isArray(resources)) return;
    const list = el('ul', 'news-resources');
    list.setAttribute('aria-label', label);
    for (const resource of resources) {
      if (!resource) continue;
      const link = makeLink(resource.url, resource.label);
      if (!link) continue;
      const item = el('li');
      item.append(link);
      list.append(item);
    }
    if (list.childElementCount) parent.append(list);
  }

  // Full details for one update, shown in the panel under the timeline.
  function renderDetail(item) {
    const content = el('div', 'news-body');
    const header = el('div', 'news-header');
    const heading = el('div', 'news-heading');
    const date = el('time', 'news-date', item.date);
    date.dateTime = item.date;
    heading.append(date, el('h3', '', hasText(item.title) ? item.title.trim() : 'Update'));
    header.append(heading);
    const conference = makeLink(item.conferenceUrl, 'Conference program');
    if (conference) header.append(conference);
    content.append(header, paragraph(item.text, 'news-summary', item.inlineLinks));

    for (const paper of Array.isArray(item.papers) ? item.papers : []) {
      if (!paper || !hasText(paper.title)) continue;
      const article = el('article', 'news-paper');
      article.append(el('h4', 'news-paper-title', paper.title.trim()));
      if (hasText(paper.text)) article.append(paragraph(paper.text, 'news-paper-detail', paper.inlineLinks));
      if (hasText(paper.reference)) article.append(paragraph(paper.reference, 'news-paper-reference'));
      if (hasText(paper.doi) && /^10\.\d{4,9}\/\S+$/.test(paper.doi)) {
        const link = makeLink(`https://doi.org/${paper.doi}`, paper.doi);
        if (link) {
          const doi = el('p', 'news-doi');
          doi.append('DOI: ', link);
          article.append(doi);
        }
      }
      appendResources(article, paper.resources, `Resources for ${paper.title}`);
      content.append(article);
    }

    // Keep the original one-link format working for simple announcements.
    const resources = Array.isArray(item.resources) ? [...item.resources] : [];
    if (hasText(item.url)) resources.push({ url: item.url, label: hasText(item.linkText) ? item.linkText : 'Details' });
    appendResources(content, resources, `Resources for ${item.title || item.date}`);
    return content;
  }

  const source = Array.isArray(window.PROFILE_NEWS) ? window.PROFILE_NEWS : [];
  const entries = source.filter(item => item && validDate(item.date) && hasText(item.text))
    .map((item, order) => ({ item, order }))
    .sort((a, b) => b.item.date.localeCompare(a.item.date) || a.order - b.order)
    .map(({ item }) => item);
  if (!entries.length) return;

  const root = el('div', 'timeline');
  const bar = el('div', 'timeline-bar');
  const status = el('p', 'timeline-status');
  status.setAttribute('aria-live', 'polite');
  const nav = el('div', 'timeline-nav');
  const newer = el('button', 'timeline-arrow', '‹');
  newer.type = 'button';
  newer.setAttribute('aria-label', 'Show newer updates');
  const older = el('button', 'timeline-arrow', '›');
  older.type = 'button';
  older.setAttribute('aria-label', 'Show older updates');
  nav.append(newer, older);
  bar.append(status, nav);

  const track = el('ol', 'timeline-track');
  track.tabIndex = 0;
  track.setAttribute('aria-label', 'Updates timeline, newest first. Scroll sideways for earlier updates.');
  const detail = el('div', 'timeline-detail');
  detail.id = 'news-detail';
  detail.setAttribute('aria-live', 'polite');

  const cards = entries.map((item, index) => {
    const li = el('li', 'timeline-item');
    const card = el('button', 'timeline-card');
    card.type = 'button';
    card.setAttribute('aria-controls', detail.id);
    const time = el('time', 'timeline-date', item.date);
    time.dateTime = item.date;
    const papers = (Array.isArray(item.papers) ? item.papers : []).filter(p => p && hasText(p.title));
    const excerpt = papers.length ? papers.map(p => p.title.trim()).join(' · ') : item.text.trim();
    card.append(el('span', 'timeline-dot'), time,
      el('span', 'timeline-title', hasText(item.title) ? item.title.trim() : 'Update'),
      el('span', 'timeline-excerpt', excerpt),
      el('span', 'timeline-more', papers.length > 1 ? `${papers.length} papers · Details` : 'Details'));
    card.addEventListener('click', () => select(index, true));
    li.append(card);
    track.append(li);
    return card;
  });

  function select(index, fromUser) {
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-expanded', String(active));
    });
    detail.replaceChildren(renderDetail(entries[index]));
    if (fromUser) cards[index].parentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }

  function step() {
    const items = track.children;
    if (items.length < 2) return track.clientWidth;
    return items[1].offsetLeft - items[0].offsetLeft;
  }

  function update() {
    const max = track.scrollWidth - track.clientWidth;
    newer.disabled = track.scrollLeft <= 2;
    older.disabled = track.scrollLeft >= max - 2;
    const width = step() || 1;
    const first = Math.min(entries.length, Math.round(track.scrollLeft / width) + 1);
    const visible = Math.max(1, Math.round(track.clientWidth / width));
    const last = Math.min(entries.length, first + visible - 1);
    status.textContent = first === 1
      ? `Latest ${last} of ${entries.length}${last < entries.length ? ' · scroll for earlier updates' : ''}`
      : `${first}–${last} of ${entries.length}`;
  }

  newer.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  older.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', update);

  root.append(bar, track, detail);
  container.replaceChildren(root);
  select(0, false);
  update();
})();
