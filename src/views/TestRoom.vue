<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Public Test Room</h1>
      <p
        class="lead"
        style="max-width:20em"
      >Use this public test room to try the audio recording and listening</p>
      <clap-buttons/>
    </div>
  </section>
</template>

<script>
import ClapButtons from "./ClapButtons";

export default {
  components: {
    ClapButtons
  }
};
</script>
