<template>
  <div class="container" id="process"></div>
  <Modal ref="modelRef" />
  <PropertSetting ref="propertSettingRef" @change="handlePropertyChange">
    <template #[key]="data" v-for="(item, key) in $slots">
      <slot :name="key" v-bind="data || {}"></slot>
    </template>
  </PropertSetting>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, unref } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { DndPanel, SelectionSelect, Control, Menu } from '@logicflow/extension'
import CustomStart from '@/views/custom/start/index'
import CustomUserTask from '@/views/custom/user-task'
import CustomDecision from '@/views/custom/decision'
import CustomEnd from '@/views/custom/end'
import Modal from '@/components/Modal.vue'
import { ElMessage } from 'element-plus'
import { configData } from '@/config'
import PropertSetting from '@/components/PropertySetting'
import { NodeTypeEnum } from '@/components/enums'

const route = useRoute()

LogicFlow.use(DndPanel)
LogicFlow.use(SelectionSelect)
LogicFlow.use(Control)
// LogicFlow.use(BpmnAdapter)

defineOptions({
  name: 'ProcessDemo',
})

const modelRef = ref(null)
const propertSettingRef = ref(null)
const lfRef = ref(null)
const currentOpId = ref(null)

const handlePropertyChange = (e: PropertyEvent) => {
  const lf = unref(lfRef)
  if (!lf) return
  if (
    (
      [
        NodeTypeEnum.custom,
        NodeTypeEnum.decision,
        NodeTypeEnum.end,
        NodeTypeEnum.fork,
        NodeTypeEnum.join,
        NodeTypeEnum.start,
        NodeTypeEnum.task,
        NodeTypeEnum.wfSubProcess,
      ] as any[]
    ).includes(e.type)
  ) {
    // 节点属性
    const nodeId = unref(currentOpId)
    // 节点信息
    if (e.propertyName === 'name') {
      // 更新唯一标识
      if (!lf.getNodeModelById(e.propertyValue)) {
        lf.changeNodeId(nodeId, e.propertyValue)
        currentOpId.value = e.propertyValue
      }
    } else if (e.propertyName === 'displayName') {
      // 更新节点文本值
      lf.updateText(nodeId, e.propertyValue)
    } else if (
      e.propertyName === 'width' &&
      [NodeTypeEnum.task, NodeTypeEnum.custom].includes(e.type)
    ) {
      // 宽度
      lf.setProperties(nodeId, {
        width: (Number.isNaN(e.propertyValue) ? 120 : e.propertyValue) as number,
      })
      const nodeModel = lf.getNodeModelById(nodeId)
      if (nodeModel) {
        nodeModel.width = (Number.isNaN(e.propertyValue) ? 120 : e.propertyValue) as number
      }
    } else if (
      e.propertyName === 'height' &&
      [NodeTypeEnum.task, NodeTypeEnum.custom].includes(e.type)
    ) {
      // 高度
      lf.setProperties(nodeId, {
        height: (Number.isNaN(e.propertyValue) ? 120 : e.propertyValue) as number,
      })
      const nodeModel = lf.getNodeModelById(nodeId)
      if (nodeModel) {
        nodeModel.height = (Number.isNaN(e.propertyValue) ? 120 : e.propertyValue) as number
      }
    } else if (e.propertyName === 'field') {
      // 更新扩展属性
      lf.setProperties(nodeId, {
        field: JSON.stringify(e.propertyValue),
      })
    } else {
      // 更新基础属性
      lf.setProperties(nodeId, {
        [e.propertyName]: e.propertyValue,
      })
    }
  }
}

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#process') as HTMLElement,
    grid: true,
    plugins: [Menu],
    isSilentMode: true,
    style: {
      circle: { stroke: '#3E67E4' },
      rect: { stroke: '#3E67E4' },
      baseEdge: { stroke: '#CACCD3' },
      polygon: { stroke: '#3E67E4' },
    },
  })

  lfRef.value = lf

  // 注册自定义节点
  lf.register(CustomStart)
  lf.register(CustomUserTask)
  lf.register(CustomDecision)
  lf.register(CustomEnd)

  lf.extension.dndPanel.setPatternItems([
    {
      label: '选区',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
      callback: () => {
        lf.extension.selectionSelect.openSelectionSelect()
        lf.once('selection:selected', () => {
          lf.extension.selectionSelect.closeSelectionSelect()
        })
      },
    },
    {
      type: 'custom-start',
      text: '开始',
      label: '开始节点',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
    },
    {
      type: 'custom-user-task',
      label: '用户任务',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
      className: 'important-node',
    },
    {
      type: 'custom-decision',
      label: '条件判断',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
      className: 'important-node',
    },
    {
      type: 'custom-end',
      text: '结束',
      label: '结束节点',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
    },
  ])

  lf.extension.control.addItem({
    key: 'control-see',
    iconClass: 'lf-control-see',
    title: '查看数据',
    text: '查看原始数据',
    onClick: (lf) => {
      modelRef.value.toogleVisible(true, lf.getGraphRawData())
    },
  })
  lf.extension.control.addItem({
    key: 'control-see',
    iconClass: 'lf-control-see',
    title: '查看数据',
    text: '查看 bpmn 数据',
    onClick: (lf) => {
      modelRef.value.toogleVisible(true, lf.getGraphData())
    },
  })
  lf.extension.control.addItem({
    key: 'control-save',
    iconClass: 'lf-control-save',
    title: '保存',
    text: '保存',
    onClick: () => {
      ElMessage.success('保存成功')
    },
  })

  lf.on('node:click', (args) => {
    currentOpId.value = args.data.id
    propertSettingRef.value.show({
      ...args.data.properties,
      name: args.data.id,
      displayName: args.data.text?.value || args.data.properties.displayName,
      type: args.data.type,
    })
  })

  lf.adapterOut = function (logicFlowData) {
    // Initialize BPMN data structure
    const bpmndata = {
      definitions: {
        process: {
          id: 'Process_1',
          isExecutable: false,
          startEvent: [],
          endEvent: [],
          userTask: [],
          sequenceFlow: [],
          // Add other BPMN elements as needed
        },
      },
    }

    // Helper function to map LogicFlow node type to BPMN element type
    function mapNodeType(lfType) {
      const typeMap = {
        start: 'startEvent',
        end: 'endEvent',
        'user-task': 'userTask',
        'service-task': 'serviceTask',
        'exclusive-gateway': 'exclusiveGateway',
        // Add more mappings as needed
      }
      return typeMap[lfType] || 'task' // default to task if type not found
    }

    // Process nodes
    logicFlowData.nodes.forEach((node) => {
      const bpmnType = mapNodeType(node.type)
      const bpmnElement = {
        id: node.id,
        name: node.text ? node.text.value : '',
        // Add other properties based on node type
      }

      // Add to the appropriate array in the process
      if (bpmndata.definitions.process[bpmnType]) {
        bpmndata.definitions.process[bpmnType].push(bpmnElement)
      } else {
        // For unsupported types, add to a generic tasks array
        if (!bpmndata.definitions.process.task) {
          bpmndata.definitions.process.task = []
        }
        bpmndata.definitions.process.task.push(bpmnElement)
      }
    })

    // Process edges
    logicFlowData.edges.forEach((edge) => {
      const sequenceFlow = {
        id: edge.id,
        sourceRef: edge.sourceNodeId,
        targetRef: edge.targetNodeId,
        // Add condition if it's a conditional flow
      }
      bpmndata.definitions.process.sequenceFlow.push(sequenceFlow)
    })

    return bpmndata
  }

  lf.render(configData.process)
}

