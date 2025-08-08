<template>
  <div class="container" id="minimap"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { MiniMap } from '@logicflow/extension'

const route = useRoute()

defineOptions({
  name: 'MinimapDemo',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#minimap') as HTMLElement,
    grid: true,
    plugins: [MiniMap],
    pluginsOptions: {
      miniMap: {
        isShowHeader: false,
        isShowCloseIcon: true,
        headerTitle: 'MiniMap',
        width: 200,
        height: 120,
      },
    },
  })
  const nodes: LogicFlow.NodeConfig[] = []
  const edges: LogicFlow.EdgeConfig[] = []

  for (let i = 0; i < 200; i++) {
    const nodeStartId = `${i * 2 + 1}`
    const nodeEndId = `${i * 2 + 2}`
    const nodeStart: LogicFlow.NodeConfig = {
      id: nodeStartId,
      type: 'rect',
      x: 400 * (i % 10) - 200,
      y: 100 * Math.floor(i / 10) - 500,
      text: `${i}-start`,
    }
    const nodeEnd: LogicFlow.NodeConfig = {
      id: nodeEndId,
      type: 'rect',
      x: 400 * (i % 10),
      y: 100 * Math.floor(i / 10) - 500,
      text: `${i}-end`,
    }
    const edge: LogicFlow.EdgeConfig = {
      id: `e_${i}`,
      type: 'polyline',
      sourceNodeId: nodeStartId,
      targetNodeId: nodeEndId,
    }
    nodes.push(nodeStart)
    nodes.push(nodeEnd)
    edges.push(edge)
  }

  lf.render({
    nodes,
    edges,
  })

  lf.extension.miniMap.show()
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
