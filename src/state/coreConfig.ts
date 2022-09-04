import {Triangle} from "../webgl/renderer/2d";
import {Listener} from "../interface/input";

export interface CoreConfig {
    gl: WebGL2RenderingContext;
    canvasConfig: CanvasConfig;
    keyboardListener: Listener<KeyboardEvent>;
}

export interface CanvasConfig {
    width: number;
    height: number;
    depth: number;
}

export const coreConfig = (() => {
    let currentConfig: CoreConfig;
    let triangles: Triangle[];

    return {
        init(config: CoreConfig): void {
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