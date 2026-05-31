# Contact Section Redesign

**Date:** 2026-05-31
**Status:** Approved

## Goal

Replace the current 3-card grid in `Contact.jsx` with a centered hierarchy layout that makes email the unmissable primary action and demotes LinkedIn/GitHub to a clean secondary text row.

## What Changes

### Layout

Centered column, full-width within the container. Three visual zones stacked vertically:

1. **Eyebrow + heading + subtitle** — heading changes from "Get in Touch" to "Let's build something.", subtitle text unchanged
2. **Email CTA button** — blue pill button containing the full email address
3. **Divider + social row** — `or find me on` divider, then LinkedIn and GitHub as inline text links

The `.contact-grid` and `.contact-card` structures are removed entirely.

### Eyebrow

Replace the current `/ contact` slash prefix with a word flanked by two gradient lines:

```
——— CONTACT ———
```

Left line: `linear-gradient(90deg, transparent, #3b82f6)`
Right line: `linear-gradient(90deg, #3b82f6, transparent)`
Implemented as `::before` / `::after` pseudo-elements on `.section-eyebrow` — or a new wrapper element if the existing eyebrow class is used globally and can't be modified.

### Email Button

- Full email address as the button label (not "Send an Email")
- Background: `var(--accent)` (#3b82f6)
- Border-radius: 10px
- Box-shadow: `0 4px 24px rgba(59,130,246,.3)`
- Hover: background darkens to `#2563eb`, translateY(-2px), shadow spreads to `0 8px 32px rgba(59,130,246,.45)`
- Mail icon (16×16) to the left of the address text
- `href="mailto:..."` — no `target="_blank"` needed

### Divider

A horizontal rule with centered label text:

```
──────── or find me on ────────
```

- Two `<span>` lines with `flex:1; height:1px; background: var(--border)`
- Label: `font-size: .6rem; letter-spacing: .1em; text-transform: uppercase; color: var(--txt-3)`

### Social Row

LinkedIn and GitHub as inline text links in a single `<div>`, separated by a `·` dot:

```
[linkedin icon] linkedin.com/in/harshavardhandangeti  ·  [github icon] github.com/harsha-vardhan-dangeti
```

- Link color: `var(--txt-2)` at rest, `var(--txt)` on hover
- Icon: 14×14, same color as text via `currentColor`
- Gap between icon and text: `.45rem`
- Gap between the two links: `2rem` (dot is a decorative `<span>` with `color: var(--txt-3)`)
- No border, no background — pure text links

## CSS Changes

**Remove:**
- `.contact-grid`
- `.contact-card`
- `.contact-card:hover`
- `.contact-ico`
- `.contact-type`
- `.contact-val`

**Add:**
- `.contact-email-btn` — the primary CTA button
- `.contact-divider` — the `or find me on` rule
- `.contact-social-row` — the flex row
- `.contact-social-link` — individual social link

All new classes scoped to the contact section, no naming conflicts.

## Component Changes

`src/components/Contact.jsx`:
- Remove the `cards` array and `.contact-grid` map
- Add the email button directly (uses `personal.email`)
- Add the divider element
- Add a social row with LinkedIn and GitHub links (uses `personal.linkedin` and `personal.github`)

No changes needed to `ContactPage.jsx`, `portfolio.js`, or any other file.

## Scroll Reveal

Keep the existing `r d1 / d2 / d3` reveal classes on the heading and subtitle. Apply staggered reveal delays to the new elements:
- Email button: `r d2`
- Divider + social row: `r d3`

## Light Theme

The design works in light mode without modification — all values use CSS variables that already have light-mode overrides.

## Tests

`src/__tests__/Contact.test.jsx` — most tests survive unchanged because they query by text/href, not class:

- **Pass as-is:** email href test, LinkedIn href test, GitHub href test, external link `target`/`rel` test — all still find links by `personal.email`, `personal.linkedin.handle`, `personal.github.handle`
- **Needs update:** the heading assertion (`'Get in Touch'` → `'Let's build something.'`)
- **Remove:** the `renders 3 contact cards` test that queries `.contact-card` — replace with a check that the email `<a>` with `mailto:` href is present
