export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createEmptyBoard = () => {
  return Array.from({ length: BOARD_HEIGHT }, () => 
    Array(BOARD_WIDTH).fill({ value: 0, color: null })
  );
};

export const rotatePiece = (shape) => {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      rotated[col][rows - 1 - row] = shape[row][col];
    }
  }
  
  return rotated;
};

export const checkCollision = (board, piece, position) => {
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        const newRow = position.row + row;
        const newCol = position.col + col;
        
        if (
          newRow >= BOARD_HEIGHT ||
          newCol < 0 ||
          newCol >= BOARD_WIDTH ||
          (newRow >= 0 && board[newRow][newCol].value !== 0)
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const mergePieceToBoard = (board, piece, position) => {
  const newBoard = board.map(row => row.map(cell => ({ ...cell })));
  
  for (let row = 0; row < piece.shape.length; row++) {
    for (let col = 0; col < piece.shape[row].length; col++) {
      if (piece.shape[row][col]) {
        const boardRow = position.row + row;
        const boardCol = position.col + col;
        
        if (boardRow >= 0 && boardRow < BOARD_HEIGHT) {
          newBoard[boardRow][boardCol] = {
            value: 1,
            color: piece.color
          };
        }
      }
    }
  }
  
  return newBoard;
};

export const clearLines = (board) => {
  let linesCleared = 0;
  const newBoard = [];
  
  for (let row = BOARD_HEIGHT - 1; row >= 0; row--) {
    const isComplete = board[row].every(cell => cell.value !== 0);
    
    if (!isComplete) {
      newBoard.unshift(board[row]);
    } else {
      linesCleared++;
    }
  }
  
  while (newBoard.length < BOARD_HEIGHT) {
    newBoard.unshift(Array(BOARD_WIDTH).fill({ value: 0, color: null }));
  }
  
  return { board: newBoard, linesCleared };
};

export const calculateScore = (linesCleared, level) => {
  const baseScores = {
    1: 100,
    2: 300,
    3: 500,
    4: 800
  };
  
  return (baseScores[linesCleared] || 0) * level;
};

export const calculateLevel = (totalLines) => {
  return Math.floor(totalLines / 10) + 1;
};

export const getDropSpeed = (level) => {
  return Math.max(100, 1000 - (level - 1) * 100);
};
