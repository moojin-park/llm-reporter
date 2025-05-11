"use client"

import { useState } from "react"
import { TeamSelector } from "@/components/team-selector"
import { PlayerStatsTable } from "@/components/player-stats-table"
import { GameSummary } from "@/components/game-summary"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { defaultTeamData, type TeamData } from "@/lib/team-data"
import { Separator } from "@/components/ui/separator"
import { getUserProfile } from "@/lib/user-profile"
import { SiteHeader } from "@/components/site-header"

export function BoxScorePage() {
  const userProfile = getUserProfile()
  const [homeTeam, setHomeTeam] = useState<TeamData>({
    ...defaultTeamData,
    name: userProfile.teamName,
    score: 0,
  })

  const [awayTeam, setAwayTeam] = useState<TeamData>({
    ...defaultTeamData,
    name: "",
    score: 0,
  })

  const handleSave = () => {
    console.log("Saving stats:", { homeTeam, awayTeam })
    alert("Stats saved successfully!")
  }

  const handleReset = () => {
    setHomeTeam({
      ...defaultTeamData,
      name: userProfile.teamName,
      score: 0,
    })
    setAwayTeam({
      ...defaultTeamData,
      name: "",
      score: 0,
    })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Standardized header */}
      <SiteHeader />

      <main className="container mx-auto py-6 px-4">
        <div className="bg-white rounded-md shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold">Box Score</h2>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium mb-1">Your Team</span>
                <div className="h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium border border-input bg-background shadow-sm">
                  {homeTeam.name}
                </div>
              </div>
              <span className="text-xl font-bold">vs</span>
              <TeamSelector
                label="Opponent"
                selectedTeam={awayTeam.name}
                onSelect={(team) => setAwayTeam({ ...awayTeam, name: team })}
                defaultValue="Select opponent..."
              />
            </div>
          </div>

          <GameSummary
            homeTeam={homeTeam}
            awayTeam={awayTeam}
            onHomeScoreChange={(score) => setHomeTeam({ ...homeTeam, score })}
            onAwayScoreChange={(score) => setAwayTeam({ ...awayTeam, score })}
          />

          <Separator className="my-6" />

          <Tabs defaultValue="passing" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="passing">Passing</TabsTrigger>
              <TabsTrigger value="rushing">Rushing</TabsTrigger>
              <TabsTrigger value="receiving">Receiving</TabsTrigger>
              <TabsTrigger value="defense">Defense</TabsTrigger>
              <TabsTrigger value="special">Special Teams</TabsTrigger>
            </TabsList>

            <div className="space-y-8">
              <TabsContent value="passing" className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{homeTeam.name || "Home Team"}</h3>
                  <PlayerStatsTable
                    statType="passing"
                    players={homeTeam.players.passing}
                    onPlayersChange={(players) =>
                      setHomeTeam({
                        ...homeTeam,
                        players: { ...homeTeam.players, passing: players },
                      })
                    }
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">{awayTeam.name || "Away Team"}</h3>
                  <PlayerStatsTable
                    statType="passing"
                    players={awayTeam.players.passing}
                    onPlayersChange={(players) =>
                      setAwayTeam({
                        ...awayTeam,
                        players: { ...awayTeam.players, passing: players },
                      })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="rushing" className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{homeTeam.name || "Home Team"}</h3>
                  <PlayerStatsTable
                    statType="rushing"
                    players={homeTeam.players.rushing}
                    onPlayersChange={(players) =>
                      setHomeTeam({
                        ...homeTeam,
                        players: { ...homeTeam.players, rushing: players },
                      })
                    }
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">{awayTeam.name || "Away Team"}</h3>
                  <PlayerStatsTable
                    statType="rushing"
                    players={awayTeam.players.rushing}
                    onPlayersChange={(players) =>
                      setAwayTeam({
                        ...awayTeam,
                        players: { ...awayTeam.players, rushing: players },
                      })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="receiving" className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{homeTeam.name || "Home Team"}</h3>
                  <PlayerStatsTable
                    statType="receiving"
                    players={homeTeam.players.receiving}
                    onPlayersChange={(players) =>
                      setHomeTeam({
                        ...homeTeam,
                        players: { ...homeTeam.players, receiving: players },
                      })
                    }
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">{awayTeam.name || "Away Team"}</h3>
                  <PlayerStatsTable
                    statType="receiving"
                    players={awayTeam.players.receiving}
                    onPlayersChange={(players) =>
                      setAwayTeam({
                        ...awayTeam,
                        players: { ...awayTeam.players, receiving: players },
                      })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="defense" className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{homeTeam.name || "Home Team"}</h3>
                  <PlayerStatsTable
                    statType="defense"
                    players={homeTeam.players.defense}
                    onPlayersChange={(players) =>
                      setHomeTeam({
                        ...homeTeam,
                        players: { ...homeTeam.players, defense: players },
                      })
                    }
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">{awayTeam.name || "Away Team"}</h3>
                  <PlayerStatsTable
                    statType="defense"
                    players={awayTeam.players.defense}
                    onPlayersChange={(players) =>
                      setAwayTeam({
                        ...awayTeam,
                        players: { ...awayTeam.players, defense: players },
                      })
                    }
                  />
                </div>
              </TabsContent>

              <TabsContent value="special" className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{homeTeam.name || "Home Team"}</h3>
                  <PlayerStatsTable
                    statType="special"
                    players={homeTeam.players.special}
                    onPlayersChange={(players) =>
                      setHomeTeam({
                        ...homeTeam,
                        players: { ...homeTeam.players, special: players },
                      })
                    }
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-2">{awayTeam.name || "Away Team"}</h3>
                  <PlayerStatsTable
                    statType="special"
                    players={awayTeam.players.special}
                    onPlayersChange={(players) =>
                      setAwayTeam({
                        ...awayTeam,
                        players: { ...awayTeam.players, special: players },
                      })
                    }
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-8">
            <Button variant="outline" onClick={handleReset}>
              Reset All Stats
            </Button>
            <Button onClick={handleSave} className="bg-[#e4002b] hover:bg-[#c00026]">
              Save Box Score
            </Button>
          </div>
        </div>
      </main>

      <footer className="bg-[#0a0a0a] text-white py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} College Football Reporter
        </div>
      </footer>
    </div>
  )
}
