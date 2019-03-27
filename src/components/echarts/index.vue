<template>
  <div :class="`echart-box echart-${classify}`"></div>
</template>

<script>
import init from './utils';


export default {
  props: {
    classify: { // 应用那个类型的图标
      type: String
    },
    dataArray: {  // 柱状图渲染数据,数据的每一项都是Number
      type: Array
    },
    type: { // 饼状图类型
      type: [String, Number],
      default: 1
    },
    unit: { // 文案单位
      type: String,
      default: '%'
    },
    innerText: { // 饼图中间的文字
      type: String
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  beforeDestroy() {
    // 销毁图表实例，避免内存溢出
    this.myChart.dispose && this.myChart.dispose();
  },
  mounted() {
    this.myChart = init(this.$el, ...Object.values(this.$props))
  }
}
</script>

<style scoped>
.echart-box {
  width: 100%;
  height: 300px;
}

.echart-barHeng {
  height: 300px;
}
.echart-barXiLine {
  height: 300px;
}
.echart-barCu {
  margin-top: 30px;
  height: 300px;
}
.echart-randar {
  height: 300px;
}
.echart-wordCloud {
  height: 300px;
}
</style>
