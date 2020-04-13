<template>
  <div>
    <button
      class="btn btn-primary mh-1 mb-1"
      :class="{'active': connectionState === 'recording' && !buttonsBlocked}"
      :disabled="buttonsBlocked"
      @click="toggleRecord"
    >
      Record
    </button>
    <button
      class="btn btn-primary mh-1 mb-1"
      :class="{'active': connectionState === 'listening' && !buttonsBlocked}"
      :disabled="buttonsBlocked"
      @click="toggleListen"
    >
      Listen to all
    </button>
  </div>
</template>

<script>
import {initTeleClap} from '@/teleclap'

export default {
  props: {
    roomName: {
      type: String,
      default: 'testRoom'
    }
  },
  data() {
    return {
      buttonsBlocked: false,
      connectionState: null,
      teleClapHandle: null
    }
  },
  methods: {
    toggleRecord() {
      this.buttonsBlocked = true;
      if (this.connectionState === 'recording') {
        this.connectionState = null;
      } else {
        this.connectionState = 'recording';
      }
    },

    toggleListen() {
      this.buttonsBlocked = true;
      if (this.connectionState === 'listening') {
        this.connectionState = null;
      } else {
        this.connectionState = 'listening';
      }
    }
  },
  watch: {
    connectionState(state) {
      if (this.teleClapHandle) {
        this.teleClapHandle.destroy();
      }
      if (state === 'listening') {
        initTeleClap(true, false, this.roomName, null, (handle) => {
          this.teleClapHandle = handle;
          this.buttonsBlocked = false
        })
      } else if (state === 'recording') {
        initTeleClap(false, true, this.roomName, sessionStorage.deviceId, (handle) => {
          this.teleClapHandle = handle;
          this.buttonsBlocked = false;
        })
      } else {
        this.teleClapHandle = null;
        this.buttonsBlocked = false;
      }
    }
  }
};
</script>
<style scoped>
  button.active {
    background: darkred;
  }
</style>
