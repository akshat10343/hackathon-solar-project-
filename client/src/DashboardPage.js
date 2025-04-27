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
<div className="cards-container">
    <div className="fixed-container">
        <Card title="Solar Power Output">
        <ResponsiveContainer width="100%" height={300}>
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
    </div>
    <div className="cards-grid">
      <div className="card card--small">
        <strong>Energy Usage</strong><br/>
        8.1 kWh
      </div>
      <div className="card card--small">
        <strong>Solar Efficiency</strong><br/>
        85%
      </div>
      <div className="card card--small">
        <strong>Today vs Yesterday</strong><br/>
        +12% 📈
      </div>
      <div className="card card--small">
        <strong>System Status</strong><br/>
        ✅ Operational
      </div>
    </div>
</div>


  );
};

export default DashboardPage;