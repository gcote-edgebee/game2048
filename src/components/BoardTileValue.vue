<template>
  <div :class="valueClass">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'BoardTile',
  props: {
    value: Number
  },
  computed: {
    valueClass() {
      return `square square-${this.value}`;
    }
  }
};
</script>

<style scoped>
.square {
  font-family: "Clear Sans", "Helvetica Neue", Arial, sans-serif;
  color: #776e65;
  background-color: #eee4da;
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
  font-size: 55px;
  width: 107px;
  height: 107px;
  line-height: 107px;
}
.square-2 {
  background-color: #eee4da;
}
.square-4 {
  background-color: #ede0c8;
}
.square-8 {
  color: #f9f6f2;
  background: #f2b179;
}
.square-16 {
  color: #f9f6f2;
  background: #f59563;
}
.square-32 {
  color: #f9f6f2;
  background: #f67c5f;
}
.square-64 {
  color: #f9f6f2;
  background: #f65e3b;
}
.square-128 {
  color: #f9f6f2;
  background: #edcf72;
  font-size: 45px;
}
.square-256 {
  color: #f9f6f2;
  background: #edcc61;
  font-size: 45px;
}
</style>
