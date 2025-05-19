'use server'

import { IProject } from "@/components/projects/Projects";

 const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;
export const getProjects = async () => {

 try{
       const res = await fetch(`${baseUrl}/projects`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      
    } ,
    cache: "force-cache",
  }
); 
  const data =await res.json(); 
  const sorted = data?.data.sort((a:IProject, b:IProject) => {
    return  Number(a.projectId) - Number(b.projectId)
  });
  
    return sorted
    
 }
 catch(error){
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
 }