<template>
  <div class="value">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'BoardTile',
  props: {
    value: Number
  }
};
</script>

<style scoped>
.square {
  background-color: #eee4da;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  font-size: 55px;
  width: 107px;
  height: 107px;
  line-height: 107px;
}
</style>
