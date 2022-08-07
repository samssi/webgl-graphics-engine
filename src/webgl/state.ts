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
        }
    }
})();