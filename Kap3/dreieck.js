var gl;
var points;


window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }

    var size = 0.5;
    var anchorX = -0.5;
    var anchorY = +0.5;
    
    // Four Vertices
    var vertices = [
        -0.7,-0.1,0,
        -0.3,0.6,0,
        -0.3,-0.3,0,
        0.2,0.6,0,
        0.3,-0.3,0,
        0.7,0.6,0
    ]

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
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    //gl.drawArrays( gl.TRIANGLES, 0, 6 );
    //gl.drawArrays( gl.TRIANGLE_STRIP, 0, 6 );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 6 );
}