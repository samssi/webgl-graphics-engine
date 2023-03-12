import {coreConfig} from "../../state/coreConfig";

export const vertexObjectCoordinates = (program: WebGLProgram) => coreConfig.gl().getAttribLocation(program, "a_position");
export const modelViewProjection = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_matrix");
export const colorCoordinates = (program: WebGLProgram) => coreConfig.gl().getAttribLocation(program, "a_color");

export const default3DVertexShaderSource = `#version 300 es
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_matrix;

out vec4 v_color;

void main() { 
    gl_Position = u_matrix * a_position;
    
    v_color = a_color;
}
`

export const default3DFragmentShaderSource = `#version 300 es
  precision mediump float;
 
  in vec4 v_color;
  out vec4 fragColor;
 
  void main() {
    fragColor = v_color;
  }
`