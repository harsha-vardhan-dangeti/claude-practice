# Portfolio — React (Vite)

Personal portfolio for Harsha Vardhan Dangeti. Single-page React app built with Vite.

---

## Quick start

```bash
cd portfolio
npm install
npm run dev        # dev server at http://localhost:5173
npm test           # run all tests once
npm run test:watch # re-run tests on every file save
npm run build      # production build → portfolio/dist/
```

Tests also run automatically whenever you edit any file inside `portfolio/src/` through Claude Code.

---

## Project structure

```
portfolio/
├── index.html                    ← page title, meta tags, Google Fonts
├── src/
│   ├── data/
│   │   └── portfolio.js          ← ALL content (edit this file for any text change)
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Experience.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Certifications.jsx
│   │   ├── Talks.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Icons.jsx
│   ├── hooks/
│   │   ├── useTheme.js            ← dark/light toggle + localStorage
│   │   └── useScrollReveal.js     ← IntersectionObserver scroll animations
│   ├── styles/
│   │   └── index.css              ← all CSS and design tokens
│   ├── App.jsx                    ← section order
│   └── main.jsx                   ← React entry point
│   └── __tests__/
│       ├── setup.js               ← jest-dom + mocks
│       ├── data.test.js
│       ├── App.test.jsx
│       ├── Nav.test.jsx
│       ├── Hero.test.jsx
│       ├── About.test.jsx
│       ├── Experience.test.jsx
│       ├── Projects.test.jsx
│       ├── Skills.test.jsx
│       ├── Certifications.test.jsx
│       ├── Talks.test.jsx
│       ├── Contact.test.jsx
│       ├── Footer.test.jsx
│       └── useTheme.test.js
└── vite.config.js
```

---

## How to make changes

### Change any text, link, or data

**Edit `src/data/portfolio.js` only.** Every component reads from this file.

```
personal     → name, email, LinkedIn, GitHub, resume path
hero         → badge text, tagline, stats
about        → heading, bio paragraphs, quick-facts sidebar
experience   → jobs array (role, company, dates, bullets, tags)
projects     → projects array (title, description, github, demo, tags, icon)
skills       → skill groups (category, items array)
certifications → certs array (issuer, name, date, url)
talks        → talks array (title, meta, description, icon)
```

### Personal identity

| Field | Key in `personal` |
|---|---|
| Full name (split across `<br>`) | `name`, `nameLine1`, `nameLine2` |
| Nav brand (top-left) | `brand` |
| Job title (SEO/meta) | `title` |
| Email | `email` |
| Location | `location`, `locationShort` |
| Resume PDF path | `resumePdf` |
| LinkedIn | `linkedin.url`, `linkedin.handle` |
| GitHub | `github.url`, `github.handle` |

### Add a project

In `projects` array, add an object:
```js
{
  title: "Project Name",
  description: "What it does.",
  github: "https://github.com/...",   // or null
  demo: "https://...",                // or null
  tags: ["Python", "FastAPI"],
  icon: "activity",                   // see icon options below
}
```

**Icon options:** `activity`, `database`, `tool`, `globe`, `layout`, `box`

### Add a job

In `experience` array, add an object:
```js
{
  role: "Job Title",
  company: "Company Name",
  dates: "2023 — Present · ~1 yr",
  current: false,        // true = blue dot, false = gray dot
  bullets: ["Achievement one", "Achievement two"],
  tags: ["Tech", "Stack"],
}
```

### Add a skill category

In `skills` array:
```js
{ category: "Category Name", items: ["Skill A", "Skill B"] }
```

### Add a certification

In `certifications` array:
```js
{ issuer: "Issuer", name: "Cert Name", date: "2025", url: "https://credential-url" }
```

### Add a talk

In `talks` array:
```js
{ title: "Talk Title", meta: "Event · Duration", description: "...", icon: "edit" }
```
Icon options: `edit`, `monitor`

### Add a new section

1. Create `src/components/MySection.jsx`
2. Import and export your data from `src/data/portfolio.js`
3. Add `<MySection />` (and a `<Divider />`) in `src/App.jsx`
4. Add CSS for it in `src/styles/index.css`
5. Add nav links in `Nav.jsx` (both desktop list and mobile menu)
6. Write tests in `src/__tests__/MySection.test.jsx`

---

## Design tokens (colors, fonts, spacing)

All in `src/styles/index.css` under `:root` (dark) and `[data-theme="light"]`.

| Token | Purpose |
|---|---|
| `--bg` | Page background |
| `--bg-surface` | Card / nav surface |
| `--bg-surface-2` | Tag / hover backgrounds |
| `--txt` | Primary text |
| `--txt-2` | Secondary text |
| `--txt-3` | Muted / label text |
| `--accent` | Blue accent color |
| `--accent-hi` | Accent hover state |
| `--accent-dim` | Accent background tint |
| `--border` | Default borders |
| `--border-hi` | Hover borders |
| `--font` | Body font stack |
| `--mono` | Monospace font stack |
| `--radius` | Card corner radius |

To change fonts: update the Google Fonts URL in `index.html`, then update `--font` / `--mono` in `index.css`.

To change the default theme (dark → light): edit `useTheme.js` line:
```js
localStorage.getItem('hvd-theme') || 'dark'  // change 'dark' to 'light'
```

---

## Tests

**85 tests** across 13 test files (Vitest + React Testing Library).

| File | What it covers |
|---|---|
| `data.test.js` | Data structure integrity — required fields, types, constraints |
| `App.test.jsx` | All sections and nav/footer present in the DOM |
| `Nav.test.jsx` | Brand, links, theme toggle, hamburger open/close, scroll class |
| `Hero.test.jsx` | Name, badge, tagline, stats, CTA button hrefs |
| `About.test.jsx` | Bio paragraphs, fact labels/values, availability dot |
| `Experience.test.jsx` | Roles, companies, dates, bullets, tags, active/inactive dots |
| `Projects.test.jsx` | Titles, descriptions, GitHub/demo links, tags, card count |
| `Skills.test.jsx` | Category headings, skill pills, group count |
| `Certifications.test.jsx` | Filtered filled certs, name/issuer/date, credential links |
| `Talks.test.jsx` | Talk titles, meta, descriptions, card count |
| `Contact.test.jsx` | Email/LinkedIn/GitHub hrefs, external link attributes |
| `Footer.test.jsx` | Name text, email mailto link |
| `useTheme.test.js` | Default theme, toggle, localStorage persistence, data-theme attr |

Run all tests: `npm test`  
Watch mode (re-runs on save): `npm run test:watch`  
Coverage report: `npm run test:coverage`
