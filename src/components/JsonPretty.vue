<template>
  <div class="json-pretty">
    <vue-json-pretty :data="jsonData" />
  </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty'
defineOptions({
  name: 'JsonPretty',
})
defineProps({
  jsonData: {
    type: Object,
    default: () => {},
  },
})
</script>

<style scoped>
/* 样式内容 */
.json-pretty {
  height: 100%;
  overflow-y: scroll;
  background-color: #f7f7f7;
}
</style>
