<template>
  <div class="container" id="htmlNode"></div>
  <TeleportContainer :flow-id="flowId" />
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import store from '@/store'
import CustomHtmlNode from '@/views/custom/html'
import VueHtmlNodeModel from '@/views/custom/html/vue'
import '@/views/custom/html/html.scss'
import { register, getTeleport } from '@logicflow/vue-node-registry'
import ProgressNode from '@/components/ProgressNode.vue'

const route = useRoute()
const TeleportContainer = getTeleport()
const flowId = ref('')

defineOptions({
  name: 'MoveRules',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#htmlNode') as HTMLElement,
    grid: true,
  })

  lf.register(CustomHtmlNode)
  lf.register(VueHtmlNodeModel)

  // 注册自定义 vue 节点
  register(
    {
      type: 'custom-vue-node',
      component: ProgressNode,
    },
    lf,
  )

  lf.on('graph:rendered', ({ graphModel }) => {
    flowId.value = graphModel.flowId!
  })

  // 监听节点和边的增删改事件
  const syncData = () => {
    const data = lf.getGraphRawData() // 或 getData()
    if (data) {
      store.state.currentData = data // 或通过 mutation 更新
    }
  }
  lf.on('custom:button-click', (model: any) => {
    lf.setProperties(model.id, {
      body: 'html 节点更新',
    })
    syncData()
  })
  lf.on('custom:onBtnClick', (model) => {
    lf.setProperties(model.id, {
      name: 'Vue 节点更新',
    })
    syncData()
  })
  lf.on('node:property-change', ({ node, progress }) => {
    lf.setProperties(node.id, {
      progress,
    })
    syncData()
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
