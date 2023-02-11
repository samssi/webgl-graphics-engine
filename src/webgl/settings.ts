import {coreConfig} from "../state/coreConfig";

export interface VertexAttribPointer {
    size: number,
    type: GLenum,
    normalize: boolean,
    stride: number,
    offset: number
}

export interface DrawArraysSettings {
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

