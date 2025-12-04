# Implementation Plan

- [-] 1. Implement hard drop distance calculation
  - [x] 1.1 Create `calculateHardDropDistance()` function in gameHelpers.js
    - Write function that takes board, piece, and position as parameters
    - Implement algorithm to find lowest valid position by incrementing row until collision
    - Return the number of rows the piece can drop
    - _Requirements: 1.1, 1.3, 4.1, 4.2, 4.3, 4.4_

  - [ ]* 1.2 Write unit tests for calculateHardDropDistance
    - Test with empty board (should drop to bottom)
    - Test with piece already at bottom (should return 0)
    - Test with obstacles at various heights
    - Test with all seven tetromino types
    - _Requirements: 1.1, 4.1_

  - [ ]* 1.3 Write property test for landing position
    - **Property 1: Hard drop lands at lowest valid position**
    - **Validates: Requirements 1.1, 1.3, 4.1, 4.2, 4.3, 4.4**
    - Generate random boards, pieces, rotations, and positions
    - Execute hard drop and verify piece lands where next row would collide
    - _Requirements: 1.1, 1.3, 4.1, 4.2, 4.3, 4.4_

- [x] 2. Update hard drop logic with bonus scoring
  - [x] 2.1 Modify hardDrop callback in Game.js
    - Calculate drop distance before moving piece
    - Calculate bonus points (2 × drop distance)
    - Update score state with bonus points
    - Move piece to lowest position using existing movePiece
    - Call dropPiece to lock and trigger line clearing
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 3.3_

  - [ ]* 2.2 Write property test for immediate locking
    - **Property 2: Hard drop locks piece immediately**
    - **Validates: Requirements 1.2**
    - Generate random boards and pieces
    - Execute hard drop and verify piece is merged into board
    - _Requirements: 1.2_

  - [ ]* 2.3 Write property test for bonus scoring
    - **Property 3: Hard drop bonus scoring**
    - **Validates: Requirements 2.1, 2.2, 2.3**
    - Generate random boards and pieces
    - Record initial score and position
    - Execute hard drop and verify score increased by 2 × drop distance
    - Include edge case where drop distance is 0
    - _Requirements: 2.1, 2.2, 2.3_

  - [ ]* 2.4 Write property test for line clearing integration
    - **Property 4: Hard drop triggers game flow**
    - **Validates: Requirements 3.3**
    - Generate boards with almost-complete lines
    - Execute hard drop that completes lines
    - Verify lines cleared and score includes both bonuses
    - _Requirements: 3.3_

  - [ ]* 2.5 Write unit tests for state guards
    - Test paused game ignores hard drop (state unchanged)
    - Test game over ignores hard drop (state unchanged)
    - Test no current piece ignores hard drop
    - _Requirements: 1.4, 1.5_

- [x] 3. Update UI to display hard drop control
  - [x] 3.1 Add SPACE bar control to GameControls component
    - Add new control-item div with "SPACE" and "Hard Drop" labels
    - Place it in the controls-info section after existing controls
    - _Requirements: 5.1, 5.2_

  - [ ]* 3.2 Write unit test for controls display
    - Render GameControls component
    - Verify output contains "SPACE" text
    - Verify output contains "Hard Drop" text
    - _Requirements: 5.1, 5.2_

- [x] 4. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
