export interface TeamStatsType {
  // Game Summary
  points: number
  totalYards: number
  firstDowns: number
  turnovers: number

  // Offense
  passingYards: number
  rushingYards: number
  completions: number
  attempts: number

  // Defense
  tackles: number
  sacks: number
  interceptions: number
  fumblesRecovered: number
}

export const teamStats: TeamStatsType = {
  // Game Summary
  points: 0,
  totalYards: 0,
  firstDowns: 0,
  turnovers: 0,

  // Offense
  passingYards: 0,
  rushingYards: 0,
  completions: 0,
  attempts: 0,

  // Defense
  tackles: 0,
  sacks: 0,
  interceptions: 0,
  fumblesRecovered: 0,
}
