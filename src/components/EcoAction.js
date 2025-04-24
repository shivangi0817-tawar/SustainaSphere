// EcoAction.js
import React, { useState } from "react";
import "../styles/GameTheme.css";

function EcoAction({ onScoreChange }) {
  const [action, setAction] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    let points = 0;
    switch (action) {
      case "recycle":
        points = 10;
        break;
      case "energy-saving":
        points = 8;
        break;
      case "reduce-waste":
        points = 7;
        break;
      case "plant-tree":
        points = 12;
        break;
      default:
        points = 0;
    }
    
    // Simulate a delay for better UX
    setTimeout(() => {
      onScoreChange(points);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setAction("");
      }, 2000);
    }, 1000);
  };

  const actions = [
    {
      value: "recycle",
      label: "♻️ Recycle",
      description: "Properly dispose of waste materials",
      points: 10,
      icon: "♻️"
    },
    {
      value: "energy-saving",
      label: "💡 Save Energy",
      description: "Reduce energy consumption",
      points: 8,
      icon: "💡"
    },
    {
      value: "reduce-waste",
      label: "🗑️ Reduce Waste",
      description: "Minimize waste production",
      points: 7,
      icon: "🗑️"
    },
    {
      value: "plant-tree",
      label: "🌱 Plant a Tree",
      description: "Contribute to reforestation",
      points: 12,
      icon: "🌱"
    }
  ];

  return (
    <div className="game-card eco-action">
      <h3>Choose an Eco Action</h3>
      <div className="action-grid">
        {actions.map((item) => (
          <label 
            key={item.value} 
            className={`action-option ${action === item.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              value={item.value}
              checked={action === item.value}
              onChange={handleActionChange}
            />
            <div className="action-icon">{item.icon}</div>
            <div className="action-content">
              <h4>{item.label}</h4>
              <p>{item.description}</p>
              <span className="action-points">+{item.points} points</span>
            </div>
          </label>
        ))}
      </div>
      <button
        className={`game-button action-submit ${isSubmitting ? 'submitting' : ''} ${showSuccess ? 'success' : ''}`}
        onClick={handleSubmit}
        disabled={!action || isSubmitting}
      >
        {isSubmitting ? 'Processing...' : showSuccess ? '✓ Success!' : 'Confirm Action'}
      </button>
    </div>
  );
}

export default EcoAction;
