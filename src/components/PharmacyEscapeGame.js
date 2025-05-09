// PharmacyEscapeGame.js
import React, { useState, useEffect } from "react";

function PharmacyEscapeGame({ onScoreChange }) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timer, setTimer] = useState(30); // Timer for each level
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setGameOver(true);
    }

    // Set timer interval for each level
    const interval = setInterval(() => {
      if (!gameOver) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, gameOver]);

  const handleChoice = (isEcoFriendly) => {
    if (gameOver) return;

    // Calculate score based on choice
    if (isEcoFriendly) {
      setScore((prev) => prev + 10);
    } else {
      setScore((prev) => prev - 5);
    }

    // Move to next level if current level is passed
    if (level < 5) {
      setLevel((prev) => prev + 1);
      setTimer(30); // Reset timer for next level
    } else {
      setGameOver(true);
    }
  };

  const renderLevel = () => {
    switch (level) {
      case 1:
        return (
          <div><br></br>
            <h4 style={{ color: "white" }}>Level 1: Sort the waste!</h4>
<br></br>
            <span>Choose the correct waste bin to throw the items in:</span><br></br><br></br>
            <div className="button-container">
            <button onClick={() => handleChoice(true)}>Recycling Bin</button><br></br>
            <button onClick={() => handleChoice(false)}>General Bin</button>
          </div></div>
        );
      case 2:
        return (
          <div><br></br>
            <h4 style={{ color: "white" }}>Level 2: Packaging Decision</h4><br></br>
            <span>Choose eco-friendly packaging for the medicine:</span><br></br><br></br>
            <div className="button-container">
            <button onClick={() => handleChoice(true)}>Biodegradable Packaging</button><br></br>
            <button onClick={() => handleChoice(false)}>Plastic Packaging</button>
          </div></div>
        );
      case 3:
        return (
          <div><br></br>
            <h4 style={{ color: "white" }}>Level 3: Educate the Customer</h4><br></br>
            <span>What is the most sustainable way to dispose of expired medications?</span><br></br><br></br>
            <div className="button-container">
            <button onClick={() => handleChoice(true)}>Return to Pharmacy</button><br></br>
            <button onClick={() => handleChoice(false)}>Throw in General Waste</button>
          </div></div>
        );
      case 4:
        return (
          <div><br></br>
            <h4 style={{ color: "white" }}>Level 4: Eco-friendly Purchase</h4><br></br>
            <span>Choose eco-friendly medicines:</span><br></br><br></br>
            <div className="button-container">
            <button onClick={() => handleChoice(true)}>Natural Medicine</button><br></br>
            <button onClick={() => handleChoice(false)}>Chemical Medicine</button>
          </div></div>
        );
      case 5:
        return (
          <div><br></br>
            <h4 style={{ color: "white" }}>Level 5: Final Challenge</h4><br></br>
            <span>Choose eco-friendly transportation:</span><br></br>
            <br></br>
            <div className="button-container">
            <button onClick={() => handleChoice(true)}>Bicycle</button><br></br>
            <button onClick={() => handleChoice(false)}>Car</button>
          </div></div>
        );
      default:
        return <div>Game Over!</div>;
    }
  };

  return (
    <div className="pharmacy-escape-game"><br></br>
      <h2>Pharmacy Escape Game</h2><br></br><br></br>
      <p>Score: {score}</p>
      <p>Time Left: {timer} seconds</p><br></br>
      {gameOver ? (
        <div>
          <h3>Game Over!</h3>

          <br></br><br></br>
          <h5>Your final score: {score}</h5>
        </div>
      ) : (
        renderLevel()
      )}
    </div>
  );
}

export default PharmacyEscapeGame;
