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
    values: Array
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
