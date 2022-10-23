import {coreConfig} from "../state/coreConfig";
import {Entity, Triangle, Vector3D} from "../interface/video";
import {positionAttributeLocation} from "./shaderSource";

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

// TODO: do this conversion in the shader program
const asWebGLVertices = (vector3D: Vector3D) => [vector3D.x / coreConfig.canvasConfig().width, vector3D.y / coreConfig.canvasConfig().height, vector3D.z / coreConfig.canvasConfig().depth]
const asFloat32Array = (coordinates: number[]) => new Float32Array(coordinates);

const asStoreBufferObjects = (triangle: Triangle): number[] => {
    return triangle
        .map(vector3D => asWebGLVertices(vector3D)).flat();
}

const drawTriangle = (triangle: Triangle, program: WebGLProgram) => {
    const gl = coreConfig.gl();
    const vao = gl.createVertexArray();

    // 3D coordinates with size 3
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

    const storeBufferObjects = asStoreBufferObjects(triangle);
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, asFloat32Array(storeBufferObjects), gl.STATIC_DRAW);

    gl.bindVertexArray(vao);
    gl.enableVertexAttribArray(positionAttributeLocation(program));

    gl.vertexAttribPointer(positionAttributeLocation(program), pointer.size, pointer.type, pointer.normalize, pointer.stride, pointer.offset);

    gl.useProgram(program);
    gl.bindVertexArray(vao);

    gl.drawArrays(arraySettings.mode, arraySettings.first, arraySettings.count);
}

const drawTriangles = (triangles: Triangle[], vertexShaderSource: string, fragmentShaderSource: string): void => {
    const program = createProgramUsingShaders(vertexShaderSource, fragmentShaderSource);
    // TODO: array buffer should have all the tris and the size accordingly should be set based on how many tris there are
    if (triangles) triangles.forEach(triangle => drawTriangle(triangle, program));
}

export const drawEntities = (entities: Entity[], vertexShaderSource: string, fragmentShaderSource: string): void => {
    if (entities) {
        const triangles = entities.map<Triangle>(entity => {
           const points = entity.points;
           const position = entity.transform.position;
            return points.map<Vector3D>(point => ({
                x: point.x + position.x,
                y: point.y + position.y,
                z: point.z + position.z
            })) as Triangle
        });

        drawTriangles(triangles, vertexShaderSource, fragmentShaderSource);
    }
}