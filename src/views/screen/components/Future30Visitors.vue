<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const futureLineChartRef = ref()
// X轴数据 获取当前日期到之后一个月30天的日期区间
const getFuture30daysData = (): string[] => {
  let dateList = []
  let startDate = new Date()
  let endDate = new Date()
  endDate.setDate(startDate.getDate() + 30)
  startDate.setDate(startDate.getDate() + 1)
  while (endDate.getTime() - startDate.getTime() >= 0) {
    let month =
      (startDate.getMonth() + 1).toString().length === 1
        ? '0' + (startDate.getMonth() + 1).toString()
        : startDate.getMonth() + 1
    let day =
      startDate.getDate().toString().length === 1
        ? '0' + startDate.getDate()
        : startDate.getDate()
    dateList.push(month + '/' + day)
    startDate.setDate(startDate.getDate() + 1)
  }
  return dateList
}
// Y轴数据
const yData = new Array(30)
  .fill('')
  .map(() => Math.floor(Math.random() * 20000))

const option: EChartsOption = {
  grid: {
    top: '20%',
    left: '6%',
    right: '5%',
    bottom: '20%',
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: getFuture30daysData(),
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
    name: '(访问量)',
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
      let tipData = params[0]
      return `<div class="lineChart-bg">
                <span>
                  <span>${tipData.name} </span>
                  <span><i >${tipData.value}</i> 人次访问</span>
                </span>
              </div>`
    },
    backgroundColor: 'transparent', // 提示标签背景颜色
    borderColor: 'transparent',
    extraCssText: 'box-shadow: none;padding:0',
  },
  series: [
    {
      data: yData,
      type: 'line',
      smooth: true,
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
              color: '#846B38', // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: '#403E47', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#11144E', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        shadowColor: 'rgba(255, 199, 37, 0)', // 阴影颜色
        shadowBlur: 20, // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(futureLineChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">未来30天游客量趋势图</span>
  <img
    class="title-img"
    src="../assets/images/dataScreen-title.png"
    alt="title-img"
  />
  <div class="main-chart-content">
    <div class="futureLineChart" ref="futureLineChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-chart-content {
  width: 100%;
  height: 100%;

  .futureLineChart {
    width: 100%;
    height: 100%;

    //处于 scoped 样式中的选择器如果想要做更“深度”的选择，
    // 也即：影响到子组件，可以使用 :deep() 这个伪类：
    :deep(.lineChart-bg) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      height: 60px;
      background: url('../assets/images/line-bg.png') no-repeat;
      background-size: 100% 100%;
      span {
        width: 100%;
        display: flex;
        font-size: 16px;
        color: rgb(255 255 255 / 80%);

        span:nth-child(1) {
          margin-left: 12px;
        }

        span:nth-child(2) {
          margin-left: 12px;
          margin-right: 12px;
          i {
            font-style: normal;
            color: #f5b348;
          }
        }
      }
    }

    :deep(.y-axis-label) {
      z-index: 999; /* 将其层级设置为较高的值 */
    }
  }
}
</style>
