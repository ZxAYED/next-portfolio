import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import projectContent from "../src/content/projects.json";
import {
  getProjectBySlug,
  getProjectRedirect,
  legacyProjectRedirects,
  profile,
  projectCollectionSchema,
  projectSchema,
  projects,
  skills,
  processSteps,
} from "../src/lib/portfolio";

const example = projectContent[0];

test("published project slugs are unique, stable routes in the requested order", () => {
  const slugs = projects.map((project) => project.slug);
  assert.equal(new Set(slugs).size, projects.length);
  assert.deepEqual(slugs.slice(0, 3), [
    "elite-central-vacuum",
    "suntech-pos",
    "scene-ads",
  ]);
  assert.equal(slugs.includes("event-planner"), false);
  projects.forEach((project, index) => {
    assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(getProjectBySlug(project.slug)?.id, project.id);
    if (index > 0) assert.ok(project.order >= projects[index - 1].order);
  });
  assert.equal(getProjectBySlug("missing-case-study"), undefined);
});

test("content validation catches duplicate IDs and slugs before a build can publish ambiguous cases", () => {
  assert.equal(
    projectCollectionSchema.safeParse([
      example,
      { ...example, slug: "another-case" },
    ]).success,
    false,
  );
  assert.equal(
    projectCollectionSchema.safeParse([
      example,
      { ...example, id: "another-id" },
    ]).success,
    false,
  );
  assert.equal(
    projectCollectionSchema.safeParse([
      example,
      { ...example, id: "another-id", slug: "another-case", order: 4 },
    ]).success,
    true,
  );
});

test("visibility is an explicit boolean and does not remove a draft's required content", () => {
  const draft = projectSchema.parse({ ...example, visible: false });
  assert.equal(draft.visible, false);
  assert.equal(projectSchema.parse(example).visible, true);
  assert.equal(
    projectSchema.safeParse({ ...example, visible: "false" }).success,
    false,
  );
  assert.equal(
    projectSchema.safeParse({ ...example, visible: false, title: "" }).success,
    false,
  );
  assert.ok(projects.every((project) => project.visible));
});

test("every project and profile image is an existing, nonempty local image with alt text", () => {
  const publicRoot = resolve(process.cwd(), "public");
  const assets = [
    ...projectContent.map((project) => project.cover),
    profile.portrait,
  ];
  for (const asset of assets) {
    const path = resolve(publicRoot, `.${asset.src}`);
    assert.ok(
      path.startsWith(`${publicRoot}${sep}`),
      `${asset.src} must remain inside public`,
    );
    assert.ok(existsSync(path), `Missing image: ${asset.src}`);
    assert.ok(statSync(path).isFile());
    assert.ok(statSync(path).size > 0, `Empty image: ${asset.src}`);
    assert.ok(
      asset.alt.trim().length >= 8,
      `Add descriptive alt text for ${asset.src}`,
    );
  }
});

test("image paths reject external hosts, traversal, query strings, and unsupported files", () => {
  for (const src of [
    "https://example.com/image.webp",
    "/images/../../private.txt",
    "/images/%2e%2e/private.png",
    "/images/project.webp?token=x",
    "/images/project.exe",
    "/image.webp",
  ]) {
    assert.equal(
      projectSchema.safeParse({ ...example, cover: { ...example.cover, src } })
        .success,
      false,
      src,
    );
  }
  assert.equal(
    projectSchema.safeParse({
      ...example,
      cover: { ...example.cover, src: "/images/projects/new-project.webp" },
    }).success,
    true,
  );
});

test("unknown project links are null rather than broken placeholders or unsafe protocols", () => {
  const noLinks = projectSchema.parse({
    ...example,
    links: { live: null, client: null, server: null },
  });
  assert.deepEqual(noLinks.links, { live: null, client: null, server: null });
  for (const live of [
    "",
    "#",
    "javascript:alert(1)",
    "data:text/html,hello",
    "ftp://example.com/project",
    "/relative-live-link",
  ]) {
    assert.equal(
      projectSchema.safeParse({ ...example, links: { ...example.links, live } })
        .success,
      false,
      live,
    );
  }
  for (const project of projects) {
    for (const value of Object.values(project.links))
      if (value !== null) assert.match(value, /^https?:\/\//);
  }
});

test("case studies retain substantive content and source links where provided", () => {
  for (const slug of ["elite-central-vacuum", "scene-ads"]) {
    const project = getProjectBySlug(slug);
    assert.ok(project);
    assert.ok(project.description.length > 100);
    assert.ok(project.features.length >= 5);
    assert.ok(project.learnings.length >= 5);
    assert.ok(project.techStack.length >= 10);
    assert.ok(project.links.client?.startsWith("https://github.com/"));
    assert.ok(project.links.server?.startsWith("https://github.com/"));
  }
  const pos = getProjectBySlug("suntech-pos");
  assert.ok(pos);
  assert.equal(pos.timeline, null);
  assert.equal(pos.links.client, null);
  assert.equal(pos.links.server, null);
  assert.ok(pos.features.some((feature) => /tenant/i.test(feature.title)));
  assert.ok(pos.features.some((feature) => /inventory/i.test(feature.title)));
  const scene = getProjectBySlug("scene-ads")!;
  assert.equal(
    scene.metrics.some((metric) => metric.label.toLowerCase() === "latency"),
    false,
  );
  assert.equal(
    scene.features.some((feature) =>
      /sub-100ms|<\s*80ms/i.test(feature.description),
    ),
    false,
  );
});

test("legacy case-study redirects point to published destinations and cannot match object prototypes", () => {
  assert.equal(getProjectRedirect("event-planner"), "suntech-pos");
  assert.equal(getProjectRedirect("01"), "elite-central-vacuum");
  assert.equal(getProjectRedirect("02"), "scene-ads");
  assert.equal(getProjectRedirect("03"), "suntech-pos");
  for (const target of Object.values(legacyProjectRedirects))
    assert.ok(
      getProjectBySlug(target),
      `Missing redirect destination: ${target}`,
    );
  assert.equal(getProjectRedirect("toString"), undefined);
  assert.equal(getProjectRedirect("constructor"), undefined);
  assert.equal(getProjectRedirect("__proto__"), undefined);
  assert.equal(getProjectRedirect("not-a-project"), undefined);
});

test("current role and historical employment title stay distinct, with one canonical résumé", () => {
  assert.equal(profile.role, "Full Stack Developer");
  assert.equal(
    profile.experience.find((job) => job.id === "softvence")?.title,
    "Jr Full Stack Developer",
  );
  assert.equal(new URL(profile.resume.url).protocol, "https:");
  assert.equal(new URL(profile.resume.url).hostname, "drive.google.com");
  assert.ok(profile.resume.label.length > 0);
  assert.equal(new Set(skills.map((group) => group.id)).size, skills.length);
  assert.equal(
    new Set(processSteps.map((step) => step.id)).size,
    processSteps.length,
  );
  assert.ok(skills.every((group) => group.items.length > 0));
  assert.ok(processSteps.every((step) => step.description.trim().length > 0));
});
