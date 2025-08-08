import { RectNode, RectNodeModel } from '@logicflow/core'

class CustomNode extends RectNode {}

class TaskModel extends RectNodeModel {
  // 初始化时设置自定义字段
  initNodeData(data) {
    super.initNodeData(data)
    this.customStatus = data.customStatus || 1
    this.customData = data.customData || {}
  }

  // 获取数据时包含自定义字段
  getData() {
    const data = super.getData()
    return {
      ...data,
      customStatus: this.customStatus,
      customData: this.customData,
    }
  }

  getTextStyle() {
    const style = super.getTextStyle()
    if (this.customStatus === 1) {
      style.color = 'red'
    } else {
      style.color = 'blue'
    }
    return style
  }
}

export default {
  type: 'custom-field-rect',
  view: CustomNode,
  model: TaskModel,
}
