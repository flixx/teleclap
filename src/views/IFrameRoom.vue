<template>
  <section>
      <div>
        <button class="btn btn-primary mh-1 mb-1" :class="{'recording': recording}" autocomplete="off" id="record" @click="toggleRecord">Record</button>
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
      recording: false
    }
  },
  methods: {
    toggleRecord() {
      this.recording = true;
      initTeleClap(false, true, this.myPath, sessionStorage.deviceId)
    },
  }
};
</script>
