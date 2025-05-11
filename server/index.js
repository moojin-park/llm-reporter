const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for the React frontend
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Games endpoints
app.get('/api/games', (req, res) => {
  const { user } = req.query;
  
  // Mock data
  const games = [
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
    }
  ];

  if (user) {
    const userGames = games.filter(game => game.participants.includes(user));
    res.json(userGames);
  } else {
    res.json(games);
  }
});

app.get('/api/games/:gameId', (req, res) => {
  const { gameId } = req.params;
  // Mock data - replace with database lookup later
  const game = {
    id: gameId,
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
  };
  
  res.json(game);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});