import LogicFlow, { PolygonNodeModel, PolygonNode } from '@logicflow/core'

class CustomHexagonModel extends PolygonNodeModel {
  setAttributes() {
    const width = 100
    const height = 100
    const x = 50
    const y = 50
    // 计算六边形， 中心点为[50, 50], 宽高均为100
    const pointList: LogicFlow.PointTuple[] = [
      [x - 0.205 * width, y - 0.5 * height],
      [x + 0.205 * width, y - 0.5 * height],
      [x + 0.5 * width, y],
      [x + 0.205 * width, y + 0.5 * height],
      [x - 0.205 * width, y + 0.5 * height],
      [x - 0.5 * width, y],
    ]
    this.points = pointList
  }

  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules()
    const geteWayOnlyAsTarget = {
      message: '下一个节点只能是rect',
      validate: (source: any, target: any, sourceAnchor: any, targetAnchor: any) => {
        console.log('target.properties', target.properties)
        console.log('source.properties', source.properties)
        return target.type === 'rect'
      },
    }
    rules.push(geteWayOnlyAsTarget)
    return rules
  }
}

export default {
  type: 'custom-hexagon',
  model: CustomHexagonModel,
  view: PolygonNode,
}
