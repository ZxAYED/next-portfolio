# Architecture and motion

This is Zayed’s personal portfolio for full-stack developer opportunities, built with the visual language of the supplied TechQuell source: dark charcoal, lavender accents, oversized display typography, editorial serif details, and deliberate interaction timings. The hero and contact address employers. Client communication and delivery are presented as skills developed in his previous SoftVence role. Agency service claims and agency-wide project ownership are not copied into the personal site.

The application uses the Next.js App Router, React, TypeScript, plain CSS, GSAP with ScrollTrigger, and Lenis. There is no WebGL scene, canvas cursor, Tailwind dependency, or second animation framework. The checked-in package lock is the dependency source of truth.

## 1. File ownership and rendering boundaries

| Area                    | Source                                                                                                           | Responsibility                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Root document           | `src/app/layout.tsx`                                                                                             | Local font imports, metadata, viewport, shared CSS, skip link, one brand intro per document load                |
| Shared public layout    | `src/app/(commonLayout)/layout.tsx`                                                                              | Site header, route content, footer                                                                              |
| Home composition        | `src/components/portfolio/PortfolioHome.tsx`                                                                     | Server-rendered section order and validated data passed to interactive sections                                 |
| Content models          | `src/lib/portfolio.ts`                                                                                           | Zod validation, inferred types, project filtering/order, lookups, legacy URL mapping                            |
| Editable content        | `src/content/*.json`                                                                                             | Profile, projects, skills, lifecycle, collaboration, and motion settings                                        |
| Page enhancement        | `src/components/experience/ExperienceRuntime.tsx`                                                                | Page-owned scroll, palette transitions, entrance reveals, anchor handling, progress, cursor, button enhancement |
| Navigation and identity | `SiteHeader.tsx`, `BrandMark.tsx` in `src/components/portfolio/`                                                 | Responsive navigation and a reusable original ZI monogram with the Zayed wordmark                               |
| Section interactions    | `src/components/portfolio/`                                                                                      | Project previews, case disclosures, applied skills, SDLC journey, collaboration sequence, résumé, and contact   |
| Style foundations       | `src/styles/foundations.css`, `motion.css`, `navigation.css`                                                     | Layout tokens, font roles, palette, controls, cursor, and navigation                                            |
| Section styles          | `home.css`, `personal.css`, `process.css`, `brand.css`, `projects.css`, `resume.css`, `contact.css`, `login.css` | Styles owned by their corresponding features                                                                    |

### Content validation stays at the server boundary

Server components import values from `src/lib/portfolio.ts`. That module parses the JSON before rendering, filters hidden projects, and establishes their order. Client components receive serializable props and use `import type` for `Profile`, `Project`, `SkillGroup`, or `ProcessStep` when needed. A type-only import is erased and does not import the JSON or its portfolio validation code into the client bundle.

The contact section receives only the required profile fields from the server home component. Its small contact-input validation module is deliberately shared between the browser and API; this is separate from portfolio content validation. Zod is therefore still used for client form feedback. Do not claim that the entire Zod library is absent from every browser bundle.

Avoid value imports from `@/lib/portfolio` in a file marked `"use client"`. Such an import would pull the content module, its JSON imports, and schemas into that client graph. The module is currently kept directly importable by the Node content tests, rather than protected with the `server-only` marker; preserving the import boundary remains a code-review responsibility.

JSON is application content, not a remote CMS. Production JSON changes require a rebuild and deployment. See [CONTENT_GUIDE.md](CONTENT_GUIDE.md) for field rules and project additions.

## 2. Palette, type, and layout foundations

### Color roles

The permanent palette tokens live in `src/styles/motion.css`. Components use the active semantic aliases rather than deciding their own theme.

| Active alias | Dark value  | Light value | Role                            |
| ------------ | ----------- | ----------- | ------------------------------- |
| `--canvas`   | `#101014`   | `#f3f1f5`   | Page background                 |
| `--fg`       | `#f0edf4`   | `#17131d`   | Main text                       |
| `--fg-muted` | `#aaa4b2`   | `#62586e`   | Supporting text                 |
| `--line`     | `#ffffff26` | `#21162d26` | Rules and borders               |
| `--surface`  | `#19171e`   | `#eae6ef`   | Raised or secondary surfaces    |
| `--accent`   | `#c3a3ef`   | `#69438c`   | Readable theme-dependent accent |

