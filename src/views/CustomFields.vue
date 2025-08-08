<template>
  <div>
    <el-button @click="getData">获取数据</el-button>
    <el-button @click="addData">新增自定义字段</el-button>
    <el-button @click="setData">修改自定义字段</el-button>
    <el-button @click="setProperty">修改properties字段</el-button>
  </div>
  <div class="container" id="custom-fields"></div>
  <Modal ref="modelRef" />
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import Modal from '@/components/Modal.vue'
import store from '@/store'
import CustomFieldRect from '@/views/custom/field-rect'

const route = useRoute()

const instance = ref(null)
const modelRef = ref(null)

defineOptions({
  name: 'CustomFields',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#custom-fields') as HTMLElement,
    grid: true,
  })
  instance.value = lf

  lf.register(CustomFieldRect)
  lf.render(store.state.currentData)
}

watch(
  () => route.fullPath,
  () => {
    // 这里执行你的重置逻辑，比如重新初始化 LogicFlow
    init()
  },
)

function getData() {
  modelRef.value.toogleVisible(true, instance.value.getGraphRawData())
}

function setProperty() {
  instance.value.setProperties('node_id', {
    width: 200,
  })
  refrsh()
}

function refrsh() {
  const data = instance.value.getGraphRawData() // 或 getData()
  if (data) {
    store.state.currentData = data // 或通过 mutation 更新
  }
  instance.value.render(data)
}

function addData() {
  instance.value.updateAttributes('node_id', {
    customStatus: 1,
    customData: {
      name: 'Bob',
      age: 12,
    },
  })
  refrsh()
}

function setData() {
  instance.value.updateAttributes('node_id', {
    customStatus: 2,
    customData: {
      name: 'Bob',
      age: 12,
    },
  })
  refrsh()
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
