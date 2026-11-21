/**
 * Quick dependency-free release audit. Checks the required source contracts,
 * not a substitute for `npm run check`, visual browser QA or SMTP testing.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const json = (path) => JSON.parse(read(path));
const profile = json("src/content/profile.json");
const projects = json("src/content/projects.json");
const skills = json("src/content/skills.json");
const motion = json("src/content/motion.json");
const stages = json("src/content/process.json");
let checked = 0;
function check(name, fn) {
  try {
    fn();
    checked += 1;
    process.stdout.write(`✓ ${name}\n`);
  } catch (error) {
    process.stderr.write(`✗ ${name}: ${error.message}\n`);
    process.exitCode = 1;
  }
}
const contains = (file, phrase) => assert.ok(read(file).includes(phrase), `${file} missing ${phrase}`);
const notContains = (file, phrase) => assert.ok(!read(file).includes(phrase), `${file} unexpectedly contains ${phrase}`);
const file = (path) => assert.ok(existsSync(join(root, path)), `Missing ${path}`);

check("Professional identity is developer (not engineer)", () => {
  assert.equal(profile.role, "Full Stack Developer");
  assert.match(profile.hero.headline.second, /developer/i);
  notContains("src/app/layout.tsx", "Full Stack Engineer");
});
check("Hero prioritizes an employment opportunity", () => {
  assert.match(profile.hero.description, /team/i);
  assert.match(profile.hero.availability, /opportunities/i);
});
check("Personal mark and dark/light wordmarks are reusable", () => {
  ["zayed-mark-dark.svg", "zayed-mark-light.svg", "zayed-wordmark-dark.svg", "zayed-wordmark-light.svg"].forEach((name) => file(`public/brand/${name}`));
  contains("src/components/portfolio/SiteHeader.tsx", "BrandWordmark");
});
check("Hero portrait has no coordinate or star decoration", () => {
  notContains("src/components/portfolio/HeroVisual.tsx", "portrait-coordinate");
  notContains("src/components/portfolio/HeroVisual.tsx", "portrait-star");
  notContains("src/styles/home.css", "grayscale(");
  file(profile.portrait.src.replace(/^\//, "public/"));
});
check("Featured projects use requested order", () => {
  const featured = projects.filter((p) => p.visible !== false).sort((a, b) => a.order - b.order);
  assert.deepEqual(featured.map((p) => p.slug), ["elite-central-vacuum", "suntech-pos", "scene-ads"]);
  featured.forEach((p) => file(p.cover.src.replace(/^\//, "public/")));
});
check("Project link button says View project", () => {
  contains("src/components/portfolio/ProjectIndex.tsx", "View project");
  notContains("src/components/portfolio/ProjectIndex.tsx", "View case study");
});
check("Skills include requested client-work technologies", () => {
  const all = skills.flatMap((group) => group.items);
  ["TypeScript", "GSAP", "Framer Motion", "PWA", "IndexedDB", "Service workers", "TanStack Query", "NestJS", "Hostinger"].forEach((tech) => assert.ok(all.includes(tech), tech));
});
check("Seven client-inclusive SDLC steps remain", () => {
  assert.equal(stages.length, 7);
  assert.equal(stages[0].id, "discussion");
  assert.equal(stages[6].id, "support");
  assert.ok(stages.every((s) => s.clientTouchpoint && s.deliverables.length >= 2));
});
check("The full SDLC scene sticks and all seven cards follow page scrolling", () => {
  contains("src/styles/process.css", "position: sticky");
  contains("src/components/portfolio/ProcessSection.tsx", 'window.addEventListener("scroll", onScroll');
  contains("src/components/portfolio/ProcessSection.tsx", "--track-offset");
  contains("src/components/portfolio/ProcessSection.tsx", "step.deliverables[0]");
});
check("Small viewports retain a readable list and reduced motion changes stages in place", () => {
  contains("src/components/portfolio/ProcessSection.tsx", "(!desktop.matches && overhang > 1)");
  contains("src/styles/process.css", "translateX(var(--active-offset");
  contains("src/components/portfolio/ProcessSection.tsx", 'section.dataset.layout = "stacked"');
  contains("src/styles/process.css", ".sdlc-track { display: grid;");
  contains("src/components/portfolio/ProcessSection.tsx", "<StageFlow stage={step.id}");
});
check("Heading lavender highlights use separate top margin", () => {
  contains("src/components/portfolio/CapabilitiesSection.tsx", "title-highlight");
  contains("src/components/portfolio/ProcessSection.tsx", "title-highlight");
  contains("src/styles/foundations.css", "margin-top: 0.25rem");
});
check("Four hiring principles and client-related experience are preserved", () => {
  assert.equal(profile.principles.length, 4);
  assert.match(profile.experience[0].highlights.join(" "), /client/i);
  contains("src/components/portfolio/WhyChooseMe.tsx", "principles.map");
});
check("Lavender footer identity uses the shared brand accent", () => {
  contains("src/components/portfolio/SiteFooter.tsx", "footer-wordmark");
  contains("src/styles/personal.css", "--brand-primary");
});
check("About, Why and hero actions have dedicated responsive spacing", () => {
  contains("src/styles/home.css", ".why-section, .about-section");
  contains("src/styles/home.css", ".hero-actions > a");
});
check("Phone hero and projects have readable, distinct actions", () => {
  contains('src/components/portfolio/PortfolioHome.tsx', '<ArrowRight aria-hidden="true" />');
  contains("src/styles/home.css", ".portrait-composition { display: grid;");
  contains("src/styles/projects.css", "inset: calc(100% + 0.7rem) auto auto 0");
});
check("Sound defaults ON with explicit switch and five files", () => {
  assert.equal(motion.enabled, true);
  assert.equal(motion.sound.enabled, true);
  assert.equal(motion.sound.defaultOn, true);
  contains("src/components/experience/SoundControl.tsx", "onFirstInteraction");
  ["01_TechQuell_Logo_Intro.mp3", "02_Button_Click.mp3", "03_Project_Hover.mp3", "04_Chapter_Transition.mp3", "05_Contact_Confirmation.mp3"].forEach((name) => file(`public/sound/${name}`));
});
check("Résumé uses the exact user-maintained Drive file", () => {
  assert.ok(profile.resume.url.includes("1bEXAXtgnZEVilVaPirP2-XD2PuprHE7Q"));
  contains("src/components/portfolio/SiteHeader.tsx", "resumeUrl");
  contains("src/components/portfolio/PortfolioHome.tsx", "profile.resume.url");
});
check("Contact submits to the server, not Outlook", () => {
  contains("src/components/portfolio/ContactSection.tsx", 'fetch("/api/send-mail"');
  notContains("src/components/portfolio/ContactSection.tsx", "window.location.href = `mailto:");
  contains("src/app/api/send-mail/route.ts", "nodemailer.createTransport");
  contains("src/app/api/send-mail/route.ts", "EMAIL_PASS");
  contains("src/app/api/send-mail/route.ts", "!result.accepted?.length");
  notContains("src/app/api/send-mail/route.ts", "Demo mode");
  file(".env.example");
});
check("Page structure includes résumé, work, skills, why-me and contact", () => {
  ["PortfolioHome.tsx", "ProjectDetail.tsx", "WhyChooseMe.tsx", "ContactSection.tsx"].forEach((name) => file(`src/components/portfolio/${name}`));
  file("src/components/resume/ResumeIde.tsx");
});

console.log(`\nRelease source checks: ${checked} passed${process.exitCode ? " (some failed)" : ""}.`);
console.log("Note: This audit does NOT replace npm test/build, browser QA or a real SMTP send test.");
