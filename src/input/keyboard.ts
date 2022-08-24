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

const keyPress = (event: KeyboardEvent) => {
    const functionality = keyToFunctionality(event.key);

    if (functionality === "down") {
        applicationState.setTriangles([applicationState.triangles()[0]]);
    }
    if (functionality === "left") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x - 10;
        newTri[1].x = newTri[1].x - 10;
        newTri[2].x = newTri[2].x - 10;
        applicationState.setTriangles([newTri]);
    }
    if (functionality === "right") {
        const newTri = applicationState.triangles()[0];
        newTri[0].x = newTri[0].x + 10;
        newTri[1].x = newTri[1].x + 10;
        newTri[2].x = newTri[2].x + 10;
        applicationState.setTriangles([newTri]);
    }

    if (functionality === "up") {
        const newTri = applicationState.triangles()[0];
        newTri[0].y = newTri[0].y + 10;
        newTri[1].y = newTri[1].y + 10;
        newTri[2].y = newTri[2].y + 10;
        applicationState.setTriangles([newTri]);
    }

    if (functionality === "down") {
        const newTri = applicationState.triangles()[0];
        newTri[0].y = newTri[0].y - 10;
        newTri[1].y = newTri[1].y - 10;
        newTri[2].y = newTri[2].y - 10;
        applicationState.setTriangles([newTri]);
    }
}

export const keyboardListener = () => {
    document.addEventListener("keypress", keyPress, false);
}