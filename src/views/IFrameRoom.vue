<template>
  <section>
    <h3>TeleClap for {{ roomName }}</h3>
    <clap-button :room-name="roomName"/>
  </section>
</template>

<script>
    import ClapButton from "./ClapButton";

    export default {
      props: ['roomName'],
        components: {
            ClapButton
        }
    };
</script>
