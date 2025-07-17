import { createStore } from 'vuex'
import router from '@/router'
import { configData } from '@/config'

// 假设 configData['node'] 的类型
type NodeConfig = { nodes: { id: string; type: string; x: number; y: number; text: string }[] }

// state 类型
interface State {
  currentData: NodeConfig
}

// to 类型（vue-router 路由对象）
import type { RouteLocationNormalized } from 'vue-router'

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      currentData: {},
    }
  },
  mutations: {
    SET_CURRENT_ROUTE(state: State, to: RouteLocationNormalized) {
      const key = to && typeof to.name === 'string' ? to.name : 'node'
      state.currentData = (configData as Record<string, NodeConfig>)[key] || configData['node']
    },
  },
})

// 添加全局路由守卫
router.beforeEach((to, from, next) => {
  store.commit('SET_CURRENT_ROUTE', to)
  next()
})

export default store
