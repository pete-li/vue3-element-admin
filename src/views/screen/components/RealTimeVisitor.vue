<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import 'echarts-liquidfill' // 水球图

const liquidChartRef = ref()
const counter = ref('634892人')
const option = {
  series: [
    {
      type: 'liquidFill',
      shape: 'circle',
      radius: '80%',
      center: ['50%', '50%'],
      data: [0.6, 0.4, 0.5],
      // 球体配置
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#3dfff6',
          shadowBlur: 20,
          shadowColor: '#12786f',
        },
      },
      color: ['rgba(50, 255, 238, .6)', 'rgba(154, 255, 247, .6)'],
      backgroundStyle: {
        borderWidth: 1,
        // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
        color: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.5,
          colorStops: [
            {
              offset: 0,
              color: '#0D2648', // 0% 处的颜色
            },
            {
              offset: 0.8,
              color: '#0D2648', // 100% 处的颜色
            },
            {
              offset: 1,
              color: '#228E7D', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      label: {
        show: true,
        color: '#fff',
        fontSize: 20,
        formatter: (params: any) => {
          return `{a|预约量}\n ${(params.value * 100).toFixed(0)}%`
        },
        rich: {
          a: {
            fontSize: 20,
            lineHeight: 30,
          },
        },
        position: ['50%', '25%'], // [left , top]
      },
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(liquidChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">实时游客统计</span>
  <img class="title-img" src="../images/dataScreen-title.png" alt="title-img" />
  <div class="main-content">
    <div class="actual-total">
      <span class="bookable-people">
        可预约总量
        <i style="color: orange; font-style: oblique">999999</i>
        人
      </span>
      <div
        v-for="(item, index) in counter.split('')"
        :key="index"
        class="actual-item"
      >
        {{ item }}
      </div>
    </div>
    <div class="chart-container">
      <div ref="liquidChartRef" class="liquid-chart"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  .actual-total {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    margin-top: 16px;

    .bookable-people {
      position: absolute;
      top: -20px;
      right: 8px;
      font-family: inherit;
      color: white;
    }

    .actual-item {
      width: 52px;
      height: 50px;
      line-height: 50px;
      background: url('../images/total.png') no-repeat;
      background-size: cover;
      color: #6ff;
      font-size: 32px;
      font-family: Metro, serif;
      text-align: center;
    }

    .actual-item:last-child {
      font-size: 24px;
    }
  }

  .chart-container {
    flex: 1;
    width: 100%;
    height: 100%;

    .liquid-chart {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
