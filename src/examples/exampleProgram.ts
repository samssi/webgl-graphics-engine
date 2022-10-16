
import {run} from "../core/core";
import {applicationState} from "../state/applicationState";
import {Entity} from "../interface/video";

const test1: Entity = {
    points: [{
        x: -70,
        y: 400,
        z: 0
    },
    {
        x: 390,
        y: 0,
        z: 0
    },
    {
        x: -10,
        y: 0,
        z: 0
    }],
    descriptor: "test1",
    transform: {
        position: {
            x: 0,
            y: 0,
            z: 0
        }
        ,
        rotation: { x: 0, y: 0, z: 0},
        scale: { x: 0, y: 0, z: 0}
    }
};



export const exampleProgram = () => {
    applicationState.updateEntity(test1);
    run();
}