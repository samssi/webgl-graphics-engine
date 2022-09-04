import {Triangle} from "../webgl/renderer/2d";
import {Listener} from "../interface/input";

export interface Config {
    gl: WebGL2RenderingContext;
    canvasConfig: CanvasConfig;
    // TODO: temp. All state will be stored in dict structure
    keyboardListener: Listener<KeyboardEvent>;
}

export interface CanvasConfig {
    width: number;
    height: number;
    depth: number;
}

export const applicationState = (() => {
    let currentConfig: Config;
    let triangles: Triangle[];

    return {
        init(config: Config): void {
            currentConfig = config;
        },
        gl(): WebGL2RenderingContext {
            return currentConfig.gl;
        },
        canvasConfig(): CanvasConfig {
            return currentConfig.canvasConfig;
        },
        triangles(): Triangle[] {
            return triangles;
        },
        setTriangles(newTriangles: Triangle[]): void {
            triangles = newTriangles;
        },
        keyboardInput(): Listener<KeyboardEvent> {
            return currentConfig.keyboardListener;
        }
    }
})();