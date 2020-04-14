<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1><span v-if="creatorView">Your room: </span><span v-else>TeleClap for </span>{{ roomName }}</h1>
      <div v-if="creatorView">
        <input class="full-width" type="text" :value="clapLink" readonly/>
        <p class="lead"> Share this URL to access a <a :href="clapLink">page</a> which only allows recording for this room.</p>

        <input class="full-width" type="text" :value="creatorLink" readonly/>
        <p class="lead"> Save or share this URL to access this page.</p>
      </div>
      <clap-button :roomName="roomName" :allow-listening="creatorView"/>
    </div>
  </section>
</template>

<script>
import ClapButton from "./ClapButton";

export default {
  props: {
    roomName: {
      type: String,
      required: true
    },
    creatorView: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    creatorLink: function() {
      const path = this.$router.resolve({name: 'room', params: {roomName: this.roomName}}).href;
      return `${window.location.origin}/${path}`
    },
    clapLink: function() {
      const path = this.$router.resolve({name: 'clap', params: {roomName: this.roomName}}).href;
      return `${window.location.origin}/${path}`
    }
  },
  components: {
    ClapButton
  }

};
</script>
<style scoped>
  .lead {
    max-width: 20em;
  }
  a {
    text-decoration: underline;
  }
</style>
