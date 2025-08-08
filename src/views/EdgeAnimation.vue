<template>
  <div class="container" id="edgeAnimation"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'
import CustomEdge from '@/views/custom/animation-edge'

const route = useRoute()

defineOptions({
  name: 'EdgeAnimation',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#edgeAnimation') as HTMLElement,
    grid: true,
    edgeType: 'custom-animation-edge',
  })

  lf.register(CustomEdge)

  // 监听节点和边的增删改事件
  const syncData = () => {
    const data = lf.getGraphRawData() // 或 getData()
    if (data) {
      store.state.currentData = data // 或通过 mutation 更新
    }
  }
  lf.on('node:add', syncData)
  lf.on('node:dnd-add', syncData)
  lf.on('node:dnd-drag', syncData)
  lf.on('node:delete', syncData)
  lf.on('node:drag', syncData)
  lf.on('edge:add', syncData)
  lf.on('edge:delete', syncData)
  lf.on('text:update', syncData)

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
