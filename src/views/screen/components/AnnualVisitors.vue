<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const annualLineChartRef = ref()

let annualData = [
  {
    label: new Date().getFullYear() - 2 + '年',
    value: new Array(12).fill('').map(() => Math.floor(Math.random() * 30000)),
  },
  {
    label: new Date().getFullYear() - 1 + '年',
    value: new Array(12).fill('').map(() => Math.floor(Math.random() * 30000)),
  },
  {
    label: new Date().getFullYear() + '年',
    value: new Array(12).fill('').map(() => Math.floor(Math.random() * 30000)),
  },
]

const gradientColors = [
  'rgba(254, 219, 101,0.1)',
  'rgba(0, 122, 254,0.1)',
  'rgba(255, 75, 122, 0.1)',
]

const colors = ['#FFA600', '#007AFE', '#FF4B7A']

const option: EChartsOption = {
  legend: {
    right: '2%',
    top: '6%',
    itemWidth: 15,
    itemHeight: 6,
    align: 'auto',
    icon: 'rect',
    itemGap: 15,
    textStyle: {
      color: '#ebebf0',
    },
  },
  grid: {
    top: '20%',
    left: '15%',
    right: '10%',
    bottom: '20%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      color: '#7ec7ff',
      fontSize: 16,
    },
    axisLine: {
      show: true,
      onZero: true,
      symbol: ['none', 'arrow'],
      symbolOffset: [0, 30],
      lineStyle: {
        color: '#233653',
        shadowOffsetX: 20,
        shadowColor: '#233653',
      },
    },
  },
  yAxis: {
    name: '(人数)',
    nameGap: 16,
    nameTextStyle: {
      color: '#7ec7ff',
      fontSize: 16,
      padding: [0, 30, -4, 0],
    },
    type: 'value',
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#233653',
      },
    },
    axisLabel: {
      color: '#7ec7ff',
      fontSize: 16,
      formatter: (name: any) =>
        Number(name) >= 10000 ? Number(name) / 10000 + 'w' : name,
    },
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    confine: true,
    formatter: (params: any) => {
      let str = ''
      params.forEach((item: any) => {
        str += `
          <div class="year-item">
            <span class="year-dot" style="background-color: ${
              item.color
            };"></span>
            <span class="year-name">${item.seriesName}</span>
            <span class="year-value">${
              item.data >= 10000
                ? (item.data / 10000).toFixed(2) + 'w'
                : item.data
            }人次</span>
          </div>
          `
      })
      return `
          <div class="annual-tooTip">
            <span class="annual-month">${params[0].dataIndex + 1}月</span>
            <div class="annual-list">
              ${str}
            </div>
          </div>
                  `
    },
    backgroundColor: 'transparent', // 提示标签背景颜色
    borderColor: 'transparent',
    extraCssText: 'box-shadow: none;padding:0',
  },
  series: annualData.map((item, index) => {
    return {
      name: item.label,
      data: item.value,
      type: 'line',
      smooth: true,
      showSymbol: false,
      emphasis: {
        focus: 'series',
      },
      lineStyle: {
        width: 1,
        color: colors[index], // 线条颜色
        borderColor: colors[index],
      },
      areaStyle: {
        color: {
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，
          // 相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，
          // 则该四个值是绝对的像素位置
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: colors[index], // 0% 处的颜色
            },
            {
              offset: 1,
              color: gradientColors[index], // 100% 处的颜色
            },
          ],
        },
        shadowColor: 'rgba(255, 199, 37, 0)', // 阴影颜色
        shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
    }
  }),
}

onMounted(() => {
  const chart = echarts.init(annualLineChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">年度游客量对比</span>
  <img class="title-img" src="../images/dataScreen-title.png" alt="title-img" />
  <div class="main-content">
    <div class="annualLineChart" ref="annualLineChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  width: 100%;
  height: 100%;

  .annualLineChart {
    width: 100%;
    height: 100%;

    //处于 scoped 样式中的选择器如果想要做更“深度”的选择，
    // 也即：影响到子组件，可以使用 :deep() 这个伪类：
    :deep(.annual-tooTip) {
      box-sizing: border-box;
      width: 206px;
      height: 103px;
      padding: 5px 20px;
      background: url('../images/contrast-bg.png') no-repeat;
      background-size: 100% 100%;

      .annual-month {
        display: inline-block;
        margin-bottom: 2px;
        font-size: 16px;
        color: #03b8e2;
        transform: scale(0.9);
      }

      .annual-list {
        display: flex;
        flex-direction: column;
        width: 100%;

        .year-item {
          display: flex;
          align-items: center;
          width: 100%;
          height: 22px;

          .year-dot {
            width: 5px;
            height: 5px;
            margin: 0 2px;
            border-radius: 50%;
          }

          .year-name,
          .year-value {
            font-size: 16px;
            color: #03b8e2;
            transform: scale(0.8);
          }

          .year-name {
            margin: 0 2px;
          }

          .year-value {
            display: inline-block;
            width: 25%;
          }
        }
      }
    }
  }
}
</style>
