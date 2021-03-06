/**
 * Petra
 * Provides communication with Petra screens.
 * @module petra
 */

var ee = require('../../events');

var io = require('../../io').socketio;
var nsp = io.of('/petra');

var protube = require('../../moduleLoader').loaded.protube;

var windowDefinitions = function() {
    return [{
            "name": "protube",
            "displayNumber": 0,
            "url": (protube.status.protubeOn ? "https://www.saproto.nl/protube/screen" : "https://www.saproto.nl/protube/offline")
        },
        {
            "name": "smartxp",
            "displayNumber": 3,
            "url": "https://www.saproto.nl/smartxp"
        },
        {
            "name": "narrowcasting",
            "displayNumber": 1,
            "url": "https://www.saproto.nl/narrowcasting"
        }];
};

nsp.on("connection", function(socket) {
    console.log("[petra] petra connected");

    socket.emit("loadPages", windowDefinitions());

    socket.on("get-window-definitions", function(data) {
        socket.emit("loadPages", windowDefinitions());
    });
});

ee.on("soundboard", function(data) {
    console.log("[petra] requesting soundboard sound", data);
    nsp.emit("soundboard", data);
});

ee.on("petraReload", function() {
    console.log("[petra] requesting reload");
    nsp.emit("loadPages", windowDefinitions());
});