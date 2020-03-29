<template>
  <main-layout>
    <section>
      <div class="container">
        <button class="btn btn-primary" autocomplete="off" id="record">TeleClap</button>
        <button class="btn btn-primary" autocomplete="off" id="listen">Listen to all</button>
      </div>
    </section>

    <section>
      <div class="container">
        <h1>Open a new Room</h1>
        <input type="text" autocomplete="off" v-model="roomName" data-lpignore="true" />
        <button v-on:click="openRoom" id="openRoom">Open</button>
      </div>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";
import routes from "../routes";
import utils from "../utils";

export default {
  components: {
    MainLayout
  },
  data: function() {
    return {
      roomName: ""
    };
  },
  methods: {
    openRoom: function(event) {
      event.preventDefault();
      var slug = utils.slugify(this.roomName);
      this.$root.currentRoute = slug;
      window.history.pushState(null, slug, slug);
    }
  }
};
</script>
