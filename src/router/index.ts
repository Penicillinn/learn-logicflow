import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/connectedSourceRules',
      meta: {
        hidden: true,
      },
    },
    // {
    //   path: '/node',
    //   name: 'node',
    //   component: () => import('@/views/Content.vue'),
    //   meta: {
    //     name: '节点 Node',
    //   },
    // },
    // {
    //   path: '/customnode',
    //   name: 'customnode',
    //   component: () => import('@/views/Content.vue'),
    //   meta: {
    //     name: '自定义节点',
    //   },
    // },
    // {
    //   path: '/edge',
    //   name: 'edge',
    //   component: () => import('@/views/Content.vue'),
    //   meta: {
    //     name: '边 Edge',
    //   },
    // },
    // {
    //   path: '/customedge',
    //   name: 'customedge',
    //   component: () => import('@/views/Content.vue'),
    //   meta: {
    //     name: '自定义边',
    //   },
    // },
    // {
    //   path: '/theme',
    //   name: 'theme',
    //   component: () => import('@/views/Theme.vue'),
    //   meta: {
    //     name: '主题 Theme',
    //   },
    // },
    // {
    //   path: '/grid',
    //   name: 'grid',
    //   component: () => import('@/views/Grid.vue'),
    //   meta: {
    //     name: '网格 Grid',
    //   },
    // },
    // {
    //   path: '/background',
    //   name: 'background',
    //   component: () => import('@/views/Background.vue'),
    //   meta: {
    //     name: '背景 Background',
    //   },
    // },
    // {
    //   path: '/event',
    //   name: 'event',
    //   component: () => import('@/views/Event.vue'),
    //   meta: {
    //     name: '事件 Event',
    //   },
    // },
    // {
    //   path: '/menu',
    //   name: 'menu',
    //   component: () => import('@/views/Menu.vue'),
    //   meta: {
    //     name: '右键菜单 Menu',
    //   },
    // },
    // {
    //   path: '/dnd',
    //   name: 'dnd',
    //   component: () => import('@/views/DndPanel.vue'),
    //   meta: {
    //     name: '拖拽面板 DndPanel',
    //   },
    // },
    // {
    //   path: '/control',
    //   name: 'control',
    //   component: () => import('@/views/Control.vue'),
    //   meta: {
    //     name: '控制面板 Control',
    //   },
    // },
    // {
    //   path: '/adapter',
    //   name: 'adapter',
    //   component: () => import('@/views/Adapter.vue'),
    //   meta: {
    //     name: '数据转换 Adapt',
    //   },
    // },
    // {
    //   path: '/process',
    //   name: 'process',
    //   component: () => import('@/views/Process.vue'),
    //   meta: {
    //     name: '请假流程',
    //   },
    // },
    {
      path: '/connectedSourceRules',
      name: 'connectedSourceRules',
      component: () => import('@/views/ConnectedSourceRules.vue'),
      meta: {
        name: '连接源规则',
      },
    },
    {
      path: '/moveRules',
      name: 'moveRules',
      component: () => import('@/views/MoveRules.vue'),
      meta: {
        name: '移动',
      },
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('@/views/Group.vue'),
      meta: {
        name: '分组',
      },
    },
    {
      path: '/anchor',
      name: 'anchor',
      component: () => import('@/views/Anchor.vue'),
      meta: {
        name: '锚点',
      },
    },
    {
      path: '/htmlNode',
      name: 'htmlNode',
      component: () => import('@/views/HtmlNode.vue'),
      meta: {
        name: 'HTML 节点',
      },
    },
    {
      path: '/edgeAnimation',
      name: 'edgeAnimation',
      component: () => import('@/views/EdgeAnimation.vue'),
      meta: {
        name: '边动画',
      },
    },
    {
      path: '/snapline',
      name: 'snapline',
      component: () => import('@/views/Snapline.vue'),
      meta: {
        name: '对齐线',
      },
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: () => import('@/views/Keyboard.vue'),
      meta: {
        name: '快捷键',
      },
    },
    {
      path: '/highlight',
      name: 'highlight',
      component: () => import('@/views/Highlight.vue'),
      meta: {
        name: '高亮',
      },
    },
    {
      path: '/minimap',
      name: 'minimap',
      component: () => import('@/views/Minimap.vue'),
      meta: {
        name: '小地图',
      },
    },
    {
      path: '/snapshot',
      name: 'snapshot',
      component: () => import('@/views/Snapshot.vue'),
      meta: {
        name: '导出图片',
      },
    },
    {
      path: '/plugins',
      name: 'plugins',
      component: () => import('@/views/Plugins.vue'),
      meta: {
        name: '自定义插件',
      },
    },
    {
      path: '/customFields',
      name: 'customFields',
      component: () => import('@/views/CustomFields.vue'),
      meta: {
        name: '自定义字段',
      },
    },
  ],
})

export default router
