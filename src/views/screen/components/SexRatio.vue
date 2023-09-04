<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const sexRatioChartRef = ref()
const option: EChartsOption = {
  xAxis: {
    show: false,
  },
  yAxis: {
    type: 'category',
    show: false,
  },
  grid: {
    left: 0,
    right: 0,
    top: 30,
    bottom: 0,
  },
  series: [
    {
      type: 'bar',
      data: [58],
      z: 999,
      barWidth: 20,
      itemStyle: {
        borderRadius: 10,
        color: '#007AFE',
      },
      label: {
        show: true,
        formatter: (obj) => `男士 ${obj.value}%`,
        offset: [0, -25],
        color: '#E7E8ED',
        fontSize: 16,
        position: 'insideLeft',
      },
    },
    {
      type: 'bar',
      data: [100],
      barGap: '-100%',
      barWidth: 20,
      itemStyle: {
        borderRadius: 10,
        color: '#FF4B7A',
      },
      label: {
        show: true,
        formatter: `女士 ${100 - 58}%`,
        offset: [0, -25],
        color: '#E7E8ED',
        fontSize: 16,
        position: 'insideRight',
      },
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(sexRatioChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">男女比例</span>
  <img class="title-img" src="../images/dataScreen-title.png" alt="title-img" />
  <div class="main-content">
    <div class="male-female-layout">
      <div class="male-layout">
        <span>男士</span>
        <img src="../images/man.png" alt="man" />
      </div>
      <div class="female-layout">
        <span>女士</span>
        <img src="../images/woman.png" alt="woman" />
      </div>
    </div>
    <div class="sexRatioChart" ref="sexRatioChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-content {
  padding: 40px 60px;

  .male-female-layout {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .male-layout,
    .female-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 110px;
      height: 115px;
      background: url('../images/man-bg.png') no-repeat;
      background-size: cover;
    }

    .female-layout {
      background: url('../images/woman-bg.png') no-repeat;
      background-size: cover;
    }

    span {
      color: white;
      font-size: 13px;
      margin-top: 3px;
    }

    img {
      margin-top: 20px;
      width: 60px;
      height: 60px;
    }
  }

  .sexRatioChart {
    width: 100%;
    height: 100%;
  }
}
</style>
