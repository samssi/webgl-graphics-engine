import {main} from "./main/main";
import {config} from "./webgl/state";

const canvasElementOrFail = (canvasElement: HTMLElement): HTMLCanvasElement => {
    if (canvasElement instanceof HTMLCanvasElement) {
        canvasElement.setAttribute("width", `${config.canvasConfig().width}`);
        canvasElement.setAttribute("height", `${config.canvasConfig().height}`);
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

const initWebGLContext = (elementId: string): WebGL2RenderingContext => {
    config.updateCanvasConfig({width: 800, height: 600});
    const canvas = canvasElementOrFail(elementByIdOrFail(elementId));
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        throw new Error("WebGL 2 not available for the browser!")
    }
    return gl;
}

main(initWebGLContext("glCanvas"));

