<template>
  <row class="board" container :gutter="15" :columns="4">
    <column v-for="(value, index) in values" :key="index">
      <BoardTile :value="value"></BoardTile>
    </column>
  </row>
</template>

<script>
import BoardTile from './BoardTile.vue';

export default {
  name: 'Board',
  props: {
    grid: Object
  },
  computed: {
    values: function() {
      const size = this.grid.size;
      const values = Array.apply(0, Array(size * size));
      for (let x = 0; x < this.grid.cells.length; ++x) {
        const vector = this.grid.cells[x];
        for (let y = 0; y < vector.length; ++y) {
          const tile = vector[y];
          values[x + y * size] = tile ? tile.value : 0;
        }
      }
      return values;
    }
  },
  components: {
    BoardTile
  }
};
</script>

<style scoped>
.board {
  max-width: 500px;
  max-height: 500px;
  background-color: #bbaba0;
  border-radius: 6px;
  padding: 7.5px;
  margin: auto !important;
}
</style>
