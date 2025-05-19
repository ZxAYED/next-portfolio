import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import img from "../../../../../public/images/bg.jpg"
interface ProjectProps {
  params: {
    projectId: string
  }
}

interface ProjectData {
  projectId: string
  id: string
  projectName: string
  description: string
  features: string[]
  githubClientCode: string
  githubServerCode: string
  liveLink: string
  imageUrl: string
}

export default function ProjectPage({ params }: ProjectProps) {
  // This would typically come from an API or database
  // For now, we're using mock data
  const projectData: ProjectData = {
    projectId: params.projectId,
    id: "project-1",
    projectName: "Quantum Nexus",
    description:
      "A full-stack MERN application that leverages cutting-edge technologies to create an immersive user experience. The application features real-time data synchronization, advanced authentication, and a responsive design that adapts to any device.",
    features: [
      "Real-time data synchronization",
      "Advanced authentication system",
      "Responsive design for all devices",
      "Dark/light mode toggle",
      "Interactive data visualization",
      "AI-powered recommendations",
    ],
    githubClientCode: "https://github.com/username/quantum-nexus-client",
    githubServerCode: "https://github.com/username/quantum-nexus-server",
    liveLink: "https://quantum-nexus.vercel.app",
    imageUrl: img,
  }

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Background with blur effect */}
      <div
        className="fixed inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-30 z-0"
        aria-hidden="true"
      />
      <div className="fixed inset-0 z-0 backdrop-blur-xl bg-black/40" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10">
        {/* Project Image */}
        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <Image
            src={projectData.imageUrl || "/placeholder.svg"}
            alt={projectData.projectName}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
        </div>

        {/* Project Details */}
        <div className="relative z-20 px-4 mx-auto -mt-20 max-w-7xl sm:px-6 lg:px-8">
          <Card className="overflow-hidden border shadow-xl border-cyan-500/20 bg-black/60 backdrop-blur-md shadow-cyan-500/10">
            <div className="p-6 md:p-8 lg:p-10">
              {/* Project Header */}
              <div className="pb-6 mb-8 border-b border-cyan-800/30">
                <h1 className="mb-4 text-3xl font-bold text-transparent md:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                  {projectData.projectName}
                </h1>
                <p className="mb-6 text-lg text-gray-300 md:text-xl">{projectData.description}</p>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-950/50">
                    <Link href={projectData.liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="text-purple-400 border-purple-500 hover:bg-purple-950/50"
                  >
                    <Link href={projectData.githubClientCode} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Client Code
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="text-purple-400 border-purple-500 hover:bg-purple-950/50"
                  >
                    <Link href={projectData.githubServerCode} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Server Code
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold text-cyan-300">Key Features</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectData.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 mt-1 mr-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500">
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-gray-200">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h2 className="mb-4 text-2xl font-bold text-cyan-300">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-cyan-700 hover:from-cyan-600 hover:to-cyan-800">
                    MongoDB
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800">
                    Express.js
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800">
                    React
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900">
                    Node.js
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900">
                    TypeScript
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
                    Next.js
                  </Badge>
                  <Badge className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700">
                    Tailwind CSS
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
