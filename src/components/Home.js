import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import CSS

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Nova+Round&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">TRACK.REDUCE.SUSTAIN <br/></h1><h2 className="home-t">Your Carbon Journey Starts Here</h2>
      <Link to="/carbon-info">
      <button className="begin-button">Begin Here</button>
</Link>
    </div>
  );
};

export default Home;
 