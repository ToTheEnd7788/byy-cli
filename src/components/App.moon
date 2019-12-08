<template>
  <div
    id="app"
    placeholder="byy"
    :class="{
      app: true
    }"
    ::ccc="this.aaa"
    @click.stop="this.test('55', $event)"
    @@fromChild="this.clickedAaa">
    <h1 class="app__title">
      {{ title }}
    </h1>
  </div>
</template>

<script>
  export default {
    name: "app",

    data: {
      title: "Test-App"
    },

    methods: {
      aaa() {

      }
    }
  };
</script>