# Portfolio content guide

The personal portfolio retains TechQuell’s lavender palette and motion language, with its own ZI identity and a client-focused developer narrative. Structured content lives in JSON. The public project index, case studies, résumé, working principles, and SDLC sections read content through `src/lib/portfolio.ts`.

## Where to edit

| File                        | What it controls                                                                                            | Used by                                   |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `src/content/profile.json`  | Identity, contact details, biography, portrait, résumé URL, social links, employment, education, principles | Home, contact, résumé                     |
| `src/content/projects.json` | Project order, visibility, summaries, screenshots, case-study detail, live/source links                     | Work index, case-study pages, sitemap     |
| `src/content/skills.json`   | Skill groups, descriptions, technology names                                                                | Capabilities section and résumé           |
| `src/content/process.json`  | Working-process steps                                                                                       | Process section                           |
| `public/images/projects/`   | Local screenshots for the three projects                                                                    | Work previews, mobile cards, case studies |
| `src/lib/portfolio.ts`      | Validation, shared types, lookup helpers, legacy project redirects                                          | Content consumers and tests               |

Edit project content in `src/content/projects.json`. Pages, metadata, and the sitemap all consume the validated content exported by `src/lib/portfolio.ts`.

### Editorial copy and content data

The home hero uses `profile.hero.headline.first` and `profile.hero.headline.second` for its two display lines, and `profile.hero.signature` for the italic accent statement. Keep these short so the large display type remains balanced on small screens. Other section statements are editorial copy in `src/components/portfolio/PortfolioHome.tsx` and its section components.

The hero uses `profile.fullName`, `profile.hero.description`, and `profile.portrait`. The About section uses all three `profile.about.paragraphs`; its heading is editorial copy in `PortfolioHome.tsx`. Fields such as `profile.hero.eyebrow`, `profile.hero.availability`, and `profile.about.title` are retained in the content model but are not all displayed by the current home layout. The redundant hero metadata strip has been removed.

This distinction matters: JSON edits update the components that consume those fields. They do not automatically create a new section or change the page’s composition.

## Editing a project

Each object in `projects.json` follows the same structure.

| Field         | Type              | Purpose and rules                                                                           |
| ------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `id`          | String            | Stable unique identifier. Do not reuse another project’s ID.                                |
| `slug`        | String            | URL segment: lowercase letters, digits, and hyphens, such as `suntech-pos`. Must be unique. |
| `order`       | Positive integer  | Controls index and “Next project” order. Use distinct ascending values.                     |
| `visible`     | Boolean, optional | Defaults to `true`. `false` removes it from the public index, case lookup, and sitemap.     |
| `title`       | String            | Public project name.                                                                        |
| `category`    | String            | Short classification displayed beside the name and in metadata.                             |
| `tagline`     | String            | The case-study introduction.                                                                |
| `summary`     | String            | Short description for the screenshot caption and social metadata.                           |
| `description` | String            | Detailed product overview and search description.                                           |
| `role`        | String            | The role actually held on this project.                                                     |
| `timeline`    | String or `null`  | A verified date or duration. Use `null` when it is not supplied.                            |
| `cover`       | Object            | Local image path, useful alt text, and crop position.                                       |
| `metrics`     | Array             | Optional factual `{ "label", "value" }` pairs. An empty array is valid.                     |
| `features`    | Array             | `{ "title", "description" }` entries shown as animated case-study disclosures.              |
| `techStack`   | String array      | Technologies actually used on that project.                                                 |
| `learnings`   | String array      | Specific implementation lessons or responsibilities that can be supported.                  |
| `links`       | Object            | `live`, `client`, and `server`, each a complete HTTP(S) URL or `null`.                      |

The work index links to the project’s own case study first. Live websites and source repositories are separate actions within the case study. A missing source link is omitted; use `null`, never `"#"`, `""`, or a made-up repository URL.

### Current project inventory

1. Elite Central Vacuum — commerce and field-service platform.
2. SunTech POS — multi-tenant point of sale, catalog, inventory, and branch workflows.
3. Scene Ads — outdoor advertising and campaign workflows.

