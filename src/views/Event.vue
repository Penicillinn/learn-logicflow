<template>
  <div class="container" id="event"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import LogicFlow from '@logicflow/core'
import store from '@/store'

const route = useRoute()

defineOptions({
  name: 'LogicFlowContainer',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#event') as HTMLElement,
    grid: true,
  })
  lf.on('node:click', () => {
    ElMessage.success('节点单击')
  })
  lf.on('edge:click', () => {
    ElMessage.success('边单击')
  })
  lf.on('node:dragstart', () => {
    ElMessage.success('节点开始拖拽')
  })

  lf.render(store.state.currentData)
}

watch(
  () => route.fullPath,
  () => {
    // 这里执行你的重置逻辑，比如重新初始化 LogicFlow
    init()
  },
)

onMounted(init)
</script>

<style scoped>
/* 样式内容 */
.container {
  height: 100%;
  width: 100%;
}
</style>
