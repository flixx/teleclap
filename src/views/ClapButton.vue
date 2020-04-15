<template>
  <div>
    <button
      class="btn btn-primary mh-1 mb-1"
      :class="{'active': recording}"
      :disabled="stateTransitioning"
      @click="toggleRecord"
    >
      <i class="icon icon-microphone"></i>
      <span v-if="recording">Recording...</span><span v-else>Record</span>
    </button>
    <button
      v-if="allowListening"
      class="btn btn-primary mh-1 mb-1"
      :class="{'active': listening}"
      :disabled="stateTransitioning"
      @click="toggleListen"
    >
      <i class="icon icon-speaker"></i>
      <span v-if="listening">Listening...</span><span v-else>Listen to all</span>
    </button>
  </div>
</template>

<script>
import {initTeleClap} from '@/teleclap'

export default {
  props: {
    roomName: {
      type: String,
      required: true
    },
    allowListening: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      stateTransitioning: false,
      connectionState: null,
      teleclapHandle: null
    }
  },
  computed: {
    listening() {
      return this.connectionState === 'listening' && !this.stateTransitioning
    },
    recording() {
      return this.connectionState === 'recording' && !this.stateTransitioning
    },
    deviceId() {
      return sessionStorage.deviceId
    }
  },
  methods: {
    toggleRecord() {
      this.stateTransitioning = true;
      if (this.connectionState === 'recording') {
        this.connectionState = null;
      } else {
        this.connectionState = 'recording';
      }
    },
    toggleListen() {
      this.stateTransitioning = true;
      if (this.connectionState === 'listening') {
        this.connectionState = null;
      } else {
        this.connectionState = 'listening';
      }
    }
  },
  watch: {
    connectionState(state) {
      if (this.teleclapHandle) {
        this.teleclapHandle.destroy();
      }
      if (state === 'listening') {
        initTeleClap(true, false, this.roomName, null, (handle) => {
          this.teleclapHandle = handle;
          this.stateTransitioning = false
        })
      } else if (state === 'recording') {
        initTeleClap(false, true, this.roomName, this.deviceId, (handle) => {
          this.teleclapHandle = handle;
          this.stateTransitioning = false;
        })
      } else {
        this.teleclapHandle = null;
        this.stateTransitioning = false;
      }
    }
  }
};
</script>
