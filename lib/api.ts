const API_BASE_URL = 'http://localhost:3001/api';

export interface Game {
  id: string;
  leagueId: string;
  leagueName: string;
  week: number;
  season: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  completed: boolean;
  participants: string[];
}

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/games`);
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }
  return response.json();
}

export async function fetchGamesByUser(userName: string): Promise<Game[]> {
  const response = await fetch(`${API_BASE_URL}/games?user=${userName}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user games');
  }
  return response.json();
}

export async function fetchGame(gameId: string): Promise<Game> {
  const response = await fetch(`${API_BASE_URL}/games/${gameId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch game');
  }
  return response.json();
}