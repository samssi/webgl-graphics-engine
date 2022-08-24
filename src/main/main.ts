import {applicationState} from "../webgl/state";
import {drawTriangle, drawTriangles, Triangle} from "../webgl/renderer/2d";
import {keyboardListener} from "../input/keyboard";

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

const renderLoop = (timestamp: number) => {
    console.log(timestamp)
    const gl = applicationState.gl();
    const triangles = applicationState.triangles();

    drawTriangles(triangles);
    window.requestAnimationFrame(renderLoop)
}

export const main = () => {
    keyboardListener();
    applicationState.setTriangles([triangle1, triangle2]);

    const gl = applicationState.gl();

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(0);

    gl.viewport(0,0, applicationState.canvasConfig().width, applicationState.canvasConfig().height);

    window.requestAnimationFrame(renderLoop);
}