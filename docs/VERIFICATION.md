# Current release checks

The homepage, résumé, login and three project pages were measured in Chrome at 320, 375, 420, 768, 1024, 1280, 1440 and 1920 CSS pixels. All 48 combinations had zero page-level horizontal overflow. At 320px, the hero actions stacked and the Next control expanded Requirements.

The test suite covers the Node mail handler and the Sites relay, including rejection of the original archive’s demo-success response. Inbox delivery remains unverified. The release build instructions are in [Portfolio hosting](HOSTED_REVIEW.md).

# Prior verification and release notes

Revision reviewed: 21 November 2026

## Scope and current status

This revision updates Zayed’s personal portfolio for full-stack developer job opportunities. It covers the 11 annotated changes, the previous-role SDLC and communication narrative, reusable branding, responsive corrections, and the user-maintained résumé link. See [PERSONAL_PORTFOLIO_UPDATE.md](PERSONAL_PORTFOLIO_UPDATE.md) for the change checklist.

Code checks, both production builds, and the final responsive visual follow-up passed. The publication workflow builds and commits this exact source before deployment; the resulting deployment receipt is the authority for publication status.

## Automated checks

| Target                             | Check            | Observed result                                                               |
| ---------------------------------- | ---------------- | ----------------------------------------------------------------------------- |
| Hosted static-export checkout      | `npm run check`  | Exit 0: route types, TypeScript, ESLint, and all 28 tests passed.             |
| Downloadable Node/Next.js checkout | `npm run check`  | Exit 0: route types, TypeScript, ESLint, and all 28 tests passed.             |
| Node/Next.js checkout              | `npm run build`  | Exit 0: 12 pages generated, with the contact API retained as a dynamic route. |
| Hosted static-export checkout      | Production build | Exit 0 through the Sites build helper; static output generated successfully.  |

The tests cover content validation, project handling, local asset references, contact validation, and the mail endpoint with a mocked transport. They do not send email. No fresh dependency-audit result or clean-ZIP installation result is claimed for this revision.

## Browser review performed

The review used real Chrome with CSS viewport widths of 320 and 390 pixels, and viewport sizes of 768 × 1024, 1000 × 800, and 1363 × 936. Phone and tablet layouts were exercised through a same-origin test iframe. These are responsive browser checks, not physical iOS/Android device tests. Temporary QA pages are not part of the source release.

- Reviewed all ten home sections and checked for page-level horizontal overflow in the reviewed layouts.
- Exercised the phone navigation menu, skills accordion, and all seven SDLC stage controls.
- Verified desktop SDLC pinning and horizontal movement in both scroll directions, including clamping at the last card.
- Checked About portrait/text alignment on desktop and tablet.
- Opened all three case-study pages at phone width and inspected their titles and images; expanded a SunTech feature disclosure.
- Exercised all four interactive résumé tabs, keyboard selection, and the Code view at 320 pixels.
- Checked contact validation on a phone-width layout. No external inquiry or email was sent.

### Corrections made during this review

- Adjusted the portrait caption for the 320-pixel layout.
- Changed narrow tablet collaboration columns to readable rows.
- Enlarged small résumé controls to 44/50-pixel targets and relevant text to 14/16 pixels.
- Kept the collaboration emphasis on eligible on-screen cards and synchronized its progress and stage changes to one CSS animation clock.

The final visual follow-up confirmed readable tablet collaboration rows: cards measured 681 pixels wide by 367 pixels high, with two clear internal columns and no page overflow. Active emphasis moved among the on-screen cards. At 320 pixels, the portrait caption fit within its 270-pixel square without overflow. A fresh desktop reload showed the latest job-focused hero, custom ZI logo, and correct résumé destination, with no new application console errors.

## Résumé destination

The canonical résumé URL is stored once in `src/content/profile.json`:

<https://drive.google.com/file/d/1bEXAXtgnZEVilVaPirP2-XD2PuprHE7Q/view?usp=sharing>

Desktop/mobile navigation, the hero, About, and the interactive résumé’s PDF action use this value. External résumé links open a new tab with `noopener noreferrer`. The optional `/resume` route remains available directly; “Explore my experience” points to the home experience section.

The Drive PDF rendered in a signed-out browser tab: the Sign in control remained visible, and no permission-request wall appeared. Literal Incognito mode was disabled by the browser organization policy. Signed-out viewing was observed; a separate Incognito session was not tested.

## Deliberate behavior and limits

- Full motion remains enabled by default, including when the operating system requests reduced motion, following the owner’s explicit instruction. Touch scrolling remains native.
- The collaboration sequence uses a 3.6-second progress cycle, only eligible visible cards, and a user pause control. It pauses in hidden tabs. The control does not pause every animation on the site.
- Sound remains opt-in. No audio-device compatibility claim is made.
- The hosted review uses an explicitly labeled email-draft contact flow. The Node source retains its optional SMTP endpoint; actual delivery needs mail-service configuration.
- No real email was sent and no external account access settings were changed during these checks.
- No Lighthouse score, comprehensive assistive-technology audit, cross-browser certification, or physical-device certification is claimed.

## Release packaging

The source archive contains the Node/Next.js application, editable JSON, local assets, lockfile, environment example, and documentation. Dependency folders, generated build output, credentials, and temporary QA files are excluded. Source-archive integrity is checked after packaging; the final handoff reports that result and the published deployment.

## Published revision

The matching hosted application was published successfully on 21 November 2026. Source commit: `e2c6e69559c9f2a0a479175aa9f52ed624b57a1d`.

<https://zayed-iqbal-techquell-portfolio.flowy-bun-1694.chatgpt.site>

The hosted version uses the documented email-draft contact flow. This downloadable source retains the configurable Node SMTP API. Shared portfolio components, content, styles, and assets match.


## Follow-up mobile UI source changes — 21 November 2026

These source-only changes were made after the earlier published-site review recorded
above. They have **not** been republished to the existing ChatGPT Sites URL.

- Removed the overlaying mobile project action so screenshots remain readable.
- Simplified the hero CTA arrow and stacked the phone actions.
- Made the phone/tablet development lifecycle a seven-stage vertical timeline
  with collapsible explanations, client/team touchpoints, key outputs and outcomes.
- Increased the desktop process section's minimum height and improved both
  card-column alignment and navigation control prominence.
- Left the source's `motion.sound.defaultOn` setting at `true`; the browser may
  require a gesture before actual audio is permitted.

**What was checked for this follow-up:** `npm run audit:release` passed 19 source
assertions, with no whitespace errors from `git diff --check`. The source-derived
HTML/CSS preview was examined using local Chromium at 320, 375, 430, 768,
1024, 1440 and 1600 CSS-pixel widths; the mobile accordion and desktop stage
controls were exercised and no page-wide horizontal overflow was observed.
This preview does not execute the Next.js/React runtime, GSAP, SMTP API, or
real production deployment. `npm ci --offline` was blocked by an unavailable
package tarball, so full TypeScript/ESLint/test/build execution and hosted
browser QA remain release gates. No email was sent.
