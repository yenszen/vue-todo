<template>
  <div id="app">
    <Header />
    <Todo />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todo from "./components/Todo.vue";

export default {
  name: "App",
  components: {
    Header,
    Todo,
  },
};
</script>

<style>
* {
  margin-top: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
</style>
