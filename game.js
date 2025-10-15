import {GameStatuses} from "./GAME_STATUSES.js";
import {SamuraiNumberUtility} from "./samurai-number-utility.js";
import {MoveDirection} from "./move-direction.js";

export class Game {
    #settings = {
        gridSize: {
            columnCount: 4,
            rowsCount: 4
        },
        jumpInterval: 1000,
    }

    #status = GameStatuses.PENDING

    #googlePosition = null
    #playersPositions = {
        '1': null,
        '2': null
    }
    #player1Position = null
    #player2Position = null

    /**
     * Number helper. Currently not necessary since methods are static, kept for potential future extension.
     * @type {SamuraiNumberUtility}
     */
    #numberUtility

    #callbacks = {}

    //dependency injection
    constructor(numberUtility, callbacks) {
        this.#numberUtility = numberUtility;
        this.#callbacks = callbacks;
    }

    set googleJumpInterval(value) {
        if (!Number.isInteger(value) || value <= 0) {
            throw new Error('jumpInterval must be a positive integer');
        }
        this.#settings.jumpInterval = value;
        this.#callbacks.onchange();
    }

    get status() {
        return this.#status;
    }

    get gridSize() {
        return this.#settings.gridSize;
    }

    get googlePosition() {
        return this.#googlePosition;
    }

    get player1Position() {
        return this.#playersPositions["1"];
    }

    start() {
        this.#status = GameStatuses.IN_PROGRESS;
        this.#placePlayer1RandomPosition();
        this.#jumpGoogle();
        this.#callbacks.onchange();
        setInterval(() => { //todo: #googleEscaped
            this.#jumpGoogle();
            this.#callbacks.onchange();
        }, this.#settings.jumpInterval)
    }

    #jumpGoogle() {
        const newPosition = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columnCount),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
        };
        if (
            (newPosition.x === this.googlePosition?.x && newPosition.y === this.googlePosition?.y)
            || (newPosition.x === this.player1Position?.x && newPosition.y === this.player1Position?.y)
        ) {
            this.#jumpGoogle();
            return;
        }
        this.#googlePosition = newPosition;
    }

    /**
     * Important! Player1 must be placed before other players and google
     */
    #placePlayer1RandomPosition() {
        const newPosition = {
            x: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.columnCount),
            y: this.#numberUtility.getRandomInteger(0, this.#settings.gridSize.rowsCount),
        };
        if (newPosition.x === this.player1Position?.x && newPosition.y === this.player1Position?.y) {
            this.#placePlayer1RandomPosition();
            return;
        }
        this.#playersPositions["1"] = newPosition;
    }

    movePlayer(playerNumber, moveDirection) {
        const newPosition = {...this.#playersPositions[playerNumber]};
        switch (moveDirection) {
            case MoveDirection.UP: newPosition.y--; break;
            case MoveDirection.DOWN: newPosition.y++; break;
            case MoveDirection.LEFT: newPosition.x--; break;
            case MoveDirection.RIGHT: newPosition.x++; break;
        }

        const isInGridRange = newPosition.x >= 0 && newPosition.x < this.gridSize.columnCount && newPosition.y >= 0 && newPosition.y < this.gridSize.rowsCount;

        if (!isInGridRange) {
            return
        }

        const isCellFreeFromOtherPlayer = true;

        if (!isCellFreeFromOtherPlayer) {
            return
        }

        const isGoogleInThisPosition = false;

        if (isGoogleInThisPosition) {
            //this.#catchGoogle(playerNumber)
        }

        this.#playersPositions[playerNumber] = newPosition;
        this.#callbacks.onchange();
    }

}
