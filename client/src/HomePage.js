import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.heading}>Harness the Power of the Sun</h2>
        <p style={styles.subheading}>
          Calculate your savings and reduce your carbon footprint with SolarSave.
        </p>
        <Link to="/solar" style={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
    color: "#333",
  },
  content: {
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: "3rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  ctaButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#ff9900",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
};

export default HomePage;