Elite and Scene retain the detailed information from the supplied portfolio source. Scene’s unsupported latency figures were removed. Its original `2024 / 6 Weeks` timeline remains user-supplied content; verify it before changing or making stronger claims. SunTech has no invented timeline or source repository link.

### Add another project tomorrow

1. Put its screenshot in `public/images/projects/`, using a descriptive filename such as `new-project.webp`.
2. Copy a project object in `projects.json`.
3. Change its `id`, `slug`, `order`, and all descriptive fields. Never leave copied claims or technology names that do not apply.
4. Set `visible: false` while completing the entry.
5. Supply an accurate `cover.alt` and check the crop.
6. Use `null` for any unavailable live/source URL and any unknown timeline. Optional content arrays may be empty.
7. Set `visible: true` when ready.
8. Run `npm run check`, then `npm run build`.
9. Open the work index and the new `/projects/<slug>` route. Check desktop hover, keyboard focus, and the mobile screenshot.
10. Deploy the new build to make the content available on the shared URL.

A draft template:

```json
{
  "id": "new-project",
  "slug": "new-project",
  "order": 4,
  "visible": false,
  "title": "Replace with the project name",
  "category": "Replace with its product category",
  "tagline": "Describe the product in one clear sentence.",
  "summary": "A short, accurate summary of the project.",
  "description": "Explain what the project does, who uses it, and what work you contributed.",
  "role": "Replace with the role you actually held",
  "timeline": null,
  "cover": {
    "src": "/images/projects/new-project.webp",
    "alt": "Describe the visible product screen and its main content",
    "position": "center top"
  },
  "metrics": [],
  "features": [],
  "techStack": [],
  "learnings": [],
  "links": {
    "live": null,
    "client": null,
    "server": null
  }
}
```

The template is deliberately hidden. Add the image and replace every placeholder before publishing it.

## Images and alt text

Use local paths beginning with `/images/`. `/images/projects/suntech-pos.webp` maps to the real file `public/images/projects/suntech-pos.webp`; do not include `public` in the JSON URL.

Supported extensions are AVIF, GIF, JPG/JPEG, PNG, SVG, and WebP. Use simple filenames with letters, numbers, hyphens, or underscores. External image URLs, traversal segments, URL query strings, and unsupported file types are rejected by content validation.

You can replace a screenshot while keeping the same filename. For a deliberate asset update on a CDN or a Next.js image cache, a new filename such as `suntech-pos-v2.webp` is more dependable: update `cover.src` to match and publish the new build. This is preferable to asking visitors to clear their browser cache.

The image is cropped to fit its presentation:

- `"center top"` prioritizes the top of a website screenshot.
- `"center center"` centers a dashboard or composition.
- A position such as `"50% 20%"` can emphasize a particular part of the image.

Use a clean screenshot with enough resolution for the large case-study image. Keep important interface content within the crop. Avoid embedding essential explanatory text only in an image.

Alt text should describe the meaningful image, for example: “SunTech POS sales screen with product selection and checkout.” Do not use a filename or just “image.” The decorative cursor-following copy of the screenshot is hidden from assistive technology; the mobile and case-study images use the supplied descriptive alt text.

The personal hero portrait uses `profile.portrait.src` and `profile.portrait.alt`. The secondary About photo currently comes from `/images/fb.jpg` in the home component.

## Profile, résumé, and employment

`profile.role` is the current professional positioning: **Full Stack Developer**. The historical SoftVence job is deliberately recorded as **Jr Full Stack Developer**. Editing the current role must not silently promote a historical job title.

The résumé’s four tabs derive from the same JSON as their Code views:

- Experience: `profile.experience`.
- Skills: `skills.json`.
- Ethos: `profile.principles`.
- Education: `profile.education`.

Copy copies the generated text for the active tab. A failed clipboard operation displays an error and switches to Code so the text can be selected; it never reports a false success.

There is one canonical résumé link in `profile.resume.url`. The About CTA and the résumé’s PDF action use it. Replace that URL when the document changes and verify that visitors can view the document without needing access to your private Google Drive account. The action opens the supplied document; it does not fabricate a new downloadable PDF.

