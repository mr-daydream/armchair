var five = require("johnny-five");
var board = new five.Board();
var _ = require('lodash');
var pivotServo, forwardServo, isReady = false;

var moveLeft = function() {
    console.log('Move Left');
    stop();
    var timer = true;
    var moveLeftInterval = setInterval(function() {
        if (timer) {
            pivotServo.jz_direction = 'left';
            forwardServo.jz_direction === 'forward' ? forwardServo.cw(0.9) : forwardServo.ccw(0.9);
            forwardServo.jz_direction = 'stop';
            stop();
            timer = false;
        } else {
            clearInterval(moveLeftInterval);
        }
    }, 400);
    setTimeout(function() {
        pivotServo.jz_direction = 'left';
        pivotServo.cw(0.5);
    }, 700);
};

var moveRight = function() {
    console.log('Move Right');
    stop();
    var timer = true;
    var moveRightInterval = setInterval(function() {
        if (timer) {
            pivotServo.jz_direction = 'right';
            forwardServo.jz_direction === 'forward' ? forwardServo.cw(0.9) : forwardServo.ccw(0.9);
            forwardServo.jz_direction = 'stop';
            stop();
            timer = false;
        } else {
            clearInterval(moveRightInterval);
        }
    }, 400);
    setTimeout(function() {
        pivotServo.jz_direction = 'right';
        pivotServo.ccw(0.5);
    }, 700);
};


var moveForward = function() {
    console.log('Move Forward');
    stop();
    var timer = true;
    var moveForwardInterval = setInterval(function() {
        if (timer) {
            forwardServo.jz_direction = 'forward';
            pivotServo.jz_direction === 'right' ? pivotServo.cw(0.9) : pivotServo.ccw(0.9);
            pivotServo.jz_direction === 'stop';
            stop();
            timer = false;
        } else {
            clearInterval(moveForwardInterval);
        }
    }, 400);
    setTimeout(function() {
        forwardServo.ccw(0.5)
    }, 700);
};

var moveBackward = function() {
    console.log('Move Back');
    stop();
    var timer = true;
    var moveBackwardInterval = setInterval(function() {
        if (timer) {
            forwardServo.jz_direction = 'back';
            pivotServo.jz_direction === 'right' ? pivotServo.cw(0.9) : pivotServo.ccw(0.9);
            pivotServo.jz_direction === 'stop';
            stop();
            timer = false;
        } else {
            clearInterval(moveBackwardInterval);
        }
    }, 400);
    setTimeout(function() {
        forwardServo.cw(0.6)
    }, 700);
};

var stop = function() {
    console.log('Stop');
    if (forwardServo) {
        forwardServo.stop();
        forwardServo = null;
        forwardServo = new five.Servo.Continuous(11).stop();
    }

    if (pivotServo) {
        pivotServo.stop();
        pivotServo = null;
        pivotServo = new five.Servo.Continuous(10).stop();
    }
};


var strikeAPose = {
    '0': function() {}, //POSE_REST
    '1': moveForward, //POSE_FIST
    '2': moveLeft, //POSE_WAVE_IN
    '3': moveRight, //POSE_WAVE_OUT
    '4': moveBackward //POSE_FINGERS_SPREAD
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