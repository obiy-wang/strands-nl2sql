import React from 'react';
import './GameOver.css';

const GameOver = ({ score, lines }) => {
  return (
    <div className="game-over-overlay">
      <div className="game-over-content">
        <h2>Game Over!</h2>
        <div className="final-stats">
          <div className="stat">
            <span className="stat-label">Final Score</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Lines Cleared</span>
            <span className="stat-value">{lines}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
