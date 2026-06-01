# Portfolio Review — Recruiter Assessment
**Role Target:** Senior Full Stack Developer + AI Integrations (4+ years), MNC
**Date:** 2026-05-31
**Reviewer:** Acting as Senior Technical Recruiter, MNC Talent Acquisition

---

## Executive Summary

The portfolio has strong bones — a real brand name (Qualcomm), a credible AI narrative, and clean presentation. However, several critical gaps would cause most recruiters at an MNC to pause or disqualify at the screening stage. The biggest single issue: **every project GitHub link is a dead "#"**. For a developer role, that makes the entire projects section unverifiable. Below is a complete breakdown, prioritised by severity.

---

## CRITICAL — Will Cause Rejection

### 1. All Project GitHub Links Are Dead (`#`)
Every one of the 6 projects links to `#`. This is the first thing a technical recruiter or hiring manager checks. If I cannot click through to see actual code, I have no way to assess code quality, complexity, or even confirm the project exists. It reads as aspirational rather than shipped.

**What to do:**
- Push all projects to GitHub (even as private repos — link to a README with architecture diagrams if the code is internal/confidential)
- If the projects were done at Qualcomm and can't be public, say so explicitly on the card: *"Built at Qualcomm — code is internal. Architecture writeup available on request."*
- At minimum, 2–3 projects need real, clickable GitHub links

---

### 2. Placeholder Text Is Visible in the Experience Section

The second job entry literally reads:

> **Company:** `[Previous Company]`
> **Bullets:** `[Add outcome with impact metric]` × 2

This is unacceptable on a portfolio you are sending to recruiters. It signals the portfolio is a draft. I will not forward this to a hiring manager in this state.

**What to do:**
- Fill in the company name (or write "Confidential — Mid-size SaaS company" if you want to omit it)
- Replace both placeholder bullets with real outcomes, even if approximate:
  - *"Reduced API response time by 30% by introducing query caching on PostgreSQL read-heavy endpoints"*
  - *"Delivered X feature used by Y users / integrated with Z system"*

---

### 3. Empty Certification Entry

The certifications section has a third entry with no name, no issuer, no date — it renders as a blank card.

**What to do:** Remove it entirely. Two real certifications are better than two real + one blank.

---

## HIGH PRIORITY — Weakens the Application Significantly

### 4. Full-Stack Frontend Evidence Is Missing

For a **Full Stack + AI** role, I'm looking for proof you can own both ends. The portfolio title says "AI Engineer" and the skills list JavaScript/TypeScript — but there is no React, no Next.js, no Vue, no frontend depth visible anywhere. The only frontend reference is a tag on the "LLM Observability Dashboard" project.

An MNC hiring for full-stack expects to see:
- A frontend framework (React/Next.js preferred) in the **Skills** section under a dedicated "Frontend" category
- At least 1–2 projects that demonstrate UI work, not just backend/API work
- Optionally: this portfolio itself — mention it as a project ("Built with React 19 + Vite")

**What to do:**
- Add a "Frontend" skills category: `React, Next.js, Vite, Tailwind CSS` (or whatever you actually use)
- Add this portfolio as a project entry — it demonstrates React, component architecture, API integration, and deployment
- If you have done any frontend integration work at Qualcomm (even internal dashboards), describe it in the experience bullets

---

### 5. No Profile Photo

The avatar shows "HVD" initials. While not disqualifying, a professional photo significantly increases response rates from recruiters. It makes the profile human and memorable — especially important when I'm reviewing 50+ portfolios in a day.

**What to do:** Add a professional headshot. Doesn't need to be studio quality — a clean background, good lighting, professional attire is enough.

---

### 6. Total Experience Is Understated

The hero stat says **"3.5 Yrs Production Rails"** and the experience section shows the Qualcomm role starting in 2022 (3.5 years) + a 2021–2022 junior role (1 year) = **4.5 years total experience**. But nowhere does the portfolio say "4.5 years" or "4+ years." For a role that requires 4+ years, you're underselling yourself.

**What to do:**
- Update the hero tagline to reflect total experience, not just Rails tenure
- Update the About section which also says "3.5 years" — that's the current role duration, not total career length
- Consider a fourth stat on the homepage: `4.5` / `Yrs Professional Experience`

---

### 7. No Education Sectionus

MNCs almost universally screen for educational background during the first HR call. The portfolio has no degree, university, or graduation year listed anywhere. Recruiters will ask — better to surface it proactively.

**What to do:** Add an Education section (even brief: university name, degree, graduation year). If it was not a top-tier institution, that's fine — just put it there.

---

## MEDIUM PRIORITY — Reduces Competitiveness

### 8. Hero Stats Don't Speak to Full-Stack or Scale

The three homepage stats are:
- `3.5` — Yrs Production Rails
- `45` — Min RAG Eval Talk
- `5+` — AI Projects Shipped

"45 Min RAG Eval Talk" is an unusual metric for a hero section — it's a talk duration, not a business outcome. It will confuse most non-technical recruiters who scan this page in under 10 seconds.

**What to do:** Replace or reframe stats to speak to impact and scale:
- `4.5` — Years of Professional Experience
- `40%` — Hallucination Reduction (already in experience bullets — surface it here)
- `5+` — AI Systems in Production
- Or: number of engineers impacted, APIs built, data volume handled

---

### 9. Experience Bullets at Qualcomm Lack Scale Context

