import Vue from 'vue';
import { Row, Column } from 'vue-grid-responsive';
import App from './App.vue';
import AppButton from './components/AppButton';

Vue.config.productionTip = false;
Vue.component('row', Row);
Vue.component('column', Column);
Vue.component('AppButton', AppButton);

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount('#app');
