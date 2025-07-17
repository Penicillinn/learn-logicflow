<template>
  <div class="container" id="container"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { Menu } from '@logicflow/extension'
import store from '@/store'
import CustomTask from '@/views/custom/task/index'
import CustomPolygon from '@/views/custom/polygon'
import CustomEdgeModel from '@/views/custom/edge'

const route = useRoute()

defineOptions({
  name: 'LogicFlowContainer',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#container') as HTMLElement,
    grid: true,
    // 注册组件
    plugins: [Menu],
  })
  // 注册自定义节点
  lf.register(CustomTask)
  lf.register(CustomPolygon)
  // 注册自定义边
  lf.register(CustomEdgeModel)

  lf.setProperties('1', { state: 'history' })

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

  // 修改对齐线样式
  lf.setTheme({
    snapline: {
      stroke: '#1E90FF', // 对齐线颜色
      strokeWidth: 2, // 对齐线宽度
    },
  })

  // 监听节点和边的增删改事件
  const syncData = () => {
    const data = lf.getGraphRawData() // 或 getData()
    if (data) {
      store.state.currentData = data // 或通过 mutation 更新
    }
  }
  lf.on('node:add', syncData)
  lf.on('node:delete', syncData)
  lf.on('node:drag', syncData)
  lf.on('edge:add', syncData)
  lf.on('edge:delete', syncData)
  lf.on('text:update', syncData)
  // lf.on('element:click', () => {
  //   ElMessage.success('节点单击')
  // })
  // lf.on('node:dragstart', () => {
  //   ElMessage.success('节点开始拖拽')
  // })

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
