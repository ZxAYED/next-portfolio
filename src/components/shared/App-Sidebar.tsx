"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ChevronDown, SquareTerminal, ShoppingCart, User, Star, BookImage } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar } from "@/components/ui/avatar"
import ZButton from "./ZButton"
import { IUser, UserInfo } from "../../Services/Login"
import Image from "next/image"
// import { useUser } from "@/context/UserContext"

// import { logOut } from "@/services/AuthService"


export type TNavItem = {
  title: string
  url: string
  icon: React.ReactNode
  items?: { title: string; url: string }[]
}

export const NavItems: TNavItem[] = [
  {
    title: "Home",
    url: "/",
    icon: <SquareTerminal className="w-5 h-5" />,
  },
  {
    title: "Create Project",
    url: "/dashboard/create-project",
    icon: <BookImage className="w-5 h-5" />,
  },
  {
    title: "All Projects",
    url: "/dashboard/get-projects",
    icon:  <BookImage className="w-5 h-5" />,
  },
  {
    title: "Create Blog ",
    url: "/dashboard/create-blog",
    icon:  <BookImage className="w-5 h-5" />,
  },
  {
    title: "All Blogs",
    url: "/dashboard/get-blogs",
    icon:  <BookImage className="w-5 h-5" />,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [openItems, setOpenItems] = React.useState<string[]>([])

 const [user, setUser] = React.useState<IUser | null>(null)
    

    React.useEffect(() => {
     
        const userData = async () => {
            const data = await UserInfo()
          
            setUser(data)
        }
        userData()
       
    })

  const toggleSubMenu = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (url: string) => {
    return pathname === url || pathname?.startsWith(url + "/")
  }

  const handleLogout = async () => {
    return 'kela'
    // await logOut()
    // toast.success("Logout successfully")
    // router.push("/")
  }

  return (
    <Sidebar className=" bg-[#0f172a]  border-r border-r-[#3B82F6] text-white">
         
      <div className="absolute top-0 left-0 z-0 w-full h-full mix-blend-overlay ">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      <SidebarHeader className="p-0 backdrop-blur-xl  bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
        <div className="p-4">
          <div className="flex items-center gap-3 px-2">
            <Avatar className="h-16 w-16 border-2 border-white/30 ring-2 ring-[#9333EA]/50">
              {user?.image && (
                <Image width={2000} height={2000} src={user.image} alt="Profile" />
              )}
              Kela
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-white">{user?.name}</span>
              <div className="flex items-center text-xs text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 mr-1.5"></span>
                Online
              </div>
            </div>
          </div>
        </div>
        <div className="bg-black/30 backdrop-blurtext-white text-xs uppercase py-2 px-4 pl-7 font-medium tracking-wider">
          Navigation
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2  py-8 relative mih-h-screen space-y-4 ">
    
      <div className="">
        {NavItems.map((item) => (
          <div key={item.title} className="mb-3">
            {item.items ? (
              <>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <button
                      onClick={() => toggleSubMenu(item.title)}
                      className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-[#9333EA] to-[#3B82F6] text-white shadow-lg shadow-purple-500/20"
                          : "hover:bg-white/10 text-white/80 hover:text-white"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center p-1 rounded-md ${
                          isActive(item.url) ? "bg-white/20 text-white" : "bg-black/30 text-white/70"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold">{item.title}</span>
                      <ChevronDown
                        className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                          openItems.includes(item.title) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </SidebarMenuItem>
                </SidebarMenu>
                
              </>
            ) : (
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`flex items-center gap-3 rounded-md text-sm px-4 py-6 font-medium transition-all duration-200 ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-[#9333EA] to-[#3B82F6] text-white shadow-lg shadow-purple-500/20"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-6 h-6 rounded-md ${
                          isActive(item.url) ? "bg-white/20 text-white" : "bg-black/30 text-white/70"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            )}
          </div>
        ))}
        </div>
        <div className="w-full flex justify-center items-center pt-8 border-t border-white/10 mt-8">
          <ZButton
            name="Logout"
            // onClick={handleLogout}
            
          />
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="text-xs leading-tight text-center text-white/70">
          <p className="font-semibold text-sm bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
            Portfolio Admin v1.0
          </p>
          <p className="mt-1">© 2025 All Rights Reserved</p>
        </div>
      </SidebarFooter>
     
    </Sidebar>
  )
}
