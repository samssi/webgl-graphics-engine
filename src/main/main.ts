import {applicationState} from "../webgl/state";
import {drawTriangle} from "../webgl/renderer/2d";
import {drawTriangleOld} from "../webgl/renderer/triangle";

const triangle1 = [
    0, 0,
    0, -0.5,
    -0.7, 0
];

const triangle2 = [
    0, 0,
    0, 0.5,
    0.7, 0
];

export const main = () => {
    const gl = applicationState.gl();
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTriangle([
        {
            x: 0,
            y: 400,
            z: 0

        },
        {
            x: 400,
            y: 0,
            z: 0
        },
        {
            x: 0,
            y: 0,
            z: 0
        }
    ]);
    drawTriangleOld(triangle1);
    //drawTriangle(triangle2);
}