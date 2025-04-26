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

const stateElectricityRates = {
  AL: 0.14, AK: 0.22, AZ: 0.13, AR: 0.11, CA: 0.28, 
  CO: 0.13, CT: 0.25, DE: 0.17, FL: 0.14, GA: 0.13, 
  HI: 0.44, ID: 0.11, IL: 0.14, IN: 0.13, IA: 0.12, 
  KS: 0.13, KY: 0.12, LA: 0.11, ME: 0.23, MD: 0.16, 
  MA: 0.28, MI: 0.17, MN: 0.15, MS: 0.12, MO: 0.13, 
  MT: 0.12, NE: 0.12, NV: 0.12, NH: 0.27, NJ: 0.18, 
  NM: 0.14, NY: 0.22, NC: 0.13, ND: 0.12, OH: 0.13, 
  OK: 0.11, OR: 0.13, PA: 0.16, RI: 0.29, SC: 0.14, 
  SD: 0.13, TN: 0.13, TX: 0.14, UT: 0.11, VT: 0.27, 
  VA: 0.13, WA: 0.11, WV: 0.13, WI: 0.16, WY: 0.11
};

app.post("/solar", async (req, res) => {
  const { location, lat, lon, systemSizeKW } = req.body;

  if (!location && (!lat || !lon)) {
    return res.status(400).json({ error: "Location or coordinates are required." });
  }

  try {
    const openCageKey = process.env.OPENCAGE_API_KEY;
    const nrelKey = process.env.NREL_API_KEY;
    let latitude, longitude;
    let resolvedLocation = location; 
    let stateCode = null;

    if (lat && lon) {
      latitude = lat;
      longitude = lon;
    } else {
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${openCageKey}`;
      const geoResponse = await axios.get(geocodeUrl);

      if (!geoResponse.data.results.length) {
        return res.status(400).json({ error: "No results found. Enter a valid location." });
      }

      const result = geoResponse.data.results[0];

      if (result.confidence < 4) {
        return res.status(400).json({ error: "Location is too vague. Please enter a more specific city or zip code." });
      }

      latitude = result.geometry.lat;
      longitude = result.geometry.lng;
      stateCode = result.components.state_code;
      resolvedLocation = result.formatted || location;
    }

    if (!stateCode && lat && lon) {
      const reverseGeocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${openCageKey}`;
      const reverseGeoResponse = await axios.get(reverseGeocodeUrl);
      if (reverseGeoResponse.data.results.length) {
        stateCode = reverseGeoResponse.data.results[0].components.state_code;
      }
    }

    if (!stateCode || !stateElectricityRates[stateCode]) {
      return res.status(400).json({ error: "Unable to determine electricity rate for your location." });
    }

    const electricityRate = stateElectricityRates[stateCode];

    const nrelUrl = `https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=${nrelKey}&lat=${latitude}&lon=${longitude}`;
    const solarResponse = await axios.get(nrelUrl);

    const solarData = solarResponse.data.outputs;
    const avgSunHoursPerDay = solarData.avg_dni?.annual;

    if (!avgSunHoursPerDay) {
      return res.status(400).json({ error: "Solar data unavailable for your location." });
    }

    const userSystemSizeKW = systemSizeKW || 5; // Default to 5kW if missing
    const panelEfficiency = 0.8; // Assume 80% efficiency real-world

    const kWhPerYear = userSystemSizeKW * avgSunHoursPerDay * 365 * panelEfficiency;
    const savingsPerYear = (kWhPerYear * electricityRate).toFixed(2);

    const kgCO2PerKWh = 0.85;
    const kgCO2SavedPerYear = kWhPerYear * kgCO2PerKWh;
    const treesPlantedEquivalent = (kgCO2SavedPerYear / 21).toFixed(1);
    const carsTakenOffRoadEquivalent = (kgCO2SavedPerYear / 4600).toFixed(2);

    res.json({
      location: resolvedLocation,
      lat: latitude,
      lon: longitude,
      systemSizeKW: userSystemSizeKW,
      avgSunHoursPerDay,
      estimatedSavingsPerYear: `$${savingsPerYear}`,
      electricityRate: `$${electricityRate}/kWh`,
      co2OffsetPerYear: `${kgCO2SavedPerYear.toFixed(0)} kg of CO₂ saved per year`,
      treesPlantedEquivalent,
      carsTakenOffRoadEquivalent
    });

  } catch (error) {
    console.error("Error in /solar route:", error.message);
    res.status(500).json({ error: "Failed to fetch solar data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

