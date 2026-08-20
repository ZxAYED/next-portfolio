"use client"

import PrimaryButton from "@/components/shared/PrimaryButton"
import type { Project } from "@/lib/projects"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

export default function ProjectCard({ project }: { project: Project }) {
  // Display exactly 3 tech stack badges on the card preview
  const previewTech = project.techStack.slice(0, 3)

  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={(event) => event.stopPropagation()}
      className="group relative rounded-xl border border-white/10 bg-[#0f172a]/85 backdrop-blur-2xl overflow-hidden flex flex-col w-full h-full select-none shadow-2xl transition-all duration-300 hover:border-purple-500/50 cursor-pointer  pointer-events-auto"
    >
      {/* Top Half: 50% Height Image with Gradient Blend */}
      <div className="relative w-full h-1/2 min-h-[190px] overflow-hidden pointer-events-none">
        <Image
          src={project.imageUrl}
          alt={project.projectName}
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Bottom vignette to blend into card content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/30 to-transparent pointer-events-none" />

        {/* Top-Right Floating Arrow Icon on Hover */}
        <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 pointer-events-none">
          <ArrowUpRight className="w-4 h-4 text-cyan-300" />
        </div>
      </div>

      {/* Bottom Half: Content Section */}
      <div className="p-5 md:p-6 flex flex-col justify-between flex-1 relative z-20 pointer-events-none">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-purple-300 transition-colors">
            {project.projectName}
          </h3>
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2 mb-4 font-light">
            {project.description}
          </p>

          {/* Exactly 3 Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {previewTech.map((tech) => (
              <span
                key={tech}
                className="bg-white/5 border border-white/10 text-cyan-300 text-[11px] px-2.5 py-0.5 rounded-full font-mono shadow-sm"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="bg-white/5 border border-white/10 text-gray-400 text-[11px] px-2 py-0.5 rounded-full font-mono">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Button Indicator */}
        <div className="pt-2 mt-auto">
          <PrimaryButton
            as="div"
            title="VIEW CASE STUDY"
            icon={
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            }
            className="w-full text-xs font-semibold uppercase tracking-wider shadow-md group-hover:shadow-lg group-hover:shadow-[#3B82F6]/40 md:text-sm"
          />
        </div>
      </div>
    </Link>
  )
}
