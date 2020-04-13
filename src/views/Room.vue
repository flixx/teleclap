<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Your room</h1>
      <input class="full-width" type="text" readonly v-bind:value="myPath" />
      <p
        class="lead"
        style="max-width:20em"
      >Save or share this URL to access this page.</p>
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
  computed: {
    myPath: function() {
      return window.location.href;
    }
  },
  data() {
    return {
      listening: false,
      recording: false
    }
  },
  methods: {
    toggleRecord() {
      this.recording = true;
      initTeleClap(false, true, this.myPath, sessionStorage.deviceId)
    },
    toggleListen() {
      this.listening = true;
      initTeleClap(true, false, this.myPath)
    }
  }
};
</script>
