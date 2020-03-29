<template>
  <main-layout>
    <section>
      <div class="container">
        <h1>Your room:</h1>
        <input type="text" readonly v-bind:value="myPath" />
      </div>
    </section>
  </main-layout>
</template>

<script>
import MainLayout from "../layouts/Main.vue";

export default {
  components: {
    MainLayout
  },
  computed: {
    myPath: function() {
      return window.location.href;
    }
  }
};
</script>
