# Portfolio Site — Ratnakaram Rama Narasimha Raju

A premium, dark-themed personal portfolio for a Senior iOS & Mobile Developer.
Built with React 18, Vite, TypeScript, Tailwind CSS 3, and framer-motion.

The site is deployed on GitHub Pages at:

> https://ram7767.github.io/ram7767/

## What's inside

- Hero, About, Skills, Projects, Stats, and Contact sections
- Glass-morphism design system with a unified brand palette
- GitHub stats cards and activity graph rendered live from upstream services
- One-click resume download backed by Google Drive

## Run it locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The dev server prints a local URL (typically http://localhost:5173/ram7767/).
The Vite `base` is set to `/ram7767/` to match the GitHub Pages path.

## Build

```bash
npm run build
```

The static site is emitted to `dist/`. To preview the production build locally:

```bash
npm run preview
```

## Resume download

The resume lives as a public Google Drive file. The integration is in
`src/lib/resume.ts`:

- `RESUME_FILE_ID` — the Drive file ID (currently
  `1s-_-UfTo5GmwtWnjcwbDhEqcheeQ1MWU`)
- `RESUME_FILENAME` — the filename suggested to the browser when the file is
  saved
- `RESUME_DIRECT_URL` — the Drive direct-download URL constructed from the file
  ID
- `downloadResume()` — creates a temporary anchor and clicks it to trigger the
  download flow

To swap the resume:

1. Upload the new PDF to Google Drive.
2. Right-click the file and ensure link sharing is set to "Anyone with the
   link — Viewer".
3. Copy the file ID from the share URL
   (`https://drive.google.com/file/d/<FILE_ID>/view`).
4. Update `RESUME_FILE_ID` (and optionally `RESUME_FILENAME`) in
   `src/lib/resume.ts`.
5. Commit and push to `main` — the deploy workflow picks it up automatically.

> Note: browsers ignore the HTML `download` attribute for cross-origin URLs, so
> the Drive download will open in a new tab and stream the file from there.
> The file still saves; only the filename hint may differ.

## Deploy

Deployment is fully automated via GitHub Actions
(`.github/workflows/deploy.yml`):

1. Push to `main` (or trigger the workflow manually from the Actions tab).
2. The `build` job checks out the repo, installs dependencies with `npm ci`,
   runs `npm run build`, and uploads the `dist/` directory as a Pages
   artifact.
3. The `deploy` job publishes that artifact to the `github-pages`
   environment.
4. The live site updates at https://ram7767.github.io/ram7767/.

### One-time GitHub setup

In the repo settings, under **Pages**, set the source to **GitHub Actions**.
No other configuration is needed — the workflow declares the required
`pages: write` and `id-token: write` permissions itself.

## Project conventions

- Sections use `py-20 md:py-28` and the shared `<Container>` wrapper.
- Only Tailwind tokens from the configured palette
  (`brand-*`, `accent-*`, `ink-*`) — no ad-hoc hex values.
- Icons are inline SVG, stroke-based, 1.5 stroke width, `currentColor`.
- No emojis in visible UI text.
