<template>
  <div class="tile-pos" :style="{ transform: positionStyle }">
    <div :class="innerClass">
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardTile',
  props: {
    tile: Object
  },
  computed: {
    value() {
      return this.tile.value;
    },
    x() {
      return this.tile.position.x;
    },
    y() {
      return this.tile.position.y;
    },
    innerClass() {
      return `tile tile-new tile-${this.value}`;
      //return `tile tile-${this.value}`;
    },
    positionStyle() {
      return `translate(${this.x * 121 + 7.5}px, ${this.y * 121 + 7.5}px)`;
    }
  },
  mounted() {
    console.log("CRAP MOUNT:", JSON.stringify(this.tile));
  },
  updated() {
    console.log("CRAP UPDAT:", JSON.stringify(this.tile));
  }
};
</script>

<style scoped>
.tile-pos {
  position: absolute;
  z-index: 12;

  transition: 100ms ease-in-out;
  transition-property: transform;
}
.tile {
  font-family: 'Clear Sans', 'Helvetica Neue', Arial, sans-serif;
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
.tile.tile-new {
  animation: appear 200ms ease 100ms;
  animation-fill-mode: backwards;
}
.tile.tile-merge {
  animation: pop 200ms ease 100ms;
  animation-fill-mode: backwards;
}
@keyframes appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes pop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
.tile.tile-2 {
  background-color: #eee4da;
}
.tile.tile-4 {
  background-color: #ede0c8;
}
.tile.tile-8 {
  color: #f9f6f2;
  background: #f2b179;
}
.tile.tile-16 {
  color: #f9f6f2;
  background: #f59563;
}
.tile.tile-32 {
  color: #f9f6f2;
  background: #f67c5f;
}
.tile.tile-64 {
  color: #f9f6f2;
  background: #f65e3b;
}
.tile.tile-128 {
  color: #f9f6f2;
  background: #edcf72;
  font-size: 45px;
}
.tile.tile-256 {
  color: #f9f6f2;
  background: #edcc61;
  font-size: 45px;
}
</style>
