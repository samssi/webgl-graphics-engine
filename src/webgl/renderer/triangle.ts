import {createProgramUsingShaders} from "../webgl";
import {applicationState} from "../state";
import {defaultFragmentShaderSource, defaultVertexShaderSource} from "./default";

export const drawTriangleOld = (positions: number[]) => {
    const gl = applicationState.gl();

    const program = createProgramUsingShaders(gl, defaultVertexShaderSource, defaultFragmentShaderSource);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const vertexArrayObject = gl.createVertexArray();

    gl.bindVertexArray(vertexArrayObject);
    gl.enableVertexAttribArray(positionAttributeLocation);

    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;

    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize,stride, offset);

    gl.viewport(0,0, applicationState.canvasConfig().width, applicationState.canvasConfig().height);
    gl.useProgram(program);
    gl.bindVertexArray(vertexArrayObject);

    const mode = gl.TRIANGLES;
    const drawOffset = 0;
    const count = 3;
    gl.drawArrays(mode, drawOffset, count);
}