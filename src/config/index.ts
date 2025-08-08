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
  connectedSourceRules: {
    nodes: [
      {
        id: '1',
        type: 'custom-start',
        x: 300,
        y: 100,
        text: '开始节点',
        properties: {
          name: 'testttt',
        },
      },
      {
        id: '2',
        type: 'custom-end',
        x: 300,
        y: 250,
        text: '结束节点',
      },
      {
        id: '8',
        type: 'rect',
        x: 100,
        y: 350,
        text: 'rect',
      },
      {
        id: '3',
        type: 'custom-hexagon',
        x: 100,
        y: 100,
        text: '只能连接到rect',
      },
    ],
    edges: [],
  },
  moveRules: {
    nodes: [
      {
        type: 'custom-move-group',
        x: 300,
        y: 250,
        text: '你好',
        children: ['circle-1'],
      },
      {
        type: 'custom-movable-node',
        x: 300,
        y: 70,
        text: '不允许移动到坐标为负值的地方',
      },
      {
        id: 'circle-1',
        type: 'circle',
        x: 300,
        y: 250,
        text: 'hello world',
      },
    ],
    edges: [],
  },
  group: {
    // nodes: [
    //   {
    //     type: 'dynamic-group',
    //     x: 400,
    //     y: 200,
    //     properties: {
    //       children: ['rect_2'],
    //     },
    //     text: {
    //       value: '默认分组',
    //       x: 300,
    //       y: 200,
    //     },
    //   },
    //   {
    //     id: 'rect_2',
    //     type: 'circle',
    //     x: 400,
    //     y: 200,
    //     text: '子节点',
    //   },
    //   {
    //     type: 'custom-group',
    //     x: 400,
    //     y: 500,
    //     text: {
    //       value: '自定义分组',
    //       x: 400,
    //       y: 500,
    //     },
    //   },
    // ],
  },
  anchor: {
    nodes: [
      {
        id: 'node_id_1',
        type: 'custom-sql-node',
        x: 100,
        y: 100,
        properties: {
          tableName: 'Users',
          fields: [
            {
              key: 'id',
              type: 'string',
            },
            {
              key: 'name',
              type: 'string',
            },
            {
              key: 'age',
              type: 'integer',
            },
          ],
        },
      },
      {
        id: 'node_id_2',
        type: 'custom-sql-node',
        x: 400,
        y: 200,
        properties: {
          tableName: 'Settings',
          fields: [
            {
              key: 'id',
              type: 'string',
            },
            {
              key: 'key',
              type: 'integer',
            },
            {
              key: 'value',
              type: 'string',
            },
          ],
        },
      },
    ],
    edges: [],
  },
  htmlNode: {
    nodes: [
      {
        id: '1',
        type: 'custom-html-node',
        x: 300,
        y: 100,
        properties: {
          name: 'hello',
          body: 'world',
        },
      },
      {
        id: '2',
        type: 'custom-vue-html-node',
        x: 300,
        y: 280,
        properties: {
          name: 'VueComponent',
        },
      },
      {
        id: 'vue-node-1',
        type: 'custom-vue-node',
        x: 650,
        y: 140,
        properties: {
          progress: 60,
          width: 100,
          height: 150,
        },
      },
    ],
    edges: [],
  },
  edgeAnimation: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 300,
        y: 100,
        text: 'A',
      },
      {
        id: '2',
        type: 'rect',
        x: 300,
        y: 280,
        text: 'B',
      },
    ],
    edges: [],
  },
  snapline: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 300,
        y: 100,
        text: 'A',
      },
      {
        id: '2',
        type: 'rect',
        x: 300,
        y: 280,
        text: 'B',
      },
    ],
    edges: [],
  },
  keyboard: {
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 300,
        y: 100,
        text: '默认快捷键',
      },
      {
        id: '2',
        type: 'rect',
        x: 300,
        y: 280,
        text: '自定义快捷键',
      },
    ],
    edges: [],
  },
  highlight: {
    name: 'leave',
    displayName: '请假',
    instanceUrl: 'leaveForm',
    nodes: [
      {
        id: 'start',
        type: 'circle',
        x: 340,
        y: 160,
        properties: {
          width: '120',
          height: '80',
        },
        text: {
          x: 340,
          y: 200,
          value: '开始',
        },
      },
      {
        id: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        type: 'rect',
        x: 520,
        y: 160,
        properties: {
          assignee: 'approve.operator',
          taskType: 'Major',
          performType: 'ANY',
          autoExecute: 'N',
          width: 120,
          height: 80,
          field: {
            userKey: '1',
          },
        },
        text: {
          x: 520,
          y: 160,
          value: '请假申请',
        },
      },
      {
        id: 'approveDept',
        type: 'rect',
        x: 740,
        y: 160,
        properties: {
          assignmentHandler: 'com.mldong.config.FlowAssignmentHandler',
          taskType: 'Major',
          performType: 'ANY',
          autoExecute: 'N',
          width: 120,
          height: 80,
          field: {},
        },
        text: {
          x: 740,
          y: 160,
          value: '部门领导审批',
        },
      },
      {
        id: 'approveBoss',
        type: 'rect',
        x: 900,
        y: 480,
        properties: {
          assignmentHandler: 'com.mldong.config.FlowAssignmentHandler',
          taskType: 'Major',
          performType: 'ANY',
          autoExecute: 'N',
          width: '120',
          height: '80',
        },
        text: {
          x: 900,
          y: 480,
          value: '公司领导审批',
        },
      },
      {
        id: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        type: 'diamond',
        x: 740,
        y: 340,
        properties: {
          width: '120',
          height: '80',
        },
      },
      {
        id: 'end',
        type: 'circle',
        x: 1080,
        y: 160,
        properties: {
          width: '120',
          height: '80',
        },
        text: {
          x: 1080,
          y: 200,
          value: '结束',
        },
      },
    ],
    edges: [
      {
        id: '3037be41-5682-4344-b94a-9faf5c3e62ba',
        type: 'polyline',
        sourceNodeId: 'start',
        targetNodeId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        startPoint: {
          x: 358,
          y: 160,
        },
        endPoint: {
          x: 460,
          y: 160,
        },
        properties: {},
        pointsList: [
          {
            x: 358,
            y: 160,
          },
          {
            x: 460,
            y: 160,
          },
        ],
      },
      {
        id: 'c79642ae-9f28-4213-8cdf-0e0d6467b1b9',
        type: 'polyline',
        sourceNodeId: 'd4dd93d9-f0ed-4730-be1e-1ab86b277a49',
        targetNodeId: 'approveDept',
        startPoint: {
          x: 580,
          y: 160,
        },
        endPoint: {
          x: 680,
          y: 160,
        },
        properties: {},
        pointsList: [
          {
            x: 580,
            y: 160,
          },
          {
            x: 680,
            y: 160,
          },
        ],
      },
      {
        id: '09d9b143-9473-4a0f-8287-9abf6f65baf5',
        type: 'polyline',
        sourceNodeId: 'approveDept',
        targetNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        startPoint: {
          x: 740,
          y: 200,
        },
        endPoint: {
          x: 740,
          y: 315,
        },
        properties: {},
        pointsList: [
          {
            x: 740,
            y: 200,
          },
          {
            x: 740,
            y: 315,
          },
        ],
      },
      {
        id: 'a64348ec-4168-4f36-8a61-15cf12c710b9',
        type: 'polyline',
        sourceNodeId: 'approveBoss',
        targetNodeId: 'end',
        startPoint: {
          x: 960,
          y: 480,
        },
        endPoint: {
          x: 1080,
          y: 142,
        },
        properties: {},
        pointsList: [
          {
            x: 960,
            y: 480,
          },
          {
            x: 1140,
            y: 480,
          },
          {
            x: 1140,
            y: 112,
          },
          {
            x: 1080,
            y: 112,
          },
          {
            x: 1080,
            y: 142,
          },
        ],
      },
      {
        id: '517ef2c7-3486-4992-b554-0f538ab91751',
        type: 'polyline',
        sourceNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        targetNodeId: 'end',
        startPoint: {
          x: 764,
          y: 339,
        },
        endPoint: {
          x: 1080,
          y: 178,
        },
        properties: {
          expr: '#f_day<3',
        },
        text: {
          x: 922,
          y: 339,
          value: '请假天数小于3',
        },
        pointsList: [
          {
            x: 764,
            y: 339,
          },
          {
            x: 1080,
            y: 339,
          },
          {
            x: 1080,
            y: 178,
          },
        ],
      },
      {
        id: 'd7ec4166-f3fc-4fd6-a2ac-a6c4d509c4dd',
        type: 'polyline',
        sourceNodeId: '2c75eebf-5baf-4cd0-a7b3-05466be13634',
        targetNodeId: 'approveBoss',
        startPoint: {
          x: 740,
          y: 365,
        },
        endPoint: {
          x: 840,
          y: 480,
        },
        properties: {
          expr: '#f_day>=3',
        },
        text: {
          x: 740,
          y: 422.5,
          value: '请假天数大于等于3',
        },
        pointsList: [
          {
            x: 740,
            y: 365,
          },
          {
            x: 740,
            y: 480,
          },
          {
            x: 840,
            y: 480,
          },
        ],
      },
    ],
  },
  customFields: {
    nodes: [
      {
        id: 'node_id',
        type: 'custom-field-rect',
        x: 100,
        y: 100,
        text: '节点',
        // 标准 properties
        properties: {
          name: '节点1',
        },
        customStatus: 1,
        customData: {
          name: 'Rose',
          age: 13,
        },
      },
    ],
  },
  plugins: {},
}
