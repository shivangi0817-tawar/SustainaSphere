import React from 'react';
import "../styles/Leaderboard.css";

const Leaderboard = ({ score }) => {
  return (
    <div className="mt-5">
      <br></br>
      <h4> 🏆 Leaderboard</h4>
      <br></br>
      <ul className="list-group">
        <li className="list-group-item">You - {score} points</li><br>
        </br>
        <li className="list-group-item">GreenGuru42 - 40 points</li><br></br>
        <li className="list-group-item">EcoMedicX - 30 points</li><br></br>
      </ul>
    </div>
  );
};

export default Leaderboard;
