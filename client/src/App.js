import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import SolarSavePage from "./SolarSavePage";
import DashboardPage from "./DashboardPage";
import './index.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div style={styles.container}>
        <nav style={styles.navbar}>
          <h1 style={styles.logo}>SolarSave 🌞</h1>
          <ul style={styles.navLinks}>
            <li><Link to="/" style={styles.link}>Home</Link></li>
            <li><Link to="/solar" style={styles.link}>Solar Calculator</Link></li>
            <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solar" element={<SolarSavePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(to right, #fceabb, #f8b500)",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)"
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "2rem",
    margin: 0,
    padding: 0
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    fontSize: "1.1rem"
  }
};

export default App;
