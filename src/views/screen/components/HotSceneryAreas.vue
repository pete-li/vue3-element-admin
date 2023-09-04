<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import {
  ranking1,
  ranking2,
  ranking3,
  ranking4,
} from '@/assets/images/ranking.ts'

const colors = ['#1089E7', '#F57474', '#56D0E3', '#F8B448', '#8B78F6']
const data = ref([
  {
    value: 79999,
    name: '峨眉山',
    percentage: '80%',
    maxValue: 100000,
  },
  {
    value: 59999,
    name: '稻城亚丁',
    percentage: '60%',
    maxValue: 100000,
  },
  {
    value: 49999,
    name: '九寨沟',
    percentage: '50%',
    maxValue: 100000,
  },
  {
    value: 39999,
    name: '万里长城',
    percentage: '40%',
    maxValue: 100000,
  },
  {
    value: 29999,
    name: '北京故宫',
    percentage: '30%',
    maxValue: 100000,
  },
])

const ageRatioChartRef = ref()
const option: EChartsOption = {
  grid: {
    top: '0',
    left: '7%',
    right: '4%',
    bottom: '1%',
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: [
    {
      data: data.value.map((item) => item.name),
      inverse: true,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#fff',
        formatter: (value: any) => {
          let str = value.length > 6 ? value.slice(0, 6) + '...' : value //文本过长处理
          let index = data.value.map((item) => item.name).indexOf(value) + 1
          return [
            '{' + (index > 3 ? 'lg' : 'lg' + index) + '|NO.' + index + '}',
            '{title|' + str + '}',
          ].join(' ')
        },
        rich: {
          lg1: {
            width: 60,
            backgroundColor: {
              image: ranking1,
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13,
          },
          lg2: {
            width: 60,
            backgroundColor: {
              image: ranking2,
            },
            color: '#fff',
            align: 'center',

            height: 20,
            fontSize: 13,
          },
          lg3: {
            width: 60,
            backgroundColor: {
              image: ranking3,
            },
            color: '#fff',
            align: 'center',
            height: 20,
            fontSize: 13,
          },
          lg: {
            width: 60,
            backgroundColor: {
              image: ranking4,
            },
            color: '#fff',
            align: 'center',

            height: 20,
            fontSize: 13,
          },
          title: {
            width: 60,
            fontSize: 13,
            align: 'center',
            padding: [0, 10, 0, 15],
          },
        },
      },
    },
    {
      show: true,
      inverse: true,
      data: data.value,
      axisLabel: {
        fontSize: 14,
        color: '#fff',
        margin: 20,
        formatter: (value: any) => {
          return value >= 10000 ? (value / 10000).toFixed(2) + 'w' : value
        },
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      triggerEvent: false,
    },
  ],
  series: [
    {
      name: '条',
      type: 'bar',
      data: data.value,
      barWidth: 12,
      itemStyle: {
        borderRadius: 30,
        color: (params) => {
          return colors[params.dataIndex % colors.length]
        },
      },
      label: {
        show: true,
        position: [12, 0],
        lineHeight: 14,
        color: '#fff',
        formatter: (params: any) => params.data.percentage,
      },
    },
    {
      name: '框',
      type: 'bar',
      yAxisIndex: 1,
      data: data.value.map((val) => {
        if (!val.maxValue) {
          return 5
        }
        return val.maxValue
      }),
      barWidth: 18,
      itemStyle: {
        color: 'none',
        borderColor: '#00c1de',
        borderWidth: 1,
        borderRadius: 15,
      },
      silent: true,
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(ageRatioChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">热门景区排行</span>
  <img class="title-img" src="../images/dataScreen-title.png" alt="title-img" />
  <div class="main-content">
    <div class="echarts-header">
      <span>排名</span>
      <span>景区</span>
      <span>预约数量</span>
    </div>
    <div class="ageRatioChart" ref="ageRatioChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  width: 100%;
  height: 100%;
  padding: 0 12px;

  .echarts-header {
    display: flex;
    height: 36px;
    width: 100%;
    margin: 16px 2px 0 2px;
    line-height: 36px;
    background: url('../images/rankingChart-bg.png') no-repeat;
    background-size: 100% 100%;
    span {
      width: 18%;
      margin-left: 4px;
      font-size: 14px;
      font-weight: bold;
      color: #fdbc52;
      text-align: center;
      &:nth-child(2) {
        margin-left: 4px;
      }
      &:last-child {
        width: 20%;
        margin-left: 50px;
      }
    }
  }

  .ageRatioChart {
    width: 100%;
    height: 100%;
  }
}
</style>
