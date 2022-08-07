export interface CanvasConfig {
    width: number;
    height: number;
}

export const config = (() => {
    let canvasConfig: CanvasConfig = {
        width: 800,
        height: 600
    };
    const reconfigure = (config: CanvasConfig) => {
        canvasConfig = config;
    }


    return {
        canvasConfig(): CanvasConfig {
            return canvasConfig;
        },
        updateCanvasConfig(config: CanvasConfig): void {
            reconfigure(config);
        }
    }
})();