The Qualcomm bullets are good but missing the numbers that make them land:

> *"Maintained and extended production Ruby on Rails APIs handling high-volume traffic"*

"High-volume" means nothing without a number. How many requests per second? How many users? What was the database size?

> *"Built internal RAG evaluation pipeline… reduced hallucination rate by ~40%"*

Good metric! But: what was the business impact? What decision did it enable? Was this used by 5 engineers or 500?

**What to do:**
- Add scale numbers wherever possible: requests/sec, DB rows, team size, user count
- Connect each bullet to a business outcome: *"enabling the team to…"*, *"replacing a manual process that took X hours weekly"*

---

### 10. Skills Section Is Missing Key Full-Stack Technologies

Looking at the Skills section as a full-stack hiring manager, I see gaps:

| Category | What's There | What's Missing |
|---|---|---|
| Frontend | (nothing) | React, Next.js, Tailwind, HTML/CSS |
| Backend | Rails, FastAPI, PostgreSQL, Redis | Testing frameworks (RSpec, Jest), message queues |
| DevOps/Infra | Docker, GitHub Actions | Kubernetes, CI/CD pipelines, AWS/Azure |
| AI/ML | Very complete | — |

**What to do:** Audit and add what you actually know. Don't add things you can't speak to in an interview — but don't omit things you use either.

---

### 11. "Talks" Section Needs Slide Links or Recordings

Two impressive internal talks listed — but there are no slide decks linked, no recording, no artefact. From a recruiter's perspective, an unverifiable talk is weaker than a verifiable one.

**What to do:**
- If slides are not confidential, upload to Speaker Deck or attach as PDF and link
- If fully internal/confidential, add a note: *"Slides available on request"*
- Consider adding a third talk or article if you've written anything publicly

---

### 12. Job Title Positioning Mismatch

The portfolio title is **"AI Engineer"** but you are applying for **"Full Stack Developer + AI Integrations"**. Many ATS systems and recruiters do keyword matching. Your current positioning may filter you out of full-stack searches.

**What to do:**
- Update the title to **"Full Stack & AI Engineer"** or **"Software Engineer — Full Stack + AI"**
- Make sure the word "Full Stack" appears somewhere in the above-the-fold content on the homepage

---

### 13. No Mention of Remote / Hybrid Availability

MNC roles are often hybrid or have specific location requirements. The portfolio shows "Gachibowli, Hyderabad" with no mention of relocation flexibility, remote availability, or work arrangement preference.

**What to do:** Add to the Contact section or hero badge: *"Open to remote / hybrid roles"* or *"Open to relocation"* as applicable.

---

## LOW PRIORITY — Polish

### 14. Resume PDF Link May Be Broken

The "Resume PDF" button links to `/resume.pdf`. If this file doesn't exist in the deployed build, clicking it returns a 404 — which is embarrassing when a recruiter tries to download it.

**What to do:** Verify the PDF exists at that path after deployment, or host it externally (Google Drive, Dropbox link) and update the href.

---

### 15. The "45 Min RAG Eval Talk" Stat Is Also in the About Section

The About section mentions the 45-minute workshop twice — once in paragraph 2 and it's also a hero stat. It starts to feel like this is the only concrete AI achievement to surface. Vary the evidence you lead with.

---

### 16. GitHub Stats Page Shows Actual Public Activity

The GitHub page pulls live stats. If the public GitHub account has few public repos or low commit counts, this page actively hurts the application. Either make more repos public, or remove the GitHub stats page from the nav until the public profile is stronger.

---

## Summary Checklist — Priority Order

| # | Change | Priority |
|---|---|---|
| 1 | Add real GitHub links to at least 3 projects | CRITICAL |
| 2 | Fill in previous company name + placeholder bullets | CRITICAL |
| 3 | Remove empty certification entry | CRITICAL |
| 4 | Add frontend skills + at least 1 frontend project | HIGH |
| 5 | Add professional profile photo | HIGH |
| 6 | Update experience framing to "4.5 years total" | HIGH |
| 7 | Add Education section | HIGH |
| 8 | Replace "45 Min Talk" stat with an impact metric | MEDIUM |
| 9 | Add scale numbers to Qualcomm experience bullets | MEDIUM |
| 10 | Expand Skills section with frontend + DevOps | MEDIUM |
| 11 | Link slide decks or add "available on request" to Talks | MEDIUM |
| 12 | Update job title to include "Full Stack" | MEDIUM |
| 13 | Add remote/hybrid availability signal | MEDIUM |
| 14 | Verify resume PDF is accessible | LOW |
| 15 | Vary evidence — don't repeat the 45-min talk stat | LOW |
| 16 | Audit GitHub public profile before promoting it | LOW |

---

## What's Already Working Well

Don't change these:

- **Qualcomm brand** — recognized, adds instant credibility
- **AI narrative** — the RAG → agents → MCP progression is coherent and credible
- **40% hallucination reduction metric** — specific, quantified, impressive — put it everywhere
- **Certifications** — Google Cloud PDE is a strong signal for GCP/BigQuery work
- **Portfolio design** — clean, dark-themed, professional; the recent contact section redesign is good
- **About section writing** — honest, self-aware, avoids buzzword overload
- **Tech stack breadth** — Python + Rails + LangGraph + BigQuery covers a lot of ground

---

*This review is based on the portfolio state as of 2026-05-31. The most important single action is fixing the GitHub links — everything else is secondary to that.*
