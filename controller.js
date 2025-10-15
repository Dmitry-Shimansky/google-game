import {SamuraiNumberUtility} from "./samurai-number-utility.js";
import {Game} from "./game.js";

export class Controller {
    constructor(view) {
        const randomUtl = new SamuraiNumberUtility()
        this.model = new Game(randomUtl, {
            onchange: () => {
                this.#renderView()
            }
        })
        this.view = view
        this.view.setCallbacks({
            onStart: () => {
                this.#start()
            },
            onMove: (playerNumber, direction) => {
                this.model.movePlayer(playerNumber, direction)
            }
        })
        this.#renderView()
    }

    #start() {
        this.model.start()
        this.#renderView()
    }

    #renderView() {
        this.view.render({
            status: this.model.status,
            rowsCount: this.model.gridSize.rowsCount,
            columnCount: this.model.gridSize.columnCount,
            googlePosition: this.model.googlePosition,
            player1Position: this.model.player1Position,
        })
    }
}