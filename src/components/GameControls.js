import React from 'react';
import './GameControls.css';

const GameControls = ({ onStart, onPause, onResume, gameState, isPaused }) => {
  return (
    <div className="game-controls">
      {gameState === 'idle' && (
        <button className="control-button start" onClick={onStart}>
          Start Game
        </button>
      )}
      
      {gameState === 'playing' && !isPaused && (
        <button className="control-button pause" onClick={onPause}>
          Pause
        </button>
      )}
      
      {gameState === 'playing' && isPaused && (
        <button className="control-button resume" onClick={onResume}>
          Resume
        </button>
      )}
      
      {gameState === 'gameOver' && (
        <button className="control-button restart" onClick={onStart}>
          New Game
        </button>
      )}
      
      <div className="controls-info">
        <h4>Controls</h4>
        <div className="control-item">
          <span>← →</span>
          <span>Move</span>
        </div>
        <div className="control-item">
          <span>↑</span>
          <span>Rotate</span>
        </div>
        <div className="control-item">
          <span>↓</span>
          <span>Drop</span>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
