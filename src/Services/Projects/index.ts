'use server'

import { IProject } from "@/components/projects/Projects";
import { cookies } from "next/headers";



 const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;
export const CreateProject = async (payload: FormData) => {const cookieStore = await cookies();
// const token = cookieStore.get('accessToken')?.value;
 
//   if (!token) {
//     throw new Error("You are not authorized to perform this action");
//   }

  try {
    const res = await fetch(`${baseUrl}/projects`, {
      method: "POST",
      headers: {
        // Authorization: token,
      },
      body: payload,
    });


    const data = await res.json();
    console.log("🚀 ~ CreateProject ~ data:", data)
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project");
  }
};
export const getProjects = async () => {

 try{
       const res = await fetch(`${baseUrl}/projects`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      
    } ,
    cache: "no-store",
  }
); 
  const data =await res.json(); 
  const sorted = data?.data.sort((a:IProject, b:IProject) => {
    return  Number(a.projectId) - Number(b.projectId)
  });
  
    console.log("🚀 ~ getProjects ~ sorted:", sorted)
    return sorted
    
 }
 catch(error){
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
 }
 export const getSingleProject = async (id:string) => {
  try{
        const res = await fetch(`${baseUrl}/projects/${id}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      } ,
      cache: "no-store",
    }

); 
  const data =await res.json();
  
    return data.data
    
 }
 catch(error){
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
 }
 export const DeleteProject = async (id:string) => {
  try{
        const res = await fetch(`${baseUrl}/projects/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      } ,
   
    }

); 
  const data =await res.json();
  
    return data.data
    
 }
 catch(error){
    console.error("Error deleting projects:", error);
    throw new Error("Failed to delete projects");
  }
 }