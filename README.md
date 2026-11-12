# emmanueledet.com

Portfolio site for Emmanuel Edet.

- **Website**: built with [Astro](https://astro.build), published to GitHub Pages.
- **Content**: written in [Sanity](https://www.sanity.io) (project `ojybom2y`, dataset `production`).

## How it fits together

| Folder | What it is |
|---|---|
| `src/pages` | One file per page of the website |
| `src/layouts`, `src/components` | The shared header, footer, lists and article layout |
| `src/styles/global.css` | All colours, fonts and spacing |
| `src/lib/defaults.ts` | Wording used until "Site settings" is filled in on Sanity |
| `studio/` | The Sanity editing screen and the list of things you can edit |
| `.github/workflows/` | The instructions GitHub follows to publish the site and the Studio |

## Changing content

Edit in the Sanity Studio and press **Publish**. The site rebuilds and is live a minute or two later.

## Running it on your own computer (optional)

Needs [Node.js](https://nodejs.org) 22 or newer.

```
npm install
npm run dev
```

`USE_SAMPLE=1 npm run dev` fills the pages with made-up content for design work.
