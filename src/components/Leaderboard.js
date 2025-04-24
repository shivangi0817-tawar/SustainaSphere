import React from 'react';

const Leaderboard = ({ score }) => {
  return (
    <div className="mt-5">
      <h4>🏆 Leaderboard</h4>
      <ul className="list-group">
        <li className="list-group-item">You - {score} points</li>
        <li className="list-group-item">GreenGuru42 - 40 points</li>
        <li className="list-group-item">EcoMedicX - 30 points</li>
      </ul>
    </div>
  );
};

export default Leaderboard;
