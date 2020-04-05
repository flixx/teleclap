var room;
var deviceId;

function printAudioInputs() {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
            devices.forEach(function (device) {
                if (device.kind === 'audioinput') {
                    console.log(device.label + " (" + device.deviceId + ")");
                }
            });
        })
}

function init() {
    Janus.init({
        debug: "all",
        callback: function () {
            getRecordButton().addEventListener("click", function () {
                if (room) {
                    room.destroy();
                }
                room = joinRoom(1234, "teleclapper", 'record', deviceId);
            });
            getListenButton().addEventListener("click", function () {
                if (room) {
                    room.destroy();
                }
                room = joinRoom(1234, "teleclapper", 'listen');
            });
        }
    });
}

function joinRoom(roomId, username, mode, deviceId) {
    if (!Janus.isWebrtcSupported()) {
        alert("No WebRTC support!");
        return;
    }
    var audiobridge;
    var session;
    var janus = new Janus({
        server: "https://janus.teleclap.org/janus",
        success: function () {
            janus.attach(
                {
                    plugin: "janus.plugin.audiobridge",
                    opaqueId: "audiobridgetest-" + Janus.randomString(12),
                    success: function (pluginHandle) {
                        console.log('Successfully attached to audiobridge.');
                        audiobridge = pluginHandle;
                        audiobridge.send({
                            message: {
                                request: "join",
                                room: roomId,
                                display: username
                            }
                        });
                    },
                    error: console.log,
                    onmessage: function (msg, jsep) {
                        console.log("Received message:");
                        console.log(msg);
                        var event = msg["audiobridge"];
                        if (event) {
                            if (event === 'joined') {
                                // Successfully joined the room
                                console.log('Successfully joined room ' + roomId);
                                console.log('Participants: ', msg["participants"]);
                                var audio;
                                if (deviceId) {
                                    audio = {audio: {deviceId: deviceId}}
                                } else {
                                    audio = true
                                }
                                audiobridge.createOffer({
                                    media: {video: false, audio: audio},
                                    success: function () {
                                        session = jsep;
                                        console.log('Offer created (audio=true)');
                                        var muted = !(mode === 'record' || mode === 'both');
                                        audiobridge.send({
                                            message: {request: "configure", muted: muted},
                                            jsep: jsep
                                        });
                                    },
                                    error: console.error
                                });
                            } else if (event === "roomchanged") {
                                // The user switched to a different room
                                if (msg['participants']) {
                                    console.log('Participants: ', msg["participants"])
                                }
                            } else if (event === "destroyed") {
                                // The room has beed destroyed
                                window.location.reload();
                            } else if (event === "event") {
                                if (msg["participants"]) {
                                    console.log('Participants: ', msg["participants"])
                                } else if (msg["error"]) {
                                    console.log('Room ' + roomId + 'does not exist!');
                                    audiobridge.destroy();
                                    // TODO: create room and rejoin
                                } else if (msg["leaving"]) {
                                    console.log('Participant left: ' + msg["leaving"])
                                }
                            }
                            if (jsep) {
                                audiobridge.handleRemoteJsep({jsep: jsep});
                            }
                        }
                    },
                    onremotestream: function (stream) {
                        console.log("New remote stream:");
                        console.log(stream);
                        var audioElement = getAudioElement();
                        Janus.attachMediaStream(audioElement, stream);
                        if (mode === 'listen' || mode === 'both') {
                            audioElement.volume = 1
                        } else {
                            audioElement.volume = 0
                        }

                    },
                    oncleanup: function () {
                        console.log("Cleaning up...");
                    }
                })
        },
        error: console.error,
        destroyed: window.location.reload
    });
}

function getAudioElement() {
    var audioElement = document.getElementById('audio');
    if (audioElement) {
        return audioElement;
    }
    var newAudioElement = document.createElement('audio');
    newAudioElement.id = 'audio';
    newAudioElement.autoplay = true;
    document.body.appendChild(newAudioElement);
    return newAudioElement;
}

function getRecordButton() {
    return document.getElementById('record');
}

function getListenButton() {
    return document.getElementById('listen');
}

document.addEventListener("DOMContentLoaded", init);