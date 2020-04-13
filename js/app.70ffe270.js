(function(e){function t(t){for(var n,i,s=t[0],u=t[1],l=t[2],d=0,p=[];d<s.length;d++)i=s[d],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&p.push(o[i][0]),o[i]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);c&&c(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),a()}function a(){for(var e,t=0;t<r.length;t++){for(var a=r[t],n=!0,s=1;s<a.length;s++){var u=a[s];0!==o[u]&&(n=!1)}n&&(r.splice(t--,1),e=i(i.s=a[0]))}return e}var n={},o={app:0},r=[];function i(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=n,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(a,n,function(t){return e[t]}.bind(null,n));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var c=u;r.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n,o=a("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page-wrapper"},[n("nav",{staticClass:"navbar bg-primary text-white"},[n("div",{staticClass:"container"},[n("div",{staticClass:"nav-brand"},[n("router-link",{attrs:{to:"/",title:"Home"}},[n("img",{attrs:{src:a("f295"),alt:"TeleClap Logo",height:"32"}})]),n("router-link",{attrs:{to:"/",title:"Home"}},[e._v("TeleClap")])],1),n("button",{staticClass:"hamburger-icon",attrs:{type:"button"},on:{click:e.toggleNavbar}},[n("span",{staticClass:"hamburger-icon-inner"})]),n("ul",{staticClass:"navbar-nav"},[n("li",[n("router-link",{staticClass:"nav-link",attrs:{to:"/"}},[e._v("Home")])],1),n("li",[n("router-link",{staticClass:"nav-link",attrs:{to:"/test-room",title:"Test Room"}},[e._v("Test Room")])],1),n("li",[n("router-link",{staticClass:"btn btn-primary btn-outline",attrs:{to:"open-room",title:"Get Started"}},[e._v("Get Started")])],1)])])]),n("router-view"),e._m(0)],1)},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("footer",[a("div",{staticClass:"container"},[e._v("made with ❤️ in Berlin")])])}];n=a("1157");var s,u,l={methods:{toggleNavbar:function(){n(".navbar-nav").toggleClass("expanded")}}},c=l,d=(a("5c0b"),a("2877")),p=Object(d["a"])(c,r,i,!1,null,null,null),m=p.exports,f=a("8c4f"),v=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{staticClass:"hero-section bg-dark"},[a("div",{staticClass:"container"},[e._m(0),a("div",{staticClass:"hero-content"},[a("h1",[e._v("Bring your live stream audience closer to you")]),a("p",{staticClass:"lead"},[e._v("Receive real-time applause from your streaming audience with TeleClap.")]),a("router-link",{staticClass:"btn btn-primary",attrs:{to:"open-room"}},[e._v("Create a Room")])],1)])])},g=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hero-image"},[n("img",{attrs:{src:a("fdb4"),alt:"musicians hero image"}})])}],h={},b=Object(d["a"])(h,v,g,!1,null,null,null),y=b.exports,w=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},C=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{staticClass:"container content-center-horizontal text-center"},[a("h1",[e._v("Public Test Room")]),a("p",{staticClass:"lead",staticStyle:{"max-width":"20em"}},[e._v("Use this public test room to try the audio recording and listening")]),a("div",[a("button",{staticClass:"btn btn-primary mh-1 mb-1",attrs:{autocomplete:"off",id:"record"}},[e._v("Record")]),a("button",{staticClass:"btn btn-primary mh-1 mb-1",attrs:{autocomplete:"off",id:"listen"}},[e._v("Listen to all")])])])])}],_=a("baac"),J="https://janus.teleclap.org/janus",x=!1;function k(e,t){if(!x)return x=!0,void _["Janus"].init({debug:"all",callback:function(){k(e,t)}});if(_["Janus"].isWebrtcSupported())var a=null,n="audiobridgetest-"+_["Janus"].randomString(12),o=1234,r=null,i=null,u=!1,l=!1,c=new _["Janus"]({server:J,success:function(){c.attach({plugin:"janus.plugin.audiobridge",opaqueId:n,success:function(e){s("#details").remove(),a=e,_["Janus"].log("Plugin attached! ("+a.getPlugin()+", id="+a.getId()+")"),s("#start").removeAttr("disabled").html("Stop").click((function(){s(this).attr("disabled",!0),c.destroy()})),e.send({message:{request:"join",room:o,display:"teleclapper"}})},error:function(e){_["Janus"].error("  -- Error attaching plugin...",e)},consentDialog:function(e){_["Janus"].debug("Consent dialog should be "+(e?"on":"off")+" now"),e?s.blockUI({message:'<div><img src="up_arrow.png"/></div>',css:{border:"none",padding:"15px",backgroundColor:"transparent",color:"#aaa",top:"10px",left:navigator.mozGetUserMedia?"-100px":"300px"}}):s.unblockUI()},onmessage:function(e,n){_["Janus"].debug(" ::: Got a message :::"),_["Janus"].debug(e);var r,l=e["audiobridge"];if(_["Janus"].debug("Event: "+l),void 0!=l&&null!=l)if("joined"===l){var c;if(e["id"])if(i=e["id"],_["Janus"].log("Successfully joined room "+e["room"]+" with ID "+i),!u)u=!0,c=!sessionStorage.deviceId||{deviceId:sessionStorage.deviceId},a.createOffer({media:{video:!1,audio:c},success:function(e){_["Janus"].debug("Got SDP!"),_["Janus"].debug(e);var n={request:"configure",muted:!t};a.send({message:n,jsep:e})},error:function(e){_["Janus"].error("WebRTC error:",e)}});if(void 0!==e["participants"]&&null!==e["participants"])for(var d in r=e["participants"],_["Janus"].debug("Got a list of participants:"),_["Janus"].debug(r),r){var p=r[d]["id"],m=r[d]["display"],f=r[d]["setup"],v=r[d]["muted"];_["Janus"].debug("  >> ["+p+"] "+m+" (setup="+f+", muted="+v+")"),0===s("#rp"+p).length&&(s("#list").append('<li id="rp'+p+'" class="list-group-item">'+m+' <i class="absetup fa fa-chain-broken"></i> <i class="abmuted fa fa-microphone-slash"></i></li>'),s("#rp"+p+" > i").hide()),!0===v||"true"===v?s("#rp"+p+" > i.abmuted").removeClass("hide").show():s("#rp"+p+" > i.abmuted").hide(),!0===f||"true"===f?s("#rp"+p+" > i.absetup").hide():s("#rp"+p+" > i.absetup").removeClass("hide").show()}}else if("roomchanged"===l){if(i=e["id"],_["Janus"].log("Moved to room "+e["room"]+", new ID: "+i),s("#list").empty(),void 0!==e["participants"]&&null!==e["participants"])for(var g in r=e["participants"],_["Janus"].debug("Got a list of participants:"),_["Janus"].debug(r),r){var h=r[g]["id"],b=r[g]["display"],y=r[g]["setup"],w=r[g]["muted"];_["Janus"].debug("  >> ["+h+"] "+b+" (setup="+y+", muted="+w+")"),0===s("#rp"+h).length&&(s("#list").append('<li id="rp'+h+'" class="list-group-item">'+b+' <i class="absetup fa fa-chain-broken"></i> <i class="abmuted fa fa-microphone-slash"></i></li>'),s("#rp"+h+" > i").hide()),!0===w||"true"===w?s("#rp"+h+" > i.abmuted").removeClass("hide").show():s("#rp"+h+" > i.abmuted").hide(),!0===y||"true"===y?s("#rp"+h+" > i.absetup").hide():s("#rp"+h+" > i.absetup").removeClass("hide").show()}}else if("destroyed"===l)_["Janus"].warn("The room has been destroyed!");else if("event"===l){if(void 0!==e["participants"]&&null!==e["participants"])for(var C in r=e["participants"],_["Janus"].debug("Got a list of participants:"),_["Janus"].debug(r),r){var J=r[C]["id"],x=r[C]["display"],k=r[C]["setup"],j=r[C]["muted"];_["Janus"].debug("  >> ["+J+"] "+x+" (setup="+k+", muted="+j+")"),0===s("#rp"+J).length&&(s("#list").append('<li id="rp'+J+'" class="list-group-item">'+x+' <i class="absetup fa fa-chain-broken"></i> <i class="abmuted fa fa-microphone-slash"></i></li>'),s("#rp"+J+" > i").hide()),!0===j||"true"===j?s("#rp"+J+" > i.abmuted").removeClass("hide").show():s("#rp"+J+" > i.abmuted").hide(),!0===k||"true"===k?s("#rp"+J+" > i.absetup").hide():s("#rp"+J+" > i.absetup").removeClass("hide").show()}else if(void 0!==e["error"]&&null!==e["error"])return void(485===e["error_code"]?console.log("<p>Apparently room <code>"+o+"</code> (the one this demo uses as a test room) does not exist...</p><p>Do you have an updated <code>janus.plugin.audiobridge.jcfg</code> configuration file? If not, make sure you copy the details of room <code>"+o+"</code> from that sample in your current configuration file, then restart Janus and try again."):console.log(e["error"]));if(void 0!==e["leaving"]&&null!==e["leaving"]){var O=e["leaving"];_["Janus"].log("Participant left: "+O+" (we have "+s("#rp"+O).length+" elements with ID #rp"+O+")"),s("#rp"+O).remove()}}void 0!==n&&null!==n&&(_["Janus"].debug("Handling SDP as well..."),_["Janus"].debug(n),a.handleRemoteJsep({jsep:n}))},onlocalstream:function(e){_["Janus"].debug(" ::: Got a local stream :::"),_["Janus"].debug(e),s("#audiojoin").hide(),s("#room").removeClass("hide").show(),s("#participant").removeClass("hide").html(r).show()},onremotestream:function(t){s("#room").removeClass("hide").show();var n=!1;if(e){if(_["Janus"].attachMediaStream(j(),t),!n)return;l=!0,s("#toggleaudio").click((function(){l=!l,l?s("#toggleaudio").html("Mute").removeClass("btn-success").addClass("btn-danger"):s("#toggleaudio").html("Unmute").removeClass("btn-danger").addClass("btn-success"),a.send({message:{request:"configure",muted:!l}})})).removeClass("hide").show()}},oncleanup:function(){u=!1,_["Janus"].log(" ::: Got a cleanup notification :::"),s("#participant").empty().hide(),s("#list").empty(),s("#mixedaudio").empty(),s("#room").hide()}})},error:function(e){_["Janus"].error(e),console.log(e,(function(){window.location.reload()}))},destroyed:function(){window.location.reload()}});else alert("No WebRTC support... ")}function j(){var e=document.getElementById("audio");if(e)return e;var t=document.createElement("audio");return t.id="audio",t.autoplay=!0,document.body.appendChild(t),t}function O(){return document.getElementById("record")}function S(){return document.getElementById("listen")}s=a("1157"),u=a("1157");var P={mounted:function(){u((function(){S().addEventListener("click",(function(){k(!0,!1)})),O().addEventListener("click",(function(){k(!1,!0)}))}))}},E=P,I=Object(d["a"])(E,w,C,!1,null,null,null),R=I.exports,N=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{staticClass:"container content-center-horizontal text-center"},[a("h1",[e._v("Open a new Room")]),a("p",{staticClass:"lead",staticStyle:{"max-width":"20em"}},[e._v("Create your room, share it with friends or embed it on your website")]),a("div",{staticClass:"input-group"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.roomName,expression:"roomName"}],attrs:{type:"text",autocomplete:"off","data-lpignore":"true"},domProps:{value:e.roomName},on:{input:function(t){t.target.composing||(e.roomName=t.target.value)}}}),a("button",{staticClass:"btn btn-primary",attrs:{id:"openRoom"},on:{click:e.openRoom}},[e._v("Open")])])])])},T=[],G=(a("ac1f"),a("5319"),a("498a"),{slugify:function(e){return e=e.normalize("NFKD").replace(/[\u0300-\u036F]/g,""),e=e.replace(/[^\w\s-]+/g,"").trim().toLowerCase(),e.replace(/[-\s]+/g,"-")}}),D={data:function(){return{roomName:""}},methods:{openRoom:function(e){e.preventDefault();var t=G.slugify(this.roomName),a="room/"+t;this.$root.currentRoute=a,window.history.pushState(null,this.roomName,a)}}},$=D,M=Object(d["a"])($,N,T,!1,null,null,null),B=M.exports,L=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("div",{staticClass:"container"},[a("h1",[e._v("Your room:")]),a("input",{attrs:{type:"text",readonly:""},domProps:{value:e.myPath}})])])},U=[],q={computed:{myPath:function(){return window.location.href}}},z=q,A=Object(d["a"])(z,L,U,!1,null,null,null),H=A.exports,W=[{path:"/",component:y},{path:"/test-room",component:R},{path:"/open-room",component:B},{path:"*",component:H}];o["a"].use(f["a"]);var F=new f["a"]({routes:W});new o["a"]({el:"#app",router:F,template:"<App/>",components:{App:m},render:function(e){return e(m)}})},"5c0b":function(e,t,a){"use strict";var n=a("9c0c"),o=a.n(n);o.a},"9c0c":function(e,t,a){},f295:function(e,t,a){e.exports=a.p+"img/logo-white.e699024e.svg"},fdb4:function(e,t,a){e.exports=a.p+"img/musicians.04ba57e0.png"}});
//# sourceMappingURL=app.70ffe270.js.map