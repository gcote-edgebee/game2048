<template>
  <row class="board" container :gutter="15" :columns="4">
    <column v-for="(tile, index) in tiles" :key="index">
      <BoardTile :tile="tile"></BoardTile>
    </column>
    <BoardTileValue v-for="tile in tileValues" :key="tile.uid" :tile="tile">
    </BoardTileValue>
  </row>
</template>

<script>
import BoardTile from './BoardTile.vue';
import BoardTileValue from './BoardTileValue.vue';

export default {
  name: 'Board',
  props: {
    grid: Object
  },
  computed: {
    tiles: function() {
      return this.grid.cells.reduce((acc, vector) => {
        return vector.reduce((acc, tile) => {
          acc.push(tile);
          return acc;
        }, acc);
      }, []);
    },
    tileValues: function() {
      return this.grid.cells.reduce((acc, vector) => {
        return vector.reduce((acc, tile) => {
          tile && acc.push(tile);
          return acc;
        }, acc);
      }, []);
    }
  },
  components: {
    BoardTile,
    BoardTileValue
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
