import React from 'react';
import './GameInfo.css';

const GameInfo = ({ score, level, lines }) => {
  return (
    <div className="game-info">
      <div className="info-item">
        <span className="info-label">Score</span>
        <span className="info-value">{score}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Level</span>
        <span className="info-value">{level}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Lines</span>
        <span className="info-value">{lines}</span>
      </div>
    </div>
  );
};

export default GameInfo;
