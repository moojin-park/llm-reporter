// This file simulates a leagues data service
// In a real application, this would fetch data from an API

export interface League {
  id: string
  name: string
  userTeam: string
  commissioner: string
  commissionerId: string
}

export interface Game {
  id: string
  leagueId: string
  week: number
  date: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  completed: boolean
}

export interface LeagueDetails {
  id: string
  name: string
  year: number
  currentWeek: number
  totalWeeks: number
  teams: string[]
  games: Game[]
}

// Mock leagues data
const leaguesData: Record<string, League[]> = {
  "John Doe": [
    {
      id: "league-1",
      name: "SEC Fantasy League",
      userTeam: "Florida State Seminoles",
      commissioner: "Mike Johnson",
      commissionerId: "user-2",
    },
    {
      id: "league-2",
      name: "College Playoffs",
      userTeam: "Florida State Seminoles",
      commissioner: "Sarah Williams",
      commissionerId: "user-3",
    },
    {
      id: "league-3",
      name: "Friends & Family League",
      userTeam: "Florida State Seminoles",
      commissioner: "John Doe",
      commissionerId: "user-1",
    },
  ],
}

// Mock league details data
const leagueDetailsData: Record<string, LeagueDetails> = {
  "league-1": {
    id: "league-1",
    name: "SEC Fantasy League",
    year: 2025,
    currentWeek: 3,
    totalWeeks: 12,
    teams: [
      "Florida State Seminoles",
      "Alabama Crimson Tide",
      "Georgia Bulldogs",
      "LSU Tigers",
      "Auburn Tigers",
      "Tennessee Volunteers",
    ],
    games: [
      {
        id: "game-1",
        leagueId: "league-1",
        week: 1,
        date: "2025-09-06T18:00:00Z",
        homeTeam: "Florida State Seminoles",
        awayTeam: "Alabama Crimson Tide",
        homeScore: 24,
        awayScore: 21,
        completed: true,
      },
      {
        id: "game-2",
        leagueId: "league-1",
        week: 2,
        date: "2025-09-13T18:00:00Z",
        homeTeam: "Georgia Bulldogs",
        awayTeam: "Florida State Seminoles",
        homeScore: 17,
        awayScore: 28,
        completed: true,
      },
      {
        id: "game-3",
        leagueId: "league-1",
        week: 3,
        date: "2025-09-20T18:00:00Z",
        homeTeam: "Florida State Seminoles",
        awayTeam: "LSU Tigers",
        completed: false,
      },
    ],
  },
  "league-2": {
    id: "league-2",
    name: "College Playoffs",
    year: 2025,
    currentWeek: 1,
    totalWeeks: 4,
    teams: ["Florida State Seminoles", "Ohio State Buckeyes", "Clemson Tigers", "Oklahoma Sooners"],
    games: [],
  },
  "league-3": {
    id: "league-3",
    name: "Friends & Family League",
    year: 2025,
    currentWeek: 5,
    totalWeeks: 10,
    teams: ["Florida State Seminoles", "Miami Hurricanes", "Florida Gators", "UCF Knights"],
    games: [
      {
        id: "game-4",
        leagueId: "league-3",
        week: 1,
        date: "2025-09-06T18:00:00Z",
        homeTeam: "Florida State Seminoles",
        awayTeam: "Miami Hurricanes",
        homeScore: 31,
        awayScore: 24,
        completed: true,
      },
      {
        id: "game-5",
        leagueId: "league-3",
        week: 2,
        date: "2025-09-13T18:00:00Z",
        homeTeam: "Florida Gators",
        awayTeam: "Florida State Seminoles",
        homeScore: 14,
        awayScore: 28,
        completed: true,
      },
      {
        id: "game-6",
        leagueId: "league-3",
        week: 3,
        date: "2025-09-20T18:00:00Z",
        homeTeam: "Florida State Seminoles",
        awayTeam: "UCF Knights",
        homeScore: 35,
        awayScore: 17,
        completed: true,
      },
      {
        id: "game-7",
        leagueId: "league-3",
        week: 4,
        date: "2025-09-27T18:00:00Z",
        homeTeam: "Miami Hurricanes",
        awayTeam: "Florida State Seminoles",
        homeScore: 21,
        awayScore: 28,
        completed: true,
      },
      {
        id: "game-8",
        leagueId: "league-3",
        week: 5,
        date: "2025-10-04T18:00:00Z",
        homeTeam: "Florida State Seminoles",
        awayTeam: "Florida Gators",
        completed: false,
      },
    ],
  },
}

// Get leagues for a user
export function getLeagues(userName: string): League[] {
  return leaguesData[userName] || []
}

// Get league details
export function getLeagueDetails(leagueId: string): LeagueDetails {
  return leagueDetailsData[leagueId]
}

// Get game details
export function getGame(gameId: string): Game | undefined {
  for (const leagueId in leagueDetailsData) {
    const game = leagueDetailsData[leagueId].games.find((g) => g.id === gameId)
    if (game) return game
  }
  return undefined
}
