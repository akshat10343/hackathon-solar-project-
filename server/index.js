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

  if (!location || location.trim() === "") {
    return res.status(400).json({ error: "Location is required." });
  }

  try {
    const openCageKey = process.env.OPENCAGE_API_KEY;
    const nrelKey = process.env.NREL_API_KEY;

    // 1️⃣ Geocode using OpenCage
    const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageKey}`;
    const geoResponse = await axios.get(geocodeUrl);

    if (!geoResponse.data.results.length) {
      return res.status(400).json({ error: "No results found. Enter a valid location." });
    }

    const result = geoResponse.data.results[0];

    // 2️⃣ Check confidence score
    if (result.confidence < 4) {
      return res.status(400).json({ error: "Location is too vague. Please enter a valid city or zip code." });
    }

    const { lat, lng } = result.geometry;

    console.log(`Geocoded: ${location} => lat: ${lat}, lon: ${lng}`);

    // 3️⃣ Call NREL API using lat/lon
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

