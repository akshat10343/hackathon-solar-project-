import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from './Card'; // Import the Card component

const data = [
  { name: 'Mon', power: 4000 },
  { name: 'Tue', power: 3000 },
  { name: 'Wed', power: 2000 },
  { name: 'Thu', power: 2780 },
  { name: 'Fri', power: 1890 },
  { name: 'Sat', power: 2390 },
  { name: 'Sun', power: 3490 },
];

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Solar Dashboard</h1>
      </div>

      <div className="cards-container">
        <Card title="Solar Power Output">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="power" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Energy Usage">
          <p>8.1 kWh</p>
        </Card>

        <Card title="Solar Efficiency">
          <p>85%</p>
        </Card>
      </div>
      
      <div className="cards-container2">
        <Card title="Solar Power Output">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="power" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Energy Usage">
          <p>8.1 kWh</p>
        </Card>

        <Card title="Solar Efficiency">
          <p>85%</p>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;