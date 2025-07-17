import LogicFlow, { h, RectNode, RectNodeModel } from '@logicflow/core'

export type CustomProperties = {
  // 形状属性
  width?: number
  height?: number
}

class TaskModel extends RectNodeModel {
  // 设置矩形的形状属性：大小和圆角
  setAttributes() {
    this.width = this.properties.width ? this.properties.width : 120
    this.height = this.properties.height ? this.properties.height : 80
    //   this.radius = 50
  }

  // 重写文本样式属性
  getTextStyle(): LogicFlow.TextNodeTheme {
    const style = super.getTextStyle()

    return {
      ...style,
    }
  }

  // 设置矩形的样式属性：边框颜色
  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.properties
    if (properties.status === 'pass') {
      // 业务属性status为‘pass’时 展示边框颜色为green
      style.stroke = 'green'
    } else if (properties.status === 'reject') {
      // 业务属性status为‘reject’时 展示边框颜色为red
      style.stroke = 'red'
    }
    return style
  }
}

class TaskView extends RectNode {
  getLabelShape() {
    const { model } = this.props
    const { x, y, width, height } = model
    const style = model.getNodeStyle()
    return h(
      'svg',
      {
        x: x - width / 2 + 5,
        y: y - height / 2 + 5,
        width: 25,
        height: 25,
        viewBox: '0 0 1274 1024',
      },
      h('path', {
        fill: style.stroke,
        d: 'M655.807326 287.35973m-223.989415 0a218.879 218.879 0 1 0 447.978829 0 218.879 218.879 0 1 0-447.978829 0ZM1039.955839 895.482975c-0.490184-212.177424-172.287821-384.030443-384.148513-384.030443-211.862739 0-383.660376 171.85302-384.15056 384.030443L1039.955839 895.482975z',
      }),
    )
  }

  getShape() {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    return h('g', {}, [
      h('rect', {
        ...style,
        x: x - width / 2,
        y: y - height / 2,
        rx: radius,
        ry: radius,
        width,
        height,
      }),
      this.getLabelShape(),
    ])
  }
}

export default {
  type: 'custom-task',
  view: TaskView,
  model: TaskModel,
}
