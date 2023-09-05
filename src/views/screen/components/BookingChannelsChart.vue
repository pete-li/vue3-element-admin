<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const data = ref([
  {
    value: 40,
    name: '智慧文旅平台',
    percentage: '40%',
  },
  {
    value: 10,
    name: '携程',
    percentage: '10%',
  },
  {
    value: 20,
    name: '飞猪',
    percentage: '20%',
  },
  {
    value: 30,
    name: '其他渠道',
    percentage: '30%',
  },
])
const colors = [
  '#1786ff',
  '#6172fc',
  '#b797df',
  '#6ad40b',
  '#ffbe2f',
  '#4dc89d',
  '#ffd3aa',
]
const bookingChannelChartRef = ref()
const option: EChartsOption = {
  tooltip: {
    show: true,
    trigger: 'item',
    formatter: '{b} <br/>占比：{d}%',
  },
  grid: {
    top: '0%',
    left: '2%',
    right: '2%',
    bottom: '0%',
  },
  color: colors,
  legend: {
    show: true,
    top: '20px',
    left: '16px',
    icon: 'circle',
    orient: 'vertical',
    itemWidth: 10,
    textStyle: {
      color: '#fff',
      fontSize: '14px',
    },
    itemGap: 20,
    formatter: function (name: string) {
      let text = ''
      data.value.forEach((val) => {
        if (val.name === name) {
          text = name + ' - ' + val.percentage
        }
      })
      return text
    },
    data: data.value.map((val) => val.name),
  },
  series: [
    {
      type: 'pie',
      radius: ['65%', '90%'],
      center: ['68%', '45%'],
      data: data.value,
      color: colors,
      startAngle: 210,
      selectedMode: 'single',
      avoidLabelOverlap: false,
      itemStyle: {
        borderColor: '#031845',
        borderWidth: 10,
      },

      label: {
        show: false,
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
    },
    {
      type: 'pie',
      radius: ['20%', '28%'],
      center: ['68%', '45%'],
      color: ['#ffffff', 'red'],
      startAngle: 105,
      data: [
        {
          value: 30,
          name: '',
          itemStyle: {
            color: 'transparent',
          },
        },
        {
          value: 5,
          name: '',
          itemStyle: {
            color: 'transparent',
          },
        },
        {
          value: 65,
          name: 'ddd',
          itemStyle: {
            color: '#ffffff',
          },
        },
      ],
      silent: true,
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
    },
    {
      type: 'pie',
      radius: [0, '30%'],
      center: ['68%', '45%'],
      startAngle: 90,
      data: [
        {
          value: 25,
          name: '1',
          itemStyle: {
            color: 'transparent',
            borderWidth: 4,
            borderColor: '#ffffff',
          },
        },

        {
          value: 75,
          name: '2',
          itemStyle: {
            color: 'transparent',
          },
        },
      ],
      selectedOffset: 10,
      silent: true,
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
    },
    {
      type: 'pie',
      radius: ['96%', '97%'],
      center: ['68%', '45%'],
      color: [
        '#007afe',
        'transparent',
        '#007afe',
        'transparent',
        '#007afe',
        'transparent',
      ],
      data: [
        {
          value: 17,
          name: '11',
        },
        {
          value: 17,
          name: '22',
        },
        {
          value: 17,
          name: '33',
        },
        {
          value: 17,
          name: '44',
        },
        {
          value: 17,
          name: '55',
        },
        {
          value: 17,
          name: '66',
        },
      ],
      silent: true,
      labelLine: {
        show: false,
      },
      label: {
        show: false,
      },
    },
    {
      type: 'pie',
      silent: true,
      radius: ['45%', '46%'],
      center: ['68%', '45%'],
      z: 10,
      label: {
        show: false,
      },
      labelLine: {
        show: false,
      },
      data: new Array(150).fill('').map((_val: string, index: number) => {
        if (index % 3 === 0) {
          return {
            name: (index + 1).toString(),
            value: 10,
            itemStyle: {
              color: '#fff',
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0)',
            },
          }
        } else {
          return {
            name: (index + 1).toString(),
            value: 25,
            itemStyle: {
              color: 'rgba(0,0,0,0)',
              borderWidth: 0,
              borderColor: 'rgba(0,0,0,0)',
            },
          }
        }
      }),
    },
    {
      type: 'pie',
      silent: true,
      radius: ['58%', '60%'],
      center: ['68%', '45%'],
      z: 10,
      startAngle: 90,
      label: {
        show: false,
      },
      color: ['red', 'blue', 'red', 'blue'],

      labelLine: {
        show: false,
      },

      data: [
        {
          name: 'r1',
          value: 25,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(51,149,191,0.5)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(51,149,191,0)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: 'r2',
          value: 25,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(0,0,0,0)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(51,149,191,0.5)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: 'r3',
          value: 25,
          itemStyle: {
            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(51,149,191,0)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(51,149,191,0.5)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
        {
          name: 'r4',
          value: 25,
          itemStyle: {
            // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgba(51,149,191,0.5)', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: 'rgba(0,0,0,0)', // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
        },
      ],
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(bookingChannelChartRef.value)
  chart.setOption(option)
})
</script>

<template>
  <span class="title">预约渠道数据统计</span>
  <img
    class="title-img"
    src="../assets/images/dataScreen-title.png"
    alt="title-img"
  />
  <div class="main-chart-content">
    <div class="bookingChannelChart" ref="bookingChannelChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.main-chart-content {
  width: 100%;
  height: 100%;

  .bookingChannelChart {
    width: 100%;
    height: 100%;
  }
}
</style>
