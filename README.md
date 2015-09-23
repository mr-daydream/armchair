# About
The armchair project introduces a wireless interface to control a motorized wheelchair. Custom computer software interprets hand gestures from a Myo Gesture Control Armband, sends the wireless commands to a Raspberry Pi mounted on the wheelchair, which in turn sends commands to an Arduino to operate one of two servos mounted next to the wheelchair's controller.

Our inspiration for this project came from a desire to do a hack that would have a humanitarian element. One of our members had a contact at The Delrey School who was able to lend us an electric wheelchair. Josh Z. and Luke met on the Hack-A-Thon’s “Find a group” channel. Josh S. joined to offer his experience with hardware hacking and electronics.

Armchair removes the requirement that the driver of an electric wheelchair be able to manipulate the control stick (or even be sitting in the chair at all). Using Armchair, a disabled person who has limited limb movement, shortened arms, or even one who is missing a hand entirely can still control their wheelchair with simple arm motions and muscle contractions.

We are pleased to announce that Armchair has won the award for Best Wearable Technology by a group at the 2015 Baltimore Hackathon
- [Article on technical.ly about Project Armchair](http://technical.ly/baltimore/2015/09/22/7-prizewinners-baltimore-hackathon/)

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
