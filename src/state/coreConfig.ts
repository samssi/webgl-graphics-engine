import {Listener} from "../interface/input";
import {createProgramUsingShaders} from "../webgl/webgl";
import {defaultFragmentShaderSource, defaultVertexShaderSource} from "../webgl/shaderSource";

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
    let shaderProgram: WebGLProgram;

    return {
        init(config: CoreConfig): void {
            currentConfig = config;
            shaderProgram = createProgramUsingShaders(defaultVertexShaderSource, defaultFragmentShaderSource);
        },
        shaderProgram(): WebGLProgram {
            return shaderProgram;
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