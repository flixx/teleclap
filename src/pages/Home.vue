<template>
  <main-layout>
    <h1>Open a new Room</h1>
    <input type=text  autocomplete="off" v-model="roomName" data-lpignore="true"/>
    <button v-on:click="openRoom" id="openRoom">Open</button>
  </main-layout>
</template>

<script>
  import MainLayout from '../layouts/Main.vue'
  import routes from '../routes'
  import utils from '../utils'

  export default {
    components: {
      MainLayout
    },
    data: function() {
      return {
        roomName: ''
      }
    },
    methods: {
      openRoom: function (event) {
        event.preventDefault()
        var slug = utils.slugify(this.roomName)
        this.$root.currentRoute = slug
        window.history.pushState(
          null,
          slug,
          slug
        )
      }
    }
  }
</script>
