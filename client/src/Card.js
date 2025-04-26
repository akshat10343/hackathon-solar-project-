import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        {children} {/* This will render the chart inside the card */}
      </div>
    </div>
  );
};

export default Card;