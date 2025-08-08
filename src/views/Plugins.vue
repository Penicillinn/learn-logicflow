<template>
  <div class="container" id="plugins"></div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import LogicFlow from '@logicflow/core'
import { BpmnElement, DndPanel, Menu } from '@logicflow/extension'
import store from '@/store'
import { ContextPad } from '@/views/plugins/contextPad'

const route = useRoute()

defineOptions({
  name: 'PluginsDemo',
})

function init() {
  const lf = new LogicFlow({
    container: document.querySelector('#plugins') as HTMLElement,
    grid: true,
    plugins: [BpmnElement, DndPanel, ContextPad, Menu],
  })

  setContextPad(lf)
  setDndPanel(lf)
  lf.extension.menu.addMenuConfig({
    nodeMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
      {
        text: '属性',
        callback(node) {
          alert(`
              节点id：${node.id}
              节点类型：${node.type}
              节点坐标：(x: ${node.x}, y: ${node.y})
            `)
        },
      },
    ],
    edgeMenu: [
      {
        text: '属性',
        callback(edge) {
          const { id, type, startPoint, endPoint, sourceNodeId, targetNodeId } = edge
          alert(`
              边id：${id}
              边类型：${type}
              边起点坐标：(startPoint: [${startPoint.x}, ${startPoint.y}])
              边终点坐标：(endPoint: [${endPoint.x}, ${endPoint.y}])
              源节点id：${sourceNodeId}
              目标节点id：${targetNodeId}
            `)
        },
      },
    ],
    graphMenu: [
      {
        text: '分享',
        callback() {
          alert('分享成功！')
        },
      },
    ],
  })
  lf.render(store.state.currentData)
}

const setDndPanel = (lf) => {
  const startConfig = {
    type: 'bpmn:startEvent',
    text: '开始',
    label: '开始',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
  }
  const userConfig = {
    type: 'bpmn:userTask',
    label: '用户任务',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
    properties: {
      actived: true,
    },
  }
  const serviceConfig = {
    type: 'bpmn:serviceTask',
    label: '系统任务',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
    cls: 'import_icon',
  }
  const exclusiveGatewayConfig = {
    type: 'bpmn:exclusiveGateway',
    label: '条件判断',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
  }
  const endConfig = {
    type: 'bpmn:endEvent',
    label: '结束',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
  }
  lf.extension.dndPanel.setPatternItems([
    startConfig,
    userConfig,
    serviceConfig,
    exclusiveGatewayConfig,
    endConfig,
  ])
}

