<template>
  <div id="app" v-on:keydown.left="move">
    <div class="header">
      <h1>2048</h1>
      <div class="score">
        <div class="title">score</div>
        <div class="value">{{ score }}</div>
      </div>
      <div class="score">
        <div class="title">best score</div>
        <div class="value">{{ bestScore }}</div>
      </div>
    </div>
    <div class="instructions">
      <span>Join the numbers and get to the <b>2048 tile!</b></span>
      <button v-on:click="restart">New Game</button>
    </div>
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
    const existingState = JSON.parse(
      window.localStorage.getItem('state', null)
    );
    const game = new GameManager(4, existingState);
    return {
      game,
      grid: game.grid.serialize()
    };
  },
  computed: {
    score() {
      return this.game.score;
    },
    bestScore() {
      return this.game.bestScore;
    }
  },
  components: {
    Board
  },
  methods: {
    move: function(direction) {
      this.game.move(direction);
      this.grid = this.game.grid.serialize();
      this.saveGame();
    },
    restart: function() {
      this.game.restart();
      this.grid = this.game.grid.serialize();
      this.saveGame();
    },
    saveGame() {
      window.localStorage.setItem(
        'state',
        JSON.stringify(this.game.serialize())
      );
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
  color: #776e65;
  margin-top: 60px;
}
h1 {
  font-size: 80px;
  font-weight: bold;
  margin: 0;
  text-align: left;
  flex-grow: 1;
}
button {
  background: #8f7a66;
  border-radius: 3px;
  padding: 0 20px;
  text-decoration: none;
  color: #f9f6f2;
  height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border: none;
}
.header {
  display: flex;
  max-width: 500px;
  margin: auto;
  align-items: flex-start;
}

.instructions {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  margin: auto;
  align-items: center;
  margin-bottom: 40px;
  font-size: 18px;
}

.score {
  display: inline-block;
  color: white;
  background-color: #bbada0;
  text-transform: uppercase;
  padding: 10px 25px 2px;
  position: relative;
  border-radius: 3px;
}
.score:nth-child(2) {
  margin-right: 5px;
}
.score .title {
  font-size: 11px;
  font-weight: bold;
  color: #eee4da;
}
.score .value {
  font-size: 25px;
  font-weight: bold;
  line-height: 25px;
}
</style>
