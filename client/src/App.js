import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import SolarSavePage from "./SolarSavePage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <nav style={{ marginBottom: "2rem" }}>
          <Link to="/" style={{ marginRight: "20px", fontSize: "20px" }}>Home</Link>
          <Link to="/solar" style={{ fontSize: "20px" }}>SolarSave</Link>
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
