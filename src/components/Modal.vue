<template>
  <el-dialog v-model="dialogVisible" title="查看" width="500" top="0" center>
    <JsonPretty :jsonData="jsonData" />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonPretty from './JsonPretty.vue'

defineOptions({
  name: 'ModalDemo',
})

const dialogVisible = ref<Boolean>(false)
const jsonData = ref({})

function toogleVisible(visile: Boolean, data: Object) {
  dialogVisible.value = visile
  if (data) {
    jsonData.value = data
  }
}

defineExpose({
  toogleVisible,
})
</script>

<style scoped>
/* 样式内容 */
</style>
