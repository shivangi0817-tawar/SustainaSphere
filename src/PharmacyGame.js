// import React, { useState, useEffect } from "react";
// import MedicationSorter from "./components/MedicationSorter";
// import CustomerInteraction from "./components/Customerinteraction";
// import Leaderboard from "./components/Leaderboard";
// import SustainabilityScore from "./components/SustainabilityScore";
// import PackagingSelector from "./components/PackagingSelector";
// import PharmacyEscapeGame from "./components/PharmacyEscapeGame";
// import UserCharacter from "./components/UserCharacter";
// import InventoryTracker from "./components/InventoryTracker";
// import FeedbackCorner from "./components/FeedbackCorner";
// import EcoUpgradeShop from "./components/EcoUpgradeShop";
// import DailyChallengeBoard from "./components/DailyChallengeBoard";
// import EcoPharmacyGame from "./components/EcoPharmacyGame";
// import "../src/styles/PharmacyGame.css";


// function PharmacyGame() {
//   const [score, setScore] = useState(0);
//   const [level, setLevel] = useState(1);
//   const [experience, setExperience] = useState(0);
//   const [achievements, setAchievements] = useState([]);
//   const [gameMode, setGameMode] = useState('normal'); // normal, challenge, story
//   const [notifications, setNotifications] = useState([]);
//   const [scoreData, setScoreData] = useState({
//     Medication: 0,
//     CustomerHelp: 0,
//     Packaging: 0,
//     EcoAction: 0,
//     PharmacyEscape: 0,
//     EcoPharmacy: 0,
//   });

//   // Level up system
//   useEffect(() => {
//     const experienceNeeded = level * 100;
//     if (experience >= experienceNeeded) {
//       setLevel(prev => prev + 1);
//       setExperience(prev => prev - experienceNeeded);
//       addNotification('🎉 Level Up! You reached level ' + (level + 1));
//       unlockAchievement('Level ' + (level + 1) + ' Eco-Warrior');
//     }
//   }, [experience, level]);

//   // Achievement system
//   const unlockAchievement = (achievement) => {
//     if (!achievements.includes(achievement)) {
//       setAchievements(prev => [...prev, achievement]);
//       addNotification('🏆 New Achievement: ' + achievement);
//     }
//   };

//   // Notification system

//   const addNotification = (message) => {
//     const id = Date.now();
//     setNotifications(prev => [...prev, { id, message, fadingOut: false }]);
  
//     // Start fade after 2 seconds
//     setTimeout(() => {
//       setNotifications(prev =>
//         prev.map(n => n.id === id ? { ...n, fadingOut: true } : n)
//       );
//     }, 2000);
  
//     // Remove after 3 seconds
//     setTimeout(() => {
//       setNotifications(prev => prev.filter(n => n.id !== id));
//     }, 3000);
//   };


// <div className="notifications-container">
//   {notifications.map(n => (
//     <div
//       key={n.id}
//       className={`notification ${n.fadingOut ? 'fade-out' : ''}`}
//     >
//       {n.message}
//     </div>
//   ))}
// </div>


//   // // const addNotification = (message) => {
//   //   // setNotifications(prev => [...prev, { id: Date.now(), message }]);
//   //   // setTimeout(() => {
//   //   //   setNotifications(prev => prev.filter(n => n.id !== Date.now()));
//   //   // }, 5000);
//   //   const addNotification = (message) => {
//   //     const id = Date.now();
//   //     setNotifications(prev => [...prev, { id, message, fadingOut: false }]);
    
//   //     // Start fade after 2 seconds
//   //     setTimeout(() => {
//   //       setNotifications(prev =>
//   //         prev.map(n => n.id === id ? { ...n, fadingOut: true } : n)
//   //       );
//   //     }, 2000);
    
//   //     // Remove after 3 seconds
//   //     setTimeout(() => {
//   //       setNotifications(prev => prev.filter(n => n.id !== id));
//   //     }, 3000);
//   //   };
    


//   const updateScore = (points, type = "Medication") => {
//     const newScore = Math.max(0, score + points);
//     setScore(newScore);
//     setExperience(prev => prev + Math.abs(points));
//     setScoreData(prev => ({
//       ...prev,
//       [type]: Math.max(0, prev[type] + points),
//     }));

//     // Check for score-based achievements
//     if (newScore >= 100) unlockAchievement('Centurion');
//     if (newScore >= 500) unlockAchievement('Eco Master');
//     if (newScore >= 1000) unlockAchievement('Sustainability Legend');
//   };

//   const handleUpgradePurchase = (cost) => {
//     setScore(prev => Math.max(0, prev - cost));
//   };

