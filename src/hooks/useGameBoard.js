import { useState, useCallback } from 'react';
import { createEmptyBoard } from '../gameHelpers';

export const useGameBoard = () => {
  const [board, setBoard] = useState(createEmptyBoard());

  const resetBoard = useCallback(() => {
    setBoard(createEmptyBoard());
  }, []);

  return [board, setBoard, resetBoard];
};
