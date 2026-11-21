# Zayed Iqbal — personal portfolio

For the ChatGPT Sites release and the Netlify contact endpoint, see [Portfolio hosting](docs/HOSTED_REVIEW.md). Use `npm run build` for Node or Netlify and `npm run build:sites` to reproduce the Sites release.


A complete Next.js + TypeScript source project, rebuilt from the supplied personal portfolio with TechQuell’s charcoal/lavender palette, Big Shoulders Display, Manrope, Instrument Serif, and connected motion design.

This is the actual application source. It includes the pages, components, JSON content, local images, sound files, tests, dependency lockfile, and deployment configuration.

## Run locally

Use Node.js 22 LTS or a newer supported version. The repository includes `.nvmrc`.

```bash
npm ci
npm run dev
```

Open the local address printed by Next.js. No environment variables are required to view the portfolio. The contact form needs your SMTP credentials to deliver email.

For the production build:

```bash
npm run build
npm start
```

For the verification suite:

```bash
npm run check
npm run format:check
npm audit
```

`typecheck` generates Next.js route types before checking TypeScript, so it works on a fresh extraction. `scripts/dev.mjs` forwards normal Next.js arguments and also translates generic preview-runner host flags; it does not change production behavior.

## What is included

- A personal hero with your existing portrait, an original reusable ZI monogram, short branded intro, and editable introduction.
- Dark hero/intro/project chapters, a light expertise/process middle, and dark principles/about/experience/collaboration/contact chapters.
- A morphing desktop header and animated mobile navigation.
- Lenis smooth wheel scrolling coordinated with one GSAP ticker.
- Cursor-following project previews, eased image crossfades, inactive-project focus blur, and keyboard/touch alternatives.
- A contained horizontal process scene on sufficiently tall desktops. Short desktops can browse a horizontal track; phones and tablets use a readable, expandable seven-stage timeline.
- Seven SDLC stages and four working principles, grounded in previous-role experience.
- A visible-card collaboration sequence with a single 3.6-second clock and pause control.
- A complete interactive résumé with four tabs and UI/Code views.
- Three detailed project pages: Elite Central Vacuum, SunTech POS, and Scene Ads.
- A genuine server-side contact endpoint with validation and honest failure states.
- Interaction sound is configured on by default and attempts to unlock on the first permitted user interaction; browser autoplay restrictions still apply.
- Local font packages and optimized local project imagery.

Motion remains enabled regardless of the operating system’s reduced-motion setting, following the project’s explicit direction. Native touch scrolling is preserved. The collaboration sequence has an explicit pause control; sounds have their own visible on/off control.

## Edit content

| Change                                                                          | File                                                                |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Name, contact details, portrait, hero lines, experience, education, résumé link | `src/content/profile.json`                                          |
| Project order, titles, case studies, technologies, URLs and images              | `src/content/projects.json`                                         |
| Expertise groups and technologies                                               | `src/content/skills.json`                                           |
| Lifecycle stages                                                                | `src/content/process.json`                                          |
| Before/during/after-development collaboration                                   | `src/content/collaboration.json`                                    |
| Scroll/theme timings and sound volume                                           | `src/content/motion.json`                                           |
| Palette, typography, shared spacing                                             | `src/styles/foundations.css` and `src/styles/motion.css`            |
| Section statements and composition                                              | `src/components/portfolio/PortfolioHome.tsx` and section components |

Projects are sorted by `order`. Set `visible: false` to keep a draft out of the public project list and routes. Use `null` for a source URL you do not yet have. Replace screenshots in `public/images/projects/`, or update `cover.src` to another image under `public/images/`.

JSON changes appear during development; rebuild/redeploy for production. These files are the content source, not a separate online CMS.

The current résumé navigation uses the Google Drive URL in `profile.resume.url`; change that field once to update every PDF link. The interactive `/resume` page remains available as a direct route.

Read [the content guide](docs/CONTENT_GUIDE.md) for the full schema and a practical add-project example.

## Structure

- `src/app/` — routes, metadata, error/loading states, and the mail API.
- `src/components/portfolio/` — reusable portfolio sections and project presentation.
- `src/components/experience/` — motion lifecycle, cursor, shared button motion, intro, and audio.
- `src/components/resume/` — the interactive résumé.
- `src/content/` — editable JSON.
- `src/lib/` — validated content, anchor handling, contact validation, and site origin.
- `src/styles/` — shared design tokens and section-specific styles.
- `public/images/` — your portraits and replaceable project images.
- `public/brand/` — standalone dark/light variants of the personal ZI mark.
- `public/sound/` — five short interaction cues.
- `tests/` — meaningful content and mail API checks; email transports are mocked.
- `docs/` — content, architecture, deployment, and verification notes.

The full root layout stays a server component. Only interactive sections use client components. The page owns its animation runtime so motion cannot mutate an outgoing or not-yet-hydrated page.

## Contact form and deployment

Copy `.env.example` to `.env.local` if you want to configure mail delivery locally. On your host, set the corresponding server environment variables. Do not commit credentials.

- `EMAIL_USER` and `EMAIL_PASS`: SMTP account and provider app password/credential.
- `EMAIL_TO`: optional fixed destination; otherwise `EMAIL_USER`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`: optional non-Gmail configuration.
- `NEXT_PUBLIC_SITE_URL`: the final site origin used for metadata and sitemap.

A missing SMTP configuration returns a real unavailable state; the interface keeps the draft and offers direct email. No test messages were sent during development.

Deploy this as a Next.js source project on Vercel, Netlify, or another compatible Node host. It is not a static drag-and-drop export, because the contact endpoint needs server execution.

Read [contact and deployment details](docs/CONTACT_AND_DEPLOYMENT.md).

## Preserved history and deliberate cleanup

- Featured work is Elite → SunTech POS → Scene Ads.
- The old Event Planner case URL permanently redirects to SunTech POS.
- The current professional headline and historical “Jr Full Stack Developer” job title remain distinct.
- One canonical résumé PDF URL replaces the original conflicting links.
- Original decorative skill-image collections and the unused background video were removed from this release.
- Legacy UI, duplicated cursor/theme systems, and unused animation packages were removed.
- The source archive did not contain dashboard pages. `/login` explains that state honestly. The old backend login integration is retained for future owner-workspace work, but no dashboard was invented.
- The original uploaded ZIP was left untouched.

## Further documentation

- [Content editing](docs/CONTENT_GUIDE.md)
- [Architecture and motion](docs/ARCHITECTURE_AND_MOTION.md)
- [Contact and deployment](docs/CONTACT_AND_DEPLOYMENT.md)
- [Verification and known limits](docs/VERIFICATION.md)

This source revision was prepared on 21 November 2026. It has not been published to the existing ChatGPT Sites deployment; use the original site editor/publishing connection to replace that deployment and enable annotations. The SMTP endpoint requires a real Next.js server host and configured credentials.
