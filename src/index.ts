import {Config} from "./webgl-renderer/webgl";
import {main} from "./main/main";

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

const initWebGLContext = (elementId: string): WebGL2RenderingContext => {
    const canvas = canvasElementOrFail(config, elementByIdOrFail(elementId));
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        throw new Error("WebGL 2 not available for the browser!")
    }
    return gl;
}

const config: Config = {
    width: 600,
    height: 600
}

main(initWebGLContext("glCanvas"), config);

