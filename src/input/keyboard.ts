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
    console.log(keyToFunctionality(event.key));
}

export const keyboardListener = () => {
    document.addEventListener("keyup", keyUp, false);
}