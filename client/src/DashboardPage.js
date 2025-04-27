import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLocation } from "react-router-dom";
import Card from './Card'; // Make sure you have a Card component!

const solarIncentives = {
  WA: [
    {
      title: "Federal Tax Credit (ITC)",
      description: "The Federal Investment Tax Credit offers a 26% credit for residential solar installations.",
      link: "https://www.seia.org/initiatives/solar-investment-tax-credit"
    },
    {
      title: "Washington State Solar Incentive",
      description: "Washington offers a state solar incentive program that provides rebates based on your system size.",
      link: "https://www.energy.gov/energysaver/solar-power/solar-incentives"
    }    
  ],
  CA: [
    {
      title: "California Solar Initiative (CSI)",
      description: "California offers rebates for solar energy systems installed on homes and businesses.",
      link: "https://www.gosolarcalifornia.ca.gov/"
    },
    {
      title: "Net Energy Metering (NEM)",
      description: "Net Energy Metering (NEM) allows you to sell excess electricity back to the grid and earn credit.",
      link: "https://www.cpuc.ca.gov/General.aspx?id=3349"
    }
  ]
};

const solarProviders = {
  WA: [
    {
      name: "Tesla Energy",
      description: "End-to-end solar panel + Powerwall storage systems.",
      link: "https://www.tesla.com/solarpanels",
    },
    {
      name: "SunPower",
      description: "High-efficiency residential solar with 25-year warranty.",
      link: "https://us.sunpower.com/solar",
    },
    {
      name: "Vivint Solar",
      description: "Custom solar installations with flexible financing.",
      link: "https://www.vivintsolar.com/",
    },
  ],
  CA: [
    {
      name: "Sunrun",
      description: "Nation’s largest solar provider—buy or lease options.",
      link: "https://www.sunrun.com/",
    },
    {
      name: "Tesla Energy",
      description: "Solar + Powerwall with seamless app monitoring.",
      link: "https://www.tesla.com/solarpanels",
    },
    {
      name: "SunPower",
      description: "Award-winning panels and complete system warranties.",
      link: "https://us.sunpower.com/solar",
    },
  ],
};

function SolarProvidersCard({ locationState }) {
  // Default to Washington
  let selectedState = "WA";

  if (locationState && locationState.toUpperCase() === "CA") {
    selectedState = "CA"; // Switch to California if detected
  }

  const list = solarProviders[selectedState] || [];

  return (
    <Card>
      <h3 style={{textDecoration: "underline", fontSize:'1.2rem'}}>Solar Providers in {selectedState}</h3>
      {list.map((prov, i) => (
        <div key={i}>
          <p style={{fontSize: "1.2rem"}}>{prov.name}: {prov.description}</p>
          <a href={prov.link} target="_blank" rel="noopener noreferrer">
            Visit {prov.name}
          </a>
        </div>
      ))}
    </Card>
  );
}


function SolarIncentivesCard({ locationState }) {
  // Default to Washington
  let selectedState = "WA";

  if (locationState && locationState.toUpperCase() === "CA") {
    selectedState = "CA"; // Switch to California if state is CA
  }

  const incentives = solarIncentives[selectedState] || [];

  return (
    <Card>
      <h3 style={{textDecoration: "underline", fontSize:'1.2rem'}}>Local Solar Incentives for {selectedState}</h3>
      {incentives.map((incentive, index) => (
        <div key={index}>
          <p style={{fontSize: "1.2rem"}}>{incentive.title}: {incentive.description}</p>
          <a href={incentive.link} target="_blank" rel="noopener noreferrer">
            Learn more
          </a>
        </div>
      ))}
    </Card>
  );
}


const DashboardPage = () => {
  const location = useLocation();
  const solarData = location.state?.solarData;

  // Safety check
  if (!solarData) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem' }}>
        <h2>No solar data found! Please go back and calculate first.</h2>
      </div>
    );
  }

  // Multiplier for real-world month differences
const monthlyCostMultipliers = {
  January: 1.10,
  February: 1.05,
  March: 0.95,
  April: 0.90,
  May: 0.95,
  June: 1.10,
  July: 1.20,
  August: 1.20,
  September: 1.05,
  October: 0.95,
  November: 1.00,
  December: 1.10,
};

// Base average monthly cost
const averageMonthlyCostWithoutSolar = 137.20;

// Calculate user's monthly solar savings
const monthlySavings = parseFloat(
  solarData.estimatedSavingsPerYear.replace('$', '')
) / 12;

// 📈 Generate graph data dynamically
const graphData = Object.keys(monthlyCostMultipliers).map((month) => {
  const withoutSolar = averageMonthlyCostWithoutSolar * monthlyCostMultipliers[month];
  const withSolar = withoutSolar - monthlySavings;
  
  return {
    name: month,
    withoutSolar: parseFloat(withoutSolar.toFixed(2)),
    withSolar: parseFloat(withSolar.toFixed(2)),
  };
});




  return (
    <div>
      <div className="cards-container">
        <div className="graph-container">
          <Card title="Estimated Energy Cost per Month">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} tick={{ fontSize: 10 }}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="withoutSolar" stroke="#fc170f" />
                <Line type="monotone" dataKey="withSolar" stroke="#46fa05" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <div className="cards-grid">
          <div className="card card--small">
            <strong>Estimated Annual Savings</strong><br/><br/>
            <p>{solarData.estimatedSavingsPerYear} 💸</p>
          </div>
          <div className="card card--small">
            <strong>Estimated Energy Sales Each Month</strong><br/><br/>
            <p>${monthlySavings.toFixed(2)} 💸</p>
          </div>
          <div className="card card--small">
            <strong>Solar Energy Potential</strong><br/><br/>
            <p>{(solarData.systemSizeKW * solarData.avgSunHoursPerDay * 30 * 0.8).toFixed(0)} kWh ⚡</p>
          </div>
          <div className="card card--small">
            <strong>CO₂ Offset (This Month)</strong><br/><br/>
            <p>{(parseFloat(solarData.co2OffsetPerYear.replace(' kg of CO₂ saved per year', '')) / 12 / 1000).toFixed(2)} tons 🌏</p>
          </div>
        </div>
      </div>

      <div className="cards-container">
        <div className="graph-container">
        <SolarIncentivesCard locationState={solarData?.stateCode} />{/* you can make this dynamic too later! */}
        </div>
        <div className="graph-container">
        <SolarProvidersCard locationState={solarData?.stateCode} />        {/* make dynamic if user location is available */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
