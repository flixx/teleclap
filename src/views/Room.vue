<template>
  <section>
    <div class="container">
      <h1>Your room:</h1>
      <input type="text" readonly v-bind:value="myPath" />
    </div>
  </section>
</template>

<script>

export default {
  computed: {
    myPath: function() {
      return window.location.href;
    }
  }
};
</script>
