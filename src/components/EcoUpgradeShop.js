// components/EcoUpgradeShop.js
import React, { useState } from "react";
import "../styles/EcoUpgradeShop.css";

const upgradesList = [
  {
    name: "Solar Panels",
    cost: 20,
    description: "Generate clean energy for your pharmacy",
    icon: "☀️",
    benefits: ["+5% energy efficiency", "Reduced carbon footprint"]
  },
  {
    name: "Green Shelves",
    cost: 15,
    description: "Eco-friendly storage solutions",
    icon: "📚",
    benefits: ["+3% organization bonus", "Sustainable materials"]
  },
  {
    name: "Rainwater Harvester",
    cost: 25,
    description: "Collect and reuse rainwater",
    icon: "💧",
    benefits: ["+7% water conservation", "Reduced water bills"]
  }
];

const EcoUpgradeShop = ({ currentScore, onPurchase }) => {
  const [purchased, setPurchased] = useState([]);
  const [purchasing, setPurchasing] = useState(null);
  const [showPurchaseEffect, setShowPurchaseEffect] = useState(null);

  const handlePurchase = (upgrade) => {
    if (currentScore >= upgrade.cost && !purchased.includes(upgrade.name)) {
      setPurchasing(upgrade.name);
      setShowPurchaseEffect(upgrade.name);
      
      // Simulate purchase animation
      setTimeout(() => {
        setPurchased((prev) => [...prev, upgrade.name]);
        onPurchase(upgrade.cost);
        setPurchasing(null);
        setTimeout(() => setShowPurchaseEffect(null), 1000);
      }, 1500);
    }
  };

  return (
    <div className="title">
      <h3>🏪 Eco-Upgrades Shop</h3><br></br>
      <div className="upgrades-grid">
        {upgradesList.map((upgrade) => {
          const isPurchased = purchased.includes(upgrade.name);
          <br></br>
          const canAfford = currentScore >= upgrade.cost;
          <br></br>
          const isPurchasing = purchasing === upgrade.name;
          <br></br>
          const showEffect = showPurchaseEffect === upgrade.name;
<br></br>
          return (
            <div
              key={upgrade.name}
              className={`upgrade-card ${isPurchased ? 'purchased' : ''} ${!canAfford ? 'cannot-afford' : ''} ${showEffect ? 'purchase-effect' : ''}`}
            >
              <div className="upgrade-header">
                <div className="upgrade-icon">{upgrade.icon}</div><br></br>
                <h4>{upgrade.name}</h4>
              </div>
              <p className="upgrade-description">{upgrade.description}</p>
              <div className="upgrade-benefits">
                {upgrade.benefits.map((benefit, index) => (
                  <span key={index} className="benefit-item">✓ {benefit}</span>
                ))}
              </div><br></br>
              <div className="upgrade-footer">
                <div className="upgrade-cost">
                  <span className="cost-amount">{upgrade.cost} pts</span>
                </div>
                <button
                  className={`game-button purchase-button ${isPurchasing ? 'purchasing' : ''}`}
                  onClick={() => handlePurchase(upgrade)}
                  disabled={isPurchased || !canAfford || isPurchasing}
                >
                  {isPurchased ? '✓ Purchased' : isPurchasing ? 'Purchasing...' : 'Buy'}
                </button><br></br>
              </div><br></br><br></br>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EcoUpgradeShop;