//   return (
//     <div className="eco-game-container">
//       {/* Header Section */}
//       <header className="game-header">
//         <div className="player-info">
//           <UserCharacter user={{ name: "Eco Warrior", level, avatar: null }} />
//           <div className="level-info">
//             <h4>Level {level}</h4>
//             <div className="experience-bar">
//               <div 
//                 className="experience-fill" 
//                 style={{ width: `${(experience / (level * 100)) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="score-display">
//           <h3>Sustainability Score: {score}</h3>
//           <SustainabilityScore scoreData={scoreData} />
//         </div>

//         {/* Game Mode Selector */}
//         <div className="game-modes">
//           <button 
//             className={`mode-btn ${gameMode === 'normal' ? 'active' : ''}`}
//             onClick={() => setGameMode('normal')}
//           >
//             Normal Mode
//           </button>
//           <button 
//             className={`mode-btn ${gameMode === 'challenge' ? 'active' : ''}`}
//             onClick={() => setGameMode('challenge')}
//           >
//             Challenge Mode
//           </button>
//           <button 
//             className={`mode-btn ${gameMode === 'story' ? 'active' : ''}`}
//             onClick={() => setGameMode('story')}
//           >
//             Story Mode
//           </button>
//         </div>
//       </header>

//       {/* Notifications */}
//       <div className="notifications-container">
//         {notifications.map(notification => (
//           <div key={notification.id} className="notification">
//             {notification.message}
//           </div>
//         ))}
//       </div>

//       {/* Main Game Content */}
//       <main className="game-content">
//         <div className="game-grid">
//           {/* Daily Challenges Section */}
//           <section className="game-section">
//             <DailyChallengeBoard onComplete={(pts) => updateScore(pts, "Daily")} />
//           </section>

//           {/* Main Game Section */}
//           <section className="game-section">
//             {gameMode === 'normal' && (
//               <>
//                 <MedicationSorter onScoreChange={(pts) => updateScore(pts, "Medication")} />
//                 <CustomerInteraction onScoreChange={(pts) => updateScore(pts, "CustomerHelp")} />
//                 <PackagingSelector onScoreChange={(pts) => updateScore(pts, "Packaging")} />
//               </>
//             )}
//             {gameMode === 'challenge' && (
//               <PharmacyEscapeGame onScoreChange={(pts) => updateScore(pts, "PharmacyEscape")} />
//             )}
//             {gameMode === 'story' && (
//               <EcoPharmacyGame onScoreChange={(pts) => updateScore(pts, "EcoPharmacy")} />
//             )}
//           </section>

//           {/* Side Panel */}
//           <section className="game-section side-panel">
//             <InventoryTracker onUseItem={(pts) => updateScore(pts, "Inventory")} />
//             <EcoUpgradeShop currentScore={score} onPurchase={handleUpgradePurchase} />
//             <FeedbackCorner />
//           </section>
//         </div>
//       </main>

//       {/* Achievements & Leaderboard */}
//       <footer className="game-footer">
//         <div className="achievements-section">
//           <h4> 🎖️ Achievements ({achievements.length})</h4>
//           <div className="achievements-grid">
//             {achievements.map(achievement => (
//               <div key={achievement} className="achievement-badge">
//                 {achievement}
//               </div>
//             ))}
//           </div>
//         </div>
//         <Leaderboard score={score} />
//       </footer>
//     </div>
//   );
// }

// export default PharmacyGame;








import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import MedicationSorter from "./components/MedicationSorter";
import CustomerInteraction from "./components/Customerinteraction";
import Leaderboard from "./components/Leaderboard";
import PackagingSelector from "./components/PackagingSelector";
import PharmacyEscapeGame from "./components/PharmacyEscapeGame";
import UserCharacter from "./components/UserCharacter";
import InventoryTracker from "./components/InventoryTracker";
import FeedbackCorner from "./components/FeedbackCorner";
import EcoUpgradeShop from "./components/EcoUpgradeShop";
import DailyChallengeBoard from "./components/DailyChallengeBoard";
import EcoPharmacyGame from "./components/EcoPharmacyGame";
import "../src/styles/PharmacyGame.css";

