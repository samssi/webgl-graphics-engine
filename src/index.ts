import {exampleProgram2D} from "./examples/exampleProgram2D";
import {coreConfig} from "./state/coreConfig";
import {keyboardListener} from "./input/keyboard";
import {exampleProgram3D} from "./examples/exampleProgram3D";
import {objectFileLoader} from "./core/objectFileLoader";


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
        throw new Error("WebGL 2 not available for the browser!");
    }
    return gl;
}

const initFileUpload = () => {
    const fileInput = elementByIdOrFail("fileInput");
    fileInput.addEventListener("change", objectFileLoader, false);
}

const initWebGLContext = (elementId: string) => {
    const width = 800;
    const height = 600;
    const depth = 100;
    const canvas = canvasElementOrFail(elementByIdOrFail(elementId), width, height);
    const gl = webGL2ContextOrFail(canvas);
    initFileUpload();

    coreConfig.init(
        {
            gl,
            canvasConfig: {
                width: canvas.clientWidth,
                height: canvas.clientHeight,
                depth
            },
            keyboardListener
        });
}

initWebGLContext("glCanvas");
// exampleProgram2D();
exampleProgram3D();

