# Vue + Echarts封装出好用又好看的图表组件
## 前言
Echarts相信很多小伙伴都了解过，甚至很多都已经用到过。没有了解过的小伙伴，可以先来和我一起了解一下它的作用和历史吧。ECharts，缩写来自Enterprise Charts，商业级数据图表，是由百度公司研发的(并且是开源的)，它最初是为了满足公司商业体系里各种业务系统（如凤巢、广告管家等等）的报表需求，在2012年之前这些图表需求都是使用flash去实现的， 后来由于flash退出舞台，凤巢前端技术负责人的Kener-林峰在凤巢数据平台项目中尝试使用Canvas去做图表，他写了一个全新的轻量级Canvas类库ZRender，ZRender可以说是ECharts的前世。

![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327150128.jpg)

通过将近1年时间，2013年6月30，ECharts发布了1.0版本。

随着时间推移，以及团队的不懈努力，Echarts在Github的关注度也是日新月异。

![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327151728.jpg)

现如今 ECharts 提供了常规的折线图、柱状图、散点图、饼图、K线图，用于统计的盒形图，用于地理数据可视化的地图、热力图、线图，用于关系数据可视化的关系图、treemap、旭日图，多维数据可视化的平行坐标，还有用于 BI 的漏斗图，仪表盘，并且支持图与图之间的混搭。

## ECharts封装
先对Echarts js代码进行封装，因为html代码几乎没有。

```javascript
// /echarts/utils.js
'use strict';
import echarts from 'echarts';

const colorList = ['#6481F1','#4CDA99','#F0CA00','#FF7362','#A689EC','#12BCE4'];

export default (el, classify, ...arg) => {
  const instance = echarts.init(el);
  instance.setOption(allOptions[`${classify}Options`](...arg)) ;
  return instance ;
}
const allOptions = {
  // 环形图
  oneCircleOptions: (dataArray, type, unit, innerText) => {
    return {
      color: colorList,
      series: [{
        type: 'pie',
        radius: ['50', '70'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        data: dataArray,
        startAngle: 120,
        label: {
          formatter: (params) => (params.data.name + params.data.value),
          fontSize: 12
        }
      }],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        z: 2,
        style: {
          text: innerText,
          fill: '#fff',
          textAlign: 'center',
          font: '2rem'
        }
      }
    };
  },
  // 其他图形封装
  ...
  ...
};

```
如果上方代码格式，不方便观看，请看下方图片：
![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327154148.jpg)


这里先封装环形图代码，作为示例。

## Vue + Echarts组件

```html
<!--/echarts/index.vue-->
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
    // 调用utils来绘制图形
    this.myChart = init(this.$el, ...Object.values(this.$props))
  }
}
</script>

<style scoped>
.echart-box {
  width: 100%;
  height: 300px;
}
</style>
```

如果上方代码格式，不方便观看，请看下方图片：
![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327154904.jpg)


## 组件调用
需要用Echarts的地方，引入组件，`classify`参数传入统计图类型（这个是重点，和utils.js里面的方法名称一定要对应），`dataArray`统计图需要的数据（格式一定要处理好，每种统计图的数据格式有差异）。
```html
<!--one-circle.vue-->
<template>
  <echarts classify="oneCircle" :dataArray="oneCircleEchart"></echarts>
</template>

<script>

export default {
  components: {
    echarts: require('./echarts/index')
  },
  data () {
    return {
      oneCircleEchart:  [{
            name: "Web 秀",
            value: 10000
        },
        {
            name: "Macys",
            value: 6181,
        }
        ...
        ...
      ]
    }
  }
}
</script> 
```
如果上方代码格式，不方便观看，请看下方图片：
![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327155421.jpg)


最后环形统计图的预览效果：
![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327155518.jpg)


## 拓展
比如你还需要柱状图，你可以封装好js后，然后直接调用组件即可：
```html
<!--bar-xin-line.vue-->
<template>
  <echarts classify="barXiLine" :dataArray="barXiLineEchart"></echarts>
</template>

<script>

export default {
  components: {
    echarts: require('./echarts/index')
  },
  data () {
    return {
      barXiLineEchart:  [{
            name: "Web 秀",
            value: 10000
        },
        {
            name: "Macys",
            value: 6181,
        }
        ...
        ...
      ]
    }
  }
}
</script> 
```

如果上方代码格式，不方便观看，请看下方图片：
![Vue + Echarts封装出好用又好看的图表组件](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190327160207.jpg)

这样封装的好处是，重复的图表，不用来写重复的配置信息。只需要简单的调用即可。



## 结语
源码地址：[testadmin](https://github.com/javanf/testadmin)