import Vue from 'vue';
import App from './App.vue';
import router from './router';
import BootstrapVue from "bootstrap-vue";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.directive('focus', { inserted: function(el) { el.focus(); }});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');