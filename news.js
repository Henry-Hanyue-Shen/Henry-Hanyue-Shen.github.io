// Edit news-data.js for content. All supplied text is rendered without HTML.
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

  function paragraph(text, className, inlineLinks = []) {
    const element = document.createElement('p');
    element.className = className;
    element.textContent = text.trim();
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
    const list = document.createElement('ul');
    list.className = 'news-resources';
    list.setAttribute('aria-label', label);
    for (const resource of resources) {
      if (!resource) continue;
      const link = makeLink(resource.url, resource.label);
      if (!link) continue;
      const item = document.createElement('li');
      item.append(link);
      list.append(item);
    }
    if (list.childElementCount) parent.append(list);
  }

  const source = Array.isArray(window.PROFILE_NEWS) ? window.PROFILE_NEWS : [];
  const entries = source.filter(item => item &&
    validDate(item.date) && hasText(item.text)
  ).sort((a, b) => b.date.localeCompare(a.date));
  if (!entries.length) return;

  const list = document.createElement('ul');
  list.className = 'news-list';
  for (const item of entries) {
    const row = document.createElement('li');
    row.className = 'news-entry';
    const date = document.createElement('time');
    date.className = 'news-date';
    date.dateTime = item.date;
    date.textContent = item.date;
    const content = document.createElement('div');
    content.className = 'news-body';

    if (hasText(item.title)) {
      const header = document.createElement('div');
      header.className = 'news-header';
      const title = document.createElement('h3');
      title.textContent = item.title.trim();
      header.append(title);
      const conference = makeLink(item.conferenceUrl, 'Conference program');
      if (conference) header.append(conference);
      content.append(header);
    }
    content.append(paragraph(item.text, 'news-summary', item.inlineLinks));

    for (const paper of Array.isArray(item.papers) ? item.papers : []) {
      if (!paper || !hasText(paper.title)) continue;
      const article = document.createElement('article');
      article.className = 'news-paper';
      const title = document.createElement(hasText(item.title) ? 'h4' : 'h3');
      title.className = 'news-paper-title';
      title.textContent = paper.title.trim();
      article.append(title);
      if (hasText(paper.text)) article.append(paragraph(paper.text, 'news-paper-detail', paper.inlineLinks));
      if (hasText(paper.reference)) article.append(paragraph(paper.reference, 'news-paper-reference'));
      if (hasText(paper.doi) && /^10\.\d{4,9}\/\S+$/.test(paper.doi)) {
        const doi = document.createElement('p');
        doi.className = 'news-doi';
        const link = makeLink(`https://doi.org/${paper.doi}`, paper.doi);
        if (link) {
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
    row.append(date, content);
    list.append(row);
  }
  container.replaceChildren(list);
})();
