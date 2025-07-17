import { PolylineEdge, PolylineEdgeModel, h } from '@logicflow/core'

class CustomEdgeModel extends PolylineEdgeModel {
  customTextPosition = true
  // 设置边样式
  getEdgeStyle() {
    const style = super.getEdgeStyle()
    const { properties } = this
    if (properties.isstrokeDashed) {
      style.strokeDasharray = '4, 4'
    }
    style.stroke = 'orange'
    return style
  }

  // 设置边文本样式
  getTextStyle() {
    const style: ReturnType<PolylineEdgeModel['getTextStyle']> = super.getTextStyle()
    style.color = '#3451F1'
    style.fontSize = 20
    style.background = Object.assign({}, style.background, {
      fill: '#F2F131',
    })
    return style
  }

  // 设置 hover 轮廓样式
  getOutlineStyle() {
    const style = super.getOutlineStyle()
    style.stroke = 'blue'
    return style
  }

  // 设置文本位置
  getTextPosition() {
    const position = super.getTextPosition()

    const currentPositionList = this.points.split(' ')
    const pointsList = []
    if (currentPositionList) {
      currentPositionList.forEach((item) => {
        const [x, y] = item.split(',')
        pointsList.push({ x: Number(x), y: Number(y) })
      })
    }
    if (currentPositionList.length > 1) {
      const [x1, y1] = currentPositionList[0].split(',')
      const [x2, y2] = currentPositionList[1].split(',')
      let distence = 50
      if (Number(x1) === Number(x2)) {
        // 垂直
        if (Number(y2) < Number(y1)) {
          distence = -50
        }
        position.y = Number(y1) + distence
        position.x = Number(x1)
      } else {
        if (Number(x2) < Number(x1)) {
          distence = -50
        }
        position.x = Number(x1) + distence
        position.y = Number(y1) - 10
      }
    }
    return position
  }
}

class CustomArrow extends PolylineEdge {
  // 设置箭头样式
  getEndArrow() {
    const { model } = this.props
    const {
      properties: { arrowType },
    } = model

    const { stroke, strokeWidth } = model.getArrowStyle()
    const pathAttr = {
      stroke,
      strokeWidth,
    }

    if (arrowType === 'empty') {
      // 空心箭头
      return h('path', {
        ...pathAttr,
        fill: '#FFF',
        d: 'M 0 0  -20 -5 -30 0 -20 5 z',
      })
    } else if (arrowType === 'half') {
      // 半箭头
      return h('path', {
        ...pathAttr,
        d: 'M 0 0 -10 5',
      })
    }
    return h('path', {
      ...pathAttr,
      d: 'M 0 0 -10 -5 -10 5 z',
    })
  }
}

export default {
  type: 'custom-edge',
  view: CustomArrow,
  model: CustomEdgeModel,
}
