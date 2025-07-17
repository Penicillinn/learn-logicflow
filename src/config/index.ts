export const configData = {
  node: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 60,
        text: '矩形',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 60,
        text: '圆形',
      },
      {
        id: '3',
        type: 'ellipse',
        x: 500,
        y: 60,
        text: '椭圆',
      },
      {
        id: '4',
        type: 'polygon',
        x: 100,
        y: 200,
        text: '多边形',
      },
      {
        id: '5',
        type: 'diamond',
        x: 300,
        y: 200,
        text: '菱形',
      },
      {
        id: '6',
        type: 'text',
        x: 500,
        y: 200,
        text: '纯文本节点',
      },
      {
        id: '7',
        type: 'html',
        x: 100,
        y: 320,
        text: 'html节点',
      },
    ],
  },
  customnode: {
    nodes: [
      {
        id: '1',
        type: 'custom-task',
        x: 100,
        y: 60,
        text: '自定义矩形',
      },
      {
        id: '2',
        type: 'custom-task',
        x: 300,
        y: 60,
        text: '自定义绿色',
        properties: {
          status: 'pass',
        },
      },
      {
        id: '3',
        type: 'custom-polygon',
        x: 500,
        y: 60,
        text: '自定义多边行',
      },
    ],
  },
  edge: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '矩形1',
      },
      {
        id: '2',
        type: 'ellipse',
        x: 500,
        y: 100,
        text: '椭圆2',
      },
      {
        id: '3',
        type: 'polygon',
        x: 100,
        y: 250,
        text: '多边形3',
      },
      {
        id: '4',
        type: 'diamond',
        x: 300,
        y: 250,
        text: '菱形4',
      },
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        startPoint: {
          // 起始点
          x: 100,
          y: 60,
        },
        endPoint: {
          // 结束点
          x: 500,
          y: 50,
        },
        type: 'polyline',
        text: 'polyline',
      },
      {
        sourceNodeId: '2',
        targetNodeId: '3',
        type: 'line',
        text: 'line',
      },
      {
        sourceNodeId: '2',
        targetNodeId: '4',
        type: 'bezier',
        text: 'bezier',
      },
    ],
  },
  customedge: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '矩形',
      },
      {
        id: '3',
        type: 'ellipse',
        x: 500,
        y: 100,
        text: '椭圆',
      },
      {
        id: '4',
        type: 'polygon',
        x: 100,
        y: 250,
        text: '多边形',
      },

      {
        id: '5',
        type: 'diamond',
        x: 786,
        y: 241,
        properties: {
          width: 60,
          height: 100,
        },
        text: {
          x: 786,
          y: 241,
          value: '菱形',
        },
      },
    ],
    edges: [
      {
        id: '10',
        sourceNodeId: '1',
        targetNodeId: '3',
        startPoint: {
          x: 100,
          y: 60,
        },
        endPoint: {
          x: 500,
          y: 50,
        },
        text: 'custom-edge',
        type: 'custom-edge',
        properties: {
          isstrokeDashed: true, // 是否虚线
          arrowType: 'empty',
        },
      },
      {
        sourceNodeId: '3',
        targetNodeId: '4',
        type: 'custom-edge',
        properties: {
          arrowType: 'half',
        },
        text: {
          x: 400,
          y: 90,
          value: '自定义半箭头',
        },
      },
      {
        sourceNodeId: '3',
        targetNodeId: '5',
        type: 'polyline',
        text: {
          x: 627,
          y: 241,
          value: '默认文字',
        },
      },
    ],
  },
  grid: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 60,
        text: '矩形',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 60,
        text: '圆形',
      },
      {
        id: '3',
        type: 'ellipse',
        x: 500,
        y: 60,
        text: '椭圆',
      },
    ],
  },
  background: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 60,
        text: '矩形',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 60,
        text: '圆形',
      },
      {
        id: '3',
        type: 'ellipse',
        x: 500,
        y: 60,
        text: '椭圆',
      },
    ],
  },
  event: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 60,
        text: '矩形',
      },
      {
        id: '2',
        type: 'circle',
        x: 300,
        y: 60,
        text: '圆形',
      },
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        type: 'line',
        text: 'line',
      },
    ],
  },
  menu: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '矩形1',
      },
      {
        id: '2',
        type: 'ellipse',
        x: 500,
        y: 100,
        text: '椭圆2',
      },
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        startPoint: {
          // 起始点
          x: 100,
          y: 60,
        },
        endPoint: {
          // 结束点
          x: 500,
          y: 50,
        },
        type: 'polyline',
        text: 'polyline',
      },
    ],
  },
  dnd: {},
  control: {},
  adapter: {},
  process: {
    nodes: [
      {
        id: 'start',
        type: 'custom-start',
        x: 179,
        y: 85,
        properties: {
          width: '120',
          height: '80',
        },
        text: {
          x: 179,
          y: 125,
          value: '开始',
        },
      },
      {
        id: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        type: 'custom-user-task',
        x: 435,
        y: 85,
        properties: {
          taskType: undefined,
          performType: undefined,
          width: 120,
          height: 80,
        },
        text: {
          x: 435,
          y: 85,
          value: '请假申请',
        },
      },
      {
        id: 'approveDept',
        type: 'custom-user-task',
        x: 435,
        y: 228,
        properties: {
          assignmentHandler: 'com.mldong.config.FlowAssignmentHandler',
          taskType: 'Major',
          performType: 'ANY',
          autoExecute: 'N',
          width: 120,
          height: 80,
          field: '{}',
        },
        text: {
          x: 435,
          y: 228,
          value: '部门领导审批',
        },
      },
      {
        id: 'approveBoss',
        type: 'custom-user-task',
        x: 600,
        y: 540,
        properties: {
          assignmentHandler: 'com.mldong.config.FlowAssignmentHandler',
          taskType: 'Major',
          performType: 'ANY',
          autoExecute: 'N',
          width: 120,
          height: 80,
          field: '{}',
        },
        text: {
          x: 600,
          y: 540,
          value: '公司领导审批',
        },
      },
      {
        id: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        type: 'custom-decision',
        x: 435,
        y: 355,
        properties: {
          width: 120,
          height: 80,
        },
      },
      {
        id: 'end',
        type: 'custom-end',
        x: 798,
        y: 461,
        properties: {
          width: '120',
          height: '80',
        },
        text: {
          x: 798,
          y: 501,
          value: '结束',
        },
      },
    ],
    edges: [
      {
        id: '3037be41-5682-4344-b94a-9faf5c3e62ba',
        type: 'polyline',
        properties: {},
        sourceNodeId: 'start',
        targetNodeId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        sourceAnchorId: 'start_1',
        targetAnchorId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49_3',
        startPoint: {
          x: 197,
          y: 85,
        },
        endPoint: {
          x: 375,
          y: 85,
        },
        pointsList: [
          {
            x: 197,
            y: 85,
          },
          {
            x: 375,
            y: 85,
          },
        ],
      },
      {
        id: '09d9b143-9473-4a0f-8287-9abf6f65baf5',
        type: 'polyline',
        properties: {},
        sourceNodeId: 'approveDept',
        targetNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        sourceAnchorId: 'approveDept_2',
        targetAnchorId: '2c75eebf-5baf-4cd0-a7b3-05466be13634_0',
        startPoint: {
          x: 435,
          y: 268,
        },
        endPoint: {
          x: 435,
          y: 330,
        },
        pointsList: [
          {
            x: 435,
            y: 268,
          },
          {
            x: 435,
            y: 330,
          },
        ],
      },
      {
        id: '517ef2c7-3486-4992-b554-0f538ab91751',
        type: 'polyline',
        properties: {
          expr: '#f_day<3',
        },
        sourceNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        targetNodeId: 'end',
        sourceAnchorId: '2c75eebf-5baf-4cd0-a7b3-05466be13634_1',
        targetAnchorId: 'end_3',
        startPoint: {
          x: 459,
          y: 354,
        },
        endPoint: {
          x: 798,
          y: 443,
        },
        text: {
          x: 644,
          y: 354,
          value: '请假天数小于3',
        },
        pointsList: [
          {
            x: 459,
            y: 354,
          },
          {
            x: 798,
            y: 354,
          },
          {
            x: 798,
            y: 443,
          },
        ],
      },
      {
        id: 'd7ec4166-f3fc-4fd6-a2ac-a6c4d509c4dd',
        type: 'polyline',
        properties: {
          expr: '#f_day>=3',
        },
        sourceNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        targetNodeId: 'approveBoss',
        sourceAnchorId: '2c75eebf-5baf-4cd0-a7b3-05466be13634_1',
        targetAnchorId: 'approveBoss_3',
        startPoint: {
          x: 435,
          y: 380,
        },
        endPoint: {
          x: 540,
          y: 540,
        },
        text: {
          x: 456,
          y: 540.5,
          value: '请假天数大于等于3',
        },
        pointsList: [
          {
            x: 435,
            y: 380,
          },
          {
            x: 435,
            y: 540,
          },
          {
            x: 540,
            y: 540,
          },
        ],
      },
      {
        id: 'eebbba90-0599-4571-94ea-f4ee19de36db',
        type: 'polyline',
        properties: {},
        sourceNodeId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        targetNodeId: 'approveDept',
        sourceAnchorId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49_2',
        targetAnchorId: 'approveDept_0',
        startPoint: {
          x: 435,
          y: 125,
        },
        endPoint: {
          x: 435,
          y: 188,
        },
        pointsList: [
          {
            x: 435,
            y: 125,
          },
          {
            x: 435,
            y: 188,
          },
        ],
      },
      {
        id: 'a05e8c3e-0bc4-41db-91a4-fe77e3718d79',
        type: 'polyline',
        properties: {},
        sourceNodeId: 'approveBoss',
        targetNodeId: 'end',
        sourceAnchorId: 'approveBoss_1',
        targetAnchorId: 'end_2',
        startPoint: {
          x: 660,
          y: 540,
        },
        endPoint: {
          x: 798,
          y: 479,
        },
        pointsList: [
          {
            x: 660,
            y: 540,
          },
          {
            x: 798,
            y: 540,
          },
          {
            x: 798,
            y: 479,
          },
        ],
      },
    ],
  },
}
