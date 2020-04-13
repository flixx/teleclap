import {Janus} from 'janus-gateway';

const server = "https://janus.teleclap.org/janus";
let initialized = false;

export function initTeleClap(listening, recording, deviceId = null) {
    if (!initialized) {
        initialized = true;
        Janus.init(
            {
                debug: "all",
                callback: function () {
                    initTeleClap(listening, recording)
                }
            }
        );
        return
    }

    if (!Janus.isWebrtcSupported()) {
        onError("No WebRTC support... ");
        return;
    }

    var audiobridge = null;
    var roomId = 1234;  // Demo room
    var webrtcUp = false;

    var janus = new Janus({
        server: server,
        success: function () {
            // Attach to AudioBridge plugin
            janus.attach(
                {
                    plugin: "janus.plugin.audiobridge",
                    opaqueId: "audiobridgetest-" + Janus.randomString(12),
                    success: function (pluginHandle) {
                        audiobridge = pluginHandle;
                        audiobridge.send({
                            "message": {
                                "request": "join",
                                "room": roomId,
                                "display": 'teleclapper'
                            }
                        });
                    },
                    error: onError,
                    onmessage: function (msg, jsep) {
                        var event = msg["audiobridge"];
                        if (event !== undefined && event !== null) {
                            if (event === "joined") {
                                if (msg["id"]) {
                                    if (!webrtcUp) {
                                        webrtcUp = true;
                                        let audio;
                                        if (deviceId) {
                                            audio = {deviceId: deviceId}
                                        } else {
                                            audio = true
                                        }
                                        audiobridge.createOffer({
                                            media: {
                                                video: false,
                                                audio: audio
                                            },
                                            success: function (jsep) {
                                                audiobridge.send({
                                                    message: {
                                                        request: "configure",
                                                        muted: !recording
                                                    },
                                                    "jsep": jsep
                                                });
                                                onSuccess(janus)
                                            },
                                            error: onError
                                        });
                                    }
                                }
                            } else if (event === "destroyed") {
                                onError('Room destroyed.')
                            } else if (event === "event") {
                                if (msg["error"] !== undefined && msg["error"] !== null) {
                                    if (msg["error_code"] === 485) {
                                        onError('Room ' + roomId + ' does not exist.')
                                    } else {
                                        onError(msg["error"]);
                                    }
                                    return;
                                }
                            }
                        }
                        if (jsep !== undefined && jsep !== null) {
                            audiobridge.handleRemoteJsep({jsep: jsep});
                        }
                    },
                    onremotestream: function (stream) {
                        if (listening) {
                            Janus.attachMediaStream(getAudioElement(), stream);
                        }
                    },
                    oncleanup: function () {
                        webrtcUp = false;
                    }
                });
        },
        error: onError,
        destroyed: function () {
            onError('Janus destroyed.')
        }
    });
}

function onError(error) {
    console.log('Error!');
    console.log(error);
}

function onSuccess(handle) {
    console.log('Success!');
    console.log(handle);
}

export function getAudioElement() {
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

export function getRecordButton() {
    return document.getElementById('record');
}

export function getListenButton() {
    return document.getElementById('listen');
}
