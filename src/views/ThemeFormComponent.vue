<template>
  <el-form :model="formModel" label-width="90px" size="small">
    <!-- 渲染基础字段 -->
    <template v-for="fieldName in themeConfig?.fields || []" :key="fieldName">
      <el-form-item
        v-if="fieldTypeConfigs[fieldName]"
        :label="fieldTypeConfigs[fieldName]?.label"
        :prop="fieldName"
      >
        <el-color-picker
          v-if="fieldTypeConfigs[fieldName]?.type === 'color'"
          v-model="formModel[fieldName]"
          show-alpha
          size="small"
          @change="onValuesChange"
        />
        <el-input-number
          v-else-if="fieldTypeConfigs[fieldName]?.type === 'number'"
          v-model="formModel[fieldName]"
          :min="fieldTypeConfigs[fieldName]?.min"
          :max="fieldTypeConfigs[fieldName]?.max"
          :step="fieldTypeConfigs[fieldName]?.step"
          size="small"
          @change="onValuesChange"
        />
        <el-select
          v-else-if="fieldTypeConfigs[fieldName]?.type === 'select'"
          v-model="formModel[fieldName]"
          size="small"
          @change="onValuesChange"
        >
          <el-option
            v-for="opt in fieldTypeConfigs[fieldName]?.options"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          />
        </el-select>
        <el-input
          v-else-if="fieldTypeConfigs[fieldName]?.type === 'text'"
          v-model="formModel[fieldName]"
          :placeholder="fieldTypeConfigs[fieldName]?.placeholder"
          @change="onValuesChange"
        />
      </el-form-item>
    </template>
    <!-- 渲染嵌套字段 -->
    <template v-if="themeConfig?.nestedFields">
      <div
        v-for="(nestedFieldNames, nestedKey) in themeConfig?.nestedFields || {}"
        :key="nestedKey"
        style="margin-top: 16px; padding: 12px; background: #f9f9f9; border-radius: 6px"
      >
        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: bold">
          {{ getNestedKeyLabel(nestedKey) }}
        </h4>
        <template v-for="fieldName in nestedFieldNames" :key="`${nestedKey}.${fieldName}`">
          <el-form-item
            v-if="fieldTypeConfigs[fieldName]"
            :label="fieldTypeConfigs[fieldName]?.label"
            :prop="`${nestedKey}.${fieldName}`"
          >
            <el-color-picker
              v-if="fieldTypeConfigs[fieldName]?.type === 'color'"
              v-model="(formModel[nestedKey] || (formModel[nestedKey] = {}))[fieldName]"
              show-alpha
              size="small"
              @change="onValuesChange"
            />
            <el-input-number
              v-else-if="fieldTypeConfigs[fieldName]?.type === 'number'"
              v-model="(formModel[nestedKey] || (formModel[nestedKey] = {}))[fieldName]"
              :min="fieldTypeConfigs[fieldName]?.min"
              :max="fieldTypeConfigs[fieldName]?.max"
              :step="fieldTypeConfigs[fieldName]?.step"
              size="small"
              @change="onValuesChange"
            />
            <el-select
              v-else-if="fieldTypeConfigs[fieldName]?.type === 'select'"
              v-model="(formModel[nestedKey] || (formModel[nestedKey] = {}))[fieldName]"
              size="small"
              @change="onValuesChange"
            >
              <el-option
                v-for="opt in fieldTypeConfigs[fieldName]?.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              />
            </el-select>
            <el-input
              v-else-if="fieldTypeConfigs[fieldName]?.type === 'text'"
              v-model="(formModel[nestedKey] || (formModel[nestedKey] = {}))[fieldName]"
              :placeholder="fieldTypeConfigs[fieldName]?.placeholder"
              @change="onValuesChange"
            />
          </el-form-item>
        </template>
      </div>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
