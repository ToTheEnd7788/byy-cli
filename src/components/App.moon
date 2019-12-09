<template>
  <div
    id="app"
    placeholder="byy"
    :class="{
      app: true
    }"
    @click.stop="this.test('55', $event)">
    <h1 class="app__title">
      {{ title }}
    </h1>
    <TestOne
      :title="title"
      @fromChild="this.clickedAaa">
    </TestOne>
  </div>
</template>

<script>
  // import TestOne from "./TestOne";

  export default {
    name: "app",

    components: {
      TestOne
    },

    data: {
      title: "Test-App"
    },

    methods: {
      aaa() {

      },

      clickedAaa() {

      }
    }
  };
</script>