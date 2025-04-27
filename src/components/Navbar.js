import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
import logo from "../assets/SUSTAINA.jpg"; 

const link = document.createElement("link");
link.href = "https://fonts.googleapis.com/css2?family=Nova+Round&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="SustainaSphere" />
        <h1>SustainaSphere</h1>
      </div>

      {/* <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
      </div>  */}

    </nav>
  );
};

export default Navbar;
