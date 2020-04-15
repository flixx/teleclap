<template>
  <div class="page-wrapper">
    <nav class="navbar bg-primary text-white">
      <div class="container">
        <div class="nav-brand">
          <router-link to="/" title="Home">
            <img src="./assets/logo-white.svg" alt="TeleClap Logo" height="32" />
          </router-link>
          <router-link to="/" title="Home">TeleClap</router-link>
        </div>

        <button type="button" class="hamburger-icon" v-on:click="toggleNavbar">
          <span class="hamburger-icon-inner"></span>
        </button>

        <ul class="navbar-nav">
          <li>
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li>
            <router-link to="/test-room" class="nav-link" title="Test Room">Test Room</router-link>
          </li>
          <li>
            <router-link to="open-room" class="btn btn-primary btn-outline" title="Get Started">Get Started</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <router-view/>
    </main>
    
    <footer>
      <div class="container">made with <i class="icon icon-heart"></i> in Berlin</div>
    </footer>
  </div>
</template>

<script>

var $;
$ = require('jquery');

export default {
  methods: {
    toggleNavbar: () => {
      $(".navbar-nav").toggleClass("expanded");
    }
  }
};
</script>

<style lang='scss'>
@import "./scss/main.scss";
</style>