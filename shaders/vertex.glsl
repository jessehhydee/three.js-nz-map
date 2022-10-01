#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform float u_mouseDown;
uniform float u_mouseUp;

vec3 exx(vec3 newPosition, vec3 fixedPosition) {
  if(u_mouseDown > 0.0 && u_mouseUp > 0.0 && sin(u_time) < -1.0) return newPosition.xyz = fixedPosition.xyz;
  else if(u_mouseDown > 0.0) return newPosition.xyz = newPosition.xyz + sin(u_time);
  else return newPosition.xyz = fixedPosition.xyz;
}

void main() {

  vec3 newPosition    = position;
  vec3 fixedPosition  = position;
  vec3 pos = exx(newPosition, fixedPosition);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}