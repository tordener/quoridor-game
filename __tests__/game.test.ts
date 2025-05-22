import { Game } from "../src/quoridor";

describe("Game movement", () => {
    /*
		Unit tests for movements and move validations
	*/
    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    test("Should allow pawn to move forward when no obstacles are present", () => {
        const origin = [0, 8];
        const destination = [2, 8];
        const result = game.movePawn(destination);
        expect(result.success).toBe(true);
        expect(game.board[origin[0]][origin[1]].occupiedBy).toBe(null);
        expect(game.board[destination[0]][destination[1]].occupiedBy).toBe(
            "white"
        );
        expect(game.whitePos).toEqual(destination);
        expect(game.turn).toBe("black");
    });

    test("Should not allow pawn to move when obstacle is present", () => {
        game.board[1][8].occupiedBy = "wall"; // wall above white
        game.board[0][7].occupiedBy = "wall"; // wall to the left of white
        game.board[0][9].occupiedBy = "wall"; // wall to the right of white
        const origin = [0, 8];
        const destination = [2, 8];
        const result = game.movePawn(destination); // check forward
        expect(result.success).toBe(false);
        expect(game.board[origin[0]][origin[1]].occupiedBy).toBe("white");
        expect(game.board[destination[0]][destination[1]].occupiedBy).toBe(
            null
        );
        expect(game.whitePos).toEqual(origin);
        expect(game.turn).toBe("white");

        const resultMoveLeft = game.movePawn([0, 6]); // check left
        expect(resultMoveLeft.success).toBe(false);
        expect(game.whitePos).toEqual([0, 8]);
        expect(game.turn).toBe("white");
        const resultMoveRight = game.movePawn([0, 10]); // check right
        expect(resultMoveRight.success).toBe(false);
        expect(game.whitePos).toEqual([0, 8]);
        expect(game.turn).toBe("white");
        game.turn = "black";
        game.board[15][8].occupiedBy = "wall";
        const resultMoveBlackDown = game.movePawn([14, 8]); // verify down is functioning
        expect(resultMoveBlackDown.success).toBe(false);
        expect(game.blackPos).toEqual([16, 8]);
        expect(game.turn).toBe("black");
    });

    test("Should allow wall placement when no obstacles are present, and player has walls remaining", () => {
        const destinationSlotVertical: [number, number] = [0, 3];
        const destinationSlotHorizontal: [number, number] = [1, 0];
        const resultVertical = game.placeWall(...destinationSlotVertical);
        const resultHorizontal = game.placeWall(...destinationSlotHorizontal);
        expect(resultVertical.success).toBe(true);
        expect(resultHorizontal.success).toBe(true);
        expect(
            game.board[destinationSlotVertical[0]][destinationSlotVertical[1]]
                .occupiedBy
        ).toBe("wall");
        expect(
            game.board[destinationSlotHorizontal[0]][
                destinationSlotHorizontal[1]
            ].occupiedBy
        ).toBe("wall");
        expect(game.whiteWalls).toBe(9);
        expect(game.blackWalls).toBe(9);
        expect(game.turn).toBe("white");
    });

    test("Should not allow wall placement if player has no walls remaining", () => {
        const wallLocation: [number, number] = [0, 3];
        game.whiteWalls = 0;
        const result = game.placeWall(...wallLocation);
        expect(result.success).toBe(false);
        expect(game.whiteWalls).toBe(0);
        expect(game.turn).toBe("white");
    });

    test("Should not allow placement of walls in pawn cells", () => {
        const pawnCellLocation: [number, number] = [0, 0];
        const result = game.placeWall(...pawnCellLocation);
        expect(result.success).toBe(false);
        expect(game.turn).toBe("white");
        expect(game.whiteWalls).toBe(10);
    });

    test("Should not allow placement of walls outside the boundary of the board", () => {
        const tooFarTop: [number, number] = [16, 0];
        const tooFarBottom: [number, number] = [0, 0];
        const tooFarLeft: [number, number] = [0, 0];
        const tooFarRight: [number, number]= [0, 16];
        const resultTop = game.placeWall(...tooFarTop);
        expect(game.turn).toBe("white");
        const resultBottom = game.placeWall(...tooFarBottom);
        expect(game.turn).toBe("white");
        const resultLeft = game.placeWall(...tooFarLeft);
        expect(game.turn).toBe("white");
        const resultRight = game.placeWall(...tooFarRight);
        expect(game.turn).toBe("white");
        expect(resultTop.success).toBe(false);
        expect(resultBottom.success).toBe(false);
        expect(resultLeft.success).toBe(false);
        expect(resultRight.success).toBe(false);
        expect(game.whiteWalls).toBe(10);
        expect(game.blackWalls).toBe(10);
    });

    test("Should not allow placement of walls when obstacles are present", () => {
        game.placeWall(0, 1); // w = 9
        const result = game.placeWall(0, 1); // b = 10
        expect(result.success).toBe(false);
        expect(game.turn).toBe("black");
        expect(game.whiteWalls).toBe(9);

		game.placeWall(8,7); //vertical wall in the middle (w = 8)
		expect(game.placeWall(9,6).success).toBe(false); //intersecting wall
		expect(game.turn).toBe('white');
		expect(game.blackWalls).toBe(9);
		expect(game.whiteWalls).toBe(9);
    });

	test("Should decrease player's wall count by one after successful wall placement", () => {
		expect(game.whiteWalls).toBe(10);
		expect(game.blackWalls).toBe(10);
		const resultWhitePlacedWallOne = game.placeWall(0,7);
		expect(resultWhitePlacedWallOne.success).toBe(true);
		expect(game.whiteWalls).toBe(9);
		expect(game.turn).toBe('black');
		const resultBlackPlacedWallOne = game.placeWall(4,11); // potential error
		expect(resultBlackPlacedWallOne.success).toBe(true);
		expect(game.turn).toBe('white');
		expect(game.blackWalls).toBe(9);
		
	});

    test("Should jump over unblocked pawns if enough space is available (vertical)", () => {
        game.whitePos = [6, 8];
        game.blackPos = [8, 8];
        game.board[6][8].occupiedBy = "white";
        game.board[0][8].occupiedBy = null;
        game.board[8][8].occupiedBy = "black";
        game.board[16][8].occupiedBy = null;

        const result = game.movePawn([8, 8]);
        expect(result.success).toBe(true);
        expect(game.whitePos).toEqual([10, 8]);
        expect(game.turn).toBe("black");
        const moveBlackUpResult = game.movePawn([10, 8]);
        expect(moveBlackUpResult.success).toBe(true);
        expect(game.turn).toBe("white");
        expect(game.blackPos).toEqual([12, 8]);
    });

    test("Should jump over unblocked pawns if enough space is available (horizontal)", () => {
        game.whitePos = [8, 6];
        game.blackPos = [8, 8];
        game.board[8][4].occupiedBy = "white";
        game.board[0][8].occupiedBy = null;
        game.board[8][8].occupiedBy = "black";
        game.board[16][8].occupiedBy = null;

        const result = game.movePawn([8, 8]);
        expect(result.success).toBe(true);
        expect(game.whitePos).toEqual([8, 10]);
        expect(game.turn).toBe("black");
        const moveBlackUpResult = game.movePawn([8, 10]);
        expect(moveBlackUpResult.success).toBe(true);
        expect(game.turn).toBe("white");
        expect(game.blackPos).toEqual([8, 12]);
    });

    test("Should not allow jumping over a pawn at the edge of the board", () => {
        // Check right edge of board
        game.whitePos = [8, 14];
        game.blackPos = [8, 16];
        game.board[8][14].occupiedBy = "white";
        game.board[8][16].occupiedBy = "black";

        const checkJumpRight = game.movePawn([8, 16]);
        expect(checkJumpRight.success).toBe(false);
        expect(game.turn).toBe("white");
        expect(game.whitePos).toEqual([8, 14]);

        // Check right edge of board
        game.whitePos = [8, 2];
        game.blackPos = [8, 0];
        game.board[8][2].occupiedBy = "white";
        game.board[8][0].occupiedBy = "black";
        const checkJumpLeft = game.movePawn([8, 0]);
        expect(checkJumpLeft.success).toBe(false);
        expect(game.whitePos).toEqual([8, 2]);
        expect(game.turn).toBe("white");

        /*
         * CHECKING TOP AND BOTTOM EDGES NEED TO BE HANDLED SPECIALLY
         * DUE TO WIN CONDITIONS WHICH HAVE NOT BEEN IMPLEMENTED YET
         */
    });

    test("Should not allow jumping over a pawn that has a wall between them", () => {
        game.whitePos = [6, 8]; // relocating the white pawn to the middle
        game.blackPos = [8, 8]; // relocating the black pawn to the middle
        game.board[6][8].occupiedBy = "white"; //changing the occupancy status of the board
        game.board[8][8].occupiedBy = "black"; //changing the occupancy status of the board
        game.board[7][8].occupiedBy = "wall"; //changing the occupancy status of the board

        const resultMoveWhitePawn = game.movePawn([8, 8]); // execute the jump
        expect(resultMoveWhitePawn.success).toBe(false);
        expect(game.turn).toBe("white");
        expect(game.whitePos).toEqual([6, 8]);
    });

    test("Should not allow jumping over a pawn and a wall on the far side of the opposing pawn", () => {
        game.whitePos = [6, 8]; //relocating the white pawn to the middle
        game.blackPos = [8, 8]; //relocating the black pawn to the middle
        game.board[6][8].occupiedBy = "white"; // changing occupancy status of the board
        game.board[8][8].occupiedBy = "black"; // changing occupancy status of the board
        game.board[9][8].occupiedBy = "wall"; // changing occupancy status of the board

        const moveWhitePawnForward = game.movePawn([8, 8]); // execute the jump
        expect(moveWhitePawnForward.success).toBe(false);
        expect(game.whitePos).toEqual([6, 8]);
        expect(game.turn).toBe("white");
    });

	test("Should not allow pawn to move more than one space in a valid direction", () => {
		const resultMoveTwoSpacesForward = game.movePawn([4,8]);
		expect(resultMoveTwoSpacesForward.success).toBe(false);
		expect(game.whitePos).toEqual([0,8]);
		expect(game.turn).toBe('white');
		const resultMoveTwoSpacesLeft = game.movePawn([0,4]);
		expect(resultMoveTwoSpacesLeft.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([0,8]);
		const resultMoveTwoSpacesRight = game.movePawn([0,12]);
		expect(resultMoveTwoSpacesRight.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([0,8]);
		game.whitePos = [4,8];
		game.board[0][8].occupiedBy = null;
		game.board[4][8].occupiedBy = 'white';
		const resultMoveTwoSpacesDown = game.movePawn([0,8]);
		expect(resultMoveTwoSpacesDown.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([4,8]);
	});

	test("Should not allow a pawn to move diagonally", () => {
		const resultMovedDiagonallyUpRight = game.movePawn([2,10]);
		expect(resultMovedDiagonallyUpRight.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([0,8]);
		const resultMovedDiagonallyUpLeft = game.movePawn([2,6]);
		expect(resultMovedDiagonallyUpLeft.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([0,8]);
		game.whitePos = [2,8];
		game.board[0][8].occupiedBy = null;
		game.board[2][8].occupiedBy = 'white';
		const resultMovedDiagonallyDownLeft = game.movePawn([0,6]);
		expect(resultMovedDiagonallyDownLeft.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([2,8]);
		const resultMovedDiagonallyDownRight = game.movePawn([0,10]);
		expect(resultMovedDiagonallyDownRight.success).toBe(false);
		expect(game.turn).toBe('white');
		expect(game.whitePos).toEqual([2,8]);

		
	});

    test("Should declare white as winner when reaching black's edge of the board", () => {
        game.whitePos = [14, 10];
        game.board[0][8].occupiedBy = null;
        game.board[14][10].occupiedBy = "white";

        const resultWhiteReachesBlackSide = game.movePawn([16, 10]);
        expect(resultWhiteReachesBlackSide.success).toBe(true);
        expect(game.whiteWon).toBe(true);
    });

    test("Should declare black as winner when reaching whites's edge of the board", () => {
        game.blackPos = [2, 10];
        game.board[16][8].occupiedBy = null;
        game.board[2][10].occupiedBy = "black";
        game.turn = "black";

        const resultBlackReachesBlackSide = game.movePawn([0, 10]);
        console.log(resultBlackReachesBlackSide);
        expect(resultBlackReachesBlackSide.success).toBe(true);
        expect(game.blackWon).toBe(true);
    });

	test("Should detect white has no valid path to black's side of the board", () => {
		/*
			* Solid horizontal wall
		*/

		function straightWall(){
			for(let a = 0; a < 17; a++){
				game.board[1][a].occupiedBy = 'wall';
			}
		}

		const resultCheckPath = game.pathFinder(game.whitePos);
		expect(resultCheckPath).toBe(false);
	});
		test("Should detect black has no valid path to white's side of the board", () => {
		/*
			* Solid horizontal wall
		*/

		function straightWall(){
			for(let a = 0; a < 17; a++){
				game.board[1][a].occupiedBy = 'wall';
			}
		}
		game.turn = 'black';
		const resultCheckPath = game.pathFinder(game.blackPos);
		expect(resultCheckPath).toBe(false);
	});
		test("Should detect white has a valid path to black's side of the board", () => {
		/*
			* Solid horizontal wall
		*/

		function straightWall(){
			for(let a = 0; a < 15; a++){
				game.board[1][a].occupiedBy = 'wall';
			}
		}

		const resultCheckPath = game.pathFinder(game.whitePos);
		expect(resultCheckPath).toBe(false);
	});
		test("Should detect black has a valid path to white's side of the board", () => {
		/*
			* Solid horizontal wall
		*/

		function straightWall(){
			for(let a = 0; a < 15; a++){
				game.board[1][a].occupiedBy = 'wall';
			}
		}
		game.turn = 'black';
		const resultCheckPath = game.pathFinder(game.blackPos);
		expect(resultCheckPath).toBe(false);
	});
});
