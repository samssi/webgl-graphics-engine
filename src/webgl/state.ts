import {Triangle} from "./renderer/2d";

export interface Config {
    gl: WebGL2RenderingContext;
    canvasConfig: CanvasConfig;
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
        currentConfig(): Config {
            return currentConfig;
        },
        canvasConfig(): CanvasConfig {
            return currentConfig.canvasConfig;
        },
        triangles(): Triangle[] {
            return triangles;
        },
        setTriangles(newTriangles: Triangle[]): void {
            triangles = newTriangles;
        }
    }
})();