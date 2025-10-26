"use client"

import { ArrowLeft, Loader2, Plus, Trash2, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type React from "react"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"

import { ProjectData } from "@/app/(dashboard)/projects/[projectId]/page"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CreateProject } from "@/Services/Projects"
import Image from "next/image"
import { toast } from "react-toastify"


export default function CreateProjectPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProjectData>({
        defaultValues: {
            projectName: "",
            projectId: "",
            description: "",
            features: [""],
            githubClientCode: "",
            githubServerCode: "",
            liveLink: "",
            imageUrl: "",
            techStack: [""],
            myLearnings: [""],
        },
    })


    const features = watch("features") || [""]
    const techStack = watch("techStack") || [""]
    const myLearnings = watch("myLearnings") || [""]

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {

            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)
            setValue("imageUrl", file.name)
        }
    }

    const addArrayItem = (arrayName: "features" | "techStack" | "myLearnings") => {
        const currentArray = watch(arrayName) || []
        setValue(arrayName, [...currentArray, ""])
    }


    const removeArrayItem = (arrayName: "features" | "techStack" | "myLearnings", index: number) => {
        const currentArray = watch(arrayName) || []
        if (currentArray.length > 1) {
            setValue(
                arrayName,
                currentArray.filter((_, i) => i !== index),
            )
        }
    }

    const onSubmit = async (data: ProjectData) => {
        setIsSubmitting(true)

        try {

            const formData = new FormData()


            if (fileInputRef.current?.files?.[0]) {

                formData.append("file", fileInputRef.current.files[0])
            }


            formData.append("data", JSON.stringify(data))

            const result = await CreateProject(formData)

            if (result.success) {
                toast.success("Project created successfully!")
                router.push(`/projects/${result.data._id}`)
            }


        } catch (error) {
            console.error("Error creating project:", error)


            toast.error("Failed to create project")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">

            <div
                className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#9333EA]/20 via-transparent to-[#3B82F6]/20 z-0"
                aria-hidden="true"
            />
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-0" aria-hidden="true" />

            <div className="relative z-10  mx-auto px-4 py-8">
                <div className="flex items-center mb-6">
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="mr-4 bg-black/30 backdrop-blur-md border-white/10 hover:bg-black/50 hover:border-white/20"
                    >
                        <Link href="/#projects">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Projects
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                        Create New Project
                    </h1>
                </div>

                <Card className="bg-black/40 backdrop-blur-md border border-white/10 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-white">Project Details</CardTitle>
                        <CardDescription className="text-gray-400">
                            Fill in the information below to create a new project for your portfolio.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2">
                                    <Label htmlFor="projectName" className="text-white">
                                        Project Name
                                    </Label>
                                    <Input
                                        id="projectName"
                                        placeholder="e.g. Quantum Nexus"
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        {...register("projectName", { required: "Project name is required" })}
                                    />
                                    {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="projectId" className="text-white">
                                        Project Id
                                    </Label>
                                    <Input
                                        id="projectId"
                                        placeholder=" 01 - 09 only"
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        {...register("projectId", { required: "Project Id is required" })}
                                    />
                                    {errors.projectId && <p className="text-red-500 text-sm">{errors.projectId.message}</p>}
                                </div>


                                <div className="space-y-2">
                                    <Label htmlFor="projectImage" className="text-white">
                                        Project Image
                                    </Label>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                id="projectImage"
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
                                                Upload Image
                                            </Button>
                                            <Input
                                                placeholder="or enter image URL"
                                                className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                                {...register("imageUrl")}
                                                onChange={(e) => {
                                                    register("imageUrl").onChange(e)
                                                    setImagePreview(e.target.value)
                                                }}
                                            />
                                        </div>
                                        {imagePreview && (
                                            <div className="relative w-full h-40 rounded-md overflow-hidden border border-white/10 group">

                                                <Image
                                                    height={1000}
                                                    width={1000}
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
                            </div>


                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-white">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your project in detail..."
                                    className="min-h-32 bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                    {...register("description", { required: "Description is required" })}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>


                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-white">Features</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayItem("features")}
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Feature
                                    </Button>
                                </div>
                                {features.map((_, index) => (
                                    <div key={`feature-${index}`} className="flex items-center gap-3">
                                        <Input
                                            placeholder={`Feature ${index + 1}`}
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                            {...register(`features.${index}` as const, { required: "Feature is required" })}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem("features", index)}
                                            disabled={features.length <= 1}
                                            className="h-10 w-10 text-gray-400 hover:text-white hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove feature</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>


                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-white">Tech Stack</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayItem("techStack")}
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Technology
                                    </Button>
                                </div>
                                {techStack.map((_, index) => (
                                    <div key={`tech-${index}`} className="flex items-center gap-3">
                                        <Input
                                            placeholder={`Technology ${index + 1} (e.g. React, Node.js)`}
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                            {...register(`techStack.${index}` as const, { required: "Technology is required" })}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem("techStack", index)}
                                            disabled={techStack.length <= 1}
                                            className="h-10 w-10 text-gray-400 hover:text-white hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove technology</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>


                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-white">My Learnings</Label>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addArrayItem("myLearnings")}
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Learning
                                    </Button>
                                </div>
                                {myLearnings.map((_, index) => (
                                    <div key={`learning-${index}`} className="flex items-center gap-3">
                                        <Input
                                            placeholder={`What I learned ${index + 1}`}
                                            className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                            {...register(`myLearnings.${index}` as const, { required: "Learning is required" })}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeArrayItem("myLearnings", index)}
                                            disabled={myLearnings.length <= 1}
                                            className="h-10 w-10 text-gray-400 hover:text-white hover:bg-red-900/20"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span className="sr-only">Remove learning</span>
                                        </Button>
                                    </div>
                                ))}
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="githubClientCode" className="text-white">
                                        GitHub Client Repository
                                    </Label>
                                    <Input
                                        id="githubClientCode"
                                        placeholder="https://github.com/username/repo"
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        {...register("githubClientCode", { required: "Client repo URL is required" })}
                                    />
                                    {errors.githubClientCode && <p className="text-red-500 text-sm">{errors.githubClientCode.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="githubServerCode" className="text-white">
                                        GitHub Server Repository
                                    </Label>
                                    <Input
                                        id="githubServerCode"
                                        placeholder="https://github.com/username/repo"
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        {...register("githubServerCode", { required: "Server repo URL is required" })}
                                    />
                                    {errors.githubServerCode && <p className="text-red-500 text-sm">{errors.githubServerCode.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="liveLink" className="text-white">
                                        Live Demo URL
                                    </Label>
                                    <Input
                                        id="liveLink"
                                        placeholder="https://your-project.vercel.app"
                                        className="bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        {...register("liveLink", { required: "Live demo URL is required" })}
                                    />
                                    {errors.liveLink && <p className="text-red-500 text-sm">{errors.liveLink.message}</p>}
                                </div>
                            </div>

                            <CardFooter className="px-0 pt-6 flex justify-end gap-3">

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
                                        "Create Project"
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
