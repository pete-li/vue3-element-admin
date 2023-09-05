<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import ChinaJson from '../assets/json/China.json'

// 飞机svg图格式路径
const planePath =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
// 地图航线路径 起始经纬度
const mapRoutes = [
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '重庆',
    toName: '新疆维吾尔自治区',
    coords: [
      [106.504962, 29.533155],
      [85.294711, 41.371801],
    ],
  },
  {
    fromName: '西藏',
    toName: '上海',
    coords: [
      [91.132212, 29.660361],
      [121.472644, 31.231706],
    ],
  },
  {
    fromName: ' 新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617],
    ],
  },
  {
    fromName: '陕西省',
    toName: '广西壮族自治区',
    coords: [
      [108.948024, 34.263161],
      [108.320004, 22.82402],
    ],
  },
  {
    fromName: '内蒙古自治区',
    toName: '西藏自治区',
    coords: [
      [111.670801, 40.818311],
      [91.132212, 29.660361],
    ],
  },
  {
    fromName: '黑龙江省',
    toName: '青海省',
    coords: [
      [126.642464, 45.756967],
      [101.778916, 36.623178],
    ],
  },
  {
    fromName: '辽宁省',
    toName: '海南省',
    coords: [
      [123.429096, 41.796767],
      [110.33119, 20.031971],
    ],
  },
  {
    fromName: '甘肃省',
    toName: '福建省',
    coords: [
      [103.823557, 36.058039],
      [119.306239, 26.075302],
    ],
  },
  {
    fromName: '吉林省',
    toName: '云南省',
    coords: [
      [125.3245, 43.886841],
      [102.712251, 25.040609],
    ],
  },
  {
    fromName: '海南省',
    toName: '台湾省',
    coords: [
      [110.33119, 20.031971],
      [121.509062, 25.044332],
    ],
  },
]

const mapRoutesChartRef = ref()

const option: EChartsOption = {
  // 地图参数与样式调整
  geo: [
    {
      map: 'China',
      zoom: 1.5,
      center: [102.848234, 32.82333],
      roam: true, //鼠标可缩放

      label: {
        show: true,
        color: '#fff',
      },
      // 每个省份item样式效果
      itemStyle: {
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#073684', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#061E3D', // 100% 处的颜色
            },
          ],
        },
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#00F6FF',
            },
            {
              offset: 1,
              color: '#87ADCB',
            },
          ],
          false,
        ),
        shadowColor: 'rgba(10,76,139,1)',
        shadowOffsetY: 0,
        shadowBlur: 60,
        borderWidth: 1,
      },
      // 鼠标悬停样式效果
      emphasis: {
        label: {
          color: '#fff',
          show: true,
          fontSize: 20,
        },
        itemStyle: {
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#073684', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2B91B7', // 100% 处的颜色
              },
            ],
          },
        },
      },
    },
  ],
  // 飞机航线参数配置
  series: [
    // 飞机底色轨迹
    {
      type: 'lines',
      data: mapRoutes,
      coordinateSystem: 'geo',
      zlevel: 1,
      // 效果
      effect: {
        show: true,
        period: 6,
        symbol: 'arrow',
        color: 'orange',
        symbolSize: 5,
        trailLength: 0.5,
      },
      lineStyle: {
        color: '#fff',
        width: 0,
        curveness: 0.2,
      },
    },
    // 飞机轨迹
    {
      type: 'lines',
      data: mapRoutes,
      coordinateSystem: 'geo',
      symbol: ['none', 'arrow'],
      zlevel: 2,
      // 效果
      effect: {
        show: true,
        period: 6,
        symbol: planePath,
        symbolSize: 30,
        trailLength: 0,
      },
      lineStyle: {
        color: '#fff',
        width: 1,
        opacity: 0.6,
        curveness: 0.2,
      },
    },
  ],
}

onMounted(() => {
  const chart = echarts.init(mapRoutesChartRef.value)
  echarts.registerMap('China', ChinaJson as any)
  chart.setOption(option)
})
</script>

<template>
  <span class="map-title">景区实时航线地图</span>
  <div class="main-chart-content">
    <div class="mapRoutesChart" ref="mapRoutesChartRef"></div>
  </div>
</template>

<style scoped lang="scss">
.map-title {
  z-index: 999;
  color: white;
  display: block;
  width: 270px;
  height: 25px;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  background: url('../assets/images/map-title-bg.png') no-repeat;
  background-size: cover;
  padding-right: 62px;
}

.main-chart-content {
  width: 100%;
  height: 100%;
  position: relative;

  .mapRoutesChart {
    width: 100%;
    height: 100%;
  }
}
</style>
