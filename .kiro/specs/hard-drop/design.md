# Design Document: Hard Drop Feature

## Overview

The hard drop feature adds an instant drop mechanic to the React Tetris game, allowing players to immediately place the active tetromino at its lowest valid position by pressing the SPACE bar. This feature enhances gameplay speed and provides bonus points based on the drop distance, following standard Tetris conventions.

The implementation will extend the existing game architecture by:
1. Adding a hard drop calculation function to determine the lowest valid position
2. Modifying the existing `hardDrop` callback in Game.js to calculate and award bonus points
3. Updating the GameControls component to display the SPACE bar control instruction

## Architecture

### Current Architecture
The game uses a React component-based architecture with:
- **Game.js**: Main container managing game state, piece movement, and keyboard controls
- **gameHelpers.js**: Pure functions for collision detection, board manipulation, and scoring
- **GameControls.js**: UI component displaying control instructions and game buttons
- **Custom hooks**: useGameBoard for board state, useInterval for game loop

### Integration Points
The hard drop feature integrates at three key points:
1. **Game.js keyboard handler**: Already has SPACE key handler calling `hardDrop()`
2. **gameHelpers.js**: New function `calculateHardDropDistance()` for drop distance calculation
3. **GameControls.js**: Update controls display to include SPACE bar instruction

## Components and Interfaces

### New Functions

#### `calculateHardDropDistance(board, piece, position)`
**Location**: `src/gameHelpers.js`

**Purpose**: Calculate how many rows a piece will drop during hard drop

**Parameters**:
- `board`: Current game board state (2D array)
- `piece`: Current tetromino object with shape and color
- `position`: Current position object `{row, col}`

**Returns**: `number` - The number of rows the piece will drop

**Algorithm**:
1. Start from current position
2. Increment row position until collision detected
3. Return the distance traveled

### Modified Functions

#### `hardDrop()` in Game.js
**Current behavior**: Moves piece down until collision, then locks it

**New behavior**: 
1. Calculate drop distance before moving
2. Move piece to lowest position
3. Calculate bonus points (2 × drop distance)
4. Add bonus to score
5. Lock piece immediately

**State updates**:
- `score`: Add hard drop bonus points
- `position`: Update to final landing position
- Board state: Merge piece and clear lines as normal

### Modified Components

#### GameControls.js
**Change**: Add SPACE bar control to the controls-info section

**New control item**:
```jsx
<div className="control-item">
  <span>SPACE</span>
  <span>Hard Drop</span>
</div>
```

## Data Models

No new data models required. The feature uses existing data structures:

- **Board**: `Array<Array<{value: number, color: string}>>` - Unchanged
- **Piece**: `{shape: number[][], color: string}` - Unchanged  
- **Position**: `{row: number, col: number}` - Unchanged
- **Score**: `number` - Existing state, updated with bonus points

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, several properties are redundant:
- Properties 1.3, 4.1, and 4.3 are all covered by 1.1 (correct landing position calculation)
- Property 2.2 is covered by 2.1 (score update with bonus)
- Property 5.2 is covered by 5.1 (UI displays control instruction)

Edge cases that will be handled by property test generators:
- 2.3: Zero drop distance (covered by 2.1 with distance = 0)
- 4.2: Irregular board surfaces (covered by 1.1 with varied board states)
- 4.4: Maximum drop distance (covered by 1.1 with piece at top)

The refined set of unique, non-redundant properties:

Property 1: Hard drop lands at lowest valid position (combines 1.1, 1.3, 4.1, 4.3)
Property 2: Hard drop locks immediately (1.2)
Property 3: Hard drop awards correct bonus points (combines 2.1, 2.2, includes edge case 2.3)
Property 4: Hard drop proceeds to line clearing (3.3)

### Testable Properties

Property 1: Hard drop lands at lowest valid position
*For any* game board state, tetromino type, rotation state, and starting position, when hard drop is executed, the tetromino should land at the lowest row where moving down one more row would cause a collision.
**Validates: Requirements 1.1, 1.3, 4.1, 4.2, 4.3, 4.4**

Property 2: Hard drop locks piece immediately
*For any* game board state and tetromino, when hard drop is executed, the tetromino should be immediately merged into the board without delay.
**Validates: Requirements 1.2**

Property 3: Hard drop bonus scoring
*For any* game board state and tetromino, when hard drop is executed, the score increase should equal exactly 2 times the number of rows dropped (including zero when already at bottom).
**Validates: Requirements 2.1, 2.2, 2.3**

