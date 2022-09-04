import {applicationState} from "../state/state";
import {Triangle} from "../webgl/renderer/2d";
import {run} from "./core";

const triangle1: Triangle = [
    {
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
    }
];

const triangle2: Triangle = [
    {
        x: 0,
        y: 400,
        z: 1
    },
    {
        x: 400,
        y: 0,
        z: 1
    },
    {
        x: 0,
        y: 0,
        z: 1
    }
]



export const exampleProgram = () => {
    applicationState.setTriangles([triangle1, triangle2]);
    run();
}