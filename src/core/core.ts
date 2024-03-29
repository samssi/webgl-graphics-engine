import {coreConfig} from "../state/coreConfig";
import {applicationState} from "../state/applicationState";
import {draw2DEntities} from "../webgl/2d/renderer2d";
import {draw3DEntities} from "../webgl/3d/renderer3d";
import {applicationState3d} from "../state/applicationState3d";
import {draw3DEntitiesSingleColor} from "../webgl/3d/renderer3dSingleColor";

const renderLoop2d = (timestamp: number) => {
    const entities = applicationState.entities();

    draw2DEntities(entities, coreConfig.shaderProgram());
    window.requestAnimationFrame(renderLoop2d)
}

const renderLoop3d = (timestamp: number) => {
    const entities = applicationState3d.entities();

    // draw3DEntities(entities, coreConfig.shaderProgram());
    draw3DEntitiesSingleColor(entities, coreConfig.shaderProgram());
    window.requestAnimationFrame(renderLoop3d)
}

export const run = () => {
    coreConfig.keyboardInput().listeners().forEach(listener => {
            // @ts-ignore
            document.addEventListener(listener.type, listener.eventFunction, listener.options);
        }
    );
    const gl = coreConfig.gl();
    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0,0, coreConfig.canvasConfig().width, coreConfig.canvasConfig().height);

    window.requestAnimationFrame(renderLoop3d);
}