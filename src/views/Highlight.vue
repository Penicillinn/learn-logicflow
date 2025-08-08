<template>
  <div class="container" id="highlight"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { Highlight } from '@logicflow/extension'
import store from '@/store'

// 注册插件
// LogicFlow.use(Highlight)

const route = useRoute()

defineOptions({
  name: 'HighlightDemo',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#highlight') as HTMLElement,
    grid: true,
    snapline: true,
    keyboard: {
      enabled: true,
    },
    plugins: [Highlight], // 也可以在这里直接配置
  })

  lf.render(store.state.currentData)
  lf.extension.highlight.setMode('single')
  // lf.extension.highlight.highlightPath([
  // 'start',
  // 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
  // 'approveDept',
  // ])
  // lf.extension.highlight.highlight('start')
  // lf.extension.highlight.highlight('3037be41-5682-4344-b94a-9faf5c3e62ba')
  // lf.extension.highlight.highlight('approveDept')
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
