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
    {{ title }}
    <test-one
      :title="title"
      @fromChild="this.clickedAaa">
    </test-one>
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

      },

      clickedAaa() {

      }
    }
  };
</script>