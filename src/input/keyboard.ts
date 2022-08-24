import {applicationState} from "../webgl/state";

type Functionality = "up" | "down" | "left" | "right" | "none";

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

const keyUp = (event: KeyboardEvent) => {
    const functionality = keyToFunctionality(event.key);
    console.log(functionality);
    if (functionality === "down") {
        applicationState.setTriangles([applicationState.triangles()[0]]);
    }
    if (functionality === "left") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x - 10;
        applicationState.setTriangles([newTri]);
    }
    if (functionality === "right") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x + 10;
        applicationState.setTriangles([newTri]);
    }

}

export const keyboardListener = () => {
    document.addEventListener("keyup", keyUp, false);
}