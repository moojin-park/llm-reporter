"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserProfile } from "@/lib/user-profile"
import { fetchGames, fetchGamesByUser, type Game } from "@/lib/api"

export function GamesPage() {
  const userProfile = getUserProfile()
  const [userGames, setUserGames] = useState<Game[]>([])
  const [allGames, setAllGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true)
        const [userGamesData, allGamesData] = await Promise.all([
          fetchGamesByUser(userProfile.userName),
          fetchGames()
        ])
        setUserGames(userGamesData)
        setAllGames(allGamesData)
      } catch (err) {
        setError('Failed to load games. Please try again later.')
        console.error('Error loading games:', err)
      } finally {
        setLoading(false)
      }
    }

    loadGames()
  }, [userProfile.userName])

  const handleGameSelect = (game: Game) => {
    setSelectedGame(game)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <div className="text-center">Loading games...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100">
        <SiteHeader />
        <main className="container mx-auto py-8 px-4">
          <div className="text-center text-red-500">{error}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <SiteHeader />

      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">Games</h1>

        <Tabs defaultValue="my-games" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-games">My Games</TabsTrigger>
            <TabsTrigger value="all-games">All Games</TabsTrigger>
          </TabsList>

          <TabsContent value="my-games">
            <Card>
              <CardHeader>
                <CardTitle>My Recent Games</CardTitle>
                <CardDescription>Games you've participated in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>League</TableHead>
                        <TableHead>Week</TableHead>
                        <TableHead>Season</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userGames.map((game) => (
                        <TableRow
                          key={game.id}
                          className={selectedGame?.id === game.id ? "bg-gray-100" : ""}
                          onClick={() => handleGameSelect(game)}
                        >
                          <TableCell className="font-medium cursor-pointer hover:underline">
                            {game.homeTeam} vs {game.awayTeam}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/leagues/${game.leagueId}`}
                              className="text-[#e4002b] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {game.leagueName}
                            </Link>
                          </TableCell>
                          <TableCell>Week {game.week}</TableCell>
                          <TableCell>{game.season}</TableCell>
                          <TableCell>
                            {game.completed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Upcoming
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {userGames.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                            You haven't participated in any games yet.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all-games">
            <Card>
              <CardHeader>
                <CardTitle>All Games</CardTitle>
                <CardDescription>Games from all leagues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>League</TableHead>
                        <TableHead>Week</TableHead>
                        <TableHead>Season</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {allGames.map((game) => (
                        <TableRow
                          key={game.id}
                          className={selectedGame?.id === game.id ? "bg-gray-100" : ""}
                          onClick={() => handleGameSelect(game)}
                        >
                          <TableCell className="font-medium cursor-pointer hover:underline">
                            {game.homeTeam} vs {game.awayTeam}
                          </TableCell>
                          <TableCell>
                            <Link
                              href={`/leagues/${game.leagueId}`}
                              className="text-[#e4002b] hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {game.leagueName}
                            </Link>
                          </TableCell>
                          <TableCell>Week {game.week}</TableCell>
                          <TableCell>{game.season}</TableCell>
                          <TableCell>
                            {game.completed ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                Upcoming
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedGame && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {selectedGame.homeTeam} vs {selectedGame.awayTeam}
                  </CardTitle>
                  <CardDescription>
                    {selectedGame.leagueName} • Week {selectedGame.week} • Season {selectedGame.season}
                  </CardDescription>
                </div>
                <div>
                  {selectedGame.completed ? (
                    <div className="text-2xl font-bold">
                      {selectedGame.homeScore} - {selectedGame.awayScore}
                    </div>
                  ) : (
                    <Button className="bg-[#e4002b] hover:bg-[#c00026]">Enter Game Stats</Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Game Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span>
                        {new Date(selectedGame.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}