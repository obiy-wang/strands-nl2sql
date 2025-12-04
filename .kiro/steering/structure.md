# Project Structure

## Directory Organization

```
src/
├── components/          # React components (UI and game logic)
├── hooks/              # Custom React hooks
├── gameHelpers.js      # Pure game logic utilities
├── tetrominoes.js      # Tetromino definitions and data
├── App.js              # Root component
└── index.js            # Application entry point
```

## Component Architecture

### Main Components
- **Game.js** - Main game container with state management and game loop
- **Board.js** - Renders the game board grid
- **Cell.js** - Individual cell rendering
- **GameControls.js** - Start/pause/resume buttons
- **GameInfo.js** - Score, level, and lines display
- **GameOver.js** - Game over overlay with final stats
- **NextPiece.js** - Preview of upcoming tetromino

### Custom Hooks
- **useGameBoard.js** - Board state management
- **useInterval.js** - Custom interval hook for game loop

### Utility Modules
- **gameHelpers.js** - Pure functions for game logic (collision detection, line clearing, scoring, rotation)
- **tetrominoes.js** - Tetromino shape definitions and random generation

## Code Conventions

### Component Structure
- Functional components with hooks
- State management using useState
- Side effects with useEffect
- Memoized callbacks with useCallback
- Event handlers defined within components

### Naming Patterns
- Components: PascalCase (e.g., `GameControls.js`)
- Hooks: camelCase with "use" prefix (e.g., `useGameBoard.js`)
- Utilities: camelCase (e.g., `gameHelpers.js`)
- Constants: UPPER_SNAKE_CASE (e.g., `BOARD_WIDTH`)

### File Organization
- Each component has a corresponding CSS file (e.g., `Game.js` + `Game.css`)
- Pure logic separated from UI components
- Custom hooks isolated in dedicated directory

### State Management
- Local component state with useState
- No external state management library
- Props passed down from Game component to children
- Callbacks passed for child-to-parent communication

## Game Constants

Defined in `gameHelpers.js`:
- `BOARD_WIDTH`: 10 cells
- `BOARD_HEIGHT`: 20 cells
