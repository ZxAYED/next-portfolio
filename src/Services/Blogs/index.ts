'use server'

import { cookies } from "next/headers";



 const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;

 export const CreateBlog = async (payload: FormData) => {
   const cookieStore = await cookies();

 const token = cookieStore.get('accessToken')?.value;
  
   if (!token) {
     throw new Error("You are not authorized to perform this action");
   }
 
   try {
     const res = await fetch(`${baseUrl}/blogs`, {
       method: "POST",
       credentials: "include",
       headers: {
         Authorization: token,
       },
       body: payload,
     });
 
 
     const data = await res.json();
   
     return data;
   } catch (error) {
     console.error("Error creating blog:", error);
     throw new Error("Failed to create blog");
   }
 };
export const getBlogs = async () => {

 try{
       const res = await fetch(`${baseUrl}/blogs`, {
    method: "GET", 
    headers: {
      "Content-Type": "application/json",
      
    } ,
    cache: "no-cache",
  }
); 
  const data =await res.json();0
  
    return data.data
    
 }
 catch(error){
    console.error("Error fetching blogs:", error);
    throw new Error("Failed to fetch blogs");
  }
 }
export const getSingleblog = async (id:string) => {
  try{
        const res = await fetch(`${baseUrl}/blogs/${id}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      } ,
      cache: "force-cache",
    }

); 
  const data =await res.json();
  
    return data.data
    
 }
 catch(error){
    console.error("Error fetching blog:", error);
    throw new Error("Failed to fetch blog");
  }
 }
export const deleteBlog = async (id:string) => {
  try{
        const res = await fetch(`${baseUrl}/blogs/${id}`, {
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
    console.error("Error deleting blog:", error);
    throw new Error("Failed to delete blog");
  }
 }