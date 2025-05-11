"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { toggleLoginState } from "@/lib/user-profile"

export function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      setIsLoading(true)
      // In a real app, this would call an authentication API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      toggleLoginState() // For demo purposes
      router.push("/")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: string) => {
    setError("")
    try {
      setIsLoading(true)
      // In a real app, this would redirect to OAuth provider
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      console.log(`Signing in with ${provider}`)
      toggleLoginState() // For demo purposes
      router.push("/")
    } catch (err) {
      setError(`Failed to sign in with ${provider}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />

      <main className="container mx-auto py-8 px-4 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">{error}</div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-[#e4002b] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-[#e4002b] hover:bg-[#c00026]" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" type="button" onClick={() => handleOAuthSignIn("Google")} disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" type="button" onClick={() => handleOAuthSignIn("Outlook")} disabled={isLoading}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mr-2">
                  <path
                    fill="#0078D4"
                    d="M23.5,11.9v-8c0-0.1-0.1-0.3-0.3-0.3c-0.1,0-0.1,0-0.2,0l-9.3,3.1c-0.2,0.1-0.4,0.3-0.4,0.5v6.4 c0,0.3,0.2,0.5,0.5,0.5h9.2c0.3,0,0.5-0.2,0.5-0.5V11.9z"
                  />
                  <path
                    fill="#0078D4"
                    d="M13.2,14.5v8.1c0,0.3,0.2,0.5,0.5,0.5c0.1,0,0.1,0,0.2,0l9.3-3.1c0.2-0.1,0.4-0.3,0.4-0.5v-6.4 c0-0.3-0.2-0.5-0.5-0.5h-9.2C13.5,12.5,13.2,12.8,13.2,14.5z"
                  />
                  <path
                    fill="#0078D4"
                    d="M11.5,7.2L1.7,4.1C1.3,4,0.9,4.2,0.8,4.6C0.8,4.7,0.8,4.7,0.8,4.8v14.4c0,0.4,0.3,0.7,0.7,0.7 c0.1,0,0.2,0,0.3-0.1l9.8-3.2c0.3-0.1,0.5-0.4,0.5-0.7V7.9C12,7.6,11.8,7.3,11.5,7.2z"
                  />
                </svg>
                Outlook
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Separator className="mb-4" />
            <p className="text-center text-sm text-gray-600 mt-2">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-[#e4002b] hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} College Football Reporter
        </div>
      </footer>
    </div>
  )
}
