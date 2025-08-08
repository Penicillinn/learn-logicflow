import LogicFlow, { LineEdge, LineEdgeModel } from '@logicflow/core'

class CustomEdgeModel extends LineEdgeModel {
  initEdgeData(data: LogicFlow.EdgeConfig) {
    super.initEdgeData(data)
    this.customTextPosition = true
  }

  setAttributes() {
    this.isAnimation = true
  }

  // getEdgeStyle() {
  //   const style = super.getEdgeStyle()
  //   style.stroke = 'blue'
  //   return style
  // }

  // getEdgeAnimationStyle() {
  //   const style = super.getEdgeAnimationStyle()
  //   style.strokeDasharray = '5 5'
  //   style.strokeDashoffset = '100%'
  //   style.animationDuration = '10s'
  //   return style
  // }
}

class CustomEdge extends LineEdge {}

export default {
  type: 'custom-animation-edge',
  model: CustomEdgeModel,
  view: CustomEdge,
}
