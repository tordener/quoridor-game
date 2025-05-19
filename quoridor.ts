//import * as fs from 'fs';
/**
 * Represents a game of Quoridor.
 */
type CalculateMoveHelperResult = {valid: boolean; location: number[]}; // used only in helpers
type CalculateMovePawnResult = {success: boolean; canJump: boolean | null; jumpDestination: number[] | undefined | null; message: string};
type MoveResult = {success: boolean; message: string};
type JumpResultFail = {success: boolean; canJump: boolean; destination: number[] | any; message: string };
type JumpResultSuccess = {success: boolean; canJump: boolean; destination: number[] | any};
type Snapshot = {turn: string, whitePos: number[], blackPos: number[], board: any[][]};


export class Game {
    /**
     * Initializes a new game instance.
     */
    turn: string;
    whitePos: number[] | any;
    blackPos: number[] | any; 
    whiteWalls: number;
    blackWalls: number;
    whiteWon: boolean;
    blackWon: boolean;
    board: any[][];
    availableSquares: number[][];
    constructor() {
        this.turn = "white";
        this.whitePos = [0, 8];
        this.blackPos = [16, 8];
        this.whiteWalls = 10;
        this.blackWalls = 10;
        this.whiteWon = false;
        this.blackWon = false;
        this.board = this.initializeBoard();
        this.availableSquares = this.generateAvailableSquares(this.whitePos);
    }

    /**
     * Initializes the 17x17 game board with spaces and wall slots.
     * @returns {Array} The initialized board.
     */
    initializeBoard(): any[][] {
        /*
            even row even col = space
            even row odd col = v-slot
            odd row even col = h-slot
            odd row odd col = null
        */
        let board:any[] = [];
        for (let row = 0; row < 17; row++) {
            let currentRow:any[] = [];
            for (let col = 0; col < 17; col++) {
                if (row % 2 === 0 && col % 2 === 0) {
                    currentRow.push({ type: "space", occupiedBy: null });
                }
                if (row % 2 === 0 && col % 2 === 1) {
                    currentRow.push({ type: "v-slot", occupiedBy: null });
                }
                if (row % 2 === 1 && col % 2 === 0) {
                    currentRow.push({ type: "h-slot", occupiedBy: null });
                }
                if (row % 2 === 1 && col % 2 === 1) {
                    currentRow.push({ type: null, occupiedBy: null });
                }
            }
            board.push(currentRow);
        }
        board[this.whitePos[0]][this.whitePos[1]].occupiedBy = "white";
        board[this.blackPos[0]][this.blackPos[1]].occupiedBy = "black";
        return board;
    }

    /**
     * Determines the orientation of a wall based on board coordinates.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {string|boolean} 'v' for vertical, 'h' for horizontal, false if invalid.
     */
    determineWallOrientation(row: number, col: number): string | boolean {
        if (row % 2 === 0 && col % 2 === 1) return "v";
        if (row % 2 === 1 && col % 2 === 0) return "h";
        return false;
    }

    /**
     * Updates the turn and decreases the wall count for the current player.
     */
    manageTurnWalls(): void {
        if (this.turn === "white") this.whiteWalls--;
        if (this.turn === "black") this.blackWalls--;
        this.turn = this.turn === "white" ? "black" : "white";
    }

    /**
     * Updates whose turn it is
     */
    manageTurnMove(): void {
        this.turn = this.turn === "white" ? "black" : "white";
    }
    /**
     * Checks if a position is outside the bounds of the board.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {boolean} True if out of bounds, false otherwise.
     */
    isOutOfBounds(row: number, col: number): boolean {
        return row < 0 || row > 16 || col < 0 || col > 16;
    }

    /**
     * Checks if a board cell is empty.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {boolean} True if occupied, false if unoccupied
     */
    isOccupied(row: number, col: number): boolean {
        if (this.board[row][col].occupiedBy == null) return false;
        return true;
    }

