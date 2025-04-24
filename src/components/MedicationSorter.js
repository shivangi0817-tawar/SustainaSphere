import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

const medications = [
  { 
    id: 1, 
    name: "Expired Aspirin", 
    category: "Recyclable",
    icon: "💊",
    description: "Glass bottle can be recycled"
  },
  { 
    id: 2, 
    name: "Antibiotics", 
    category: "Hazardous",
    icon: "🧪",
    description: "Must be disposed of properly"
  },
  { 
    id: 3, 
    name: "Vitamins", 
    category: "Compostable",
    icon: "🌿",
    description: "Natural ingredients can be composted"
  },
  { 
    id: 4, 
    name: "Painkillers", 
    category: "Hazardous",
    icon: "💊",
    description: "Contains harmful chemicals"
  },
  { 
    id: 5, 
    name: "Herbal Teas", 
    category: "Compostable",
    icon: "🍵",
    description: "100% natural and biodegradable"
  },
  {
    id: 6,
    name: "Empty Inhalers",
    category: "Recyclable",
    icon: "🫁",
    description: "Metal components can be recycled"
  }
];

const categories = [
  {
    name: "Recyclable",
    icon: "♻️",
    color: "#27ae60",
    description: "Items that can be processed and reused"
  },
  {
    name: "Hazardous",
    icon: "⚠️",
    color: "#e74c3c",
    description: "Requires special disposal methods"
  },
  {
    name: "Compostable",
    icon: "🌱",
    color: "#f39c12",
    description: "Can decompose naturally"
  }
];

function Medication({ medication, handleDrop, isBeingDragged }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "MEDICATION",
    item: { id: medication.id, category: medication.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`medication-item ${isDragging ? 'dragging' : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        cursor: 'move',
      }}
    >
      <div className="medication-icon">{medication.icon}</div>
      <div className="medication-info">
        <h6>{medication.name}</h6>
        <p>{medication.description}</p>
      </div>

      <style jsx>{`
        .medication-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border-radius: 10px;
          margin-bottom: 0.5rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .medication-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .medication-item.dragging {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .medication-icon {
          font-size: 1.5rem;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border-radius: 50%;
        }

        .medication-info {
          flex: 1;
        }

        .medication-info h6 {
          margin: 0;
          font-weight: 600;
        }

        .medication-info p {
          margin: 0;
          font-size: 0.8rem;
          color: #666;
        }
      `}</style>
    </div>
  );
}

function Category({ category, handleDrop, itemCount }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "MEDICATION",
    drop: (item) => handleDrop(item, category.name),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`category-box ${isOver ? 'hover' : ''}`}
      style={{
        backgroundColor: `${category.color}15`,
        borderColor: category.color,
      }}
    >
      <div className="category-header">
        <span className="category-icon">{category.icon}</span>
        <h5>{category.name}</h5>
      </div>
      <p className="category-description">{category.description}</p>
      <div className="category-counter">
        Items: {itemCount}
      </div>

      <style jsx>{`
        .category-box {
          padding: 1.5rem;
          border-radius: 15px;
          border: 2px dashed;
          height: 200px;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .category-box.hover {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .category-icon {
          font-size: 1.5rem;
        }

        .category-description {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: auto;
        }

        .category-counter {
          font-size: 0.8rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

function MedicationSorter({ onScoreChange }) {
  const [sorted, setSorted] = useState({
    Recyclable: [],
    Hazardous: [],
    Compostable: [],
  });
  const [feedback, setFeedback] = useState("");
  const [streak, setStreak] = useState(0);

  const handleDrop = (item, category) => {
    const isCorrect = item.category === category;
    
    if (isCorrect) {
      setSorted((prev) => ({
        ...prev,
        [category]: [...prev[category], medications.find((med) => med.id === item.id)],
      }));
      setStreak(prev => prev + 1);
      const bonusPoints = Math.min(Math.floor(streak / 3) * 5, 15);
      onScoreChange(10 + bonusPoints);
      setFeedback(`✨ Correct! +${10 + bonusPoints} points (${streak + 1} streak)`);
    } else {
      setStreak(0);
      onScoreChange(-5);
      setFeedback("❌ Incorrect! Try again.");
    }

    setTimeout(() => setFeedback(""), 2000);
  };

  return (
    <div className="medication-sorter">
      <div className="sorter-header">
        <h4>🧪 Medication Waste Management</h4>
        <div className="streak-counter">
          Streak: {streak} 🔥
        </div>
      </div>

      {feedback && (
        <div className={`feedback-message ${feedback.includes('Correct') ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}

      <div className="categories-grid">
        {categories.map((category) => (
          <Category 
            key={category.name} 
            category={category} 
            handleDrop={handleDrop}
            itemCount={sorted[category.name].length}
          />
        ))}
      </div>

      <div className="medications-list">
        <h5>Available Medications</h5>
        {medications.filter(med => !Object.values(sorted).flat().find(m => m.id === med.id))
          .map((med) => (
            <Medication 
              key={med.id} 
              medication={med} 
              handleDrop={handleDrop}
            />
          ))}
      </div>

      <style jsx>{`
        .medication-sorter {
          padding: 2rem;
          background: white;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .sorter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .streak-counter {
          padding: 0.5rem 1rem;
          background: #f8f9fa;
          border-radius: 20px;
          font-weight: 500;
        }

        .feedback-message {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 10px;
          text-align: center;
          animation: slideDown 0.3s ease-out;
        }

        .feedback-message.success {
          background: #d4edda;
          color: #155724;
        }

        .feedback-message.error {
          background: #f8d7da;
          color: #721c24;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .medications-list {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 10px;
        }

        @keyframes slideDown {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default MedicationSorter;
