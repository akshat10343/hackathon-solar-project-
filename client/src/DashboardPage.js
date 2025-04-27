import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card'; // Import the Card component

const data = [
  { name: 'January', withoutSolar: 240, withSolar: 30 },
  { name: 'February', withoutSolar: 225, withSolar: 28 },
  { name: 'March', withoutSolar: 195, withSolar: 20 },
  { name: 'April', withoutSolar: 180, withSolar: 12 },
  { name: 'May', withoutSolar: 160, withSolar: 8 },
  { name: 'June', withoutSolar: 170, withSolar: 7 },
];

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

function SolarProvidersCard({ state }) {
  const list = solarProviders[state] || [];

  return (
    <Card>
      <h3 style={{textDecoration: "underline", fontSize:'1.2rem'}}>Solar Providers in {state}</h3>
      {list.map((prov, i) => (
        <div key={i}>
          <p className='incentive-item' style={{fontSize: "1.2rem"}}>{prov.name}: {prov.description}</p>
          <a
            href={prov.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit {prov.name}
          </a>
        </div>
      ))}
    </Card>
  );
}

function SolarIncentivesCard({ state }) {
  const incentives = solarIncentives[state];

  return (
    <Card>
      <h3 style={{textDecoration: "underline", fontSize:'1.2rem'}}>Local Solar Incentives for {state}</h3>
      {incentives.map((incentive, index) => (
        <div key={index}>
          <p className="incentive-item" style={{fontSize: "1.2rem"}}>{incentive.title + ": " + incentive.description}</p>
          <a href={incentive.link} target="_blank" rel="noopener noreferrer">
            Learn More about the {incentive.title}
          </a>
        </div>
      ))}
    </Card>
  );
}

const DashboardPage = () => {
  return (
<div>
<div className="cards-container">
    <div className="graph-container">
        <Card title="Estimated Energy Cost per month">
        <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
      <div className="card card--small" styles={{fontSize: '2rem'}}>
        <strong>Estimated Annual Savings</strong><br/><br/>
        <p>$968 💸</p>
      </div>
      <div className="card card--small">
        <strong>Estimated energy sales each month</strong><br/><br/>
        <p>$40 💸</p>
      </div>
      <div className="card card--small">
        <strong>Solar Energy Potential</strong><br/><br/>
        <p>4511 kWh ⚡</p>
      </div>
      <div className="card card--small">
        <strong>CO₂ Offset (This Month)</strong><br/><br/>
        <p>0.75 tons of CO₂ 🌏</p>
      </div>
    </div>
</div>
<div className="cards-container">
    <div className="graph-container">
        <SolarIncentivesCard state="WA" />
    </div>
    <div className="graph-container">
      <SolarProvidersCard state="WA" />
    </div>
</div>
</div>


  );
};

export default DashboardPage;