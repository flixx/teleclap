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
        <button class="btn btn-primary mh-1 mb-1" autocomplete="off" id="record">Record</button>
        <button class="btn btn-primary mh-1 mb-1" autocomplete="off" id="listen">Listen to all</button>
      </div>
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
