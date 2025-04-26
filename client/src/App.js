// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import SolarSavePage from "./SolarSavePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// no need to import index.css here because it's already imported in index.js

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/solar" className="nav-link">SolarSave</Link>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solar" element={<SolarSavePage />} />
        </Routes>

        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;