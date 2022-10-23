import {coreConfig} from "../state/coreConfig";

export const positionAttributeLocation = (program: WebGLProgram) => coreConfig.gl().getAttribLocation(program, "a_position");
export const resolutionUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_resolution")
export const colorUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_color")

export const defaultVertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
uniform vec2 u_resolution;

// all shaders have a main function
void main() {
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`

export const defaultFragmentShaderSource = `#version 300 es
precision highp float;
 
  uniform vec4 u_color;
  out vec4 fragColor;
 
  void main() {
    fragColor = u_color;
  }
`