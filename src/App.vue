<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <SiderMenu />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
      <el-aside v-if="showJsonPretty" width="300px">
        <JsonPretty :jsonData="store.state.currentData" />
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'
import SiderMenu from '@/components/SiderMenu.vue'
import JsonPretty from '@/components/JsonPretty.vue'
import store from './store'

const route = useRoute()
const showJsonPretty = ref(true)

watch(
  () => route.name,
  (value) => {
    if (['background', 'theme', 'grid', 'menu', 'control', 'adapter', 'process'].includes(value)) {
      showJsonPretty.value = false
    } else {
      showJsonPretty.value = true
    }
  },
)

defineOptions({
  name: 'App',
})
</script>

<style scoped>
/* 样式内容 */
.common-layout {
  height: 100%;
}
.el-container {
  height: 100%;
}
</style>
