// Edit news-data.js for content. All supplied text is rendered without HTML.
// Updates render as a compact overview strip (linear time: paper milestones and
// current experience bars) above a chronological card carousel, earlier on the
// left. The strip highlights the cards in view; click or drag it to navigate.
// Selecting a card or dot shows its full details below.
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
    if (item.accepted === true) heading.append(el('span', 'accepted-badge', 'Accepted'));
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
  const DAY = 86400000;
  const toTime = value => Date.parse(`${value.length === 7 ? `${value}-01` : value}T00:00:00Z`);
  const monthStart = t => { const d = new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1); };
  const addMonths = (t, n) => { const d = new Date(t); return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + n, 1); };
  const fmt = (t, opts) => new Date(t).toLocaleDateString('en-US', { timeZone: 'UTC', ...opts });

  const source = Array.isArray(window.PROFILE_NEWS) ? window.PROFILE_NEWS : [];
  // Chronological: earlier on the left, latest on the right.
  const entries = source.filter(item => item && validDate(item.date) && hasText(item.text))
    .map((item, order) => ({ item, order }))
    .sort((a, b) => a.item.date.localeCompare(b.item.date) || a.order - b.order)
    .map(({ item }) => item);
  if (!entries.length) return;
  const times = entries.map(item => toTime(item.date));

  const experiences = (Array.isArray(window.PROFILE_EXPERIENCE) ? window.PROFILE_EXPERIENCE : [])
    .filter(x => x && hasText(x.label) && validDate(x.start) && (x.end == null || validDate(x.end)));

  // Overview range: from the first update's month to the month after next.
  const t0 = monthStart(times[0]);
  const t1 = addMonths(Math.max(times[times.length - 1], Date.now()), 2);
  const pct = t => `${Math.min(100, Math.max(0, (t - t0) / (t1 - t0) * 100))}%`;

  const root = el('div', 'timeline');
  const detail = el('div', 'timeline-detail');
  detail.id = 'news-detail';
  detail.setAttribute('aria-live', 'polite');

  // ---- Compact overview: linear time axis, paper events, experience bars ----
  const overview = el('div', 'overview');
  const lanes = el('div', 'ov-lanes');
  const labels = el('div', 'ov-labels');
  overview.append(labels, lanes);

  const axis = el('div', 'ov-row ov-axis');
  labels.append(el('span', 'ov-label ov-label-axis', ''));
  for (let m = t0, k = 0; m < t1; m = addMonths(m, 1), k += 1) {
    const tick = el('span', k % 2 ? 'ov-tick is-odd' : 'ov-tick');
    tick.style.left = pct(m);
    const month = new Date(m).getUTCMonth();
    tick.append(el('span', 'ov-tick-label', month === 0 || m === t0 ? fmt(m, { month: 'short', year: '2-digit' }).replace(' ', ' ’') : fmt(m, { month: 'short' })));
    axis.append(tick);
  }
  lanes.append(axis);

  const eventRow = el('div', 'ov-row ov-events');
  labels.append(el('span', 'ov-label', 'Papers'));
  const dots = entries.map((item, index) => {
    const dot = el('button', 'ov-dot');
    dot.type = 'button';
    dot.style.left = pct(times[index]);
    if (item.accepted === true) dot.classList.add('is-accepted');
    const name = `${item.date} · ${hasText(item.title) ? item.title.trim() : 'Update'}`;
    dot.title = name;
    dot.setAttribute('aria-label', `${item.accepted === true ? 'Accepted: ' : ''}${name}`);
    dot.addEventListener('click', event => { event.stopPropagation(); select(index, true); });
    eventRow.append(dot);
    return dot;
  });
  lanes.append(eventRow);

  for (const exp of experiences) {
    const s = toTime(exp.start);
    const ongoing = exp.end == null;
    const e = ongoing ? t1 : toTime(exp.end);
    const row = el('div', 'ov-row');
    const barEl = el('span', 'ov-bar');
    if (s < t0) barEl.classList.add('starts-earlier');
    if (ongoing) barEl.classList.add('is-ongoing');
    barEl.style.left = pct(s);
    barEl.style.right = `calc(100% - ${pct(e)})`;
    const since = fmt(s, { month: 'short', year: 'numeric' });
    const tip = `${exp.label}${hasText(exp.org) ? ` — ${exp.org}` : ''} · ${since} – ${ongoing ? 'present' : fmt(toTime(exp.end), { month: 'short', year: 'numeric' })}`;
    barEl.title = tip;
    row.append(barEl);
    lanes.append(row);
    const label = el('span', 'ov-label', hasText(exp.short) ? exp.short : exp.label.split(' · ')[0]);
    label.title = tip;
    labels.append(label);
  }

  const today = el('span', 'ov-today');
  today.style.left = pct(Date.now());
  today.title = `Today · ${fmt(Date.now(), { month: 'short', day: 'numeric', year: 'numeric' })}`;
  const brush = el('span', 'ov-brush');
  lanes.append(today, brush);

  // ---- Card carousel ----
  const bar = el('div', 'timeline-bar');
  const status = el('p', 'timeline-status');
  status.setAttribute('aria-live', 'polite');
  const nav = el('div', 'timeline-nav');
  const earlier = el('button', 'timeline-arrow', '‹');
  earlier.type = 'button';
  earlier.setAttribute('aria-label', 'Show earlier updates');
  const later = el('button', 'timeline-arrow', '›');
  later.type = 'button';
  later.setAttribute('aria-label', 'Show later updates');
  nav.append(earlier, later);
  bar.append(status, nav);

  const scroller = el('div', 'timeline-scroll');
  scroller.tabIndex = 0;
  scroller.setAttribute('aria-label', 'Updates, earlier on the left. Scroll sideways to move through time.');
  const track = el('ol', 'timeline-track');
  scroller.append(track);

  const cards = entries.map((item, index) => {
    const li = el('li', 'timeline-item');
    const card = el('button', 'timeline-card');
    card.type = 'button';
    card.setAttribute('aria-controls', detail.id);
    const time = el('time', 'timeline-date', item.date);
    time.dateTime = item.date;
    const papers = (Array.isArray(item.papers) ? item.papers : []).filter(p => p && hasText(p.title));
    const excerpt = papers.length ? papers.map(p => p.title.trim()).join(' · ') : item.text.trim();
    const dot = el('span', 'timeline-dot');
    dot.setAttribute('aria-hidden', 'true');
    if (item.accepted === true) {
      card.classList.add('is-accepted');
      dot.textContent = '✓';
      card.setAttribute('aria-label', `Accepted: ${hasText(item.title) ? item.title.trim() : 'Update'}, ${item.date}`);
    }
    card.append(dot, time,
      el('span', 'timeline-title', hasText(item.title) ? item.title.trim() : 'Update'),
      el('span', 'timeline-excerpt', excerpt),
      el('span', 'timeline-more', papers.length > 1 ? `${papers.length} papers · Details` : 'Details'));
    card.addEventListener('click', () => select(index, true));
    li.append(card);
    track.append(li);
    return card;
  });

  function scrollToIndex(index, smooth) {
    const item = cards[index].parentElement;
    const target = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: smooth ? 'smooth' : 'auto' });
  }

  function select(index, fromUser) {
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-expanded', String(active));
      dots[i].classList.toggle('is-active', active);
    });
    detail.replaceChildren(renderDetail(entries[index]));
    if (fromUser) {
      const item = cards[index].parentElement;
      const left = item.offsetLeft, right = left + item.offsetWidth;
      if (left < scroller.scrollLeft || right > scroller.scrollLeft + scroller.clientWidth) scrollToIndex(index, true);
    }
  }

  function step() {
    const items = track.children;
    if (items.length < 2) return scroller.clientWidth;
    return items[1].offsetLeft - items[0].offsetLeft;
  }

  function visibleRange() {
    const width = step() || 1;
    const first = Math.min(entries.length - 1, Math.max(0, Math.round(scroller.scrollLeft / width)));
    const count = Math.max(1, Math.round(scroller.clientWidth / width));
    return [first, Math.min(entries.length - 1, first + count - 1)];
  }

  function update() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    earlier.disabled = scroller.scrollLeft <= 2;
    later.disabled = scroller.scrollLeft >= max - 2;
    const [a, b] = visibleRange();
    status.textContent = b >= entries.length - 1
      ? `Latest ${b - a + 1} of ${entries.length} · scroll left for earlier updates`
      : `${a + 1}–${b + 1} of ${entries.length} · ${entries[a].date} to ${entries[b].date}`;
    // Highlight the visible cards' time window on the overview.
    const left = (times[a] - t0) / (t1 - t0) * 100;
    const right = (times[b] - t0) / (t1 - t0) * 100;
    const pad = 0.8;
    brush.style.left = `${Math.max(0, left - pad)}%`;
    brush.style.width = `${Math.max(2, right - left + 2 * pad)}%`;
    dots.forEach((dot, i) => dot.classList.toggle('in-view', i >= a && i <= b));
  }

  // Click or drag on the overview to move the carousel to that date.
  function indexAt(clientX) {
    const rect = lanes.getBoundingClientRect();
    const t = t0 + (clientX - rect.left) / rect.width * (t1 - t0);
    let best = 0;
    times.forEach((time, i) => { if (Math.abs(time - t) < Math.abs(times[best] - t)) best = i; });
    return best;
  }
  let dragging = false;
  lanes.addEventListener('pointerdown', event => {
    if (event.target.closest('.ov-dot')) return;
    dragging = true;
    lanes.setPointerCapture(event.pointerId);
    scrollToIndex(indexAt(event.clientX), true);
  });
  lanes.addEventListener('pointermove', event => { if (dragging) scrollToIndex(indexAt(event.clientX), false); });
  const stop = () => { dragging = false; };
  lanes.addEventListener('pointerup', stop);
  lanes.addEventListener('pointercancel', stop);

  earlier.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
  later.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
  scroller.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(update));

  root.append(overview, bar, scroller, detail);
  container.replaceChildren(root);
  // Open at the latest updates (right end).
  scroller.style.scrollBehavior = 'auto';
  scroller.scrollLeft = scroller.scrollWidth;
  scroller.style.scrollBehavior = '';
  select(entries.length - 1, false);
  update();
})();