`--brand-primary` stays lavender (`#c3a3ef`) in both themes. It is the solid primary-button and text-highlight color; `--brand-ink` is the dark text paired with it. The theme-dependent `--accent` becomes darker in the light chapter so accent text remains readable.

The site starts dark. Without JavaScript, explicitly light sections retain their own light palette through a CSS fallback. With the runtime active, section backgrounds become transparent and the page canvas transitions as one continuous surface.

### Font roles

| Token            | Font                           | Use                                                    |
| ---------------- | ------------------------------ | ------------------------------------------------------ |
| `--font-body`    | Manrope Variable               | Body text, navigation, controls, project information   |
| `--font-display` | Big Shoulders Display Variable | Large headlines, major section titles, footer wordmark |
| `--font-serif`   | Instrument Serif               | Italic editorial phrases and contrast within headings  |
| `--font-mono`    | System monospace stack         | Small technical labels and code                        |

The first three fonts are installed through Fontsource and bundled locally. Runtime Google Fonts requests are not required. The original ZI monogram is an inline SVG, so it stays crisp and inherits the active theme color. Matching standalone dark/light marks and wordmarks live in `public/brand/`.

`foundations.css` defines the shared container, responsive gutter, section spacing, radius, and display scales. The container max-width is 1540px. Use `.container` for consistent alignment and `.section` for normal vertical rhythm. The deliberately pinned process section owns its height separately.

## 3. Home page: three visual chapters

| Order | Section       | Theme          | Main behavior                                                                |
| ----- | ------------- | -------------- | ---------------------------------------------------------------------------- |
| 1     | `#home`       | Dark           | Personal hero, portrait composition, primary actions                         |
| 2     | `#intro`      | Dark           | Previous-role context and shared seven-stage lifecycle strip                 |
| 3     | `#work`       | Dark           | Ordered project links with a cursor-following screenshot preview             |
| 4     | `#expertise`  | Light          | Expanding skills panels with explanations of how each discipline is applied  |
| 5     | `#process`    | Light          | Seven SDLC stages; desktop vertical scroll drives a horizontal track         |
| 6     | `#why-me`     | Dark           | Four original working-principle themes shared with the résumé                |
| 7     | `#about`      | Dark           | Personal portrait, previous-role context, and job interest                   |
| 8     | `#experience` | Dark           | Employment and education                                                     |
| 9     | `#craft`      | Dark           | `ClientCollaboration`: before/during/after-delivery communication experience |
| 10    | `#contact`    | Dark           | Contact details and a real form with explicit delivery states                |
| 11    | Shared footer | Inherited dark | Personal links and wordmark                                                  |

This produces dark → light → dark, with the two connected middle sections sharing the light chapter. The small introduction does not cause an isolated white flash.

The home composition is intentionally editorial. Changing JSON items updates their consumers; it does not automatically invent or reorder whole page sections.

## 4. Page-owned runtime and the hydration fix

`ExperienceRuntime` must be mounted **once at the end of the page’s own `<main>`**, alongside the markup it enhances. It is currently mounted by the home component, project detail component, résumé page, and login page. It is not mounted in the root layout.

The component renders a hidden `data-motion-root` marker, then obtains its owning main using that marker’s `closest("main")`. All reveal and theme-section discovery is scoped to this main.

This ownership resolves a real hydration defect: a root-layout effect could run while Next.js was still hydrating a streamed page boundary, adding `style` and `data-entrance` attributes to server-rendered children too early. Moving enhancement into the page commit fixes the lifecycle ordering. An arbitrary timeout or blanket hydration-warning suppression would not fix the underlying ownership problem.

Keep future asynchronously streamed interactive content in an appropriate local boundary. The runtime takes its section/reveal inventory when it mounts; it does not automatically discover every section inserted later. Existing interaction components own their own dynamic states.

### Cleanup contract

On route change or unmount, the runtime:

- Removes its listeners, resize observer, scheduled refresh, and initial-hash animation frame.
- Removes the Lenis callback from the GSAP ticker and destroys the Lenis instance.
- Kills the palette tween and reverts its GSAP context and ScrollTriggers.
- Removes its temporary enhancement markers and root style values, restoring the dark default.
- Lets the cursor and action components clean up their own delegated events and tweens.

`ProcessSection` separately owns and reverts its `gsap.matchMedia()` context. Do not attach a second page runtime to the shared layout, and do not start a second Lenis instance inside a section.

