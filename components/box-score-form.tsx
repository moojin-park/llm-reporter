"use client"

import { useState } from "react"
import { TeamStats } from "@/components/team-stats"
import { OpponentSelector } from "@/components/opponent-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { teamStats } from "@/lib/stats-schema"

export function BoxScoreForm() {
  const [selectedOpponent, setSelectedOpponent] = useState("")
  const [myTeamStats, setMyTeamStats] = useState({ ...teamStats })
  const [opponentStats, setOpponentStats] = useState({ ...teamStats })

  const handleSave = () => {
    console.log("Saving stats:", {
      myTeam: myTeamStats,
      opponent: {
        name: selectedOpponent,
        stats: opponentStats,
      },
    })
    // Here you would typically save to a database
    alert("Stats saved successfully!")
  }

  const handleReset = () => {
    setMyTeamStats({ ...teamStats })
    setOpponentStats({ ...teamStats })
    setSelectedOpponent("")
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Team</CardTitle>
          </CardHeader>
          <CardContent>
            <TeamStats stats={myTeamStats} onChange={setMyTeamStats} teamName="My Team" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Opponent Team</CardTitle>
            <OpponentSelector selectedOpponent={selectedOpponent} onSelect={setSelectedOpponent} />
          </CardHeader>
          <CardContent>
            <TeamStats stats={opponentStats} onChange={setOpponentStats} teamName={selectedOpponent || "Opponent"} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="offense">Offense</TabsTrigger>
          <TabsTrigger value="defense">Defense</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-lg">My Team</h3>
              <p>Total Yards: {myTeamStats.totalYards}</p>
              <p>Points: {myTeamStats.points}</p>
              <p>First Downs: {myTeamStats.firstDowns}</p>
              <p>Turnovers: {myTeamStats.turnovers}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">{selectedOpponent || "Opponent"}</h3>
              <p>Total Yards: {opponentStats.totalYards}</p>
              <p>Points: {opponentStats.points}</p>
              <p>First Downs: {opponentStats.firstDowns}</p>
              <p>Turnovers: {opponentStats.turnovers}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="offense" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-lg">My Team</h3>
              <p>Passing Yards: {myTeamStats.passingYards}</p>
              <p>Rushing Yards: {myTeamStats.rushingYards}</p>
              <p>Completions: {myTeamStats.completions}</p>
              <p>Attempts: {myTeamStats.attempts}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">{selectedOpponent || "Opponent"}</h3>
              <p>Passing Yards: {opponentStats.passingYards}</p>
              <p>Rushing Yards: {opponentStats.rushingYards}</p>
              <p>Completions: {opponentStats.completions}</p>
              <p>Attempts: {opponentStats.attempts}</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="defense" className="p-4 border rounded-md mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold text-lg">My Team</h3>
              <p>Tackles: {myTeamStats.tackles}</p>
              <p>Sacks: {myTeamStats.sacks}</p>
              <p>Interceptions: {myTeamStats.interceptions}</p>
              <p>Fumbles Recovered: {myTeamStats.fumblesRecovered}</p>
            </div>
            <div>
              <h3 className="font-bold text-lg">{selectedOpponent || "Opponent"}</h3>
              <p>Tackles: {opponentStats.tackles}</p>
              <p>Sacks: {opponentStats.sacks}</p>
              <p>Interceptions: {opponentStats.interceptions}</p>
              <p>Fumbles Recovered: {opponentStats.fumblesRecovered}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={handleSave}>Save Box Score</Button>
      </div>
    </div>
  )
}
