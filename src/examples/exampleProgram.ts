
import {run} from "../core/core";
import {applicationState} from "../state/applicationState";
import {createQuadWithDefaults, createTriangleWithDefaults, Entity} from "../interface/video";

const test1: Entity = {
    triangles: [[{
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
    }]],
    descriptor: "test1",
    transform: {
        position: {
            x: 150,
            y: 0,
            z: 0
        }
        ,
        rotation: { x: 0, y: 0, z: 0},
        scale: { x: 0, y: 0, z: 0}
    }
};

const test2: Entity = createTriangleWithDefaults("test2", [
    [{
        x: 70,
        y: 400,
        z: 0
    },
    {
        x: 70,
        y: 0,
        z: 0
    },
    {
        x: 10,
        y: 0,
        z: 0
    }]
])

export const exampleProgram = () => {
    // applicationState.putEntity(test1);
    // applicationState.putEntity(test2)
    applicationState.putEntity(createQuadWithDefaults('quad1', 200, 100))
    run();
}