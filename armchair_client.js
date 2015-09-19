// var app = require('http').createServer(handler)
// var five = require("johnny-five");
// var board = new five.Board();

var poseMap = {
    '0': {
        pose: 'POSE_REST'
    }, //POSE_REST
    '1': {
        pose: 'POSE_FIST'
    }, //POSE_FIST
    '2': {
        pose: 'POSE_WAVE_IN'
    }, //POSE_WAVE_IN
    '3': {
        pose: 'POSE_WAVE_OUT'
    }, //POSE_WAVE_OUT
    '4': {
        pose: 'POSE_FINGERS_SPREAD'
    } //POSE_FINGERS_SPREAD
};

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');

    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });

    connection.on('close', function() {
        console.log('Connection Closed');
    });

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        } else {
            console.log('Message received: ', message);
        }
    });
});

client.connect('ws://localhost:8080/', 'echo-protocol', 'http://localhost:8080');

// board.on("ready", function() {
//   // Create an Led on pin 13
//   var led = new five.Led(13);
//   // Blink every half second
//   led.blink(500); 
// });