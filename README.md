## Description

A TypeScript implementation of a Quoridor-inspired board game showcasing full-stack skills.

### Concepts utilized in this project

- [x] Test-Driven Development (TDD) - Jest  
- [ ] Continuous Integration / Continuous Deployment (CI/CD) - Docker  
- [x] PostgreSQL database  
- [x] React & Next.js frontend  
- [x] Tailwind CSS for styling  
- [ ] WebSockets for real-time communication  
- [x] Node.js, TypeScript & vanilla JavaScript  
- [x] Custom authentication system  
- [x] Node Emailer with HTML email templates  
- [x] Development and testing of core game logic based on Quoridor  
- [x] Sleek and simple game interface  
- [ ] API to handle user moves and manage game state  
- [ ] Real-time multiplayer game lobby  
- [ ] Player statistics tracking and leaderboard  

This project highlights building scalable, real-time applications with a focus on maintainability and user experience.


## Core game logic usage

The core logic is implemented using the singleton design pattern.  
There are essentially only two primary methods for the `Game` object that are expected to be used frequently. The rest are helper functions to facilitate the execution of those two methods.  
  
These methods are: `movePawn`, and `placeWall`

To create a new instance of the game:

```typescript
const game = new Game();
```

The gamestate is tracked through various properties in the `Game` object.  
Here is the structure of the `Game` object
```typescript
const gameState = {
    turn: "white",
    whitePos: [0, 8],        // White player's position on the board (row 0, col 8)
    blackPos: [16, 8],       // Black player's position (row 16, col 8)
    whiteWalls: 10,          // Number of walls remaining for white
    blackWalls: 10,          // Number of walls remaining for black
    whiteWon: false,         // Has white won the game?
    blackWon: false,         // Has black won the game?
    board: [
        // 2D array representing the board layout (17x17), initialized via initializeBoard()
    ],
  availableSquares: [
    // 2D array or list of coordinates where the current player can legally move,
    // Initially generated based on whitePos via generateAvailableSquares()
  ],
};
```

## movePawn usage

Call `movePawn()` to move the current player to a valid square.  


`movePawn` relies on `this.turn` to determine which pawn to move. 
`this.turn` has two options `white` and `black`  
`this.turn` is initialized to `white`, and with each successful invokation of `movePawn` or `placeWall`,  
`this.turn` is alternated between the two options.  
  
`movePawn` will not execute the move if:
+ The destination is farther than one square
+ The destination is one square away, but is situated diagonally from the current position
+ There is a wall between the pawn and the destination square 
movePawn:  
```ts
    movePawn(destination: number[], finding: boolean = false): MoveResult
```
MoveResult:  
```ts
    type MoveResult = {success: boolean; message: string};
```

### example:
```ts
    const game = new Game();
    game.movePawn([0,6]);
```


**Parameters:**

| Name       | Type              | Description                        |
|------------|-------------------|------------------------------------|
| `destination` | `[number, number]` | Target destination as [row, column]   |
| `finding`|`boolean`| Leave this argument blank unless called within `pathFinder`|

**Returns:**

`MoveResult` — an object containing the result of the move.

| Property     | Type      | Description                              |
|--------------|-----------|------------------------------------------|
| `success`    | `boolean` | `true` if the move was valid and applied |
| `message`    | `string`  | Describes the outcome or error message   |


## placeWall usage

Call `placeWall()` to insert a wall in a valid slot.

`placeWall` relies on `this.turn` to determine which player's wall count to decrease.  
`this.whiteWalls` and `this.blackWalls` keep track of each player's wall count.

`placeWall` will not execute if:
+ The player has no walls remaining
+ The placement is outside the boundary of the board
+ The placement collides or intersects with another wall
+ The placement prohibits players from accessing the opposing side of the board (currently unimplemented)
+ The placement is not within a "slot" region of the board  

placeWall:  
```typescript
    placeWall(row: number, col: number): MoveResult | any
```

### example:
```ts
    const game = new Game();
    game.placeWall(3,7);
```

**Parameters:**

| Name       | Type              | Description                        |
|------------|-------------------|------------------------------------|
| `row` | `number` | Target destination's row   |
| `col` | `number` | Target destination's column   |


**Returns:**

`MoveResult` — an object containing the result of the move.

| Property     | Type      | Description                              |
|--------------|-----------|------------------------------------------|
| `success`    | `boolean` | `true` if the move was valid and applied |
| `message`    | `string`  | Describes the outcome or error message   |
