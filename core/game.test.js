import {Game} from "./game.js";
import {GameStatuses} from "./game_statuses.js";
import {MoveDirection} from "./move-direction.js";
import {SamuraiNumberUtility} from "./samurai-number-utility.js";

describe('Game', () => {
    it('should have Pending status after creating', () => {
        const numberUtility = new SamuraiNumberUtility();
        const game = new Game(numberUtility);
        expect(game.status).toBe(GameStatuses.PENDING);
        expect(game.googlePosition).toBeNull();
        expect(game.gridSize).toEqual({ columnCount: 4, rowsCount: 4 });
    })

    it('should have InProgress status after start', () => {
        const numberUtility = new SamuraiNumberUtility();
        const game = new Game(numberUtility);
        game.start();
        expect(game.status).toBe(GameStatuses.IN_PROGRESS);
    });

    it('google should be in the Grid after start', () => {
        const numberUtility = new SamuraiNumberUtility();
        const game = new Game(numberUtility);
        game.start();
        expect (game.googlePosition.x).toBeLessThan(game.gridSize.columnCount);
        expect (game.googlePosition.x).toBeGreaterThanOrEqual(0);
        expect (game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount);
        expect (game.googlePosition.y).toBeGreaterThanOrEqual(0);
    });

    it('google should be in the Grid but in a new position after jump', async () => {
        const numberUtility = new SamuraiNumberUtility();
        const game = new Game(numberUtility);
        game.googleJumpInterval = 10;
        game.start();
        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition;
            await delay(10)
            const currentGooglePosition = game.googlePosition;
            expect(prevGooglePosition).not.toEqual(currentGooglePosition);
        }
    });

    it('player should be on the Grid after start', () => {
        const numberUtility = new SamuraiNumberUtility();
        const game = new Game(numberUtility);
        game.start();
        expect (game.player1Position.x).toBeLessThan(game.gridSize.columnCount);
        expect (game.player1Position.x).toBeGreaterThanOrEqual(0);
        expect (game.player1Position.y).toBeLessThan(game.gridSize.columnCount);
        expect (game.player1Position.y).toBeGreaterThanOrEqual(0);
    });

    it('player should move to correct direction', () => {
        const numberUtilityMock = {
            _callCounter: 0,
            getRandomInteger() {
                this._callCounter++;
                if (this._callCounter > 2) return 2
                else return 3;
            }
        };
        const game = new Game(numberUtilityMock);
        game.start();

        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][p]
        expect (game.player1Position).toEqual({x:3, y:3});

        game.movePlayer(1, MoveDirection.RIGHT);
        expect (game.player1Position).toEqual({x:3, y:3});

        game.movePlayer(1, MoveDirection.DOWN);
        expect (game.player1Position).toEqual({x:3, y:3});

        game.movePlayer(1, MoveDirection.UP);
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][p]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:3, y:2});

        game.movePlayer(1, MoveDirection.LEFT);
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][p][ ]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:2, y:2});

        game.movePlayer(1, MoveDirection.LEFT);
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][p][ ][ ]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:1, y:2});

        game.movePlayer(1, MoveDirection.LEFT);
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [p][ ][ ][ ]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:0, y:2});

        game.movePlayer(1, MoveDirection.LEFT);
        // Can't move up through the boarder
        expect (game.player1Position).toEqual({x:0, y:2});

        game.movePlayer(1, MoveDirection.UP);
        // [ ][ ][ ][ ]
        // [p][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:0, y:1});

        game.movePlayer(1, MoveDirection.UP);
        // [p][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        // [ ][ ][ ][ ]
        expect (game.player1Position).toEqual({x:0, y:0});

        game.movePlayer(1, MoveDirection.UP);
       // Can't move up through the boarder
        expect (game.player1Position).toEqual({x:0, y:0});
    });
});

const delay = (ms) => new Promise(res => setTimeout(res, ms));
