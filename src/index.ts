import {exampleProgram} from "./core/exampleProgram";
import {applicationState} from "./state/state";
import {keyboardListener} from "./input/keyboard";

const canvasElementOrFail = (canvasElement: HTMLElement, width: number, height: number): HTMLCanvasElement => {
    if (canvasElement instanceof HTMLCanvasElement) {
        canvasElement.setAttribute("width", `${width}`);
        canvasElement.setAttribute("height", `${height}`);
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

const webGL2ContextOrFail = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        throw new Error("WebGL 2 not available for the browser!")
    }
    return gl;
}

const initWebGLContext = (elementId: string) => {
    const width = 800;
    const height = 600;
    const depth = 100;
    const canvas = canvasElementOrFail(elementByIdOrFail(elementId), width, height);
    const gl = webGL2ContextOrFail(canvas);
    applicationState.init(
        {
            gl,
            canvasConfig: {
                width,
                height,
                depth
            },
            keyboardListener: keyboardListener
        });
}

initWebGLContext("glCanvas");
exampleProgram();

