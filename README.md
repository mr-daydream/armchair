# About

# People

- [Joshua Ziggas](https://goo.gl/FTF4J)
- [Luke Samuels](https://www.linkedin.com/in/lukesamuels)
- [Joshua Skillman](https://www.linkedin.com/pub/joshua-skillman-pe/101/706/417)

### Shoutouts

- [The Delrey School](http://www.delreyschool.org/)
- [Felipe Albertao](https://github.com/felipealbertao)

# Dependencies
- [NodeJS](https://github.com/nodejs/node), a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Lodash](https://github.com/lodash/lodash), A JavaScript utility library delivering consistency, modularity, performance, & extras.
- [MyoJS](https://github.com/logotype/MyoJS.git), Thalmic Labs Myo JavaScript Framework.
- [WebSocket-Node](https://github.com/theturtle32/WebSocket-Node), A WebSocket Implementation for NodeJS.
- [Q](https://github.com/kriskowal/q), A tool for creating and composing asynchronous promises in JavaScript.
- [johnny-five](https://github.com/rwaldron/johnny-five), JavaScript Robotics and IoT programming framework.

# Installation

## Myo Server
- `npm install -g q`
- `npm install -g websocket`
- `./install_server_dependencies.sh`

## Raspberry Pi Client
- `npm install -g websocket`
- `npm install -g johnny-five`

# Usage

## Myo Server
- `node myojs/examples/armchair.js`

## Raspberry Pi Client

- `node armchair_client.js`

## Utility Scripts
Panic button script to stop servos immediately.
- `node stopservos.js`

# Diagrams

## Flow Diagram
![Flow Diagram](https://raw.githubusercontent.com/mr-daydream/armchair/master/flow_diagram.png "Flow Diagram")
