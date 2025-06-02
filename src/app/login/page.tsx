"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Github, Loader2, LockKeyhole, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

import { Login } from "@/Services/Login"
import { toast } from "react-toastify"




export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    }, 
  mode: "onSubmit",
  })


  async function onSubmit(values:{
    email: string
    password: string
  }) {
   
    setIsLoading(true)

    try {
    const result = await Login(values)
  
   
   
      if(result.success){
        toast.success("Login Successfully")
        router.push("/dashboard/create-project")
      }
     else {
      toast.error(result.message) 
}
      
        
    } catch (error) {
       toast.error("Log in failed")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
        <div className="relative">
      <div className="absolute top-0 left-0 z-0 w-full h-full mix-blend-overlay">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
          src="/videos/bg.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative">

      <div className="fixed inset-0 -z-10 bg-black" aria-hidden="true" />
      <div
        className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#9333EA]/20 via-transparent to-[#3B82F6]/20"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center opacity-10"
        aria-hidden="true"
      />


      <Card className="w-full max-w-md border border-white/10 bg-black/40 backdrop-blur-xl shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6] flex items-center justify-center">
              <LockKeyhole className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#9333EA] to-[#3B82F6]">
          Unauthorized Accessa
          </CardTitle>
          <CardDescription className="text-center text-white/70">
          You are not authorized to log in or access the dashboard. Its only for the author to login to see the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/90">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                        <Input
                          placeholder="name@example.com"
                          className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                          {...field}
                         required 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-white/90">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-[#3B82F6] hover:text-[#9333EA] transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                        <Input
                         required 
                          type="password"
                          placeholder="••••••••"
                          className="pl-10 bg-white/5 border-white/10 text-white focus-visible:ring-[#9333EA]"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-[#9333EA] data-[state=checked]:border-[#9333EA]"
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-medium text-white/70">Remember me for 30 days</FormLabel>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:from-[#8323DA] hover:to-[#2A72E5] text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>
          </Form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full border-white/10" />
            </div>
            </div>
          
    </CardContent>
      </Card>
    </div>
    </div>
  )
}
