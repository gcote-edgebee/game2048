<template>
  <div
    class="tile-pos"
    :style="{
      transform: positionStyle,
      'font-size': fontSize,
      color: color,
      'background-color': backgroundColor
    }"
  >
    <div
      class="tile"
      :class="{
        'tile-new': isNew,
        'tile-merge': isMerge,
        ['tile-' + value]: false
      }"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
const SIZE_TO_COLOR = {
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e'
};

export default {
  name: 'BoardTile',
  props: {
    tile: Object
  },
  data() {
    return {
      isNew: true
    };
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
    uid() {
      return this.tile.uid;
    },
    isMerge() {
      return this.tile.isMerge;
    },
    positionStyle() {
      return `translate(${this.x * 121 + 7}px, ${this.y * 121 + 7}px)`;
    },
    fontSize() {
      if (this.value > 64) return '45px';
      return '55px';
    },
    color() {
      if (this.value > 4) return '#f9f6f2';
      return '#776e65';
    },
    backgroundColor() {
      if (this.value in SIZE_TO_COLOR) return SIZE_TO_COLOR[this.value];
      return '#3c3a32';
    }
  },
  beforeUpdate() {
    this.isNew = false;
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
  border-radius: 3px;
  font-weight: bold;
  text-align: center;
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
</style>
