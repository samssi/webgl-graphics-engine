import {coreConfig} from "../../state/coreConfig";

export const vertexObjectCoordinates = (program: WebGLProgram) => coreConfig.gl().getAttribLocation(program, "a_position");
export const modelViewProjection = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_matrix");
export const colorUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_color")


export const default3DVertexShaderSource = `#version 300 es
in vec4 a_position;
uniform mat4 u_matrix;

void main() { 
    gl_Position = u_matrix * a_position;
}
`

export const default3DFragmentShaderSource = `#version 300 es
  precision highp float;
 
  uniform vec4 u_color;
  out vec4 fragColor;
 
  void main() {
    fragColor = u_color;
  }
`