export interface Config {
    width: number;
    height: number;
}

const canvasElementOrFail = (config: Config, canvasElement: HTMLElement): HTMLCanvasElement => {
    if (canvasElement instanceof HTMLCanvasElement) {
        canvasElement.setAttribute("width", `${config.width}`);
        canvasElement.setAttribute("height", `${config.height}`);
        return canvasElement;
    }
    throw new Error("Invalid SVGElement! Are you passing <canvas>-element?");
}

const elementByIdOrFail = (elementId: string) => {
    const rootElement = document.getElementById(elementId);
    if (rootElement) {
        return rootElement;
    }
    throw new Error(`Failed to find element with ID: ${elementId}`);
}

const config: Config = {
    width: 800,
    height: 600
}

const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {

  // gl_Position is a special variable a vertex shader
  // is responsible for setting
  gl_Position = a_position;
}
`

const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  // Just set the output to a constant redish-purple
  outColor = vec4(1, 0, 0.5, 1);
}
`

const createShader = (gl: WebGL2RenderingContext, type: GLenum, source: string) => {
    const shader = gl.createShader(type);
    if (shader === null) {
        throw new Error("Failed to create a WebGL shader!")
    }
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

const createProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (program === null) {
        throw new Error("Failed to create a WebGL program!")
    }
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

const createProgramUsingShaders = (gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    return createProgram(gl, vertexShader, fragmentShader);
}

const main = () => {
    const canvas = canvasElementOrFail(config, elementByIdOrFail("glCanvas"));
    const gl = canvas.getContext("webgl2");
    if (gl === null) {
        throw new Error("WebGL 2 not available for the browser!")
    }

    const program = createProgramUsingShaders(gl, vertexShaderSource, fragmentShaderSource);
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        0, 0,
        0, 0.5,
        0.7, 0
    ];

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

    gl.viewport(0,0, config.width, config.height);

    gl.clearColor(0,0,0,0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.bindVertexArray(vertexArrayObject);

    const mode = gl.TRIANGLES;
    const drawOffset = 0;
    const count = 3;
    gl.drawArrays(mode, drawOffset, count);
}

main();

