<template>
  <main-layout>
    <section>
      <div class="container content-center-horizontal text-center">
        <h1>Public Test Room</h1>
        <p
          class="lead"
          style="max-width:20em"
        >Use this public test room to try the audio recording and listening</p>
        <div>
          <button class="btn btn-primary" autocomplete="off" id="record">Record</button>
          <button class="btn btn-primary" autocomplete="off" id="listen">Listen to all</button>
        </div>
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
  mounted: () => {
    $(() => {
      getListenButton().addEventListener("click", function() {
        initTeleClap(true, false);
      });
      getRecordButton().addEventListener("click", function() {
        initTeleClap(false, true);
      });
    });
  }
};
</script>
