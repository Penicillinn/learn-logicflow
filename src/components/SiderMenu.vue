<template>
  <div class="sider-menu">
    <el-menu :default-active="active" router @select="handleSelect">
      <el-menu-item v-for="item in visibleRoutes" :key="item.path" :index="item.path">
        <span>{{ item.meta.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const routes = router.getRoutes()

defineOptions({
  name: 'SiderMenu',
})

const active = ref('/node')

const handleSelect = (key: string) => {
  active.value = key
}

const visibleRoutes = computed(() => routes.filter((item) => !item.meta?.hidden))

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
