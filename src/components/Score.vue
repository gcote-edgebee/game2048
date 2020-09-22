<template>
  <div class="score">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <transition name="fade" v-on:after-enter="endAdd">
      <div class="add" v-if="add > 0">+{{ add }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Score',
  props: {
    title: {
      type: String,
      default: 'score'
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      previousValue: this.value
    };
  },
  computed: {
    add() {
      return this.value - this.previousValue;
    }
  },
  methods: {
    endAdd() {
      this.previousValue = this.value;
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
  position: relative;
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
.score .add {
  position: absolute;
  font-size: 25px;
  line-height: 25px;
  font-weight: bold;
  color: rgba(119, 110, 101, 0.9);
  z-index: 100;
  right: 30px;
}

.fade-enter-active {
  animation: move-up 10ms ease-in reverse;
}
.fade-leave-active {
  animation: move-up 600ms ease-in;
}
@keyframes move-up {
  0% {
    top: 25px;
    opacity: 1;
  }

  100% {
    top: -50px;
    opacity: 0;
  }
}
</style>
