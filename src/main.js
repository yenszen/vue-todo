import Vue from "vue";
import UUID from "vue-uuid";
import App from "./App.vue";

Vue.use(UUID);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
