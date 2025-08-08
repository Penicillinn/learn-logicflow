<template>
  <div class="vue-node">
    <h1>{{ properties.name }}</h1>
    <button @click="handleClick">click</button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'VueNode',
})
const props = defineProps({
  properties: {
    type: Object,
    default: () => {},
  },
  text: {
    type: String,
    default: '',
  },
  onBtnClick: {
    type: Function,
    default: () => {},
  },
})

const handleClick = () => {
  props.onBtnClick()
}
</script>

<style scoped>
.vue-node {
  box-sizing: border-box;
  height: 100px;
  background: #efdbff;
  border: 2px solid #9254de;
  border-radius: 10px;
}
</style>