const setContextPad = (lf) => {
  const userConfig = {
    type: 'bpmn:userTask',
    label: '用户任务',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAp1JREFUWEftlj9oE2EYxp/3IkSckotOpqDgl5ZWcLBgxcVBdBL8gw66iCg2lxrBzcl0qpPS1lyQKm5uiuBUHBztoAjVVtOLRDA46Z06VAvmXkkwQWLS3PudQwn54KY8z/v8eO7uvRA2+KENzoc+YNg71PsNxm6VYxStnibwIQCnAF4kptcMv+RWjSlk1VqYFkM1mLCLx5jpJoh2doD4zoQpL61u6EJqA5oF5zwY9wIFE3JuWk0G0raItAATd8r7uPprQRRoYMQdV8siD6C3ZkzbeQ5gTBLGwGPPUsclnppW3GCs8HaHwZvK0iAAq5sj37Z9ujS6KvGKARP5lXNMdF8S0tT6fNidSD2VeMWAcfv9OMEvSEKaWo2XRQwYm3UOGhE80wEk5pNfMqlHEq8YMFEobmc2KpKQhpZR3eNZQ4sSrxiwNty0Sw8BPiEJAujDlp/R4crVgR8Snxagzm1m8FnPSj2QwGmtmUaAaTtzAC4ECWTCNd3PnVaDDahEoZRl5ul1ITVWy9/zQgHWBsULpQPw+QwIw2CM1IcTlsBYZgN3v6bVqyAtd9KEBgwTHsTb+4DmnJPEGgZgIAlCst4KowIfFUTx0b2otHZmo11xg+ZtZz8iGAPjCFC/gpx5EOZRxYI7oWr/hAKfQIBb7XeDDOMKMx1tthQ4okXIqBDxE4I//dkaKnYb0xXQzBdzoEgW4Hi3YbLfyQNXZ9zMYG4937qApu28Af6sDlm6RL3kWmq3eM3EbecFAXslSbpaBl56lhpt52/bYNxemSHQZd1AHR+DZz0rlW31tgfMOw4RdukE6XqYUfIySgUCNG2HdYPC+FxL/VNY2wb7gB1q7qEG68vZuB7meRJ72Z9st7S7fknEQf/Z0AcMW2i/wbAN/gbA1dYpL5kz5gAAAABJRU5ErkJggg==',
    properties: {
      actived: true,
    },
  }
  const serviceConfig = {
    type: 'bpmn:serviceTask',
    label: '系统任务',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAz9JREFUWEfVmEtoE1EUhv8zqaBgwUwi+K5CJqkoumhBxY11IVTBhaBUUNCFtplQRRSrK+vKVrTgYyZUF7qRigV3dqFg3YhdtAsLapIJKK2vRToRqgtpM0cmtTVJE3IzyWKcXTL/+c83c+/cc+4luPwil/OhKsCVWjJgEVqZM75iD8rk+co08/xHePMnpy/CMaANlyE2RBJbNLvJKaRjQF/UuMaMSyKAROiZCiuXRbSFGseAsp4cALhNLCk9NtXAUTFtvqoKQOMNgJ2CSUdMVdklqM2TlQRc1ze57NfS38eJM2uY+GlabRzPjZR14xuAVYJJv5uqsjpX69Vj24jpECRpAoQRs0N5X8yrKKCsJdeDeBDAjvkgBl5JzHdm6+itlEEfAQcF4eZkRENShs4xZbZaRJ0E7MmJfwemVjMSmBSag7KWvAXiMxUBVCtmum1GAmfLAvq1ZItF/LLafE7iJaa9qUhgODd20RDL0eQzMO93kqDqGKIhMxw4UBJQ1uKnQNK9yhPxFwYZEjhmEc0SEAIoBOYNFXuxddqMhO7Pxy28wfr+uH9JRnoNIFiJKTGfnIoEHxaL8WqJi0TUW4kfgMSMx9o93R5KZb+t+WBZNw4DeFKJmUgJ8+vJJgs8WokvE46lw8qjfEAt3g2SrogaSaDmlBoYE9GviH7YKHHdRxFtVsPWVTMS6s4DtH94dWOUgKZyRszclY4Er5fT5d73aYkTTPSgfAyPm2pw+6I5aP/h743VW8ulfhCVrptEE2Y40FA+0WKFrCc+A7S2ZCzzgPTTak91NU4XBVyYj1r8PEi6UdSI8MIMK/ucAHp1Y7iggvyzYeuCGQndLPQtWYtLmTHhbjqsdDoB9OmJKIM6CmPtMppWlZZinv8noOzWIXb9R+LqZUZ2+0Lt+lLn+mbBXoNc3W4tVBE3N6zZeuz2ln9uqF28afoLWHLbyR6Kwco2tlsqqcfMSHqI2pithqq3nXZigY27abeQgpBpU1XkXG1VG3eRpKJVJ9sgA2NpVWkW8RVut8qZybphD7O9jxG5Bk1VOSIirBmgTzd6GOgSSUpA75SqCB3V1QzQ9QeY9pO6+ghYZGhroXF8gFmL5CIefwB0scE4DheJlAAAAABJRU5ErkJggg==',
    cls: 'import_icon',
  }
  const exclusiveGatewayConfig = {
    type: 'bpmn:exclusiveGateway',
    label: '条件判断',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
  }
  const endConfig = {
    type: 'bpmn:endEvent',
    label: '结束',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
  }
  const deleteConfig = {
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAUpJREFUWEftVzuywjAMlKgDPV2g4RYPuAnfDs7w4AzQ8b0Jn1vQQDp6SI0YFwFPSMC2EiYZnDLZldYrybERGI/XLs4Aofc2BMHcXV37pmnQlOh1SwMgmijxEYfu4jJVwoZARgKPXeevQLjTSXhDqlcX/l6HI7APgaeOM0LCulIAhDIA1JSwT9ABCM4qHELaVZb+6FUg4L9KgLQxBDTOqUDVEqdsYWSJU85pHN5oio2zGRDzK/DUchpYwI3BorUpdKNmZe1vo4ixDlqBkl2JOCiCaNfuDUFun0QEustrogPldYoU6P9dgWKQ5CoGkxj3XsZ+xcG4JOEdIKo9rEBRLuugfKIOb1mcPuJwwzqUf3U6jW4FCps5LnC4tsRc962D1sGgBziTyOHaHsxUD2b+wMq5RH3lwJopgZm/dnLc+sRN5Nr5KQnne64F3gEyDFZHJCakvQAAAABJRU5ErkJggg==',
    callback: (data) => {
      lf.deleteElement(data.id)
      lf.extension.contextPad.hideContextMenu()
    },
  }
  lf.extension.contextPad.setContextMenuItems([deleteConfig])
  lf.extension.contextPad.setContextMenuByType('bpmn:startEvent', [
    userConfig,
    serviceConfig,
    exclusiveGatewayConfig,
  ])
  lf.extension.contextPad.setContextMenuByType('bpmn:userTask', [
    userConfig,
    serviceConfig,
    exclusiveGatewayConfig,
    endConfig,
  ])
  lf.extension.contextPad.setContextMenuByType('bpmn:serviceTask', [
    userConfig,
    serviceConfig,
    exclusiveGatewayConfig,
    endConfig,
  ])
  lf.extension.contextPad.setContextMenuByType('bpmn:exclusiveGateway', [userConfig, serviceConfig])
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

<style scoped>
/* 样式内容 */
.container {
  height: 100%;
  width: 100%;
}
</style>
