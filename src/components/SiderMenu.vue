<template>
  <div class="sider-menu">
    <el-menu :default-active="active" router @select="handleSelect">
      <el-menu-item index="/node">
        <span>节点 Node</span>
      </el-menu-item>
      <el-menu-item index="/customnode">
        <span>自定义节点</span>
      </el-menu-item>
      <el-menu-item index="/edge">
        <span>边 Edge</span>
      </el-menu-item>
      <el-menu-item index="/customedge">
        <span>自定义边</span>
      </el-menu-item>
      <el-menu-item index="/theme">
        <span>主题 Theme</span>
      </el-menu-item>
      <el-menu-item index="/grid">
        <span>网格 Grid</span>
      </el-menu-item>
      <el-menu-item index="/background">
        <span>背景 Background</span>
      </el-menu-item>
      <el-menu-item index="/event">
        <span>事件 Event</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <span>右键菜单 Menu</span>
      </el-menu-item>
      <el-menu-item index="/dnd">
        <span>拖拽面板 DndPanel</span>
      </el-menu-item>
      <el-menu-item index="/control">
        <span>控制面板 Control</span>
      </el-menu-item>
      <el-menu-item index="/adapter">
        <span>数据转换 Adapt</span>
      </el-menu-item>
      <el-menu-item index="/process">
        <span>请假流程</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineOptions({
  name: 'SiderMenu',
})

const active = ref('/node')

const handleSelect = (key: string) => {
  active.value = key
}

onMounted(() => {
  active.value = route.path
})
</script>

<style lang="css" scoped>
/* 样式内容 */
.sider-menu {
  height: 100%;
}
.el-menu {
  height: 100%;
}
</style>
