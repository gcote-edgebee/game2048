<template>
  <div class="root">
    <div class="overlay">
      <p>You win!</p>
      <div>
        <button v-on:click="keepGoing" class="button">Keep going</button>
        <button v-on:click="restart" class="button">Try again</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Win',
  methods: {
    restart() {
      this.$emit('restart');
    },
    keepGoing() {
      this.$emit('continue');
    }
  }
};
</script>

<style scoped>
.root {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 100;
  animation: appear 900ms ease 1000ms;
  animation-fill-mode: both;
}
.button {
  display: inline-block;
}
.button:first-child {
  margin-right: 10px;
}
.overlay {
  display: inline-block;
  text-align: center;
  width: 500px;
  height: 100%;
  margin: auto;
  background-color: rgba(237, 194, 46, 0.5);
}
.overlay p {
  margin-top: 160px;
  margin-bottom: 20px;
  font-size: 60px;
  font-weight: bold;
  color: #f9f6f2;
}
.overlay > * {
  animation: rise 1900ms;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes rise {
  0% {
    transform: translateY(200px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
