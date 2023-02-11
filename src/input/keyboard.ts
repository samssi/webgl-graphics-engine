import {EventListener, Functionality, Listener} from "../interface/input";
import {applicationState} from "../state/applicationState";
import { Vector2d } from "../interface/entity2d";
import { clamp, rollover } from "../webgl/wgl-math";

const keys = ["w" , "a" , "s" , "d", "q", "e", "1", "2", "3", "4"];
type Key = typeof keys[number];

type KeyMapping = {[key in Key]: Functionality}

const keymappings: KeyMapping = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right",
    "q": "counter-clockwise",
    "e": "clockwise",
    "1": "scale-x-",
    "2": "scale-x+",
    "3": "scale-y-",
    "4": "scale-y+"
}

const keyToFunctionality = (key: string): Functionality => {
    return keys.includes(key) ? keymappings[key] : "none";
}

const sum = (current: Vector2d, change: Vector2d): Vector2d => ({
    x: current.x + change.x,
    y: current.y + change.y
})

const keyPress = (event: KeyboardEvent): void => {
    const functionality = keyToFunctionality(event.key);
    const moveFactor = 5;
    const rotationFactor = 10;
    const scaleFactor = 0.1;

    const tempEntityDescriptor = "square"
    const entity = applicationState.getEntity(tempEntityDescriptor);

    if (functionality === "none") {
        console.log('none')
        return;
    }

    if (functionality === "scale-x+") {
        entity.transform.scale.x = entity.transform.scale.x + scaleFactor;
    }
    if (functionality === "scale-x-") {
        entity.transform.scale.x = entity.transform.scale.x - scaleFactor;
    }
    if (functionality === "scale-y+") {
        entity.transform.scale.y = entity.transform.scale.y + scaleFactor;
    }
    if (functionality === "scale-y-") {
        entity.transform.scale.y = entity.transform.scale.y - scaleFactor;
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
        const newRotation = entity.transform.rotation - rotationFactor
        entity.transform.rotation = rollover(newRotation, 0, 360);
    }

    if (functionality === "counter-clockwise") {
        const newRotation = rollover(entity.transform.rotation + rotationFactor, 0, 360);
        entity.transform.rotation = newRotation
    }

    applicationState.putEntity(entity);
}

export const keyboardListener: Listener<KeyboardEvent> = {
    listeners(): [EventListener<KeyboardEvent>] {
        return [{type: "keypress", eventFunction: (event: KeyboardEvent) => {keyPress(event)}, options: false}];
    }
}