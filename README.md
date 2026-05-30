# Portfolio HTML — Edit Guide

Single-file portfolio at `portfolio.html`. All content, styles, and behavior live in one file. This guide tells you exactly what to change and where.

---

## Table of Contents

1. [Personal Identity](#1-personal-identity)
2. [SEO & Meta Tags](#2-seo--meta-tags)
3. [Design Tokens (Colors & Fonts)](#3-design-tokens-colors--fonts)
4. [Navigation](#4-navigation)
5. [Hero Section](#5-hero-section)
6. [About Section](#6-about-section)
7. [Experience / Timeline](#7-experience--timeline)
8. [Projects](#8-projects)
9. [Skills](#9-skills)
10. [Certifications](#10-certifications)
11. [Talks & Achievements](#11-talks--achievements)
12. [Contact](#12-contact)
13. [Footer](#13-footer)
14. [Adding / Removing Sections](#14-adding--removing-sections)

---

## 1. Personal Identity

These values appear multiple times across the file. Search-replace all occurrences when updating.

| Field | Current value | Where to find |
|---|---|---|
| Full name | `Harsha Vardhan Dangeti` | Lines 6, 19, 800, 1273 |
| Short brand | `HVD` | Line 752 (nav brand) |
| Job title | `AI Engineer` | Lines 6, 10, 22 |
| Email | `harsha.vardhan.422812@gmail.com` | Lines 19, 1243, 1248, 1274 |
| City | `Gachibowli, Hyderabad` | Lines 23, 798, 865, 1273 |
| Resume PDF path | `/resume.pdf` | Lines 768, 789, 811 |
| LinkedIn URL | `https://www.linkedin.com/in/harshavardhandangeti/` | Line 1251 |
| LinkedIn handle | `linkedin.com/in/harshavardhandangeti` | Line 1256 |
| GitHub URL | `https://github.com/harsha-vardhan-dangeti` | Line 1259 |
| GitHub handle | `github.com/harsha-vardhan-dangeti` | Line 1264 |

---

## 2. SEO & Meta Tags

**Lines 6–27** — inside `<head>`.

```html
<!-- Line 6 -->
<title>Harsha Vardhan Dangeti — AI Engineer</title>

<!-- Line 7 -->
<meta name="description" content="..." />

<!-- Lines 9–11 -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
```

**Schema.org structured data** (lines 13–27): Update `name`, `jobTitle`, `email`, `addressLocality`, `addressRegion`, `addressCountry` to match your actual details.

---

## 3. Design Tokens (Colors & Fonts)

**Lines 35–64** — `:root` and `[data-theme="light"]` blocks.

### Dark theme (default) — lines 36–50

| Token | Purpose | Default |
|---|---|---|
| `--bg` | Page background | `#080810` |
| `--bg-surface` | Card / nav background | `#0e0e1a` |
| `--bg-surface-2` | Tag / hover backgrounds | `#16162a` |
| `--txt` | Primary text | `#f0f2f8` |
| `--txt-2` | Secondary text | `#8892a8` |
| `--txt-3` | Muted / label text | `#4e5a72` |
| `--accent` | Blue accent | `#3b82f6` |
| `--accent-hi` | Accent hover | `#60a5fa` |
| `--accent-dim` | Accent background tint | `rgba(59,130,246,.12)` |
| `--border` | Default borders | `rgba(255,255,255,.07)` |
| `--border-hi` | Hover borders | `rgba(59,130,246,.28)` |
| `--radius` | Card corner radius | `10px` |

### Light theme overrides — lines 52–64

Same token names, just override the values that differ in light mode.

### Fonts — lines 31, 47–48

```html
<!-- Line 31: Google Fonts import — change family names here -->
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700;800;900&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

```css
/* Lines 47–48: token assignments */
--font: 'Geist', 'Inter', system-ui, sans-serif;
--mono: 'Geist Mono', 'JetBrains Mono', monospace;
```

To change fonts: update the Google Fonts URL on line 31, then update `--font` and `--mono` on lines 47–48.

---

## 4. Navigation

**Lines 750–790**

### Nav brand (top-left logo text)
```html
<!-- Line 752 -->
<a href="#hero" class="nav-brand">HVD</a>
```

### Desktop nav links — lines 754–760
```html
<ul class="nav-links">
  <li><a href="#about">About</a></li>
  <li><a href="#experience">Experience</a></li>
  ...
</ul>
```
To add a nav item: duplicate a `<li>` and update the `href` (must match a section `id`) and label text.

### Resume button — line 768
```html
<a href="/resume.pdf" class="btn btn-primary nav-resume" ...>Resume</a>
```
Change `/resume.pdf` to your actual file path or external URL.

### Mobile menu — lines 781–790
Mirrors the desktop links. Keep this in sync when you add/remove nav links.

---

## 5. Hero Section

**Lines 793–839** — `<section id="hero">`

### Status badge (blinking dot + text) — line 798
```html
<div class="hero-badge">Gachibowli, Hyderabad · Open to AI Engineering roles</div>
```

### Your name — line 800
```html
<h1 class="hero-name">Harsha Vardhan<br>Dangeti</h1>
```
The `<br>` controls the line break. Remove it to keep the name on one line.

### Tagline paragraph — lines 802–804
```html
<p class="hero-tagline">
  <strong>3.5 years shipping production Rails.</strong> Now building...
</p>
```
Wrap key phrases in `<strong>` to make them white/bold.

### CTA buttons — lines 806–815
Two buttons: primary ("View Projects") and ghost ("Resume PDF").
- Change `href` to update destination.
- Change button text between the `<a>` tags.

### Hero stats — lines 817–832
Three stat blocks, each with a number (`.stat-val`) and a label (`.stat-lbl`).
```html
<div class="stat-val">3.5</div>
<div class="stat-lbl">Yrs production Rails</div>
```
The `<div class="stat-divider">` between them is just a vertical separator line.

### Background orbs (decorative) — lines 794–795
Two blurred gradient circles. Adjust colors in `.orb-1` / `.orb-2` CSS (lines 316–330) to change the ambient glow.

---

## 6. About Section

**Lines 844–886** — `<section id="about">`

### Section eyebrow label — line 846
```html
<div class="section-eyebrow r">/ about</div>
```

### Section heading — line 847
```html
<h2 class="r d1" style="margin-bottom:2.5rem">Background</h2>
```

### Bio paragraphs — lines 851–859
Three `<p class="r d1/d2/d3">` elements. Edit the text directly. The `d1`, `d2`, `d3` classes control stagger delay on scroll-reveal.

### Quick-facts sidebar card — lines 862–883
Each fact is an `.about-row` block:
```html
<div class="about-row">
  <div class="row-lbl">Location</div>
  <div class="row-val">Gachibowli, Hyderabad, IN</div>
</div>
```
To add a row: duplicate the block and change the label/value. To remove: delete the entire `.about-row` block.

### Availability dot — line 877
```html
<span class="avail-dot">Open to AI/ML roles</span>
```
Change the text. The green pulsing dot is added via CSS `::before`. To change dot color, edit `.avail-dot::before { background: #22c55e; }` at line 486.

---

## 7. Experience / Timeline

**Lines 891–941** — `<section id="experience">`

Each job is an `<article class="tl-item">`. Structure:
```html
<article class="tl-item r d1">
  <div class="tl-dot"></div>              <!-- blue = current, add class="inactive" for past -->
  <div class="tl-role">Job Title</div>
  <div class="tl-meta">
    <span class="tl-company">Company Name</span>
    <span class="tl-dates">2022 — Present · ~3.5 yrs</span>
  </div>
  <ul class="tl-bullets">
    <li>Bullet point achievement</li>
  </ul>
  <div class="tags">
    <span class="tag">Technology</span>
  </div>
</article>
```

**Current role dot:** `<div class="tl-dot">` — blue, active.  
**Past role dot:** `<div class="tl-dot inactive">` — muted gray.

To add a job: copy an entire `<article class="tl-item">` block and paste it after the last one, before `</div>` (the closing tag of `.timeline`).

To remove a job: delete the entire `<article class="tl-item">` block.

---

## 8. Projects

**Lines 946–1081** — `<section id="projects">`

Each project is an `<article class="proj-card">`. Structure:
```html
<article class="proj-card r d1">
  <div class="proj-top">
    <div class="proj-icon"><!-- SVG icon --></div>
    <div class="proj-links">
      <a href="GITHUB_URL" class="proj-link"><!-- GitHub SVG --></a>
      <!-- Add a second <a> here for a live demo link -->
    </div>
  </div>
  <div class="proj-title">Project Name</div>
  <p class="proj-desc">Short description of what it does.</p>
  <div class="tags">
    <span class="tag">Tech</span>
  </div>
</article>
```

### Changing the project icon
Replace the SVG inside `.proj-icon`. Use any Lucide icon SVG (same stroke style as the rest of the file). Keep `width="17" height="17"`.

### Adding a live demo link
Inside `.proj-links`, add a second anchor after the GitHub one:
```html
<a href="https://your-demo.com" class="proj-link" aria-label="Live demo" title="Live demo">
  <svg ...><!-- external link icon --></svg>
</a>
```

### Adding / removing projects
- Add: duplicate an `<article class="proj-card">` block and edit its content.
- Remove: delete the entire `<article class="proj-card">` block.

The grid is auto-fill (`minmax(310px, 1fr)`), so the layout adjusts automatically.

---

## 9. Skills

**Lines 1086–1151** — `<section id="skills">`

Each group is a `.skill-group` block:
```html
<div class="skill-group r d1">
  <div class="skill-grp-title">Category Name</div>
  <div class="skill-pills">
    <span class="skill-pill">Skill One</span>
    <span class="skill-pill">Skill Two</span>
  </div>
</div>
```

To add a skill: add `<span class="skill-pill">New Skill</span>` inside the relevant `.skill-pills`.

To add a category: copy an entire `.skill-group` block and edit the title and pills.

To remove a skill: delete its `<span class="skill-pill">` line.

---

## 10. Certifications

**Lines 1156–1193** — `<section id="certifications">`

Each cert is a `.cert-card` block:
```html
<div class="cert-card r d1">
  <div class="cert-issuer">Google Cloud</div>
  <div class="cert-name">Professional Data Engineer</div>
  <div class="cert-date">2024</div>
  <a href="CREDENTIAL_URL" class="cert-link" target="_blank" rel="noopener">
    View credential
    <!-- external link SVG -->
  </a>
</div>
```

Fields to fill in: `cert-issuer`, `cert-name`, `cert-date`, and the `href` on the anchor.

To add a cert: duplicate a `.cert-card` block.  
To remove a cert: delete its `.cert-card` block.

---

## 11. Talks & Achievements

**Lines 1197–1229** — `<section id="talks">`

Each talk is a `.talk-card` block:
```html
<div class="talk-card r d1">
  <div class="talk-icon"><!-- SVG icon --></div>
  <div>
    <div class="talk-title">Talk Title</div>
    <div class="talk-meta">Event · Duration · Audience</div>
    <p class="talk-desc">Longer description of the talk content.</p>
  </div>
</div>
```

To add a talk: duplicate a `.talk-card` block.  
To remove: delete its `.talk-card` block.

---

## 12. Contact

**Lines 1234–1267** — `<section id="contact">`

### Intro text — lines 1238–1240
```html
<p ...>Interested in AI engineering roles or want to discuss RAG systems, agents, or production LLM deployment.</p>
```

### Contact cards — lines 1242–1266
Three `.contact-card` anchors. Each has:
```html
<a href="mailto:EMAIL" class="contact-card r d1">
  <div class="contact-ico"><!-- SVG --></div>
  <span class="contact-type">Email</span>
  <span class="contact-val">your@email.com</span>
</a>
```

Update the `href`, `.contact-type` label, and `.contact-val` display text.

To add another card (e.g. Twitter/X): duplicate a `.contact-card` block and update all three fields.

---

## 13. Footer

**Lines 1271–1277**

```html
<footer>
  <p>Harsha Vardhan Dangeti · Hyderabad, India ·
    <a href="mailto:harsha.vardhan.422812@gmail.com">harsha.vardhan.422812@gmail.com</a>
  </p>
</footer>
```

Edit the text and email directly.

---

## 14. Adding / Removing Sections

### To add a new section

1. Copy an existing section block (e.g. the Skills section).
2. Give it a unique `id` (e.g. `id="education"`).
3. Add a `<div class="divider"></div>` before it (like all other sections).
4. Add a nav link in both the desktop `<ul class="nav-links">` (line 754) and mobile `<div class="mob-menu">` (line 781).

### To remove a section

1. Delete the `<section>` block and the `<div class="divider">` before it.
2. Remove the corresponding `<li>` from the desktop nav and the `<a>` from the mobile menu.

### Section eyebrow pattern

Every section starts with this pattern — just change the label text:
```html
<div class="section-eyebrow r">/ your-label</div>
<h2 class="r d1" style="margin-bottom:2.5rem">Section Heading</h2>
```

---

## Scroll-reveal animation classes

Elements with class `r` start invisible and fade up on scroll. Stagger siblings with delay classes:

| Class | Delay |
|---|---|
| (none) | 0s |
| `d1` | 0.08s |
| `d2` | 0.16s |
| `d3` | 0.24s |
| `d4` | 0.32s |

Add these to any new element you want to animate on scroll.

---

## Theme persistence

The dark/light toggle is stored in `localStorage` under the key `hvd-theme`. To change the default theme, edit line 1296:
```js
applyTheme(localStorage.getItem('hvd-theme') || 'dark');
// Change 'dark' to 'light' to default to light mode
```
