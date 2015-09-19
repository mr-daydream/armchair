var five = require("johnny-five");
var board = new five.Board();
var pivotServo, forwardServo, isReady = false;

var moveLeft = function() {
    if (forwardServo.isMoving) {
        stop(forwardServo);
    }
    // Move pivotServo left
};

var moveRight = function() {
    if (forwardServo.isMoving) {
        stop(forwardServo);
    }
    // Move pivotServo left
};


var moveForward = function() {
    if (pivotServo.isMoving) {
        stop(pivotServo);
    }
    // Move forwardServo forward
};

var moveBackward = function() {
    if (pivotServo.isMoving) {
        stop(pivotServo);
    }
    // Move forwardServo backward
};

var stop = function(servo) {
    if (servo) {
        servo.stop();
    } else {
        forwardServo.stop();
        pivotServo.stop();
    }
    setTimeout(function() {}, 500);
};


var strikeAPose = {
    '0': stop, //POSE_REST
    '1': moveForward, //POSE_FIST
    '2': moveLeft, //POSE_WAVE_IN
    '3': moveRight, //POSE_WAVE_OUT
    '4': moveBackward //POSE_FINGERS_SPREAD
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
        if (isReady && message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
            strikeAPose[message.utf8Data]();
        } else {
            console.log('Non UTF8 Message received: ', message);
        }
    });
});

board.on("ready", function() {
    pivotServo = new five.Servo() {
        pin: 10,
        range: [0, 180],
        startAt: 90
    };

    forwardServo = new five.Servo() {
        pin: 11,
        range: [0, 180],
        startAt: 90
    }

    isReady = true;
});

client.connect('ws://localhost:8080/', 'echo-protocol', 'http://localhost:8080');