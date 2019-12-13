<template>
  <div
    id="app"
    placeholder="byy"
    :class="{
      app: true
    }"
    @click.stop="this.test('55', $event)">
    <h1
      b-for="(item, index) in this.list"
      class="app__title">
      {{ item }}
    </h1>
    <span class="span">
      <i
        b-for="(obj, idx) in this.list1">
        {{ (`${obj} - ${idx}`) }}
      </i
        >
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
      title: "Test-App",
      list: [1, 2, 3, 4],
      list1: [3, 2]
    },

    methods: {
      aaa() {

      },

      clickedAaa() {

      }
    }
  };
</script>