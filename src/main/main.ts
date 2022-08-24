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

    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(0);

    gl.viewport(0,0, applicationState.canvasConfig().width, applicationState.canvasConfig().height);
    const depth1 = 0;
    const depth2 = -100;
    drawTriangle([
        {
            x: -70,
            y: 400,
            z: depth1
        },
        {
            x: 390,
            y: 0,
            z: depth1
        },
        {
            x: -10,
            y: 0,
            z: depth1
        }
    ], true);
    drawTriangle([
        {
            x: 0,
            y: 400,
            z: depth2
        },
        {
            x: 400,
            y: 0,
            z: depth2
        },
        {
            x: 0,
            y: 0,
            z: depth2
        }
    ]);

    //drawTriangleOld(triangle1);
    //drawTriangle(triangle2);
}