<template>
  <main-layout>
    <h1>Your room: </h1>
    <input type="text" readonly v-bind:value="myPath" />
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'

  export default {
    components: {
      MainLayout
    },
    computed: {
      myPath: function () {
        return window.location.href
      }
    }
  }
</script>
