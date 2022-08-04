import {drawTriangle} from "./webgl-renderer/triangle-renderer";
import {Config} from "./webgl-renderer/webgl";

const canvasElementOrFail = (config: Config, canvasElement: HTMLElement): HTMLCanvasElement => {
    if (canvasElement instanceof HTMLCanvasElement) {
        canvasElement.setAttribute("width", `${config.width}`);
        canvasElement.setAttribute("height", `${config.height}`);
        return canvasElement;
    }
    throw new Error("Invalid SVGElement! Are you passing <canvas>-element?");
}

const elementByIdOrFail = (elementId: string) => {
    const rootElement = document.getElementById(elementId);
    if (rootElement) {
        return rootElement;
    }
    throw new Error(`Failed to find element with ID: ${elementId}`);
}

const config: Config = {
    width: 800,
    height: 600
}

const initWebGLContext = (elementId: string): WebGL2RenderingContext => {
    const canvas = canvasElementOrFail(config, elementByIdOrFail(elementId));
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        throw new Error("WebGL 2 not available for the browser!")
    }
    return gl;
}

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

const main = () => {
    const gl = initWebGLContext("glCanvas");
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    drawTriangle(gl, config, triangle1);
    drawTriangle(gl, config, triangle2);
}

main();

