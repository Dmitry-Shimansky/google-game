import {Controller} from "./controller.js";
import {View} from "./view.js";

// Dependency Injection: Composition Root/IoC Container
const view = new View({
    // onStart: () => {
    //     this.#start()
    // }
})

const controller = new Controller(view)