## 5. Scroll behavior and real timing values

The scroll feeling is **inertial smooth wheel scrolling combined with scroll-linked animation**. Lenis smooths wheel input; GSAP/ScrollTrigger tracks the resulting scroll position. It is not CSS `scroll-behavior: smooth` applied to ordinary wheel movement.

Lenis uses `autoRaf: false`. A single GSAP ticker callback calls `lenis.raf(seconds * 1000)`, and Lenis scroll events call `ScrollTrigger.update`. There is no separate perpetual Lenis animation loop competing with GSAP. CSS leaves the document’s `scroll-behavior` at `auto`.

| Interaction                  | Current timing/configuration                                                | Source                                    |
| ---------------------------- | --------------------------------------------------------------------------- | ----------------------------------------- |
| Wheel inertia                | `lerp: 0.16`, `smoothWheel: true`                                           | `motion.json`, `ExperienceRuntime.tsx`    |
| Same-page anchor travel      | 1.25 seconds                                                                | `motion.json`                             |
| Dark/light canvas transition | 0.9 seconds, `sine.inOut`                                                   | Runtime and motion JSON                   |
| Section entrance             | 1.1 seconds, `power3.out`; 34px vertical offset                             | Runtime                                   |
| Entrance stagger             | 0.12 seconds; batch interval 0.08 seconds; at most five items per batch     | Runtime                                   |
| Primary button hover / leave | 0.62 / 0.48 seconds, `power2.out`                                           | `ActionMotion.tsx`                        |
| Press / release              | Scale 0.975 over 0.14 seconds; release over 0.5 seconds with elastic easing | `ActionMotion.tsx`                        |
| Button arrow                 | 45° rotation coordinated with the hover fill                                | Action component and motion CSS           |
| Navigation morph             | Width 700ms; shape, position, surface, padding 550ms                        | `navigation.css`                          |
| Decorative cursor follow     | 0.22 seconds, `power3.out`; ring morph 450ms                                | Cursor component and motion CSS           |
| Project preview follow       | 0.32 seconds; rotation 0.55 seconds                                         | `ProjectIndex.tsx`                        |
| Unfocused project rows       | Blur/opacity transition 650ms                                               | `projects.css`                            |
| Process track                | `scrub: 0.85`; travel distance derived from actual overflow                 | `ProcessSection.tsx`                      |
| Collaboration sequence       | Next active card after each 3.6-second progress animation                   | `ClientCollaboration.tsx`, `personal.css` |
| Brand intro                  | 1.15-second total CSS sequence                                              | `BrandIntro.tsx`, `motion.css`            |

Wheel `lerp` is an interpolation amount, not a duration in seconds. Smaller values produce more trailing inertia; larger values follow input more directly. Test short wheel movements and abrupt reversals before changing it.

### Theme transition

Sections declare `data-theme="dark"` or `data-theme="light"`. The runtime selects the section at 48% of the viewport’s reading height. It measures the section positions and refreshes them after layout changes, images, fonts, and window resize.

The background, surface, and borders interpolate over 0.9 seconds. Text is chosen against the changing canvas luminance, rather than crossfading dark text and light text through the same grey as the background. A black/white fallback is used where the calculated contrast of the theme ink would be insufficient. The intended target text palette is restored at completion. This deliberately prioritizes readable text during the transition; text color need not move at exactly the same rate as the canvas.

### Reveals and progressive enhancement

Use `data-reveal` on a single element, or `data-reveal-group` on a parent whose immediate children should enter in sequence. Avoid marking both the parent and its nested child as separate transform owners. The runtime filters overlapping reveal ownership.

Server-rendered content starts visible. Only upcoming elements below the initial viewport receive hidden entrance styles after their page has committed. Entrances trigger at `top 92%`, run once, and clear their opacity/transform afterward. Keyboard focus reveals a pending target immediately so a focused control cannot remain invisible.

### Anchors and native scrolling

`src/lib/anchor-navigation.ts` accepts only unmodified same-origin, same-path, same-query fragment navigation. External links, downloads, and modified/new-tab clicks retain their normal behavior. Valid local anchors update the URL, account for the header, and focus the destination after travel. Temporary `tabindex` is removed on blur.

An initial fragment is aligned on the next animation frame. If Lenis cannot load, native scrolling and native smooth anchor travel remain available. Native touch scrolling is retained through `syncTouch: false`; nested scroll areas are permitted.