Property 4: Hard drop triggers game flow
*For any* game board state and tetromino, when hard drop is executed and results in completed lines, those lines should be cleared and the score should include both hard drop bonus and line clear bonus.
**Validates: Requirements 3.3**

### Example-Based Tests

Example 1: Paused game ignores hard drop
When the game is paused and SPACE is pressed, the game state should remain unchanged.
**Validates: Requirements 1.4**

Example 2: Game over ignores hard drop
When the game is over and SPACE is pressed, the game state should remain unchanged.
**Validates: Requirements 1.5**

Example 3: Controls display includes hard drop
When the GameControls component renders, it should display "SPACE" and "Hard Drop" in the controls list.
**Validates: Requirements 5.1, 5.2**

## Error Handling

### Invalid State Handling
- **Paused game**: Hard drop function returns early without state changes
- **Game over state**: Hard drop function returns early without state changes
- **No current piece**: Hard drop function returns early (already handled by existing guard)

### Edge Cases
- **Piece already at bottom**: Drop distance is 0, bonus points are 0, piece locks normally
- **Piece at top of board**: Full drop distance calculated correctly
- **Irregular board surfaces**: Collision detection handles gaps and overhangs correctly
- **All seven tetromino types**: Shape-agnostic algorithm works for I, O, T, S, Z, J, L pieces

### Collision Detection
The feature relies on the existing `checkCollision()` function which already handles:
- Board boundaries (top, left, right, bottom)
- Occupied cells
- Piece shape consideration

No additional error handling needed as the existing collision system is robust.

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests to ensure comprehensive coverage:

- **Unit tests** verify specific examples, edge cases, and UI rendering
- **Property-based tests** verify universal correctness properties across all inputs
- Together they catch both concrete bugs and general correctness issues

### Property-Based Testing

**Library**: We will use **fast-check** for JavaScript property-based testing

**Configuration**: Each property test will run a minimum of 100 iterations

**Test Tagging**: Each property-based test must include a comment with this format:
```javascript
// Feature: hard-drop, Property 1: Hard drop lands at lowest valid position
```

**Property Test Requirements**:
1. Each correctness property must be implemented by a SINGLE property-based test
2. Tests must generate random board states, piece types, rotations, and positions
3. Tests must verify the property holds across all generated inputs
4. Generators should create realistic game states (valid boards, valid pieces)

**Property Tests to Implement**:

1. **Property 1 Test**: Generate random boards, pieces, and positions. Execute hard drop. Verify final position is lowest valid position (next row down would collide).

2. **Property 2 Test**: Generate random boards and pieces. Execute hard drop. Verify piece is merged into board (board cells contain piece color).

3. **Property 3 Test**: Generate random boards and pieces. Record initial score and position. Execute hard drop. Verify score increased by exactly 2 × (final_row - initial_row).

4. **Property 4 Test**: Generate boards with almost-complete lines and pieces that will complete them. Execute hard drop. Verify lines are cleared and score includes both bonuses.

### Unit Testing

**Unit tests** will cover:

1. **Specific examples**:
   - Hard drop with piece at top of empty board
   - Hard drop with piece already at bottom (0 bonus)
   - Hard drop that completes a line

2. **State guards**:
   - Paused game ignores SPACE key (Example 1)
   - Game over ignores SPACE key (Example 2)

3. **UI rendering**:
   - GameControls displays SPACE bar instruction (Example 3)

4. **Helper function**:
   - `calculateHardDropDistance()` returns correct distance for various scenarios

### Integration Testing

Integration tests will verify:
- Keyboard event handling triggers hard drop correctly
- Hard drop integrates with existing game loop (spawn next piece, clear lines)
- Score updates reflect both hard drop bonus and line clear bonus

### Test Execution Order

1. Implement `calculateHardDropDistance()` helper function
2. Write unit tests for the helper function
3. Implement hard drop logic in Game.js
4. Write property-based tests for correctness properties
5. Write unit tests for state guards and edge cases
6. Update GameControls component
7. Write unit test for UI rendering
8. Run all tests to verify integration

## Implementation Notes

### Performance Considerations
- `calculateHardDropDistance()` has O(h) complexity where h is board height (max 20 iterations)
- Hard drop executes synchronously in a single frame
- No performance concerns for this feature

### Backward Compatibility
- Feature is purely additive, no breaking changes
- Existing keyboard controls remain unchanged
- Existing game mechanics (scoring, line clearing) work as before

### Future Enhancements
- Visual ghost piece showing landing position (not in current scope)
- Configurable bonus point multiplier (not in current scope)
- Sound effect for hard drop (not in current scope)
