import {coreConfig} from "../../state/coreConfig";

export const vertexObjectCoordinates = (program: WebGLProgram) => coreConfig.gl().getAttribLocation(program, "a_coordinates");
export const modelViewProjection = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "modelViewProjection");

/*export const translationUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_translation")
export const rotationUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_rotation")
export const scaleUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_scale")*/
export const colorUniformLocation = (program: WebGLProgram) => coreConfig.gl().getUniformLocation(program, "u_color")

export const default2DVertexShaderSource = `#version 300 es

in vec2 a_coordinates;
uniform mat3 modelViewProjection;

void main() { 
    vec3 coordinates = modelViewProjection * vec3(a_coordinates, 1);
    gl_Position = vec4(coordinates.xy, 0, 1);
}
`

export const default2DFragmentShaderSource = `#version 300 es
precision highp float;
 
  uniform vec4 u_color;
  out vec4 fragColor;
 
  void main() {
    fragColor = u_color;
  }
`