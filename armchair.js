// var app = require('http').createServer(handler)
// var io = require('socket.io')(app);
// var five = require("johnny-five");
// var board = new five.Board();
// var express = require('express');
// var app = express();
// var http = require('http').Server(app);
// app.listen(8080);

// app.post('/pose', function(req, res) {
//     console.log('req', req.body);
//     // console.log('res', res);
// });

// var WebSocketClient = require('websocket').client;

// var client = new WebSocketClient();

// client.on('connectFailed', function(error) {
//     console.log('Connect Error: ' + error.toString());
// });

// client.on('connect', function(connection) {
//     console.log('WebSocket Client Connected');

//     connection.on('error', function(error) {
//         console.log("Connection Error: " + error.toString());
//     });

//     connection.on('close', function() {
//         console.log('Connection Closed');
//     });

//     connection.on('message', function(message) {
//         if (message.type === 'utf8') {
//             console.log("Received: '" + message.utf8Data + "'");
//         } else {
//             console.log('Message received: ', message);
//         }
//     });

//     function sendNumber() {
//         if (connection.connected) {
//             var number = Math.round(Math.random() * 0xFFFFFF);
//             connection.sendUTF(number.toString());
//         }
//     }
//     sendNumber();
// });

// client.connect('ws://localhost:8888/ws', null, 'http://localhost:8888');

// board.on("ready", function() {
//   // Create an Led on pin 13
//   var led = new five.Led(13);
//   // Blink every half second
//   led.blink(500); 
// });
var fs = require("fs");
var message = {
    pose: null
};
var newMessage;
setInterval(function() {
    fs.readFile('./PyoConnect_v2.0/scripts/armchair.txt', 'utf8', function(err, data) {
        if (err) {
            console.log('Error: ', err);
        }
        console.log('Data: ', data);
        // newMessage = JSON.parse(data);
        // if (newMessage.pose !== message.pose) {
        //   message = newMessage;
        // }
    })
}, 15)