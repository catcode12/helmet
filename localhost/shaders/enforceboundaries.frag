//sets the velocities at the boundary cells

precision highp float;

varying vec2 v_coordinates;

uniform float xstretch;

uniform float zstretch;

uniform sampler2D u_velocityTexture;

uniform vec3 u_gridResolution;

void main () {
    vec3 velocity = texture2D(u_velocityTexture, v_coordinates).rgb;
    vec3 cellIndex = floor(get3DFragCoord(u_gridResolution + 1.0));


//    const PGRX = u_gridResolution.x/2.0 //partial grid resolution
//    const PGRZ = u_gridResolution.z/2.0 //partial grid resolution
//    const cellX = cellIndex.x
//    const cellZ = cellIndex.z
//    const xpowabs = pow(abs(PGRX - cellX),2.0)
//    const zpowabs = pow(abs((PGRZ)-cellZ),2.0)

    if(sqrt((xstretch*pow(abs((u_gridResolution.x/2.0)-cellIndex.x),2.0))+(zstretch*pow(abs((u_gridResolution.z/2.0)-cellIndex.z),2.0))) > 8.0){
    //      velocity.x = 0.0; //-1.0xstretch*pow(abs((u_gridResolution.x/2.0)-cellIndex.x);
    //      velocity.z = 0.0;
    }
    if (cellIndex.x < 0.5) {
        velocity.x = 0.0;
    }

    if (cellIndex.x > u_gridResolution.x - 0.5) {
        velocity.x = 0.0;
    }

    if (cellIndex.y < 0.5) {
        velocity.y = 0.0;
    }

    if (cellIndex.y > u_gridResolution.y - 0.5) {
        velocity.y = min(velocity.y, 0.0);
    }

    if (cellIndex.z < 0.5) {
        velocity.z = 0.0;
    }

    if (cellIndex.z > u_gridResolution.z - 0.5) {
        velocity.z = 0.0;
    }

    gl_FragColor = vec4(velocity, 0.0);
}
