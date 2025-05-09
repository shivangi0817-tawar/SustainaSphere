import React, { useEffect, useState } from "react";
import '../styles/DailyChallengeBoard.css';

const challenges = [
  {
    id: 1,
    text: "Serve 3 eco-conscious customers",
    points: 15,
    icon: "fa-solid fa-users",
    difficulty: "Easy",
  },
  {
    id: 2,
    text: "Use 5 biodegradable packages today",
    points: 20,
    icon: "fa-solid fa-box",
    difficulty: "Medium",
  },
  {
    id: 3,
    text: "Collect 5 positive feedback responses",
    points: 25,
    icon: "fa-solid fa-comment-dots",
    difficulty: "Medium",
  },
  {
    id: 4,
    text: "Complete a full day without using plastic",
    points: 30,
    icon: "fa-solid fa-leaf",
    difficulty: "Hard",
  },
  {
    id: 5,
    text: "Help 3 customers properly dispose of medications",
    points: 20,
    icon: "fa-solid fa-recycle",
    difficulty: "Medium",
  },
  {
    id: 6,
    text: "Recommend eco-friendly alternatives to 5 customers",
    points: 25,
    icon: "fa-solid fa-heart",
    difficulty: "Medium",
  }
];

const DailyChallengeBoard = ({ onComplete }) => {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Get today's date at midnight for consistent daily challenges
    const today = new Date();
    today.setHours(24, 0, 0, 0);
    
    // Calculate time until next reset
    setTimeLeft(today.getTime() - Date.now());

    // Generate 3 random challenges for the day
    const shuffled = [...challenges].sort(() => 0.5 - Math.random());
    setDailyTasks(shuffled.slice(0, 3));

    // Load completed tasks from localStorage
    const saved = localStorage.getItem('completedTasks');
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }

    // Reset timer every minute
    const timer = setInterval(() => {
      setTimeLeft(today.getTime() - Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleTaskCompletion = (task) => {
    if (!completedTasks.includes(task.id)) {
      setCompletedTasks(prev => {
        const newCompleted = [...prev, task.id];
        localStorage.setItem('completedTasks', JSON.stringify(newCompleted));
        return newCompleted;
      });
      onComplete(task.points);
    }
  };

  const formatTimeLeft = () => {
    if (!timeLeft) return '';
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#c0392b';
      default: return '#2c3e50';
    }
  };

  return (
    <div className="game-card daily-challenge-board">
      <div className="challenge-header">
        <h4><i className="fa-solid fa-bullseye"></i> Daily Challenges</h4>
        <div className="time-left">
          <i className="fa-solid fa-clock"></i> Resets in: {formatTimeLeft()}
        </div>
      </div>
<br></br>
      <div className="challenges-list">
        {dailyTasks.map((task) => (
          <div 
            key={task.id}
            className={`challenge-item ${completedTasks.includes(task.id) ? 'completed' : ''}`}
          >
            <div className="challenge-icon">
              <i className={task.icon}></i>
            </div>
            <div className="challenge-content">
              <div className="challenge-text">{task.text}</div><br></br>
              <div className="challenge-meta">
              <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(task.difficulty) }}
                >
                  {task.difficulty}
                </span>
               <br></br> <span className="points-badge">
                  <i className="fa-solid fa-star"></i> +{task.points} pts
                </span>
              </div>
            </div>
            <button 
            style={{minWidth: '215px' }}
              className={`game-button complete-btn ${completedTasks.includes(task.id) ? 'completed' : ''}`}
              onClick={() => handleTaskCompletion(task)}
              disabled={completedTasks.includes(task.id)}
            >
              {completedTasks.includes(task.id) ? <i className="fa-solid fa-check"></i> : 'Complete'}
            </button><br></br><br></br>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyChallengeBoard;
