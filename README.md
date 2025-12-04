# React Tetris Game

A fully functional React-based Tetris game with modern UI and complete gameplay features.

## Features

- **Classic Tetris Gameplay**: 7 classic tetrominoes (I, O, T, S, Z, J, L)
- **Keyboard Controls**:
  - ← / → Arrow keys: Move piece left/right
  - ↑ Arrow key: Rotate piece
  - ↓ Arrow key: Accelerate drop
  - Space bar: Hard drop (instant drop)
- **Line Clearing**: Complete horizontal lines are cleared and scored
- **Progressive Difficulty**: Game speed increases as you clear more lines
- **Score & Level System**: Track your progress with real-time statistics
- **Next Piece Preview**: See the upcoming tetromino
- **Pause/Resume**: Pause the game at any time
- **Game Over State**: Clear game over display with final statistics
- **New Game**: Start fresh after game over
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Gameplay

1. Click "Start Game" to begin
2. Use arrow keys to control falling pieces
3. Complete horizontal lines to score points
4. Game speed increases every 10 lines cleared
5. Game ends when pieces stack to the top

## Scoring System

- 1 line: 100 × level
- 2 lines: 300 × level
- 3 lines: 500 × level
- 4 lines (Tetris): 800 × level

## Technologies Used

- React 18
- React Hooks (useState, useCallback, useEffect, custom hooks)
- CSS3 with responsive design
- Modern JavaScript (ES6+)

## Project Structure

```
src/
├── components/
│   ├── Board.js          # Game board component
│   ├── Cell.js           # Individual cell component
│   ├── Game.js           # Main game logic
│   ├── GameControls.js   # Control buttons
│   ├── GameInfo.js       # Score/level display
│   ├── GameOver.js       # Game over overlay
│   └── NextPiece.js      # Next piece preview
├── hooks/
│   ├── useGameBoard.js   # Board state management
│   └── useInterval.js    # Custom interval hook
├── gameHelpers.js        # Game logic utilities
├── tetrominoes.js        # Tetromino definitions
├── App.js                # Root component
└── index.js              # Entry point
```
