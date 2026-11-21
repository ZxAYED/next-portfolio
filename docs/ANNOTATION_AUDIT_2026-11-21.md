> Historical audit of the source archive before this Sites release. See [current release checks](VERIFICATION.md) and [portfolio hosting](HOSTED_REVIEW.md).

# Zayed Iqbal · Portfolio requirement and annotation audit

**Date:** 21 November 2026  
**Source baseline:** `Zayed_Iqbal_Portfolio_Source_2026-11-21.zip`, incorporating the prior revision and the latest screenshots.  
**Release status:** Updated **source ZIP only**. The previous ChatGPT Sites URL has **not** been republished with these changes.

## Intent

This is Zayed Iqbal's **personal, job-focused full-stack developer portfolio**, not a second agency homepage or a client-lead-generation website. TechQuell informs the lavender/charcoal palette, typography, scroll feel and interaction polish, but the content, personal logo, product stories, résumé, and SDLC presentation are distinct.

## All requested changes: source audit

`Source ✓` means the cited files were inspected and updated as necessary. It does **not** mean that the prior hosted preview reflects the change, or that all browser tests were completed in this environment.

| Request raised in chat or annotations | Implemented in source | Status |
|---|---|---|
| Change **engineer** to **developer**, including hero/SEO | `src/content/profile.json`, `src/app/layout.tsx` | Source ✓ |
| Make the hero for **job opportunities**, not client hunting | `profile.json`, `PortfolioHome.tsx`, `ContactSection.tsx` | Source ✓ |
| Retain personal name, portrait, past role, and experience | `profile.json`, `HeroVisual.tsx`, `PortfolioHome.tsx` | Source ✓ |
| Give Zayed a **reusable ZI logo** | `BrandMark.tsx`, `public/brand/*.svg`, header/footer/favicon | Source ✓ |
| Use TechQuell colors and three-font system | `styles/motion.css`, `foundations.css`, `layout.tsx` | Source ✓ |
| Make the personal name in the footer lavender | `SiteFooter.tsx`, `styles/personal.css` | Source ✓ |
| Keep **dark → light → dark** chapter transitions | `PortfolioHome.tsx`, `ExperienceRuntime.tsx` | Source ✓ |
| Keep complete motion, smooth scroll, project-hover preview | `ExperienceRuntime.tsx`, `ProjectIndex.tsx`, `motion.json` | Source ✓ |
| Present *client communication* as skills learned in previous job | `profile.json`, `process.json`, `collaboration.json` | Source ✓ |
| Show requirements, proposal, architecture, development, launch and ongoing support | `process.json`, `ProcessSection.tsx` | Source ✓ |
| Avoid excessive client focus in headline | `profile.hero`, contact hero and intro | Source ✓ |
| Preserve four “Why teams can rely on me” principles | `profile.principles`, `WhyChooseMe.tsx` | Source ✓ |
| Make **Why me** and **About** chapters breathe more | `styles/home.css` | Source ✓ |
| Align About image and copy columns | `styles/home.css` | Source ✓ |
| Explain from client contact to product delivery/support | `process.json`, `ClientCollaboration.tsx` | Source ✓ |
| Frontend: Framer Motion, GSAP, TypeScript, PWA, IndexedDB, service workers | `skills.json` | Source ✓ |
| Frontend: **TanStack Query** | `skills.json` | Source ✓ |
| Backend: TypeScript and real project technologies | `skills.json` | Source ✓ |
| Cloud/hosting: **Hostinger** | `skills.json` | Source ✓ |
| Feature **Elite → SunTech POS → Scene Ads**, replacing Event Planner | `projects.json`, redirect in `lib/portfolio.ts` | Source ✓ |
| Show **“View project”** rather than “View case study” on cards/previews | `ProjectIndex.tsx` | Source ✓ |
| Reuse projects/content data in case-study/detail pages | `lib/portfolio.ts`, `ProjectDetail.tsx` | Source ✓ |
| Point all résumé PDF actions to user-supplied Google Drive file | `profile.resume.url`, header, hero, About, résumé | Source ✓ |
| Preserve interactive résumé UI/Code feature | `ResumeIde.tsx` | Source ✓ |
| Remove unnecessary hero **coordinates and star decoration** | `HeroVisual.tsx`, `styles/home.css` | Source ✓ |
| Restore natural portrait color, avoid grayscale | `styles/home.css` (saturation/brightness, no grayscale), `HeroVisual.tsx` high-quality image | Source ✓; live visual not retested |
| Make sound enabled **by default** | `motion.json`, `SoundControl.tsx` | Source ✓; browser gesture still required by many browsers |
| Prevent a first-click sound-toggle race | `SoundControl.tsx` | Source ✓ |
| Add `mt-1`-equivalent top spacing to lavender title highlights | `foundations.css`, `CapabilitiesSection.tsx`, `ProcessSection.tsx` | Source ✓ |
| Increase visual gap between lavender backgrounds and heading lines | `.title-highlight` in `foundations.css` | Source ✓ |
| Remove old meaningless hero bottom strip | `PortfolioHome.tsx` (no strip in hero) | Source ✓ |
| Make long SDLC cards concise and professionally aligned | `ProcessSection.tsx`, `styles/process.css` | Source ✓ |
| Increase SDLC section height so content/buttons are not cramped | `styles/process.css` desktop minimum and pinned-height allocation | Source ✓ |
| Turn **mobile SDLC** into an understandable vertical timeline | `ProcessSection.tsx`, mobile styles | Source ✓ |
| Fix **Previous/Next** alignment on mobile | `.sdlc-controls-actions` equal-width, two-column mobile grid | Source ✓ |
| Fix cramped hero button alignment on phones | `styles/home.css` full-width stacked CTAs | Source ✓ |
| Preserve all sections on narrow phone/tablet/desktop | Responsive rules across styles | Source ✓; device-specific visual testing pending |
| Use **real Nodemailer delivery** instead of automatically opening Outlook | `ContactSection.tsx` submits `/api/send-mail`, API uses server-only SMTP | Source ✓; needs host secrets and end-to-end test |
| Never claim a message was sent in demo mode | `src/app/api/send-mail/route.ts` returns 503 if SMTP is not configured | Source ✓ |
| Keep contact validation, error states, the visitor's draft and direct contact fallback | `src/lib/contact.ts`, `ContactSection.tsx` | Source ✓ |
| Maintain personal, believable voice; no invented metrics or results | Existing `profile.json`, `projects.json`, content guides | Source checked; editorial judgement remains subjective |