    /**
     * Validates if a move is within two spaces either horizontally or vertically.
     * @param {number[]} currentPos - The current position as [row, col].
     * @param {number[]} destPos - The destination position as [row, col].
     * @returns {boolean} True if move is valid, false otherwise.
     */
    verifyRange(currentPos: number[], destPos: number[]): boolean {
        const differenceRow = Math.abs(currentPos[0] - destPos[0]);
        const differenceCol = Math.abs(currentPos[1] - destPos[1]);
        return (
            (differenceRow === 2 && differenceCol === 0) ||
            (differenceRow === 0 && differenceCol === 2)
        );
    }
    /**
     * Looks at the edge rows and determines if a player has won the game
     * by changing the corresponding this.whiteWon/this.blackWon boolean to true;
     * This function should be rewritten soon
     * @returns {object} {win: boolean, winner: string}
     */
    gameWon(): {win: boolean, winner: string | null } {
        let won = { win: false, winner: null as string | null };
        if (this.turn === "black") {
            for (let a = 0; a < 17; a++) {
                if (this.board[16][a].occupiedBy === "white"){
                    this.whiteWon = true;
                    return won = { win: true, winner: "white" };
                }
            }
        }
        if (this.turn === "white") {
            for (let a = 0; a < 17; a++) {
                if (this.board[0][a].occupiedBy === "black"){
                    return won = { win: true, winner: "black" };
                }
            }
        }
        return won;
    }
    /**
     * Stringifies the contents of the array.
     * @param {number[]} pos array containing the coordinates of a position 
     * @returns 
     */
    serialize(pos: number[]): string {
        return `${pos[0]},${pos[1]}`;
    }
    /**
     * Creates a copy of the current gamestate.
     * @returns object
     */
    createGameSnapshot(): Snapshot {
        const snapshot = {
            turn: this.turn,
            whitePos: [...this.whitePos],
            blackPos: [...this.blackPos],
            board: this.board.map(row => row.map(cell => ({...cell})))
        };
        return snapshot;
    }
    /**
     * executes a pawn move up without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    calculateMoveUp(pawnPosition: number[]): CalculateMoveHelperResult {
        let movedUp = this.calculateMovePawn([pawnPosition[0] + 2, pawnPosition[1]]);
        return {valid: movedUp.success, location: [pawnPosition[0] + 2, pawnPosition[1]]};
    }
    /**
     * executes a pawn move left without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    calculateMoveLeft(pawnPosition: number[]): CalculateMoveHelperResult {
        let movedLeft = this.calculateMovePawn([pawnPosition[0], pawnPosition[1] - 2]);
        return  {valid: movedLeft.success, location: [pawnPosition[0], pawnPosition[1] - 2]};
    }
    /**
     * executes a pawn move right without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    calculateMoveRight(pawnPosition: number[]): CalculateMoveHelperResult{
        let movedRight = this.calculateMovePawn([pawnPosition[0], pawnPosition[1] + 2]);
        return  {valid: movedRight.success, location: [pawnPosition[0], pawnPosition[1] + 2]};
    }
    /**
     * executes a pawn move down without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    calculateMoveDown(pawnPosition: number[]): CalculateMoveHelperResult {
        let movedDown = this.calculateMovePawn([pawnPosition[0] - 2, pawnPosition[1]]);
        return  {valid: movedDown.success, location: [pawnPosition[0] - 2, pawnPosition[1]]};
    }

    /**
     * executes a pawn move up without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    moveUp(pawnPosition: number[]): CalculateMoveHelperResult {
        let snapshot = this.createGameSnapshot();
        let movedUp = this.movePawn([pawnPosition[0] + 2, pawnPosition[1]]);
        //reset gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return {valid: movedUp.success, location: [pawnPosition[0] + 2, pawnPosition[1]]};
    }
    /**
     * executes a pawn move left without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    moveLeft(pawnPosition: number[]): CalculateMoveHelperResult {
        let snapshot = this.createGameSnapshot();
        let movedLeft = this.movePawn([pawnPosition[0], pawnPosition[1] - 2]);
        //reset gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return  {valid: movedLeft.success, location: [pawnPosition[0], pawnPosition[1] - 2]};
    }
    /**
     * executes a pawn move right without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    moveRight(pawnPosition: number[]): CalculateMoveHelperResult {
        let snapshot = this.createGameSnapshot();
        let movedRight = this.movePawn([pawnPosition[0], pawnPosition[1] + 2]);
        //reset the gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return  {valid: movedRight.success, location: [pawnPosition[0], pawnPosition[1] + 2]};
    }
    /**
     * executes a pawn move down without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    moveDown(pawnPosition: number[]): CalculateMoveHelperResult {
        let snapshot = this.createGameSnapshot();
        let movedDown = this.movePawn([pawnPosition[0] - 2, pawnPosition[1]]);
        // reset the gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return  {valid: movedDown.success, location: [pawnPosition[0] - 2, pawnPosition[1]]};
    }
    /**
     * 
     * @param {number[]} pawnPosition current pawn position
     * @param {Set} visitedSquares set containing the visited squares
     * @returns {array}
     */
    moveAllDirections(pawnPosition: number[], visitedSquares: Set<string>): CalculateMoveHelperResult[] {
        visitedSquares.add(this.serialize(pawnPosition));
        let up: CalculateMoveHelperResult = this.moveUp(pawnPosition);
        let down: CalculateMoveHelperResult = this.moveDown(pawnPosition);
        let right: CalculateMoveHelperResult = this.moveRight(pawnPosition);
        let left: CalculateMoveHelperResult = this.moveLeft(pawnPosition);
        let results: CalculateMoveHelperResult[] = [up, down, right, left];
        return results;
    }
    /**
     * 
     * @param {number[]} pawnPosition current pawn position
     * @param {Set} visitedSquares set containing the visited squares
     * @param {boolean} highlight true if not being used in pathFinder
     * @returns {array}
     */
    calculateMoveAllDirections(pawnPosition: number[]): CalculateMoveHelperResult[] {
        let up = this.calculateMoveUp(pawnPosition);
        let down = this.calculateMoveDown(pawnPosition);
        let right = this.calculateMoveRight(pawnPosition);
        let left = this.calculateMoveLeft(pawnPosition);
        let results: CalculateMoveHelperResult[] = [up, down, right, left];
        return results;
    }

