import React, { useState, useEffect, useMemo } from 'react';
import { getTeams, getMatches, updateMatchScore, createTeam, deleteTeam, rebuildPoolSchedules, resetDatabaseMatches } from './api';

// --- (Import components: Ensure you have your BracketMatchCard and Icons components setup) ---
// For simplicity in this single-file fix, I've kept the logic consolidated.

export default function App() {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data from PostgreSQL backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const [fetchedTeams, fetchedMatches] = await Promise.all([getTeams(), getMatches()]);
      setPlayers(fetchedTeams);
      setMatches(fetchedMatches);
    } catch (err) { 
      console.error(err); 
      setError("Could not connect to backend. Ensure your Node.js server is running on port 5001.");
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="p-10 text-center text-white">Loading tournament data from PostgreSQL...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">Kitchen Classic Tournament</h1>
      <p className="mb-8 text-slate-400">Successfully connected to SQL Backend.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Roster Section */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Teams ({players.length})</h2>
          {players.map(p => (
            <div key={p.id} className="flex justify-between p-3 border-b border-slate-800">
              <span>{p.icon} {p.name}</span>
              <span className="text-slate-500">Pool {p.pool}</span>
            </div>
          ))}
        </div>

        {/* Matches Section */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-bold mb-4">Schedule ({matches.length})</h2>
          {matches.slice(0, 5).map(m => (
            <div key={m.id} className="p-3 border-b border-slate-800 text-sm">
              {m.time} | {m.court} | {m.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}