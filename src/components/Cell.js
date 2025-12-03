import React from 'react';
import './Cell.css';

const Cell = ({ value, color }) => {
  return (
    <div 
      className={`cell ${value ? 'filled' : ''}`}
      style={{ backgroundColor: value ? color : '#1a1a2e' }}
    />
  );
};

export default Cell;
