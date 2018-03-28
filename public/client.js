//var COLOUR =  '#505050';  // This is the drawing color
Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    white: "#ffffff",
    yellow: "#ffff00"
};


Colors.random = function() {
    var result;
    var count = 0;
    for (var prop in this.names)
        if (Math.random() < 1/++count)
           result = prop;
    return result;
};


var radius = 3;           // Constant radio for the line
var socket = io();        // websocket to the server
var previousPosition=[0,0]; // previous position to draw a line from
var ctx = Sketch.create(); //Creating the drawing context
var firstMessage=true;    // What the first message, to start on the first value

    ctx.container = document.getElementById('container');
    ctx.autoclear= false; // making sure it stays 
    ctx.retina='auto';
    ctx.setup = function() { console.log( 'setup' );} // Setup all variables
    ctx.keydown= function() { if ( ctx.keys.C ) ctx.clear();} // handeling keydowns

	// Stroke selection
    Stroke = document.getElementById('stroke');
    Stroke.addEventListener("click", function(event){
      event.preventDefault();
      select = document.getElementById("strokeOption");
      console.log(select.value);
      if (select.value == '3') {
        radius = 3;
      }else if (select.value == '15') {
        radius = 15;
      }else if (select.value == '50') {
        radius = 50;
      }else {
        radius = 25;
      }
    });



    socket.on('reset', function() { // on a 'reset' message clean and reste firstMessage
      firstMessage=true;
      ctx.clear();
    });

    socket.on('new-pos', function(newPosition) { // handling new sensor values

      //TODO: Map the incoming 10-bit numbers to the height and width of the screen.
      // See https://github.com/soulwire/sketch.js/wiki/API for sketch references
	newPosition[0] = map(newPosition[0],0,1023,0,ctx.width*.6);
	newPosition[1] = map(newPosition[1],0,1023,0,ctx.height*.6);
      if(firstMessage){ // if its the first message store that value as previous
        firstMessage=false;
        previousPosition=newPosition;
      }else{ // any other message we use to draw.
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.fillStyle = ctx.strokeStyle = Colors.random();
        ctx.lineWidth = radius;
        ctx.beginPath();  //begin a drawing
        ctx.moveTo( previousPosition[0], previousPosition[1] ); // from
        ctx.arc( newPosition[0],  newPosition[1], 10, 0 , PI); // to
        ctx.stroke(); // and only draw a stroke
        previousPosition=newPosition; // update to the new position.
       }
    });