watch(
  () => route.fullPath,
  () => {
    // 这里执行你的重置逻辑，比如重新初始化 LogicFlow
    init()
  },
)

onMounted(init)
</script>

<style>
/* 样式内容 */
.container {
  height: 100%;
  width: 100%;
}
.lf-control-see {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1NjgyNDM0MzQxIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDE3MS4yODM2OTJjLTI1NS4wNTQ3NjkgMC00ODUuOTI3Mzg1IDMxMi40MzgxNTQtNDk2Ljc5NzUzOCAzMjcuMzI1NTM4bDAgMC42MzAxNTRDMjYuMDcyNjE1IDUxNC4xMjY3NjkgMjU2Ljk0NTIzMSA4MjYuNDg2MTU0IDUxMiA4MjYuNDg2MTU0YzI1NS4wMTUzODUgMCA0ODUuODg4LTMxMi4zOTg3NjkgNDk2Ljc5NzUzOC0zMjcuMzI1NTM4bDAtMC42MzAxNTRDOTk3LjkyNzM4NSA0ODMuNjgyNDYyIDc2Ny4wMTUzODUgMTcxLjI4MzY5MiA1MTIgMTcxLjI4MzY5Mkw1MTIgMTcxLjI4MzY5MnpNNTEyIDI5MS4yMDk4NDZjMTE0LjU2OTg0NiAwIDIwNy43NTM4NDYgOTMuMTA1MjMxIDIwNy43NTM4NDYgMjA3LjY3NTA3N1M2MjYuNTY5ODQ2IDcwNi42Mzg3NjkgNTEyIDcwNi42Mzg3NjljLTExNC41MzA0NjIgMC0yMDcuNzUzODQ2LTkzLjE4NC0yMDcuNzUzODQ2LTIwNy43NTM4NDZTMzk3LjQ2OTUzOCAyOTEuMjA5ODQ2IDUxMiAyOTEuMjA5ODQ2TTUxMiAzOTUuMjI0NjE1Yy01Ny4yNjUyMzEgMC0xMDMuNjYwMzA4IDQ2LjQzNDQ2Mi0xMDMuNjYwMzA4IDEwMy42NjAzMDhzNDYuMzk1MDc3IDEwMy42NjAzMDggMTAzLjY2MDMwOCAxMDMuNjYwMzA4YzU3LjIyNTg0NiAwIDEwMy42MjA5MjMtNDYuNDM0NDYyIDEwMy42MjA5MjMtMTAzLjY2MDMwOFM1NjkuMjI1ODQ2IDM5NS4yMjQ2MTUgNTEyIDM5NS4yMjQ2MTV6IiBwLWlkPSIxMzc5Ij48L3BhdGg+PC9zdmc+');
}
.lf-control-save {
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjQ1Nzg5MTgwOTgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI4NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNDI2LjY2NjY2NyAxMjhoLTE0OS4zMzMzMzR2MjM0LjQ1MzMzM2MwIDEyLjA3NDY2NyA5LjQ1MDY2NyAyMS41NDY2NjcgMjEuMjA1MzM0IDIxLjU0NjY2N2gyOTguOTIyNjY2YzExLjYyNjY2NyAwIDIxLjIwNTMzMy05LjYgMjEuMjA1MzM0LTIxLjU0NjY2N1YxMjhoLTY0djE0OS41MDRjMCAyMy40NjY2NjctMTkuMTU3MzMzIDQyLjQ5Ni00Mi42MjQgNDIuNDk2aC00Mi43NTJBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA0MjYuNjY2NjY3IDI3Ny41MDRWMTI4ek0xOTIgODk2VjY2MS41NDY2NjdDMTkyIDYwMi40NzQ2NjcgMjM5Ljc4NjY2NyA1NTQuNjY2NjY3IDI5OC44MzczMzMgNTU0LjY2NjY2N2g0MjYuMzI1MzM0QTEwNi43MDkzMzMgMTA2LjcwOTMzMyAwIDAgMSA4MzIgNjYxLjU0NjY2N1Y4OTZoNDIuNTE3MzMzQTIxLjMxMiAyMS4zMTIgMCAwIDAgODk2IDg3NC43NTJWMjczLjY2NEw3NTAuMzM2IDEyOEg3MDR2MjM0LjQ1MzMzM2MwIDU4Ljk2NTMzMy00Ny43MDEzMzMgMTA2Ljg4LTEwNi41Mzg2NjcgMTA2Ljg4SDI5OC41Mzg2NjdBMTA2LjU2IDEwNi41NiAwIDAgMSAxOTIgMzYyLjQ1MzMzM1YxMjhIMTQ5LjI0OEEyMS4yNjkzMzMgMjEuMjY5MzMzIDAgMCAwIDEyOCAxNDkuNDgyNjY3djcyNS4wMzQ2NjZDMTI4IDg4Ni40MjEzMzMgMTM3LjU3ODY2NyA4OTYgMTQ5LjQ4MjY2NyA4OTZIMTkyek00Mi42NjY2NjcgMTQ5LjQ4MjY2N0ExMDYuNjAyNjY3IDEwNi42MDI2NjcgMCAwIDEgMTQ5LjI0OCA0Mi42NjY2NjdINzY4YTQyLjY2NjY2NyA0Mi42NjY2NjcgMCAwIDEgMzAuMTY1MzMzIDEyLjUwMTMzM2wxNzAuNjY2NjY3IDE3MC42NjY2NjdBNDIuNjY2NjY3IDQyLjY2NjY2NyAwIDAgMSA5ODEuMzMzMzMzIDI1NnY2MTguNzUyQTEwNi42NDUzMzMgMTA2LjY0NTMzMyAwIDAgMSA4NzQuNTE3MzMzIDk4MS4zMzMzMzNIMTQ5LjQ4MjY2N0ExMDYuNzUyIDEwNi43NTIgMCAwIDEgNDIuNjY2NjY3IDg3NC41MTczMzNWMTQ5LjQ4MjY2N3ogbTcwNCA1MTIuMDQyNjY2YzAtMTIuMDEwNjY3LTkuNTM2LTIxLjUyNTMzMy0yMS41MDQtMjEuNTI1MzMzSDI5OC44MzczMzNDMjg2LjkzMzMzMyA2NDAgMjc3LjMzMzMzMyA2NDkuNiAyNzcuMzMzMzMzIDY2MS41NDY2NjdWODk2aDQ2OS4zMzMzMzRWNjYxLjU0NjY2N3oiIGZpbGw9IiMwMDAwMDAiIHAtaWQ9IjI4NDQiPjwvcGF0aD48L3N2Zz4=');
}
</style>
