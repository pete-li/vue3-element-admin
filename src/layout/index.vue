<template>
  <div class="container">
    <!-- 侧边栏 -->
    <Slider></Slider>
    <!-- 顶部导航栏 -->
    <Tabbar></Tabbar>
    <!-- 内容展示区域 -->
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Slider from '@/layout/slider/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import Main from '@/layout/main/index.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
}
</style>
