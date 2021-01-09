import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.filter("shortenString", (value) => {
  if (value.length > 65) {
    return value.slice(0, 45) + "...";
  } else {
    return value;
  }
});
Vue.filter("nameShortenString", (value) => {
  if (value.length > 16) {
    return value.slice(0, 13) + "...";
  } else {
    return value;
  }
});
Vue.filter("setUppercase", (value) => {
  return value[0].toUpperCase() + value.slice(1).toLowerCase();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
