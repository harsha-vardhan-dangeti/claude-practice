# Portfolio — Harsha Vardhan Dangeti

Personal portfolio site built with React + Vite. Single-page app with
client-side routing, a live GitHub stats dashboard, Credly certification
badges, and a component test suite.

Live at **[www.hvd.works](https://www.hvd.works)**.

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19, React Router 7 (`BrowserRouter`, clean URLs via a Vercel SPA rewrite) |
| Build | Vite 8 |
| Testing | Vitest + React Testing Library, jsdom |
| Lint | ESLint 10 (flat config) |
| Deployment | Vercel (static build + one serverless function) |

## Getting started

```bash
npm install
npm run dev
```

Opens on **http://localhost:5173**. Vite serves with HMR — edits to
`src/` reload instantly.

## Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with a v8 coverage report |

## Project structure

```
api/
  github.js          Vercel serverless function — proxies GitHub API calls
                      server-side so the dashboard isn't rate-limited per visitor
  credly.js          Vercel serverless function — your public Credly badges
scripts/
  import-linkedin-certs.js   Imports courses from a LinkedIn data export
src/
  App.jsx             Route table (BrowserRouter)
  main.jsx            Entry point
  pages/               One page component per route (Home, About, Experience,
                        Projects, Skills, Achievements, Github, Contact)
  components/          Presentational building blocks (Hero, Nav, Footer,
                        ProfileCard, GithubStats, Certifications, ...)
  hooks/               useTheme (light/dark), useScrollReveal, useGithubData,
                        useCertifications
  data/portfolio.js    All site content lives here — see below
  styles/index.css     Global styles
  __tests__/           Vitest + RTL specs, one file per component
docs/
  recruiter-review-*.md         Standing content/UX review with a prioritized
                                 fix checklist
  superpowers/plans, specs/     Implementation plans for past feature work
```

## Editing content

The site has no CMS — all copy, links, stats, and structured data (experience,
projects, skills, certifications, talks) live in **`src/data/portfolio.js`**
as plain exported objects/arrays. Change the data there; components just
render it.

Routes are defined in `src/App.jsx`; add a page by creating a component under
`src/pages/` and wiring a `<Route>`.

## GitHub stats dashboard

`src/hooks/useGithubData.js` calls `/api/github`, a Vercel serverless
function (`api/github.js`) rather than the GitHub API directly — this avoids
the 60 req/hour unauthenticated rate limit per visitor IP. The function:

- Fetches user, repos, and public events server-side
- Optionally uses a `GITHUB_TOKEN` env var (fine-grained PAT, public read
  scope) for a 5,000 req/hour limit and real contribution totals via GraphQL
- Edge-caches responses for ~1h (`stale-while-revalidate` up to a day)

Without `GITHUB_TOKEN` set, the page still works via the unauthenticated
REST API; total-contributions just shows as unavailable.

## Certifications

The Achievements page merges three sources, dropping duplicates (same
credential URL, or same name + issuer) and sorting newest first:

1. **Credly, automatic.** `api/credly.js` fetches your public badges
   (username: `personal.credly`) and is edge-cached for an hour. Accept a
   badge on Credly and it appears on the site within about an hour, with no
   redeploy. In dev, Vite proxies `/credly-api/*` to Credly instead.
2. **Hand-added**, in `certifications` in `src/data/portfolio.js`. Use this
   for anything not on Credly or LinkedIn. The Credly entries there are the
   fallback if Credly is down.
3. **LinkedIn, one command.** LinkedIn has no public API for reading your
   certifications, so use its official export: LinkedIn → Settings → Data
   privacy → *Get a copy of your data* → tick *Certifications* → download the
   .zip (LinkedIn emails you when it's ready, usually within minutes). Then:

   ```bash
   npm run import:linkedin -- ~/Downloads/Basic_LinkedInDataExport_*.zip --dry-run   # preview
   npm run import:linkedin -- ~/Downloads/Basic_LinkedInDataExport_*.zip             # write
   git add src/data/linkedin-certifications.json && git commit -m "Add new certifications" && git push
   ```

   The script also accepts the unzipped folder or `Certifications.csv`, skips
   anything already shown from Credly or `portfolio.js`, and is safe to re-run.

## Testing

```bash
npm test
```

Tests live in `src/__tests__/`, one spec per component, using Vitest +
React Testing Library with a jsdom environment (`src/__tests__/setup.js`).
Coverage output goes to `coverage/` (gitignored build artifact — regenerate
with `npm run test:coverage`, don't hand-edit).

## Deployment

Deployed on Vercel (`vercel.json`): `npm run build` outputs a static build to
`dist/`, plus `api/github.js` and `api/credly.js` deploy as serverless functions. Set
`GITHUB_TOKEN` in the Vercel project's environment variables for the higher
rate limit and accurate contribution counts.

Full deploy steps, the Root Directory gotcha, env var setup, and rollback —
see [`DEPLOYMENT.md`](DEPLOYMENT.md).

## Known issues / open work

See [`docs/recruiter-review-2026-05-31.md`](docs/recruiter-review-2026-05-31.md)
for a standing, prioritized list of content and UX issues (dead project
links, placeholder experience text, missing sections, etc.) — check there
before assuming a gap is unnoticed.
