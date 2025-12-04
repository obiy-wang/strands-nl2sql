# Requirements Document

## Introduction

This feature adds a hard drop mechanic to the React Tetris game, allowing players to instantly drop the active tetromino to the lowest possible position on the board when pressing the SPACE bar. This is a standard feature in modern Tetris implementations that enables faster gameplay and more strategic piece placement.

## Glossary

- **Tetromino**: A geometric shape composed of four square blocks connected orthogonally (the falling pieces in Tetris)
- **Active Tetromino**: The currently falling tetromino that the player controls
- **Hard Drop**: An instant drop action that moves the active tetromino directly to its lowest valid position
- **Game Board**: The 10×20 grid where tetrominoes are placed
- **Collision Detection**: The system that determines if a tetromino can occupy a specific position
- **Lock Delay**: The brief moment before a tetromino locks into place after landing

## Requirements

### Requirement 1

**User Story:** As a player, I want to instantly drop the active tetromino to the bottom when I press SPACE, so that I can play faster and place pieces more efficiently.

#### Acceptance Criteria

1. WHEN the player presses the SPACE key during active gameplay, THEN the Game System SHALL move the active tetromino to the lowest valid position on the Game Board
2. WHEN the hard drop completes, THEN the Game System SHALL lock the tetromino immediately without Lock Delay
3. WHEN the hard drop is triggered, THEN the Game System SHALL calculate the correct landing position using Collision Detection
4. WHEN the game is paused, THEN the Game System SHALL ignore SPACE key presses
5. WHEN the game is over, THEN the Game System SHALL ignore SPACE key presses

### Requirement 2

**User Story:** As a player, I want to receive bonus points for using hard drop, so that I am rewarded for faster gameplay.

#### Acceptance Criteria

1. WHEN a hard drop is executed, THEN the Game System SHALL award 2 points for each row the tetromino drops
2. WHEN calculating hard drop bonus, THEN the Game System SHALL add the bonus to the current score immediately
3. WHEN the tetromino is already at the bottom position, THEN the Game System SHALL award zero bonus points

### Requirement 3

**User Story:** As a player, I want the hard drop to feel responsive and immediate, so that the game feels polished and professional.

#### Acceptance Criteria

1. WHEN the SPACE key is pressed, THEN the Game System SHALL execute the hard drop within one frame
2. WHEN the hard drop animation occurs, THEN the Game System SHALL visually show the tetromino moving to the bottom position
3. WHEN the tetromino locks after hard drop, THEN the Game System SHALL proceed immediately to line clearing and next piece generation

### Requirement 4

**User Story:** As a player, I want the hard drop to work correctly with all tetromino shapes and board states, so that the feature is reliable.

#### Acceptance Criteria

1. WHEN any of the seven tetromino types performs a hard drop, THEN the Game System SHALL place each tetromino at the correct lowest position
2. WHEN the Game Board has irregular surfaces with gaps, THEN the Game System SHALL calculate the correct landing position for the active tetromino
3. WHEN the active tetromino is rotated before hard drop, THEN the Game System SHALL respect the current rotation state when calculating the landing position
4. WHEN the active tetromino is at the top of the Game Board, THEN the Game System SHALL drop it the full height to the bottom

### Requirement 5

**User Story:** As a player, I want to see the SPACE bar control displayed on screen, so that I know the hard drop feature is available.

#### Acceptance Criteria

1. WHEN the game interface loads, THEN the Game System SHALL display control instructions that include the SPACE bar for hard drop
2. WHEN the control instructions are displayed, THEN the Game System SHALL clearly label the SPACE key action as "Hard Drop" or equivalent descriptive text
3. WHEN the game is in any state, THEN the Game System SHALL keep the control instructions visible and readable
