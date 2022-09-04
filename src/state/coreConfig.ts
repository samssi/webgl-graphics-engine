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
        keyboardInput(): Listener<KeyboardEvent> {
            return currentConfig.keyboardListener;
        }
    }
})();