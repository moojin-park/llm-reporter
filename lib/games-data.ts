// This file simulates a games data service
// In a real application, this would fetch data from an API

export interface Game {
  id: string
  leagueId: string
  leagueName: string
  week: number
  season: number
  date: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  completed: boolean
  participants: string[] // usernames of participants
}

// Mock games data
const gamesData: Game[] = [
  {
    id: "game-1",
    leagueId: "league-1",
    leagueName: "SEC Fantasy League",
    week: 1,
    season: 2025,
    date: "2025-09-06T18:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "Alabama Crimson Tide",
    homeScore: 24,
    awayScore: 21,
    completed: true,
    participants: ["John Doe", "Mike Johnson"],
  },
  {
    id: "game-2",
    leagueId: "league-1",
    leagueName: "SEC Fantasy League",
    week: 2,
    season: 2025,
    date: "2025-09-13T18:00:00Z",
    homeTeam: "Georgia Bulldogs",
    awayTeam: "Florida State Seminoles",
    homeScore: 17,
    awayScore: 28,
    completed: true,
    participants: ["John Doe", "Sarah Williams"],
  },
  {
    id: "game-3",
    leagueId: "league-1",
    leagueName: "SEC Fantasy League",
    week: 3,
    season: 2025,
    date: "2025-09-20T18:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "LSU Tigers",
    completed: false,
    participants: ["John Doe", "Mike Johnson"],
  },
  {
    id: "game-4",
    leagueId: "league-3",
    leagueName: "Friends & Family League",
    week: 1,
    season: 2025,
    date: "2025-09-06T18:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "Miami Hurricanes",
    homeScore: 31,
    awayScore: 24,
    completed: true,
    participants: ["John Doe", "Sarah Williams"],
  },
  {
    id: "game-5",
    leagueId: "league-3",
    leagueName: "Friends & Family League",
    week: 2,
    season: 2025,
    date: "2025-09-13T18:00:00Z",
    homeTeam: "Florida Gators",
    awayTeam: "Florida State Seminoles",
    homeScore: 14,
    awayScore: 28,
    completed: true,
    participants: ["John Doe", "Mike Johnson"],
  },
  {
    id: "game-6",
    leagueId: "league-3",
    leagueName: "Friends & Family League",
    week: 3,
    season: 2025,
    date: "2025-09-20T18:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "UCF Knights",
    homeScore: 35,
    awayScore: 17,
    completed: true,
    participants: ["John Doe", "Sarah Williams"],
  },
  {
    id: "game-7",
    leagueId: "league-3",
    leagueName: "Friends & Family League",
    week: 4,
    season: 2025,
    date: "2025-09-27T18:00:00Z",
    homeTeam: "Miami Hurricanes",
    awayTeam: "Florida State Seminoles",
    homeScore: 21,
    awayScore: 28,
    completed: true,
    participants: ["John Doe", "Mike Johnson"],
  },
  {
    id: "game-8",
    leagueId: "league-3",
    leagueName: "Friends & Family League",
    week: 5,
    season: 2025,
    date: "2025-10-04T18:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "Florida Gators",
    completed: false,
    participants: ["John Doe", "Sarah Williams"],
  },
  {
    id: "game-9",
    leagueId: "league-2",
    leagueName: "College Playoffs",
    week: 1,
    season: 2025,
    date: "2025-12-28T18:00:00Z",
    homeTeam: "Ohio State Buckeyes",
    awayTeam: "Clemson Tigers",
    completed: false,
    participants: ["Mike Johnson", "Sarah Williams"],
  },
  {
    id: "game-10",
    leagueId: "league-2",
    leagueName: "College Playoffs",
    week: 1,
    season: 2025,
    date: "2025-12-28T22:00:00Z",
    homeTeam: "Florida State Seminoles",
    awayTeam: "Oklahoma Sooners",
    completed: false,
    participants: ["John Doe", "Mike Johnson"],
  },
]

// Get all games
export function getAllGames(): Game[] {
  return [...gamesData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get games for a specific user
export function getGamesByUser(userName: string): Game[] {
  return gamesData
    .filter((game) => game.participants.includes(userName))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Get a specific game
export function getGame(gameId: string): Game | undefined {
  return gamesData.find((game) => game.id === gameId)
}

// Get games for a specific league
export function getGamesByLeague(leagueId: string): Game[] {
  return gamesData.filter((game) => game.leagueId === leagueId).sort((a, b) => a.week - b.week)
}
