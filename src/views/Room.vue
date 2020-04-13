<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Your room</h1>
      <input class="full-width" type="text" readonly v-bind:value="myPath" />
      <p
        class="lead"
        style="max-width:20em"
      >Save or share this URL to access this page.</p>
      <clap-buttons />
    </div>
  </section>
</template>

<script>
import ClapButtons from "./ClapButtons";

export default {
  computed: {
    myPath: function() {
      return window.location.href;
    }
  },
  components: {
    ClapButtons
  }

};
</script>
