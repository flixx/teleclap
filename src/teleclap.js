import {Janus} from 'janus-gateway';
import utils from './utils'

const server = "https://janus.teleclap.org/janus";
let initialized = false;

export function initTeleClap(listening, recording, roomName, deviceId, successHandler, errorHandler) {
    if (!initialized) {
        initialized = true;
        Janus.init(
            {
                debug: "all",
                callback: function () {
                    initTeleClap(listening, recording, roomName, deviceId, successHandler, errorHandler)
                }
            }
        );
        return
    }

    function onError(error) {
        if (errorHandler) {
            errorHandler(error)
        } else {
            console.error('Error:');
            console.error(error);
        }
    }

    function onSuccess(handle) {
        if (successHandler) {
            successHandler(handle)
        } else {
            console.log('Success!');
        }
    }

    if (!Janus.isWebrtcSupported()) {
        onError("No WebRTC support... ");
        return;
    }

    var audiobridge = null;
    var webrtcUp = false;
    var roomId = utils.hashCode(roomName);

    var janus = new Janus({
        server: server,
        success: function () {
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
                                        onError('Room ' + roomId + ' does not exist.');
                                        audiobridge.send({
                                            "message": {
                                                "request": "create",
                                                "room": roomId,
                                            }
                                        });
                                        audiobridge.send({
                                            "message": {
                                                "request": "join",
                                                "room": roomId,
                                                "display": 'teleclapper'
                                            }
                                        });
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
                });
        },
        error: onError,
    });
}

export function getAudioElement() {
    let audioElement = document.getElementById('audio');
    if (audioElement) {
        return audioElement;
    }
    let newAudioElement = document.createElement('audio');
    newAudioElement.id = 'audio';
    newAudioElement.autoplay = true;
    document.body.appendChild(newAudioElement);
    return newAudioElement;
}
