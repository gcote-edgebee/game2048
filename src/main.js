import Vue from 'vue';
import { Row, Column } from 'vue-grid-responsive';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.component('row', Row);
Vue.component('column', Column);

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
