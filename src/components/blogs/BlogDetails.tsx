'use client'

import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getSingleblog } from "@/Services/Blogs"
import { User } from "lucide-react"
// import { useTheme } from "@/components/theme/ThemeProvider"
import Loading from "@/app/loading"
import Image from "next/image"

const BlogDetailPage = (
  id: any
) => {

  const [blog, setBlog] = useState<any>(null)
  // const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const fetchBlog = async () => {
      const data = await getSingleblog(id.id)

      setBlog(data)
    }
    fetchBlog()
  }, [id])

  if (!mounted || !blog) return <div className="min-h-screen pt-20 text-center text-gray-500"><Loading /></div>

  const textColor = "text-gray-300"
  const subtitleColor = "text-gray-400"

  return (
    <div className={`min-h-screen pb-40 ${textColor}`}>
      <div className="relative z-10">

        <div className="w-full h-[40vh] md:h-[50vh] relative">
          <Image
            src={blog.imageUrl}
            width={1000}
            height={1000}
            quality={100}
            alt={blog.title}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 dark:to-black/80" />
        </div>


        <div className="relative z-20 px-4 mx-auto -mt-10 max-w-7xl sm:px-6 lg:px-0">
          <Card className="overflow-hidden border shadow-xl dark:border-cyan-500/20 backdrop-blur shadow-cyan-500/10">
            <div className="p-6 md:p-8 lg:p-10">

              <div className="pb-6 mb-8 border-b dark:border-cyan-800/30">
                <h1 className="mb-4 text-3xl font-bold text-transparent md:text-4xl lg:text-5xl bg-clip-text bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                  {blog.title}
                </h1>


                <div className={`flex flex-wrap gap-4 mb-6 ${subtitleColor}`}>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-cyan-500" />
                    <span>{blog.author}</span>
                  </div>
                </div>


                <div className="flex flex-wrap gap-2">
                  {blog.categories?.map((category: string, index: number) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-cyan-600 hover:to-purple-600"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>


              <div className="mb-8">
                <div className="prose max-w-none dark:prose-invert">
                  <p className={`mb-6 text-lg leading-relaxed ${textColor}`}>
                    {blog.content}
                  </p>
                </div>
              </div>


              <div className="pt-6 mt-10 border-t dark:border-cyan-800/30">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                    <span className="text-xl font-bold text-white">
                      {blog.author?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-700 dark:text-cyan-300">
                      About {blog.author}
                    </h3>
                    <p className={`${subtitleColor}`}>
                      Tech enthusiast and web developer specializing in emerging FullStack technologies and AI
                      integration.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BlogDetailPage
