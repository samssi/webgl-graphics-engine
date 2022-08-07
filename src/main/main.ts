import {drawTriangle} from "../webgl/renderer/triangle";

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

export const main = (gl: WebGL2RenderingContext) => {
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTriangle(gl, triangle1);
    drawTriangle(gl, triangle2);
}