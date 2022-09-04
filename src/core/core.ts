import {applicationState} from "../state/state";
import {drawTriangles} from "../webgl/renderer/2d";

const renderLoop = (timestamp: number) => {
    console.log(timestamp)
    const gl = applicationState.gl();
    const triangles = applicationState.triangles();

    drawTriangles(triangles);
    window.requestAnimationFrame(renderLoop)
}

export const run = () => {
    applicationState.keyboardInput().listeners().forEach(listener => {
            // @ts-ignore
            document.addEventListener(listener.type, listener.eventFunction, listener.options);
        }
    );
    const gl = applicationState.gl();

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.clearDepth(0);

    gl.viewport(0,0, applicationState.canvasConfig().width, applicationState.canvasConfig().height);

    window.requestAnimationFrame(renderLoop);
}