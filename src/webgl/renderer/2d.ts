import {applicationState} from "../state";
import {createProgramUsingShaders} from "../webgl";
import {
    defaultFragmentShaderSource,
    defaultFragmentShaderSource2,
    defaultVertexShaderSource,
    positionAttributeLocation
} from "./default";

export interface Vector3D {
    x: number;
    y: number;
    z: number;
}

type Triangle = [Vector3D, Vector3D, Vector3D];

const asFloat32Array = (coordinates: number[]) => new Float32Array(coordinates);
// TODO: do this conversion in the shader program
const asWebGLVertices = (vector3D: Vector3D) => [vector3D.x / applicationState.canvasConfig().width, vector3D.y / applicationState.canvasConfig().height, vector3D.z / applicationState.canvasConfig().depth]

const storeBufferObjects = (triangle: Triangle) => {
    const gl = applicationState.gl();

    const positionBuffer = gl.createBuffer();
    const vertices = triangle
        .map(vector3D => asWebGLVertices(vector3D)).flat();

    console.log(vertices);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, asFloat32Array(vertices), gl.STATIC_DRAW);
}

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

const vertexAttribPointer = (program: WebGLProgram, vertexAttribPointer: VertexAttribPointer) => {
    const gl = applicationState.gl();

    gl.vertexAttribPointer(positionAttributeLocation(program), vertexAttribPointer.size, vertexAttribPointer.type, vertexAttribPointer.normalize, vertexAttribPointer.stride, vertexAttribPointer.offset);
}

const drawArrays = (drawArraysSettings: DrawArraysSettings) => {
    const gl = applicationState.gl();

    gl.drawArrays(drawArraysSettings.mode, drawArraysSettings.first, drawArraysSettings.count);
}

export const drawTriangle = (triangle: Triangle, depthTest?: boolean) => {
    const gl = applicationState.gl();

    let program;
    if (depthTest) {
        program = createProgramUsingShaders(gl, defaultVertexShaderSource, defaultFragmentShaderSource);
    }
    else {
        program = createProgramUsingShaders(gl, defaultVertexShaderSource, defaultFragmentShaderSource2);
    }

    // Is in 3D the size 3?
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
        count: 3
    }

    storeBufferObjects(triangle);

    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation(program));

    vertexAttribPointer(program, pointer);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    drawArrays(arraySettings);
}