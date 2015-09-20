var five = require("johnny-five");
var board = new five.Board();
var _ = require('lodash');
var pivotServo, forwardServo, isReady = false;

var moveLeft = function() {
    console.log('Move Left');
    // if (forwardServo && forwardServo.isMoving) {
    //     stop(forwardServo);
    // }
    stop();
    pivotServo.min();
};

var moveRight = function() {
    console.log('Move Right');
    // if (forwardServo && forwardServo.isMoving) {
    //     stop(forwardServo);
    // }
    stop();
    pivotServo.max();
};


var moveForward = function() {
    console.log('Move Right');
    // if (pivotServo && pivotServo.isMoving) {
    //     stop(pivotServo);
    // }
    stop();
    forwardServo.min()
};

var moveBackward = function() {
    console.log('Stop from moveBackward');
    // if (pivotServo && pivotServo.isMoving) {
    //     stop(pivotServo);
    // }
    stop();
    forwardServo.max();
};

var stop = function() {
    console.log('Stop');
    console.log('forwardServo: ', forwardServo);
    console.log('pivotServo: ', pivotServo);
    if (forwardServo) {
        forwardServo.stop();
    }
    if (pivotServo) {
        pivotServo.stop();
    }
    setTimeout(function() {}, 500);
};


var strikeAPose = {
    '0': stop, //POSE_REST
    '1': moveForward, //POSE_FIST
    '2': moveLeft, //POSE_WAVE_IN
    '3': moveRight, //POSE_WAVE_OUT
    '4': stop //POSE_FINGERS_SPREAD
};

var pose = _.debounce(function(p) {
    strikeAPose[p]();
}, 1000);

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
        if (isReady && message.type === 'utf8' && strikeAPose[message.utf8Data]) {
            console.log("Received: '" + message.utf8Data + "'");
            pose(message.utf8Data);
        } else {
            console.log('Non UTF8 Message received: ', message);
        }
    });
});

board.on("ready", function() {
    pivotServo = new five.Servo({
        pin: 10,
        range: [0, 180],
        startAt: 90
    });

    forwardServo = new five.Servo({
        pin: 11,
        range: [0, 180],
        startAt: 90
    });

    isReady = true;
});

client.connect('ws://192.168.1.157:8080/', 'echo-protocol', 'http://192.168.1.157:8080');