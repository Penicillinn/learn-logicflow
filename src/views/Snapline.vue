<template>
  <div class="container" id="snapline"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'

const route = useRoute()

defineOptions({
  name: 'LogicFlowContainer',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#snapline') as HTMLElement,
    grid: true,
    snapline: true,
  })

  // 修改对齐线样式
  lf.setTheme({
    snapline: {
      stroke: '#1E90FF', // 对齐线颜色
      strokeWidth: 3, // 对齐线宽度
    },
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
