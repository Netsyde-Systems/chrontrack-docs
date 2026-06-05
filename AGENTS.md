# ChronTrack Docs — Agent Instructions

## Project Overview
This is the public documentation site for ChronTrack, built with Docusaurus 3. It is deployed to https://docs.chrontrack.com via GitHub Pages.

## Structure
```
docs/
  intro.md
  time-tracking/
  reports/
  goals/
  teams/
  dependants/
  organization/
  profile/
src/           — Custom React components and CSS
static/        — Static assets (images, icons)
scripts/       — capture-screenshots.ts for doc screenshots
```

## Dev Commands
Prefer `task` (Taskfile.dist.yml) over npm directly:

```bash
task docs:dev         # Live-reload dev server (no search index)
task docs:build       # Production build → build/
task docs:serve       # Build + serve with search enabled
task docs:screenshots # Capture screenshots from the app into docs (requires sibling repo running)
```

npm fallbacks: `npm start`, `npm run build`, `npm run serve`

## Sibling Repo: chrontrack (main app)
- Location: `../chrontrack` (relative to this repo)
- Contains the Fastify API and React web app this documentation describes
- **Docs must stay in sync with the main app.** When updating docs, verify against the actual API and UI in `../chrontrack`
- When the main app adds or changes features, update the corresponding section here

## Deployment
- Hosted on GitHub Pages; the `deploy` script uses `docusaurus deploy` to push to the `gh-pages` branch
- CI/CD: a GitHub Actions workflow triggers `npm run build && npm run deploy` on push to `main`
