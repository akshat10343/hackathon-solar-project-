// server/index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("SolarSave Backend is running!");
});

const axios = require("axios");

app.post("/solar", async (req, res) => {
  const { location } = req.body;
  console.log("Received location from client:", location);

  if (!location || location.trim() === "") {
    return res.status(400).json({ error: "Location is required." });
  }

  try {
    const openCageKey = process.env.OPENCAGE_API_KEY; // Add this to your .env
    const nrelKey = process.env.NREL_API_KEY;

    // 1️⃣ First: Geocode address to lat/lon
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageKey}`;

    const geoResponse = await axios.get(geocodeUrl);
    const { lat, lng } = geoResponse.data.results[0].geometry;

    console.log(`Geocoded ${location} to lat: ${lat}, lon: ${lng}`);

    // 2️⃣ Then: Get solar data from NREL
    const nrelUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${nrelKey}&lat=${lat}&lon=${lng}`;

    const solarResponse = await axios.get(nrelUrl);

    const solarData = solarResponse.data.outputs;

    res.json({
      location: location,
      lat,
      lon: lng,
      avgSunHoursPerDay: solarData.avg_dni?.annual,
      potentialSavingsPerYear: "$1000+",
      co2OffsetPerYear: "Around 1 ton+"
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch solar data" });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
