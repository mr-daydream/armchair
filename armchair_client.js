var five = require("johnny-five");
var board = new five.Board();
var _ = require('lodash');
var pivotServo, forwardServo, isReady = false;

var moveLeft = function() {
    console.log('Move Left');
    stop();
    var moveLeftInterval = setInterval(function() {
        if (timer) {
            pivotServo.jz_direction = 'left';
            pivotServo.ccw(0.4);
            timer = false;
        } else {
            clearInterval(moveLeftInterval);
        }
    }, 200);
    setTimeout(function() {
        pivotServo.jz_direction = 'left';
        pivotServo.cw(0.5);
    }, 500);
};

var moveRight = function() {
    console.log('Move Right');
    stop();
    var timer = true;
    var moveRightInterval = setInterval(function() {
        if (timer) {
            pivotServo.jz_direction = 'right';
            pivotServo.cw(0.4);
            timer = false;
        } else {
            clearInterval(moveRightInterval);
        }
    }, 200);
    setTimeout(function() {
        pivotServo.jz_direction = 'right';
        pivotServo.ccw(0.5);
    }, 500);
};


var moveForward = function() {
    console.log('Move Right');
    stop();
    var timer = true;
    var moveForwardInterval = setInterval(function() {
        if (timer) {
            forwardServo.jz_direction = 'forward';
            forwardServo.cw(0.4);
            timer = false;
        } else {
            clearInterval(moveForwardInterval);
        }
    }, 200);
    setTimeout(function() {
        forwardServo.ccw(0.5)
    }, 500);
};

var moveBackward = function() {
    console.log('Stop from moveBackward');
    stop();
};

var stop = function() {
    console.log('Stop');
    if (forwardServo) {
        //forwardServo.stop();
        console.log('forwardServo pin: ', forwardServo.pin);
        forwardServo.pin(1);
        forwardServo = null;
        console.log('forwardServo pin again: ', forwardServo.pin);
        forwardServo = new five.Servo.Continuous(11).stop();
    }

    if (pivotServo) {
        // pivotServo.stop();
        console.log('pivotServo pin: ', pivotServo.pin);
        pivotServo.pin(1);
        pivotServo = null;
        console.log('pivotServo pin again: ', pivotServo.pin);
        pivotServo = new five.Servo.Continuous(10).stop();
    }
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
            if (message.utf8Data)
                pose(message.utf8Data);
        } else {
            console.log('Non UTF8 Message received: ', message);
        }
    });
});

board.on("ready", function() {
    pivotServo = new five.Servo({
        pin: 10,
        type: 'continuous'
    });

    forwardServo = new five.Servo({
        pin: 11,
        type: 'continuous'
    });

    isReady = true;
});

client.connect('ws://192.168.1.157:8080/', 'echo-protocol', 'http://192.168.1.157:8080');