    generateAvailableSquares(pawnPosition: number[]): number[][]{
        const squares: CalculateMoveHelperResult[] = this.calculateMoveAllDirections(pawnPosition);
        let availableSquares: number[][] = [];
        for(let a = 0; a < squares.length; a++){
            if(squares[a].valid) availableSquares.push(squares[a].location);
        }
        return availableSquares;
    }
    /**
     * Checks to see if there is a valid pathway to the opposing side of the board
     * @param {number[]} pawnPosition coordinates of the current pawn position
     * @returns boolean
     */
    pathFinder(pawnPosition: number[]): boolean {
        let visitedSquares: Set<string> = new Set(); // THIS PROBABLY BREAKS THE FINDER
        let queue: number[][] = [pawnPosition];

        const isWinningRow = (pos: number[]): boolean => {
            return this.turn === 'white' ? pos[0] === 16 : pos[0] === 0;
        };
        while (queue.length > 0){
            let current = queue.shift();

            if(!current) continue;
            const key: string = this.serialize(current);

            if(visitedSquares.has(key)) continue;
            visitedSquares.add(key);

            if(isWinningRow(current)) {
                return true;
            }

            const results: CalculateMoveHelperResult[] = this.moveAllDirections(current, visitedSquares);
            for(const result of results){
                if(result.valid && !visitedSquares.has(this.serialize(result.location))) {
                    queue.push(result.location);
                }
            }
        }
        return false;
    }

    /**
     * This function determines if, when a pawn is jumping over another pawn
     * It will end up outside the boundary of the board
     * @param {number} row starting row of the moving pawn
     * @param {number} col starting column of the moving pawn
     * @param {string} direction direction of travel
     * @returns boolean true if pawn jump is out of bounds
     */
    hopsOffBoard (row: number, col: number, direction: string): boolean{
        let currentPos =
            this.turn === "white" ? this.whitePos : this.blackPos;
        if (direction === "up") {
            if (currentPos[0] > 12) return true;
        }
        if (direction === "down") {
            if (currentPos[0] < 3) return true;
        }
        if (direction === "left") {
            if (currentPos[1] < 4) return true;
        }
        if (direction === "right") {
            if (currentPos[1] > 12) return true;
        }
        return false;
    };

