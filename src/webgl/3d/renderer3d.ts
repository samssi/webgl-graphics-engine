import {coreConfig} from "../../state/coreConfig";

import { mat4 } from "gl-matrix"

import { DrawArraysSettings, VertexAttribPointer } from "../settings";
import {colorUniformLocation, modelViewProjection, vertexObjectCoordinates} from "./shaderSource";
import {Entity3d} from "../../interface/entity3d";
import {degreesToRadians} from "../wgl-math";

const apply3DTransformations = (entity: Entity3d): mat4 => {
    const modelView = mat4.create();
    const projection = mat4.create();
    const modelViewProjection = mat4.create();

    mat4.identity(modelView);

    mat4.ortho(projection, -200, 200, 200, -200, 200, -200);

    mat4.lookAt(modelView, [0,0,0], [0,0,0], [0,0,0]);

    mat4.translate(modelView, modelView, [entity.transform.position.x, entity.transform.position.y, entity.transform.position.z]);

    mat4.rotateX(modelView, modelView, degreesToRadians(entity.transform.rotation.x));

    mat4.rotateY(modelView, modelView, degreesToRadians(entity.transform.rotation.y));

    mat4.rotateZ(modelView, modelView, degreesToRadians(entity.transform.rotation.z));

    mat4.scale(modelView, modelView, [entity.transform.scale.x, entity.transform.scale.y, entity.transform.scale.z]);

    mat4.multiply(modelViewProjection, projection, modelView);

    return modelViewProjection;
}

const drawEntity = (entity: Entity3d, program: WebGLProgram) => {
    const gl = coreConfig.gl();
    const vao = gl.createVertexArray();

    const pointCount = entity.points.length;

    const pointer: VertexAttribPointer = {
        size: 3,
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

    const matrix3d = apply3DTransformations(entity)

    gl.uniformMatrix4fv(modelViewProjection(program), false, matrix3d);

    gl.uniform4f(colorUniformLocation(program), 0.4, 0.4, 0.4, 1);

    gl.bindVertexArray(vao);

    gl.drawArrays(arraySettings.mode, arraySettings.first, arraySettings.count);
}

export const draw3DEntities = (entities: Entity3d[], program: WebGLProgram): void => {
    if (entities) {
        entities.forEach(entity => drawEntity(entity, program));
    }
}