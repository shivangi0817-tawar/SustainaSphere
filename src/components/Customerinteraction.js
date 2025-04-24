import React, { useState } from 'react';

const questions = [
  {
    id: 1,
    question: "A customer wants to throw unused pills in the trash. What's the right advice?",
    options: [
      "Throw them in the trash.",
      "Flush them down the toilet.",
      "Use a medicine take-back program.",
    ],
    correct: 2,
  },
  {
    id: 2,
    question: "Which option is most sustainable?",
    options: [
      "Single-use plastic bottles",
      "Bulk packaging in biodegradable containers",
      "Blister packs with extra padding",
    ],
    correct: 1,
  },
  {
    id: 3,
    question: "How should expired liquid medications be disposed?",
    options: [
      "Pour down the sink",
      "Dilute and mix in coffee grounds",
      "Take to a pharmacy drop-off location",
    ],
    correct: 2,
  }
];

function CustomerInteraction({ onScoreChange }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleAnswer = (index) => {
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      onScoreChange(10);
      setFeedback("✅ Correct! That’s sustainable.");
    } else {
      onScoreChange(-5);
      setFeedback("❌ Not quite. Let’s rethink that.");
    }

    setTimeout(() => {
      setFeedback("");
      setCurrentQuestion((prev) => (prev + 1) % questions.length);
    }, 1500);
  };

  const q = questions[currentQuestion];

  return (
    <div>
      <h4>👥 Customer Interaction</h4>
      <p><strong>Question:</strong> {q.question}</p>
      <div className="d-grid gap-2">
        {q.options.map((opt, idx) => (
          <button
            key={idx}
            className="btn btn-outline-primary"
            onClick={() => handleAnswer(idx)}
          >
            {opt}
          </button>
        ))}
      </div>
      {feedback && <div className="mt-3 alert alert-info">{feedback}</div>}
    </div>
  );
}

export default CustomerInteraction;
