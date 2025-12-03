import React from 'react';
import Cell from './Cell';
import './Board.css';

const Board = ({ board, currentPiece, position }) => {
  const displayBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  if (currentPiece && position) {
    for (let row = 0; row < currentPiece.shape.length; row++) {
      for (let col = 0; col < currentPiece.shape[row].length; col++) {
        if (currentPiece.shape[row][col]) {
          const boardRow = position.row + row;
          const boardCol = position.col + col;
          
          if (boardRow >= 0 && boardRow < board.length && 
              boardCol >= 0 && boardCol < board[0].length) {
            displayBoard[boardRow][boardCol] = {
              value: 1,
              color: currentPiece.color
            };
          }
        }
      }
    }
  }
  
  return (
    <div className="board">
      {displayBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} value={cell.value} color={cell.color} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
