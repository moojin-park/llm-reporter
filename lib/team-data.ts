export interface PassingPlayer {
  name: string
  number: number
  completions: number
  attempts: number
  yards: number
  touchdowns: number
  interceptions: number
  rating: number
}

export interface RushingPlayer {
  name: string
  number: number
  attempts: number
  yards: number
  touchdowns: number
  longRun: number
  yardsPerCarry: number
}

export interface ReceivingPlayer {
  name: string
  number: number
  receptions: number
  targets: number
  yards: number
  touchdowns: number
  longReception: number
  yardsPerReception: number
}

export interface DefensePlayer {
  name: string
  number: number
  tackles: number
  soloTackles: number
  assistedTackles: number
  sacks: number
  interceptions: number
  passesDefended: number
}

export interface SpecialTeamsPlayer {
  name: string
  number: number
  fieldGoalsMade: number
  fieldGoalsAttempted: number
  extraPointsMade: number
  extraPointsAttempted: number
  punts: number
  puntYards: number
}

export interface TeamPlayers {
  passing: PassingPlayer[]
  rushing: RushingPlayer[]
  receiving: ReceivingPlayer[]
  defense: DefensePlayer[]
  special: SpecialTeamsPlayer[]
}

export interface TeamData {
  name: string
  score: number
  players: TeamPlayers
}

export const defaultTeamData: TeamData = {
  name: "",
  score: 0,
  players: {
    passing: [],
    rushing: [],
    receiving: [],
    defense: [],
    special: [],
  },
}
