var deviceId = null;
var server = "https://janus.teleclap.org/janus";
var initialized = false;

function initTeleClap(listening, recording) {
    if (!initialized) {
        initialized = true;
        Janus.init({
            debug: "all",
            callback: function () {
                initTeleClap(listening, recording)
            }
        });
        return
    }

    // Make sure the browser supports WebRTC
    if (!Janus.isWebrtcSupported()) {
        alert("No WebRTC support... ");
        return;
    }

    var mixertest = null;
    var opaqueId = "audiobridgetest-" + Janus.randomString(12);
    var myroom = 1234; // Demo room
    var myusername = null;
    var myid = null;
    var webrtcUp = false;
    var audioenabled = false;

    var janus = new Janus({
        server: server,
        success: function () {
            // Attach to AudioBridge plugin
            janus.attach({
                plugin: "janus.plugin.audiobridge",
                opaqueId: opaqueId,
                success: function (pluginHandle) {
                    $('#details').remove();
                    mixertest = pluginHandle;
                    Janus.log("Plugin attached! (" + mixertest.getPlugin() + ", id=" + mixertest.getId() + ")");
                    $('#start').removeAttr('disabled').html("Stop")
                        .click(function () {
                            $(this).attr('disabled', true);
                            janus.destroy();
                        });
                    pluginHandle.send({
                        "message": {
                            "request": "join",
                            "room": myroom,
                            "display": 'teleclapper'
                        }
                    });
                },
                error: function (error) {
                    Janus.error("  -- Error attaching plugin...", error);
                    bootbox.alert("Error attaching plugin... " + error);
                },
                consentDialog: function (on) {
                    Janus.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
                    if (on) {
                        // Darken screen and show hint
                        $.blockUI({
                            message: '<div><img src="up_arrow.png"/></div>',
                            css: {
                                border: 'none',
                                padding: '15px',
                                backgroundColor: 'transparent',
                                color: '#aaa',
                                top: '10px',
                                left: (navigator.mozGetUserMedia ? '-100px' : '300px')
                            }
                        });
                    } else {
                        // Restore screen
                        $.unblockUI();
                    }
                },
                onmessage: function (msg, jsep) {
                    Janus.debug(" ::: Got a message :::");
                    Janus.debug(msg);
                    var event = msg["audiobridge"];
                    Janus.debug("Event: " + event);
                    if (event != undefined && event != null) {
                        if (event === "joined") {
                            // Successfully joined, negotiate WebRTC now
                            if (msg["id"]) {
                                myid = msg["id"];
                                Janus.log("Successfully joined room " + msg["room"] + " with ID " + myid);
                                if (!webrtcUp) {
                                    webrtcUp = true;
                                    // Publish our stream
                                    var audio;
                                    if (deviceId) {
                                        audio = {
                                            deviceId: deviceId
                                        }
                                    } else {
                                        audio = true
                                    }
                                    mixertest.createOffer({
                                        media: {
                                            video: false,
                                            audio: audio
                                        }, // This is an audio only room
                                        success: function (jsep) {
                                            Janus.debug("Got SDP!");
                                            Janus.debug(jsep);
                                            var publish = {
                                                "request": "configure",
                                                "muted": !recording
                                            };
                                            mixertest.send({
                                                "message": publish,
                                                "jsep": jsep
                                            });
                                        },
                                        error: function (error) {
                                            Janus.error("WebRTC error:", error);
                                            bootbox.alert("WebRTC error... " + JSON.stringify(error));
                                        }
                                    });
                                }
                            }
                            // Any room participant?
                            if (msg["participants"] !== undefined && msg["participants"] !== null) {
                                var list = msg["participants"];
                                Janus.debug("Got a list of participants:");
                                Janus.debug(list);
                                for (var f in list) {
                                    var id = list[f]["id"];
                                    var display = list[f]["display"];
                                    var setup = list[f]["setup"];
                                    var muted = list[f]["muted"];
                                    Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                    if ($('#rp' + id).length === 0) {
                                        // Add to the participants list
                                        $('#list').append('<li id="rp' + id + '" class="list-group-item">' + display +
                                            ' <i class="absetup fa fa-chain-broken"></i>' +
                                            ' <i class="abmuted fa fa-microphone-slash"></i></li>');
                                        $('#rp' + id + ' > i').hide();
                                    }
                                    if (muted === true || muted === "true")
                                        $('#rp' + id + ' > i.abmuted').removeClass('hide').show();
                                    else
                                        $('#rp' + id + ' > i.abmuted').hide();
                                    if (setup === true || setup === "true")
                                        $('#rp' + id + ' > i.absetup').hide();
                                    else
                                        $('#rp' + id + ' > i.absetup').removeClass('hide').show();
                                }
                            }
                        } else if (event === "roomchanged") {
                            // The user switched to a different room
                            myid = msg["id"];
                            Janus.log("Moved to room " + msg["room"] + ", new ID: " + myid);
                            // Any room participant?
                            $('#list').empty();
                            if (msg["participants"] !== undefined && msg["participants"] !== null) {
                                var list = msg["participants"];
                                Janus.debug("Got a list of participants:");
                                Janus.debug(list);
                                for (var f in list) {
                                    var id = list[f]["id"];
                                    var display = list[f]["display"];
                                    var setup = list[f]["setup"];
                                    var muted = list[f]["muted"];
                                    Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                    if ($('#rp' + id).length === 0) {
                                        // Add to the participants list
                                        $('#list').append('<li id="rp' + id + '" class="list-group-item">' + display +
                                            ' <i class="absetup fa fa-chain-broken"></i>' +
                                            ' <i class="abmuted fa fa-microphone-slash"></i></li>');
                                        $('#rp' + id + ' > i').hide();
                                    }
                                    if (muted === true || muted === "true")
                                        $('#rp' + id + ' > i.abmuted').removeClass('hide').show();
                                    else
                                        $('#rp' + id + ' > i.abmuted').hide();
                                    if (setup === true || setup === "true")
                                        $('#rp' + id + ' > i.absetup').hide();
                                    else
                                        $('#rp' + id + ' > i.absetup').removeClass('hide').show();
                                }
                            }
                        } else if (event === "destroyed") {
                            // The room has been destroyed
                            Janus.warn("The room has been destroyed!");
                            bootbox.alert("The room has been destroyed", function () {
                                window.location.reload();
                            });
                        } else if (event === "event") {
                            if (msg["participants"] !== undefined && msg["participants"] !== null) {
                                var list = msg["participants"];
                                Janus.debug("Got a list of participants:");
                                Janus.debug(list);
                                for (var f in list) {
                                    var id = list[f]["id"];
                                    var display = list[f]["display"];
                                    var setup = list[f]["setup"];
                                    var muted = list[f]["muted"];
                                    Janus.debug("  >> [" + id + "] " + display + " (setup=" + setup + ", muted=" + muted + ")");
                                    if ($('#rp' + id).length === 0) {
                                        // Add to the participants list
                                        $('#list').append('<li id="rp' + id + '" class="list-group-item">' + display +
                                            ' <i class="absetup fa fa-chain-broken"></i>' +
                                            ' <i class="abmuted fa fa-microphone-slash"></i></li>');
                                        $('#rp' + id + ' > i').hide();
                                    }
                                    if (muted === true || muted === "true")
                                        $('#rp' + id + ' > i.abmuted').removeClass('hide').show();
                                    else
                                        $('#rp' + id + ' > i.abmuted').hide();
                                    if (setup === true || setup === "true")
                                        $('#rp' + id + ' > i.absetup').hide();
                                    else
                                        $('#rp' + id + ' > i.absetup').removeClass('hide').show();
                                }
                            } else if (msg["error"] !== undefined && msg["error"] !== null) {
                                if (msg["error_code"] === 485) {
                                    // This is a "no such room" error: give a more meaningful description
                                    bootbox.alert(
                                        "<p>Apparently room <code>" + myroom + "</code> (the one this demo uses as a test room) " +
                                        "does not exist...</p><p>Do you have an updated <code>janus.plugin.audiobridge.jcfg</code> " +
                                        "configuration file? If not, make sure you copy the details of room <code>" + myroom + "</code> " +
                                        "from that sample in your current configuration file, then restart Janus and try again."
                                    );
                                } else {
                                    bootbox.alert(msg["error"]);
                                }
                                return;
                            }
                            // Any new feed to attach to?
                            if (msg["leaving"] !== undefined && msg["leaving"] !== null) {
                                // One of the participants has gone away?
                                var leaving = msg["leaving"];
                                Janus.log("Participant left: " + leaving + " (we have " + $('#rp' + leaving).length + " elements with ID #rp" + leaving + ")");
                                $('#rp' + leaving).remove();
                            }
                        }
                    }
                    if (jsep !== undefined && jsep !== null) {
                        Janus.debug("Handling SDP as well...");
                        Janus.debug(jsep);
                        mixertest.handleRemoteJsep({
                            jsep: jsep
                        });
                    }
                },
                onlocalstream: function (stream) {
                    Janus.debug(" ::: Got a local stream :::");
                    Janus.debug(stream);
                    // We're not going to attach the local audio stream
                    $('#audiojoin').hide();
                    $('#room').removeClass('hide').show();
                    $('#participant').removeClass('hide').html(myusername).show();
                },
                onremotestream: function (stream) {
                    $('#room').removeClass('hide').show();
                    var addButtons = false;
                    if (listening) {
                        Janus.attachMediaStream(getAudioElement(), stream);
                        if (!addButtons)
                            return;
                        // Mute button
                        audioenabled = true;
                        $('#toggleaudio').click(
                            function () {
                                audioenabled = !audioenabled;
                                if (audioenabled)
                                    $('#toggleaudio').html("Mute").removeClass("btn-success").addClass("btn-danger");
                                else
                                    $('#toggleaudio').html("Unmute").removeClass("btn-danger").addClass("btn-success");
                                mixertest.send({
                                    message: {
                                        "request": "configure",
                                        "muted": !audioenabled
                                    }
                                });
                            }).removeClass('hide').show();
                    }
                },
                oncleanup: function () {
                    webrtcUp = false;
                    Janus.log(" ::: Got a cleanup notification :::");
                    $('#participant').empty().hide();
                    $('#list').empty();
                    $('#mixedaudio').empty();
                    $('#room').hide();
                }
            });
        },
        error: function (error) {
            Janus.error(error);
            bootbox.alert(error, function () {
                window.location.reload();
            });
        },
        destroyed: function () {
            window.location.reload();
        }
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