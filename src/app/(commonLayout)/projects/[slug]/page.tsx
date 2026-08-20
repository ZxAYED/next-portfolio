import { projectData } from "@/lib/projects"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  FileText,
  GitBranch,
  Layers,
  ShieldCheck,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import MorphingNavigation from "@/components/implementation/MorphingNavbar"
import ProjectActionButtons from "@/components/projects/ProjectActionButtons"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projectData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projectData.find(
    (p) => p.slug === slug || String(p.projectId) === String(slug)
  )

  if (!project) {
    return {
      title: "Project Not Found | Zayed",
    }
  }

  return {
    title: `${project.projectName} - Case Study | Zayed`,
    description: project.description,
    openGraph: {
      title: `${project.projectName} | Zayed Case Study`,
      description: project.description,
      images: [{ url: project.imageUrl }],
    },
  }
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const projectIndex = projectData.findIndex(
    (p) => p.slug === slug || String(p.projectId) === String(slug)
  )
  const project = projectData[projectIndex]

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Project Not Found
        </h1>
        <p className="text-gray-400 mb-8 max-w-md text-sm md:text-base font-light">
          The case study you are looking for does not exist or may have been relocated.
        </p>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#9333EA] text-white font-medium text-sm shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Featured Projects
        </Link>
      </div>
    )
  }

  const nextProject =
    projectData[(projectIndex + 1) % projectData.length]

  return (
    <>
      <MorphingNavigation />
      <main className="min-h-screen pt-32 md:pt-36 pb-32 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="mb-10 flex items-center">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full border border-white/10 bg-slate-950/30 hover:border-cyan-400/30"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-cyan-400" />
          <span>Back to Projects</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <div className="space-y-6 mb-12">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
            {project.projectName}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-200/90 font-light max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Project Meta Pill Badges */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <div className="px-3.5 py-1.5 rounded-xl border border-cyan-400/20 bg-cyan-500/8 text-xs font-mono text-cyan-200">
            <span className="text-cyan-400/80">Type:</span>{" "}
            <span className="text-white font-medium">{project.category}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/[0.04] text-xs font-mono text-gray-300">
            <span className="text-gray-500">Role:</span>{" "}
            <span className="text-white font-medium">{project.role}</span>
          </div>
          <div className="px-3.5 py-1.5 rounded-xl border border-white/15 bg-white/[0.04] text-xs font-mono text-gray-300">
            <span className="text-gray-500">Timeline:</span>{" "}
            <span className="text-white font-medium">{project.timeline}</span>
          </div>
        </div>

        <ProjectActionButtons
          liveLink={project.liveLink}
          githubClientCode={project.githubClientCode}
          githubServerCode={project.githubServerCode}
        />
      </div>

      {/* Hero Visual Preview Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] md:h-[580px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl shadow-purple-950/40 mb-16 bg-gradient-to-br from-cyan-950/30 to-purple-950/30">
        <Image
          src={project.imageUrl}
          alt={project.projectName}
          fill
          priority
          quality={90}
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
        />

        {/* Ambient Dark Gradient Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent pointer-events-none" />

        {/* Floating Quick Metrics Strip */}
        <div className="absolute bottom-6 left-6 right-6 z-20 hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border border-white/15 bg-black/60 backdrop-blur-xl flex flex-col"
            >
              <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider">
                {metric.label}
              </span>
              <span className="text-sm md:text-base font-bold text-white tracking-tight mt-0.5">
                {metric.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="space-y-16">
        {/* Executive Overview */}
        <section className="p-8 md:p-12 rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/[0.02] to-purple-500/10 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <FileText className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Executive Overview
            </h2>
          </div>
          <p className="text-gray-200 text-lg md:text-xl font-light leading-relaxed">
            {project.description}
          </p>
        </section>

        {/* Key Architectural Features Grid */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 text-purple-400">
            <GitBranch className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Key Engineering Features
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.features.map((feature, idx) => {
              const [title, ...rest] = feature.split(":")
              const detail = rest.join(":")
              return (
                <div
                  key={idx}
                  className="p-6 md:p-7 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-purple-500/40 hover:bg-purple-500/5 transition-all space-y-2 group"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5 group-hover:text-purple-400 transition-colors" />
                    <div>
                      <h3 className="text-white font-semibold text-base md:text-lg">
                        {title.trim()}
                      </h3>
                      {detail && (
                        <p className="text-gray-300 text-sm font-light leading-relaxed mt-1">
                          {detail.trim()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Tech Stack Matrix */}
        <section className="p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2.5 text-cyan-400">
            <Code2 className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Technologies & Infrastructure
            </h2>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/[0.04] text-cyan-300 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-500/10 text-xs md:text-sm font-mono font-medium shadow-sm transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Engineering Insights & Learnings */}
        <section className="p-8 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.02] to-cyan-500/10 backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-2.5 text-purple-400">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-semibold">
              Key Learnings & Architectural Wins
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.myLearnings.map((learning, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl border border-white/10 bg-black/30"
              >
                <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc] flex-shrink-0 mt-2" />
                <p className="text-gray-300 text-sm font-light leading-relaxed">
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Next Project Footer Card Navigation */}
        <section className="pt-12 border-t border-white/10">
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group block p-8 md:p-10 rounded-3xl border border-white/15 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-transparent hover:border-purple-400/50 transition-all shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
                  Next Case Study
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors">
                  {nextProject.projectName}
                </h3>
                <p className="text-gray-400 text-sm font-light line-clamp-1 max-w-xl">
                  {nextProject.tagline}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 group-hover:bg-purple-600 text-white font-semibold text-sm transition-all self-start md:self-auto">
                <span>Explore Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </section>
      </div>
      </main>
    </>
  )
}
