<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const data = ref([
  { value: 10, name: '10岁以下' },
  { value: 5, name: '10-18岁' },
  { value: 30, name: '18-30岁' },
  { value: 20, name: '30-40岁' },
  { value: 15, name: '40-60岁' },
  { value: 20, name: '60岁以上' },
])

const ageRatioChartRef = ref()
const option: EChartsOption = {
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b} <br/>占比：{d}%',
  },
  title: {
    text: '年龄占比',
    left: '93px',
    top: '100px',
    textStyle: {
      color: '#fff',
      fontSize: 14,
    },
  },
  color: ['#F6C95C', '#EF7D33', '#1F9393', '#184EA1', '#81C8EF', '#9270CA'],
  legend: {
    orient: 'vertical',
    right: '20px',
    top: '15px',
    itemGap: 10,
    itemWidth: 14,
    textStyle: {
      color: '#fff',
      fontSize: 16,
    },
    formatter: (name) => {
      let legendTitle = name
      data.value.forEach((item) => {
        if (item.name === name) {
          legendTitle = `${name} ${item.value}%`
        }
      })
      return legendTitle
    },
  },
  series: [
    {
      type: 'pie',
      startAngle: 210,
      selectedMode: 'single',
      radius: ['40%', '75%'],
      center: ['32%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: true,
        position: 'inside',
        formatter: '{d}%',
        color: '#fff',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: data.value,
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(ageRatioChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">年龄比例</span>
  <img
    class="title-img"
    src="../assets/images/dataScreen-title.png"
    alt="title-img"
  />
  <div class="main-chart-content">
    <div class="ageRatioChart" ref="ageRatioChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-chart-content {
  width: 100%;
  height: 100%;

  .ageRatioChart {
    width: 100%;
    height: 100%;
  }
}
</style>
