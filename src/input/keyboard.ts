import {EventListener, Functionality, Listener} from "../interface/input";
import {applicationState3d} from "../state/applicationState3d";
import {rollover} from "../webgl/wgl-math";
import {resetTransform, Vector3d} from "../interface/entity3d";

const keys = ["w" , "a" , "s" , "d", "q", "e", "1", "2", "3", "4", "z", "c", "r"];
type Key = typeof keys[number];

type KeyMapping = {[key in Key]: Functionality}

const keymappings: KeyMapping = {
    "w": "up",
    "s": "down",
    "a": "left",
    "d": "right",
    "q": "z-counter-clockwise",
    "e": "z-clockwise",
    "z": "y-clockwise",
    "c": "y-counter-clockwise",
    "r": "reset",
    "1": "scale-x-",
    "2": "scale-x+",
    "3": "scale-y-",
    "4": "scale-y+"
}

const keyToFunctionality = (key: string): Functionality => {
    return keys.includes(key) ? keymappings[key] : "none";
}

const sum = (current: Vector3d, change: Vector3d): Vector3d => ({
    x: current.x + change.x,
    y: current.y + change.y,
    z: current.z + change.z
})

const keyPress = (event: KeyboardEvent): void => {
    const functionality = keyToFunctionality(event.key);
    const moveFactor = 5;
    const rotationFactor = 10;
    const scaleFactor = 0.1;

    const tempEntityDescriptor = "test"
    const entity = applicationState3d.getEntity(tempEntityDescriptor);

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
            y: 0,
            z: 0
        })
    }

   if (functionality === "right") {
       entity.transform.position = sum(entity.transform.position, {
            x: moveFactor,
            y: 0,
            z: 0
        })
    }

    if (functionality === "up") {
        entity.transform.position = sum(entity.transform.position, {
            x: 0,
            y: -moveFactor,
            z: 0
        });
    }

    if (functionality === "down") {
        entity.transform.position = sum(entity.transform.position, {
            x: 0,
            y: moveFactor,
            z: 0
        });
    }

    if (functionality === "y-clockwise") {
        const newRotation = entity.transform.rotation.y - rotationFactor
        entity.transform.rotation.y = rollover(newRotation, 0, 360);
    }

    if (functionality === "y-counter-clockwise") {
        entity.transform.rotation.y = rollover(entity.transform.rotation.y + rotationFactor, 0, 360)
    }

    if (functionality === "z-clockwise") {
        const newRotation = entity.transform.rotation.z- rotationFactor
        entity.transform.rotation.z = rollover(newRotation, 0, 360);
    }

    if (functionality === "z-counter-clockwise") {
        entity.transform.rotation.z = rollover(entity.transform.rotation.z + rotationFactor, 0, 360)
    }

    if (functionality === "reset") {
        entity.transform = resetTransform()
    }

    applicationState3d.putEntity(entity);
}

export const keyboardListener: Listener<KeyboardEvent> = {
    listeners(): [EventListener<KeyboardEvent>] {
        return [{type: "keypress", eventFunction: (event: KeyboardEvent) => {keyPress(event)}, options: false}];
    }
}