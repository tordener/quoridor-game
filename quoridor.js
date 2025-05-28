"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var Game = /** @class */ (function () {
    function Game() {
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
    Game.prototype.initializeBoard = function () {
        /*
            even row even col = space
            even row odd col = v-slot
            odd row even col = h-slot
            odd row odd col = null
        */
        var board = [];
        for (var row = 0; row < 17; row++) {
            var currentRow = [];
            for (var col = 0; col < 17; col++) {
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
    };
    /**
     * Determines the orientation of a wall based on board coordinates.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {string|boolean} 'v' for vertical, 'h' for horizontal, false if invalid.
     */
    Game.prototype.determineWallOrientation = function (row, col) {
        if (row % 2 === 0 && col % 2 === 1)
            return "v";
        if (row % 2 === 1 && col % 2 === 0)
            return "h";
        return false;
    };
    /**
     * Updates the turn and decreases the wall count for the current player.
     */
    Game.prototype.manageTurnWalls = function () {
        if (this.turn === "white")
            this.whiteWalls--;
        if (this.turn === "black")
            this.blackWalls--;
        this.turn = this.turn === "white" ? "black" : "white";
    };
    /**
     * Updates whose turn it is
     */
    Game.prototype.manageTurnMove = function () {
        this.turn = this.turn === "white" ? "black" : "white";
    };
    /**
     * Checks if a position is outside the bounds of the board.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {boolean} True if out of bounds, false otherwise.
     */
    Game.prototype.isOutOfBounds = function (row, col) {
        return row < 0 || row > 16 || col < 0 || col > 16;
    };
    /**
     * Checks if a board cell is empty.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {boolean} True if occupied, false if unoccupied
     */
    Game.prototype.isOccupied = function (row, col) {
        if (this.board[row][col].occupiedBy == null)
            return false;
        return true;
    };
    /**
     * Validates if a move is within two spaces either horizontally or vertically.
     * @param {number[]} currentPos - The current position as [row, col].
     * @param {number[]} destPos - The destination position as [row, col].
     * @returns {boolean} True if move is valid, false otherwise.
     */
    Game.prototype.verifyRange = function (currentPos, destPos) {
        var differenceRow = Math.abs(currentPos[0] - destPos[0]);
        var differenceCol = Math.abs(currentPos[1] - destPos[1]);
        return ((differenceRow === 2 && differenceCol === 0) ||
            (differenceRow === 0 && differenceCol === 2));
    };
    /**
     * Looks at the edge rows and determines if a player has won the game
     * by changing the corresponding this.whiteWon/this.blackWon boolean to true;
     * This function should be rewritten soon
     * @returns {object} {win: boolean, winner: string}
     */
    Game.prototype.gameWon = function () {
        var won = { win: false, winner: null };
        if (this.turn === "black") {
            for (var a = 0; a < 17; a++) {
                if (this.board[16][a].occupiedBy === "white") {
                    this.whiteWon = true;
                    return won = { win: true, winner: "white" };
                }
            }
        }
        if (this.turn === "white") {
            for (var a = 0; a < 17; a++) {
                if (this.board[0][a].occupiedBy === "black") {
                    return won = { win: true, winner: "black" };
                }
            }
        }
        return won;
    };
    /**
     * Stringifies the contents of the array.
     * @param {number[]} pos array containing the coordinates of a position
     * @returns
     */
    Game.prototype.serialize = function (pos) {
        return "".concat(pos[0], ",").concat(pos[1]);
    };
    /**
     * Creates a copy of the current gamestate.
     * @returns object
     */
    Game.prototype.createGameSnapshot = function () {
        var snapshot = {
            turn: this.turn,
            whitePos: __spreadArray([], this.whitePos, true),
            blackPos: __spreadArray([], this.blackPos, true),
            board: this.board.map(function (row) { return row.map(function (cell) { return (__assign({}, cell)); }); })
        };
        return snapshot;
    };
    /**
     * executes a pawn move up without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.calculateMoveUp = function (pawnPosition) {
        var movedUp = this.calculateMovePawn([pawnPosition[0] + 2, pawnPosition[1]]);
        return { valid: movedUp.success, location: [pawnPosition[0] + 2, pawnPosition[1]] };
    };
    /**
     * executes a pawn move left without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.calculateMoveLeft = function (pawnPosition) {
        var movedLeft = this.calculateMovePawn([pawnPosition[0], pawnPosition[1] - 2]);
        return { valid: movedLeft.success, location: [pawnPosition[0], pawnPosition[1] - 2] };
    };
    /**
     * executes a pawn move right without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.calculateMoveRight = function (pawnPosition) {
        var movedRight = this.calculateMovePawn([pawnPosition[0], pawnPosition[1] + 2]);
        return { valid: movedRight.success, location: [pawnPosition[0], pawnPosition[1] + 2] };
    };
    /**
     * executes a pawn move down without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.calculateMoveDown = function (pawnPosition) {
        var movedDown = this.calculateMovePawn([pawnPosition[0] - 2, pawnPosition[1]]);
        return { valid: movedDown.success, location: [pawnPosition[0] - 2, pawnPosition[1]] };
    };
    /**
     * executes a pawn move up without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.moveUp = function (pawnPosition) {
        var snapshot = this.createGameSnapshot();
        var movedUp = this.movePawn([pawnPosition[0] + 2, pawnPosition[1]]);
        //reset gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return { valid: movedUp.success, location: [pawnPosition[0] + 2, pawnPosition[1]] };
    };
    /**
     * executes a pawn move left without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.moveLeft = function (pawnPosition) {
        var snapshot = this.createGameSnapshot();
        var movedLeft = this.movePawn([pawnPosition[0], pawnPosition[1] - 2]);
        //reset gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return { valid: movedLeft.success, location: [pawnPosition[0], pawnPosition[1] - 2] };
    };
    /**
     * executes a pawn move right without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.moveRight = function (pawnPosition) {
        var snapshot = this.createGameSnapshot();
        var movedRight = this.movePawn([pawnPosition[0], pawnPosition[1] + 2]);
        //reset the gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return { valid: movedRight.success, location: [pawnPosition[0], pawnPosition[1] + 2] };
    };
    /**
     * executes a pawn move down without changing the turn variable
     * @param {number[]} pawnPosition current pawn position
     * @returns {object}
     */
    Game.prototype.moveDown = function (pawnPosition) {
        var snapshot = this.createGameSnapshot();
        var movedDown = this.movePawn([pawnPosition[0] - 2, pawnPosition[1]]);
        // reset the gamestate
        this.turn = snapshot.turn;
        this.whitePos = snapshot.whitePos;
        this.blackPos = snapshot.blackPos;
        this.board = snapshot.board;
        return { valid: movedDown.success, location: [pawnPosition[0] - 2, pawnPosition[1]] };
    };
    /**
     *
     * @param {number[]} pawnPosition current pawn position
     * @param {Set} visitedSquares set containing the visited squares
     * @returns {array}
     */
    Game.prototype.moveAllDirections = function (pawnPosition, visitedSquares) {
        visitedSquares.add(this.serialize(pawnPosition));
        var up = this.moveUp(pawnPosition);
        var down = this.moveDown(pawnPosition);
        var right = this.moveRight(pawnPosition);
        var left = this.moveLeft(pawnPosition);
        var results = [up, down, right, left];
        return results;
    };
    /**
     *
     * @param {number[]} pawnPosition current pawn position
     * @param {Set} visitedSquares set containing the visited squares
     * @param {boolean} highlight true if not being used in pathFinder
     * @returns {array}
     */
    Game.prototype.calculateMoveAllDirections = function (pawnPosition) {
        var up = this.calculateMoveUp(pawnPosition);
        var down = this.calculateMoveDown(pawnPosition);
        var right = this.calculateMoveRight(pawnPosition);
        var left = this.calculateMoveLeft(pawnPosition);
        var results = [up, down, right, left];
        return results;
    };
    Game.prototype.generateAvailableSquares = function (pawnPosition) {
        var squares = this.calculateMoveAllDirections(pawnPosition);
        var availableSquares = [];
        for (var a = 0; a < squares.length; a++) {
            if (squares[a].valid)
                availableSquares.push(squares[a].location);
        }
        return availableSquares;
    };
    /**
     * Checks to see if there is a valid pathway to the opposing side of the board
     * @param {number[]} pawnPosition coordinates of the current pawn position
     * @returns boolean
     */
    Game.prototype.pathFinder = function (pawnPosition) {
        var _this = this;
        var visitedSquares = new Set(); // THIS PROBABLY BREAKS THE FINDER
        var queue = [pawnPosition];
        var isWinningRow = function (pos) {
            return _this.turn === 'white' ? pos[0] === 16 : pos[0] === 0;
        };
        while (queue.length > 0) {
            var current = queue.shift();
            if (!current)
                continue;
            var key = this.serialize(current);
            if (visitedSquares.has(key))
                continue;
            visitedSquares.add(key);
            if (isWinningRow(current)) {
                return true;
            }
            var results = this.moveAllDirections(current, visitedSquares);
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var result = results_1[_i];
                if (result.valid && !visitedSquares.has(this.serialize(result.location))) {
                    queue.push(result.location);
                }
            }
        }
        return false;
    };
    /**
     * This function determines if, when a pawn is jumping over another pawn
     * It will end up outside the boundary of the board
     * @param {number} row starting row of the moving pawn
     * @param {number} col starting column of the moving pawn
     * @param {string} direction direction of travel
     * @returns boolean true if pawn jump is out of bounds
     */
    Game.prototype.hopsOffBoard = function (row, col, direction) {
        var currentPos = this.turn === "white" ? this.whitePos : this.blackPos;
        if (direction === "up") {
            if (currentPos[0] > 12)
                return true;
        }
        if (direction === "down") {
            if (currentPos[0] < 3)
                return true;
        }
        if (direction === "left") {
            if (currentPos[1] < 4)
                return true;
        }
        if (direction === "right") {
            if (currentPos[1] > 12)
                return true;
        }
        return false;
    };
    ;
    /**
     * Determines if a pawn can legally jump over another pawn
     * Calculates a new destination if jumping over a pawn.
     * @param {number[]} currentPos
     * @param {number[]} destPos
     */
    Game.prototype.canJumpOverPawn = function (currentPos, destPos) {
        var correctedDestination = [];
        var direction = this.directionOfTravel(currentPos, destPos);
        if (this.hopsOffBoard(currentPos[0], currentPos[1], direction)) {
            return {
                success: false,
                canJump: false,
                destination: undefined,
                message: "not enough space in direction of travel",
            };
        }
        switch (direction) {
            case "up":
                if (this.checkForWall(currentPos[0] + 1, currentPos[1])) {
                    return { success: false, canJump: false, destination: undefined, message: "Blocked by wall" };
                }
                if (this.checkForWall(currentPos[0] + 3, currentPos[1])) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: "Wall on opposite side of enemy pawn",
                    };
                }
                correctedDestination = [currentPos[0] + 4, currentPos[1]];
                break;
            case "down":
                if (this.checkForWall(currentPos[0] - 1, currentPos[1])) {
                    return { success: false, canJump: false, destination: undefined, message: "Blocked by wall" };
                }
                if (this.checkForWall(currentPos[0] - 3, currentPos[1])) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: "Wall on opposite side of enemy pawn",
                    };
                }
                correctedDestination = [currentPos[0] - 4, currentPos[1]];
                break;
            case "left":
                if (this.checkForWall(currentPos[0], currentPos[1] - 1)) {
                    return { success: false, canJump: false, destination: undefined, message: "Blocked by wall" };
                }
                if (this.checkForWall(currentPos[0], currentPos[1] - 3)) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: "Wall on opposite side of enemy pawn",
                    };
                }
                correctedDestination = [currentPos[0], currentPos[1] - 4];
                break;
            case "right":
                if (this.checkForWall(currentPos[0], currentPos[1] + 1)) {
                    return { success: false, canJump: false, destination: undefined, message: "Blocked by wall" };
                }
                if (this.checkForWall(currentPos[0], currentPos[1] + 3)) {
                    return {
                        success: false,
                        canJump: false,
                        destination: undefined,
                        message: "Wall on opposite side of enemy pawn",
                    };
                }
                correctedDestination = [currentPos[0], currentPos[1] + 4];
                break;
        }
        return { success: true, canJump: true, destination: correctedDestination };
    };
    ;
    /**
     * Determines the direction of travel from current to destination.
     * @param {number[]} currentPos
     * @param {number[]} destPos
     * @returns {string} One of 'up', 'down', 'left', or 'right'.
     */
    Game.prototype.directionOfTravel = function (currentPos, destPos) {
        var differenceRow = currentPos[0] - destPos[0];
        var differenceCol = currentPos[1] - destPos[1];
        if (differenceRow < 0)
            return "up";
        if (differenceRow > 0)
            return "down";
        if (differenceCol > 0)
            return "left";
        if (differenceCol < 0)
            return "right";
        return "";
    };
    ;
    /**
     * Inspects a specified cell in the grid for walls
     * @param {number} row row to check for a wall
     * @param {number} col column to check for a wall
     * @returns boolean true if there is a wall there, false if not
     */
    Game.prototype.checkForWall = function (row, col) {
        if (this.board[row][col].occupiedBy == "wall")
            return true;
        return false;
    };
    ;
    /**
     * Executes a move with a supplied target cell
     * @param {number[]} destination array containing the coordinates of the destination
     * @returns object {boolean, string}
     */
    Game.prototype.movePawn = function (destination, finding) {
        var _this = this;
        if (finding === void 0) { finding = false; }
        var moveResults = this.calculateMovePawn(destination);
        var currentPosition = this.turn === 'white' ? this.whitePos : this.blackPos;
        var jumpOverPawn = function (destination) {
            var jump = _this.canJumpOverPawn(currentPosition, destination);
            if (jump.success && jump.canJump) {
                if (_this.turn === "white") {
                    var lastPlace = __spreadArray([], currentPosition, true);
                    _this.whitePos = jump.destination;
                    _this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                    _this.board[jump.destination[0]][jump.destination[1]].occupiedBy = _this.turn;
                    return { success: true, message: "jump successful" };
                }
                else {
                    var lastPlace = __spreadArray([], currentPosition, true);
                    _this.blackPos = jump.destination;
                    _this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                    _this.board[jump.destination[0]][jump.destination[1]].occupiedBy = _this.turn;
                    return { success: true, message: "jump successful" };
                }
            }
            return { success: false, message: "could not complete jump" };
        };
        if (moveResults.success && moveResults.canJump) {
            jumpOverPawn(destination);
            this.availableSquares = this.generateAvailableSquares(destination);
            this.manageTurnMove();
            this.gameWon();
            return { success: true, message: "jump successful" };
        }
        if (moveResults.success && !moveResults.canJump) {
            var lastPlace = __spreadArray([], currentPosition, true);
            if (this.turn === "white") {
                this.whitePos = destination;
                this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                this.board[destination[0]][destination[1]].occupiedBy = "white";
                this.availableSquares = this.generateAvailableSquares(destination);
                this.manageTurnMove();
                this.gameWon();
                return { success: true, message: "jump successful" };
            }
            else {
                this.blackPos = destination;
                this.board[lastPlace[0]][lastPlace[1]].occupiedBy = null;
                this.board[destination[0]][destination[1]].occupiedBy = "black";
                this.availableSquares = this.generateAvailableSquares(destination);
                this.manageTurnMove();
                this.gameWon();
                return { success: true, message: "jump successful" };
            }
        }
        return { success: false, message: moveResults.message || "could not complete move" };
    };
    /**
     * Does all the necessary move validation checks for a destination square
     * @param {number[]} destination - The destination position as [row, col].
     * @returns {Object} Result of the move attempt.
     */
    Game.prototype.calculateMovePawn = function (destination) {
        var _this = this;
        var currentPos = this.turn === "white" ? this.whitePos : this.blackPos;
        /**
         * A helper, more refined way of using checkForWall by indicating a direction
         * Looks in the direction of travel for a wall blocking its movement
         * @param {number[]} currentPos - array of numbers indicating the pawns current position
         * @param {string} direction - string indicating direction, one of 'up', 'down', 'left', 'right'.
         * @returns
         */
        var noWallPresent = function (currentPos, direction) {
            switch (direction) {
                case "up":
                    if (_this.checkForWall(currentPos[0] + 1, currentPos[1])) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: "Blocked by wall" };
                    }
                    break;
                case "down":
                    if (_this.checkForWall(currentPos[0] - 1, currentPos[1])) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: "Blocked by wall" };
                    }
                    break;
                case "left":
                    if (_this.checkForWall(currentPos[0], currentPos[1] - 1)) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: "Blocked by wall" };
                    }
                    break;
                case "right":
                    if (_this.checkForWall(currentPos[0], currentPos[1] + 1)) {
                        return { success: false, canJump: null, jumpDestination: undefined, message: "Blocked by wall" };
                    }
                    break;
            }
            return { success: true, canJump: null, jumpDestination: undefined, message: "no wall present" };
        };
        if (!this.verifyRange(currentPos, destination)) {
            return { success: false, canJump: false, jumpDestination: undefined, message: "Pawns can only move one space" };
        }
        if (this.isOutOfBounds(destination[0], destination[1])) {
            return { success: false, canJump: false, jumpDestination: undefined, message: "Destination is out of bounds" };
        }
        if (this.isOccupied(destination[0], destination[1])) {
            /*
             * This block is handling the jumping logic
             * Updating game state
             */
            var jump = this.canJumpOverPawn(currentPos, destination);
            if (jump.success) {
                return {
                    success: true,
                    canJump: true,
                    jumpDestination: jump.destination,
                    message: "jump successful",
                };
            }
            return { success: false, canJump: false, jumpDestination: undefined, message: "move failed" };
        }
        var lastPlace = __spreadArray([], currentPos, true);
        var isBlocked = noWallPresent(currentPos, this.directionOfTravel(currentPos, destination));
        if (isBlocked.success === false) {
            return { success: false, canJump: false, jumpDestination: undefined, message: "Blocked by wall" };
        }
        return {
            success: true,
            canJump: false,
            jumpDestination: null,
            message: "pawn can move",
        };
    };
    Game.prototype.checkForImpedingWalls = function (targetLocation, orientation) {
        /*
            even row odd col = v
            odd row even col = h
            odd row odd col = intersection

            +3 to row for v
            +3 to col for h
            make intersections occupied by wall
        */
        if (orientation === 'v') {
            if (targetLocation[0] > 14 || targetLocation[0] < 0) {
                return { success: false, message: "wall outside of board" };
            }
            var baseSlot = this.checkForWall(targetLocation[0], targetLocation[1]);
            var aboveOne = this.checkForWall(targetLocation[0] + 1, targetLocation[1]);
            var aboveTwo = this.checkForWall(targetLocation[0] + 2, targetLocation[1]);
            //let aboveThree = this.checkForWall(targetLocation[0] + 3, targetLocation[1]);
            var slots = [baseSlot, aboveOne, aboveTwo];
            for (var a = 0; a < slots.length; a++) {
                if (slots[a])
                    return true;
            }
            return false;
        }
        if (orientation === 'h') {
            if (targetLocation[1] > 14 || targetLocation[1] < 0) {
                return { success: false, message: "wall outside of board" };
            }
            var baseSlot = this.checkForWall(targetLocation[0], targetLocation[1]);
            var rightOne = this.checkForWall(targetLocation[0], targetLocation[1] + 1);
            var rightTwo = this.checkForWall(targetLocation[0], targetLocation[1] + 2);
            //let rightThree = this.checkForWall(targetLocation[0], targetLocation[1] + 3);
            var slots = [baseSlot, rightOne, rightTwo];
            for (var a = 0; a < slots.length; a++) {
                if (slots[a])
                    return true;
            }
            return false;
        }
    };
    /**
     * Attempts to place a wall at the specified board location.
     * @param {number} row - The row index.
     * @param {number} col - The column index.
     * @returns {Object} Result of the wall placement attempt.
     */
    Game.prototype.placeWall = function (row, col) {
        var orientation = this.determineWallOrientation(row, col);
        if ((this.turn === "white" && this.whiteWalls < 1) ||
            (this.turn === "black" && this.blackWalls < 1)) {
            return { success: false, message: "Insufficient walls" };
        }
        if (this.checkForImpedingWalls([row, col], orientation)) {
            return { success: false, message: "obstruction" };
        }
        if (orientation === "v") {
            this.board[row][col].occupiedBy = "wall";
            this.board[row + 1][col].occupiedBy = "wall";
            this.board[row + 2][col].occupiedBy = "wall";
            this.manageTurnWalls();
            return { success: true, message: "Vertical wall placed" };
        }
        if (orientation === "h") {
            this.board[row][col].occupiedBy = "wall";
            this.board[row][col + 1].occupiedBy = "wall";
            this.board[row][col + 2].occupiedBy = "wall";
            this.manageTurnWalls();
            return { success: true, message: "Horizontal wall placed" };
        }
        if (orientation === false) {
            return {
                success: false,
                message: "Cannot place wall in a space or intersection",
            };
        }
    };
    return Game;
}());
exports.Game = Game;
/*
    TEST EXAMPLES FOR GAMESTATE GENERATION
*/
// function saveGameState(game, filename = 'gamestate.json') {
//     const serialized = JSON.stringify(game, null, 2);
//     fs.writeFileSync(filename, serialized, 'utf-8');
// }
var game = new Game;
game.whitePos = [16, 1];
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
