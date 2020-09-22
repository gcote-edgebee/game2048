<template>
  <div class="root">
    <div class="overlay">
      <p>Game over!</p>
      <app-button :onClick="restart">Try again</app-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameOver',
  methods: {
    restart() {
      this.$emit('restart');
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
.overlay {
  display: inline-block;
  text-align: center;
  width: 500px;
  height: 100%;
  margin: auto;
  background-color: rgba(238, 228, 218, 0.73);
}
.overlay p {
  margin-top: 160px;
  margin-bottom: 20px;
  font-size: 60px;
  font-weight: bold;
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
