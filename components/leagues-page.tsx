"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, History } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getUserProfile } from "@/lib/user-profile"
import { getLeagues, getLeagueDetails, type League, type LeagueDetails } from "@/lib/leagues-data"

export function LeaguesPage() {
  const userProfile = getUserProfile()
  const leagues = getLeagues(userProfile.userName)

  const [selectedLeague, setSelectedLeague] = useState<League | null>(null)
  const [leagueDetails, setLeagueDetails] = useState<LeagueDetails | null>(null)
  const [currentWeek, setCurrentWeek] = useState(1)

  const handleLeagueSelect = (league: League) => {
    setSelectedLeague(league)
    const details = getLeagueDetails(league.id)
    setLeagueDetails(details)
    setCurrentWeek(details.currentWeek)
  }

  const handlePreviousWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek(currentWeek - 1)
    }
  }

  const handleNextWeek = () => {
    if (leagueDetails && currentWeek < leagueDetails.totalWeeks) {
      setCurrentWeek(currentWeek + 1)
    }
  }

  // Get current week's game if it exists
  const currentGame = leagueDetails?.games.find((game) => game.week === currentWeek)

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Your Leagues</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Active Leagues</CardTitle>
            <CardDescription>Leagues you are currently participating in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>League Name</TableHead>
                    <TableHead>Your Team</TableHead>
                    <TableHead>Commissioner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leagues.map((league) => (
                    <TableRow
                      key={league.id}
                      className={selectedLeague?.id === league.id ? "bg-gray-100" : ""}
                      onClick={() => handleLeagueSelect(league)}
                    >
                      <TableCell className="font-medium cursor-pointer hover:underline">{league.name}</TableCell>
                      <TableCell>{league.userTeam}</TableCell>
                      <TableCell>
                        <Link
                          href={`/profile/${league.commissionerId}`}
                          className="text-[#e4002b] hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {league.commissioner}
                        </Link>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle history view
                            console.log("View history for league:", league.id)
                          }}
                        >
                          <History className="h-4 w-4 mr-1" />
                          History
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {leagues.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        You are not currently in any leagues.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {selectedLeague && leagueDetails && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{selectedLeague.name}</CardTitle>
                  <CardDescription>Season {leagueDetails.year}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={handlePreviousWeek} disabled={currentWeek <= 1}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">Week {currentWeek}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleNextWeek}
                    disabled={currentWeek >= leagueDetails.totalWeeks}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Your Team</h3>
                <Button variant="outline" className="text-[#e4002b]">
                  {selectedLeague.userTeam}
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Week {currentWeek} Game</h3>

                {currentGame ? (
                  <div className="p-4 border rounded-md bg-gray-50">
                    <Link
                      href={`/games/${currentGame.id}`}
                      className="text-lg font-medium hover:underline text-[#e4002b]"
                    >
                      {currentGame.homeTeam} vs {currentGame.awayTeam}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(currentGame.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 border rounded-md bg-gray-50 flex flex-col items-center justify-center">
                    <p className="text-gray-500 mb-4">No game data available for this week.</p>
                    <Button className="bg-[#e4002b] hover:bg-[#c00026]">Add Game</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-[#0a0a0a] text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} College Football Reporter
        </div>
      </footer>
    </div>
  )
}
