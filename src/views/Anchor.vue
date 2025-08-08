<template>
  <div class="sql">
    <div class="container" id="anchor"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'
import { DndPanel, SelectionSelect, Control } from '@logicflow/extension'
import CustomSqlNode from '@/views/custom/sql'
import '@/views/custom/sql/index.scss'

LogicFlow.use(Control)

const route = useRoute()

defineOptions({
  name: 'AnchorDemo',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#anchor') as HTMLElement,
    grid: true,
    edgeType: 'bezier',
  })

  lf.register(CustomSqlNode)
  lf.setTheme({
    baseEdge: {
      stroke: '#afafaf',
      strokeWidth: 1,
    },
  })

  // lf.extension.control.addItem({
  //   key: 'control-see',
  //   iconClass: 'lf-control-see',
  //   title: '查看数据',
  //   text: '查看',
  //   onClick: (lf) => {
  //     console.log('lf>>', lf.getGraphRawData())
  //     console.log('lf222>>', lf.getGraphData())
  //   },
  // })

  // 监听节点和边的增删改事件
  const syncData = () => {
    const data = lf.getGraphRawData() // 或 getData()
    if (data) {
      store.state.currentData = data // 或通过 mutation 更新
    }
  }
  // 1.1.28新增，可以自定义锚点显示时机了
  lf.on('anchor:dragstart', ({ data, nodeModel }: any) => {
    console.log('dragstart', data)
    if (nodeModel.type === 'custom-sql-node') {
      lf.graphModel.nodes.forEach((node) => {
        // @ts-ignore
        if (node.type === 'custom-sql-node' && nodeModel.id !== node.id) {
          node.isShowAnchor = true
          node.setProperties({
            isConnection: true,
          })
        }
      })
    }
  })
  lf.on('anchor:dragend', ({ data, nodeModel }: any) => {
    console.log('dragend', data)
    if (nodeModel.type === 'custom-sql-node') {
      lf.graphModel.nodes.forEach((node) => {
        // @ts-ignore
        if (node.type === 'custom-sql-node' && nodeModel.id !== node.id) {
          node.isShowAnchor = false
          lf.deleteProperty(node.id, 'isConnection')
        }
      })
    }
  })
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
