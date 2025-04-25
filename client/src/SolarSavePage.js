import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function SolarSavePage() {
  const [location, setLocation] = useState("");
  const [solarData, setSolarData] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.trim()) {
      toast.error("⚠️ Please enter a valid location.");
      return;
    }
    try {
      setMessage("Fetching solar data...");
      const response = await axios.post("/solar", { location });
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
    <div>
      <h1>SolarSave 🌞</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Enter your city, state or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px",
            fontSize: "16px"
          }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px" }}>
          Get Solar Data
        </button>
      </form>

      {message && <p style={{ color: "gray" }}>{message}</p>}

      {solarData && (
        <div style={{ marginTop: "2rem" }}>
          <h2>Solar Data for {solarData.location}</h2>
          <p><strong>Latitude:</strong> {solarData.lat}</p>
          <p><strong>Longitude:</strong> {solarData.lon}</p>
          <p><strong>Average Sun Hours/Day:</strong> {solarData.avgSunHoursPerDay || "N/A"} ☀️</p>
          <p><strong>Estimated Annual Savings:</strong> {solarData.potentialSavingsPerYear}</p>
          <p><strong>Estimated CO₂ Offset/Year:</strong> {solarData.co2OffsetPerYear}</p>
        </div>
      )}
    </div>
  );
}

export default SolarSavePage;

