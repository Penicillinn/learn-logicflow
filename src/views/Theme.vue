<template>
  <div style="display: flex; height: 100vh; width: 100%">
    <!-- 左侧画布 -->
    <div style="background: #f0f2f5">
      <div style="padding: 16px">
        <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center">
          <span>主题模式:</span>
          <el-select v-model="themeMode" style="width: 200px" @change="handleThemeModeChange">
            <el-option
              v-for="item in themeModeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div ref="containerRef" id="LF-theme" />
    </div>
    <!-- 右侧表单面板 -->
    <div style="background: #fff; border-left: 1px solid #e8e8e8; overflow: auto">
      <div style="padding: 16px">
        <h3 style="margin: 0 0 16px 0">主题配置</h3>
        <el-tabs type="card" tab-position="top">
          <el-tab-pane
            v-for="(category, categoryKey) in themeCategories"
            :key="categoryKey"
            :label="category.label"
          >
            <div style="max-height: calc(100vh - 200px); overflow: auto">
              <div
                v-for="item in category.items"
                :key="item.key"
                style="
                  margin-bottom: 24px;
                  padding: 16px;
                  border: 1px solid #f0f0f0;
                  border-radius: 8px;
                "
              >
                <h4 style="margin: 0 0 12px 0; color: #666; font-size: 13px">{{ item.label }}</h4>
                <ThemeFormComponent
                  :themeKey="item.key"
                  :themeConfig="item"
                  :initialValues="formValues[item.key] || {}"
                  @formChange="handleFormChange"
                />
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, nextTick, defineAsyncComponent } from 'vue'
import LogicFlow from '@logicflow/core'
import '@logicflow/core/es/index.css'
import '@logicflow/extension/es/index.css'
import { ElButton, ElSelect, ElOption, ElTabs, ElTabPane, ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'

// 类型定义
interface ThemeConfig {
  label: string
  category: 'basic' | 'node' | 'edge' | 'text' | 'other' | 'canvas'
  fields: string[]
  nestedFields?: Record<string, string[]>
}

type FormValues = Record<string, any>

// 主题配置项定义
const themeFieldConfigs: Record<string, ThemeConfig> = {
  // 基础主题
  baseNode: {
    label: '基础节点',
    category: 'basic',
    fields: ['fill', 'stroke', 'strokeWidth', 'radius'],
  },
  baseEdge: {
    label: '基础边',
    category: 'basic',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray', 'startArrowType', 'endArrowType'],
  },

  // 画布配置
  background: {
    label: '画布背景',
    category: 'canvas',
    fields: [
      'background',
      'backgroundImage',
      'backgroundRepeat',
      'backgroundPosition',
      'backgroundSize',
      'backgroundOpacity',
      'filter',
    ],
  },
  grid: {
    label: '网格配置',
    category: 'canvas',
    fields: ['size', 'visible', 'type'],
    nestedFields: {
      config: ['color', 'thickness'],
    },
  },

  // 节点主题
  rect: {
    label: '矩形节点',
    category: 'node',
    fields: ['fill', 'stroke', 'strokeWidth', 'radius'],
  },
  circle: {
    label: '圆形节点',
    category: 'node',
    fields: ['fill', 'stroke', 'strokeWidth'],
  },
  diamond: {
    label: '菱形节点',
    category: 'node',
    fields: ['fill', 'stroke', 'strokeWidth', 'radius'],
  },
  ellipse: {
    label: '椭圆节点',
    category: 'node',
    fields: ['fill', 'stroke', 'strokeWidth'],
  },
  polygon: {
    label: '多边形节点',
    category: 'node',
    fields: ['fill', 'stroke', 'strokeWidth', 'radius'],
  },

  // 边主题
  line: {
    label: '直线',
    category: 'edge',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray', 'startArrowType', 'endArrowType'],
  },
  polyline: {
    label: '折线',
    category: 'edge',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray', 'startArrowType', 'endArrowType'],
  },
  bezier: {
    label: '贝塞尔曲线',
    category: 'edge',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray', 'startArrowType', 'endArrowType'],
    nestedFields: {
      adjustLine: ['stroke', 'strokeWidth'],
      adjustAnchor: ['r', 'fill', 'stroke', 'strokeWidth'],
    },
  },
  anchorLine: {
    label: '锚点连线',
    category: 'edge',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray'],
  },

  // 文本主题
  text: {
    label: '文本节点',
    category: 'text',
    fields: ['color', 'fontSize', 'fontFamily', 'fontWeight'],
    nestedFields: {
      background: ['fill', 'stroke', 'strokeWidth', 'radius'],
    },
  },
  nodeText: {
    label: '节点文本',
    category: 'text',
    fields: [
      'color',
      'fontSize',
      'fontFamily',
      'fontWeight',
      'textWidth',
      'overflowMode',
      'lineHeight',
      'textAnchor',
    ],
    nestedFields: {
      background: ['fill', 'stroke', 'strokeWidth', 'radius'],
      wrapPadding: ['top', 'right', 'bottom', 'left'],
    },
  },
  edgeText: {
    label: '边文本',
    category: 'text',
    fields: ['color', 'fontSize', 'fontFamily', 'fontWeight', 'textWidth', 'overflowMode'],
    nestedFields: {
      background: ['fill', 'stroke', 'strokeWidth', 'radius', 'wrapPadding'],
    },
  },

  // 其他元素主题
  anchor: {
    label: '锚点',
    category: 'other',
    fields: ['r', 'fill', 'stroke', 'strokeWidth'],
    nestedFields: {
      hover: ['r', 'fill', 'stroke', 'strokeWidth', 'fillOpacity'],
    },
  },
  arrow: {
    label: '箭头',
    category: 'other',
    fields: [
      'offset',
      'verticalLength',
      'refX',
      'refY',
      'fill',
      'stroke',
      'strokeWidth',
      'strokeLinecap',
      'strokeLinejoin',
      'startArrowType',
      'endArrowType',
    ],
  },
  snapline: {
    label: '对齐线',
    category: 'other',
    fields: ['stroke', 'strokeWidth', 'strokeDasharray'],
  },
  outline: {
    label: '选中外框',
    category: 'other',
    fields: ['fill', 'stroke', 'strokeWidth', 'strokeDasharray', 'radius'],
    nestedFields: {
      hover: ['stroke', 'strokeWidth'],
    },
  },
}

// 独立的表单组件移到 ThemeFormComponent.vue 文件，主文件中用 import ThemeFormComponent from './ThemeFormComponent.vue' 并注册。
// 这里直接用 defineAsyncComponent 注册 ThemeFormComponent。
const ThemeFormComponent = defineAsyncComponent(() => import('./ThemeFormComponent.vue'))

// 主题分类
const themeCategories = reactive<
  Record<string, { label: string; items: { key: string; [key: string]: unknown }[] }>
>({
  basic: { label: '基础主题', items: [] },
  node: { label: '节点主题', items: [] },
  edge: { label: '边主题', items: [] },
  text: { label: '文本主题', items: [] },
  other: { label: '其他元素', items: [] },
  canvas: { label: '画布配置', items: [] },
})
Object.entries(themeFieldConfigs).forEach(([key, config]) => {
  themeCategories[config.category].items.push({ key, ...config })
})

// 主题模式
const themeModeList = ref<{ label: string; value: string }[]>([
  { label: '默认主题', value: 'default' },
  { label: '圆角主题', value: 'radius' },
  { label: '彩色主题', value: 'colorful' },
  { label: '暗黑主题', value: 'dark' },
])
const themeMode = ref('default')
const formValues = reactive<Record<string, Record<string, unknown>>>({})
const modifiedThemes = ref<Set<string>>(new Set<string>())
const lfRef = ref<LogicFlow | null>(null)
const containerRef = ref<HTMLElement | null>(null)

// 处理表单变更
function handleFormChange(
  themeKey: string,
  changedValues: Record<string, unknown>,
  allValues: Record<string, unknown>,
) {
  console.log('>>>>>>themeKey', themeKey)
  console.log('>>>>>>allValues', allValues)

  const processedValues = { ...allValues }
  // 处理颜色值
  const processColorValues = (obj: Record<string, unknown>) => {
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === 'object') {
        if ((obj[key] as any)._h || (obj[key] as any)._a) {
          // element-plus color-picker v-model 直接是字符串
        } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          processColorValues(obj[key] as Record<string, unknown>)
        }
      }
    }
  }
  processColorValues(processedValues)

  // 特殊处理背景和网格配置
  if (themeKey === 'background' && lfRef.value) {
    lfRef.value.graphModel.updateBackgroundOptions(processedValues)
  } else if (themeKey === 'grid' && lfRef.value) {
    const gridOptions = {
      ...processedValues,
      config: processedValues.config
        ? {
            color: (processedValues.config as any).color,
            thickness: (processedValues.config as any).thickness,
          }
        : undefined,
    }
    Object.keys(gridOptions).forEach((key) => {
      if (gridOptions[key] === undefined) {
        delete gridOptions[key]
      }
    })
    lfRef.value.graphModel.updateGridOptions(gridOptions)
  } else if (lfRef.value) {
    // 其它主题项，实时 setTheme
    lfRef.value.setTheme({ [themeKey]: processedValues }, themeMode.value)
  }

  modifiedThemes.value = new Set([...modifiedThemes.value, themeMode.value])
  formValues[themeKey] = processedValues
}

