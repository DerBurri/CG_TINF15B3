var gl;
var points;
var program;

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

function createCircularPoints(radius) {
    var degree;
    var vertices = [];
    for (i = 0; i < 36; i++) {
        degree = i * 10;
        vertices.push( radius * Math.cos(toRadians(degree)) );
        vertices.push( radius * Math.sin(toRadians(degree)) );
    }
    return vertices
}

function sendData(inputData, pointSize) {
    // Load the data into the GPU
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData(gl.ARRAY_BUFFER,
                  flatten(inputData),
                  gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var locPointSize = gl.getUniformLocation(program, 'pointSize');
    //gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniform1f(locPointSize, pointSize);
}

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    // Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    var vertices = createCircularPoints(0.2);
    sendData(vertices, 2.0);
    render();
    
    var vertices = createCircularPoints(0.4);
    sendData(vertices, 4.0);
    render();
    
    var vertices = createCircularPoints(0.6);
    sendData(vertices, 6.0);
    render();
    
    var vertices = createCircularPoints(0.8);
    sendData(vertices, 8.0);
    render();
};

function render() {
    //gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.POINTS, 0, 36 );
}