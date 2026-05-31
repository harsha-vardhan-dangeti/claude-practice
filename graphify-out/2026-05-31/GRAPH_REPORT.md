# Graph Report - Claude  (2026-05-31)

## Corpus Check
- 54 files · ~14,415 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 177 nodes · 253 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `70c2cbd0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Setup & Docs|Project Setup & Docs]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `personal` - 14 edges
2. `How to make changes` - 9 edges
3. `scripts` - 8 edges
4. `about` - 6 edges
5. `useScrollReveal()` - 6 edges
6. `Portfolio — React (Vite)` - 6 edges
7. `IconGithub()` - 4 edges
8. `hero` - 4 edges
9. `experience` - 4 edges
10. `projects` - 4 edges

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md - Project Guidance Document` --conceptually_related_to--> `sample.py - Empty Python File`  [INFERRED]
  CLAUDE.md → sample.py
- `Inner()` --calls--> `useScrollReveal()`  [EXTRACTED]
  portfolio/src/App.jsx → portfolio/src/hooks/useScrollReveal.js
- `Fixture()` --calls--> `useScrollReveal()`  [EXTRACTED]
  portfolio/src/__tests__/useScrollReveal.test.jsx → portfolio/src/hooks/useScrollReveal.js
- `GithubStats()` --calls--> `useGithubData()`  [EXTRACTED]
  portfolio/src/components/GithubStats.jsx → portfolio/src/hooks/useGithubData.js
- `App()` --calls--> `useScrollReveal()`  [EXTRACTED]
  portfolio/src/App.jsx → portfolio/src/hooks/useScrollReveal.js

## Communities (15 total, 2 thin omitted)

### Community 0 - "Project Setup & Docs"
Cohesion: 0.67
Nodes (3): CLAUDE.md - Project Guidance Document, Early-Stage Python Project, sample.py - Empty Python File

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (14): Add a certification, Add a job, Add a new section, Add a project, Add a skill category, Add a talk, Change any text, link, or data, Design tokens (colors, fonts, spacing) (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (4): IconEmail(), IconLinkedIn(), about, personal

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (11): IconArrowRight(), IconDownload(), IconExternal(), IconGithub(), IconMoon(), IconScrollDown(), IconSun(), ProjectIcon() (+3 more)

### Community 7 - "Community 7"
Cohesion: 0.13
Nodes (7): TalkIcon(), certifications, experience, hero, projects, skills, talks

### Community 8 - "Community 8"
Cohesion: 0.12
Nodes (16): dependencies, react, react-dom, react-router-dom, name, private, scripts, build (+8 more)

### Community 9 - "Community 9"
Cohesion: 0.10
Nodes (5): useScrollReveal(), useTheme(), App(), Inner(), Fixture()

### Community 10 - "Community 10"
Cohesion: 0.12
Nodes (16): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, jsdom, @testing-library/jest-dom (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.50
Nodes (3): Expanding the ESLint configuration, React Compiler, React + Vite

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (8): cardUrl(), GithubStats(), icons, IconStar(), githubStats, useGithubData(), mockApiData, mockFetch

## Knowledge Gaps
- **53 isolated node(s):** `mockApiData`, `mockFetch`, `icons`, `s`, `projectIcons` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `personal` connect `Community 3` to `Community 7`, `Community 14`, `Community 6`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 10` to `Community 8`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `mockApiData`, `mockFetch`, `icons` to the rest of the system?**
  _53 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.12631578947368421 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.12987012987012986 - nodes in this community are weakly interconnected._