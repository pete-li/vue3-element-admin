<template>
  <div class="container">
    <!-- 侧边栏 -->
    <Slider></Slider>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar"></div>
    <!-- 内容展示区域 -->
    <Main></Main>
  </div>
</template>

<script setup lang="ts">
import Slider from '@/layout/slider/index.vue'
import Main from '@/layout/main/index.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: aquamarine;
    top: 0;
    left: $base-menu-width;
  }
}
</style>
