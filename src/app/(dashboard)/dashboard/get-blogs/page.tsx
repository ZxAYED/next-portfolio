"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import Image from "next/image"
import { IBlog } from "../create-blog/page"
import { deleteBlog, getBlogs } from "@/Services/Blogs"
import { toast } from "react-toastify"
import Loading from "@/app/loading"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import ZButton from "@/components/shared/ZButton"

export default function BlogManagement() {
  const [blogs, setBlogs] = useState<IBlog[]>([ ])
  const [isLoading, setIsLoading] = useState(true)

 useEffect(() => {
        const FetchBlogs = async () => {
            setIsLoading(true)
            try {
                const projects = await getBlogs()
                setBlogs(projects)
            } catch (error) {
               
                toast.error("Failed to load blogs")
            } finally {
                setIsLoading(false)
            }
        }

        FetchBlogs()
    }, [])
if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div ><Loading /></div>
      </div>
    )
  }
  const handleDelete =async (id: string) => {
      setIsLoading(true)
            try {
                const result = await deleteBlog(id)
     
                toast.success("Blog deleted successfully")
                 const blogs = await getBlogs()
                setBlogs(blogs)
                
    
            } catch (error) {
                console.error("Error deleting Blog:", error)
                toast.error("Failed to delete Blog deleted ", {
                    className: "bg-black/80 backdrop-blur-md border border-[#9333EA]/30 text-white",
                })
            } finally {
                setIsLoading(false)
               
            }
  }

  return (
    <div className="bg-black/50 min-h-screen p-6 ">
       <Card className=" backdrop-blur-md border border-white/10 shadow-xl mb-4">
                    <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                                    Blogs Management
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Manage all your portfolio blogs in one place
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-[#8323DA] hover:to-[#2A72E5] text-white"
                                >
                                    <Link href="/dashboard/create-blog">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Blog
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="relative h-[480px] border border-white/20 backdrop-blur p-4 rounded-xl text-white shadow"
          >
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              width={6000}
              height={4000}
              className="w-full h-60 object-fill rounded-lg mb-3"
            />
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-sm text-gray-300">By {blog.author}</p>
            <p className="text-sm text-gray-400 line-clamp-2 my-2">{blog.content}</p>
            <div className="absolute bottom-4 left-4 right-4 ">
              <ZButton name="Delete" onclick={() => handleDelete(blog._id!)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}





