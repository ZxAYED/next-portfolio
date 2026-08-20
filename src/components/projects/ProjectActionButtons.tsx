"use client"

import PrimaryButton from "@/components/shared/PrimaryButton"
import { ExternalLink, Github } from "lucide-react"

type ProjectActionButtonsProps = {
  liveLink: string
  githubClientCode?: string
  githubServerCode?: string
}

export default function ProjectActionButtons({
  liveLink,
  githubClientCode,
  githubServerCode,
}: ProjectActionButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-3.5 pt-4">
      <a href={liveLink} target="_blank" rel="noopener noreferrer">
        <PrimaryButton
          as="div"
          title="Launch Live Application"
          icon={<ExternalLink className="h-4 w-4" />}
          className="rounded-xl px-6 py-3 text-sm font-semibold shadow-xl shadow-purple-600/25 md:text-sm"
        />
      </a>

      {githubClientCode && (
        <a href={githubClientCode} target="_blank" rel="noopener noreferrer">
          <PrimaryButton
            as="div"
            title="Frontend Code"
            icon={<Github className="h-4 w-4" />}
            className="rounded-xl px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/15 md:text-sm"
          />
        </a>
      )}

      {githubServerCode && (
        <a href={githubServerCode} target="_blank" rel="noopener noreferrer">
          <PrimaryButton
            as="div"
            title="Backend Code"
            icon={<Github className="h-4 w-4" />}
            className="rounded-xl px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-600/15 md:text-sm"
          />
        </a>
      )}
    </div>
  )
}
