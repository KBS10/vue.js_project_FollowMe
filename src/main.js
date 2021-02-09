import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VSwitch from "v-switch-case";
import VModal from "vue-js-modal";
import VueMoment from "vue-moment";

Vue.use(VueMoment);
Vue.use(VSwitch);
Vue.use(VModal, {
  dynamic: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");