export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";
import { projects } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: siteUrl + "/resume", changeFrequency: "monthly", priority: 0.7 },
    ...projects.map((project) => ({
      url: siteUrl + "/projects/" + project.slug,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
