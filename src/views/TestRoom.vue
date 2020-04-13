<template>
  <section>
    <div class="container content-center-horizontal text-center">
      <h1>Public Test Room</h1>
      <p
        class="lead"
        style="max-width:20em"
      >Use this public test room to try the audio recording and listening</p>
      <div>
        <button class="btn btn-primary mh-1 mb-1" autocomplete="off" id="record">Record</button>
        <button class="btn btn-primary mh-1 mb-1" autocomplete="off" id="listen">Listen to all</button>
      </div>
    </div>
  </section>
</template>

<script>
var $;
$ = require('jquery');

import {getListenButton, initTeleClap, getRecordButton} from '../teleclap'

export default {
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
