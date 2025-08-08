import { dynamicGroup } from '@logicflow/extension'

class MyGroup extends dynamicGroup.view {}

class MyGroupModel extends dynamicGroup.model {
  setAttributes() {
    this.collapsible = false
  }

  getNodeStyle() {
    const style = super.getNodeStyle()
    style.stroke = '#AEAFAE'
    style.strokeDasharray = '3 3'
    style.strokeWidth = 1
    return style
  }

  isAllowAppendIn(nodeData) {
    // 设置只允许custom-rect节点被添加到此分组中
    return nodeData.type === 'custom-rect'
  }
}

export default {
  type: 'custom-group',
  model: MyGroupModel,
  view: MyGroup,
}
