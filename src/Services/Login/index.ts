'use server'
import { jwtDecode, JwtPayload } from "jwt-decode";
import { cookies } from "next/headers";

export interface IUser {
  name: string
  email: string
  image: string
  password: string
}

 const baseUrl =process.env.NEXT_PUBLIC_BACKEND_URL;
export const Login =async (payload:{email:string, password:string})=>{


 try {
    const res = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
    
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify( payload),
    });


    const data = await res.json();
     
    if (data.success) {
      (await cookies()).set("accessToken", data.data.accessToken);
    }
  
    return data;
  } catch (error) {
    console.error("Error login:", error);
    throw new Error("Failed to login");
  }

}

export const UserInfo =async ()=>{

const token = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (token) {
    decodedData = await jwtDecode<IUser>(token);
    return decodedData;
  } else {
    return null;
  }
}