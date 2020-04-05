var room;

function init() {
    Janus.init({
        debug: "all",
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
    var session;
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
                                audiobridge.createOffer({
                                    media: {video: false},
                                    success: function (jsep) {
                                        session = jsep;
                                        console.log('Offer created (audio=true)');
                                        audiobridge.send({
                                            message: {request: "configure", muted: true},
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
                        audioElement.volume = 0
                    },
                    oncleanup: function () {
                        console.log("Cleaning up...");
                        recording = false;
                        listening = false;
                    }
                })
        },
        error: console.error,
        destroyed: window.location.reload
    });

    return {
        recordAudio: function () {
            if (!recording) {
                audiobridge.send({
                    message: {
                        request: "configure",
                        muted: false
                    },
                    jsep: session
                });
            }
        },
        listenAudio: function () {
            if (!listening) {
                listening = true;
                var audioElement = getAudioElement();
                audioElement.volume = 1;
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