    /**
     * Determines if a pawn can legally jump over another pawn
     * Calculates a new destination if jumping over a pawn.
     * @param {number[]} currentPos
     * @param {number[]} destPos
     */
    canJumpOverPawn (currentPos: number[], destPos: number[]): JumpResultFail | JumpResultSuccess {
        let correctedDestination: number[] = [];
        let direction: string = this.directionOfTravel(currentPos, destPos);
        if (this.hopsOffBoard(currentPos[0], currentPos[1], direction)) {
            return {
                success: false,
                canJump: false,
                destination: undefined,
                message: `not enough space in direction of travel`,
            };
        }
        switch (direction) {
            case "up":
                if (this.checkForWall(currentPos[0] + 1, currentPos[1])) {
                    return { success: false, canJump: false, destination: undefined, message: `Blocked by wall` };
                }
                if (this.checkForWall(currentPos[0] + 3, currentPos[1])) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: `Wall on opposite side of enemy pawn`,
                    };
                }
                correctedDestination = [currentPos[0] + 4, currentPos[1]];
                break;
            case "down":
                if (this.checkForWall(currentPos[0] - 1, currentPos[1])) {
                    return { success: false, canJump: false, destination: undefined, message: `Blocked by wall` };
                }
                if (this.checkForWall(currentPos[0] - 3, currentPos[1])) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: `Wall on opposite side of enemy pawn`,
                    };
                }
                correctedDestination = [currentPos[0] - 4, currentPos[1]];
                break;
            case "left":
                if (this.checkForWall(currentPos[0], currentPos[1] - 1)) {
                    return { success: false, canJump: false, destination: undefined, message: `Blocked by wall` };
                }
                if (this.checkForWall(currentPos[0], currentPos[1] - 3)) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: `Wall on opposite side of enemy pawn`,
                    };
                }
                correctedDestination = [currentPos[0], currentPos[1] - 4];
                break;
            case "right":
                if (this.checkForWall(currentPos[0], currentPos[1] + 1)) {
                    return { success: false, canJump: false, destination: undefined, message: `Blocked by wall` };
                }
                if (this.checkForWall(currentPos[0], currentPos[1] + 3)) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: `Wall on opposite side of enemy pawn`,
                    };
                }
                correctedDestination = [currentPos[0], currentPos[1] + 4];
                break;
        }
        return { success: true, canJump: true, destination: correctedDestination };
    };

    /**
     * Determines the direction of travel from current to destination.
     * @param {number[]} currentPos
     * @param {number[]} destPos
     * @returns {string} One of 'up', 'down', 'left', or 'right'.
     */
    directionOfTravel(currentPos: number[], destPos: number[]): string {
        let differenceRow = currentPos[0] - destPos[0];
        let differenceCol = currentPos[1] - destPos[1];
        if (differenceRow < 0) return "up";
        if (differenceRow > 0) return "down";
        if (differenceCol > 0) return "left";
        if (differenceCol < 0) return "right";
        return "";
    };
    
    /**
     * Inspects a specified cell in the grid for walls
     * @param {number} row row to check for a wall
     * @param {number} col column to check for a wall
     * @returns boolean true if there is a wall there, false if not
     */
    checkForWall(row: number, col: number): boolean {
        if (this.board[row][col].occupiedBy == "wall") return true;
        return false;
    };

    /**
     * Executes a move with a supplied target cell
     * @param {number[]} destination array containing the coordinates of the destination
     * @returns object {boolean, string}
     */
    movePawn(destination: number[], finding: boolean = false): MoveResult  {
        let moveResults: CalculateMovePawnResult = this.calculateMovePawn(destination);
        const currentPosition = this.turn === 'white' ? this.whitePos : this.blackPos;
        const jumpOverPawn = (destination: number[]) : MoveResult =>{
                let jump: JumpResultFail | JumpResultSuccess = this.canJumpOverPawn(currentPosition, destination);
                if(jump.success && jump.canJump){
                    if(this.turn === "white"){
                        const lastPlace = [...currentPosition];
                        this.whitePos = jump.destination;
                        this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                        this.board[jump.destination[0]][
                            jump.destination[1]
                        ].occupiedBy = this.turn;
                        return {success: true, message: `jump successful`};
                    } else {
                        const lastPlace = [...currentPosition];
                        this.blackPos = jump.destination;
                        this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                        this.board[jump.destination[0]][
                            jump.destination[1]
                        ].occupiedBy = this.turn;
                        return {success: true, message: `jump successful`};
                    }
                }
                return {success: false, message: `could not complete jump`};
        }
        if(moveResults.success && moveResults.canJump){
            jumpOverPawn(destination);
            this.availableSquares = this.generateAvailableSquares(destination);
            this.manageTurnMove();
            this.gameWon();
            return {success: true, message: `jump successful`};
        }
        if(moveResults.success && !moveResults.canJump){
            const lastPlace = [...currentPosition];
            if(this.turn === "white"){
                this.whitePos = destination;
                this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                this.board[destination[0]][destination[1]].occupiedBy = "white";
                this.availableSquares = this.generateAvailableSquares(destination);
                this.manageTurnMove();
                this.gameWon();
                return {success: true, message: `jump successful`};
            } else {
                this.blackPos = destination;
                this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                this.board[destination[0]][destination[1]].occupiedBy = "black";
                this.availableSquares = this.generateAvailableSquares(destination);
                this.manageTurnMove();
                this.gameWon();
                return {success: true, message: `jump successful`};
            }
        }
        return {success: false, message: moveResults.message || "could not complete move"};
    }

    /**
     * Does all the necessary move validation checks for a destination square
     * @param {number[]} destination - The destination position as [row, col].
     * @returns {Object} Result of the move attempt.
     */
    calculateMovePawn(destination: number[]): CalculateMovePawnResult {
        let currentPos: number[] = this.turn === "white" ? this.whitePos : this.blackPos;
        /**
         * A helper, more refined way of using checkForWall by indicating a direction
         * Looks in the direction of travel for a wall blocking its movement
         * @param {number[]} currentPos - array of numbers indicating the pawns current position
         * @param {string} direction - string indicating direction, one of 'up', 'down', 'left', 'right'.
         * @returns
         */
        const noWallPresent = (currentPos: number[], direction: string):CalculateMovePawnResult => {
            switch (direction) {
                case "up":
                    if (this.checkForWall(currentPos[0] + 1, currentPos[1])) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: `Blocked by wall` };
                    }
                    break;
                case "down":
                    if (this.checkForWall(currentPos[0] - 1, currentPos[1])) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: `Blocked by wall` };
                    }
                    break;
                case "left":
                    if (this.checkForWall(currentPos[0], currentPos[1] - 1)) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: `Blocked by wall` };
                    }
                    break;
                case "right":
                    if (this.checkForWall(currentPos[0], currentPos[1] + 1)) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: `Blocked by wall` };
                    }
                    break;
            }
            return {success: true, canJump: null, jumpDestination: undefined, message: `no wall present`};
        };

        if (!this.verifyRange(currentPos, destination)) {
            return { success: false, canJump: false, jumpDestination: undefined, message: `Pawns can only move one space` };
        }
        if (this.isOutOfBounds(destination[0], destination[1])) {
            return { success: false, canJump: false, jumpDestination: undefined, message: `Destination is out of bounds` };
        }
        if (this.isOccupied(destination[0], destination[1])) {
            /*
             * This block is handling the jumping logic
             * Updating game state
             */
            let jump = this.canJumpOverPawn(currentPos, destination);
            if (jump.success) {

                    return {
                        success: true,
                        canJump: true,
                        jumpDestination: jump.destination,
                        message: `jump successful`,
                    };

                }
                return { success: false, canJump: false, jumpDestination: undefined, message: `move failed` };
            }
    
            const lastPlace = [...currentPos];
            let isBlocked = noWallPresent(
                currentPos,
                this.directionOfTravel(currentPos, destination)
            );
            if (isBlocked.success === false) {
                return { success: false, canJump: false, jumpDestination: undefined, message: `Blocked by wall` };
            }

            return {
                success: true,
                canJump: false,
                jumpDestination: null,
                message: `pawn can move`,
            };
        }
    checkForImpedingWalls(targetLocation: number[], orientation: string | boolean): boolean | MoveResult | any {
        /*
            even row odd col = v
            odd row even col = h
            odd row odd col = intersection

            +3 to row for v
            +3 to col for h
            make intersections occupied by wall
        */
        if(orientation === 'v'){
            if(targetLocation[0] > 14 || targetLocation[0] < 0){
                return {success: false, message: `wall outside of board`};
            }
            let baseSlot = this.checkForWall(targetLocation[0], targetLocation[1]);
            let aboveOne = this.checkForWall(targetLocation[0] + 1, targetLocation[1]);
            let aboveTwo = this.checkForWall(targetLocation[0] + 2, targetLocation[1]);
            //let aboveThree = this.checkForWall(targetLocation[0] + 3, targetLocation[1]);
            let slots = [baseSlot, aboveOne, aboveTwo];
            for(let a = 0; a < slots.length; a++){
                if(slots[a]) return true;
            }
            return false;
        }
        if(orientation === 'h'){
            if(targetLocation[1] > 14 || targetLocation[1] < 0){
                return {success: false, message: `wall outside of board`};
            }
            let baseSlot = this.checkForWall(targetLocation[0], targetLocation[1]);
            let rightOne = this.checkForWall(targetLocation[0], targetLocation[1] + 1);
            let rightTwo = this.checkForWall(targetLocation[0], targetLocation[1] + 2);
            //let rightThree = this.checkForWall(targetLocation[0], targetLocation[1] + 3);
            let slots = [baseSlot, rightOne, rightTwo];
            for(let a = 0; a < slots.length; a++){
                if(slots[a]) return true;
            }
            return false;
        }
    }
    /**
     * Attempts to place a wall at the specified board location.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {Object} Result of the wall placement attempt.
     */
    placeWall(row: number, col: number): MoveResult | any {
        let orientation: string | boolean = this.determineWallOrientation(row, col);
        if (
            (this.turn === "white" && this.whiteWalls < 1) ||
            (this.turn === "black" && this.blackWalls < 1)
        ) {
            return { success: false, message: "Insufficient walls" }; 
        }
        if(this.checkForImpedingWalls([row, col], orientation)){
            return {success: false, message: `obstruction`};
        }

        if (orientation === "v") {
            this.board[row][col].occupiedBy = "wall";
            this.board[row + 1][col].occupiedBy = "wall";
            this.board[row + 2][col].occupiedBy = "wall";
            this.manageTurnWalls();
            return { success: true, message: `Vertical wall placed` };
        }
        if (orientation === "h") {
            this.board[row][col].occupiedBy = "wall";
            this.board[row][col + 1].occupiedBy = "wall";
            this.board[row][col + 2].occupiedBy = "wall";
            this.manageTurnWalls();
            return { success: true, message: `Horizontal wall placed` };
        }
        if (orientation === false) {
            return {
                success: false,
                message: `Cannot place wall in a space or intersection`,
            };
        }
    }
}

/*
    TEST EXAMPLES FOR GAMESTATE GENERATION
*/

// function saveGameState(game, filename = 'gamestate.json') {
//     const serialized = JSON.stringify(game, null, 2);
//     fs.writeFileSync(filename, serialized, 'utf-8');
// }
let game = new Game;
game.whitePos = [16,1];
game.board[0][8].occupiedBy = null;
game.board[16][1].occupiedBy = 'white';
console.log(game.gameWon());
// console.log(game.availableSquares);
// game.movePawn([2,8]);
// console.log(game.availableSquares);
// game.movePawn([14,8]);
// console.log(game.availableSquares);

// game.placeWall(7,6);
// game.placeWall(7,10);
//console.log(game.movePawn([2,8]));

// saveGameState(game);

//module.exports = Game;
