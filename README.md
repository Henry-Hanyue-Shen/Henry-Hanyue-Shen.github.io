# Hanyue Shen — academic homepage

[Website](https://henry-hanyue-shen.github.io/) · [中文维护说明](MAINTENANCE.md)

A plain static academic website. The Updates section uses two small local JavaScript files. No build step, package manager, or external font service is required.

## Editing

- `index.html`: profile text, research entries, and links.
- `styles.css`: layout, typography, print styles, and responsive behavior.
- `news-data.js`: the entries in the Updates section.
- `news.js`: displays updates in reverse chronological order.
- `assets/portrait.jpg`: the existing public GitHub profile photograph, used without alteration.
- `.nojekyll`: serve the files directly with GitHub Pages.

## Editing Updates

Edit `news-data.js`. Put your updates between the square brackets, using this format:

```js
window.PROFILE_NEWS = [
  {
    date: "2026-10",
    text: "Write your actual update here.",
    url: "https://example.com/",
    linkText: "Details"
  },
  {
    date: "2026-09",
    text: "Write another actual update here."
  }
];
```

The entries above are examples, not actual announcements. The initial list is empty.

- `date`: the event month, in `YYYY-MM` format; displayed as `MM.YYYY`.
- `text`: the announcement, as plain text.
- `url` and `linkText`: optional. Omit them when no link is needed.
- The page sorts months from newest to oldest. Within one month, it keeps the order you entered.
- Add a comma between entries. Keep double quotes around values; write `\"` for a double quote inside a value.
- To edit or remove an update, change or remove its entry and save.

For the local preview, save and refresh the page. To update the public site, edit this file directly in the GitHub repository using its pencil button and commit the change to `main`. GitHub Pages will redeploy the site; no HTML edits are needed for routine updates.

The section has no entry limit. It remains a simple list, like the reference academic homepage.

## Preview

Open `index.html` in a browser, or run `python -m http.server 8765 --bind 127.0.0.1` from this directory.

## Deployment

Repository: `Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io`.

Site URL: `https://henry-hanyue-shen.github.io/`.

GitHub Pages serves the repository root from `main`. Committing changes to `main` triggers deployment. See the repository's Actions tab for deployment status. The `.nojekyll` file keeps this a plain static website.

The layout takes inspiration from the restrained academic style of https://yue-ning.github.io/. All page markup and styles were authored for this website; no biography, research records, photographs, or other content from that reference site are reused.
