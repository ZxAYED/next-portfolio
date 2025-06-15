"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Loader2, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { SerializedEditorState } from "lexical"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "react-toastify"
import BlogEditor from "@/components/blogs/BlogEditor"
import { CreateBlog } from "@/Services/Blogs"
import Image from "next/image"

export interface IBlog {
  _id?: string
  title: string
  content?: string
  author: string
  isPublished: boolean
  imageUrl: string
}

const initialEditorValue = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",



            type: "text",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
      },
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
} as unknown as SerializedEditorState

export default function CreateBlogPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [editorContent, setEditorContent] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IBlog>({
    defaultValues: {
      title: "",
      author: "",
      isPublished: false,
     
    },
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
   
    }
  }

  const onSubmit = async (data: IBlog) => {

    setIsSubmitting(true)

    try {

      const formData = new FormData()
     


      if (fileInputRef.current?.files?.[0]) {
        formData.append("file", fileInputRef.current.files[0])
      }

      if (!editorContent) {
        toast.error("Blog content cannot be empty")
        setIsSubmitting(false);
  return;

      }

      const blogData = {
        ...data,
        content: editorContent,
      }
     
      formData.append("data", JSON.stringify(blogData))
console.log("🚀 ~ formData:", Array.from(formData.entries()))
      const res = await CreateBlog(formData)
      console.log("🚀 ~ onSubmit ~ res:", res)
      if (res.success) {
        toast.success("Blog post created successfully!")
            //  router.push("/blogs")
      }


 
    } catch (error: any) {
  console.error("Error creating blog:", error.response?.data || error.message);
  toast.error("Failed to create blog post");
} finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen  text-white">

      <div
        className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#9333EA]/20 via-transparent to-[#3B82F6]/20 z-0"
        aria-hidden="true"
      />
      <div className="fixed inset-0 /60 backdrop-blur-sm z-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="mr-4 /30 backdrop-blur-md border-white/10 hover:/50 hover:border-white/20"
          >
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
            Create New Blog Post
          </h1>
        </div>

        <Card className="/40 backdrop-blur-md border border-white/10 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Blog Details</CardTitle>
            <CardDescription className="text-gray-400">
              Create a new blog post with rich text formatting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">
                    Blog Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter a captivating title..."
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                    {...register("title", { required: "Blog title is required" })}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>


                <div className="space-y-2">
                  <Label htmlFor="author" className="text-white">
                    Author
                  </Label>
                  <Input
                    id="author"
                    placeholder="Your name"
                    className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                    {...register("author", { required: "Author name is required" })}
                  />
                  {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                </div>
              </div>


              <div className="space-y-2">
                <Label htmlFor="blogImage" className="text-white">
                  Blog Cover Image
                </Label>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center gap-3">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="blogImage"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Cover Image
                    </Button>

                  </div>
                  {imagePreview && (
                    <div className="relative w-full h-40 rounded-md overflow-hidden border border-white/10 group">
                      <Image
                      width={1000}
                      height={1000}
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                        onError={() => setImagePreview(null)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setImagePreview(null)
                            setValue("imageUrl", "")
                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                          className="bg-red-500/80 hover:bg-red-600"
                        >
                          Remove Image
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
              </div>


              <div className="space-y-2">
                <Label className="text-white">
                  Blog Content
                </Label>

                <BlogEditor setEditorContent={setEditorContent} />

              </div>


              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  {...register("isPublished")}
                  onCheckedChange={(checked) => setValue("isPublished", checked)}
                />
                <Label htmlFor="isPublished" className="text-white">
                  Publish immediately
                </Label>
              </div>

              <CardFooter className="px-0 pt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-[#8323DA] hover:to-[#2A72E5] text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Blog Post"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
