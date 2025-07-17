<template>
  <div class="container" id="background"></div>
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
    container: document.querySelector('#background') as HTMLElement,
    background: {
      backgroundImage: 'url(bg.png)',
      backgroundRepeat: 'repeat',
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
