<script>
export default {
  data() {
    return {};
  },
  computed: {
    user() {
      // State 会暴露为 store.state
      return this.$store.state.user;
    },
    count() {
      // State 会暴露为 store.state
      return this.$store.state.count;
    },
    doubleCount() {
      // Getter 会暴露为 store.getters 对象，可以以属性的形式访问
      return this.$store.getters.doubleCount;
    },
  },
  methods: {
    toOne() {
      this.$router.push({ path: "/One", query: { plan: "id" } });
    },
    increment() {
      // 使用 commit 的形式来直接提交一个变更
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
    increment2() {
      // 使用 dispatch 的形式来分发一个动作（action）
      this.$store.dispatch("increment");
      console.log(this.$store.state.count);
    },
  },
};
</script>

<template>
  <div>{{ user }}</div>
  <div>count: {{ count }}</div>
  <div>count: {{ doubleCount }}</div>
  <n-button @click="increment">add count</n-button>
  <n-button @click="increment2">add count2</n-button>
</template>
