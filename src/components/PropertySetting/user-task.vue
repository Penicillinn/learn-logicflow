<template>
  <div>
    <el-form ref="formRef" :model="form" label-width="120px" size="default">
      <slot name="form-item-task-displayName" :model="form" field="displayName">
        <el-form-item label="显示名称">
          <el-input v-model="form.displayName"></el-input>
        </el-form-item>
      </slot>
      <slot name="form-item-task-taskType" :model="form" field="taskType">
        <el-form-item label="审批人">
          <el-select v-model="form.taskType">
            <el-option value="Major" label="张三"></el-option>
            <el-option value="Aidant" label="李四"></el-option>
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-performType" :model="form" field="performType">
        <el-form-item label="参与类型">
          <el-select v-model="form.performType">
            <el-option value="ANY" label="普通参与"></el-option>
            <el-option value="ALL" label="会签参与"></el-option>
          </el-select>
        </el-form-item>
      </slot>
      <slot name="form-item-task-width" :model="form" field="width">
        <el-form-item label="宽度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.width"></el-input-number>
        </el-form-item>
      </slot>
      <slot name="form-item-task-height" :model="form" field="height">
        <el-form-item label="高度">
          <el-input-number :step="5" :step-strictly="true" v-model="form.height"></el-input-number>
        </el-form-item>
      </slot>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElInputNumber } from 'element-plus'
import { reactive, ref, watch, defineProps, onMounted, defineEmits, computed } from 'vue'
import { FlowFormModel } from '../types'
// 注意:ref不能与model一样，相同的话表单双向绑定将会失效
const formRef = ref(null)
const form = reactive<FlowFormModel>({} as FlowFormModel)
// 定义属性
const props = defineProps<{
  modelValue: FlowFormModel
  extendAttrConfig: {
    // 扩展属性配置
    type: Object
  }
}>()
const mDropdownData = [
  {
    label: '用户标识',
    name: 'userKey',
    icon: '',
    tips: '参与者处理类可根据用户标识获取参与者',
  },
  {
    label: '用户组标识',
    name: 'groupKey',
    icon: '',
    tips: '参与者处理类可根据用户组标识获取参与者',
  },
  {
    label: '候选用户',
    name: 'candidateUsers',
    icon: '',
    tips: '候选用户(提供给上一节点选择下一节点参与者的用户标识)',
  },
  {
    label: '候选用户组',
    name: 'candidateGroups',
    icon: '',
    tips: '候选用户组(提供给上一节点选择下一节点参与者的用户组标识)',
  },
  {
    label: '候选人处理类',
    name: 'candidateHandler',
    icon: '',
    tips: '获取候选人的处理类',
  },
  {
    label: '额外属性1',
    name: 'attr1',
    icon: '',
    tips: '其他扩展属性1',
  },
  {
    label: '额外属性2',
    name: 'attr2',
    icon: '',
    tips: '其他扩展属性2',
  },
  {
    label: '额外属性3',
    name: 'attr3',
    icon: '',
    tips: '其他扩展属性3',
  },
]
const performTypeAttrs = [
  {
    label: '会签类型',
    name: 'countersignType',
    icon: '',
    tips: '参数类型为会签参与时生效',
    disabled: true,
  },
  {
    label: '会签完成条件',
    name: 'countersignCompletionCondition',
    disabled: true,
    icon: '',
    tips: '参数类型为会签参与时生效',
  },
]
const dropdownData = computed<Array<any>>(() => {
  const { extendAttrConfig }: any = props
  let res = []
  if (!extendAttrConfig || !extendAttrConfig.items || !extendAttrConfig.items.length) {
    res = mDropdownData
  } else {
    res = extendAttrConfig.items
  }
  if (form.performType === 'ALL') {
    return [...performTypeAttrs, ...res]
  }
  return res
})
const attrList = computed(() => {
  if (!form.field) {
    return []
  }
  // 会签相关属性
  const performTypeAttrs: Array<any> = []
  if (form.performType === 'ALL') {
    performTypeAttrs.push({
      key: 'countersignType',
      value: form.field.countersignType,
      disabled: true,
    })
    performTypeAttrs.push({
      key: 'countersignCompletionCondition',
      value: form.field.countersignCompletionCondition,
      disabled: true,
    })
  }
  return [
    ...performTypeAttrs,
    ...Object.keys(form.field)
      .filter((key: string) => !performTypeAttrs.map((item) => item.key).includes(key))
      .map((key) => {
        return {
          key: key,
          value: form.field[key],
        }
      }),
  ]
})
const emits = defineEmits(['update:modelValue'])
// 监听表单属性
watch(
  () => form,
  () => {
    emits('update:modelValue', Object.assign(props.modelValue, form))
  },
  { deep: true },
)

watch(
  () => form.performType,
  () => {
    // 设置countersignType默认值
    if (form.performType === 'ALL' && !form.field.countersignType) {
      form.field.countersignType = 'PARALLEL'
    }
    if (form.performType !== 'ALL' && form.field) {
      performTypeAttrs.forEach((item) => {
        delete form.field[item.name]
      })
    }
  },
)
onMounted(() => {
  if (props.modelValue.field) {
    if (typeof props.modelValue.field === 'string') {
      Object.assign(form, props.modelValue, { field: JSON.parse(props.modelValue.field) })
    } else {
      Object.assign(form, props.modelValue)
    }
  } else {
    Object.assign(form, props.modelValue, { field: {} })
  }
})
</script>
