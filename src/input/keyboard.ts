import {EventListener, Functionality, Listener} from "../interface/input";
import {applicationState} from "../state/applicationState";
import {Vector3D} from "../interface/video";

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

const sum = (current: Vector3D[], change: Vector3D): Vector3D[] => {
    return current.map(vector3D => ({
        x: vector3D.x + change.x,
        y: vector3D.y + change.y,
        z: vector3D.z + change.z
    }))
}

// TODO: to be updated to use entities instead of basic tris
const keyPress = (event: KeyboardEvent): void => {
    const functionality = keyToFunctionality(event.key);
    const moveFactor = 40;
    const tempEntityDescriptor = "test1"
    const entity = applicationState.getEntity(tempEntityDescriptor);

    /*
    if (functionality === "left") {
        const newPosition = entity.transform.position;
        sum(newPosition, {
            x: -moveFactor,
            y: 0,
            z: 0
        })

        applicationState.updateEntity(entity);
    }
    if (functionality === "none") {
        return;
    }

   if (functionality === "right") {
        const newPosition = entity.transform.position;
        sum(newPosition, {
            x: moveFactor,
            y: 0,
            z: 0
        })
    }

    if (functionality === "up") {
        const newPosition = entity.transform.position;
        sum(newPosition, {
            x: 0,
            y: moveFactor,
            z: 0
        });
    }

    if (functionality === "down") {
        const newPosition = entity.transform.position;
        sum(newPosition, {
            x: 0,
            y: -moveFactor,
            z: 0
        });
    }
    applicationState.updateEntity(entity);*/
}

export const keyboardListener: Listener<KeyboardEvent> = {
    listeners(): [EventListener<KeyboardEvent>] {
        return [{type: "keypress", eventFunction: (event: KeyboardEvent) => {keyPress(event)}, options: false}];
    }
}