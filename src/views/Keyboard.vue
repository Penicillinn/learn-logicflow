<template>
  <div class="container" id="keyboard"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()

defineOptions({
  name: 'LogicFlowContainer',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#keyboard') as HTMLElement,
    grid: true,
    keyboard: {
      enabled: true,
      shortcuts: [
        {
          keys: ['backspace'],
          callback: () => {
            ElMessageBox.confirm('确认删除?', '警告', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            })
              .then(() => {
                const elements = lf.getSelectElements(true)
                lf.clearSelectElements()
                elements.edges.forEach((edge) => lf.deleteEdge(edge.id))
                elements.nodes.forEach((node) => lf.deleteNode(node.id))
                ElMessage({
                  type: 'success',
                  message: '删除完成',
                })
              })
              .catch(() => {
                ElMessage({
                  type: 'info',
                  message: '取消删除',
                })
              })
          },
        },
      ],
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
