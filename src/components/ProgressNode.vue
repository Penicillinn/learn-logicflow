<template>
  <div class="progress-node">
    <el-button type="primary" @click="handleAdd" style="margin-bottom: 10px">add</el-button>
    <el-input v-model="text"></el-input>
    <el-progress type="dashboard" :percentage="progress" :width="80">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
      </template>
    </el-progress>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressNode',
  inject: ['getNode', 'getGraph'],
  data() {
    return {
      progress: 0,
      text: '555',
    }
  },
  methods: {
    handleAdd() {
      const node = (this as any).getNode()
      const graph = (this as any).getGraph()
      if (this.progress >= 100) return
      this.progress += 10
      graph.eventCenter.emit('node:property-change', { node, progress: this.progress })
    },
  },
  mounted() {
    const node = this.getNode()
    this.progress = node.getProperties().progress
  },
})
</script>

<style lang="scss" scoped>
.progress-node {
  width: 100px;
  height: 200px;
}
</style>
