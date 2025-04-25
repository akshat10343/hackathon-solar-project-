import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <h1>Welcome to SolarSave 🌞</h1>
      <p style={{ fontSize: "18px", marginTop: "1rem" }}>
        Discover how much money and energy you can save with solar panels!
      </p>
      <Link to="/solar">
        <button style={{ marginTop: "2rem", padding: "10px 20px", fontSize: "18px" }}>
          Get Started
        </button>
      </Link>
    </div>
  );
}

export default HomePage;

