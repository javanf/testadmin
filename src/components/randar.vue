<template>
  <echarts classify="randar" :dataArray="randarEchart"></echarts>
</template>


<script>
import Vue from 'vue'

export default {
  components: {
    echarts: Vue.extend(require('./echarts/index').default)
  },
  data () {
    return {
      randarEchart: [[{
          value : [100, 8, 0.40, -80, 2000],
          name : 'web 秀',
          symbol: 'star5',
          symbolSize: 4,           // 可计算特性参数，空数据拖拽提示图形大小
          itemStyle: {
              normal: {
                  lineStyle: {
                      type: 'dashed'
                  }
              }
          }
      },
      {
          value : [10, 3, 0.20, -100, 1000],
          name : '图二',
          itemStyle: {
              normal: {
                  areaStyle: {
                      type: 'default'
                  }
              }
          }
      },
      {
          value : [20, 3, 0.3, -13.5, 3000],
          name : '图三',
          symbol: 'none',         // 拐点图形类型，非标准参数
          itemStyle: {
              normal: {
                  lineStyle: {
                      type: 'dotted'
                  }
              }
          }
      }], [{
          value : [120, 118, 130, 100, 99, 70],
          name : '张三',
          symbol: 'none',         // 拐点图形类型，非标准参数
          itemStyle: {
              normal: {
                  lineStyle: {
                      type: 'dotted'
                  }
              }
          }
      },{
          value : [120, 118, 130, 100, 99, 70],
          name : '李四',
          symbol: 'none',         // 拐点图形类型，非标准参数
          itemStyle: {
              normal: {
                  lineStyle: {
                      type: 'dotted'
                  }
              }
          }
      },{
          value : [120, 118, 130, 100, 99, 70],
          name : '王五',
          symbol: 'none',         // 拐点图形类型，非标准参数
          itemStyle: {
              normal: {
                  lineStyle: {
                      type: 'dotted'
                  }
              }
          }
      }]]
    }
  },
  
}
</script> 