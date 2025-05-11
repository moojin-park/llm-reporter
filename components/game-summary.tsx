"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { TeamData } from "@/lib/team-data"

interface GameSummaryProps {
  homeTeam: TeamData
  awayTeam: TeamData
  onHomeScoreChange: (score: number) => void
  onAwayScoreChange: (score: number) => void
}

export function GameSummary({ homeTeam, awayTeam, onHomeScoreChange, onAwayScoreChange }: GameSummaryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-md">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex-1 text-center">
          <h3 className="text-xl font-bold">{homeTeam.name || "Home Team"}</h3>
          <div className="mt-2">
            <Label htmlFor="home-score" className="sr-only">
              Home Score
            </Label>
            <Input
              id="home-score"
              type="number"
              value={homeTeam.score}
              onChange={(e) => onHomeScoreChange(Number.parseInt(e.target.value) || 0)}
              className="w-20 mx-auto text-center text-xl font-bold"
              min="0"
            />
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Final</div>
          <div className="text-lg font-bold">@</div>
        </div>

        <div className="flex-1 text-center">
          <h3 className="text-xl font-bold">{awayTeam.name || "Away Team"}</h3>
          <div className="mt-2">
            <Label htmlFor="away-score" className="sr-only">
              Away Score
            </Label>
            <Input
              id="away-score"
              type="number"
              value={awayTeam.score}
              onChange={(e) => onAwayScoreChange(Number.parseInt(e.target.value) || 0)}
              className="w-20 mx-auto text-center text-xl font-bold"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="text-center mt-4 text-sm text-gray-500">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>
    </div>
  )
}
