<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Open a new Room</h1>
      <p
        class="lead"
        style="max-width:20em"
      >Create your room, share it with friends or embed it on your website</p>
      <div class="input-group">
        <input type="text" autocomplete="off" v-model="roomName" data-lpignore="true" />
        <button v-on:click="openRoom" id="openRoom" class="btn btn-primary">Open</button>
      </div>
    </div>
  </section>
</template>

<script>
import utils from "../utils";

export default {
  data: function() {
    return {
      roomName: ""
    };
  },
  methods: {
    openRoom: function(event) {
      event.preventDefault();
      const slugifiedRoomName = utils.slugify(this.roomName);
      const roomPath = "room/" + slugifiedRoomName;
      this.$router.push({ path: roomPath })
    }
  }
};
</script>