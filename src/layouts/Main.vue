<template>
  <div class="page-wrapper">
    <nav class="navbar bg-primary text-white">
      <div class="container">
        <div class="nav-brand">
          <a href="/" title="Home">
            <img src="/media/logo/logo-white.svg" alt="TeleClap Logo" height="35" />
          </a>
          <a href="/" title="Home">TeleClap</a>
        </div>

        <ul class="navbar-nav">
          <li>
            <v-link class="nav-link" href="/">Home</v-link>
          </li>
          <li>
            <v-link class="nav-link" href="#test-room" title="Test Room">Test Room</v-link>
          </li>
          <li>
            <v-link class="nav-link" href="#open-room" title="Get Started">Get Started</v-link>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <slot></slot>
    </main>

    <footer>
      <div class="container">made with ❤️ in Berlin</div>
    </footer>
  </div>
</template>

<script>
import VLink from "../components/VLink.vue";

export default {
  components: {
    VLink
  }
};
</script>