// 主题切换
function handleThemeModeChange(mode: string) {
  if (!lfRef.value) return
  const modifiedThemesArray = Array.from(modifiedThemes.value)
  if (modifiedThemesArray.includes(themeMode.value)) {
    const currentTheme = lfRef.value.getTheme()
    const modifiedConfig = Object.entries(formValues).reduce(
      (acc, [key, value]) => {
        if (value && Object.keys(value).length > 0) {
          acc[key] = value
        }
        return acc
      },
      {} as Record<string, any>,
    )
    LogicFlow.addThemeMode?.(themeMode.value, {
      ...currentTheme,
      ...modifiedConfig,
    })
  }
  lfRef.value.setTheme({}, mode)
  themeMode.value = mode
  const newTheme = lfRef.value.getTheme()
  const newFormValues: FormValues = {}
  Object.entries(themeFieldConfigs).forEach(([themeKey]) => {
    if (themeKey === 'background') {
      if (lfRef.value?.graphModel.background) {
        newFormValues[themeKey] = lfRef.value.graphModel.background
      }
    } else if (themeKey === 'grid') {
      if (lfRef.value?.graphModel.grid) {
        newFormValues[themeKey] = lfRef.value.graphModel.grid
      }
    } else if (newTheme[themeKey as keyof typeof newTheme]) {
      newFormValues[themeKey] = newTheme[themeKey as keyof typeof newTheme]
    }
  })
  Object.keys(formValues).forEach((k) => delete formValues[k])
  nextTick(() => {
    Object.assign(formValues, newFormValues)
  })
}