function PharmacyGame() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [gameMode, setGameMode] = useState('normal');
  const [notifications, setNotifications] = useState([]);

  const [scoreData, setScoreData] = useState({
    Medication: 0,
    CustomerHelp: 0,
    Packaging: 0,
    EcoAction: 0,
    PharmacyEscape: 0,
    EcoPharmacy: 0,
    Daily: 0,
    Inventory: 0,
  });

  // Level-up system with multiple levels in one go
  useEffect(() => {
    let currentExp = experience;
    let currentLevel = level;
    let leveledUp = false;

    while (currentExp >= currentLevel * 100) {
      currentExp -= currentLevel * 100;
      currentLevel += 1;
      unlockAchievement(`Level ${currentLevel} Eco-Warrior`);
      leveledUp = true;
    }

    if (leveledUp) {
      setLevel(currentLevel);
      setExperience(currentExp);
      addNotification(`🎉 Level Up! You reached level ${currentLevel}`);
    }
  }, [experience]);

  // Achievement unlock
  const unlockAchievement = (achievement) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
      addNotification(`🏆 New Achievement: ${achievement}`);
    }
  };

  // Notification system
  const addNotification = (message) => {
    const id = uuidv4();
    setNotifications(prev => [...prev, { id, message, fadingOut: false }]);

    setTimeout(() => {
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, fadingOut: true } : n)
      );
    }, 2000);

    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const updateScore = (points, type = "Medication") => {
    const newScore = Math.min(10000, Math.max(0, score + points));
    setScore(newScore);
    setExperience(prev => prev + Math.abs(points));
    setScoreData(prev => ({
      ...prev,
      [type]: Math.max(0, (prev[type] || 0) + points),
    }));

    if (newScore >= 100) unlockAchievement('Centurion');
    if (newScore >= 500) unlockAchievement('Eco Master');
    if (newScore >= 1000) unlockAchievement('Sustainability Legend');
  };

  const handleUpgradePurchase = (cost) => {
    setScore(prev => Math.max(0, prev - cost));
  };

  return (
    <div className="eco-game-container">
      {/* Header */}
      <header className="game-header">
        <div className="player-info">
          <UserCharacter user={{ name: "Eco Warrior", level, avatar: null }} />
          <div className="level-info">
            <h4>Level {level}</h4>
            <div className="experience-bar">
              <div
                className="experience-fill"
                style={{ width: `${(experience / (level * 100)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* <div className="score-display">
          <h3>Sustainability Score: {score}</h3>
          <SustainabilityScore scoreData={scoreData} />
        </div> */}

        <div className="game-modes">
          <button
            className={`mode-btn ${gameMode === 'normal' ? 'active' : ''}`}
            onClick={() => setGameMode('normal')}
          >
            Normal Mode
          </button>
          <button
            className={`mode-btn ${gameMode === 'challenge' ? 'active' : ''}`}
            onClick={() => setGameMode('challenge')}
          >
            Challenge Mode
          </button>
          <button
            className={`mode-btn ${gameMode === 'story' ? 'active' : ''}`}
            onClick={() => setGameMode('story')}
          >
            Story Mode
          </button>
        </div>
      </header>

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map(n => (
          <div key={n.id} className={`notification ${n.fadingOut ? 'fade-out' : ''}`}>
            {n.message}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <main className="game-content">
        <div className="game-grid">
          {/* Daily Challenges */}
          <section className="game-section">
            <DailyChallengeBoard onComplete={(pts) => updateScore(pts, "Daily")} />
          </section>

          {/* Game Mode Section */}
          <section className="game-section">
            {gameMode === 'normal' && (
              <>
                <MedicationSorter onScoreChange={(pts) => updateScore(pts, "Medication")} /><br></br>
                <CustomerInteraction onScoreChange={(pts) => updateScore(pts, "CustomerHelp")} /><br></br>
                <PackagingSelector onScoreChange={(pts) => updateScore(pts, "Packaging")} />
              </>
            )}
            {gameMode === 'challenge' && (
              <PharmacyEscapeGame onScoreChange={(pts) => updateScore(pts, "PharmacyEscape")} />
            )}
            {gameMode === 'story' && (
              <EcoPharmacyGame onScoreChange={(pts) => updateScore(pts, "EcoPharmacy")} />
            )}
          </section>

          {/* Side Panel */}
          <section className="game-section side-panel">
            <InventoryTracker onUseItem={(pts) => updateScore(pts, "Inventory")} /><br></br><br></br>
            <EcoUpgradeShop currentScore={score} onPurchase={handleUpgradePurchase} /><br></br>
            <FeedbackCorner/>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="game-footer">
        <div className="achievements-section">
          <h4>🎖️ Achievements ({achievements.length})</h4>
          <div className="achievements-grid">
            {achievements.map(ach => (
              <div key={ach} className="achievement-badge">{ach}</div>
            ))}
          </div>
        </div>
        <Leaderboard score={score} />
      </footer>
    </div>
  );
}

export default PharmacyGame;

