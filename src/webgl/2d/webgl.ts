import {coreConfig} from "../../state/coreConfig";
import {Degrees, Entity, Vector2D} from "../../interface/entity";
import { mat3 } from "gl-matrix"

import {
    colorUniformLocation, modelViewProjection, vertexObjectCoordinates
} from "./shaderSource";
import {degreesToRadians, rollover} from "../wgl-math";

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



const apply2DTransformations = (entity: Entity) => {
    const matrix2D = mat3.create();

    mat3.identity(matrix2D);

    // Apply projection to canvas size
    mat3.projection(matrix2D, coreConfig.canvasConfig().width, coreConfig.canvasConfig().height);

    // Move origin to center from pixel space
    mat3.translate(matrix2D, matrix2D, [coreConfig.canvasConfig().width / 2, coreConfig.canvasConfig().height / 2]);

    // Applies position to the entity
    mat3.translate(matrix2D, matrix2D, [entity.transform.position.x, entity.transform.position.y]);

    // Applies rotation to the entity
    mat3.rotate(matrix2D, matrix2D, degreesToRadians(entity.transform.rotation));

    // Applies scale to the entity
    mat3.scale(matrix2D, matrix2D, [entity.transform.scale.x, entity.transform.scale.y]);

    // Moves entity origin to the center of the entity
    mat3.translate(matrix2D, matrix2D, [entity.transform.objectCenter.x, entity.transform.objectCenter.y]);

    return matrix2D
}

const drawEntity = (entity: Entity, program: WebGLProgram) => {
    const gl = coreConfig.gl();
    const vao = gl.createVertexArray();

    const pointCount = entity.points.length;

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
    gl.enableVertexAttribArray(vertexObjectCoordinates(program));

    gl.vertexAttribPointer(vertexObjectCoordinates(program), pointer.size, pointer.type, pointer.normalize, pointer.stride, pointer.offset);

    gl.useProgram(program);

    const matrix2d = apply2DTransformations(entity)

    // @ts-ignore
    gl.uniformMatrix3fv(modelViewProjection(program), false, matrix2d);

    gl.uniform4f(colorUniformLocation(program), 0.4, 0.4, 0.4, 1);

    gl.bindVertexArray(vao);

    gl.drawArrays(arraySettings.mode, arraySettings.first, arraySettings.count);
}

export const draw2DEntities = (entities: Entity[], program: WebGLProgram): void => {
    if (entities) {
        entities.forEach(entity => drawEntity(entity, program));
    }
}