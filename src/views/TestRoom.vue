<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Public Test Room</h1>
      <p
        class="lead"
        style="max-width:20em"
      >Use this public test room to try the audio recording and listening</p>
      <div>
        <button class="btn btn-primary mh-1 mb-1" :class="{'recording': recording}" autocomplete="off" id="record" @click="toggleRecord">Record</button>
        <button class="btn btn-primary mh-1 mb-1" :class="{'listening': listening}" autocomplete="off" id="listen" @click="toggleListen">Listen to all</button>
      </div>
    </div>
  </section>
</template>

<script>
import {initTeleClap} from '../teleclap'

export default {
  data() {
    return {
      listening: false,
      recording: false
    }
  },
  methods: {
    toggleRecord() {
      this.recording = true;
      initTeleClap(false, true, "public-test-room", sessionStorage.deviceId)
    },
    toggleListen() {
      this.listening = true;
      initTeleClap(true, false, "public-test-room")
    }
  }
};
</script>
