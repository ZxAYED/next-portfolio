"use client"
import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AlertCircle, CheckCircle2, Github, Loader2, LockKeyhole, Mail, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Login } from "@/Services/Login"
import { toast } from "react-toastify"

// Strict Zod Schema required by Phase 6
const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Required"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [isForgotOpen, setIsForgotOpen] = React.useState(false)
  const [forgotStatus, setForgotStatus] = React.useState<"idle" | "success" | "unauthorized">("idle")

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onSubmit",
  })

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: {
    email: string
    password: string
  }) {
    setIsLoading(true)

    try {
      const result = await Login(values)

      if (result.success) {
        toast.success("Login Successfully")
        router.push("/dashboard/create-project")
      } else {
        toast.error("You are not authorized.")
      }
    } catch (error) {
      toast.error("You are not authorized.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  function onForgotPasswordSubmit(values: ForgotPasswordFormValues) {
    if (values.email.trim() === "zzayedghost@gmail.com") {
      setForgotStatus("success")
    } else {
      setForgotStatus("unauthorized")
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
                        
                        {/* Shadcn Dialog for Forgot Password */}
                        <Dialog
                          open={isForgotOpen}
                          onOpenChange={(open) => {
                            setIsForgotOpen(open)
                            if (!open) {
                              setForgotStatus("idle")
                              forgotForm.reset()
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <button
                              type="button"
                              className="text-xs text-[#3B82F6] hover:text-[#9333EA] transition-colors cursor-pointer"
                            >
                              Forgot password?
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md bg-[#0f172a]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl text-white p-6 md:p-8">
                            <DialogHeader className="space-y-2 text-left">
                              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-[#9333EA] bg-clip-text text-transparent">
                                Reset Password
                              </DialogTitle>
                              <DialogDescription className="text-gray-400 text-sm">
                                Enter your email address to receive password reset instructions.
                              </DialogDescription>
                            </DialogHeader>

                            {forgotStatus === "idle" && (
                              <form onSubmit={forgotForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4 mt-4">
                                <div className="space-y-2">
                                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                                    Email Address
                                  </label>
                                  <div className="relative">
                                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
                                    <input
                                      type="text"
                                      placeholder="name@domain.com"
                                      className="w-full pl-10 h-11 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9333EA]"
                                      {...forgotForm.register("email")}
                                    />
                                  </div>
                                  {forgotForm.formState.errors.email && (
                                    <p className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1">
                                      <AlertCircle className="w-3 h-3" />
                                      {forgotForm.formState.errors.email.message}
                                    </p>
                                  )}
                                </div>

                                <div className="flex gap-3 pt-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsForgotOpen(false)}
                                    className="flex-1 h-11 border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    type="submit"
                                    className="flex-1 h-11 bg-gradient-to-r from-[#9333EA] to-[#3B82F6] hover:opacity-95 text-white font-medium rounded-xl"
                                  >
                                    Submit
                                  </Button>
                                </div>
                              </form>
                            )}

                            {forgotStatus === "success" && (
                              <div className="mt-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-3">
                                <div className="flex items-center gap-2.5">
                                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                                  <h4 className="font-semibold text-sm">Success: Reset link sent</h4>
                                </div>
                                <p className="text-xs text-gray-300 leading-relaxed font-light">
                                  A secure reset link has been dispatched to <span className="text-white font-mono font-medium">zzayedghost@gmail.com</span>. Please check your inbox.
                                </p>
                                <Button
                                  onClick={() => setIsForgotOpen(false)}
                                  className="w-full h-10 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl"
                                >
                                  Close
                                </Button>
                              </div>
                            )}

                            {forgotStatus === "unauthorized" && (
                              <div className="mt-4 p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 space-y-3">
                                <div className="flex items-center gap-2.5">
                                  <ShieldAlert className="h-5 w-5 text-rose-400 flex-shrink-0" />
                                  <h4 className="font-semibold text-sm">Unauthorized</h4>
                                </div>
                                <p className="text-xs text-rose-200 leading-relaxed font-medium">
                                  Unauthorized: You do not have permission to reset credentials.
                                </p>
                                <Button
                                  onClick={() => setForgotStatus("idle")}
                                  className="w-full h-10 mt-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl"
                                >
                                  Try Again
                                </Button>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
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
