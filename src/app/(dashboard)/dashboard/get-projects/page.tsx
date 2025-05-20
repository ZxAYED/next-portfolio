"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Search, Plus, Pencil, Trash2, MoreHorizontal, Loader2, ArrowUpDown, Eye } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteProject, getProjects } from "@/Services/Projects"
import { ProjectData } from "@/app/(commonLayout)/projects/[projectId]/page"




export default function AdminProjectsPage() {
    const router = useRouter()
    const [projects, setProjects] = useState<ProjectData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortField, setSortField] = useState<keyof ProjectData>("projectName")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)


    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true)
            try {
                const projects = await getProjects()
                setProjects(projects)
            } catch (error) {
                console.error("Error fetching projects:", error)
                toast.error("Failed to load projects")
            } finally {
                setIsLoading(false)
            }
        }

        fetchProjects()
    }, [])


    const handleSort = (field: keyof ProjectData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }


    const filteredAndSortedProjects = projects
        .filter(
            (project) =>
                project.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.techStack.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
            }

            return 0
        })


    const handleDelete = async (id: string) => {
       
        setIsDeleting(true)
        try {
            const result = await DeleteProject(id)


            toast.success("Project deleted successfully", {
                className: "bg-black/80 backdrop-blur-md border border-[#9333EA]/30 text-white",
                descriptionClassName: "text-gray-300",
            })
            setProjects(projects.filter((project) => project._id !== id))

        } catch (error) {
            console.error("Error deleting project:", error)
            toast.error("Failed to delete projectProject deleted successfully", {
                className: "bg-black/80 backdrop-blur-md border border-[#9333EA]/30 text-white",
            })
        } finally {
            setIsDeleting(false)
            setDeleteProjectId(null)
        }
    }

    return (
        <div className="min-h-screen text-white">


            <div className="fixed inset-0 backdrop-blur-sm z-0" aria-hidden="true" />


            <div className="relative z-10 container mx-auto px-4 py-8">
                <Card className=" backdrop-blur-md border border-white/10 shadow-xl">
                    <CardHeader className="pb-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
                                    Projects Management
                                </CardTitle>
                                <CardDescription className="text-gray-400">
                                    Manage all your portfolio projects in one place
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search projects..."
                                        className="pl-9 bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Button
                                    asChild
                                    className="bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-[#8323DA] hover:to-[#2A72E5] text-white"
                                >
                                    <Link href="/dashboard/create-project">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Project
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex justify-center items-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-[#9333EA]" />
                                <span className="ml-3 text-gray-400">Loading projects...</span>
                            </div>
                        ) : filteredAndSortedProjects.length === 0 ? (
                            <div className="text-center py-12">
                                <h3 className="text-xl font-medium text-gray-400">No projects found</h3>
                                <p className="text-gray-500 mt-2">
                                    {searchQuery ? "Try adjusting your search query" : "Create your first project to get started"}
                                </p>
                                {!searchQuery && (
                                    <Button
                                        asChild
                                        className="mt-4 bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-[#8323DA] hover:to-[#2A72E5] text-white"
                                    >
                                        <Link href="/dashboard/create-project">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Project
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-md border border-white/10 overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-white/5">
                                        <TableRow className="hover:bg-white/10 border-white/10">
                                            <TableHead className="text-white w-[80px]">Image</TableHead>
                                            <TableHead className="text-white">
                                                <button
                                                    className="flex items-center hover:text-[#9333EA]"
                                                    onClick={() => handleSort("projectName")}
                                                >
                                                    Project
                                                    <ArrowUpDown className="ml-2 h-4 w-4" />
                                                </button>
                                            </TableHead>
                                            <TableHead className="text-white hidden text-nowrap md:table-cell">Project ID</TableHead>

                                            <TableHead className="text-white text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredAndSortedProjects.map((project) => (
                                            <TableRow key={project._id} className="hover:bg-white/5 border-white/10">
                                                <TableCell className="font-medium">
                                                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                                                        <Image
                                                            src={project.imageUrl}
                                                            alt={project.projectName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium text-white">{project.projectName}</div>
                                                    <div className="text-sm text-gray-400 line-clamp-1">{project.description}</div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <div className="flex flex-1 flex-wrap gap-1">
                                                        {project.projectId}
                                                    </div>
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10"
                                                            >
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="bg-black/90 backdrop-blur-md border border-white/10 text-white"
                                                        >
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator className="bg-white/10" />
                                                            <DropdownMenuItem
                                                                className="hover:bg-white/10 cursor-pointer"
                                                                onClick={() => router.push(`/projects/${project.projectId}`)}
                                                            >
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View
                                                            </DropdownMenuItem>

                                                            <DropdownMenuItem
                                                                className="text-red-500 hover:bg-red-950/30 hover:text-red-400 cursor-pointer"
                                                                onClick={() => setDeleteProjectId(project._id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>


            <AlertDialog open={deleteProjectId !== null} onOpenChange={(open) => !open && setDeleteProjectId(null)}>
                <AlertDialogContent className="bg-black/90 backdrop-blur-md border border-white/10 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this project?</AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-400">
                            This action cannot be undone. This will permanently delete the project and all associated data.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-transparent border border-white/10 text-white hover:bg-white/10">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => deleteProjectId && handleDelete(deleteProjectId)}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
