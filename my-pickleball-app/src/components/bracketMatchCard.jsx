import React from 'react';

export default function BracketMatchCard({ match, getPlayer, onScoreClick, selectedPlayerId, isAdmin }) {
  const p1 = getPlayer(match?.player1Id);
  const p2 = getPlayer(match?.player2Id);
  
  return (
    <div className="match-card-node">
       <div className="match-card-meta">{match.court} • {match.time}</div>
       <div className="match-card-body">
         <div className="match-player-row"><span>{p1.icon} {p1.name}</span></div>
         <div className="match-player-row"><span>{p2.icon} {p2.name}</span></div>
       </div>
    </div>
  );
}