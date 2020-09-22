<template>
  <button @click="onClick" class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  }
};
</script>

<style scoped>
.button {
  background: #8f7a66;
  border-radius: 3px;
  padding: 0 20px;
  text-decoration: none;
  color: #f9f6f2;
  height: 40px;
  cursor: pointer;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border: none;
}
</style>
