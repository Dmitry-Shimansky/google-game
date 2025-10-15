import {GameStatuses} from "./GAME_STATUSES.js";
import {MoveDirection} from "./move-direction.js";

export class View {
    #callbacks = {}

    constructor() {
        document.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'ArrowUp': this.#callbacks.onMove(1, MoveDirection.UP); break;
                case 'ArrowDown': this.#callbacks.onMove(1, MoveDirection.DOWN); break;
                case 'ArrowLeft': this.#callbacks.onMove(1, MoveDirection.LEFT); break;
                case 'ArrowRight': this.#callbacks.onMove(1, MoveDirection.RIGHT); break;
            }
        })
    }

    //dependency Injection
    setCallbacks(callbacks) {
        this.#callbacks = callbacks;
    }

    render(dto) {
        const rootElement = document.getElementById('root');

        //reconciliation
        rootElement.innerHTML = '';

        if (dto.status === GameStatuses.PENDING) {
            const startButtonElement = this.#settingsScreen()
            rootElement.append(startButtonElement)

        } else if (dto.status === GameStatuses.IN_PROGRESS) {
            const tableElement = this.#gridScreen(dto);
            rootElement.append(tableElement)
        }
    }

    #gridScreen(dto) {
        const tableElement = document.createElement('table')
        for (let y = 0; y < dto.rowsCount; y++) {
            const rowElement = document.createElement('tr')
            for (let x = 0; x < dto.columnCount; x++) {
                const cellElement = document.createElement('td')
                if (x === dto.googlePosition.x && y === dto.googlePosition.y) {
                    cellElement.append('G')
                }
                if (x === dto.player1Position.x && y === dto.player1Position.y) {
                    cellElement.append('P1')
                }
                rowElement.append(cellElement)
            }
            tableElement.append(rowElement)
        }
        return tableElement;
    }

    #settingsScreen() {
        const startButtonElement = document.createElement('button')
        startButtonElement.classList.add('btn')
        startButtonElement.append('START')

        startButtonElement.addEventListener('click', () => {
            this.#callbacks.onStart()
        })
        return startButtonElement;
    }
}