import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SolarSavePage() {
  const [location, setLocation] = useState("");
  const [systemSize, setSystemSize] = useState(5); // Default 5kW system
  const [solarData, setSolarData] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("⚠️ Please enter a valid location.");
      return;
    }
    fetchSolarData({ location, systemSizeKW: systemSize });
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchSolarData({ lat, lon, systemSizeKW: systemSize });
      },
      (error) => {
        console.error(error);
        toast.error("Failed to get your location. Please allow location access.");
      }
    );
  };

  const fetchSolarData = async (data) => {
    try {
      setMessage("Fetching solar data...");
      const response = await axios.post("/solar", data);
      setSolarData(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setSolarData(null);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(`⚠️ ${error.response.data.error}`);
      } else {
        toast.error("⚠️ Failed to fetch solar data. Please try again.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>SolarSave 🌞</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your city, state, or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={styles.input}
        />
        <div style={styles.dropdownContainer}>
          <label htmlFor="systemSize" style={styles.dropdownLabel}>
            System Size:
          </label>
          <select
            id="systemSize"
            value={systemSize}
            onChange={(e) => setSystemSize(parseInt(e.target.value))}
            style={styles.select}
          >
            <option value={3}>Small (3 kW)</option>
            <option value={5}>Standard (5 kW)</option>
            <option value={10}>Large (10 kW)</option>
          </select>
        </div>
        <button type="submit" style={styles.button}>
          Get Solar Data
        </button>
      </form>

      <button onClick={handleUseMyLocation} style={styles.locationButton}>
        Use My Current Location 📍
      </button>

      {message && <p style={styles.message}>{message}</p>}

      {solarData && (
        <div style={styles.resultBox}>
          <h2>Solar Data for {solarData.location || "your location"}</h2>
          <p><strong>Latitude:</strong> {solarData.lat}</p>
          <p><strong>Longitude:</strong> {solarData.lon}</p>
          <p><strong>Average Sun Hours/Day:</strong> {solarData.avgSunHoursPerDay} ☀️</p>
          <p><strong>System Size Selected:</strong> {solarData.systemSizeKW} kW</p>
          <p><strong>Electricity Rate:</strong> {solarData.electricityRate}</p>
          <p><strong>Estimated Annual Savings:</strong> {solarData.estimatedSavingsPerYear}</p>

          <h3 style={{ marginTop: "1.5rem" }}>🌎 Environmental Impact</h3>
          <p><strong>CO₂ Offset:</strong> {solarData.co2OffsetPerYear}</p>
          <p><strong>Trees Planted Equivalent:</strong> {solarData.treesPlantedEquivalent} 🌳</p>
          <p><strong>Cars Taken Off the Road Equivalent:</strong> {solarData.carsTakenOffRoadEquivalent} 🚗</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#333",
  },
  form: {
    marginBottom: "1.5rem",
  },
  input: {
    padding: "10px",
    width: "280px",
    fontSize: "16px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  dropdownContainer: {
    display: "inline-block",
    marginLeft: "10px",
  },
  dropdownLabel: {
    marginRight: "5px",
    fontSize: "16px",
    color: "#333",
  },
  select: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#ff9900",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  locationButton: {
    marginTop: "1rem",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    marginTop: "1rem",
    fontSize: "16px",
    color: "#666",
  },
  resultBox: {
    marginTop: "2rem",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    margin: "2rem auto",
  },
};

export default SolarSavePage;
