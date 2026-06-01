# Contact Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the 3-card contact grid with a centered layout: email as a large blue CTA button, LinkedIn/GitHub as a plain text row below a divider.

**Architecture:** Two files change — `Contact.jsx` (JSX restructure) and `index.css` (remove 6 old rules, add 6 new ones). Tests update in one file. No other files touched.

**Tech Stack:** React 19, Vite, plain CSS with CSS variables, Vitest + Testing Library

---

### Task 1: Update tests to match the new structure

**Files:**
- Modify: `src/__tests__/Contact.test.jsx`

- [ ] **Step 1: Update the heading assertion**

Open `src/__tests__/Contact.test.jsx`. Change line 10:

```js
// Before
expect(screen.getByRole('heading', { name: 'Get in Touch' })).toBeInTheDocument();

// After
expect(screen.getByRole('heading', { name: "Let's build something." })).toBeInTheDocument();
```

- [ ] **Step 2: Remove the card-count test, add a structural check**

Replace the last `it` block (lines 38–41):

```js
// Remove this:
it('renders 3 contact cards', () => {
  const cards = document.querySelectorAll('.contact-card');
  expect(cards.length).toBe(3);
});

// Add this instead:
it('renders the email as a mailto button', () => {
  const btn = document.querySelector(`a[href="mailto:${personal.email}"]`);
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveTextContent(personal.email);
});
```

- [ ] **Step 3: Run the tests — confirm exactly 1 failure**

```bash
cd portfolio && npm test -- --reporter=verbose 2>&1 | tail -30
```

Expected: the heading test fails (`'Get in Touch'` not found), the new mailto test also fails (button doesn't exist yet). All 4 href/external-link tests still pass.

---

### Task 2: Rewrite Contact.jsx

**Files:**
- Modify: `src/components/Contact.jsx`

- [ ] **Step 1: Replace the entire file content**

```jsx
import { personal } from '../data/portfolio';
import { IconEmail, IconLinkedIn, IconGithub } from './Icons';

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="contact-eyebrow r d1">Contact</div>

        <h2 className="r d1" style={{ marginBottom: '.625rem' }}>
          Let's build something.
        </h2>

        <p
          className="r d2"
          style={{
            fontSize: '1.0313rem',
            margin: '0 auto 2.5rem',
            maxWidth: '48ch',
          }}
        >
          Open to senior AI/ML engineering roles — RAG pipelines, schema-aware
          agents, and production LLM infrastructure.
        </p>

        <a
          href={`mailto:${personal.email}`}
          className="contact-email-btn r d2"
        >
          <IconEmail size={16} />
          {personal.email}
        </a>

        <div className="contact-divider r d3">
          <span className="contact-divider-line" />
          <span className="contact-divider-text">or find me on</span>
          <span className="contact-divider-line" />
        </div>

        <div className="contact-social-row r d3">
          <a
            href={personal.linkedin.url}
            className="contact-social-link"
            target="_blank"
            rel="noopener"
          >
            <IconLinkedIn size={14} />
            {personal.linkedin.handle}
          </a>
          <span className="contact-social-sep" aria-hidden="true" />
          <a
            href={personal.github.url}
            className="contact-social-link"
            target="_blank"
            rel="noopener"
          >
            <IconGithub size={14} />
            {personal.github.handle}
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Run the tests — confirm they pass**

```bash
cd portfolio && npm test -- --reporter=verbose 2>&1 | tail -30
```

Expected: all 6 tests pass. (CSS classes don't exist yet but tests don't check them.)

---

### Task 3: Update CSS

**Files:**
- Modify: `src/styles/index.css` (around line 837, the `/* ─── CONTACT ───` block)

- [ ] **Step 1: Replace the old contact CSS block**

Find and remove lines 837–867 (the entire `/* ─── CONTACT ───` block through `.contact-val`):

```css
/* ─── CONTACT ────────────────────────────────────────────────── */
.contact-grid { ... }
.contact-card { ... }
.contact-card:hover { ... }
.contact-ico { ... }
.contact-type { ... }
.contact-val { ... }
```

Replace with:

```css
/* ─── CONTACT ────────────────────────────────────────────────── */
.contact-eyebrow {
  font-family: var(--mono);
  font-size: .65rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--txt-3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .625rem;
  margin-bottom: 1.25rem;
}
.contact-eyebrow::before {
  content: '';
  flex: 0 0 1.5rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent));
}
.contact-eyebrow::after {
  content: '';
  flex: 0 0 1.5rem;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
}

.contact-email-btn {
  display: inline-flex;
  align-items: center;
  gap: .625rem;
  padding: .8rem 2rem;
  background: var(--accent);
  border-radius: 10px;
  text-decoration: none;
  color: #fff;
  font-size: .9375rem;
  font-weight: 700;
  letter-spacing: -.01em;
  transition: background .18s, transform .18s, box-shadow .18s;
  box-shadow: 0 4px 24px rgba(59,130,246,.3);
  margin-bottom: 2rem;
  word-break: break-all;
}
.contact-email-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59,130,246,.45);
  color: #fff;
}

.contact-divider {
  display: flex;
  align-items: center;
  gap: .875rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto 1.5rem;
}
.contact-divider-line { flex: 1; height: 1px; background: var(--border); }
.contact-divider-text {
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--txt-3);
  white-space: nowrap;
}

.contact-social-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}
.contact-social-sep {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--txt-3);
}
.contact-social-link {
  display: flex;
  align-items: center;
  gap: .45rem;
  text-decoration: none;
  color: var(--txt-2);
  font-size: .8125rem;
  transition: color .18s;
}
.contact-social-link:hover { color: var(--txt); }
```

- [ ] **Step 2: Run the full test suite**

```bash
cd portfolio && npm test -- --reporter=verbose 2>&1 | tail -30
```

Expected: all 6 Contact tests pass, no regressions in other test files.

---

### Task 4: Visual verification and commit

**Files:** none (verification only)

- [ ] **Step 1: Check the contact page in the browser**

The dev server should already be running at `http://localhost:5173`. Navigate to `http://localhost:5173/#/contact`.

Verify:
- Heading reads "Let's build something."
- Email button is blue, full-width-ish, contains the full email address with a mail icon on the left
- Hovering the button: slight lift + deeper shadow
- "or find me on" divider with lines on both sides
- LinkedIn and GitHub as plain text links with icons, separated by a dot
- Hovering social links: text brightens from muted to white
- Toggle light mode (sun icon in nav) — confirm everything still looks correct

- [ ] **Step 2: Commit**

```bash
cd portfolio && git add src/components/Contact.jsx src/styles/index.css src/__tests__/Contact.test.jsx
git commit -m "$(cat <<'EOF'
Redesign contact section: centered CTA layout

Replace 3-card grid with email as primary blue CTA button and
LinkedIn/GitHub as a plain text row below an 'or find me on' divider.

Co-Authored-By: Claude Sonnet 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```
