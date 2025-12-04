import React from 'react';
import Cell from './Cell';
import './NextPiece.css';

const NextPiece = ({ piece }) => {
  if (!piece) return null;
  
  const maxSize = 4;
  const displayGrid = Array.from({ length: maxSize }, () => 
    Array(maxSize).fill({ value: 0, color: null })
  );
  
  const offsetRow = Math.floor((maxSize - piece.shape.length) / 2);
  const offsetCol = Math.floor((maxSize - piece.shape[0].length) / 2);
  
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        displayGrid[row + offsetRow][col + offsetCol] = {
          value: 1,
          color: piece.color
        };
      }
    }
  }
  
  return (
    <div className="next-piece-container">
      <h3>Next</h3>
      <div className="next-piece-grid">
        {displayGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="next-piece-row">
            {row.map((cell, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`} value={cell.value} color={cell.color} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextPiece;
