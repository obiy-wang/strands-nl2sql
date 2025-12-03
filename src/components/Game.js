import React, { useState, useCallback, useEffect } from 'react';
import Board from './Board';
import NextPiece from './NextPiece';
import GameInfo from './GameInfo';
import GameControls from './GameControls';
import GameOver from './GameOver';
import { useGameBoard } from '../hooks/useGameBoard';
import { useInterval } from '../hooks/useInterval';
import { randomTetromino } from '../tetrominoes';
import {
  checkCollision,
  mergePieceToBoard,
  clearLines,
  calculateScore,
  calculateLevel,
  getDropSpeed,
  rotatePiece,
  BOARD_WIDTH
} from '../gameHelpers';
import './Game.css';

const Game = () => {
  const [board, setBoard, resetBoard] = useGameBoard();
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [position, setPosition] = useState({ row: 0, col: 0 });
  const [score, setScore] = useState(0);
  const [lines, setLines] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('idle');
  const [isPaused, setIsPaused] = useState(false);
  const [dropSpeed, setDropSpeed] = useState(1000);

  const spawnPiece = useCallback(() => {
    const piece = nextPiece || randomTetromino();
    const newNextPiece = randomTetromino();
    const startCol = Math.floor((BOARD_WIDTH - piece.shape[0].length) / 2);
    const startRow = 0;

    if (checkCollision(board, piece, { row: startRow, col: startCol })) {
      setGameState('gameOver');
      return false;
    }

    setCurrentPiece(piece);
    setNextPiece(newNextPiece);
    setPosition({ row: startRow, col: startCol });
    return true;
  }, [board, nextPiece]);

  const startGame = useCallback(() => {
    resetBoard();
    setScore(0);
    setLines(0);
    setLevel(1);
    setDropSpeed(1000);
    setIsPaused(false);
    setGameState('playing');
    setNextPiece(randomTetromino());
    setCurrentPiece(null);
  }, [resetBoard]);

  const pauseGame = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeGame = useCallback(() => {
    setIsPaused(false);
  }, []);

  const movePiece = useCallback((rowDelta, colDelta) => {
    if (!currentPiece || gameState !== 'playing' || isPaused) return false;

    const newPosition = {
      row: position.row + rowDelta,
      col: position.col + colDelta
    };

    if (!checkCollision(board, currentPiece, newPosition)) {
      setPosition(newPosition);
      return true;
    }
    return false;
  }, [currentPiece, position, board, gameState, isPaused]);

  const rotatePieceHandler = useCallback(() => {
    if (!currentPiece || gameState !== 'playing' || isPaused) return;

    const rotated = {
      ...currentPiece,
      shape: rotatePiece(currentPiece.shape)
    };

    if (!checkCollision(board, rotated, position)) {
      setCurrentPiece(rotated);
    } else {
      const leftOffset = { row: position.row, col: position.col - 1 };
      const rightOffset = { row: position.row, col: position.col + 1 };
      
      if (!checkCollision(board, rotated, leftOffset)) {
        setCurrentPiece(rotated);
        setPosition(leftOffset);
      } else if (!checkCollision(board, rotated, rightOffset)) {
        setCurrentPiece(rotated);
        setPosition(rightOffset);
      }
    }
  }, [currentPiece, position, board, gameState, isPaused]);

  const dropPiece = useCallback(() => {
    if (!currentPiece || gameState !== 'playing' || isPaused) return;

    if (!movePiece(1, 0)) {
      const newBoard = mergePieceToBoard(board, currentPiece, position);
      const { board: clearedBoard, linesCleared } = clearLines(newBoard);
      
      setBoard(clearedBoard);
      
      if (linesCleared > 0) {
        const newLines = lines + linesCleared;
        const newLevel = calculateLevel(newLines);
        const pointsEarned = calculateScore(linesCleared, level);
        
        setLines(newLines);
        setScore(score + pointsEarned);
        setLevel(newLevel);
        setDropSpeed(getDropSpeed(newLevel));
      }
      
      setCurrentPiece(null);
    }
  }, [currentPiece, position, board, movePiece, lines, level, score, gameState, isPaused, setBoard]);

  const hardDrop = useCallback(() => {
    if (!currentPiece || gameState !== 'playing' || isPaused) return;

    let dropDistance = 0;
    while (movePiece(1, 0)) {
      dropDistance++;
    }
    
    if (dropDistance === 0) {
      dropPiece();
    }
  }, [currentPiece, movePiece, dropPiece, gameState, isPaused]);

  useEffect(() => {
    if (gameState === 'playing' && !currentPiece && !isPaused) {
      spawnPiece();
    }
  }, [gameState, currentPiece, spawnPiece, isPaused]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing' || isPaused) return;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          movePiece(0, -1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          movePiece(0, 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          dropPiece();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePieceHandler();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, movePiece, dropPiece, rotatePieceHandler, hardDrop, isPaused]);

  useInterval(() => {
    if (gameState === 'playing' && !isPaused) {
      dropPiece();
    }
  }, gameState === 'playing' && !isPaused ? dropSpeed : null);

  return (
    <div className="game-container">
      <h1 className="game-title">React Tetris</h1>
      <div className="game-content">
        <div className="game-board-wrapper">
          <Board board={board} currentPiece={currentPiece} position={position} />
          {gameState === 'gameOver' && <GameOver score={score} lines={lines} />}
          {isPaused && gameState === 'playing' && (
            <div className="pause-overlay">
              <h2>Paused</h2>
            </div>
          )}
        </div>
        <div className="game-sidebar">
          <NextPiece piece={nextPiece} />
          <GameInfo score={score} level={level} lines={lines} />
          <GameControls
            onStart={startGame}
            onPause={pauseGame}
            onResume={resumeGame}
            gameState={gameState}
            isPaused={isPaused}
          />
        </div>
      </div>
    </div>
  );
};

export default Game;
