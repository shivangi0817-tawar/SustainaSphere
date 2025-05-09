import React, { useState, useEffect } from "react";
import "./CarbonCalculator.css"; 
const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Nova+Round&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const CarbonCalculator = () => {
  const [electricity, setElectricity] = useState(0);
  const [gas, setGas] = useState(0);
  const [transport, setTransport] = useState(0);
  const [flights, setFlights] = useState(0);
  const [diet, setDiet] = useState("average");
  const [totalEmissions, setTotalEmissions] = useState(null);

  useEffect(() => {
    const savedEmissions = localStorage.getItem("carbonFootprint");
    if (savedEmissions) {
      setTotalEmissions(savedEmissions);
    }
  }, []); 

  const calculateEmissions = () => {
    const electricityEmissions = electricity * 0.5; 
    const gasEmissions = gas * 2.3;
    const transportEmissions = transport * 0.2;
    const flightEmissions = flights * 0.25;
    
    let dietEmissions = 0;
    switch (diet) {
      case "vegan":
        dietEmissions = 1.5;
        break;
      case "vegetarian":
        dietEmissions = 2.5;
        break;
      case "meat":
        dietEmissions = 5;
        break;
      default:
        dietEmissions = 3.5;
    }

    const total = electricityEmissions + gasEmissions + transportEmissions + flightEmissions + dietEmissions;
    setTotalEmissions(total.toFixed(2));

    localStorage.setItem("carbonFootprint", total.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <div className="calculator-card">
        <h2 className="title">Find Your Carbon Footprint </h2>
        <p className="subtitle">Measure your environmental impact & take action!</p>

     
        <div className="input-container">
  <div className="input-group">
    <label>Electricity Usage (kWh):</label>
    <button className="arrow-btn" onClick={() => setElectricity(electricity - 1)}>-</button>
    <input type="number" value={electricity} onChange={(e) => setElectricity(Number(e.target.value))} />
    <button className="arrow-btn" onClick={() => setElectricity(electricity + 1)}>+</button>
  </div>

  <div className="input-group">
    <label>Gas Consumption (Liters):</label>
    <button className="arrow-btn" onClick={() => setGas(gas - 1)}>-</button>
    <input type="number" value={gas} onChange={(e) => setGas(Number(e.target.value))} />
    <button className="arrow-btn" onClick={() => setGas(gas + 1)}>+</button>
  </div>

  <div className="input-group">
    <label>Transport (Km Driven):</label>
    <button className="arrow-btn" onClick={() => setTransport(transport - 1)}>-</button>
    <input type="number" value={transport} onChange={(e) => setTransport(Number(e.target.value))} />
    <button className="arrow-btn" onClick={() => setTransport(transport + 1)}>+</button>
  </div>

  <div className="input-group">
    <label>Flights (Km Traveled):</label>
    <button className="arrow-btn" onClick={() => setFlights(flights - 1)}>-</button>
    <input type="number" value={flights} onChange={(e) => setFlights(Number(e.target.value))} />
    <button className="arrow-btn" onClick={() => setFlights(flights + 1)}>+</button>
  </div>
  <div className="input-group">
          <label>Diet <br></br>Type:</label>
          <select value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="vegan">Vegan </option>
            <option value="vegetarian">Vegetarian </option>
            <option value="average">Average </option>
            <option value="meat">Meat-Based </option>
          </select>
        </div>
</div>





        <button className="calculate-btn" onClick={calculateEmissions}>
          Calculate Footprint
        </button>

        {totalEmissions !== null && (
          <div className="result">
            <h3>Your Carbon Footprint: <span>{totalEmissions} kg CO₂</span></h3>
            <p>Take action today for a greener tomorrow! </p>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default CarbonCalculator;