## 6. Section interaction contracts

### Work and case studies

The work order is Elite Central Vacuum, SunTech POS, then Scene Ads. Each row is a real case-study link. On a fine pointer at desktop width, a portal preview follows the pointer, clamps within the viewport, and transitions its screenshot as the active project changes. Other rows soften over a duration; the active row stays legible. The preview is decorative and hidden from assistive technology.

On mobile, screenshots are present in the project links without needing hover. Keyboard users can reach every case link. The actual case-study page contains the full description, image, features, and available live/source actions. Missing source URLs omit the action instead of creating a dead link.

### Process track

The heading, cards, and controls share one sticky scene. Vertical page scrolling moves the track through seven stages and reverses it when scrolling up. The stage buttons and arrow keys scroll to the corresponding point in the section.

Desktop viewports at least 1024px wide keep the full section pinned. On narrower screens, stages stack if the complete card and controls exceed the viewport height. Reduced motion switches cards in place as the visitor scrolls.

### Collaboration sequence

`ClientCollaboration` replaces the former decorative studies while retaining the `#craft` anchor. Three communication cards cover work before development, during development, and after delivery. The text stays readable throughout; only the visual emphasis advances. Card text and phase labels come from `collaboration.json`.

Each card becomes eligible when at least 15% intersects the viewport. Only eligible cards participate in the sequence; when the active card leaves view, the first eligible card becomes active. This keeps the emphasis useful when mobile/tablet rows show only part of the section.

Each 3.6-second CSS progress animation triggers the next eligible card through `animationend`, so progress and activation share one clock. The last eligible card cycles back to the first; a lone visible card repeats its own cycle. A cycle key restarts completed progress without an additional interval timer. With no eligible cards, a hidden document, or a user pause, the animation stops through `animation-play-state`. Play/Pause resumes the current progress rather than resetting a separate clock.

### Navigation, cursor, and buttons

The header starts wide and morphs to a compact pill after 48px of scroll. At mobile width it exposes a navigation disclosure with `aria-expanded`, `aria-controls`, and an inert closed panel. Escape closes it and restores focus to the trigger. Outside pointer interaction or keyboard focus leaving the header closes it and releases the background scroll lock. It is a nonmodal navigation disclosure, not a modal dialog with a trapped Tab loop.

The custom cursor is an additional DOM ring on fine pointers. The native pointer is always visible. The ring hides for form editing, keyboard navigation, pointer leave, and window blur, and is absent on touch-only input.

Use a `.button` element with a `.button__icon` wrapper to receive the shared fill, arrow rotation, and press response. Use a real `<button>` for actions and a real link for navigation. Disabled states do not trigger the enhancement. CSS provides hover/focus behavior before or without JavaScript; GSAP takes over only its own motion properties after interaction. Do not apply another animation to those same properties on the same node.

## 7. Full motion is the chosen default

The user explicitly requested the complete animation experience and asked that it not be silently removed by the operating system’s reduced-motion preference. Lenis therefore sets `respectReducedMotion: false`, and this portfolio does not introduce a blanket `prefers-reduced-motion` suppression layer.

The relevant settings are in `src/content/motion.json`:

```json
{
  "enabled": true,
  "smoothScroll": true,
  "anchorDuration": 1.25,
  "themeDuration": 0.9,
  "wheelLerp": 0.16,
  "sound": {
    "enabled": true,
    "defaultOn": true,
    "volume": 0.16,
    "ambient": false
  }
}
```

`enabled` controls the shared runtime entrance effects, smooth scrolling, custom cursor, action enhancement, and brand intro. It is **not a universal switch for every independently owned CSS or section animation**; process and collaboration have their own implementations. `smoothScroll: false` removes Lenis while retaining the other enabled effects. An explicit future global motion control must coordinate those section owners too.

The motion values are not all centralized in JSON. Core scroll/theme settings live there; interaction timings live in their owning component or stylesheet as shown above. The small refresh debounce is for layout measurement, not an artificial animation delay.

## 8. Optional sound

The portfolio **intends sound to start on** (`defaultOn: true`) and displays a visible on/off control. The audio engine tries to unlock on load; when the browser blocks autoplay, the first permitted pointer/keyboard interaction can activate it. The sound toggle remains available to mute at any time. `defaultOn` is a preference, not a guarantee of audible playback without a user gesture.

