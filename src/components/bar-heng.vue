<template>
  <echarts classify="barHeng" :dataArray="barHengEchart"></echarts>
</template>


<script>
import Vue from 'vue'

export default {
  components: {
    echarts: Vue.extend(require('./echarts/index').default)
  },
  data () {
    return {
      barHengEchart:  [
            {
                name: "Web 秀",
                value: 10000
            },
            {
                name: "Macys",
                value: 6181,
            },
            {
                name: "Amy Schumer",
                value: 4386,
            },
            {
                name: "Jurassic World",
                value: 4055,
            },
            {
                name: "Charter Communications",
                value: 2467,
            },
            {
                name: "Chick Fil A",
                value: 2244,
            },
            {
                name: "Planet Fitness",
                value: 18980,
            }
        ]
    }
  },
  
}
</script> 