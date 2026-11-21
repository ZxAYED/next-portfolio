# Zayed — developer opportunities portfolio update

## Purpose

Present Zayed for full-stack developer job opportunities. The hero introduces his Next.js, TypeScript, and NestJS skills and his interest in contributing to a product team. The project and résumé actions help employers assess his work. Contact copy invites a conversation about a role and team.

Client communication, proposals, SDLC decisions, delivery, and support are skills developed in his previous role at SoftVence. The personal site keeps the established lavender palette, fonts, and smooth scrolling, while replacing repeated agency content with his professional experience and working approach.

## The 11 annotation changes

This checklist records the implementation. Browser and release verification are recorded separately in [VERIFICATION.md](VERIFICATION.md).

| #   | Request                                | Implementation                                                                                                                                             |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Use developer for the role             | “Full Stack Developer” in the hero, profile, project roles, résumé, metadata, and social preview. Historical employment remains “Jr Full Stack Developer.” |
| 2   | Create a reusable logo                 | Original ZI monogram in `BrandMark`/`BrandWordmark`, reused in navigation, loader, footer, and login; dark/light SVG exports and favicon.                  |
| 3   | Explain SDLC and add why-me principles | `LifecycleStrip`, seven-stage `ProcessSection`, and `WhyChooseMe`, backed by shared JSON.                                                                  |
| 4   | Expand frontend skills                 | TypeScript, Framer Motion, GSAP, PWA, IndexedDB, service workers, and supporting frontend tools.                                                           |
| 5   | Expand backend skills                  | TypeScript and project-supported tools including Socket.IO, BullMQ, JWT/RBAC, SSE, and Gemini.                                                             |
| 6   | Add Hostinger                          | Included in cloud and delivery skills.                                                                                                                     |
| 7   | Align the About columns                | Portrait and copy share a stretching desktop grid and stack at the mobile breakpoint.                                                                      |
| 8   | Replace decorative craft copy          | `ClientCollaboration` explains communication before development, during development, and after delivery, grounded in the previous SoftVence role.          |
| 9   | Add lavender to the footer             | The large personal wordmark uses the primary lavender token.                                                                                               |
| 10  | Highlight parts of headings            | Lavender backgrounds with dark ink emphasize selected intro, skills, lifecycle, and why-me phrases.                                                        |
| 11  | Remove the hero-bottom strip           | Removed the generic “Design. Develop. Deliver.”, scroll prompt, and worldwide metadata strip.                                                              |

## Original four principles

The four themes come from `src/components/resume/ResumeIde.tsx` in the original uploaded portfolio. Its separate home “Why You Need Me” section had six qualities; these four belong to the résumé ethos.

| Original title                        | Current presentation                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Extreme Ownership                     | Extreme ownership — responsibility for the brief, work quality, delivery, and follow-through.                 |
| Disciplined Execution Over Raw Talent | Disciplined execution — consistent effort, clear milestones, focused work, and methodical problem-solving.    |
| High-EQ Alignment & Teamwork          | Clear communication & teamwork — listening, explaining decisions, and keeping teammates aligned.              |
| Uncompromising Ethics & Integrity     | Professionalism & integrity — honest scope discussions, responsible data handling, and maintainable software. |

`profile.json` is the shared source for these principles on the home page and résumé.

## Personal experience and lifecycle

The detailed workflow covers client discussion, requirements, proposal, architecture, build and test, delivery and deployment, and ongoing support. Each stage includes a client touchpoint, deliverables, and an outcome. `process.json` supplies both the introductory flow and the detailed journey.

The applied-skills panel explains how each discipline supports a product workflow and links to relevant work. `collaboration.json` supplies the three communication cards; their timed emphasis stays synchronized with progress, pauses offscreen, and has an explicit pause control. This replaces the former type/signal/layer studies and generic worldwide pitch.

## Résumé and responsive refinements

The user-maintained résumé is the Google Drive document at <https://drive.google.com/file/d/1bEXAXtgnZEVilVaPirP2-XD2PuprHE7Q/view?usp=sharing>. Its URL lives once in `profile.json`. The desktop/mobile header, hero, About, and PDF action in the optional direct `/resume` page all use that value. The server layout passes only the URL into the client header. “Explore my experience” instead links to the home experience section.

Responsive refinements include a narrower-screen portrait caption, tablet collaboration rows, and larger mobile résumé controls and text. The SDLC track retains all seven stages, with desktop pinning and smaller-screen scrolling/navigation. Collaboration cycles run only on eligible visible cards, so a card outside the current view does not consume the visitor’s animation cycle. See [VERIFICATION.md](VERIFICATION.md) for tested viewport sizes and outstanding final checks.

## Content boundaries

The copy reflects the user’s stated experience and working approach. It adds no client counts, revenue, uptime, awards, seniority, certifications, or guaranteed outcomes. PWA/IndexedDB are skills; the SunTech case study does not claim a completed offline-sync feature. The external résumé remains the user’s maintained document.

## Delivery targets

Historical note (earlier deployment only): The private hosted review used a static export with an email-draft contact flow. The updated source now posts to the Nodemailer API and needs a server-capable Next.js deployment; these latest changes have not been published to that review URL. The downloadable Node/Next.js source retains the optional SMTP endpoint. Shared UI and JSON changes should be copied to both delivery targets before a new source archive is released.
