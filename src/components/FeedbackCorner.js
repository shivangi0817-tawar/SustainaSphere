// components/FeedbackCorner.js
import React from "react";

const fakeFeedbacks = [
  { text: "Loved the eco-friendly packaging! 🌿", type: "positive" },
  { text: "Why no paper bags? Disappointed. 😕", type: "negative" },
  { text: "Appreciate the sustainability tips!", type: "positive" },
  { text: "Too much plastic used in my order.", type: "negative" },
];

const FeedbackCorner = () => {
  return (
    <div className="p-4 mb-4 bg-light rounded shadow">
      <h5>🗣️ Feedback Corner</h5>
      {fakeFeedbacks.map((fb, index) => (
        <div
          key={index}
          className={`alert ${fb.type === "positive" ? "alert-success" : "alert-danger"} mb-2`}
        >
          {fb.text}
        </div>
      ))}
    </div>
  );
};

export default FeedbackCorner;
