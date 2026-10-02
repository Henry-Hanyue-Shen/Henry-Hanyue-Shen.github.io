// Layout logic. Edit news-data.js to add or change updates.
(() => {
  const container = document.getElementById('news-content');
  if (!container) return;
  const source = Array.isArray(window.PROFILE_NEWS) ? window.PROFILE_NEWS : [];
  const entries = source.filter(item => item &&
    /^\d{4}-(0[1-9]|1[0-2])$/.test(item.date) &&
    typeof item.text === 'string' && item.text.trim()
  ).sort((a, b) => b.date.localeCompare(a.date));

  if (!entries.length) return;
  const list = document.createElement('ul');
  list.className = 'news-list';
  for (const item of entries) {
    const row = document.createElement('li');
    const date = document.createElement('time');
    date.className = 'news-date';
    date.dateTime = item.date;
    date.textContent = `${item.date.slice(5)}.${item.date.slice(0, 4)}`;
    const content = document.createElement('span');
    content.className = 'news-text';
    content.textContent = item.text.trim();

    if (typeof item.url === 'string') {
      try {
        const url = new URL(item.url);
        if (url.protocol === 'https:' || url.protocol === 'http:') {
          const link = document.createElement('a');
          link.href = url.href;
          link.textContent = typeof item.linkText === 'string' && item.linkText.trim()
            ? item.linkText.trim() : 'Details';
          content.append(' ', link);
        }
      } catch { /* Keep the update visible if its optional link is invalid. */ }
    }
    row.append(date, content);
    list.append(row);
  }
  container.replaceChildren(list);
})();
