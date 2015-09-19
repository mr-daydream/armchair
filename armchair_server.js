var WebSocketServer = require('websocket').server;
var http = require('http');
var MyoJS = require('./../index');
var Q = require('q');

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

var hub = new Myo.Hub(),
    type = null,
    checkConnection;

hub.on('ready', function() {
    console.log('hub ready');
});

hub.on('connect', function() {
    console.log('hub connected');
});

hub.on('disconnect', function() {
    console.log('hub disconnect');
});

var server = http.createServer(function(request, response) {
    console.log('HTTP request received for ' + request.url);
    response.writeHead(404);
    response.end();
});


var wsServer;

var connection;
var connectionDeferred = Q.defer();
var connectionPromise = connectionDeferred.promise;

var onFrame = function(frame) {
    if (frame && frame.pose && frame.pose.type !== type) {
        console.log('pose: ', frame.pose.toString());
        type = frame.pose.type;
        // Send WS
        console.log('test1', type);
        if (connection && type) {
            connection.sendUTF(type);
        }
        console.log('test2');
    }
};

connectionPromise.then(function(connection) {
    console.log('Connection Resolved.');

    hub.on('frame', onFrame);

    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + 'WS Peer ' + connection.remoteAddress + ' disconnected.');
    });
});

server.listen(8080, function() {
    console.log('HTTP Server is listening on port 8080');
});

var count = 0;
var myoDeferred = Q.defer();
var myoPromise = myoDeferred.promise;

checkConnection = setInterval(function() {
    if (hub.connection.connected) {
        console.log('Connected to myo.');
        clearInterval(checkConnection);
        myoDeferred.resolve();
    } else {
        if (count < 1) {
            console.log('Waiting for connection...');
            count += 1;
        }
    }
}, 1000);

myoPromise.then(function() {
    console.log('myoPromise resolved.');

    wsServer = new WebSocketServer({
        httpServer: server,
        // You should not use autoAcceptConnections for production
        // applications, as it defeats all standard cross-origin protection
        // facilities built into the protocol and the browser.  You should
        // *always* verify the connection's origin and decide whether or not
        // to accept it.
        autoAcceptConnections: false
    });

    wsServer.on('request', function(request) {
        console.log('WS Connection accepted.');

        connection = request.accept('echo-protocol', request.origin);
        connectionDeferred.resolve(connection);
    });

});