import LogicFlow, { RectNode, RectNodeModel } from '@logicflow/core'

class MovableNode extends RectNode {}

class MovableNodeModel extends RectNodeModel {
  initNodeData(data: LogicFlow.NodeConfig) {
    super.initNodeData(data)
    this.width = 300
    // 属性名	 类型	    描述
    // deltaX	number	表示 x 坐标的变化量。该值可以是正数或负数，分别表示向右或向左移动。
    // deltaY	number	表示 y 坐标的变化量。类似于 deltaX，该值可以是正数或负数，分别表示向上或向下移动。
    this.moveRules.push((model, deltaX, deltaY) => {
      // 不允许移动到坐标为负值的地方
      if (model.x + deltaX - this.width / 2 < 0 || model.y + deltaY - this.height / 2 < 0) {
        return false
      }
      return true
    })
  }
}

export default {
  type: 'custom-movable-node',
  view: MovableNode,
  model: MovableNodeModel,
}
