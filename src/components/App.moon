<template>
  <div
    id="app"
    placeholder="byy"
    :class="{
      app: true
    }"
    @click.stop="this.test('55', $event)">
    <h1 class="app__title">
      {{ this.title }}
    </h1>
    <span class="span">
      <i>123</i>
    </span>
    {{ this.title }}
    <test-one
      :title="this.title === '123'"
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