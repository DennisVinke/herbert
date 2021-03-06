/**
 * Protube pin
 * Provides socket.io endpoint for receiving Protube pins.
 * @module protube_screen
 */

var protube = require('../../moduleLoader').loaded.protube;

var ee = require('../../events');

var io = require('../../io').socketio;
var nsp = io.of('/protube-pin');

nsp.on("connection", function(socket) {
    if(socket.request.connection.remoteAddress != process.env.PIN_IP) socket.disconnect();
    socket.emit("pin", protube.getPin());
});

ee.on('pinChange', function(data) {
    nsp.emit("pin", data);
});