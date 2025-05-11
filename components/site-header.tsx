"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getUserProfile, isUserLoggedIn, signOut, registerLoginStateCallback } from "@/lib/user-profile"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const userProfile = getUserProfile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn())
  const router = useRouter()

  useEffect(() => {
    // Register callback for login state changes
    registerLoginStateCallback(() => {
      setLoggedIn(false)
      router.push("/")
    })
  }, [router])

  const handleSignOut = () => {
    signOut()
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#e4002b] text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="text-white hover:bg-[#c00026]">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] bg-[#0a0a0a] text-white border-r-[#333]">
                <nav className="flex flex-col gap-4 mt-8">
                  {loggedIn && (
                    <>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#333]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={userProfile.avatarUrl || "/placeholder.svg"} alt={userProfile.userName} />
                          <AvatarFallback>{userProfile.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>Profile</span>
                      </Link>
                      <Link
                        href="/leagues"
                        className="px-2 py-1 rounded-md hover:bg-[#333]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Leagues
                      </Link>
                      <Link
                        href="/games"
                        className="px-2 py-1 rounded-md hover:bg-[#333]"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Games
                      </Link>
                      <div className="mt-2">
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <button
                          className="flex w-full items-center gap-2 px-2 py-1 rounded-md text-red-400 hover:bg-[#333]"
                          onClick={() => {
                            setIsMenuOpen(false)
                            handleSignOut()
                          }}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="text-xl font-bold">
              College Football Reporter
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {loggedIn && (
              <>
                <Link href="/leagues" className="font-medium hover:text-gray-200 transition-colors">
                  Leagues
                </Link>
                <Link href="/games" className="font-medium hover:text-gray-200 transition-colors">
                  Games
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 font-medium hover:text-gray-200 transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userProfile.avatarUrl || "/placeholder.svg"} alt={userProfile.userName} />
                        <AvatarFallback>{userProfile.userName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>Profile</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">View Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile#settings">Account Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            {!loggedIn && (
              <Button asChild className="bg-white text-[#e4002b] hover:bg-gray-100">
                <Link href="/sign-in">Sign Up / Log In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
