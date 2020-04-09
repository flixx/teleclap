<template>
  <main-layout>
    <section class="hero-section bg-dark">
      <div class="container">
        <div class="hero-image">
          <img src="/media/images/AdobeStock_273989383_Preview.png" alt="musicians hero image" />
        </div>
        <div class="hero-content">
          <h1>Bring your live stream audience closer to you</h1>
          <p class="lead">Receive real-time applause from your streaming audience with TeleClap.</p>
          <v-link class="btn btn-primary" href="/open-room">Create a Room</v-link>
        </div>
      </div>
    </section>

    <section>
      <div class="container"></div>
    </section>
  </main-layout>
</template>

<script>
import VLink from "../components/VLink.vue";
import MainLayout from "../layouts/Main.vue";
import routes from "../routes";

export default {
  components: {
    MainLayout,
    VLink
  }
};
</script>
