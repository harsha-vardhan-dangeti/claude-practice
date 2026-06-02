# Graph Report - Claude  (2026-06-02)

## Corpus Check
- 60 files · ~80,675 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 233 nodes · 316 edges · 19 communities (17 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `efcce8fc`
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
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `personal` - 15 edges
2. `How to make changes` - 9 edges
3. `Portfolio Review — Recruiter Assessment` - 8 edges
4. `Contact Section Redesign` - 8 edges
5. `scripts` - 8 edges
6. `MEDIUM PRIORITY — Reduces Competitiveness` - 7 edges
7. `about` - 6 edges
8. `What Changes` - 6 edges
9. `useScrollReveal()` - 6 edges
10. `Portfolio — React (Vite)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md - Project Guidance Document` --conceptually_related_to--> `sample.py - Empty Python File`  [INFERRED]
  CLAUDE.md → sample.py
- `Inner()` --calls--> `useScrollReveal()`  [EXTRACTED]
  portfolio/src/App.jsx → portfolio/src/hooks/useScrollReveal.js
- `Fixture()` --calls--> `useScrollReveal()`  [EXTRACTED]
  portfolio/src/__tests__/useScrollReveal.test.jsx → portfolio/src/hooks/useScrollReveal.js
- `Certifications()` --calls--> `useCreedlyData()`  [EXTRACTED]
  portfolio/src/components/Certifications.jsx → portfolio/src/hooks/useCreedlyData.js
- `GithubStats()` --calls--> `useGithubData()`  [EXTRACTED]
  portfolio/src/components/GithubStats.jsx → portfolio/src/hooks/useGithubData.js

## Communities (19 total, 2 thin omitted)

### Community 0 - "Project Setup & Docs"
Cohesion: 0.67
Nodes (3): CLAUDE.md - Project Guidance Document, Early-Stage Python Project, sample.py - Empty Python File

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (14): Add a certification, Add a job, Add a new section, Add a project, Add a skill category, Add a talk, Change any text, link, or data, Design tokens (colors, fonts, spacing) (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (9): GithubStats(), icons, IconStar(), githubStats, computeTopLangs(), fetchAll(), LANG_COLORS, useGithubData() (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.13
Nodes (12): IconArrowRight(), IconDownload(), IconExternal(), IconGithub(), IconMoon(), IconScrollDown(), IconSun(), ProjectIcon() (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.14
Nodes (9): Certifications(), certifications, education, experience, hero, projects, skills, talks (+1 more)

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
Cohesion: 0.14
Nodes (13): Component Changes, Contact Section Redesign, CSS Changes, Divider, Email Button, Eyebrow, Goal, Layout (+5 more)

### Community 15 - "Community 15"
Cohesion: 0.08
Nodes (24): 10. Skills Section Is Missing Key Full-Stack Technologies, 11. "Talks" Section Needs Slide Links or Recordings, 12. Job Title Positioning Mismatch, 13. No Mention of Remote / Hybrid Availability, 14. Resume PDF Link May Be Broken, 15. The "45 Min RAG Eval Talk" Stat Is Also in the About Section, 16. GitHub Stats Page Shows Actual Public Activity, 1. All Project GitHub Links Are Dead (`#`) (+16 more)

### Community 16 - "Community 16"
Cohesion: 0.13
Nodes (4): IconEmail(), IconLinkedIn(), about, personal

### Community 17 - "Community 17"
Cohesion: 0.33
Nodes (5): Contact Section Redesign Implementation Plan, Task 1: Update tests to match the new structure, Task 2: Rewrite Contact.jsx, Task 3: Update CSS, Task 4: Visual verification and commit

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (4): buildCommand, framework, installCommand, outputDirectory

## Knowledge Gaps
- **91 isolated node(s):** `buildCommand`, `outputDirectory`, `installCommand`, `framework`, `Executive Summary` (+86 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `personal` connect `Community 16` to `Community 3`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 10` to `Community 8`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `buildCommand`, `outputDirectory`, `installCommand` to the rest of the system?**
  _91 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.1286549707602339 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.12648221343873517 - nodes in this community are weakly interconnected._
- **Should `Community 7` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._