| Cue            | Local file                                 | Current use                                                             |
| -------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `intro`        | `public/sound/01_TechQuell_Logo_Intro.mp3` | Activation confirmation and brand-link interaction when enabled         |
| `click`        | `public/sound/02_Button_Click.mp3`         | Delegated button/link interaction; form submit is excluded              |
| `project`      | `public/sound/03_Project_Hover.mp3`        | A newly active project preview, including pointer or keyboard selection |
| `chapter`      | `public/sound/04_Chapter_Transition.mp3`   | A change between dark and light chapters                                |
| `confirmation` | `public/sound/05_Contact_Confirmation.mp3` | Contact API success only: an OK response with `success: true`           |

All five cue types are connected to the events above. Project motion within the same active row does not repeatedly request the project cue; clearing the selection is also silent. A failed contact request never triggers confirmation. The original asset names are retained so the supplied pack remains recognizable. They do not change the visual personal brand.

`StudioAudio` fetches and decodes a cue only when needed, caches decoded buffers, limits repeated triggers, fades the master volume, pauses in hidden tabs, and releases sources and context on disposal. The configured volume is 0.16; the engine caps it at 0.25. Ambient sound is disabled. Its optional oscillator pad exists in the engine but is not active by default.

To wire an additional meaningful cue, import `requestSound` from the audio engine and call it at the actual interaction or verified success event. A sound request is ignored while muted. Never use a confirmation cue before the server has confirmed successful delivery. Keep cue requests out of continuously firing pointer-move and scroll-frame handlers.

## 9. Extending the implementation

### Add a section

1. Decide its place in the three-chapter composition and assign `data-theme` explicitly.
2. Use the shared container and heading styles so the section aligns with the rest of the page.
3. Add `data-reveal` or `data-reveal-group` only where an entrance improves the reading order.
4. Keep content server-rendered where possible. Give an interactive client component only the serializable props it needs.
5. For a custom GSAP scene, scope it to the section, revert its context on cleanup, and keep its animated element separate from an entrance wrapper.
6. Provide a touch and keyboard route to the same information. Hover artwork must not become the only access to a project or action.
7. Keep the single page runtime at the end of the owning main. Do not add another because a new section needs animation.

### Add content or assets

Use JSON for repeatable project, skill, process, and profile data. Store screenshots in `public/images/projects/` and use `/images/projects/...` URLs in content. The Next.js image configuration accepts local `/images/**` assets only and produces AVIF/WebP where supported. See the content guide for exact schemas, image replacement, redirects, and draft visibility.

### Tune a transition

Change the owner listed in the timing table. Check entrance and exit, quick repeated interaction, direction reversal, and a route change during the effect. Increasing every duration together makes the site feel delayed; each type of movement has a different job. Keep hover feedback shorter than section entrances and let scroll-linked motion remain responsive to reverse input.

## 10. Practical limits and checks

- This is a deliberately animated site. Full motion remains on even when the OS requests reduced motion, as explicitly requested. The local collaboration pause control does not pause every effect on the page.
- No JavaScript leaves the core server-rendered content readable, but interactive state changes, the contact request, and motion enhancement require JavaScript.
- Project preview behavior is pointer-dependent; the mobile and case-page alternatives carry the actual content.
- The current runtime discovers section/reveal nodes once per page mount. A future streamed or CMS-inserted section needs a deliberate local enhancement boundary or inventory refresh strategy.
- Header and layout measurements change with fonts, images, viewport size, and content length. Keep the resize/font/image refresh handling rather than replacing measurements with assumed desktop dimensions.
- All five audio cues are wired to the documented events. Audio depends on browser permission, device volume, asset loading, and the visitor opting in.
- Do not add WebGL, a global mouse-position React state, or another frame loop to recreate effects already handled by lightweight SVG, CSS, and GSAP.
- Use `npm run check` and `npm run build` for code/content gates. Visual checks still need real desktop and mobile browser interaction: scroll both directions, move across project rows, use Tab and Escape, open disclosures, change résumé views, and test form errors.

The page-owned hydration fix, dark/light/dark chapter behavior, and desktop process pin/translation were checked in the browser during this implementation. Deployment and mail configuration are covered separately in [CONTACT_AND_DEPLOYMENT.md](CONTACT_AND_DEPLOYMENT.md). The project README and verification notes record the final build and test results; this document describes the implementation contract rather than promising identical rendering on every device.
