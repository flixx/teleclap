var room;

function init() {
    Janus.init({
        debug: true,
        callback: function () {
            room = joinRoom(1234, "teleclapper");
            getRecordButton().addEventListener("click", room.recordAudio);
            getListenButton().addEventListener("click", room.listenAudio);
        }
    });
}

function joinRoom(roomId, username) {
    if (!Janus.isWebrtcSupported()) {
        alert("No WebRTC support!");
        return;
    }
    var audiobridge;
    var audioStream;
    var recording = false;
    var listening = false;

    var janus = new Janus({
        server: "https://janus.teleclap.org/janus",
        success: function () {
            janus.attach(
                {
                    plugin: "janus.plugin.audiobridge",
                    opaqueId: "audiobridgetest-" + Janus.randomString(12),
                    success: function (pluginHandle) {
                        Janus.debug('Successfully attached to audiobridge.');
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
                        Janus.debug("Received message:");
                        Janus.debug(msg);
                        var event = msg["audiobridge"];
                        if (event) {
                            if (event === 'joined') {
                                // Successfully joined the room
                                Janus.debug('Successfully joined room ' + roomId);
                                Janus.debug('Participants: ', msg["participants"])
                            } else if (event === "roomchanged") {
                                // The user switched to a different room
                                if (msg['participants']) {
                                    Janus.debug('Participants: ', msg["participants"])
                                }
                            } else if (event === "destroyed") {
                                // The room has beed destroyed
                                window.location.reload();
                            } else if (event === "event") {
                                if (msg["participants"]) {
                                    Janus.debug('Participants: ', msg["participants"])
                                } else if (msg["error"]) {
                                    Janus.error('Room ' + roomId + 'does not exist!');
                                    audiobridge.destroy();
                                    // TODO: create room and rejoin
                                } else if (msg["leaving"]) {
                                    Janus.debug('Participant left: ' + msg["leaving"])
                                }
                            }
                            if (jsep) {
                                audiobridge.handleRemoteJsep({
                                    jsep: jsep
                                });
                            }
                        }
                    },
                    onremotestream: function (stream) {
                        Janus.debug("New local stream:");
                        Janus.debug(stream);
                        audioStream = stream;
                    },
                    oncleanup: function () {
                        Janus.debug("Cleaning up...");
                        recording = false;
                        listending = false;
                    }
                })
        },
        error: Janus.error,
        destroyed: window.location.reload
    });

    return {
        recordAudio: function () {
            if (!recording) {
                recording = true;
                audiobridge.createOffer({
                    media: {video: false},
                    success: function (jsep) {
                        audiobridge.send({
                            message: {
                                request: "configure",
                                muted: false
                            },
                            jsep: jsep
                        });
                    },
                    error: Janus.error
                });
            }
        },
        listenAudio: function () {
            if (!listening) {
                listening = true;
                Janus.attachMediaStream(getAudioElement(), audioStream);
            }
        }
    };
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