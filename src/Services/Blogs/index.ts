'use server'



 const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;
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
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
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
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
 }