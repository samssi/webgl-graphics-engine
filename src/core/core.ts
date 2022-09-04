import {coreConfig} from "../state/coreConfig";
import {applicationState} from "../state/applicationState";
import {drawTriangles} from "../webgl/webgl";

const renderLoop = (timestamp: number) => {
    console.log(timestamp)
    const triangles = applicationState.triangles();

    drawTriangles(triangles);
    window.requestAnimationFrame(renderLoop)
}

export const run = () => {
    coreConfig.keyboardInput().listeners().forEach(listener => {
            // @ts-ignore
            document.addEventListener(listener.type, listener.eventFunction, listener.options);
        }
    );
    const gl = coreConfig.gl();

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(0);

    gl.viewport(0,0, coreConfig.canvasConfig().width, coreConfig.canvasConfig().height);

    window.requestAnimationFrame(renderLoop);
}