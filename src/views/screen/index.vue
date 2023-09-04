<template>
  <div class="screen-container">
    <div class="screen-layout" ref="screenBoxRef">
      <!-- 数据大屏 顶部 -->
      <div class="top">
        <div class="top-left">
          <span class="home" @click="router.push('/')">首页</span>
        </div>
        <div class="top-center">
          <span class="title">智慧旅游可视化大数据展示平台</span>
        </div>
        <div class="top-right">
          <span class="report">统计报告</span>
          <span class="cur-time">当前时间：{{ curTime }}</span>
        </div>
      </div>
      <!-- 数据大屏 主体 -->
      <div class="main">
        <!-- 主体左侧 -->
        <div class="main-left">
          <div class="left-top">
            <RealTimeVisitor />
          </div>
          <div class="left-center">
            <MaleFemaleRatio />
          </div>
          <div class="left-bottom">
            <AgeRatio />
          </div>
        </div>
        <!-- 主体 中央 -->
        <div class="main-center">
          <div class="center-top">
            <span class="map-title">景区实时航线地图</span>
          </div>
          <div class="center-bottom">
            <Future30Visitors />
          </div>
        </div>
        <!-- 主体 右侧 -->
        <div class="main-right">
          <div class="right-top">
            <span class="title">热门景区排行</span>
            <img
              class="title-img"
              src="./images/dataScreen-title.png"
              alt="title-img"
            />
            <div class="main-content"></div>
          </div>
          <div class="right-center">
            <span class="title">年度游客量对比</span>
            <img
              class="title-img"
              src="./images/dataScreen-title.png"
              alt="title-img"
            />
            <div class="main-content"></div>
          </div>
          <div class="right-bottom">
            <span class="title">预约渠道数据统计</span>
            <img
              class="title-img"
              src="./images/dataScreen-title.png"
              alt="title-img"
            />
            <div class="main-content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import RealTimeVisitor from '@/views/screen/components/RealTimeVisitor.vue'
import MaleFemaleRatio from '@/views/screen/components/MaleFemaleRatio.vue'
import AgeRatio from '@/views/screen/components/AgeRatio.vue'
import Future30Visitors from '@/views/screen/components/Future30Visitors.vue'

const router = useRouter()
const screenBoxRef = ref()

let curTime = ref(moment().format('YYYY年MM月DD日 HH:mm:ss')) //当前时间

const timerId = setInterval(() => {
  curTime.value = moment().format('YYYY年MM月DD日 HH:mm:ss') //每隔一秒刷新一次
}, 1000)

// 组件挂载的时候就计算缩放比例对box进行动态调整
onMounted(() => {
  screenBoxRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
})

// 浏览器窗口发生变更的时候也进行动态调整
window.onresize = () => {
  screenBoxRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
}

// 注意这里使用的设计稿为1920 * 1080  即（16:9的屏幕)
// 获得当前的缩放比例 (宽高比例取最小者 因为取最大会占满屏 有可能会对内部元素布局造成变形？？)
const getScale = (w = 1920, h = 1080) => {
  const wScaleRatio = window.innerWidth / w
  const hScaleRatio = window.innerHeight / h
  return Math.min(wScaleRatio, hScaleRatio)
}

// 组件卸载前清除定时器
onBeforeUnmount(() => {
  clearInterval(timerId)
})
</script>

<style lang="scss">
@import 'index';
</style>

<script lang="ts">
export default {
  name: 'screen',
}
</script>
