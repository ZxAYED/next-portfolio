import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import ProjectDetail from "@/components/portfolio/ProjectDetail";
import {
  getProjectBySlug,
  getProjectRedirect,
  projects,
} from "@/lib/portfolio";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(getProjectRedirect(slug) ?? slug);
  if (!project)
    return {
      title: "Project not found",
      robots: { index: false, follow: false },
    };
  return {
    title: `${project.title} — Case study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Zayed Iqbal`,
      description: project.summary,
      type: "article",
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Zayed Iqbal`,
      description: project.summary,
      images: [project.cover.src],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const redirect = getProjectRedirect(slug);
  if (redirect) permanentRedirect(`/projects/${redirect}`);
  const project = getProjectBySlug(slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.id === project.id);
  const nextProject =
    projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
  return <ProjectDetail project={project} nextProject={nextProject} />;
}