## Source quality checks performed for this release

- **40 TS/TSX files:** TypeScript compiler parser reported **0 syntax errors** (syntax only, not type checking).
- **6 content JSON files:** valid JSON.
- **CSS styles:** stylesheet parser reported **0 syntax-level errors**.
- **18 dependency-free release assertions:** passed with `node scripts/audit-release.mjs`.
- Project covers and logo/audio files: verified present by source assertions.
- Checked for plaintext SMTP credentials in packaged application files; no `.env.local` should be included.

## Checks NOT completed in this environment

The package registry DNS request failed (`EAI_AGAIN`), so a clean `npm ci`, `npm run check` (full TypeScript/ESLint/tests), `npm run build`, and the running Next.js browser checks **could not be executed here**. The previous version's test results do **not** certify this new release. The existing live preview also has **not been republished**. No production SMTP credentials are available, and no real email was sent during this audit.

On a networked machine, run:

```bash
npm ci
npm run audit:release
npm run check
npm run format:check
npm run build
npm run dev
```

Then inspect homepage, `/resume`, all three `/projects/…` pages, the mobile menu, project pointer preview, chapter transition, sound toggle and contact submission at **320, 360, 390, 430, 768, 900, 1024, 1200, 1440, and 1920px**. Also test both short and tall browser heights (e.g., 667, 800, 900, 960px). The SDLC pins only at **1200+px wide and 960+px high**; smaller viewports display scrollable cards or a vertical mobile timeline. Verify keyboard controls and no horizontal page overflow.

## Production email release gate

1. Deploy this as a real **Next.js server application**, not a static export.
2. In the host's server environment, set `EMAIL_USER`, `EMAIL_PASS` and optionally `EMAIL_TO`. For a non-Gmail provider, configure `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`.
3. Never place SMTP credentials in public JSON, Git, frontend env variables or the distributed ZIP.
4. From the deployed domain, send a controlled real test message; confirm inbox receipt, reply-to, rate limits and error feedback.
5. The visible `Email me directly` link is only a user-initiated fallback; submitting the contact form never opens Outlook.

**Publishing the revised source to the existing private ChatGPT Sites URL requires the Sites publishing connection.** Do not describe the old site as updated until a new deployment has actually succeeded and its browser output is checked.
