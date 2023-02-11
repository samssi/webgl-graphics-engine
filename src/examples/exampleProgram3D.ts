import {run} from "../core/core";
import {createEntityWithDefaults, Entity3d} from "../interface/entity3d";
import {applicationState3d} from "../state/applicationState3d";

const fLetter: Entity3d = createEntityWithDefaults("f-letter",
    new Float32Array([
        // left column
        0,   0,  0,
        30,   0,  0,
        0, 150,  0,
        0, 150,  0,
        30,   0,  0,
        30, 150,  0,

        // top rung
        30,   0,  0,
        100,   0,  0,
        30,  30,  0,
        30,  30,  0,
        100,   0,  0,
        100,  30,  0,

        // middle rung
        30,  60,  0,
        67,  60,  0,
        30,  90,  0,
        30,  90,  0,
        67,  60,  0,
        67,  90,  0])
    );

export const exampleProgram3D = () => {
    applicationState3d.putEntity(fLetter);
    run();
}