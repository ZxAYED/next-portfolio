
import { AppSidebar } from "@/components/shared/App-Sidebar";
import {

  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";



export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
const token = cookieStore.get('accessToken')?.value;
  if (!token) {
    redirect("/"); 
  }

  return (
    <SidebarProvider >
      <AppSidebar />
      <SidebarInset className="min-h-screen">
              <div className="absolute top-0 left-0 z-0 w-full h-full mix-blend-overlay backdrop-blur bg-[#0f172a]">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>  
          <div className=" bg-[#0f172a]"> {children} </div>
       
       
      </SidebarInset>
      
    </SidebarProvider>
  );
}
