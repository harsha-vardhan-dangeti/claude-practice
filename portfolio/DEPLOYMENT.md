# Deployment (Vercel)

This app deploys to Vercel as a static build (`vite build` → `dist/`) plus
one serverless function (`api/github.js`). Production is served at
**https://www.hvd.works** (apex `hvd.works` also resolves).

| | |
|---|---|
| Vercel project | `portfolio` |
| Project ID | `prj_Xsdjq9ISYc16x0G2jIkX8AfuT3uD` |
| Team / org ID | `team_u98ANUsY5Nv65d1vd2yAD3WI` |
| Framework preset | Vite |
| Production domains | `www.hvd.works`, `hvd.works` |

## 1. Prerequisites

- Access to the Vercel team that owns the `portfolio` project (ask to be
  invited if you don't have it).
- [Vercel CLI](https://vercel.com/docs/cli) installed: `npm i -g vercel`
- Logged in locally: `vercel login`

## 2. Critical gotcha: Root Directory

**The git repo root is the parent `Claude/` directory, but the app lives in
`portfolio/`.** The Vercel project's **Root Directory setting must be
`portfolio`**.

If this ever gets reset to blank/null, every git-push deploy will fail the
build with `ENOENT … package.json` at the repo root, even though CLI
prebuilt deploys (below) keep working — because those already run `npm run
build` locally inside `portfolio/` before uploading. This happened once
before (2026-06-20) and cost a silent breakage window.

Check/fix it in the dashboard: **Project → Settings → General → Root
Directory**, or via the API:

```bash
vercel api -X PATCH /v9/projects/prj_Xsdjq9ISYc16x0G2jIkX8AfuT3uD?teamId=team_u98ANUsY5Nv65d1vd2yAD3WI \
  -f rootDirectory=portfolio
```

## 3. Build configuration

Defined in [`vercel.json`](vercel.json):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

`api/github.js` is auto-detected and deployed as a serverless function —
no extra config needed for it.

## 4. Deploying

### Option A — Git push (normal path)

Push to the branch connected to the Vercel project (`main`) — Vercel builds
and deploys automatically. Root Directory must be correctly set to
`portfolio` (see §2) or this silently fails.

```bash
git push origin main
```

Preview deployments are created automatically for other branches / PRs.

### Option B — CLI prebuilt deploy (manual/one-off)

From inside `portfolio/` (already linked via `.vercel/project.json`):

```bash
cd portfolio
vercel build --prod
vercel deploy --prebuilt --prod
```

Use this when you need to deploy without pushing to git, or to sanity-check
a build outside the CI path.

## 5. Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `GITHUB_TOKEN` | No (recommended) | Fine-grained PAT, **public read** scope. Lets `/api/github` use the authenticated 5,000 req/hour REST limit and fetch real 1-year contribution totals via GraphQL. |

**Current status: not set.** The endpoint runs unauthenticated
(`authed: false`, `totalContributions: null` in the response) — the GitHub
Stats page shows "Commits (90d)" instead of accurate "Contributions (1y)".
Add it via:

```bash
vercel env add GITHUB_TOKEN production
```

or dashboard: **Project → Settings → Environment Variables**. Redeploy
after adding it — env vars only take effect on the next build.

Verify whichever way you set it by hitting the live endpoint and checking
`authed`:

```bash
curl -s https://www.hvd.works/api/github | jq '{authed, totalContributions}'
```

## 6. Domains

`www.hvd.works` and `hvd.works` are already attached to this project
(Project → Settings → Domains). No action needed unless the domain or DNS
changes.

## 7. Verifying a deployment

```bash
# Latest deployment status
vercel ls portfolio

# Or check the live site directly
curl -sI https://www.hvd.works | head -1
curl -s https://www.hvd.works/api/github | jq .
```

Also worth a quick manual pass in a browser after any deploy that touches
routing, the GitHub Stats page, or Credly badges — those depend on
client-side fetches that a curl smoke test won't exercise.

## 8. Rollback

Vercel keeps every deployment. To roll back:

```bash
vercel ls portfolio                 # find the last-known-good deployment URL
vercel promote <deployment-url>     # promote it back to production
```

Or use **Project → Deployments → (select one) → Promote to Production** in
the dashboard.