const fieldTypeConfigs: Record<string, any> = {
  fill: { type: 'color', label: '填充颜色' },
  stroke: { type: 'color', label: '边框颜色' },
  color: { type: 'color', label: '文字颜色' },
  background: { type: 'color', label: '背景颜色' },
  strokeWidth: { type: 'number', label: '边框宽度', min: 0, step: 1 },
  radius: { type: 'number', label: '圆角半径', min: 0, step: 1 },
  r: { type: 'number', label: '半径', min: 0, step: 1 },
  fontSize: { type: 'number', label: '字体大小', min: 8, step: 1 },
  textWidth: { type: 'number', label: '文本宽度', min: 50, step: 10 },
  lineHeight: { type: 'number', label: '行高', min: 1, step: 0.1 },
  offset: { type: 'number', label: '箭头偏移', min: 0, step: 1 },
  verticalLength: { type: 'number', label: '箭头垂直长度', min: 0, step: 1 },
  refX: { type: 'number', label: '参考X', step: 1 },
  refY: { type: 'number', label: '参考Y', step: 1 },
  fillOpacity: { type: 'number', label: '填充透明度', min: 0, max: 1, step: 0.1 },
  backgroundOpacity: { type: 'number', label: '背景透明度', min: 0, max: 1, step: 0.1 },
  size: { type: 'number', label: '网格大小', min: 1, step: 1 },
  thickness: { type: 'number', label: '网格线宽度', min: 1, step: 1 },
  visible: {
    type: 'select',
    label: '是否可见',
    options: [
      { label: '显示', value: true },
      { label: '隐藏', value: false },
    ],
  },
  type: {
    type: 'select',
    label: '网格类型',
    options: [
      { label: '点状网格', value: 'dot' },
      { label: '交叉线网格', value: 'mesh' },
    ],
  },
  overflowMode: {
    type: 'select',
    label: '溢出模式',
    options: [
      { label: '默认', value: 'default' },
      { label: '自动换行', value: 'autoWrap' },
      { label: '省略号', value: 'ellipsis' },
    ],
  },
  textAnchor: {
    type: 'select',
    label: '文本对齐',
    options: [
      { label: '左对齐', value: 'start' },
      { label: '居中', value: 'middle' },
      { label: '右对齐', value: 'end' },
    ],
  },
  startArrowType: {
    type: 'select',
    label: '起始箭头',
    options: [
      { label: '无', value: 'none' },
      { label: '实心', value: 'solid' },
      { label: '空心', value: 'hollow' },
      { label: '菱形', value: 'diamond' },
      { label: '圆形', value: 'circle' },
    ],
  },
  endArrowType: {
    type: 'select',
    label: '结束箭头',
    options: [
      { label: '无', value: 'none' },
      { label: '实心', value: 'solid' },
      { label: '空心', value: 'hollow' },
      { label: '菱形', value: 'diamond' },
      { label: '圆形', value: 'circle' },
    ],
  },
  fontFamily: {
    type: 'select',
    label: '字体',
    options: [
      { label: '默认', value: 'inherit' },
      { label: '微软雅黑', value: 'Microsoft YaHei' },
      { label: '宋体', value: 'SimSun' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Times New Roman', value: 'Times New Roman' },
    ],
  },
  fontWeight: {
    type: 'select',
    label: '字重',
    options: [
      { label: '正常', value: 'normal' },
      { label: '粗体', value: 'bold' },
      { label: '细体', value: 'lighter' },
    ],
  },
  strokeDasharray: { type: 'text', label: '虚线样式', placeholder: '如: 5,5' },
  backgroundImage: {
    type: 'text',
    label: '背景图片',
    placeholder: "输入链接，格式：url('图片链接')",
  },
  backgroundSize: {
    type: 'text',
    label: '背景尺寸',
    placeholder: '如: cover, contain, 100px 50px',
  },
  filter: { type: 'text', label: '滤镜', placeholder: '如: blur(2px)' },
}
const props = defineProps<{ themeKey: string; themeConfig: any; initialValues: any }>()
const emit = defineEmits(['formChange'])
const formModel = reactive({ ...props.initialValues })
watch(
  () => props.initialValues,
  (val) => {
    Object.assign(formModel, val || {})
  },
  { immediate: true, deep: true },
)
function onValuesChange() {
  emit('formChange', props.themeKey, { ...formModel }, { ...formModel })
}
const nestedKeyLabelMap: Record<string, string> = {
  background: '背景样式',
  hover: '悬停样式',
  adjustLine: '调整线样式',
  adjustAnchor: '调整锚点样式',
  wrapPadding: '内边距',
  config: '网格样式',
}
function getNestedKeyLabel(key: string) {
  return nestedKeyLabelMap[key] || key
}
</script>
