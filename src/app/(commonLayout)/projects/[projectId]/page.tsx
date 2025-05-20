'use client'
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { getSingleProject } from "@/Services/Projects"
import { techColors } from "@/lib/utils"
import { useTheme } from "@/components/theme/ThemeProvider"
import { useEffect, useState } from "react"
import Loading from "@/app/loading"


export interface ProjectData {
  projectId: string
  _id: string
  projectName: string
  description: string
  features: string[]
  githubClientCode: string
  githubServerCode: string
  liveLink: string
  imageUrl: string
  techStack: string[]
  myLearnings: string[]
}


export default function ProjectPage({
  params
}:any) {
  const { theme } = useTheme()
 const [mounted, setMounted] = useState(false)

  const [projectData, setProjectData] = useState<ProjectData>()



  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-800"
  const subtitleColor = theme === "dark" ? "text-gray-400" : "text-gray-600"
 
  const cardBorder = theme === "dark" ? "border-cyan-500/20" : "border-cyan-700/20"
  const cardShadow = theme === "dark" ? "shadow-cyan-500/10" : "shadow-cyan-700/10"
  const header = theme === "dark" ? "text-cyan-300" : "text-cyan-700"

 

 useEffect(() => {
   setMounted(true)
    const fetchBlog = async () => {
      const id = await params.projectId
         
      const data = await getSingleProject(id)
 
      setProjectData(data)
    }
    fetchBlog()
  }, [ ])
    if (!mounted || !projectData) return <div className="min-h-screen pt-20 text-center text-gray-500"><Loading /></div>

  return (
    <div className="min-h-screen -z-10 pt-32 pb-40 mx-auto text-white">
      <div className="" />

      <div className="relative z-10">
        <div className="w-full mx-auto max-w-7xl h-[40vh] md:h-[60vh] relative">
          <Image
            src={projectData?.imageUrl!}
            alt={projectData?.projectName || "Project Image"}
            height={1000}
            width={1000}
            quality={100}
            className="object-fill p-4  w-full h-full rounded-md"
           
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent" />
        </div>

        <div className="relative z-20 px-4 mx-auto max-w-7xl  sm:px-6 lg:px-0">
        <Card className={`border shadow-xl backdrop-blur-md } ${cardBorder} ${cardShadow}`}>
            <div className="p-6 md:p-8 lg:p-10">
              <div className="pb-6 mb-8 border-b border-cyan-800/30">
               <h1 className={`mb-4 text-3xl font-bold bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#3B82F6] ${textColor}`}>
                  {projectData?.projectName}
                </h1>
               <p className={`mb-6 text-lg md:text-xl ${subtitleColor}`}>
                  {projectData?.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    variant="outline"
                    className={` border-cyan-500 dark:text-cyan-400 hover:bg-cyan-950/50" ${textColor}`}
                  >
                    <Link href={projectData?.liveLink!} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={`${textColor} border-purple-500 dark:text-purple-400 hover:bg-purple-950/50`}
                  >
                    <Link href={projectData?.githubClientCode!} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Client Code
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={`${textColor} border-purple-500 dark:text-purple-400 hover:bg-purple-950/50`}
                  >
                    <Link href={projectData?.githubServerCode!} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Server Code
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="mb-8">
                <h2 className={`${header} mb-4 text-2xl font-bold  `}>Key Features</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectData?.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                     <p className={`${textColor}`}>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

             
              <div className="">
                 <h2 className={`${header} text-2xl font-bold  `}>Tech Stack</h2>
               <div className="my-4  flex flex-wrap  gap-6"> 
                 {projectData?.techStack?.map((tech) => {
                  const gradient = techColors[tech] || "from-gray-400 to-gray-600"
                  return (
                    <Badge
                      key={tech}
                      className={`bg-gradient-to-r ${gradient} capitalize`}
                    >
                      {tech}
                    </Badge>
                  )
                })}
               </div>
              </div> 
              <div className="mt-12">
                 <h2 className={`${header} mb-4 text-2xl font-bold  `}>My Learnings</h2>
              </div>
              <div className="grid  grid-cols-1 gap-4 md:grid-cols-2">

                
                  {projectData?.myLearnings?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                     <p className={`${textColor}`}>{feature}</p>
                    </div>
                  ))}
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
