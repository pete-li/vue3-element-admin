<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="layout_slider">
      <logo></logo>
    </div>
    <!-- 顶部导航栏 -->
    <div class="layout_tabbar"></div>
    <!-- 内容展示区域 -->
    <div class="layout_main"></div>
  </div>
</template>

<script setup lang="ts">
import logo from '@/layout/logo/index.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
  }

  .layout_tabbar {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabbar-height;
    background-color: aquamarine;
    top: 0;
    left: $base-menu-width;
  }
  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100% - $base-tabbar-height);
    background-color: skyblue;
    top: $base-tabbar-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
  }
}
</style>
