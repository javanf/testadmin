<template>
  <echarts classify="oneCircle" :dataArray="oneCircleEchart"></echarts>
</template>


<script>
import Vue from 'vue'

export default {
  components: {
    echarts: Vue.extend(require('./echarts/index').default)
  },
  data () {
    return {
      oneCircleEchart:  [
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
                value: 1898,
            },
            {
                name: "Pitch Perfect",
                value: 1484,
            },
            {
                name: "Express",
                value: 1112,
            },
            {
                name: "Home",
                value: 965,
            },
            {
                name: "Johnny Depp",
                value: 847,
            },
            {
                name: "Lena Dunham",
                value: 582,
            },
            {
                name: "Lewis Hamilton",
                value: 555,
            },
            {
                name: "KXAN",
                value: 550,
            },
            {
                name: "Mary Ellen Mark",
                value: 462,
            },
            {
                name: "Farrah Abraham",
                value: 366,
            },
            {
                name: "Rita Ora",
                value: 360,
            },
            {
                name: "Serena Williams",
                value: 282,
            },
            {
                name: "NCAA baseball tournament",
                value: 273,
            },
            {
                name: "Point Break",
                value: 265,
            }
        ]
    }
  },
  
}
</script> 