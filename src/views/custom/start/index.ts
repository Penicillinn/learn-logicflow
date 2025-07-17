import { CircleNode, CircleNodeModel, GraphModel } from '@logicflow/core'
class StartModel extends CircleNodeModel {
  static extendKey = 'StartModel'
  constructor(data, graphModel: GraphModel) {
    if (!data.text) {
      data.text = ''
    }
    if (data.text && typeof data.text === 'string') {
      data.text = {
        value: data.text,
        x: data.x,
        y: data.y + 40,
      }
    }
    super(data, graphModel)
  }

  setAttributes(): void {
    this.r = 18
  }

  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules()
    const notAsTarget = {
      message: '起始节点不能作为边的终点',
      validate: () => false,
    }
    rules.push(notAsTarget)
    return rules
  }

  getNodeStyle(): {
    [x: string]: any
    r?: number
    fill?: string
    stroke?: string
    strokeWidth?: number
  } {
    const style = super.getNodeStyle()
    return style
  }
}

class StartView extends CircleNode {
  static extendKey = 'StartNode'
}

const Start = {
  type: 'custom-start',
  view: StartView,
  model: StartModel,
}

export { StartModel, StartView }
export default Start
