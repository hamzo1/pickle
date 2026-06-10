const API_BASE_URL = 'http://localhost:5001/api';

export async function getTeams() {
  const res = await fetch(`${API_BASE_URL}/teams`);
  return res.json();
}

export async function getMatches() {
  const res = await fetch(`${API_BASE_URL}/matches`);
  const dbMatches = await res.json();
  return dbMatches.map(m => ({
    ...m,
    player1Id: m.player1_id,
    player2Id: m.player2_id,
    winnerId: m.winner_id,
    games: m.games || []
  }));
}

export async function updateMatchScore(matchId, games, winnerId, status) {
  const res = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ games, winnerId, status }),
  });
  return res.json();
}