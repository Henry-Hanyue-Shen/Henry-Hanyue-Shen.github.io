// Edit news-data.js for content. All supplied text is rendered without HTML.
// Updates render as a chronological horizontal timeline: earlier on the left,
// latest on the right (the view opens at the latest three). A Gantt track of
// current experience shares the same scroll container and time scale.
// Selecting a card shows its full details (papers, references, links) below.
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
  const fmtMonth = t => new Date(t).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

  const source = Array.isArray(window.PROFILE_NEWS) ? window.PROFILE_NEWS : [];
  // Chronological: earlier on the left, latest on the right.
  const entries = source.filter(item => item && validDate(item.date) && hasText(item.text))
    .map((item, order) => ({ item, order }))
    .sort((a, b) => a.item.date.localeCompare(b.item.date) || a.order - b.order)
    .map(({ item }) => item);
  if (!entries.length) return;

  const experiences = (Array.isArray(window.PROFILE_EXPERIENCE) ? window.PROFILE_EXPERIENCE : [])
    .filter(x => x && hasText(x.label) && validDate(x.start) && (x.end == null || validDate(x.end)));

  const root = el('div', 'timeline');
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

  // One scroll container holds both tracks, so they always move together.
  const scroller = el('div', 'timeline-scroll');
  scroller.tabIndex = 0;
  scroller.setAttribute('aria-label', 'Updates timeline, earlier on the left. Scroll sideways to move through time.');
  const track = el('ol', 'timeline-track');
  const gantt = el('div', 'gantt');
  gantt.setAttribute('aria-label', 'Current experience, aligned to the same timeline');
  scroller.append(track);
  if (experiences.length) scroller.append(gantt);

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

  function select(index, fromUser) {
    cards.forEach((card, i) => {
      const active = i === index;
      card.classList.toggle('is-active', active);
      card.setAttribute('aria-expanded', String(active));
    });
    detail.replaceChildren(renderDetail(entries[index]));
    if (fromUser) {
      const item = cards[index].parentElement;
      const left = item.offsetLeft, right = left + item.offsetWidth;
      if (left < scroller.scrollLeft) scroller.scrollTo({ left, behavior: 'smooth' });
      else if (right > scroller.scrollLeft + scroller.clientWidth) scroller.scrollTo({ left: right - scroller.clientWidth, behavior: 'smooth' });
    }
  }

  // Date → x position along the card track. Cards are evenly spaced, so time is
  // piecewise linear between consecutive card dates; the Gantt uses the same map.
  function makeScale() {
    const anchors = [];
    entries.forEach((item, i) => {
      const t = toTime(item.date);
      const x = cards[i].parentElement.offsetLeft;
      if (!anchors.length || anchors[anchors.length - 1].t !== t) anchors.push({ t, x });
    });
    const end = track.scrollWidth;
    const lastCard = cards[cards.length - 1].parentElement;
    const tail = { x: lastCard.offsetLeft + lastCard.offsetWidth };
    const first = anchors[0], last = anchors[anchors.length - 1];
    const tailSpan = 45 * DAY;
    tail.t = last.t + tailSpan;
    return t => {
      if (t <= first.t) return first.x;
      if (t >= tail.t) return Math.min(end, tail.x);
      if (t >= last.t) return last.x + (tail.x - last.x) * (t - last.t) / tailSpan;
      let i = 1;
      while (anchors[i].t < t) i += 1;
      const a = anchors[i - 1], b = anchors[i];
      return a.x + (b.x - a.x) * (t - a.t) / (b.t - a.t);
    };
  }

  function layoutGantt() {
    if (!experiences.length) return;
    const x = makeScale();
    const width = track.scrollWidth;
    const firstT = toTime(entries[0].date);
    const rows = el('div', 'gantt-rows');
    const axis = el('div', 'gantt-axis');
    gantt.style.width = `${width}px`;

    // Month ticks, skipping labels that would collide.
    let lastX = -Infinity;
    const start = new Date(firstT);
    for (let m = Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1); ; ) {
      const px = x(m);
      if (px >= width - 4) break;
      const tick = el('span', 'gantt-tick');
      tick.style.left = `${px}px`;
      if (px - lastX >= 64) {
        tick.append(el('span', 'gantt-tick-label', fmtMonth(m)));
        lastX = px;
      }
      axis.append(tick);
      const d = new Date(m);
      m = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
    }

    const today = el('span', 'gantt-today');
    today.style.left = `${x(Date.now())}px`;
    today.title = 'Today';

    experiences.forEach(exp => {
      const s = toTime(exp.start);
      const ongoing = exp.end == null;
      const left = x(s);
      const right = ongoing ? width : x(toTime(exp.end));
      const barEl = el('div', 'gantt-bar');
      if (s < firstT) barEl.classList.add('starts-earlier');
      if (ongoing) barEl.classList.add('is-ongoing');
      barEl.style.left = `${left}px`;
      barEl.style.width = `${Math.max(24, right - left)}px`;
      const since = new Date(s).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
      barEl.title = `${exp.label} — ${exp.org || ''} (${since} – ${ongoing ? 'present' : exp.end})`;
      const label = el('span', 'gantt-label');
      label.append(el('strong', '', exp.label));
      if (hasText(exp.org)) label.append(el('span', 'gantt-org', ` · ${exp.org}`));
      label.append(el('span', 'gantt-since', ` · since ${since}`));
      barEl.append(label);
      const row = el('div', 'gantt-row');
      row.append(barEl);
      rows.append(row);
    });
    gantt.replaceChildren(el('p', 'gantt-heading', 'Experience'), axis, rows, today);
  }

  function step() {
    const items = track.children;
    if (items.length < 2) return scroller.clientWidth;
    return items[1].offsetLeft - items[0].offsetLeft;
  }

  function update() {
    const max = scroller.scrollWidth - scroller.clientWidth;
    earlier.disabled = scroller.scrollLeft <= 2;
    later.disabled = scroller.scrollLeft >= max - 2;
    const width = step() || 1;
    const first = Math.min(entries.length, Math.round(scroller.scrollLeft / width) + 1);
    const visible = Math.max(1, Math.round(scroller.clientWidth / width));
    const last = Math.min(entries.length, first + visible - 1);
    status.textContent = last >= entries.length
      ? `Latest ${visible} of ${entries.length} · scroll left for earlier updates`
      : `${first}–${last} of ${entries.length} · ${entries[first - 1].date} to ${entries[last - 1].date}`;
  }

  earlier.addEventListener('click', () => scroller.scrollBy({ left: -step(), behavior: 'smooth' }));
  later.addEventListener('click', () => scroller.scrollBy({ left: step(), behavior: 'smooth' }));
  scroller.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  let resizeFrame = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => { layoutGantt(); update(); });
  });

  root.append(bar, scroller, detail);
  container.replaceChildren(root);
  layoutGantt();
  // Open at the latest updates (right end).
  scroller.style.scrollBehavior = 'auto';
  scroller.scrollLeft = scroller.scrollWidth;
  scroller.style.scrollBehavior = '';
  select(entries.length - 1, false);
  update();
})();
