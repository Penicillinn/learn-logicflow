<template>
  <el-button @click="handleExport">导出图片</el-button>
  <div class="container" id="snapshot"></div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { Snapshot } from '@logicflow/extension'

const route = useRoute()

defineOptions({
  name: 'SnapshotDemo',
})

const instance = ref(null)

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#snapshot') as HTMLElement,
    grid: true,
    plugins: [Snapshot],
  })
  instance.value = lf
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

function handleExport() {
  instance.value.getSnapshot('流程图', {
    partial: true,
  })
}

onMounted(init)
</script>

<style scoped>
/* 样式内容 */
.container {
  height: 100%;
  width: 100%;
}
</style>
