"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { TeamStatsType } from "@/lib/stats-schema"

interface TeamStatsProps {
  stats: TeamStatsType
  onChange: (stats: TeamStatsType) => void
  teamName: string
}

export function TeamStats({ stats, onChange, teamName }: TeamStatsProps) {
  const handleChange = (field: keyof TeamStatsType, value: string) => {
    onChange({
      ...stats,
      [field]: value === "" ? "" : Number.parseInt(value, 10) || 0,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">{teamName} Stats</h3>
        <p className="text-sm text-muted-foreground mb-4">Enter the game statistics for {teamName}</p>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Game Summary</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-points`}>Points</Label>
              <Input
                id={`${teamName}-points`}
                type="number"
                value={stats.points}
                onChange={(e) => handleChange("points", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-totalYards`}>Total Yards</Label>
              <Input
                id={`${teamName}-totalYards`}
                type="number"
                value={stats.totalYards}
                onChange={(e) => handleChange("totalYards", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-firstDowns`}>First Downs</Label>
              <Input
                id={`${teamName}-firstDowns`}
                type="number"
                value={stats.firstDowns}
                onChange={(e) => handleChange("firstDowns", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-turnovers`}>Turnovers</Label>
              <Input
                id={`${teamName}-turnovers`}
                type="number"
                value={stats.turnovers}
                onChange={(e) => handleChange("turnovers", e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Offense</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-passingYards`}>Passing Yards</Label>
              <Input
                id={`${teamName}-passingYards`}
                type="number"
                value={stats.passingYards}
                onChange={(e) => handleChange("passingYards", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-rushingYards`}>Rushing Yards</Label>
              <Input
                id={`${teamName}-rushingYards`}
                type="number"
                value={stats.rushingYards}
                onChange={(e) => handleChange("rushingYards", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-completions`}>Completions</Label>
              <Input
                id={`${teamName}-completions`}
                type="number"
                value={stats.completions}
                onChange={(e) => handleChange("completions", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-attempts`}>Attempts</Label>
              <Input
                id={`${teamName}-attempts`}
                type="number"
                value={stats.attempts}
                onChange={(e) => handleChange("attempts", e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium mb-2">Defense</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-tackles`}>Tackles</Label>
              <Input
                id={`${teamName}-tackles`}
                type="number"
                value={stats.tackles}
                onChange={(e) => handleChange("tackles", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-sacks`}>Sacks</Label>
              <Input
                id={`${teamName}-sacks`}
                type="number"
                value={stats.sacks}
                onChange={(e) => handleChange("sacks", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-interceptions`}>Interceptions</Label>
              <Input
                id={`${teamName}-interceptions`}
                type="number"
                value={stats.interceptions}
                onChange={(e) => handleChange("interceptions", e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${teamName}-fumblesRecovered`}>Fumbles Recovered</Label>
              <Input
                id={`${teamName}-fumblesRecovered`}
                type="number"
                value={stats.fumblesRecovered}
                onChange={(e) => handleChange("fumblesRecovered", e.target.value)}
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
