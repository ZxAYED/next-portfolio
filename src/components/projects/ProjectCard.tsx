"use client"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { Project } from "@/lib/projects"
import { techColors } from "@/lib/utils"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
export default function ProjectCard({ project }: { project: Project }) {

  const textColor = "text-gray-300 md:text-lg"


  const header = "text-cyan-300"

  return (
    <div className="relative w-full mt-10">

      <div className="relative  max-w-7xl mx-auto  text-white">
        <Card className="border-none  ">
          <div className="px-4 lg:px-0">
            {/* Header */}
            <div className="pb-2 mb-4 border-b border-cyan-800/30 flex flex-col lg:flex-row justify-between gap-2">
              <div className="">
                <h1 className={`mb-4 text-cyan-300 text-3xl md:text-4xl font-bold`}>
                  {project.projectName}
                </h1>
                <p className={`mb-6 md:text-lg `}>{project.description}</p>

                <div className="flex flex-wrap gap-4 relative z-10">
                  <motion.a
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.03 }}


                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${textColor} !px-6 !py-3 font-medium rounded-lg border border-cyan-500 hover:bg-cyan-950/50 flex gap-2 justify-center items-center cursor-pointer`}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </motion.a>

                  {project.githubClientCode && (
                    <motion.a
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.03 }}


                      href={project.githubClientCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${textColor} !px-6 !py-3 font-medium rounded-lg border border-[#3b82f6] hover:bg-purple-950/50 flex gap-2 justify-center items-center cursor-pointer`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Client Code
                    </motion.a>
                  )}

                  {project.githubServerCode && (
                    <motion.a
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.03 }}


                      href={project.githubServerCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${textColor} !px-6 !py-3 font-medium rounded-lg border border-[#3b82f6] hover:bg-purple-950/50 flex gap-2 justify-center items-center cursor-pointer`}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Server Code
                    </motion.a>
                  )}
                </div>
              </div>
              <div className="w-full mt-6 md:mt-0 h-60 rounded-lg p-1 bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                <Image
                  src={project.imageUrl}
                  alt={project.projectName}
                  height={1000}
                  width={1000}
                  quality={100}
                  className="w-full h-full object-fill rounded-md"
                />
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className={`${header} mb-4 text-2xl font-bold`}>Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className={`${textColor}`}>{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h2 className={`${header} text-2xl font-bold`}>Tech Stack</h2>
              <div className="my-4 flex flex-wrap gap-4">
                {project.techStack.map((tech) => {
                  const gradient = techColors[tech] || "from-gray-400 to-gray-600"
                  return (
                    <Badge key={tech} className={`bg-gradient-to-r px-6 py-2 ${gradient} capitalize md:text-lg`}>
                      {tech}
                    </Badge>
                  )
                })}
              </div>
            </div>

            {/* Learnings */}
            <div>
              <h2 className={`${header} mb-4 text-2xl font-bold`}>My Learnings</h2>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {project.myLearnings.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className={`${textColor}`}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
