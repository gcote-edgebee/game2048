<template>
  <div class="score">
    <div class="title">{{ title }}</div>
    <div class="value">
      <slot>0</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    title: {
      type: String,
      default: 'score'
    }
  }
};
</script>

<style scoped>
.score {
  display: inline-block;
  color: white;
  background-color: #bbada0;
  text-transform: uppercase;
  padding: 10px 25px 2px;
  position: relative;
  border-radius: 3px;
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
