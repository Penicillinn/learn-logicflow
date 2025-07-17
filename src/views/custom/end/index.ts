import { CircleNode, CircleNodeModel, GraphModel, h } from '@logicflow/core'

class EndModel extends CircleNodeModel {
  static extendKey = 'EndModel'
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

  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules()
    const notAsSource = {
      message: '结束节点不能作为边的起点',
      validate: () => false,
    }
    rules.push(notAsSource)
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

class EndView extends CircleNode {
  static extendKey = 'EndView'
  getAnchorStyle(): {} {
    return {
      visibility: 'hidden',
    }
  }

  getShape(): h.JSX.Element {
    const { model } = this.props
    const style = model.getNodeStyle()
    const { x, y, width, height } = model
    const outCircle = super.getShape()
    return h(
      'g',
      {},
      outCircle,
      h(
        'svg',
        {
          x: x - width / 2 + 10,
          y: y - height / 2 + 10,
          width: 16,
          height: 16,
          viewBox: '0 0 1024 1024',
        },
        h('path', {
          fill: style.stroke,
          d: 'M835.5 815.5v-607c0-11-9-20-20-20h-607c-11 0-20 9-20 20v607c0 11 9 20 20 20h607c11 0 20-9 20-20z',
        }),
      ),
    )
  }
}

const End = {
  type: 'custom-end',
  view: EndView,
  model: EndModel,
}

export { EndView, EndModel }
export default End
