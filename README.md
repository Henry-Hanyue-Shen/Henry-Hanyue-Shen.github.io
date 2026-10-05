# Hanyue Shen — academic homepage

[Website](https://henry-hanyue-shen.github.io/) · [中文维护说明](MAINTENANCE.md)

A plain static academic website. The Updates section uses two small local JavaScript files. No build step, package manager, or external font service is required.

## Editing

- `index.html`: profile text, research entries, and links.
- `styles.css`: layout, typography, print styles, and responsive behavior.
- `news-data.js`: the entries in the Updates section.
- `news.js`: displays updates in reverse chronological order, with separate event, paper, and resource rows.
- `assets/portrait.jpg`: the existing public GitHub profile photograph, used without alteration.
- `.nojekyll`: serve the files directly with GitHub Pages.

## Editing Updates

Edit `news-data.js`. Put your updates between the square brackets, using this format:

```js
window.PROFILE_NEWS = [
  {
    date: "2026-10-01",
    text: "Write your actual update here.",
    url: "https://example.com/",
    linkText: "Details"
  },
  {
    date: "2026-09-24",
    text: "Write another actual update here."
  }
];
```

The entries above are format examples. Keep existing announcements when adding a new entry.

- `date`: the actual event or notification date, in `YYYY-MM-DD` format; displayed in that same unambiguous format. Older month-only `YYYY-MM` entries still work when the day is unknown.
- `text`: the announcement, as plain text.
- `inlineLinks`: optional links for phrases within `text`, for example `[{ text: "Lfff09", url: "https://github.com/Lfff09" }]`. Each link applies to the first matching phrase.
- `url` and `linkText`: optional. Omit them when no link is needed.
- The page sorts dates from newest to oldest. Entries on the same day keep the order you entered. Use separate entries for presentations on different dates.
- Add a comma between entries. Keep double quotes around values; write `\"` for a double quote inside a value.
- To edit or remove an update, change or remove its entry and save.

For the local preview, save and refresh the page. To update the public site, edit this file directly in the GitHub repository using its pencil button and commit the change to `main`. GitHub Pages will redeploy the site; no HTML edits are needed for routine updates.

For conference updates, use the optional fields below to keep titles, publication status, and links organized. Insert an object like this alongside the existing entries in `window.PROFILE_NEWS`:

```js
{
  date: "2026-10-01",
  title: "Conference name",
  conferenceUrl: "https://example.com/conference",
  text: "Describe the presentation and its actual publication status.",
  papers: [
    {
      title: "Paper title",
      reference: "Optional paper number",
      resources: [
        { label: "Paper record", url: "https://example.com/paper" },
        { label: "Presentation slides (PDF)", url: "https://example.com/slides.pdf" }
      ]
    }
  ]
}
```

Only `date` and `text` are required. `title` adds an event heading; `conferenceUrl` adds a “Conference program” link beside that heading. Link to the official session or paper page that lists your paper title, rather than the conference homepage. Each object in `papers` needs a title and may include `text`, `inlineLinks`, `reference`, `doi`, and `resources`. For a registered DOI, set `doi` to the identifier alone, such as `10.1109/OCEANS66983.2026.11617166`; the page displays it and generates its DOI link automatically. Only add a DOI that belongs to that paper.

`resources` is a list of `{ label, url }` links and can also be placed directly on an event. The original `url` / `linkText` format still works for simple announcements. The section has no entry limit.

To attach a PDF, upload it to `assets/` in this repository, then add its full public URL to a resource, for example `{ label: "AGU invitation letter (PDF)", url: "https://henry-hanyue-shen.github.io/assets/agu26-invitation-2070697.pdf" }`. The file becomes publicly accessible after deployment.

## Preview

Open `index.html` in a browser, or run `python -m http.server 8765 --bind 127.0.0.1` from this directory.

## Deployment

Repository: `Henry-Hanyue-Shen/Henry-Hanyue-Shen.github.io`.

Site URL: `https://henry-hanyue-shen.github.io/`.

GitHub Pages serves the repository root from `main`. Committing changes to `main` triggers deployment. See the repository's Actions tab for deployment status. The `.nojekyll` file keeps this a plain static website.
