<template>
  <div id="app" v-on:keydown.left="move">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Board :grid="grid" />
  </div>
</template>

<script>
import Board from './components/Board.vue';
import GameManager from './game';

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
  data: function() {
    const game = new GameManager(4);
    return {
      game,
      grid: game.grid.serialize()
    };
  },
  components: {
    Board
  },
  methods: {
    move: function(direction) {
      //move(direction, this.values);
      this.game.move(direction);
      this.grid = this.game.grid.serialize();
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
