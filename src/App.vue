<template>
  <div id="app" v-on:keydown.left="move">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Board :values="values" />
  </div>
</template>

<script>
import Board from './components/Board.vue';

const VALID_KEYS = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down'
};

export default {
  name: 'App',
  props: {
    values: Array
  },
  components: {
    Board
  },
  methods: {
    move: function(direction) {
      console.log('KeyDown:', direction);
    }
  },
  mounted() {
    window.addEventListener('keydown', event => {
      if (event.key in VALID_KEYS) {
        this.move(VALID_KEYS[event.key]);
      }
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
