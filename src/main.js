import Vue from 'vue';
import { Row, Column } from 'vue-grid-responsive';
import App from './App.vue';

const INITIAL_VALUE_COUNT = 2;
const INITIAL_VALUES = [2];

Vue.config.productionTip = false;
Vue.component('row', Row);
Vue.component('column', Column);

function initStore() {
  const values = Array.apply(0, Array(16)).map(() => 0);

  for (let i = 0; i < INITIAL_VALUE_COUNT; ++i) {
    const valuesIndex = parseInt(Math.random() * 16);
    const initialValueIndex = parseInt(Math.random() * INITIAL_VALUES.length);
    values[valuesIndex] = INITIAL_VALUES[initialValueIndex];
  }

  return {
    values
  };
}

new Vue({
  data: initStore(),
  render: function(h) {
    return h(App, { props: { values: this.values } });
  }
}).$mount('#app');
