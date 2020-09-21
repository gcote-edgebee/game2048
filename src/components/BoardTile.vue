<template>
  <div class="tile">
    <BoardTileValue v-if="value > 0" :value="value"></BoardTileValue>
  </div>
</template>

<script>
import BoardTileValue from './BoardTileValue.vue';

export default {
  name: 'BoardTile',
  props: {
    value: Number
  },
  components: {
    BoardTileValue
  }
};
</script>

<style scoped>
.tile {
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  font-size: 55px;
  width: 106.25px;
  height: 106.25px;
}
</style>
