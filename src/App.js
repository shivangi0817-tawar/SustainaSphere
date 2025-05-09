import React from "react";
import PharmacyGame from './PharmacyGame';
  // Import full game

function App() {
  return (
    <div className="container">
      <h2 className="text-center my-4">🌿 Eco-Pharmacy Challenge</h2>
      <PharmacyGame /> {/* ✅ This now renders everything inside PharmacyGame.js */}
    </div>
  );
}

export default App;
