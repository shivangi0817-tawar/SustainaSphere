import React, { useState } from "react";
import "./EcoPharmacyShop.css";

const locations = ["Counter", "Refill Station", "Stock Room"];

const EcoPharmacyShop = () => {
  const [currentLocation, setCurrentLocation] = useState("Counter");

  return (
    <div className="shop-container">
      <h3 className="text-center">Welcome to Your Eco-Pharmacy Shop!</h3>

      <div className="shop-layout">
        {locations.map((location) => (
          <div key={location} className="shop-section">
            <h5>{location}</h5>
            {currentLocation === location && (
              <div className="avatar">🧑‍💻</div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        {locations.map((loc) => (
          <button
            key={loc}
            className="btn btn-success mx-2"
            onClick={() => setCurrentLocation(loc)}
          >
            Go to {loc}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EcoPharmacyShop;
