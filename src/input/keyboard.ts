import {coreConfig} from "../state/coreConfig";
import {EventListener, Functionality, Listener} from "../interface/input";
import {applicationState} from "../state/applicationState";

const keys = ["w" , "a" , "s" , "d"];
type Key = typeof keys[number];

type KeyMapping = {[key in Key]: Functionality}

const keymappings: KeyMapping = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right"
}

const keyToFunctionality = (key: string): Functionality => {
    return keys.includes(key) ? keymappings[key] : "none";
}

const keyPress = (event: KeyboardEvent): void => {
    const functionality = keyToFunctionality(event.key);
    const moveFactor = 40;

    if (functionality === "down") {
        applicationState.updateTriangles([applicationState.triangles()[0]]);
    }
    if (functionality === "left") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x - moveFactor;
        newTri[1].x = newTri[1].x - moveFactor;
        newTri[2].x = newTri[2].x - moveFactor;
        applicationState.updateTriangles([newTri]);
    }
    if (functionality === "right") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x + moveFactor;
        newTri[1].x = newTri[1].x + moveFactor;
        newTri[2].x = newTri[2].x + moveFactor;
        applicationState.updateTriangles([newTri]);
    }

    if (functionality === "up") {
        const newTri = applicationState.triangles()[0];
        newTri[0].y = newTri[0].y + moveFactor;
        newTri[1].y = newTri[1].y + moveFactor;
        newTri[2].y = newTri[2].y + moveFactor;
        applicationState.updateTriangles([newTri]);
    }

    if (functionality === "down") {
        const newTri = applicationState.triangles()[0];
        newTri[0].y = newTri[0].y - moveFactor;
        newTri[1].y = newTri[1].y - moveFactor;
        newTri[2].y = newTri[2].y - moveFactor;
        applicationState.updateTriangles([newTri]);
    }
}

export const keyboardListener: Listener<KeyboardEvent> = {
    listeners(): [EventListener<KeyboardEvent>] {
        return [{type: "keypress", eventFunction: (event: KeyboardEvent) => {keyPress(event)}, options: false}];
    }
}