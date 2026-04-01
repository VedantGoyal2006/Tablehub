import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🍽️ TableHub
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/my-bookings" className="navbar-myBookingsBtn">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;