// 初始化 LogicFlow
onMounted(() => {
  if (!lfRef.value) {
    const config = {
      container: {
        id: 'LF-theme',
      },
      width: 700,
      height: 600,
      background: {
        backgroundImage:
          'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZTBlMGUwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=)',
        backgroundRepeat: 'repeat',
        backgroundSize: '40px 40px',
      },
      grid: {
        size: 20,
        visible: true,
        type: 'dot',
        config: {
          color: '#ababab',
          thickness: 1,
        },
      },
    }
    const data = {
      nodes: [
        { id: '1', type: 'rect', x: 150, y: 100, text: '矩形', properties: { radius: 8 } },
        { id: '2', type: 'circle', x: 350, y: 100, text: '圆形' },
        { id: '3', type: 'ellipse', x: 550, y: 100, text: '椭圆' },
        { id: '4', type: 'polygon', x: 150, y: 250, text: '多边形' },
        { id: '5', type: 'diamond', x: 350, y: 250, text: '菱形' },
        { id: '6', type: 'text', x: 550, y: 250, text: '纯文本节点' },
        { id: '7', type: 'html', x: 150, y: 400, text: 'html节点' },
      ],
      edges: [
        { id: 'e_1', type: 'polyline', sourceNodeId: '1', targetNodeId: '2' },
        { id: 'e_2', type: 'polyline', sourceNodeId: '2', targetNodeId: '3' },
        { id: 'e_3', type: 'polyline', sourceNodeId: '4', targetNodeId: '5' },
      ],
    }
    const lf = new LogicFlow({
      ...config,
      container: containerRef.value as HTMLElement,
      height: 600,
      width: 600,
      multipleSelectKey: 'shift',
      disabledTools: ['multipleSelect'],
      autoExpand: true,
      adjustEdgeStartAndEnd: true,
      allowRotate: true,
      edgeTextEdit: true,
      keyboard: {
        enabled: true,
      },
      partial: true,
      edgeTextDraggable: true,
      edgeType: 'bezier',
      idGenerator(type: string) {
        return type + '_' + Math.random()
      },
      edgeGenerator: (sourceNode: any) => {
        if (['rect', 'diamond', 'polygon'].includes(sourceNode.type)) return 'bezier'
        return 'polyline'
      },
    })
    lf.render(data)
    lf.translateCenter()
    lfRef.value = lf
    setTimeout(() => {
      const currentTheme = lf.getTheme()
      const graphModel = lf.graphModel
      const mappedFormValues: FormValues = {}
      Object.keys(themeFieldConfigs).forEach((themeKey) => {
        if (themeKey === 'background') {
          if (graphModel.background && typeof graphModel.background === 'object') {
            mappedFormValues[themeKey] = graphModel.background
          }
        } else if (themeKey === 'grid') {
          if (graphModel.grid) {
            mappedFormValues[themeKey] = graphModel.grid
          }
        } else if (currentTheme[themeKey as keyof typeof currentTheme]) {
          mappedFormValues[themeKey] = currentTheme[themeKey as keyof typeof currentTheme]
        }
      })
      Object.assign(formValues, mappedFormValues)
    }, 100)
  }
})

// 主题切换时同步表单
watch(
  () => themeMode.value,
  (mode) => {
    if (lfRef.value) {
      lfRef.value.setTheme({}, mode)
      const modifiedThemesArray = Array.from(modifiedThemes.value)
      if (modifiedThemesArray.includes(mode)) {
        const modifiedConfig = Object.entries(formValues).reduce(
          (acc, [key, value]) => {
            if (value && Object.keys(value).length > 0) {
              acc[key] = value
            }
            return acc
          },
          {} as Record<string, any>,
        )
        if (Object.keys(modifiedConfig).length > 0) {
          lfRef.value.setTheme(modifiedConfig, mode)
        }
      }
    }
  },
)
</script>

<style scoped>
/* 可根据需要自定义样式 */
</style>
