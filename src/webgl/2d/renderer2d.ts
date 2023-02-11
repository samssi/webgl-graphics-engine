import {coreConfig} from "../../state/coreConfig";
import { mat3 } from "gl-matrix"

import {
    colorUniformLocation, modelViewProjection, vertexObjectCoordinates
} from "./shaderSource";
import {degreesToRadians, rollover} from "../wgl-math";
import {DrawArraysSettings, VertexAttribPointer, webGLEntityOrError} from "../settings";
import {Entity2d} from "../../interface/entity2d";

const apply2DTransformations = (entity: Entity2d) => {
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

const drawEntity = (entity: Entity2d, program: WebGLProgram) => {
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

export const draw2DEntities = (entities: Entity2d[], program: WebGLProgram): void => {
    if (entities) {
        entities.forEach(entity => drawEntity(entity, program));
    }
}