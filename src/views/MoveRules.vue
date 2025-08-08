<template>
  <div class="container" id="event"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'
import MovableNode from '@/views/custom/movable'
import CustomNode from '@/views/custom/move-group'

const route = useRoute()

defineOptions({
  name: 'MoveRules',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#event') as HTMLElement,
    grid: true,
  })

  lf.register(MovableNode)
  lf.register(CustomNode)

  lf.graphModel.addNodeMoveRules((model, deltaX, deltaY) => {
    if (model.isGroup && model.children) {
      // 如果移动的是分组，那么分组的子节点也跟着移动。
      // TODO: 确定 model.children 的类型
      lf.graphModel.moveNodes(model.children, deltaX, deltaY, true)
    }
    return true
  })

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
