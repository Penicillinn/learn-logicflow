import { GraphModel, h } from '@logicflow/core'
import { RectResize } from '@logicflow/extension'
class TaskModel extends RectResize.model {
  static extendKey = 'TaskModel'
  constructor(data, graphModel: GraphModel) {
    super(data, graphModel)
    if (data.properties) {
      this.width = (data.properties.width ? data.properties.width : 120) as number
      this.height = (data.properties.height ? data.properties.height : 80) as number
    }
  }

  getNodeStyle(): {
    [x: string]: any
    width?: number
    height?: number
    radius?: number
    fill?: string
    stroke?: string
    strokeWidth?: number
  } {
    const style = super.getNodeStyle()
    return style
  }
}

class TaskView extends RectResize.view {
  static extendKey = 'TaskNode'
  getLabelShape(): h.JSX.Element {
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
        d: 'M860.343 764.864c-19-45.025-46.345-85.427-81.028-120.1-34.683-34.674-75.097-61.91-120.135-81.005-0.402-0.201-0.804-0.302-1.206-0.503 62.63-45.226 103.346-118.894 103.346-202.01C761.32 223.558 649.73 112 512.002 112S262.684 223.558 262.684 361.246c0 83.116 40.715 156.784 103.346 202.11-0.402 0.202-0.804 0.302-1.206 0.503-45.038 18.995-85.452 46.231-120.135 81.005-34.683 34.674-61.927 75.076-81.028 120.1-18.7 44.02-28.652 90.755-29.659 138.795-0.099 4.522 3.52 8.241 8.045 8.241h60.318a8.025 8.025 0 0 0 8.043-7.84c2.01-77.587 33.175-150.25 88.266-205.326 57.002-56.985 132.702-88.342 213.328-88.342s156.326 31.357 213.328 88.342c55.09 55.076 86.255 127.739 88.266 205.327 0.1 4.422 3.62 7.839 8.043 7.839h60.318c4.524 0 8.143-3.719 8.045-8.241-1.007-48.04-10.96-94.774-29.659-138.895z m-348.45-230.753c-46.13 0-89.547-17.99-122.21-50.654-32.664-32.663-50.654-76.08-50.654-122.21 0-46.131 17.99-89.549 50.653-122.212 32.664-32.663 76.08-50.653 122.211-50.653s89.548 17.99 122.212 50.653c32.663 32.663 50.653 76.08 50.653 122.211 0 46.13-17.99 89.548-50.653 122.211-32.664 32.664-76.08 50.654-122.212 50.654z',
      }),
    )
  }

  getResizeShape(): h.JSX.Element {
    const { model } = this.props
    const { x, y, width, height, radius } = model
    const style = model.getNodeStyle()
    // todo: 将basic-shape对外暴露，在这里可以直接用。现在纯手写有点麻烦。
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

const Task = {
  type: 'custom-user-task',
  view: TaskView,
  model: TaskModel,
}

export { TaskView, TaskModel }
export default Task
