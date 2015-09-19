var app = require('http').createServer(handler)
var io = require('socket.io')(app);
// var five = require("johnny-five");
// var board = new five.Board();

app.listen(80);

function handler(req, res) {
    console.log('Request Handler: ', req, res);
}

io.on('connection', function(socket) {
    console.log('IO On Connection.');
    socket.on('my other event', function(data) {
        console.log(data);
    });
});

// board.on("ready", function() {
//   // Create an Led on pin 13
//   var led = new five.Led(13);
//   // Blink every half second
//   led.blink(500); 
// });