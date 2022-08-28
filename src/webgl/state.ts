import {Triangle} from "./renderer/2d";
import {Input} from "../interface/input";

export interface Config {
    gl: WebGL2RenderingContext;
    canvasConfig: CanvasConfig;
    // TODO: temp. All state will be stored in dict structure
    input: Input<KeyboardEvent>;
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
        input(): Input<KeyboardEvent> {
            return currentConfig.input;
        }
    }
})();