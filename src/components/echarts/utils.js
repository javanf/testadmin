'use strict';
import echarts from 'echarts';
require('echarts-wordcloud');

const colorList = ['#6481F1','#4CDA99','#F0CA00','#FF7362','#A689EC','#12BCE4'];

// const wordCloudColors = ['#A178DB','#6481F1','#88A275','#B8E986','#EDA34C','#0ABBB9','#7AC96B','#B473ED','#DC7B6F','#F0CA00'];
const wordCloudColors = ['#10DFDC','#20B6F6','#32D677','#B5C728','#EF5C26','#E64263','#E642C8','#1C75F4','#9041F6','#FEBF20'];

const formatterVal = (value, label) => {
  let a = '';
  let _amount = parseFloat(value);
  if(!_amount) {
    a = 0;
  }else if(_amount > 1000) {
    a =  +(_amount/10000).toFixed(1) + label;
  } else {
    a = _amount;
  }
  return a;
};
/**
 * args: el , Options-type, Options-args
*/
export default (el, classify, ...arg) => {
  const instance = echarts.init(el);
  instance.setOption(allOptions[`${classify}Options`](...arg)) ;
  return instance ;
}
const allOptions = {
  barXiLineOptions: dataArray => {  // 细柱状图
    const arrayX = [];
    const arrayY = [];
    const barBorderRadius = new Array(4).fill(100) ;
    return {
      series: [
        { // 阴影柱形
          type: 'bar',
          barWidth: 12,
          itemStyle: {
            color: 'rgba(167,167,167,0.1)',
            barBorderRadius
          },
          barGap:'-100%',
          data: new Array(dataArray.length).fill(dataArray.reduce((res, {value, name}) => {
            arrayX.push(name);
            arrayY.push(value)
            return Math.max(res, value)
          }, 0) * 1.3 || 1),  // 拿到最大值来渲染阴影柱形, *1.2是为了不要到顶部
          animation: false
        },
        {
          type: 'bar',
          barWidth: 12,
          label: {
            show: true,
            position: 'top',
            formatter: (params) => {
              return formatterVal(params.value, '\n万');
            },
            color: '#1CD8A8',
            fontSize: 14,
            fontWeight: 'bold',
            distance: 25
          },
          itemStyle: {
            barBorderRadius,
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              '#2FAEF2',
              '#1CD8A8'
            ].map((color, offset) => ({color, offset}))),
          },
          data: arrayY
        },
        {
          type:'line',
          connectNulls: true,
          clipOverflow: false,
          smooth: true,
          symbol: 'circle',
          showSymbol: true,
          symbolSize: 8,
          itemStyle: {
            color: ['#2FAEF2','#1CD8A8']
          },
          lineStyle: {
            width: 2,
            color:  new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#2FAEF2'},{offset: 1, color: '#1CD8A8'}])
          },
          areaStyle: {
            color:  new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {offset: 0, color: 'rgba(47,174,242,0)'},
              {offset: 0.5, color: 'rgba(34,202,192,0.04)'},
              {offset: 1, color: 'rgba(28,216,168,0.52)'}]    
            )
          },
          data: arrayY.map(n => (parseFloat(n) * 1.1 || 0)),  // 折线图的渲染数据, *1.2是为了不要到顶部
        }
      ],
      xAxis: { // x轴
        type: 'category',
        show: true,
        data: arrayX,
        axisLabel: { // 坐标轴刻度标签
          show: true,
          textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 14 }
        },
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      yAxis: { // y轴
        type: 'value',
        show: false,
        data: [],
        axisLabel: { show: false }, // 坐标轴刻度标签
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      grid: { // 布局
        left: 0,
        right: 0,
        top: 0,
        bottom: '10%'
      }
    };
  },
  barHengOptions: (dataArray, mtype, unit) => {
    const arrayX = [];
    const arrayY = [];
    const barBorderRadius = new Array(4).fill(100);
    return {
      xAxis: { // y轴
        type: 'value',
        show: false,
        data: [],
        axisLabel: { show: false }, // 坐标轴刻度标签
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      yAxis: { // x轴
        type: 'category',
        show: true,
        data: dataArray.map(n => n.name.length > 3 ? (n.name.slice(0,3) + '..') : n.name),
        axisLabel: { // 坐标轴刻度标签
          show: true,
          textStyle: { color: '#83A6CE', fontSize: 14 }
        },
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      grid: { // 布局
        left: 0,
        right: 0,
        top: '2%',
        bottom: 0,
        containLabel: true
      },
      series: [
        { // 阴影柱形
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            color: 'rgba(17,47,83,0.5)',
            barBorderRadius,
          },
          barGap:'-100%',
          data: new Array(dataArray.length).fill(dataArray.reduce((res, {name, value}) => {
            arrayX.push(name);
            arrayY.push(value)
            return Math.max(res, value)
          }, 0) * 1.2 || 1),  // 拿到最大值来渲染阴影柱形, *1.2是为了不要到顶部,
          animation: false
        },
        {
          type: 'bar',
          barWidth: 10,
          label: {
            show: true,
            position: 'right',
            formatter: (params) => {
              // let a = '';
              // let _amount = parseFloat(params.value);
              // if(!_amount) {
              //   a = 0;
              // }else if(_amount > 1000) {
              //   a =  +(_amount/10000).toFixed(1) + '万';
              // } else {
              //   a = _amount;
              // }
              // return a;
              return formatterVal(params.value, '万');
            },
            color: ['#1CD8A8','#DAE519'],
            fontSize: 14,
            distance: 10
          },
          itemStyle: {
            color: function(params) {
              const color1 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#B11530'},{offset: 1, color: '#DAE618'}]);
              const color2 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#2FAEF2'},{offset: 1, color: '#1CD8A8'}]);
              return params.dataIndex === arrayY.length - 1 ? color1 : color2;
            },
            barBorderRadius,
          },
          data: arrayY
        }
      ]
    }
  },
  barCuOptions: (dataArray, mtype, unit) => {
    const barBorderRadius = [100, 100, 0, 0];
    return {
      xAxis: { // x轴
        type: 'category',
        show: true,
        data: dataArray.map(n => n.name),
        axisLabel: { // 坐标轴刻度标签
          show: true,
          textStyle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 }
        },
        axisLine: { 
          show: true,
          lineStyle: {
            width: 1,
            color: 'rgba(255,255,255,0.2)'
          }
        }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      yAxis: { // y轴
        type: 'value',
        show: false,
        data: [],
        axisLabel: { // 坐标轴刻度标签
          show: false,
          interval: 0,
          textStyle: { color: '#758DA3', fontSize: 10 }
        }, 
        axisLine: { show: false }, // 坐标轴轴线
        axisTick: { show: false }, // 坐标轴刻度
        splitLine: { show:false } // 分割线
      },
      grid: { // 布局
        left: 0,
        right: 0,
        top: 10,
        bottom: '15%'
      },
      series: [
        // { 
        //   type: 'bar', // 阴影柱形
        //   barWidth: 45,
        //   itemStyle: {
        //     color: 'rgba(210,221,231,0.15)',
        //     barBorderRadius
        //   },
        //   data: new Array(2).fill({
        //     '折': 10,
        //     '%': 100,
        //     '天': Math.max(...dataArray)
        //   }[unit]),
        //   animation: false
        // },
        {
          type: 'bar',
          barWidth: 15,
          // barGap:'-100%',
          label: {
            show: false,
            // position: 'top',
            // formatter: (unit === '天' ? '{b}' : '{c}') + unit,
            // color: [, ['#F5A623','#1DD6AB'], ['#FF8272','#41BAEC']][mtype], // 颜色系列
            // fontSize: 18,
            // align: 'center',
          },
          itemStyle: {
            barBorderRadius,
            color:  function(params) {
              const color1 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#74C9F9'},{offset: 1, color: '#3EA0F5'}]);
              const color2 = new echarts.graphic.LinearGradient(0, 0, 1, 0, [{offset: 0, color: '#18DFDD'},{offset: 1, color: '#0ABBB9'}]);
              return params.dataIndex % 2 ? color2 : color1;
            }
          },
          data: dataArray.map(n => n.value)
        }
      ]
    } ;
  },
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
  pieOptions: dataArray => {
    const data = [] ;
    return ({
      series: [{
        type: 'pie',
        radius: '90%',
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        color: [
          '#2EAFF0',
          '#00DE93',
          '#F0CA00',
          '#FF7362',
          '#A689EC',
          '#FF9B2D'
        ].filter((c, i) => dataArray[i] && data.push(dataArray[i])),
        data,
        startAngle: 130,
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}%',
          color: '#ffffff',
          fontSize: 16
        }
      }]
    });
  },
  pieCircleOptions: (dataArray, type, unit, innerText) => {
    return {
      color: colorList,
      series: [
        {
          type:'pie',
          radius: [0, '40%'],
          label: { show: false },
          labelLine: { show: false },
          startAngle: 60,
          data: dataArray
        },
        {
          type:'pie',
          radius: ['50%', '65%'],
          label: {
            formatter: '{b}',
            fontSize: 14
          },
          startAngle: 60,
          data: dataArray
        }
      ]
    }
  },
  twoCircleOptions: (dataArray, type, unit, innerText) => {
    const colors = [,['#3BC9C7', '#F0CA00'], ['#FF7362', '#6481F1']]
    return {
      series: [{ 
        type: 'pie',
        radius: ['62%', '72%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        startAngle: type == 1 ? 315 : 60,
        data: dataArray[0],
        itemStyle: {
          color: (params) => (params.dataIndex === 1 ? 'rgba(167,167,167,0.1)' : colors[type][0])
        },
        label: {
          show: false
        }
      },{
        type: 'pie',
        radius: ['42%', '52%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: false,
        startAngle: type == 1 ? 135 : 270,
        data: dataArray[1],
        itemStyle: {
          color: (params) => (params.dataIndex === 1 ? 'rgba(167,167,167,0.1)' : colors[type][1])
        },
        label: {
          show: false
        }
      }],
      graphic: {
        type: 'text',
        left: 'center',
        top: 'center',
        z: 2,
        style: {
          text: innerText,
          fill: 'rgba(255,255,255,0.5)',
          textAlign: 'center',
          font: '3rem'
        }
      }
    };
  },
  randarOptions: (dataArray, type, unit, innerText) => {
    return {
      radar: {
        indicator: dataArray[0],
        shape: 'circle',
        splitNumber: 5,
        nameGap: 8,
        name: {
          color: '#7ED16C',
          fontSize: 14
        },
        splitLine: {
          lineStyle: {
            color: [
              'rgba(142, 109, 61, 0.4)', 'rgba(142, 109, 61, 0.1)',
              'rgba(142, 109, 61, 0.5)', 'rgba(142, 109, 61, 0.6)',
              'rgba(142, 109, 61, 0.8)', 'rgba(142, 109, 61, 1)'
            ].reverse()
          }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(142, 109, 61, 0.5)'
          }
        }
      },
      series: [{
        type: 'radar',
        data: dataArray[1],
        symbol: 'none',
        itemStyle: {
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [{
              offset: 0, color: 'rgba(126,209,108,1)' // 0% 处的颜色
            }, {
              offset: 1, color: 'rgba(126,209,108,0.8)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        lineStyle: {
          width: 1
        },
        areaStyle: {
          opacity: 0.1
        }
      }]
    }
  },
  wordCloudOptions: (dataArray, type, unit, innerText) => {
    const leg = dataArray.length || 0;
    return {
      series: [{
        type: 'wordCloud',
        gridSize: 15,
        sizeRange: [18, 36],
        rotationRange: [0, 0],
        shape: 'cardioid',
        left: 'center',
        top: 'top',
        width: '90%',
        height: '90%',
        drawOutOfBound: false,
        textStyle: {
          normal: {
            color: function () {
              return wordCloudColors[Math.floor(Math.random() * leg)];
            }
          }
        },
        data: dataArray
      }]
    }
  }
};


