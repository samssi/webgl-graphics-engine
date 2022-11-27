
import {run} from "../core/core";
import {applicationState} from "../state/applicationState";
import {createPointsWithDefaults, createRectangleWithDefaults, Entity} from "../interface/video";

const triangle: Entity = {
    points: new Float32Array([
        -200, 100,
        200, 100,
        200, -100,
    ]),
    descriptor: "test1",
    transform: {
        position: {
            x: 350,
            y: 300
        }
        ,
        rotation: 0,
        scale: { x: 1, y: 1 }
    }
};



const fLetter: Entity = createPointsWithDefaults("f-letter",
    new Float32Array([
        0,0,
        30, 0,
        0, 150,
        0, 150,
        30, 0,
        30,150,

        30,0,
        100,0,
        30,30,
        30,30,
        100,0,
        100,30,

        30,60,
        67,60,
        30,90,
        30,90,
        67,60,
        67,90,
    ])
);

export const exampleProgram = () => {
    //applicationState.putEntity(triangle);
    //applicationState.putEntity(createRectangleWithDefaults('quad1', 200, 100))
    applicationState.putEntity(fLetter);

    run();
}