
import {run} from "../core/core";
import {applicationState} from "../state/applicationState";
import {centerOfAnObject, createPointsWithDefaults, createRectangleWithDefaults, Entity} from "../interface/entity";

const points = new Float32Array([
    0, 0,
    0, 0.5,
    0.7, 0,
]);

const trianglePoints = new Float32Array([
    100, 0,
    0, 100,
    100, 100,

    0, 100,
    100,0,
    0,0,
]);

const square: Entity = {
    points: trianglePoints,
    descriptor: "square",
    transform: {
        objectCenter: centerOfAnObject(trianglePoints),
        position: {
            x: 0,
            y: 0

        }
        ,
        rotation: 0,
        scale: { x: 1, y: 1 }
    }
};

//const triangle = createPointsWithDefaults("triangle", trianglePoints);

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
    applicationState.putEntity(square);
    //applicationState.putEntity(createRectangleWithDefaults('quad1', 200, 100))
    // applicationState.putEntity(fLetter);

    run();
}