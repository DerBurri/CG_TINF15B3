var gl;
var points;


window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }

    // Four Vertices
    //var vertices = [
    //    vec2( -0.0, -0.5),
    //    vec2( -0.5, 0.5 ),
    //    vec2( 0.5, 0.5 ),
    //    vec2( 0.5, -0.5)
    //];
    
    var vertices = [0.5,  0.5, /* p2 */
                    -0.5, 0.5, /* p1 */
                    0.5,  -0.5]; /* p4 */
    
    
    // Two triangles
    var vertices = new Float32Array([
        // Triangle 1 vertices:
        0.0,  0.5, 0.0,          // Vertex A (x,y,z)
       -0.5, -0.5, 0.0,          // Vertex B (x,y,z)
        0.5, -0.5, 0.0,          // Vertex C (x,y,z)

        // Triangle 2 vertices:
        0.05 + 0.0,  0.75, 0.0,  // Vertex A (x,y,z)
        0.75 - 0.5, -0.75, 0.0,  // Vertex B (x,y,z)
        0.15 + 0.5, -0.75, 0.0,  // Vertex C (x,y,z)
    ]);
    
    // Two triangles
    var vertices = new Float32Array([
        // Triangle 1 vertices:
        -1.0,  -1.0,          // Vertex A (x,y,z)
       -1.0, 1.0,          // Vertex B (x,y,z)
        1.0, 1.0,          // Vertex C (x,y,z)

        // Triangle 2 vertices:
        -1.0,  -1.0,  // Vertex A (x,y,z)
        1.0, 1.0,  // Vertex B (x,y,z)
        1.0, -1.0,  // Vertex C (x,y,z)
    ]);


    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    // Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,
                  flatten(vertices),
                  gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    
    //gl.drawArrays(gl.TRIANGLES, 6, 3);
    //gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}