Contact details and social links also live in `profile.json`. Social objects use `url`, not `href`. Changing the displayed contact address does not necessarily change mail-server configuration; check the contact deployment instructions before changing inbox delivery.

## Skills and process

A skill group contains `id`, `title`, `description`, `items`, and `application`. The `application` object supplies the title, three-step flow, explanation, and real project/process link for the selected skills panel. Keep IDs stable and unique. Add or remove an item in `items` to change both the capabilities display and the résumé. Categorize AWS S3 with cloud/storage rather than databases.

A process step contains `id`, `number`, `label`, `title`, `description`, `clientTouchpoint`, `deliverables`, and `outcome`. The array order is the display order. These seven stages cover client discussion, requirements, proposal, architecture, development/testing, delivery/deployment, and ongoing support. The compact introduction flow and detailed SDLC section share this data. Keep the sequence and numbering consistent when rearranging steps.

`src/content/collaboration.json` controls the three client-communication cards: before development, during development, and after delivery. All card text and checklists are editable there. Their animated emphasis advances every 3.6 seconds while the section is visible, and the visitor can pause it; the full content stays readable throughout.

The four principles in `profile.principles` drive both the new “Why teams can rely on me” home section and the résumé’s Ethos view. They preserve the original résumé’s ownership, disciplined execution, teamwork, and integrity themes in plain language.

GSAP, PWA, IndexedDB, service workers, and Hostinger are user-declared personal skills. This inventory does not claim that every project uses them. In particular, do not add offline POS or synchronization claims to the SunTech case study without confirmed project information.

## Personal logo

`BrandMark` and `BrandWordmark` in `src/components/portfolio/BrandMark.tsx` are the reusable ZI logo components. They are used in navigation, the short loading introduction, and the footer. The mark inherits the current theme’s accent, while standalone dark/light SVG assets live in `public/brand/`. `public/icon.svg` uses the same geometry for the browser tab. Keep all exported geometry in sync when changing the logo.

These lists describe real capabilities and practices. Do not populate them with every technology that appears in a visual reference or library demo.

## Old project links and missing pages

`src/lib/portfolio.ts` defines the legacy redirects. The case-study route uses that shared contract:

| Old URL segment | Destination                      |
| --------------- | -------------------------------- |
| `event-planner` | `/projects/suntech-pos`          |
| `01`            | `/projects/elite-central-vacuum` |
| `02`            | `/projects/scene-ads`            |
| `03`            | `/projects/suntech-pos`          |

These are permanent redirects. The numeric URLs preserve the old portfolio’s project mapping; they are not generated from the current sort order. Unknown project slugs return the normal not-found page.

If you change a published slug, add a deliberate redirect for the previous URL. If you hide or remove a project that is a redirect destination, update the redirect too. Content tests flag missing redirect destinations.

## Rebuild and deployment behavior

These JSON files are bundled with the application. They are not a live remote CMS.

- During `npm run dev`, saving a file normally refreshes the affected page. Reload if a tool holds an older view.
- A running production server or a previously deployed URL continues serving its existing build until a new build is deployed.
- JSON changes, project additions, renamed image files, metadata changes, and résumé URL changes should all be included in a new production build and deployment.
- An uploaded source ZIP does not update a hosted website by itself.
- Compare the same version locally and on the deployed URL when reviewing changes.

## Content checks

`npm run check` includes types, lint, and automated tests. The content tests cover duplicate IDs/slugs, requested project ordering, safe local images that exist, useful alt text, URL/null handling, preservation of substantive case content, removal of the old latency claims, valid legacy destinations, and the distinction between the current role and historical employment title.

Before publishing content changes, also review the actual page:

- Project name, screenshot, category, and destination match.
- The cursor preview follows the pointer; keyboard users can focus the same case links.
- Mobile users see the screenshot without needing a hover.
- The case study has no empty placeholders or invented results.
- Source buttons only appear for real supplied URLs.
- The résumé PDF link is current and publicly viewable.
- Longer titles and technology lists wrap without covering controls.

Do not add fabricated clients, awards, project counts, revenue, latency, uptime, conversion figures, employment dates, or seniority. A credible explanation of the actual work is better than an unsupported metric.
