import {EventListener, Functionality, Listener} from "../interface/input";
import {applicationState} from "../state/applicationState";
import {Vector2D, Vector3D} from "../interface/video";

const keys = ["w" , "a" , "s" , "d", "q", "e"];
type Key = typeof keys[number];

type KeyMapping = {[key in Key]: Functionality}

const keymappings: KeyMapping = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right",
    "q": "counter-clockwise",
    "e": "clockwise"
}

const keyToFunctionality = (key: string): Functionality => {
    return keys.includes(key) ? keymappings[key] : "none";
}

const sum = (current: Vector2D, change: Vector2D): Vector2D => ({
    x: current.x + change.x,
    y: current.y + change.y
})

// TODO: to be updated to use entities instead of basic tris
const keyPress = (event: KeyboardEvent): void => {
    const functionality = keyToFunctionality(event.key);
    const moveFactor = 5;
    const rotationFactor = 1;
    const tempEntityDescriptor = "f-letter"
    const entity = applicationState.getEntity(tempEntityDescriptor);

    if (functionality === "none") {
        console.log('none')
        return;
    }

    if (functionality === "left") {
        entity.transform.position = sum(entity.transform.position, {
            x: -moveFactor,
            y: 0
        })
    }

   if (functionality === "right") {
       entity.transform.position = sum(entity.transform.position, {
            x: moveFactor,
            y: 0
        })
    }

    if (functionality === "up") {
        entity.transform.position = sum(entity.transform.position, {
            x: 0,
            y: -moveFactor
        });
    }

    if (functionality === "down") {
        entity.transform.position = sum(entity.transform.position, {
            x: 0,
            y: moveFactor
        });
    }

    if (functionality === "clockwise") {
        entity.transform.rotation = entity.transform.rotation + rotationFactor;
    }

    if (functionality === "counter-clockwise") {
        entity.transform.rotation = entity.transform.rotation - rotationFactor;
    }

    applicationState.putEntity(entity);
}

export const keyboardListener: Listener<KeyboardEvent> = {
    listeners(): [EventListener<KeyboardEvent>] {
        return [{type: "keypress", eventFunction: (event: KeyboardEvent) => {keyPress(event)}, options: false}];
    }
}