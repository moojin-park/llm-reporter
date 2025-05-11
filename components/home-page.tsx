"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Coffee } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getUserProfile, isUserLoggedIn } from "@/lib/user-profile"
import { getAnnouncements, type Announcement } from "@/lib/announcements"

export function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  // Video URL - can be updated later
  const videoUrl = "https://example.com/football-background.mp4"

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(isUserLoggedIn())

    // Get announcements
    setAnnouncements(getAnnouncements())
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      <div className="relative flex-grow flex flex-col">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {!isLoggedIn && (
            <video
              className="absolute min-w-full min-h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/placeholder.svg?height=1080&width=1920"
            >
              <source src={videoUrl} type="video/mp4" />
              {/* Fallback image if video doesn't load */}
              <img
                src="/placeholder.svg?height=1080&width=1920"
                alt="Football field"
                className="absolute min-w-full min-h-full object-cover"
              />
            </video>
          )}

          {/* Overlay for non-logged in users */}
          {!isLoggedIn && <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>}
        </div>

        <main className={`container mx-auto px-4 py-12 relative z-20 flex-grow ${!isLoggedIn ? "text-white" : ""}`}>
          {/* Hero section for non-logged in users */}
          {!isLoggedIn && (
            <div className="text-center mb-16 mt-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">College Football Reporter</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                Ultimate immersive college football head coach experience powered by a LLM
              </p>
              <Button size="lg" className="bg-[#e4002b] hover:bg-[#c00026] text-white px-8 py-6 text-lg" asChild>
                <Link href="/sign-in">Sign Up / Log In</Link>
              </Button>
            </div>
          )}

          {/* Content for logged in users */}
          {isLoggedIn && (
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Welcome back, {getUserProfile().userName}!</h1>
              <p className="text-lg mb-6">Continue tracking your teams and leagues, or explore new features below.</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    <Button asChild variant="outline">
                      <Link href="/leagues">My Leagues</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/profile">My Profile</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/games">Recent Games</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/games">New Game</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Support the Project</CardTitle>
                    <CardDescription>Help keep College Football Reporter running</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full bg-[#e4002b] hover:bg-[#c00026]">
                      <Coffee className="mr-2 h-4 w-4" /> Buy me coffee and keep the lights on
                    </Button>

                    <Alert>
                      <AlertTitle>Friendly Reminder</AlertTitle>
                      <AlertDescription>
                        This site is supported by non-intrusive ads. Please consider disabling ad blockers to help us
                        continue providing this service.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Announcements section for all users */}
          <div className={`${isLoggedIn ? "" : "bg-black bg-opacity-50 p-6 rounded-lg"}`}>
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div
                  key={announcement.id}
                  className={`p-4 rounded-md ${isLoggedIn ? "bg-gray-100" : "bg-black bg-opacity-50"}`}
                >
                  <h3 className="font-bold text-lg">{announcement.title}</h3>
                  <p className="text-sm text-gray-400">{new Date(announcement.date).toLocaleDateString()}</p>
                  <p className={`mt-2 ${isLoggedIn ? "text-gray-700" : "text-gray-200"}`}>{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-[#0a0a0a] text-white py-4 relative z-20">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} College Football Reporter
        </div>
      </footer>
    </div>
  )
}
