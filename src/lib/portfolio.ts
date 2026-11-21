import { z } from "zod";
import profileContent from "@/content/profile.json";
import projectContent from "@/content/projects.json";
import skillContent from "@/content/skills.json";
import processContent from "@/content/process.json";
import collaborationContent from "@/content/collaboration.json";

const text = z.string().trim().min(1);
const webUrl = z
  .string()
  .url()
  .refine((value) => /^https?:\/\//.test(value), {
    message: "Use a complete HTTP or HTTPS URL.",
  });
const imageSchema = z.object({
  src: text.refine(
    (value) =>
      /^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:avif|gif|jpe?g|png|svg|webp)$/.test(
        value,
      ),
    "Use an image in public/images.",
  ),
  alt: text,
  position: z.string().default("center top"),
});

export const projectSchema = z.object({
  id: text,
  slug: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  order: z.number().int().positive(),
  title: text,
  category: text,
  tagline: text,
  summary: text,
  description: text,
  role: text,
  timeline: text.nullable(),
  visible: z.boolean().default(true),
  cover: imageSchema,
  metrics: z.array(z.object({ label: text, value: text })),
  features: z.array(z.object({ title: text, description: text })),
  techStack: z.array(text),
  learnings: z.array(text),
  links: z.object({
    live: webUrl.nullable(),
    client: webUrl.nullable(),
    server: webUrl.nullable(),
  }),
});

const profileSchema = z.object({
  name: text,
  fullName: text,
  role: text,
  location: text,
  email: z.string().email(),
  phone: text,
  hero: z.object({
    eyebrow: text,
    title: text,
    headline: z.object({ first: text, second: text }),
    signature: text,
    description: text,
    availability: text,
  }),
  about: z.object({ title: text, paragraphs: z.array(text) }),
  portrait: imageSchema.omit({ position: true }),
  resume: z.object({ url: webUrl, label: text }),
  socials: z.array(z.object({ id: text, label: text, url: webUrl })),
  experience: z.array(
    z.object({
      id: text,
      title: text,
      company: text,
      period: text,
      location: text,
      highlights: z.array(text),
      techStack: z.array(text),
    }),
  ),
  education: z.array(
    z.object({
      qualification: text,
      institution: text,
      period: text,
      description: text,
    }),
  ),
  principles: z.array(z.object({ id: text, title: text, description: text })),
});
const skillSchema = z.object({
  id: text,
  title: text,
  description: text,
  items: z.array(text),
  application: z.object({
    title: text,
    flow: z.array(text).min(2),
    detail: text,
    example: text,
    href: text.regex(/^\/(?:#[a-z-]+|projects\/[a-z-]+)$/),
  }),
});
const processSchema = z.object({
  id: text,
  number: text,
  label: text,
  title: text,
  description: text,
  clientTouchpoint: text,
  deliverables: z.array(text).min(1),
  outcome: text,
});

const collaborationSchema = z.object({
  title: text,
  emphasis: text,
  description: text,
  stages: z
    .array(
      z.object({
        id: z.enum(["understand", "communicate", "support"]),
        phase: text,
        title: text,
        description: text,
        items: z.array(text).min(1),
        result: text,
      }),
    )
    .min(1),
});

export type Project = z.infer<typeof projectSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type SkillGroup = z.infer<typeof skillSchema>;
export type ProcessStep = z.infer<typeof processSchema>;
export type Collaboration = z.infer<typeof collaborationSchema>;

export const profile = profileSchema.parse(profileContent);
export const projectCollectionSchema = z
  .array(projectSchema)
  .superRefine((items, context) => {
    for (const key of ["id", "slug"] as const) {
      const seen = new Set<string>();
      items.forEach((project, index) => {
        if (seen.has(project[key])) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: [index, key],
            message: `Duplicate project ${key}.`,
          });
        }
        seen.add(project[key]);
      });
    }
  });
export const projects = projectCollectionSchema
  .parse(projectContent)
  .filter((project) => project.visible)
  .sort((a, b) => a.order - b.order);
export const skills = z.array(skillSchema).min(1).parse(skillContent);
export const processSteps = z.array(processSchema).min(1).parse(processContent);
export const collaboration = collaborationSchema.parse(collaborationContent);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Incoming URLs from the previous portfolio keep a valid public destination. */
export const legacyProjectRedirects: Readonly<Record<string, string>> = {
  "event-planner": "suntech-pos",
  "01": "elite-central-vacuum",
  "02": "scene-ads",
  "03": "suntech-pos",
};

export function getProjectRedirect(slug: string): string | undefined {
  return Object.hasOwn(legacyProjectRedirects, slug)
    ? legacyProjectRedirects[slug]
    : undefined;
}
