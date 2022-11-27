import {coreConfig} from "../state/coreConfig";
import {Degrees, Entity, Vector2D} from "../interface/entity";
import {
    colorUniformLocation,
    positionAttributeLocation,
    resolutionUniformLocation, rotationUniformLocation, scaleUniformLocation,
    translationUniformLocation
} from "./shaderSource";
import {rollover} from "./wgl-math";

interface VertexAttribPointer {
    size: number,
    type: GLenum,
    normalize: boolean,
    stride: number,
    offset: number
}

interface DrawArraysSettings {
    mode: GLenum,
    first: number,
    count: number
}

export const webGLEntityOrError = <T> (webGlEntity: T | null): T => {
    if (webGlEntity === null) {
        throw new Error("Failed to create WebGL entity!");
    }
    return webGlEntity;
}

export const createShader = (gl: WebGL2RenderingContext, type: GLenum, source: string) => {
    const shader = webGLEntityOrError(gl.createShader(type));
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log || "Failed to compile the Web GL shader!");
}

export const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = webGLEntityOrError(gl.createProgram());
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(log || "Failed to compile the Web GL program!");
}

export const createProgramUsingShaders = (vertexShaderSource: string, fragmentShaderSource: string) => {
    const gl = coreConfig.gl();
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    return createProgram(gl, vertexShader, fragmentShader);
}

const degreesToGlRotation = (degrees: Degrees): Vector2D => {
    const angleInDegrees = 360 - rollover(degrees, 0, 360);
    const angleInRadians = angleInDegrees * Math.PI / 180;
    return { x: Math.sin(angleInRadians), y: Math.cos(angleInRadians) }
}

const drawEntity = (entity: Entity, program: WebGLProgram) => {
    const gl = coreConfig.gl();
    const vao = gl.createVertexArray();

    const pointCount = entity.points.length;
    const glRotation = degreesToGlRotation(entity.transform.rotation);

    const pointer: VertexAttribPointer = {
        size: 2,
        type: gl.FLOAT,
        normalize: false,
        stride: 0,
        offset: 0
    }

    const arraySettings: DrawArraysSettings = {
        mode: gl.TRIANGLES,
        first: 0,
        count: pointCount
    }

    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, entity.points, gl.STATIC_DRAW);

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation(program));

    gl.vertexAttribPointer(positionAttributeLocation(program), pointer.size, pointer.type, pointer.normalize, pointer.stride, pointer.offset);

    gl.useProgram(program);

    gl.uniform2f(resolutionUniformLocation(program), coreConfig.canvasConfig().width, coreConfig.canvasConfig().height);
    gl.uniform2f(translationUniformLocation(program), entity.transform.position.x, entity.transform.position.y);
    gl.uniform2f(rotationUniformLocation(program), glRotation.x, glRotation.y);
    gl.uniform2f(scaleUniformLocation(program), entity.transform.scale.x,entity.transform.scale.y);
    gl.uniform4f(colorUniformLocation(program), 0.4, 0.4, 0.4, 1);

    gl.bindVertexArray(vao);

    gl.drawArrays(arraySettings.mode, arraySettings.first, arraySettings.count);
}

export const drawEntities = (entities: Entity[], program: WebGLProgram): void => {
    if (entities) {
        entities.forEach(entity => drawEntity(entity, program));
    }
}