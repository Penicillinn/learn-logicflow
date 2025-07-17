<template>
  <div class="container" id="menu"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu } from '@logicflow/extension'
import LogicFlow from '@logicflow/core'
import store from '@/store'

const route = useRoute()

defineOptions({
  name: 'LogicFlowContainer',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#menu') as HTMLElement,
    grid: true,
    // 注册组件
    plugins: [Menu],
  })

  // 自定义菜单
  lf.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
      {
        text: '属性',
        callback(node) {
          alert(`
              节点id：${node.id}
              节点类型：${node.type}
              节点坐标：(x: ${node.x}, y: ${node.y})
            `)
        },
      },
    ],
    edgeMenu: [
      {
        text: '属性',
        callback(edge) {
          const { id, type, startPoint, endPoint, sourceNodeId, targetNodeId } = edge
          alert(`
              边id：${id}
              边类型：${type}
              边起点坐标：(startPoint: [${startPoint.x}, ${startPoint.y}])
              边终点坐标：(endPoint: [${endPoint.x}, ${endPoint.y}])
              源节点id：${sourceNodeId}
              目标节点id：${targetNodeId}
            `)
        },
      },
    ],
    graphMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
    ],
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
