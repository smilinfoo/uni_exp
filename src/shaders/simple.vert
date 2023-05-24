#version 300 es

in vec4 a_position;

uniform vec4 u_color;
uniform mat4 u_mat;

out vec4 v_color;

void main() {

  gl_Position = u_mat * a_position;
  v_color = u_color;
  
}