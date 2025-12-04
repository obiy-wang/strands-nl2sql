# Quick Start Guide

## Installation & Running

1. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install React, React-DOM, and react-scripts.

2. **Start Development Server**
   ```bash
   npm start
   ```
   The game will open in your browser at http://localhost:3000

3. **Build for Production**
   ```bash
   npm run build
   ```

## How to Play

### Controls
- **Arrow Left (←)**: Move piece left
- **Arrow Right (→)**: Move piece right
- **Arrow Up (↑)**: Rotate piece
- **Arrow Down (↓)**: Soft drop (accelerate)
- **Spacebar**: Hard drop (instant drop to bottom)

### Game Flow
1. Click "Start Game" to begin
2. Control falling tetrominoes using arrow keys
3. Complete horizontal lines to clear them and score points
4. Game speeds up every 10 lines cleared
5. Pause anytime by clicking the "Pause" button
6. Game ends when pieces stack to the top

### Scoring
- 1 line cleared: 100 × current level
- 2 lines cleared: 300 × current level
- 3 lines cleared: 500 × current level
- 4 lines cleared (Tetris): 800 × current level

### Level System
- Start at Level 1
- Level increases every 10 lines cleared
- Each level increases game speed

## Features Implemented

✓ 7 Classic Tetrominoes (I, O, T, S, Z, J, L)
✓ Full keyboard controls with rotation
✓ Line clearing with scoring
✓ Progressive difficulty (speed increases)
✓ Score, level, and lines display
✓ Next piece preview
✓ Game over state with statistics
✓ New game functionality
✓ Pause/Resume feature
✓ Responsive design for all screen sizes
✓ Modern React hooks and patterns

## Technical Stack

- React 18.2.0
- React Hooks (useState, useCallback, useEffect, custom hooks)
- CSS3 with modern styling
- No external game libraries - pure React implementation

## Project Structure

```
src/
├── components/         # React components
│   ├── Board.js       # Main game board
│   ├── Cell.js        # Individual board cell
│   ├── Game.js        # Core game logic
│   ├── GameControls.js # Buttons and controls info
│   ├── GameInfo.js    # Score/level/lines display
│   ├── GameOver.js    # Game over overlay
│   └── NextPiece.js   # Next piece preview
├── hooks/             # Custom React hooks
│   ├── useGameBoard.js # Board state management
│   └── useInterval.js  # Game loop interval
├── gameHelpers.js     # Game logic utilities
├── tetrominoes.js     # Tetromino shapes and colors
├── App.js            # Root component
└── index.js          # Application entry point
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Mobile Support

The game is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

Note: For the best experience on mobile, use the on-screen controls or rotate your device to landscape mode for a larger board.
