"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { PassingPlayer, RushingPlayer, ReceivingPlayer, DefensePlayer, SpecialTeamsPlayer } from "@/lib/team-data"

type PlayerType = PassingPlayer | RushingPlayer | ReceivingPlayer | DefensePlayer | SpecialTeamsPlayer

interface PlayerStatsTableProps {
  statType: "passing" | "rushing" | "receiving" | "defense" | "special"
  players: PlayerType[]
  onPlayersChange: (players: PlayerType[]) => void
}

export function PlayerStatsTable({ statType, players, onPlayersChange }: PlayerStatsTableProps) {
  const [newPlayerName, setNewPlayerName] = useState("")

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) return

    let newPlayer: PlayerType

    switch (statType) {
      case "passing":
        newPlayer = {
          name: newPlayerName,
          number: players.length + 1,
          completions: 0,
          attempts: 0,
          yards: 0,
          touchdowns: 0,
          interceptions: 0,
          rating: 0,
        } as PassingPlayer
        break
      case "rushing":
        newPlayer = {
          name: newPlayerName,
          number: players.length + 1,
          attempts: 0,
          yards: 0,
          touchdowns: 0,
          longRun: 0,
          yardsPerCarry: 0,
        } as RushingPlayer
        break
      case "receiving":
        newPlayer = {
          name: newPlayerName,
          number: players.length + 1,
          receptions: 0,
          targets: 0,
          yards: 0,
          touchdowns: 0,
          longReception: 0,
          yardsPerReception: 0,
        } as ReceivingPlayer
        break
      case "defense":
        newPlayer = {
          name: newPlayerName,
          number: players.length + 1,
          tackles: 0,
          soloTackles: 0,
          assistedTackles: 0,
          sacks: 0,
          interceptions: 0,
          passesDefended: 0,
        } as DefensePlayer
        break
      case "special":
        newPlayer = {
          name: newPlayerName,
          number: players.length + 1,
          fieldGoalsMade: 0,
          fieldGoalsAttempted: 0,
          extraPointsMade: 0,
          extraPointsAttempted: 0,
          punts: 0,
          puntYards: 0,
        } as SpecialTeamsPlayer
        break
    }

    onPlayersChange([...players, newPlayer])
    setNewPlayerName("")
  }

  const handleRemovePlayer = (index: number) => {
    const newPlayers = [...players]
    newPlayers.splice(index, 1)
    onPlayersChange(newPlayers)
  }

  const handleStatChange = (index: number, field: string, value: string) => {
    const newPlayers = [...players]
    const numValue = value === "" ? 0 : Number.parseInt(value, 10)

    // Update the specific field
    newPlayers[index] = {
      ...newPlayers[index],
      [field]: numValue,
    }

    // Calculate derived stats
    if (statType === "passing") {
      const player = newPlayers[index] as PassingPlayer
      if (player.attempts > 0) {
        // Simple QB rating calculation (not the actual NFL formula)
        player.rating = Math.round(
          ((player.completions / player.attempts) * 100 +
            player.touchdowns * 20 -
            player.interceptions * 30 +
            player.yards / 10) /
            6,
        )
        if (player.rating < 0) player.rating = 0
        if (player.rating > 158.3) player.rating = 158.3
      }
    } else if (statType === "rushing") {
      const player = newPlayers[index] as RushingPlayer
      if (player.attempts > 0) {
        player.yardsPerCarry = Number.parseFloat((player.yards / player.attempts).toFixed(1))
      }
    } else if (statType === "receiving") {
      const player = newPlayers[index] as ReceivingPlayer
      if (player.receptions > 0) {
        player.yardsPerReception = Number.parseFloat((player.yards / player.receptions).toFixed(1))
      }
    } else if (statType === "defense") {
      const player = newPlayers[index] as DefensePlayer
      player.tackles = player.soloTackles + player.assistedTackles
    }

    onPlayersChange(newPlayers)
  }

  const renderTableHeaders = () => {
    switch (statType) {
      case "passing":
        return (
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">C/ATT</TableHead>
            <TableHead className="text-right">YDS</TableHead>
            <TableHead className="text-right">TD</TableHead>
            <TableHead className="text-right">INT</TableHead>
            <TableHead className="text-right">RATING</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        )
      case "rushing":
        return (
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">ATT</TableHead>
            <TableHead className="text-right">YDS</TableHead>
            <TableHead className="text-right">TD</TableHead>
            <TableHead className="text-right">LONG</TableHead>
            <TableHead className="text-right">AVG</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        )
      case "receiving":
        return (
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">REC</TableHead>
            <TableHead className="text-right">TGTS</TableHead>
            <TableHead className="text-right">YDS</TableHead>
            <TableHead className="text-right">TD</TableHead>
            <TableHead className="text-right">LONG</TableHead>
            <TableHead className="text-right">AVG</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        )
      case "defense":
        return (
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">TOT</TableHead>
            <TableHead className="text-right">SOLO</TableHead>
            <TableHead className="text-right">AST</TableHead>
            <TableHead className="text-right">SACK</TableHead>
            <TableHead className="text-right">INT</TableHead>
            <TableHead className="text-right">PD</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        )
      case "special":
        return (
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">FG</TableHead>
            <TableHead className="text-right">XP</TableHead>
            <TableHead className="text-right">PUNTS</TableHead>
            <TableHead className="text-right">YDS</TableHead>
            <TableHead className="text-right">AVG</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        )
    }
  }

  const renderPlayerRow = (player: PlayerType, index: number) => {
    switch (statType) {
      case "passing":
        const passingPlayer = player as PassingPlayer
        return (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="number"
                value={passingPlayer.number}
                onChange={(e) => handleStatChange(index, "number", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>{passingPlayer.name}</TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <Input
                type="number"
                value={passingPlayer.completions}
                onChange={(e) => handleStatChange(index, "completions", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
              {" / "}
              <Input
                type="number"
                value={passingPlayer.attempts}
                onChange={(e) => handleStatChange(index, "attempts", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={passingPlayer.yards}
                onChange={(e) => handleStatChange(index, "yards", e.target.value)}
                className="w-16 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={passingPlayer.touchdowns}
                onChange={(e) => handleStatChange(index, "touchdowns", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={passingPlayer.interceptions}
                onChange={(e) => handleStatChange(index, "interceptions", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">{passingPlayer.rating.toFixed(1)}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)} className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
      case "rushing":
        const rushingPlayer = player as RushingPlayer
        return (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="number"
                value={rushingPlayer.number}
                onChange={(e) => handleStatChange(index, "number", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>{rushingPlayer.name}</TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={rushingPlayer.attempts}
                onChange={(e) => handleStatChange(index, "attempts", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={rushingPlayer.yards}
                onChange={(e) => handleStatChange(index, "yards", e.target.value)}
                className="w-16 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={rushingPlayer.touchdowns}
                onChange={(e) => handleStatChange(index, "touchdowns", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={rushingPlayer.longRun}
                onChange={(e) => handleStatChange(index, "longRun", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">{rushingPlayer.yardsPerCarry.toFixed(1)}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)} className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
      case "receiving":
        const receivingPlayer = player as ReceivingPlayer
        return (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="number"
                value={receivingPlayer.number}
                onChange={(e) => handleStatChange(index, "number", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>{receivingPlayer.name}</TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={receivingPlayer.receptions}
                onChange={(e) => handleStatChange(index, "receptions", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={receivingPlayer.targets}
                onChange={(e) => handleStatChange(index, "targets", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={receivingPlayer.yards}
                onChange={(e) => handleStatChange(index, "yards", e.target.value)}
                className="w-16 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={receivingPlayer.touchdowns}
                onChange={(e) => handleStatChange(index, "touchdowns", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={receivingPlayer.longReception}
                onChange={(e) => handleStatChange(index, "longReception", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">{receivingPlayer.yardsPerReception.toFixed(1)}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)} className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
      case "defense":
        const defensePlayer = player as DefensePlayer
        return (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="number"
                value={defensePlayer.number}
                onChange={(e) => handleStatChange(index, "number", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>{defensePlayer.name}</TableCell>
            <TableCell className="text-right">{defensePlayer.tackles}</TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={defensePlayer.soloTackles}
                onChange={(e) => handleStatChange(index, "soloTackles", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={defensePlayer.assistedTackles}
                onChange={(e) => handleStatChange(index, "assistedTackles", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={defensePlayer.sacks}
                onChange={(e) => handleStatChange(index, "sacks", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
                step="0.5"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={defensePlayer.interceptions}
                onChange={(e) => handleStatChange(index, "interceptions", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={defensePlayer.passesDefended}
                onChange={(e) => handleStatChange(index, "passesDefended", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)} className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
      case "special":
        const specialTeamsPlayer = player as SpecialTeamsPlayer
        const puntAvg =
          specialTeamsPlayer.punts > 0 ? (specialTeamsPlayer.puntYards / specialTeamsPlayer.punts).toFixed(1) : "0.0"
        return (
          <TableRow key={index}>
            <TableCell>
              <Input
                type="number"
                value={specialTeamsPlayer.number}
                onChange={(e) => handleStatChange(index, "number", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell>{specialTeamsPlayer.name}</TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <Input
                type="number"
                value={specialTeamsPlayer.fieldGoalsMade}
                onChange={(e) => handleStatChange(index, "fieldGoalsMade", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
              {" / "}
              <Input
                type="number"
                value={specialTeamsPlayer.fieldGoalsAttempted}
                onChange={(e) => handleStatChange(index, "fieldGoalsAttempted", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right whitespace-nowrap">
              <Input
                type="number"
                value={specialTeamsPlayer.extraPointsMade}
                onChange={(e) => handleStatChange(index, "extraPointsMade", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
              {" / "}
              <Input
                type="number"
                value={specialTeamsPlayer.extraPointsAttempted}
                onChange={(e) => handleStatChange(index, "extraPointsAttempted", e.target.value)}
                className="w-12 text-center p-1 h-8 inline-block"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={specialTeamsPlayer.punts}
                onChange={(e) => handleStatChange(index, "punts", e.target.value)}
                className="w-12 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">
              <Input
                type="number"
                value={specialTeamsPlayer.puntYards}
                onChange={(e) => handleStatChange(index, "puntYards", e.target.value)}
                className="w-16 text-center p-1 h-8"
                min="0"
              />
            </TableCell>
            <TableCell className="text-right">{puntAvg}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => handleRemovePlayer(index)} className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        )
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>{renderTableHeaders()}</TableHeader>
          <TableBody>
            {players.map((player, index) => renderPlayerRow(player, index))}
            {players.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                  No players added. Add a player below.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center mt-4">
        <Input
          placeholder="Enter player name"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          className="max-w-xs mr-2"
        />
        <Button onClick={handleAddPlayer} size="sm" className="bg-[#e4002b] hover:bg-[#c00026]">
          <Plus className="h-4 w-4 mr-1" /> Add Player
        </Button>
      </div>
    </div>
  )
}
